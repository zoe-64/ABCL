import { isColorable, Throttler, getColor, Saver, sendChatLocal, createRateLimiter } from "../utils";
import {
  incontinenceChanceFormula,
  getPlayerDiaperSize,
  mentalRegressionOnAccident,
  updateDiaperColor,
  incontinenceLimitFormula,
  hasDiaper,
  averageColor,
  isDiaper,
  incontinenceOnAccident,
  mentalRegressionOvertime,
} from "./diaper";
import { abclStatsWindow } from "./ui";
import { ABCLdata } from "../../constants";
import { MetabolismSettingValues, MiniGameDifficultyToNumber } from "../../types/types";
import { isAccidentsAutopiloted as isAccidentsAutoPiloted, sendABCLAction, sendStatusMessage } from "./playerUtils";
import { sendUpdateMyData } from "../hooks";
import { MessMinigame, WetMinigame as WetMiniGame } from "../minigames";
import { RuleId } from "src/types/definitions";
import { MessMinigameResult, WetMinigameResult } from "../minigames/baseMinigame";

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
    return Player.ABCL.Settings
  },
  get miniGameDifficulty(): number {
    return MiniGameDifficultyToNumber[Player.ABCL.Settings.MiniGameDifficulty]
  },
  onAccident: () => {
    abclPlayer.stats.MentalRegression += mentalRegressionOnAccident();
  },
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
    if (Player.ABCL.Settings.PauseStats) return;
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
    
    sendABCLAction(actionMessage, undefined, "wetClothing")
    sendUpdateMyData();
    if (Player.ABCL.Settings.DisableClothingStains) return;
    const wetColor = "#96936C";

    const panties = InventoryGet(Player, "Panties");
    if (panties && !isDiaper(panties)) {
      const pantiesColors = getColor(panties.Color || (panties.Asset.DefaultColor as ItemColor), panties.Asset);
      for (let i = 0; i < pantiesColors.length; i++) {
        if (!isColorable(pantiesColors[i])) continue;
        pantiesColors[i] = averageColor(pantiesColors[i], wetColor, 0.3);
      }
      panties.Color = pantiesColors;
    }

    for (const item of Player.Appearance) {
      if (ABCLdata.ItemDefinitions.Pants.some(pants => pants === item.Asset.DynamicGroupName + item.Asset.Name)) {
        const colors = getColor(item.Color || (item.Asset.DefaultColor as ItemColor), item.Asset);
        for (let i = 0; i < colors.length; i++) {
          if (!isColorable(colors[i])) continue;
          colors[i] = averageColor(colors[i], wetColor, 0.3);
        }
        item.Color = colors;
      }
    }

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
      actionMessage = `%POSSESSIVE%'s diaper leaks and ${actionMessage}`
    } 
    if (sittingOn === "toilet") {
      actionMessage = `${actionMessage} while sitting on the toilet`;
    } else if (sittingOn === "potty") {
      actionMessage = `${actionMessage} while sitting on the potty`;
    }
    actionMessage = `%NAME% ${actionMessage}.`;
    sendABCLAction(actionMessage, undefined, "soilClothing");
    
    sendUpdateMyData();
    if (Player.ABCL.Settings.DisableClothingStains) return;

    const messColor = "#261a16";

    const panties = InventoryGet(Player, "Panties");
    if (panties && !isDiaper(panties)) {
      const pantiesColors = getColor(panties.Color || (panties.Asset.DefaultColor as ItemColor), panties.Asset);
      for (let i = 0; i < pantiesColors.length; i++) {
        if (!isColorable(pantiesColors[i])) continue;
        pantiesColors[i] = averageColor(pantiesColors[i], messColor, 0.3);
      }
      panties.Color = pantiesColors;
    }

    for (const item of Player.Appearance) {
      if (ABCLdata.ItemDefinitions.Pants.some(pants => pants === item.Asset.DynamicGroupName + item.Asset.Name)) {
        const colors = getColor(item.Color || (item.Asset.DefaultColor as ItemColor), item.Asset);
        for (let i = 0; i < colors.length; i++) {
          if (!isColorable(colors[i])) continue;
          colors[i] = averageColor(colors[i], messColor, 0.3);
        }
        item.Color = colors;
      }
    }
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
    abclPlayer.stats.SoilinessValue += absorbedVolume;

    if (abclPlayer.stats.SoilinessValue >= diaperSize) {
      abclPlayer.soilClothing(sittingOn);
    }
  },
  attemptWetting: (force?: boolean) => {
    const limit = incontinenceLimitFormula(abclPlayer.stats.Incontinence);
    const chance = incontinenceChanceFormula(abclPlayer.stats.Incontinence, abclPlayer.stats.BladderFullness);

    if (!(Math.random() < chance || abclPlayer.stats.BladderFullness > limit)) return;

    if (!force && !incontinenceCheck.check()) return;
    if (window?.LITTLISH_CLUB?.isRuleActive?.(Player, RuleId.PREVENT_RESISTING_URGES)) return new WetMiniGame().End(false);
    if (isAccidentsAutoPiloted()) return WetMinigameResult(false);
    MiniGameStart("DropletCatch" as ModuleScreens["MiniGame"], 1 + abclPlayer.miniGameDifficulty * Math.max(abclPlayer.stats.BladderFullness, chance), WetMinigameResult);
    //MiniGameStart("DistractionRush-Wetting" as ModuleScreens["MiniGame"], 1 + chance, "WetMinigameResult");
  },
  attemptSoiling: (force?: boolean) => {
    const limit = incontinenceLimitFormula(abclPlayer.stats.Incontinence);
    const chance = incontinenceChanceFormula(abclPlayer.stats.Incontinence, abclPlayer.stats.BowelFullness);

    if (!(Math.random() < chance || abclPlayer.stats.BowelFullness > limit)) return;

    if (!force && !incontinenceCheck.check()) return;
    if (window?.LITTLISH_CLUB?.isRuleActive?.(Player, RuleId.PREVENT_RESISTING_URGES)) return new MessMinigame().End(false);
    if (isAccidentsAutoPiloted()) return MessMinigameResult(false);
    MiniGameStart("DropletCatch" as ModuleScreens["MiniGame"], 1 + abclPlayer.miniGameDifficulty * Math.max(abclPlayer.stats.BowelFullness, chance), MessMinigameResult);
    //MiniGameStart("DistractionRush-Messes" as ModuleScreens["MiniGame"], 1 + chance, "MessMinigameResult");
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
      if (value > 250) value = 250;
      const delta = value - Player.ABCL.Stats.PuddleSize.value;
      sendStatusMessage("PuddleSize", delta);
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
      const delta = value - Player.ABCL.Stats.MentalRegression.value;
      sendStatusMessage("MentalRegression", delta, true);
      Player.ABCL.Stats.MentalRegression.value = value;
      abclStatsWindow.update();
    },
    get MentalRegression() {
      return Player.ABCL.Stats.MentalRegression.value;
    },
    set Incontinence(value: number) {
      if (value < 0) value = 0;
      if (value > 1) value = 1;
      const delta = value - Player.ABCL.Stats.Incontinence.value;
      sendStatusMessage("Incontinence", delta, true);
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
      const delta = value / this.BladderSize - this.BladderFullness;
      sendStatusMessage("Bladder", delta, true);
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
      if (value < 0) value = 0;
      if (value > getPlayerDiaperSize()) {
        const overflow = value - getPlayerDiaperSize();
        value -= overflow;
        this.PuddleSize += overflow;
      }
      const delta = value / getPlayerDiaperSize() - this.WetnessPercentage;
      sendStatusMessage("Wetness", delta, true);
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
      const delta = value / this.BowelSize - this.BowelFullness;
      sendStatusMessage("Bowel", delta, true);
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
      if (value < 0) value = 0;
      const delta = value / getPlayerDiaperSize() - this.SoilinessPercentage;
      sendStatusMessage("Soiliness", delta, true);
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
