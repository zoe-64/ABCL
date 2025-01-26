import { ABCLdata } from "../main";
import { defaultStats, mutateData } from "./settings";
import {
  averageColor,
  getPlayerDiaperSize,
  isDiaper,
  mixLevels,
  Saver,
} from "./utils";

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
    _waterIntake: defaultStats.WaterIntake.value,
    _foodIntake: defaultStats.FoodIntake.value,
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
    _bladderValue: defaultStats.Bladder.value,
    _bladderSize: defaultStats.Bladder.size,
    _wetnessValue: defaultStats.Wetness.value,

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
      updateDiaperColor();
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
    _bowelValue: defaultStats.Bowel.value,
    _bowelSize: defaultStats.Bowel.size,
    _soilinessValue: defaultStats.Soiliness.value,

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
      updateDiaperColor();
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

// diaper
export function getPlayerDiaper(): {
  ItemPelvis: Item | null;
  Panties: Item | null;
} {
  const pelvisItem = InventoryGet(Player, "ItemPelvis");
  const panties = InventoryGet(Player, "Panties");
  let diapers: { ItemPelvis: Item | null; Panties: Item | null } = {
    ItemPelvis: null,
    Panties: null,
  };
  if (pelvisItem && isDiaper(pelvisItem)) {
    diapers["ItemPelvis"] = pelvisItem;
  }
  if (panties && isDiaper(panties)) {
    diapers["Panties"] = panties;
  }
  return diapers;
}

function setDiaperColor(
  slot: AssetGroupName,
  primaryColor: string,
  secondaryColor: string,
  player: typeof Player = Player
) {
  const item = InventoryGet(player, slot);
  if (item && isDiaper(item)) {
    const type = typeof item.Asset.DefaultColor;
    const diaper =
      ABCLdata.Diapers[item.Asset.Description as keyof typeof ABCLdata.Diapers];

    if (type !== typeof item.Color) {
      item.Color = item.Asset.DefaultColor as ItemColor;
    }
    if (type === "object" && JSON.stringify(item.Color).includes('"Default"')) {
      item.Color = JSON.parse(
        JSON.stringify(item.Color).replaceAll(/"Default"/g, '"#FFFFFF"')
      );
    }
    const color: string[] = (item.Color ?? item.Asset.DefaultColor) as string[];
    if ("primaryColor" in diaper) {
      color[diaper.primaryColor] = primaryColor;
    }
    if ("secondaryColor" in diaper) {
      color[diaper.secondaryColor] = secondaryColor;
    }
    item.Color = color;
  }
}
export function updateDiaperColor() {
  const messLevel = modData.stats.SoilinessValue / getPlayerDiaperSize();
  const wetLevel = modData.stats.WetnessValue / getPlayerDiaperSize();

  const messColor = mixLevels(
    messLevel,
    ABCLdata.DiaperColors["maximummess"],
    ABCLdata.DiaperColors["middlemess"],
    ABCLdata.DiaperColors["clean"]
  );
  const wetColor = mixLevels(
    wetLevel,
    ABCLdata.DiaperColors["maximumwet"],
    ABCLdata.DiaperColors["middlewet"],
    ABCLdata.DiaperColors["clean"]
  );

  const primaryColor = averageColor(messColor, wetColor, 0.7);
  const secondaryColor = averageColor(messColor, wetColor, 0.9);

  setDiaperColor("ItemPelvis", primaryColor, secondaryColor, Player);
  setDiaperColor("Panties", primaryColor, secondaryColor, Player);
  CharacterRefresh(Player, true);
  ChatRoomCharacterUpdate(Player);
}

const playerSaver = new Saver(3 * 60 * 1000);
export const playerUpdate = () => {
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
