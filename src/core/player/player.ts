import { RuleId } from "src/types/definitions";
import {
  ABCLdata,
  DIAPER_USAGE_SOUNDS,
  INCONTINENCE_ON_STATS_OVERFLOW,
  MENTAL_REGRESSION_DROOL_THRESHOLD,
  MENTAL_REGRESSION_SUCKING_HABIT_THRESHOLD,
  MENTAL_REGRESSION_SUCKING_RESIST_FAIL_THRESHOLD,
  PUDDLE_MAX_SIZE,
} from "../../constants";
import { MetabolismSettingValues, MiniGameDifficultyToNumber } from "../../types/types";
import { suckPacifierFunction } from "../actions/suckPacifier";
import { suckThumbFunction } from "../actions/suckThumb";
import { sendDataToAction } from "../hooks";
import { MessMinigameResult, WetMinigameResult } from "../minigames/baseMinigame";
import { syncData } from "../settings";
import { grammar } from "../tracery";
import { createRateLimiter, getColor, isColorable, Saver, sendChatLocal, Throttler } from "../utils";
import {
  averageColor,
  getPlayerDiaperSize,
  hasDiaper,
  hasPacifier,
  incontinenceChanceFormula,
  incontinenceLimitFormula,
  incontinenceOnAccident,
  isDiaper,
  mentalRegressionOnAccident,
  mentalRegressionOvertime,
  updateDiaperColor,
} from "./diaper";
import { getAccidentAutopilotOutcome, isAccidentsAutopiloted as isAccidentsAutoPiloted, sendABCLAction, sendStatusMessage } from "./playerUtils";
import { abclStatsWindow } from "./ui";

export const updatePlayerClothes = async (itemGroup?: AssetGroupName) => {
  CharacterRefresh(Player, true);
  if (!itemGroup) return ChatRoomCharacterUpdate(Player);
  ChatRoomCharacterItemUpdate(Player, itemGroup);
};

const playDiaperUsageSound = (type: keyof typeof DIAPER_USAGE_SOUNDS) => {
  if (!Player.ABCL?.Settings.DiaperUsageSounds) return;
  if (!Player.AudioSettings?.PlayItem) return;

  const config = DIAPER_USAGE_SOUNDS[type];
  const clip = config.clips[Math.floor(Math.random() * config.clips.length)];
  if (!clip) return;

  const audio = new Audio(`${publicURL}/audio/diaper/${type}/${clip}`);
  audio.volume = Math.min(1, Number(Player.AudioSettings.Volume ?? 1) * config.volume);
  audio.play().catch(() => {});
};

const triggerDiaperUsageSound = (type: keyof typeof DIAPER_USAGE_SOUNDS) => {
  if (!Player.ABCL?.Settings.DiaperUsageSounds) return;
  sendDataToAction("diaper-usage-sound", { type });
  playDiaperUsageSound(type);
};

export const queueUpdatePlayerClothes = createRateLimiter<typeof updatePlayerClothes>(updatePlayerClothes, 1 * 1000);

const bowelThrottler = new Throttler(120 * 60 * 1000);
const bladderThrottler = new Throttler(120 * 60 * 1000);
const regressionThrottler = new Throttler(5 * 60 * 1000);
const regressedSelfSoothingThrottler = new Throttler(4 * 60 * 1000);
const droolThrottler = new Throttler(2 * 60 * 1000);

const AUTO_SUCK_VERIFY_TIMEOUT = 15 * 1000;
const AUTO_SUCK_HOLD_DURATION = 5 * 1000;
let autoSuckVerifyTimeout: number | null = null;

const clearAutoSuckVerify = () => {
  if (autoSuckVerifyTimeout) {
    clearTimeout(autoSuckVerifyTimeout);
    autoSuckVerifyTimeout = null;
  }
  ElementRemove("#abcl-chat-button-verify-adult");
};

