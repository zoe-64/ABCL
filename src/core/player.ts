import { ABCLdata } from "../main";
import { mutateData } from "./settings";
import {
  averageColor,
  Debouncer,
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

const playerSaver = new Saver(2 * 60 * 1000);

/**
 * @param { number } minutes - such as modData.stats.bladderValue/200 or modData.stats.bowelValue/100
 * @returns
 */
export function incontinenceProgressionIncreese(minutes: number) {
  const stages = [
    { time: 60 * 60 * 20, start: 0, end: 0.25 },
    { time: 60 * 60 * 40, start: 0.25, end: 0.5 },
    { time: 60 * 60 * 80, start: 0.5, end: 0.75 },
    { time: 60 * 60 * 160, start: 0.75, end: 1 },
  ];
  for (const { time, start, end } of stages) {
    if (
      modData.stats.Incontinence >= start &&
      modData.stats.Incontinence < end
    ) {
      return minutes / time;
    }
  }
  return 0;
}

/*
 * 100% chance:
 * Incontinence 10% + Fullness 95%
 * Incontinence 20% + Fullness 89%
 * Incontinence 30% + Fullness 83%
 * Incontinence 40% + Fullness 77%
 * Incontinence 50% + Fullness 71%
 * Incontinence 60% + Fullness 65%
 * Incontinence 70% + Fullness 59%
 * Incontinence 80% + Fullness 53%
 * Incontinence 90% + Fullness 47%
 * Incontinence 100% + Fullness 41%
 */
function getIncontinenceThreshold(
  incontinence: number,
  fullness: number
): number {
  const incontinenceFactor = 0.645;
  const fullnessFactor = 0.968;

  const threshold =
    incontinenceFactor * incontinence + fullnessFactor * fullness;

  return threshold;
}
(<any>window).getIncontinenceThreshold = getIncontinenceThreshold;

const incontinenceCheck = new Debouncer(0);

export const wetSelf = () => {
  if (
    !modData.settings.DisableWetting &&
    incontinenceCheck.check() &&
    (getIncontinenceThreshold(
      modData.stats.Incontinence,
      modData.stats.BladderFullness
    ) > Math.random() ||
      modData.stats.BladderFullness >= 1)
  ) {
    MiniGameStart(
      "WetMinigame",
      16 *
        getIncontinenceThreshold(
          modData.stats.Incontinence,
          modData.stats.BladderFullness
        ),
      "noOp"
    );
  }
};

export const soilSelf = () => {
  if (
    !modData.settings.DisableSoiling &&
    incontinenceCheck.check() &&
    (getIncontinenceThreshold(
      modData.stats.Incontinence,
      modData.stats.BowelFullness
    ) > Math.random() ||
      modData.stats.BowelFullness >= 1)
  ) {
    MiniGameStart(
      "MessMinigame",
      16 *
        getIncontinenceThreshold(
          modData.stats.Incontinence,
          modData.stats.BowelFullness
        ),
      "noOp"
    );
  }
};
(<any>window).noOp = () => {};

export const changeDiaper = () => {
  // maybe later add a diaper change minigame

  modData.stats.SoilinessValue = 0;
  modData.stats.WetnessValue = 0;
  updateDiaperColor();
};
export const playerUpdate = () => {
  modData.stats.BladderValue +=
    modData.stats.WaterIntake * modData.settings.Metabolism;
  modData.stats.BowelValue +=
    modData.stats.FoodIntake * modData.settings.Metabolism;

  wetSelf();
  soilSelf();
  playerSaver.save();
};
(<any>window).playerUpdate = playerUpdate;
(window as any).modData = modData;
(<any>window).changeDiaper = changeDiaper;
