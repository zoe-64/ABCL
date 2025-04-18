import { isColorable, Throttler, getColor, Saver, sendChatLocal } from "../utils";
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
import { MetabolismSettingValues } from "../../types/types";
import { SendABCLAction, SendStatusMessage } from "./playerUtils";
import { sendUpdateMyData } from "../hooks";
import { MessMinigame, WetMinigame } from "../minigames";
import { RuleId } from "src/types/definitions";

export const updatePlayerClothes = () => {
  CharacterRefresh(Player, true);
  ChatRoomCharacterUpdate(Player);
};
const bowelThrottler = new Throttler(120 * 60 * 1000);
const bladderThrottler = new Throttler(120 * 60 * 1000);
const regressionThrottler = new Throttler(5 * 60 * 1000);
export const abclPlayer = {
  onAccident: () => {
    abclPlayer.stats.MentalRegression += mentalRegressionOnAccident() ?? 0;
  },
  /** once per minute */
  update: () => {
    if (Player.ABCL.Settings.PauseStats) return;
    bowelThrottler.allowedCallInterval = (120 * 1000) / Math.max(0.1, MetabolismSettingValues[Player[modIdentifier].Settings.PoopMetabolism]);
    bladderThrottler.allowedCallInterval = (120 * 1000) / Math.max(0.1, MetabolismSettingValues[Player[modIdentifier].Settings.PeeMetabolism]);

    if (regressionThrottler.check()) {
      abclPlayer.stats.MentalRegression += (mentalRegressionOvertime() ?? 0) * 5;
    }
    if (bladderThrottler.check() && Player[modIdentifier].Settings.PoopMetabolism !== "Disabled") {
      abclPlayer.stats.BladderValue += abclPlayer.stats.WaterIntake * MetabolismSettingValues[Player[modIdentifier].Settings.PeeMetabolism];
      abclPlayer.attemptWetting();
    }
    if (bowelThrottler.check() && Player[modIdentifier].Settings.PoopMetabolism !== "Disabled") {
      abclPlayer.stats.BowelValue += abclPlayer.stats.FoodIntake * MetabolismSettingValues[Player[modIdentifier].Settings.PoopMetabolism];
      abclPlayer.attemptSoiling();
    }
    playerSaver.save();
  },
  wetClothing: () => {
    if (Player.ABCL.Settings.DisableWettingLeaks) return;
    // panties -> pants -> floor
    sendChatLocal("You've had a wet accident in your clothes!");
    abclPlayer.stats.PuddleSize += abclPlayer.stats.BladderValue;
    abclPlayer.stats.BladderValue = 0;
    if (hasDiaper()) {
      SendABCLAction("%NAME%'s diaper leaks and wet %POSSESSIVE% clothes causing a puddle to form.", undefined, "wetClothing");
    } else {
      SendABCLAction("%NAME%'s wets %POSSESSIVE% clothes and leaks onto the floor.", undefined, "wetClothing");
    }
    sendUpdateMyData();
    if (Player[modIdentifier].Settings.DisableClothingStains) return;
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
      if (ABCLdata.ItemDefinitions.Pants.some(pants => pants === item.Asset.Description)) {
        const colors = getColor(item.Color || (item.Asset.DefaultColor as ItemColor), item.Asset);
        for (let i = 0; i < colors.length; i++) {
          if (!isColorable(colors[i])) continue;
          colors[i] = averageColor(colors[i], wetColor, 0.3);
        }
        item.Color = colors;
      }
    }

    updatePlayerClothes();
  },
  soilClothing: () => {
    if (Player.ABCL.Settings.DisableSoilingLeaks) return;

    abclPlayer.stats.BowelValue = 0;
    if (hasDiaper()) {
      SendABCLAction("%NAME%'s diaper leaks and soils %POSSESSIVE% clothes.", undefined, "soilClothing");
    } else {
      SendABCLAction("%NAME% soils %POSSESSIVE% clothes.", undefined, "soilClothing");
    }
    sendUpdateMyData();
    if (Player[modIdentifier].Settings.DisableClothingStains) return;

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
      if (ABCLdata.ItemDefinitions.Pants.some(pants => pants === item.Asset.Description)) {
        const colors = getColor(item.Color || (item.Asset.DefaultColor as ItemColor), item.Asset);
        for (let i = 0; i < colors.length; i++) {
          if (!isColorable(colors[i])) continue;
          colors[i] = averageColor(colors[i], messColor, 0.3);
        }
        item.Color = colors;
      }
    }
    updatePlayerClothes();
  },
  wetDiaper: () => {
    const diaperSize = getPlayerDiaperSize();
    const absorbedVolume = Math.min(abclPlayer.stats.BladderValue, Math.max(0, diaperSize - abclPlayer.stats.WetnessValue));
    SendABCLAction("%NAME% wets %POSSESSIVE% diaper.", undefined, "wetDiaper");

    abclPlayer.stats.BladderValue -= absorbedVolume;
    abclPlayer.stats.WetnessValue += absorbedVolume;

    if (abclPlayer.stats.WetnessValue >= diaperSize) {
      abclPlayer.wetClothing();
    }
  },
  soilDiaper: () => {
    const diaperSize = getPlayerDiaperSize();
    const absorbedVolume = Math.min(abclPlayer.stats.BowelValue, Math.max(0, diaperSize - abclPlayer.stats.SoilinessValue));
    SendABCLAction("%NAME% soils %POSSESSIVE% diaper.", undefined, "soilDiaper");
    abclPlayer.stats.BowelValue -= absorbedVolume;
    abclPlayer.stats.SoilinessValue += absorbedVolume;

    if (abclPlayer.stats.SoilinessValue >= diaperSize) {
      abclPlayer.soilClothing();
    }
  },
  attemptWetting: () => {
    const limit = incontinenceLimitFormula(abclPlayer.stats.Incontinence);
    const chance = incontinenceChanceFormula(abclPlayer.stats.Incontinence, abclPlayer.stats.BladderFullness);

    if (!(Math.random() < chance || abclPlayer.stats.BladderFullness > limit)) return;

    if (!incontinenceCheck.check()) return;
    if (window?.LITTLISH_CLUB && window.LITTLISH_CLUB.isRuleActive(Player, RuleId.PREVENT_RESISTING_URGES)) return new WetMinigame().End(false);
    MiniGameStart("WetMinigame" as ModuleScreens["MiniGame"], 30 * chance, "noOp");
  },
  attemptSoiling: () => {
    const limit = incontinenceLimitFormula(abclPlayer.stats.Incontinence);
    const chance = incontinenceChanceFormula(abclPlayer.stats.Incontinence, abclPlayer.stats.BowelFullness);

    if (!(Math.random() < chance || abclPlayer.stats.BowelFullness > limit)) return;

    if (!incontinenceCheck.check()) return;
    if (window?.LITTLISH_CLUB && window.LITTLISH_CLUB.isRuleActive(Player, RuleId.PREVENT_RESISTING_URGES)) return new MessMinigame().End(false);
    MiniGameStart("MessMinigame" as ModuleScreens["MiniGame"], 30 * chance, "noOp");
  },
  wet: (intentional: boolean = false) => {
    const incontinenceOffset = 0.3 * abclPlayer.stats.Incontinence;
    const isTooEarly = abclPlayer.stats.BladderFullness < 0.3 - incontinenceOffset;
    const isPossible = !isTooEarly;
    const isGood = abclPlayer.stats.BladderFullness > 0.6 - incontinenceOffset;
    if (isTooEarly && intentional) {
      sendChatLocal("You try to pee, but it doesn't seem to be working.");
      return;
    }
    if (isPossible) {
      hasDiaper() ? abclPlayer.wetDiaper() : abclPlayer.wetClothing();
    }
    if (isGood && intentional) {
      abclPlayer.stats.Incontinence -= incontinenceOnAccident(abclPlayer.stats.Incontinence);
    } else {
      abclPlayer.stats.Incontinence += incontinenceOnAccident(abclPlayer.stats.Incontinence);
    }
  },
  soil: (intentional: boolean = false) => {
    const incontinenceOffset = 0.3 * abclPlayer.stats.Incontinence;
    const isTooEarly = abclPlayer.stats.BowelFullness < 0.3 - incontinenceOffset;
    const isPossible = !isTooEarly;
    const isGood = abclPlayer.stats.BowelFullness > 0.6 - incontinenceOffset;
    if (isTooEarly && intentional) {
      sendChatLocal("You try to let go, but nothing seems to happen.");
      return;
    }
    if (isPossible) {
      hasDiaper() ? abclPlayer.soilDiaper() : abclPlayer.soilClothing();
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
      const delta = value - Player[modIdentifier].Stats.PuddleSize.value;
      SendStatusMessage("PuddleSize", delta);
      Player[modIdentifier].Stats.PuddleSize.value = value;
    },
    get PuddleSize() {
      return Player[modIdentifier].Stats.PuddleSize.value;
    },
    get MentalRegressionModifier() {
      return MetabolismSettingValues[Player[modIdentifier].Settings.MentalRegressionModifier];
    },
    set MentalRegression(value: number) {
      if (value < 0) value = 0;
      if (value > 1) value = 1;
      const delta = value - Player[modIdentifier].Stats.MentalRegression.value;
      SendStatusMessage("MentalRegression", delta, true);
      Player[modIdentifier].Stats.MentalRegression.value = value;
      abclStatsWindow.update();
    },
    get MentalRegression() {
      return Player[modIdentifier].Stats.MentalRegression.value;
    },
    set Incontinence(value: number) {
      if (value < 0) value = 0;
      if (value > 1) value = 1;
      const delta = value - Player[modIdentifier].Stats.Incontinence.value;
      SendStatusMessage("Incontinence", delta, true);
      Player[modIdentifier].Stats.Incontinence.value = value;
      abclStatsWindow.update();
    },
    get Incontinence() {
      return Player[modIdentifier].Stats.Incontinence.value;
    },

    // intake
    set WaterIntake(value: number) {
      if (value < 0) value = 0;
      Player[modIdentifier].Stats.WaterIntake.value = value;
    },
    get WaterIntake() {
      return Player[modIdentifier].Stats.WaterIntake.value;
    },
    set FoodIntake(value: number) {
      if (value < 0) value = 0;
      Player[modIdentifier].Stats.FoodIntake.value = value;
    },
    get FoodIntake() {
      return Player[modIdentifier].Stats.FoodIntake.value;
    },

    // bladder
    set BladderValue(value: number) {
      if (value < 0) value = 0;
      const delta = value / this.BladderSize - this.BladderFullness;
      SendStatusMessage("Bladder", delta, true);
      Player[modIdentifier].Stats.Bladder.value = value;
      abclStatsWindow.update();
    },
    get BladderValue() {
      return Player[modIdentifier].Stats.Bladder.value;
    },
    set BladderSize(value: number) {
      if (value < 0) value = 0;
      Player[modIdentifier].Stats.Bladder.size = value;
      abclStatsWindow.update();
    },
    get BladderSize(): number {
      return Player[modIdentifier].Stats.Bladder.size;
    },
    set WetnessValue(value: number) {
      if (value < 0) value = 0;
      const delta = value / getPlayerDiaperSize() - this.WetnessPercentage;
      SendStatusMessage("Wetness", delta, true);
      Player[modIdentifier].Stats.Wetness.value = value;
      updateDiaperColor();
      abclStatsWindow.update();
    },
    get WetnessValue() {
      return Player[modIdentifier].Stats.Wetness.value;
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
      const delta = value / this.BowelSize - this.BowelFullness;
      SendStatusMessage("Bowel", delta, true);
      Player[modIdentifier].Stats.Bowel.value = value;
      abclStatsWindow.update();
    },
    get BowelValue() {
      return Player[modIdentifier].Stats.Bowel.value;
    },

    set BowelSize(value: number) {
      if (value < 0) value = 0;
      Player[modIdentifier].Stats.Bowel.size = value;
      abclStatsWindow.update();
    },
    get BowelSize(): number {
      return Player[modIdentifier].Stats.Bowel.size;
    },
    set SoilinessValue(value: number) {
      if (value < 0) value = 0;
      const delta = value / getPlayerDiaperSize() - this.SoilinessPercentage;
      SendStatusMessage("Soiliness", delta, true);
      Player[modIdentifier].Stats.Soiliness.value = value;
      updateDiaperColor();
      abclStatsWindow.update();
    },
    get SoilinessValue() {
      return Player[modIdentifier].Stats.Soiliness.value;
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

const incontinenceCheck = new Throttler(2 * 60 * 1000);

(window as any).abclPlayer = abclPlayer;