const promptAutoSuckVerification = (suck: () => void) => {
  if (!ServerPlayerIsInChatRoom()) return suck();
  clearAutoSuckVerify();

  const alwaysFails = abclPlayer.stats.MentalRegression >= MENTAL_REGRESSION_SUCKING_RESIST_FAIL_THRESHOLD;
  const doSuck = () => {
    clearAutoSuckVerify();
    suck();
  };

  autoSuckVerifyTimeout = setTimeout(doSuck, AUTO_SUCK_VERIFY_TIMEOUT);

  const trickButton = Math.random() < 0.25;
  const buttonLabel = trickButton ? "Verify you are a baby" : "Verify you aren't a baby";
  const message = trickButton
    ? "You feel the urge to suck. Press down on this button to verify that you are a baby!"
    : "You feel the urge to suck. Press down on this button to verify that you aren't a baby!";

  const button = ElementButton.Create("abcl-chat-button-verify-adult", null, null, {
    button: {
      classList: ["abcl-chat-button"],
      children: [buttonLabel],
    },
  });
  ChatRoomSendLocal(
    ElementCreate({
      tag: "div",
      children: [message, button],
    }).outerHTML,
  );

  const buttonEl = document.querySelector("#abcl-chat-button-verify-adult");
  if (!buttonEl) return;

  let holdTimer: number | null = null;

  const startHold = () => {
    if (!autoSuckVerifyTimeout) return;
    buttonEl.textContent = "Hold it down...";
    holdTimer = setTimeout(() => {
      holdTimer = null;
      if (!autoSuckVerifyTimeout) return;
      if (alwaysFails) {
        sendChatLocal("You try to hold the button down, but your thumb (or pacifier) finds its way to your mouth instead...");
        doSuck();
        return;
      }
      if (trickButton) {
        sendChatLocal("You hold the button down and verify that you are a baby. Good baby.");
        doSuck();
        return;
      }
      clearAutoSuckVerify();
      sendChatLocal("You hold the button down and resist the urge. For now.");
    }, AUTO_SUCK_HOLD_DURATION);
  };

  const cancelHold = () => {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
      if (autoSuckVerifyTimeout) buttonEl.textContent = buttonLabel;
    }
  };

  buttonEl.addEventListener("mousedown", startHold);
  buttonEl.addEventListener("touchstart", startHold);
  buttonEl.addEventListener("mouseup", cancelHold);
  buttonEl.addEventListener("mouseleave", cancelHold);
  buttonEl.addEventListener("touchend", cancelHold);
  buttonEl.addEventListener("touchcancel", cancelHold);
};

function getBladderState(player: Character = Player): "blocked" | "open" | "normal" {
  const catheterizedEffect = CommonClamp(InventoryCraftCount(player, "Catheterized" as CraftingPropertyType, true), 0, 1);
  const vulvaPiercings = InventoryGet(player, "ItemVulvaPiercings");
  if (vulvaPiercings && vulvaPiercings.Asset.Name == "Catheter") {
    if (vulvaPiercings.Property.TypeRecord?.["o"] === 1) return "blocked";
    return "open";
  }
  if (window?.LITTLISH_CLUB?.isRuleActive?.(player, RuleId.PREVENT_RESISTING_URGES)) return "open";
  if (catheterizedEffect > 0 || vulvaPiercings?.Craft?.Name.toLowerCase().includes("catheter")) return "open";

  return "normal";
}

function getBowelState(player: Character = Player): "blocked" | "open" | "normal" {
  const hollowEffect = CommonClamp(InventoryCraftCount(player, "Hollow" as CraftingPropertyType, true), 0, 1);
  const butt = InventoryGet(player, "ItemButt");
  const itemDevices = InventoryGet(player, "ItemDevices");

  if (itemDevices?.Asset.Name === "Enema") return "blocked";
  if (hollowEffect > 0 || butt?.Asset.Name == "HollowButtPlug" || butt?.Craft?.Name.toLowerCase().includes("hollow")) return "open";

  if (window?.LITTLISH_CLUB?.isRuleActive?.(player, RuleId.PREVENT_RESISTING_URGES)) return "open";
  if (butt) return "blocked";
  return "normal";
}

