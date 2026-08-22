import { RuleId } from "src/types/definitions";
import { ABCLdata, INCONTINENCE_ON_STATS_OVERFLOW, PUDDLE_MAX_SIZE } from "../../constants";
import { MetabolismSettingValues, MiniGameDifficultyToNumber } from "../../types/types";
import { MessMinigameResult, WetMinigameResult } from "../minigames/baseMinigame";
import { syncData } from "../settings";
import { createRateLimiter, getColor, isColorable, Saver, sendChatLocal, Throttler } from "../utils";
import {
  averageColor,
  getPlayerDiaperSize,
  hasDiaper,
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

export const queueUpdatePlayerClothes = createRateLimiter<typeof updatePlayerClothes>(updatePlayerClothes, 1 * 1000);

const bowelThrottler = new Throttler(120 * 60 * 1000);
const bladderThrottler = new Throttler(120 * 60 * 1000);
const regressionThrottler = new Throttler(5 * 60 * 1000);
export const abclPlayer = {
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
    if (Player.ABCL.Settings.PauseStats) {
      if (!Player.ABCL.Settings.UnPauseStatsWhenDiapered || !hasDiaper()) return;

      // re-enable stats if the player has a diaper on, since they can still have accidents
      Player.ABCL.Settings.PauseStats = false;
    }

    bowelThrottler.allowedCallInterval = (120 * 1000) / Math.max(0.1, MetabolismSettingValues[Player.ABCL.Settings.PoopMetabolism]);
    bladderThrottler.allowedCallInterval = (120 * 1000) / Math.max(0.1, MetabolismSettingValues[Player.ABCL.Settings.PeeMetabolism]);

    if (regressionThrottler.check()) {
      abclPlayer.stats.MentalRegression += mentalRegressionOvertime();
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
  wetClothing: (sittingOn?: "toilet" | "potty") => {
    if (Player.ABCL.Settings.DisableWettingLeaks) {
      abclPlayer.stats.BladderValue = 0;
      return;
    }

    let actionMessage = "wets %POSSESSIVE% clothes";
    if (sittingOn === "toilet") {
      actionMessage = `forgets to lift up the lid and ${actionMessage}`;
    }
    if (hasDiaper()) {
      actionMessage = `%POSSESSIVE%'s diaper leaks and ${actionMessage}`;
    }

    if (sittingOn === "toilet") {
      actionMessage = `${actionMessage} while sitting on the toilet`;
    } else if (sittingOn === "potty") {
      actionMessage = `${actionMessage} while sitting on the potty`;
    }
    actionMessage = `${actionMessage}, causing a puddle to form on the floor.`;
    actionMessage = `%NAME% ${actionMessage}.`;

    abclPlayer.stats.PuddleSize += abclPlayer.stats.BladderValue;
    abclPlayer.stats.BladderValue = 0;

    sendABCLAction(actionMessage, undefined, "wetClothing");
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
    queueUpdatePlayerClothes();
  },
  soilClothing: (sittingOn?: "toilet" | "potty") => {
    abclPlayer.stats.BowelValue = 0;
    if (Player.ABCL.Settings.DisableSoilingLeaks) return;
    let actionMessage = "soils %POSSESSIVE% clothes";
    if (sittingOn === "toilet") {
      actionMessage = `forgets to lift up the lid and ${actionMessage}`;
    }
    if (hasDiaper()) {
      actionMessage = `%POSSESSIVE%'s diaper leaks and ${actionMessage}`;
    }
    if (sittingOn === "toilet") {
      actionMessage = `${actionMessage} while sitting on the toilet`;
    } else if (sittingOn === "potty") {
      actionMessage = `${actionMessage} while sitting on the potty`;
    }
    actionMessage = `%NAME% ${actionMessage}.`;
    sendABCLAction(actionMessage, undefined, "soilClothing");

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
    queueUpdatePlayerClothes();
  },
  wetDiaper: (sittingOn?: "toilet" | "potty") => {
    const diaperSize = getPlayerDiaperSize();
    const absorbedVolume = Math.min(abclPlayer.stats.BladderValue, Math.max(0, diaperSize - abclPlayer.stats.WetnessValue));

    let actionMessage = "wets %POSSESSIVE% diaper";
    if (sittingOn === "toilet") {
      actionMessage = `forgets to lift up the lid and ${actionMessage} while sitting on the toilet`;
    } else if (sittingOn === "potty") {
      actionMessage = `${actionMessage} while sitting on the potty`;
    }
    actionMessage = `%NAME% ${actionMessage}.`;
    sendABCLAction(actionMessage, undefined, "wetDiaper");

    abclPlayer.stats.BladderValue -= absorbedVolume;
    abclPlayer.stats.WetnessValue += absorbedVolume;
    syncData();
    if (abclPlayer.stats.WetnessValue >= diaperSize) {
      abclPlayer.wetClothing(sittingOn);
    }
  },
  soilDiaper: (sittingOn?: "toilet" | "potty") => {
    const diaperSize = getPlayerDiaperSize();
    const absorbedVolume = Math.min(abclPlayer.stats.BowelValue, Math.max(0, diaperSize - abclPlayer.stats.SoilinessValue));
    let actionMessage = "soils %POSSESSIVE% diaper";
    if (sittingOn === "toilet") {
      actionMessage = `forgets to lift up the lid and ${actionMessage} while sitting on the toilet`;
    } else if (sittingOn === "potty") {
      actionMessage = `${actionMessage} while sitting on the potty`;
    }
    actionMessage = `%NAME% ${actionMessage}.`;
    sendABCLAction(actionMessage, undefined, "soilDiaper");
    abclPlayer.stats.BowelValue -= absorbedVolume;
    abclPlayer.stats.SoilinessValue += absorbedVolume * 4; // soiling should be more impactful
    syncData();
    if (abclPlayer.stats.SoilinessValue >= diaperSize) {
      abclPlayer.soilClothing(sittingOn);
    }
  },
  attemptAccident: (type: "wet" | "mess", force?: boolean) => {
    const isWet = type === "wet";
    const fullness = isWet ? abclPlayer.stats.BladderFullness : abclPlayer.stats.BowelFullness;
    const limit = incontinenceLimitFormula(abclPlayer.stats.Incontinence);
    const chance = incontinenceChanceFormula(abclPlayer.stats.Incontinence, fullness);
    if (fullness >= 1) {
      abclPlayer.stats.Incontinence += INCONTINENCE_ON_STATS_OVERFLOW * (1 - abclPlayer.stats.Incontinence);
      // maybe a message here
      return isWet ? WetMinigameResult(false) : MessMinigameResult(false);
    }
    if (!(Math.random() < chance || fullness > limit)) return;
    if (!force && !incontinenceCheck.check()) return;
    if (window?.LITTLISH_CLUB?.isRuleActive?.(Player, RuleId.PREVENT_RESISTING_URGES)) {
      return isWet ? WetMinigameResult(false) : MessMinigameResult(false);
    }
    const hollowEffect = CommonClamp(InventoryCraftCount(Player, "Hollow" as CraftingPropertyType, true), 0, 1);
    const hasHollowPlug = InventoryGet(Player, "ItemButt")?.Asset.Name == "HollowButtPlug";
    if ((hollowEffect > 0 || hasHollowPlug) && !isWet) {
      MessMinigameResult(false);
      return;
    }
    if (isAccidentsAutoPiloted()) {
      const result = getAccidentAutopilotOutcome(isWet ? "Wet" : "Mess");
      return isWet ? WetMinigameResult(result) : MessMinigameResult(result);
    }

    const difficulty = 1 + abclPlayer.miniGameDifficulty * Math.max(fullness, chance);
    const callback = isWet ? "WetMinigameResult" : "MessMinigameResult";
    if (!abclPlayer.settings.UseNewMiniGame) {
      const minigame = isWet ? "DistractionRush-Wetting" : "DistractionRush-Messes";
      MiniGameStart(minigame as ModuleScreens["MiniGame"], difficulty, callback as any);
      return;
    }
    MiniGameStart("DropletCatch" as ModuleScreens["MiniGame"], difficulty, callback as any);
  },
  /** @Deprecated use `attemptAccident` instead */
  attemptWetting: (force?: boolean) => {
    abclPlayer.attemptAccident("wet", force);
  },
  /** @Deprecated use `attemptAccident` instead */
  attemptSoiling: (force?: boolean) => {
    abclPlayer.attemptAccident("mess", force);
  },
  wet: (intentional: boolean = false, sittingOn?: "toilet" | "potty") => {
    const incontinenceOffset = 0.3 * abclPlayer.stats.Incontinence;
    const isTooEarly = abclPlayer.stats.BladderFullness < 0.3 - incontinenceOffset;
    const isPossible = !isTooEarly;
    const isGood = abclPlayer.stats.BladderFullness > 0.6 - incontinenceOffset;
    if (isTooEarly && intentional) {
      sendChatLocal("You try to pee, but it doesn't seem to be working.");
      return;
    }
    if (isPossible) {
      hasDiaper() ? abclPlayer.wetDiaper(sittingOn) : abclPlayer.wetClothing(sittingOn);
    }
    if (isGood && intentional) {
      abclPlayer.stats.Incontinence -= incontinenceOnAccident(abclPlayer.stats.Incontinence);
    } else {
      abclPlayer.stats.Incontinence += incontinenceOnAccident(abclPlayer.stats.Incontinence);
    }
  },
  soil: (intentional: boolean = false, sittingOn?: "toilet" | "potty") => {
    const incontinenceOffset = 0.3 * abclPlayer.stats.Incontinence;
    const isTooEarly = abclPlayer.stats.BowelFullness < 0.3 - incontinenceOffset;
    const isPossible = !isTooEarly;
    const isGood = abclPlayer.stats.BowelFullness > 0.6 - incontinenceOffset;
    if (isTooEarly && intentional) {
      sendChatLocal("You try to let go, but nothing seems to happen.");
      return;
    }
    if (isPossible) {
      hasDiaper() ? abclPlayer.soilDiaper(sittingOn) : abclPlayer.soilClothing(sittingOn);
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
      if (value > this.BladderSize) value = this.BladderSize;
      sendStatusMessage("Bladder", this.BladderValue, value, this.BladderSize);
      Player.ABCL.Stats.Bladder.value = value;
      abclStatsWindow.update();
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
      if (value > this.BowelSize) value = this.BowelSize;
      sendStatusMessage("Bowel", this.BowelValue, value, this.BowelSize);
      Player.ABCL.Stats.Bowel.value = value;
      abclStatsWindow.update();
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

const playerSaver = new Saver(2 * 60 * 1000);

export const incontinenceCheck = new Throttler(2 * 60 * 1000);

(window as any).abclPlayer = abclPlayer;
