import { mutateData } from "./settings";
import { Saver } from "./utils";

const metabolismValues: Map<MetabolismSettingValues, number> = new Map([
  ["Normal", 1],
  ["Slow", 0.5],
  ["Fast", 1.5],
]);

export const modData = {
  load() {
    this.stats._waterIntake = Player[modIdentifier].Stats.WaterIntake.value;
    this.stats._foodIntake = Player[modIdentifier].Stats.FoodIntake.value;

    this.stats._bladderValue = Player[modIdentifier].Stats.Bladder.value;
    this.stats._bladderSize = Player[modIdentifier].Stats.Bladder.size;
    this.stats._wetnessValue = Player[modIdentifier].Stats.Wetness.value;

    this.stats._bowelValue = Player[modIdentifier].Stats.Bowel.value;
    this.stats._bowelSize = Player[modIdentifier].Stats.Bowel.size;
    this.stats._soilinessValue = Player[modIdentifier].Stats.Soiliness.value;
  },
  stats: {
    // intake
    _waterIntake: 0,
    _foodIntake: 0,
    set WaterIntake(value: number) {
      if (value < 0) value = 0;
      this._waterIntake = value;
    },
    get WaterIntake() {
      return this._waterIntake;
    },
    set FoodIntake(value: number) {
      if (value < 0) value = 0;
      this._foodIntake = value;
    },
    get FoodIntake() {
      return this._foodIntake;
    },

    // bladder
    _bladderValue: 0,
    _bladderSize: 0,
    _wetnessValue: 0,

    set BladderValue(value: number) {
      if (value < 0) value = 0;
      this._bladderValue = value;
    },
    get BladderValue() {
      return this._bladderValue;
    },
    set BladderSize(value: number) {
      if (value < 0) value = 0;
      this._bladderSize = value;
    },
    get BladderSize(): number {
      return this._bladderSize;
    },
    set WetnessValue(value: number) {
      if (value < 0) value = 0;
      this._wetnessValue = value;
    },
    get WetnessValue() {
      return this._wetnessValue;
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
    _bowelValue: 0,
    _bowelSize: 0,
    _soilinessValue: 0,

    set BowelValue(value: number) {
      if (value < 0) value = 0;
      this._bowelValue = value;
    },
    get BowelValue() {
      return this._bowelValue;
    },

    set BowelSize(value: number) {
      if (value < 0) value = 0;
      this._bowelSize = value;
    },
    get BowelSize(): number {
      return this._bowelSize;
    },
    set SoilinessValue(value: number) {
      if (value < 0) value = 0;
      this._soilinessValue = value;
    },
    get SoilinessValue() {
      return this._soilinessValue;
    },
    // computed
    set BowelFullness(value: number) {
      if (value < 0) value = 0;
      this.BowelValue = value * this.BowelSize;
    },
    get BowelFullness(): number {
      return this.BowelValue / this.BowelSize;
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

(window as any).modData = modData;
const playerSaver = new Saver(3 * 60 * 1000);
export const handlePlayerUpdate = () => {
  modData.stats.BladderValue +=
    modData.stats.WaterIntake * modData.settings.Metabolism;
  modData.stats.BowelValue +=
    modData.stats.FoodIntake * modData.settings.Metabolism;

  if (!modData.settings.DisableSoiling && modData.stats.BowelFullness >= 1) {
    modData.stats.SoilinessValue += modData.stats.BowelValue;
    modData.stats.BowelValue = 0;
    console.log("Soiling");
  }

  if (!modData.settings.DisableWetting && modData.stats.BladderFullness >= 1) {
    modData.stats.WetnessValue += modData.stats.BladderValue;
    modData.stats.BladderValue = 0;
    console.log("Wetting");
  }
  playerSaver.save();
};
