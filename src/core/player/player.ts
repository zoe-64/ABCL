import { mutateData } from "../settings";
import { Debouncer, Saver, sendChatLocal } from "../utils";
import {
  getAccidentThreshold,
  getPlayerDiaperSize,
  mentalRegressionOnAccident,
  mentalRegressionOvertime,
  updateDiaperColor,
} from "./diaper";

const metabolismValues: Map<MetabolismSettingValues, number> = new Map([
  ["Normal", 1],
  ["Slow", 0.5],
  ["Fast", 1.5],
]);

export const abclPlayer = {
  onAccident: () => {
    abclPlayer.stats.MentalRegression += mentalRegressionOnAccident();
  },
  update: () => {
    // once per minute
    abclPlayer.stats.MentalRegression += mentalRegressionOvertime();
    abclPlayer.stats.BladderValue +=
      abclPlayer.stats.WaterIntake * abclPlayer.settings.Metabolism;
    abclPlayer.stats.BowelValue +=
      abclPlayer.stats.FoodIntake * abclPlayer.settings.Metabolism;

    abclPlayer.attemptWetting();
    abclPlayer.attemptSoiling();
    playerSaver.save();
  },
  attemptWetting: () => {
    if (
      !abclPlayer.settings.DisableWetting &&
      incontinenceCheck.check() &&
      (getAccidentThreshold(
        abclPlayer.stats.Incontinence,
        abclPlayer.stats.BladderFullness
      ) > Math.random() ||
        abclPlayer.stats.BladderFullness >= 1)
    ) {
      MiniGameStart(
        "WetMinigame",
        16 *
          getAccidentThreshold(
            abclPlayer.stats.Incontinence,
            abclPlayer.stats.BladderFullness
          ),
        "noOp"
      );
    }
  },
  attemptSoiling: () => {
    if (
      !abclPlayer.settings.DisableSoiling &&
      incontinenceCheck.check() &&
      (getAccidentThreshold(
        abclPlayer.stats.Incontinence,
        abclPlayer.stats.BowelFullness
      ) > Math.random() ||
        abclPlayer.stats.BowelFullness >= 1)
    ) {
      MiniGameStart(
        "MessMinigame",
        16 *
          getAccidentThreshold(
            abclPlayer.stats.Incontinence,
            abclPlayer.stats.BowelFullness
          ),
        "noOp"
      );
    }
  },
  releaseBladder: () => {
    const isTooEarly = abclPlayer.stats.BladderFullness < 0.3;
    const isPossible = !isTooEarly;
    const isGood = abclPlayer.stats.BladderFullness > 0.6;
    if (isTooEarly) {
      sendChatLocal("You try to pee, but it doesn't seem to be working.");
      return;
    }
    if (isPossible) {
      abclPlayer.stats.WetnessValue += abclPlayer.stats.BladderValue;
      abclPlayer.stats.BladderFullness = 0;
      sendChatLocal("You feel a sense of release as you let go.");
    }
    if (isGood) {
      abclPlayer.stats.Incontinence -= 0.02;
    } else {
      abclPlayer.stats.Incontinence += 0.02;
    }
  },
  releaseBowel: () => {
    const isTooEarly = abclPlayer.stats.BowelFullness < 0.3;
    const isPossible = !isTooEarly;
    const isGood = abclPlayer.stats.BowelFullness > 0.6;
    if (isTooEarly) {
      sendChatLocal("You try to let go, but nothing seems to happen.");
      return;
    }
    if (isPossible) {
      abclPlayer.stats.SoilinessValue += abclPlayer.stats.BowelValue;
      abclPlayer.stats.BowelFullness = 0;
      sendChatLocal("You feel a little relief as you let go.");
    }
    if (isGood) {
      abclPlayer.stats.Incontinence -= 0.02;
    } else {
      abclPlayer.stats.Incontinence += 0.02;
    }
  },

  stats: {
    set MentalRegression(value: number) {
      if (value < 0) value = 0;
      if (value > 1) value = 1;
      Player[modIdentifier].Stats.MentalRegression.value = value;
    },
    get MentalRegression() {
      return Player[modIdentifier].Stats.MentalRegression.value;
    },
    set Incontinence(value: number) {
      if (value < 0) value = 0;
      if (value > 1) value = 1;
      Player[modIdentifier].Stats.Incontinence.value = value;
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
    },
    get BladderValue() {
      return Player[modIdentifier].Stats.Bladder.value;
    },
    set BladderSize(value: number) {
      if (value < 0) value = 0;
      Player[modIdentifier].Stats.Bladder.size = value;
    },
    get BladderSize(): number {
      return Player[modIdentifier].Stats.Bladder.size;
    },
    set WetnessValue(value: number) {
      if (value < 0) value = 0;
      Player[modIdentifier].Stats.Wetness.value = value;
      updateDiaperColor();
    },
    get WetnessValue() {
      return Player[modIdentifier].Stats.Wetness.value;
    },
    // computed
    set BladderFullness(value: number) {
      if (value < 0) value = 0;
      this.BladderValue = value * this.BladderSize;
    },
    get BladderFullness(): number {
      return this.BladderValue / this.BladderSize;
    },

    // bowel
    set BowelValue(value: number) {
      if (value < 0) value = 0;
      Player[modIdentifier].Stats.Bowel.value = value;
    },
    get BowelValue() {
      return Player[modIdentifier].Stats.Bowel.value;
    },

    set BowelSize(value: number) {
      if (value < 0) value = 0;
      Player[modIdentifier].Stats.Bowel.size = value;
    },
    get BowelSize(): number {
      return Player[modIdentifier].Stats.Bowel.size;
    },
    set SoilinessValue(value: number) {
      if (value < 0) value = 0;
      Player[modIdentifier].Stats.Soiliness.value = value;
      updateDiaperColor();
    },
    get SoilinessValue() {
      return Player[modIdentifier].Stats.Soiliness.value;
    },
    // computed
    set BowelFullness(value: number) {
      if (value < 0) value = 0;
      this.BowelValue = value * this.BowelSize;
    },
    get BowelFullness(): number {
      return this.BowelValue / this.BowelSize;
    },

    get SoilinessPercentage(): number {
      return this.SoilinessValue / getPlayerDiaperSize();
    },
    set SoilinessPercentage(value: number) {
      if (value < 0) value = 0;
      this.SoilinessValue = value * getPlayerDiaperSize();
    },
    get WetnessPercentage(): number {
      return this.WetnessValue / getPlayerDiaperSize();
    },
    set WetnessPercentage(value: number) {
      if (value < 0) value = 0;
      this.WetnessValue = value * getPlayerDiaperSize();
    },
  },
  settings: {
    set Metabolism(value: MetabolismSettingValues) {
      mutateData({ Settings: { Metabolism: { value: value } } });
    },
    set DisableWetting(value: boolean) {
      mutateData({ Settings: { DisableWetting: { value: value } } });
    },
    set DisableSoiling(value: boolean) {
      mutateData({ Settings: { DisableSoiling: { value: value } } });
    },
    addCaregiver(id: number) {
      mutateData({
        Settings: {
          CaregiverIDs: {
            value: [...Player[modIdentifier].Settings.CaregiverIDs.value, id],
          },
        },
      });
    },
    removeCaregiver(id: number) {
      mutateData({
        Settings: {
          CaregiverIDs: {
            value: Player[modIdentifier].Settings.CaregiverIDs.value.filter(
              (x) => x !== id
            ),
          },
        },
      });
    },
    set OpenRemoteSettings(value: boolean) {
      mutateData({ Settings: { OpenRemoteSettings: { value: value } } });
    },

    get Metabolism(): number {
      const metabolism = metabolismValues.get(
        Player[modIdentifier].Settings.Metabolism.value
      );
      if (typeof metabolism == "undefined") {
        throw new Error("Invalid metabolism value");
      }
      return metabolism;
    },
    get DisableWetting(): boolean {
      return Player[modIdentifier].Settings.DisableWetting.value;
    },
    get DisableSoiling(): boolean {
      return Player[modIdentifier].Settings.DisableSoiling.value;
    },
    get CaregiverIDs(): number[] {
      return Player[modIdentifier].Settings.CaregiverIDs.value;
    },
    get OpenRemoteSettings(): boolean {
      return Player[modIdentifier].Settings.OpenRemoteSettings.value;
    },
  },
};

const playerSaver = new Saver(2 * 60 * 1000);

const incontinenceCheck = new Debouncer(0);

(window as any).abclPlayer = abclPlayer;
