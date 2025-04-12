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

export const isDiaperLocked = (player: Character = Player): boolean => {
  if (!hasDiaper()) return false;
  const diaper = InventoryGet(player, "ItemPelvis");

  return Boolean(
    diaper &&
      isDiaper(diaper) &&
      (Player.MemberNumber === player.MemberNumber
        ? diaper.Property?.LockedBy
        : !(diaper.Property?.LockMemberNumber === player.MemberNumber || diaper.Property?.LockedBy === "ExclusivePadlock")),
  );
};
export const setDiaperColor = (slot: AssetGroupName, primaryColor: string, player: Character = Player) => {
  if (Player[modIdentifier].Settings.DisableDiaperStains) return;
  const item = InventoryGet(player, slot);
  if (item && isDiaper(item)) {
    const color = !item.Color || typeof item.Color === "string" ? (item.Asset.DefaultColor as string[]) : (item.Color as string[]);
    const diaper = ABCLdata.Diapers[item.Asset.Description as keyof typeof ABCLdata.Diapers];
    const dirtiness = Math.min(abclPlayer.stats.SoilinessValue + abclPlayer.stats.WetnessValue / getPlayerDiaperSize(), 1);
    if ("indicator" in diaper) {
      for (const index of diaper.indicator) {
        color[index] = averageColor(ABCLdata.DiaperColors.indicatorAccident, item.Asset.DefaultColor[index], dirtiness);
      }
    }
    if ("gradients" in diaper) {
      for (const index of diaper.gradients) {
        if (item.Property?.Opacity && typeof item.Property.Opacity === "object") {
          item.Property.Opacity[index] = dirtiness;
          color[index] = primaryColor;
        }
      }
    }
    if ("color" in diaper) {
      for (const index of diaper.color) {
        color[index] = primaryColor;
      }
    }
    console.log(color);
    item.Color = color;
  }
};
export const updateDiaperColor = () => {
  const messLevel = abclPlayer.stats.SoilinessValue / getPlayerDiaperSize();
  const wetLevel = abclPlayer.stats.WetnessValue / getPlayerDiaperSize();

  const messColor = mixLevels(messLevel, ABCLdata.DiaperColors["maximummess"], ABCLdata.DiaperColors["middlemess"], ABCLdata.DiaperColors["clean"]);
  const wetColor = mixLevels(wetLevel, ABCLdata.DiaperColors["maximumwet"], ABCLdata.DiaperColors["middlewet"], ABCLdata.DiaperColors["clean"]);

  // lower is more mess higher is more wet
  // when both are equal it should be 0.5
  // if wet is 0 and mess is one then it should be 1
  // if wet is 1 and mess is 0 then it should be 0
  const mixedLevel = Math.max(Math.min((messLevel + (1 - wetLevel)) / 2, 2), 0);
  const primaryColor = averageColor(messColor, wetColor, mixedLevel);
  console.log(mixedLevel, primaryColor);
  setDiaperColor("ItemPelvis", primaryColor, Player);
  setDiaperColor("Panties", primaryColor, Player);
  updatePlayerClothes();
};

// Size
export function getPlayerDiaperSize(player: Character = Player): number {
  const pelvisItem = InventoryGet(player, "ItemPelvis");
  const panties = InventoryGet(player, "Panties");
  let size = 50;
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
  let modifier = mentalRegressionBonus();
  if (isWearingBabyClothes()) modifier += 1;
  if (isDiaperDirty()) modifier += 1;
  if (isLeaking()) modifier += 1;

  const mentalRegressionGoal = modifier / 4;
  const MR = abclPlayer.stats.MentalRegression;

  const speed = 0.005 * abclPlayer.stats.MentalRegressionModifier;
  return MR < mentalRegressionGoal ? speed : -speed;
};

export const incontinenceOnAccident = (incontinence: number) => {
  const stages = [
    { increase: 0.01, start: 0, end: 0.25 },
    { increase: 0.005, start: 0.25, end: 0.5 },
    { increase: 0.0025, start: 0.5, end: 0.75 },
    { increase: 0.001, start: 0.75, end: 1 },
  ];
  for (const { increase, start, end } of stages) {
    if (incontinence >= start && incontinence < end) {
      return increase;
    }
  }
  return 0;
};

export const mentalRegressionOnAccident = () => {
  const modifier = 1 + mentalRegressionBonus() * abclPlayer.stats.MentalRegressionModifier;
  if (abclPlayer.stats.MentalRegression < 0.25) return modifier / 500;
  if (0.25 > abclPlayer.stats.MentalRegression && abclPlayer.stats.MentalRegression < 0.5 && isDiaperDirty()) return modifier / 500;
  if (0.5 > abclPlayer.stats.MentalRegression && abclPlayer.stats.MentalRegression < 0.75 && isLeaking()) return modifier / 1000;
  if (0.75 > abclPlayer.stats.MentalRegression && abclPlayer.stats.MentalRegression < 1 && isLeaking()) return modifier / 1500;
  return 0;
};

export const getDiaperVerb = (player: Character) => {
  if (!hasDiaper(player)) return "";
  const size = getPlayerDiaperSize(player);

  const messy = player.ABCL!.Stats.Soiliness.value / size > 0.5;
  const wet = player.ABCL!.Stats.Wetness.value / size > 0.5;
  const soggy = player.ABCL!.Stats.Wetness.value / size > 0.8;
  const stinky = player.ABCL!.Stats.Soiliness.value / size > 0.8;

  if (soggy && stinky) return "soggy and stinky";
  if (stinky) return "stinky";
  if (soggy) return "soggy";
  if (wet) return "wet";
  if (messy) return "messy";
  return "dry";
};
