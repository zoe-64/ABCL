import { isColorable, Debouncer, getColor, Saver, sendChatLocal } from "../utils";
import {
  incontinenceChanceFormula,
  getPlayerDiaperSize,
  mentalRegressionOnAccident,
  mentalRegressionOvertime,
  updateDiaperColor,
  incontinenceLimitFormula,
  hasDiaper,
  averageColor,
} from "./diaper";
import { abclStatsWindow } from "./ui";
import { ABCLdata } from "../../constants";
import { MetabolismSettingValues } from "../../types/types";
import { SendAction } from "./playerUtils";
import { sendUpdateMyData } from "../hooks";

export const updatePlayerClothes = () => {
  CharacterRefresh(Player, true);
  ChatRoomCharacterUpdate(Player);
};

export const abclPlayer = {
  onAccident: () => {
    abclPlayer.stats.MentalRegression += mentalRegressionOnAccident();
  },
  update: () => {
    // once per minute
    abclPlayer.stats.MentalRegression += mentalRegressionOvertime();
    abclPlayer.stats.BladderValue += abclPlayer.stats.WaterIntake * MetabolismSettingValues[abclPlayer.settings.PeeMetabolism];
    abclPlayer.stats.BowelValue += abclPlayer.stats.FoodIntake * MetabolismSettingValues[abclPlayer.settings.PoopMetabolism];

    abclPlayer.settings.PeeMetabolism !== "Disabled" && abclPlayer.attemptWetting();
    abclPlayer.settings.PoopMetabolism !== "Disabled" && abclPlayer.attemptSoiling();
    playerSaver.save();
  },
  wetClothing: () => {
    // panties -> pants -> floor
    sendChatLocal("You've had a wet accident in your clothes!");
    abclPlayer.stats.PuddleSize += abclPlayer.stats.BladderValue;
    abclPlayer.stats.BladderValue = 0;
    const wetColor = "#96936C";

    const panties = InventoryGet(Player, "Panties");
    if (panties) {
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
    abclPlayer.stats.PuddleSize += abclPlayer.stats.BladderValue;
    abclPlayer.stats.BladderFullness = 0;

    if (hasDiaper()) {
      SendAction("%NAME%'s diaper leaks and wet %INTENSIVE% clothes causing a puddle to form.", undefined, "wetClothing");
    } else {
      SendAction("%NAME%'s wets %INTENSIVE% clothes leaks onto the floor.", undefined, "wetClothing");
    }
    updatePlayerClothes();
    sendUpdateMyData();
  },
  soilClothing: () => {
    abclPlayer.stats.PuddleSize += abclPlayer.stats.BladderValue;
    abclPlayer.stats.BladderValue = 0;
    const messColor = "#261a16";

    const panties = InventoryGet(Player, "Panties");
    if (panties) {
      const pantiesColors = getColor(panties.Color || (panties.Asset.DefaultColor as ItemColor), panties.Asset);
      for (let i = 0; i < pantiesColors.length; i++) {
        if (!isColorable(pantiesColors[i])) continue;
        pantiesColors[i] = averageColor(pantiesColors[i], messColor, 0.3);
      }
      panties.Color = pantiesColors;
    }
    if (hasDiaper()) {
      SendAction("%NAME%'s diaper leaks and soils %INTENSIVE% clothes and the floor.", undefined, "soilClothing");
    } else {
      SendAction("%NAME% soils %INTENSIVE% clothes and the floor.", undefined, "soilClothing");
    }
    updatePlayerClothes();
  },
  wetDiaper: () => {
    const diaperSize = getPlayerDiaperSize();
    const absorbedVolume = Math.min(abclPlayer.stats.BladderValue, diaperSize - abclPlayer.stats.WetnessValue);
    SendAction("%NAME% wets %INTENSIVE% diaper.", undefined, "wetDiaper");

    abclPlayer.stats.BladderValue -= absorbedVolume;
    abclPlayer.stats.WetnessValue += absorbedVolume;

    if (abclPlayer.stats.WetnessValue >= diaperSize) {
      abclPlayer.wetClothing();
    }
  },
  soilDiaper: () => {
    const diaperSize = getPlayerDiaperSize();
    const absorbedVolume = Math.min(abclPlayer.stats.BowelValue, Math.max(0, diaperSize - abclPlayer.stats.SoilinessValue));
    SendAction("%NAME% soils %INTENSIVE% diaper.", undefined, "soilDiaper");
    abclPlayer.stats.BowelValue -= absorbedVolume;
    abclPlayer.stats.SoilinessValue += absorbedVolume;

    if (abclPlayer.stats.SoilinessValue > 0) {
      abclPlayer.soilClothing();
    }
  },
  attemptWetting: () => {
    const limit = incontinenceLimitFormula(abclPlayer.stats.Incontinence);
    const chance = incontinenceChanceFormula(abclPlayer.stats.Incontinence, abclPlayer.stats.BladderFullness);

    if (!(Math.random() < chance || abclPlayer.stats.BladderFullness > limit)) return;

    if (!incontinenceCheck.check()) return;

    MiniGameStart("WetMinigame", 30 * chance, "noOp");
  },
  attemptSoiling: () => {
    const limit = incontinenceLimitFormula(abclPlayer.stats.Incontinence);
    const chance = incontinenceChanceFormula(abclPlayer.stats.Incontinence, abclPlayer.stats.BowelFullness);

    if (!(Math.random() < chance || abclPlayer.stats.BowelFullness > limit)) return;

    if (!incontinenceCheck.check()) return;

    MiniGameStart("MessMinigame", 30 * chance, "noOp");
  },
  wet: (intentional: boolean = false) => {
    const isTooEarly = abclPlayer.stats.BladderFullness < 0.3;
    const isPossible = !isTooEarly;
    const isGood = abclPlayer.stats.BladderFullness > 0.6;
    if (isTooEarly) {
      sendChatLocal("You try to pee, but it doesn't seem to be working.");
      return;
    }
    if (isPossible) {
      hasDiaper() ? abclPlayer.wetDiaper() : abclPlayer.wetClothing();
    }
    if (isGood && intentional) {
      abclPlayer.stats.Incontinence -= 0.01;
    } else {
      abclPlayer.stats.Incontinence += 0.02;
    }
  },
  soil: (intentional: boolean = false) => {
    const isTooEarly = abclPlayer.stats.BowelFullness < 0.3;
    const isPossible = !isTooEarly;
    const isGood = abclPlayer.stats.BowelFullness > 0.6;
    if (isTooEarly) {
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
      Player[modIdentifier].Stats.PuddleSize.value = value;
    },
    get PuddleSize() {
      return Player[modIdentifier].Stats.PuddleSize.value;
    },
    set MentalRegression(value: number) {
      if (value < 0) value = 0;
      if (value > 1) value = 1;
      Player[modIdentifier].Stats.MentalRegression.value = value;
      abclStatsWindow.update();
    },
    get MentalRegression() {
      return Player[modIdentifier].Stats.MentalRegression.value;
    },
    set Incontinence(value: number) {
      if (value < 0) value = 0;
      if (value > 1) value = 1;
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
  settings: {
    publicMessages: {
      changeDiaper: true,
      checkDiaper: true,
      lickPuddle: true,
      toPee: true,
      toPoop: true,
      usePotty: true,
      useToilet: true,
      wipePuddle: true,
    },
    setPublicMessage(key: keyof ModSettings["visibleMessages"], value: boolean) {
      Player[modIdentifier].Settings.visibleMessages[key] = value;
    },
    getPublicMessage(key: keyof ModSettings["visibleMessages"]): boolean {
      return Player[modIdentifier].Settings.visibleMessages[key];
    },
    set PeeMetabolism(value: MetabolismSetting) {
      Player[modIdentifier].Settings.PeeMetabolism = value;
    },
    set PoopMetabolism(value: MetabolismSetting) {
      Player[modIdentifier].Settings.PoopMetabolism = value;
    },
    get PeeMetabolism(): MetabolismSetting {
      return Player[modIdentifier].Settings.PeeMetabolism;
    },

    get PoopMetabolism(): MetabolismSetting {
      return Player[modIdentifier].Settings.PoopMetabolism;
    },

    get OnDiaperChange(): DiaperChangePromptSetting {
      return Player[modIdentifier].Settings.OnDiaperChange;
    },

    set OnDiaperChange(value: DiaperChangePromptSetting) {
      Player[modIdentifier].Settings.OnDiaperChange = value;
    },

    set OpenRemoteSettings(value: boolean) {
      Player[modIdentifier].Settings.OpenRemoteSettings = value;
    },

    get OpenRemoteSettings(): boolean {
      return Player[modIdentifier].Settings.OpenRemoteSettings;
    },
  },
};

const playerSaver = new Saver(2 * 60 * 1000);

const incontinenceCheck = new Debouncer(2 * 60 * 1000);

(window as any).abclPlayer = abclPlayer;