export const abclPlayer = {
  pendingMiniGameTimeout: null as number | null,
  get settings() {
    return Player.ABCL.Settings;
  },
  get miniGameDifficulty(): number {
    return MiniGameDifficultyToNumber[Player.ABCL.Settings.MiniGameDifficulty];
  },
  onAccident: () => {
    abclPlayer.stats.MentalRegression += mentalRegressionOnAccident();
  },
  /** called frequently */
  tick: () => {
    if (!shouldABCLActivate()) return;
    if (Player.ABCL.Settings.PeeMetabolism !== "Disabled") {
      const diureticCount = CommonClamp(InventoryCraftCount(Player, "Diuretic" as CraftingPropertyType, true), 0, 5);

      abclPlayer.stats.BladderValue +=
        abclPlayer.stats.WaterIntake * MetabolismSettingValues[Player.ABCL.Settings.PeeMetabolism] * Math.max(1 + diureticCount / 2, 1);
      abclPlayer.attemptWetting();
    }
    if (Player.ABCL.Settings.PoopMetabolism !== "Disabled") {
      const laxativeCount = CommonClamp(InventoryCraftCount(Player, "Laxative" as CraftingPropertyType, true), 0, 5);

      abclPlayer.stats.BowelValue +=
        abclPlayer.stats.FoodIntake * MetabolismSettingValues[Player.ABCL.Settings.PoopMetabolism] * Math.max(1 + laxativeCount / 2, 1);
      abclPlayer.attemptSoiling();
    }
    playerSaver.save();
  },
  /** once per minute */
  update: () => {
    if (!shouldABCLActivate()) return;
    if (Player.ABCL.Settings.PauseStats) {
      if (!Player.ABCL.Settings.UnPauseStatsWhenDiapered || !hasDiaper()) return;
      sendChatLocal("Stats unpaused due to setting unpause when diapered.");
      // re-enable stats if the player has a diaper on, since they can still have accidents
      Player.ABCL.Settings.PauseStats = false;
    }

    bowelThrottler.allowedCallInterval = (120 * 1000) / Math.max(0.1, MetabolismSettingValues[Player.ABCL.Settings.PoopMetabolism]);
    bladderThrottler.allowedCallInterval = (120 * 1000) / Math.max(0.1, MetabolismSettingValues[Player.ABCL.Settings.PeeMetabolism]);

    if (regressionThrottler.check()) {
      abclPlayer.stats.MentalRegression += mentalRegressionOvertime();
    }
    if (
      !Player.ABCL.Settings.DisableAutoSucking &&
      abclPlayer.stats.MentalRegression > MENTAL_REGRESSION_SUCKING_HABIT_THRESHOLD &&
      regressedSelfSoothingThrottler.check()
    ) {
      const suck = () => {
        if (hasPacifier(Player)) {
          suckPacifierFunction(Player);
        } else if (!Player.IsRestrained() && !Player.IsMouthBlocked()) {
          suckThumbFunction(Player);
        }
      };
      promptAutoSuckVerification(suck);
    }
    if (!Player.ABCL.Settings.DisableAutoDrool && abclPlayer.stats.MentalRegression > MENTAL_REGRESSION_DROOL_THRESHOLD && droolThrottler.check()) {
      CharacterSetFacialExpression(Player, "Fluids", "DroolMedium", 20);
      droolThrottler.allowedCallInterval = 2 * 60 * 1000 + Math.random() * 60 * 1000;
    }
    if (bladderThrottler.check() && Player.ABCL.Settings.PeeMetabolism !== "Disabled") {
      const diureticCount = CommonClamp(InventoryCraftCount(Player, "Diuretic" as CraftingPropertyType, true), 0, 5);

      abclPlayer.stats.BladderValue +=
        abclPlayer.stats.WaterIntake * MetabolismSettingValues[Player.ABCL.Settings.PeeMetabolism] * Math.max(1 + diureticCount / 1.25, 1);
      abclPlayer.attemptWetting();
    }
    if (bowelThrottler.check() && Player.ABCL.Settings.PoopMetabolism !== "Disabled") {
      const laxativeCount = CommonClamp(InventoryCraftCount(Player, "Laxative" as CraftingPropertyType, true), 0, 5);

      abclPlayer.stats.BowelValue +=
        abclPlayer.stats.FoodIntake * MetabolismSettingValues[Player.ABCL.Settings.PoopMetabolism] * Math.max(1 + laxativeCount, 1);
      abclPlayer.attemptSoiling();
    }
    playerSaver.save();
  },
  changeDiaper: (target: Character, silent: boolean = false) => {
    const isSelf = target.MemberNumber === Player.MemberNumber;
    if (!silent)
      sendABCLAction(
        isSelf ? grammar.flatten("#changeDiaper-default-self#") : grammar.flatten("#changeDiaper-default-other#", false, Player, target),
        undefined,
        "changeDiaper",
      );
    playDiaperUsageSound("changing");
    abclPlayer.stats.WetnessValue = 0;
    abclPlayer.stats.SoilinessValue = 0;
    updateDiaperColor();
    syncData();
  },
  wetClothing: (sittingOn?: "toilet" | "potty", silent: boolean = false) => {
    if (Player.ABCL.Settings.DisableWettingLeaks) {
      abclPlayer.stats.BladderValue = 0;
      return;
    }

    let actionKey = "#wetting-clothing-default#";
    if (hasDiaper()) {
      if (sittingOn === "toilet") {
        actionKey = "#wetting-clothing-diaper-leak-on-toilet#";
      } else if (sittingOn === "potty") {
        actionKey = "#wetting-clothing-diaper-leak-on-potty#";
      } else {
        actionKey = "#wetting-clothing-diaper-leak#";
      }
    } else {
      if (sittingOn === "toilet") {
        actionKey = "#wetting-clothing-on-toilet#";
      } else if (sittingOn === "potty") {
        actionKey = "#wetting-clothing-on-potty#";
      }
    }
    if (!silent) sendABCLAction(grammar.flatten(actionKey), undefined, "wetClothing");

    const previousPuddleSize = abclPlayer.stats.PuddleSize;
    abclPlayer.stats.PuddleSize += abclPlayer.stats.BladderValue;
    abclPlayer.stats.BladderValue = 0;

    if (!silent && previousPuddleSize === 0 && abclPlayer.stats.PuddleSize > 0) {
      sendABCLAction(grammar.flatten("#wetting-floor-action#"), undefined, "puddle");
      //triggerDiaperUsageSound("puddle");
    }
    if (hasDiaper()) triggerDiaperUsageSound("diaper_wetting");
    else triggerDiaperUsageSound("misc_wetting");

    if (Player.ABCL.Settings.DisableClothingStains) return;
    const wetColor = "#96936C";

    const panties = InventoryGet(Player, "Panties");
    if (panties && !isDiaper(panties)) {
      const pantiesColors = getColor(panties.Color || (panties.Asset.DefaultColor as ItemColor), panties.Asset);
      panties.Color = pantiesColors.map(color => (isColorable(color) ? averageColor(color, wetColor, 0.3) : color));
    }

    for (const item of Player.Appearance) {
      if (ABCLdata.ItemDefinitions.Pants.some(pants => pants === item.Asset.DynamicGroupName + item.Asset.Name)) {
        const colors = getColor(item.Color || (item.Asset.DefaultColor as ItemColor), item.Asset);
        item.Color = colors.map(color => (isColorable(color) ? averageColor(color, wetColor, 0.3) : color));
      }
    }
    syncData();
  },
  soilClothing: (sittingOn?: "toilet" | "potty", silent: boolean = false) => {
    abclPlayer.stats.BowelValue = 0;
    if (Player.ABCL.Settings.DisableSoilingLeaks) return;
    let actionKey = "#soiling-clothing-default#";
    if (hasDiaper()) {
      if (sittingOn === "toilet") {
        actionKey = "#soiling-clothing-diaper-leak-on-toilet#";
      } else if (sittingOn === "potty") {
        actionKey = "#soiling-clothing-diaper-leak-on-potty#";
      } else {
        actionKey = "#soiling-clothing-diaper-leak#";
      }
    } else {
      if (sittingOn === "toilet") {
        actionKey = "#soiling-clothing-on-toilet#";
      } else if (sittingOn === "potty") {
        actionKey = "#soiling-clothing-on-potty#";
      }
    }
    if (!silent) sendABCLAction(grammar.flatten(actionKey), undefined, "soilClothing");

    if (Player.ABCL.Settings.DisableClothingStains) return;

    const messColor = "#261a16";

    const panties = InventoryGet(Player, "Panties");
    if (panties && !isDiaper(panties)) {
      const pantiesColors = getColor(panties.Color || (panties.Asset.DefaultColor as ItemColor), panties.Asset);
      panties.Color = pantiesColors.map(color => (isColorable(color) ? averageColor(color, messColor, 0.3) : color));
    }

    for (const item of Player.Appearance) {
      if (ABCLdata.ItemDefinitions.Pants.some(pants => pants === item.Asset.DynamicGroupName + item.Asset.Name)) {
        const colors = getColor(item.Color || (item.Asset.DefaultColor as ItemColor), item.Asset);
        item.Color = colors.map(color => (isColorable(color) ? averageColor(color, messColor, 0.3) : color));
      }
    }
    syncData();
  },
  wetDiaper: (sittingOn?: "toilet" | "potty", silent: boolean = false) => {
    const diaperSize = getPlayerDiaperSize();
    const absorbedVolume = Math.min(abclPlayer.stats.BladderValue, Math.max(0, diaperSize - abclPlayer.stats.WetnessValue));

    let actionMessage = "#wetting-default-undies#";
    if (sittingOn === "toilet") {
      actionMessage = "#wetting-default-on-toilet-with-diaper#";
    } else if (sittingOn === "potty") {
      actionMessage = "#wetting-default-on-potty-with-diaper#";
    }
    if (!silent) sendABCLAction(grammar.flatten(actionMessage), undefined, "wetDiaper");
    if (hasDiaper()) triggerDiaperUsageSound("diaper_wetting");

    abclPlayer.stats.BladderValue -= absorbedVolume;
    abclPlayer.stats.WetnessValue += absorbedVolume;
    if (abclPlayer.stats.WetnessValue >= diaperSize) {
      abclPlayer.wetClothing(sittingOn, silent);
    }
    syncData();
  },
  soilDiaper: (sittingOn?: "toilet" | "potty", silent: boolean = false) => {
    const diaperSize = getPlayerDiaperSize();
    const absorbedVolume = Math.min(abclPlayer.stats.BowelValue, Math.max(0, diaperSize - abclPlayer.stats.SoilinessValue));

    let actionMessage = "#soiling-default-undies#";
    if (sittingOn === "toilet") {
      actionMessage = "#soiling-default-on-toilet-with-diaper#";
    } else if (sittingOn === "potty") {
      actionMessage = "#soiling-default-on-potty-with-diaper#";
    }
    if (!silent) sendABCLAction(grammar.flatten(actionMessage), undefined, "soilDiaper");
    if (!silent && hasDiaper()) triggerDiaperUsageSound("diaper_soiling");

    abclPlayer.stats.BowelValue -= absorbedVolume;
    abclPlayer.stats.SoilinessValue += absorbedVolume * 4; // soiling should be more impactful
    if (abclPlayer.stats.SoilinessValue >= diaperSize) {
      abclPlayer.soilClothing(sittingOn, silent);
    }
    syncData();
  },
  attemptAccident: function (type: "wet" | "mess", force?: boolean) {
    const isWet = type === "wet";
    const fullness = isWet ? abclPlayer.stats.BladderFullness : abclPlayer.stats.BowelFullness;
    const limit = incontinenceLimitFormula(abclPlayer.stats.Incontinence);
    const chance = incontinenceChanceFormula(abclPlayer.stats.Incontinence, fullness);
    if (fullness >= 1) {
      abclPlayer.stats.Incontinence += INCONTINENCE_ON_STATS_OVERFLOW * (1 - abclPlayer.stats.Incontinence);
      // maybe a message here
      return isWet ? WetMinigameResult(false) : MessMinigameResult(false);
    }
    if (!force) {
      if (!(Math.random() < chance || fullness > limit)) return;
      if (!incontinenceCheck.check()) return;
    }

    const bowelState = getBowelState();
    const bladderState = getBladderState();

    if (isWet) {
      if (bladderState === "blocked") return;
      if (bladderState === "open") return WetMinigameResult(false);
    } else {
      if (bowelState === "blocked") return;
      if (bowelState === "open") return MessMinigameResult(false);
    }

    if (isAccidentsAutoPiloted()) {
      const result = getAccidentAutopilotOutcome(isWet ? "Wet" : "Mess");
      return isWet ? WetMinigameResult(result) : MessMinigameResult(result);
    }

    const difficulty = 1 + abclPlayer.miniGameDifficulty * Math.max(fullness, chance);
    const callback = isWet ? "WetMinigameResult" : "MessMinigameResult";

    this.pendingMiniGameTimeout = setTimeout(() => {
      if (!abclPlayer.pendingMiniGameTimeout) return;
      clearTimeout(abclPlayer.pendingMiniGameTimeout);
      abclPlayer.pendingMiniGameTimeout = null;
      isWet ? WetMinigameResult(false) : MessMinigameResult(false);
    }, 30 * 1000);
    ElementRemove("#abcl-chat-button-resist");
    ElementRemove("#abcl-chat-button-letgo");
    const buttons = ElementCreate({
      tag: "div",
      classList: ["abcl-chat-buttons"],
      children: [
        ElementButton.Create("abcl-chat-button-resist", null, null, {
          button: {
            classList: ["abcl-chat-button"],
            children: ["Try to resist"],
          },
        }),
        ElementButton.Create(
          "abcl-chat-button-letgo",
          function () {
            if (!abclPlayer.pendingMiniGameTimeout) return;
            clearTimeout(abclPlayer.pendingMiniGameTimeout);
            abclPlayer.pendingMiniGameTimeout = null;
            isWet ? WetMinigameResult(false) : MessMinigameResult(false);
          },
          null,
          {
            button: {
              classList: ["abcl-chat-button"],
              children: ["Let go"],
            },
          },
        ),
      ],
    });
    ChatRoomSendLocal(
      ElementCreate({
        tag: "div",
        children: [`You feel a sudden urge to ${isWet ? "wet" : "mess"} yourself.`, buttons],
      }).outerHTML,
    );
    document.querySelector(`#abcl-chat-button-resist`)?.addEventListener("click", function () {
      if (!abclPlayer.pendingMiniGameTimeout) return;
      clearTimeout(abclPlayer.pendingMiniGameTimeout);
      abclPlayer.pendingMiniGameTimeout = null;
      if (!abclPlayer.settings.UseNewMiniGame) {
        const minigame = isWet ? "DistractionRush-Wetting" : "DistractionRush-Messes";
        MiniGameStart(minigame as ModuleScreens["MiniGame"], difficulty, callback as any);
        return;
      }
      MiniGameStart("DropletCatch" as ModuleScreens["MiniGame"], difficulty, callback as any);
    });
    document.querySelector(`#abcl-chat-button-letgo`)?.addEventListener("click", function () {
      if (!abclPlayer.pendingMiniGameTimeout) return;
      clearTimeout(abclPlayer.pendingMiniGameTimeout);
      abclPlayer.pendingMiniGameTimeout = null;
      isWet ? WetMinigameResult(false) : MessMinigameResult(false);
    });
  },
  /** @Deprecated use `attemptAccident` instead */
  attemptWetting: (force?: boolean) => {
    abclPlayer.attemptAccident("wet", force);
  },
  /** @Deprecated use `attemptAccident` instead */
  attemptSoiling: (force?: boolean) => {
    abclPlayer.attemptAccident("mess", force);
  },
  wet: (intentional: boolean = false, sittingOn?: "toilet" | "potty", silent: boolean = false) => {
    const incontinenceOffset = 0.3 * abclPlayer.stats.Incontinence;
    const isTooEarly = abclPlayer.stats.BladderFullness < 0.3 - incontinenceOffset;
    const isPossible = !isTooEarly;
    const isGood = abclPlayer.stats.BladderFullness > 0.6 - incontinenceOffset;
    if (isTooEarly && intentional) {
      sendChatLocal("You try to pee, but it doesn't seem to be working.");
      return;
    }
    if (isPossible) {
      hasDiaper() ? abclPlayer.wetDiaper(sittingOn, silent) : abclPlayer.wetClothing(sittingOn, silent);
    }
    if (isGood && intentional) {
      abclPlayer.stats.Incontinence -= incontinenceOnAccident(abclPlayer.stats.Incontinence);
    } else {
      abclPlayer.stats.Incontinence += incontinenceOnAccident(abclPlayer.stats.Incontinence);
    }
  },
  soil: (intentional: boolean = false, sittingOn?: "toilet" | "potty", silent: boolean = false) => {
    const incontinenceOffset = 0.3 * abclPlayer.stats.Incontinence;
    const isTooEarly = abclPlayer.stats.BowelFullness < 0.3 - incontinenceOffset;
    const isPossible = !isTooEarly;
    const isGood = abclPlayer.stats.BowelFullness > 0.6 - incontinenceOffset;
    if (isTooEarly && intentional) {
      sendChatLocal("You try to let go, but nothing seems to happen.");
      return;
    }
    if (isPossible) {
      hasDiaper() ? abclPlayer.soilDiaper(sittingOn, silent) : abclPlayer.soilClothing(sittingOn, silent);
    }
    if (isGood && intentional) {
      abclPlayer.stats.Incontinence -= 0.01;
    } else {
      abclPlayer.stats.Incontinence += 0.02;
    }
  },
  stats: {
    set PuddleSize(value: number) {
      if (value < 0) value = 0;
      if (value > PUDDLE_MAX_SIZE) value = PUDDLE_MAX_SIZE;
      sendStatusMessage("PuddleSize", Player.ABCL.Stats.PuddleSize.value, value, PUDDLE_MAX_SIZE);
      Player.ABCL.Stats.PuddleSize.value = value;
      syncData();
    },
    get PuddleSize() {
      return Player.ABCL.Stats.PuddleSize.value;
    },
    get MentalRegressionModifier() {
      return MetabolismSettingValues[Player.ABCL.Settings.MentalRegressionModifier];
    },
    set MentalRegression(value: number) {
      if (value < 0) value = 0;
      if (value > 1) value = 1;
      if (Player.ABCL.Settings.MentalRegressionOnlyIncrease && value < Player.ABCL.Stats.MentalRegression.value) {
        return;
      }
      sendStatusMessage("MentalRegression", Player.ABCL.Stats.MentalRegression.value, value, 1);
      Player.ABCL.Stats.MentalRegression.value = value;
      abclStatsWindow.update();
    },
    get MentalRegression() {
      return Player.ABCL.Stats.MentalRegression.value;
    },
    set Incontinence(value: number) {
      if (value < 0) value = 0;
      if (value > 1) value = 1;
      if (Player.ABCL.Settings.IncontinenceOnlyIncrease && value < Player.ABCL.Stats.Incontinence.value) {
        return;
      }
      sendStatusMessage("Incontinence", Player.ABCL.Stats.Incontinence.value, value, 1);
      Player.ABCL.Stats.Incontinence.value = value;
      abclStatsWindow.update();
    },
    get Incontinence() {
      return Player.ABCL.Stats.Incontinence.value;
    },

    // intake
    set WaterIntake(value: number) {
      if (value < 0) value = 0;
      Player.ABCL.Stats.WaterIntake.value = value;
    },
    get WaterIntake() {
      return Player.ABCL.Stats.WaterIntake.value;
    },
    set FoodIntake(value: number) {
      if (value < 0) value = 0;
      Player.ABCL.Stats.FoodIntake.value = value;
    },
    get FoodIntake() {
      return Player.ABCL.Stats.FoodIntake.value;
    },

    // bladder
    set BladderValue(value: number) {
      if (value < 0) value = 0;
      if (value > this.BladderSize * 2) value = this.BladderSize * 2;
      sendStatusMessage("Bladder", this.BladderValue, value, this.BladderSize);
      Player.ABCL.Stats.Bladder.value = value;
      abclStatsWindow.update();
      syncData();
    },
    get BladderValue() {
      return Player.ABCL.Stats.Bladder.value;
    },
    set BladderSize(value: number) {
      if (value < 0) value = 0;
      Player.ABCL.Stats.Bladder.size = value;
      abclStatsWindow.update();
    },
    get BladderSize(): number {
      return Player.ABCL.Stats.Bladder.size;
    },
    set WetnessValue(value: number) {
      if (value == Player.ABCL.Stats.Wetness.value) return;
      if (value < 0) value = 0;
      const max = getPlayerDiaperSize();
      if (value > max) {
        const overflow = value - max;
        value -= overflow;
        this.PuddleSize += overflow;
      }
      sendStatusMessage("Wetness", this.WetnessValue, value, max);
      Player.ABCL.Stats.Wetness.value = value;
      updateDiaperColor();
      syncData();
      abclStatsWindow.update();
    },
    get WetnessValue() {
      return Player.ABCL.Stats.Wetness.value;
    },
    // computed
    set BladderFullness(value: number) {
      if (value < 0) value = 0;

      this.BladderValue = value * this.BladderSize;
      abclStatsWindow.update();
    },
    get BladderFullness(): number {
      return this.BladderValue / this.BladderSize;
    },

    // bowel
    set BowelValue(value: number) {
      if (value < 0) value = 0;
      if (value > this.BowelSize * 2) value = this.BowelSize * 2;
      sendStatusMessage("Bowel", this.BowelValue, value, this.BowelSize);
      Player.ABCL.Stats.Bowel.value = value;
      abclStatsWindow.update();
      syncData();
    },
    get BowelValue() {
      return Player.ABCL.Stats.Bowel.value;
    },

    set BowelSize(value: number) {
      if (value < 0) value = 0;
      Player.ABCL.Stats.Bowel.size = value;
      abclStatsWindow.update();
    },
    get BowelSize(): number {
      return Player.ABCL.Stats.Bowel.size;
    },
    set SoilinessValue(value: number) {
      if (value == Player.ABCL.Stats.Soiliness.value) return;
      const max = getPlayerDiaperSize();
      if (value < 0) value = 0;
      sendStatusMessage("Soiliness", this.SoilinessValue, value, max);
      Player.ABCL.Stats.Soiliness.value = value;
      updateDiaperColor();
      abclStatsWindow.update();
      syncData();
    },
    get SoilinessValue() {
      return Player.ABCL.Stats.Soiliness.value;
    },
    // computed
    set BowelFullness(value: number) {
      if (value < 0) value = 0;
      this.BowelValue = value * this.BowelSize;
      abclStatsWindow.update();
    },
    get BowelFullness(): number {
      return this.BowelValue / this.BowelSize;
    },

    get SoilinessPercentage(): number {
      if (getPlayerDiaperSize() == 0) return 0;
      return this.SoilinessValue / getPlayerDiaperSize();
    },
    set SoilinessPercentage(value: number) {
      if (value < 0) value = 0;

      this.SoilinessValue = value * getPlayerDiaperSize();
    },
    get WetnessPercentage(): number {
      if (getPlayerDiaperSize() == 0) return 0;
      return this.WetnessValue / getPlayerDiaperSize();
    },
    set WetnessPercentage(value: number) {
      if (value < 0) value = 0;

      this.WetnessValue = value * getPlayerDiaperSize();
    },
  },
};
export function shouldABCLActivate() {
  if (ChatRoomData?.BlockCategory?.includes("ABDL")) return false;
  return true;
}
const playerSaver = new Saver(2 * 60 * 1000);

export const incontinenceCheck = new Throttler(2 * 60 * 1000);

(window as any).abclPlayer = abclPlayer;
