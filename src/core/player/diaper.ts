import { ABCLdata } from "../../constants";
import { abclPlayer, updatePlayerClothes } from "./player";

// Is/Has
export const isLeaking = (type: "pee" | "poop" | "any" = "any") => {
  const diaperSize = getPlayerDiaperSize();
  if (type === "pee") {
    return abclPlayer.stats.PuddleSize > 0;
  }
  if (type === "poop") {
    return abclPlayer.stats.SoilinessValue >= diaperSize;
  }
  return abclPlayer.stats.SoilinessValue >= diaperSize || abclPlayer.stats.WetnessValue >= diaperSize;
};
export const isDiaperDirty = () => {
  const diaperSize = getPlayerDiaperSize();
  return abclPlayer.stats.SoilinessValue + abclPlayer.stats.WetnessValue >= diaperSize / 2;
};
export const isDiaper = (item: Item): boolean => {
  return item.Asset.Description.toLowerCase().includes("diaper") && item.Asset.Description in ABCLdata.Diapers;
};
export function hasDiaper(player: Character = Player): boolean {
  if (!player) return false;
  const pelvisItem = InventoryGet(player, "ItemPelvis");
  const panties = InventoryGet(player, "Panties");
  return Boolean((pelvisItem && isDiaper(pelvisItem)) || (panties && isDiaper(panties)));
}
export const isWearingBabyClothes = () => {
  return Player.Appearance.some(clothing => {
    return ABCLdata.ItemDefinitions.BabyItems.includes(clothing.Asset.Description);
  });
};

// Color
export function averageColor(color_1: HexColor, color_2: HexColor, ratio: number = 0.5): HexColor {
  let rgb_1 = DrawHexToRGB(color_1);
  let rgb_2 = DrawHexToRGB(color_2);
  let avgRgb: RGBColor = {
    r: Math.round(rgb_1.r * ratio + rgb_2.r * (1 - ratio)),
    g: Math.round(rgb_1.g * ratio + rgb_2.g * (1 - ratio)),
    b: Math.round(rgb_1.b * ratio + rgb_2.b * (1 - ratio)),
  };
  return DrawRGBToHex([avgRgb.r, avgRgb.g, avgRgb.b]);
}
export function mixLevels(level: number, highLevel: string, midLevel: string, lowLevel: string): string {
  if (level > 0.75) {
    return level > 0.9 ? highLevel : averageColor(highLevel, midLevel, level - 0.75);
  } else {
    return averageColor(midLevel, lowLevel, level);
  }
}

export const setDiaperColor = (slot: AssetGroupName, primaryColor: string, player: Character = Player) => {
  if (abclPlayer.settings.DisableDiaperStains) return;
  const item = InventoryGet(player, slot);
  if (item && isDiaper(item)) {
    const color = (item.Color ?? item.Asset.DefaultColor) as string[];
    const diaper = ABCLdata.Diapers[item.Asset.Description as keyof typeof ABCLdata.Diapers];
    if ("color" in diaper) {
      for (const index of diaper.color) {
        if (!color[index]) {
          color[index] = item.Asset.DefaultColor[index];
        }
        if (color[index] === "Default") {
          color[index] = "#FFFFFF";
        }
        color[index] = averageColor(color[index], primaryColor, 0.5);
      }
    }
    item.Color = color;
  }
};
export const updateDiaperColor = () => {
  const messLevel = abclPlayer.stats.SoilinessValue / getPlayerDiaperSize();
  const wetLevel = abclPlayer.stats.WetnessValue / getPlayerDiaperSize();

  const messColor = mixLevels(messLevel, ABCLdata.DiaperColors["maximummess"], ABCLdata.DiaperColors["middlemess"], ABCLdata.DiaperColors["clean"]);
  const wetColor = mixLevels(wetLevel, ABCLdata.DiaperColors["maximumwet"], ABCLdata.DiaperColors["middlewet"], ABCLdata.DiaperColors["clean"]);

  const primaryColor = averageColor(messColor, wetColor, 0.7);

  setDiaperColor("ItemPelvis", primaryColor, Player);
  setDiaperColor("Panties", primaryColor, Player);
  updatePlayerClothes();
};

// Size
export function getPlayerDiaperSize(player: Character = Player): number {
  const pelvisItem = InventoryGet(player, "ItemPelvis");
  const panties = InventoryGet(player, "Panties");
  let size = 0;
  if (pelvisItem && isDiaper(pelvisItem)) {
    size += getDiaperSize(pelvisItem);
  }
  if (panties && isDiaper(panties)) {
    size += getDiaperSize(panties);
  }
  return size;
}
export function getDiaperSize(diaper: Item): number {
  if (diaper.Asset.Description === "Poofy Chastity Diaper" && diaper.Property?.TypeRecord?.typed === 1) {
    return ABCLdata.DiaperSizeScale.heavy_adult;
  }
  return ABCLdata.DiaperSizeScale[ABCLdata.Diapers[diaper.Asset.Description as keyof typeof ABCLdata.Diapers].size as keyof typeof ABCLdata.DiaperSizeScale];
}

export const getPlayerDiaper = (): {
  ItemPelvis: Item | null;
  Panties: Item | null;
} => {
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
};

// incontinence
export const incontinenceLimitFormula = (incontinence: number) => {
  return 0.9 - incontinence * 0.5;
};

export function incontinenceChanceFormula(incontinence: number, fullness: number): number {
  const incontinenceWeight = 0.6;
  const fullnessWeight = 0.8;
  const threshold = incontinenceWeight * Math.pow(incontinence, 2) + fullnessWeight * Math.pow(fullness, 3);

  return Math.min(Math.max(threshold, 0), 1);
}

// mental regression
export const mentalRegressionBonus = () => {
  const assetDescriptions = Player.Appearance.map(clothing => clothing.Asset.Description);
  const matches = ABCLdata.ItemDefinitions.BabyItems.concat(["milk", "pacifier", "bib"]).filter(description =>
    assetDescriptions.some(assetDescription => assetDescription.toLocaleLowerCase().includes(description)),
  );
  return Math.min(matches.length * 0.25, 1);
};
export const mentalRegressionOvertime = () => {
  // if wearing baby clothes, mental regression goes up
  // if wet diaper, mental regression goes up
  // if leaking, mental regression goes up a lot
  let modifier = 0 + mentalRegressionBonus();
  if (isWearingBabyClothes()) modifier += 1;
  if (isDiaperDirty()) modifier += 0.25;
  if (isLeaking()) modifier += 0.5;
  return modifier / (150 * 60); // 150 hours till 100%
};

export function incontinenceOnAccident() {
  const stages = [
    { totalAccidents: 60, start: 0, end: 0.25 },
    { totalAccidents: 120, start: 0.25, end: 0.5 },
    { totalAccidents: 240, start: 0.5, end: 0.75 },
    { totalAccidents: 480, start: 0.75, end: 1 },
  ];
  for (const { totalAccidents, start, end } of stages) {
    if (abclPlayer.stats.Incontinence >= start && abclPlayer.stats.Incontinence < end) {
      return 0.25 / totalAccidents;
    }
  }
  return 0;
}

export const mentalRegressionOnAccident = () => {
  const modifier = 1 + mentalRegressionBonus();
  if (abclPlayer.stats.MentalRegression < 0.25) return modifier / 500;
  if (0.25 > abclPlayer.stats.MentalRegression && abclPlayer.stats.MentalRegression < 0.5 && isDiaperDirty()) return modifier / 500;
  if (0.5 > abclPlayer.stats.MentalRegression && abclPlayer.stats.MentalRegression < 0.75 && isLeaking()) return modifier / 1000;
  if (0.75 > abclPlayer.stats.MentalRegression && abclPlayer.stats.MentalRegression < 1 && isLeaking()) return modifier / 1500;
  return 0;
};
