import { ABCLdata } from "../../constants";
import { getCrafts, sendChatLocal } from "../utils";
import { abclPlayer, queueUpdatePlayerClothes } from "./player";
import { getVerb, isABCLPlayer } from "./playerUtils";

// Is/Has
export const isOwned = (player: Character = Player): boolean => {
  return !window?.LITTLISH_CLUB || window.LITTLISH_CLUB.getMommyOf(player) !== null || window.LITTLISH_CLUB.getCaregiversOf(player).length > 0;
};

export const isLeaking = (type: "pee" | "poop" | "any" = "any", player: Character = Player) => {
  if (!isABCLPlayer(player)) return false;
  const diaperSize = getPlayerDiaperSize(player);
  const leakingPee = player.ABCL!.Stats.PuddleSize.value > 0 || (hasDiaper(player) && player.ABCL!.Stats.Wetness.value >= diaperSize);
  const leakingPoop = hasDiaper(player) && player.ABCL!.Stats.Soiliness.value >= diaperSize;
  if (type === "pee") return leakingPee;
  if (type === "poop") return leakingPoop;
  return leakingPee || leakingPoop;
};

export const isDiaperDirty = () => {
  const diaperSize = getPlayerDiaperSize();
  return abclPlayer.stats.SoilinessValue + abclPlayer.stats.WetnessValue >= diaperSize / 2;
};
export const isDiaper = (item: Item | null): boolean => {
  if (!item || !item.Asset) return false;
  return item.Asset.DynamicGroupName + item.Asset.Name in ABCLdata.Diapers;
};

export const isPacifier = (item: Item | null): boolean => {
  if (!item || !item.Asset) return false;
  return ABCLdata.ItemDefinitions.Pacifiers.includes("ItemMouth" + item.Asset.Name);
};

export function hasDiaper(player: Character = Player): boolean {
  if (!player) return false;
  const pelvisItem = InventoryGet(player, "ItemPelvis");
  const panties = InventoryGet(player, "Panties");
  // @ts-expect-error Echo slot
  const panties2 = InventoryGet(player, "Panties_笨笨蛋Luzi");
  const suitLower = InventoryGet(player, "SuitLower");
  return Boolean(
    (pelvisItem && isDiaper(pelvisItem)) || (panties && isDiaper(panties)) || (panties2 && isDiaper(panties2)) || (suitLower && isDiaper(suitLower)),
  );
}

export function hasPacifier(player: Character = Player): boolean {
  if (!player) return false;
  const itemMouth1 = InventoryGet(player, "ItemMouth");
  const itemMouth2 = InventoryGet(player, "ItemMouth2");
  const itemMouth3 = InventoryGet(player, "ItemMouth3");
  return Boolean((itemMouth1 && isPacifier(itemMouth1)) || (itemMouth2 && isPacifier(itemMouth2)) || (itemMouth3 && isPacifier(itemMouth3)));
}

export const isWearingBabyClothes = () => {
  return Player.Appearance.some(clothing => {
    return ABCLdata.ItemDefinitions.BabyItems.includes(clothing.Asset.DynamicGroupName + clothing.Asset.Name);
  });
};
// Color
export function averageColor(color_1: string, color_2: string, ratio: number = 0.5): BCColor {
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
  const diaper = InventoryGet(player, "ItemPelvis");
  if (!diaper || !isDiaper(diaper)) return false;
  const lock = diaper.Property?.LockedBy;
  if (!lock) return false;
  return !DialogCanUnlock(player, diaper);
};

export const getLayerIndexFromColorIndex = (colorIndex: number, asset: Asset) => {
  return (asset.Layer as AssetLayer[]).findIndex(layer => layer.ColorIndex === colorIndex);
};

export const setDiaperColor = (slot: AssetGroupName, primaryColor: string, player: Character = Player, refresh: boolean = true) => {
  if (Player.ABCL.Settings.DisableDiaperStains) return;
  const item = InventoryGet(player, slot);

  // DiaperDiscolorationLayer i.e diaper discoloration protection

  if (item && item.Asset && isDiaper(item)) {
    const color = !item.Color || typeof item.Color === "string" ? [...item.Asset.DefaultColor] : [...item.Color];
    const diaper = ABCLdata.Diapers[(item.Asset.DynamicGroupName + item.Asset.Name) as keyof typeof ABCLdata.Diapers];
    const dirtiness = Math.min(abclPlayer.stats.SoilinessValue + abclPlayer.stats.WetnessValue / getPlayerDiaperSize(), 1);
    if ("indicator" in diaper) {
      for (const index of diaper.indicator) {
        const defaultColor = item.Asset.DefaultColor[index];
        if (defaultColor == null) continue;
        color[index] = averageColor(ABCLdata.DiaperColors.indicatorAccident, defaultColor, dirtiness) as BCColor;
      }
    }
    const protection = item?.Craft?.Effects?.["DiaperDiscolorationProtection" as CraftingPropertyType] ?? 0;
    if ("gradients" in diaper && protection == 0) {
      for (const index of diaper.gradients) {
        item.Property ??= {};
        if (typeof item.Property.Opacity === "number") {
          item.Property.Opacity = undefined;
        }
        const layerIndex = getLayerIndexFromColorIndex(index, item.Asset);
        item.Property.Opacity ??= item.Asset.Layer.map(layer => layer.Opacity);
        item.Property.Opacity[layerIndex] = dirtiness;
        color[index] = primaryColor as BCColor;
      }
    }
    item.Color = color;
  }
  if (refresh) queueUpdatePlayerClothes(slot);
};
export const updateDiaperColor = (refresh: boolean = true) => {
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

  setDiaperColor("ItemPelvis", primaryColor, Player, false);
  setDiaperColor("Panties", primaryColor, Player, false);
  setDiaperColor("SuitLower", primaryColor, Player, false);
  // @ts-expect-error Echo slot
  setDiaperColor("Panties_笨笨蛋Luzi", primaryColor, Player, refresh);
};

// Size
export function getPlayerDiaperSize(player: Character = Player): number {
  const pelvisItem = InventoryGet(player, "ItemPelvis");
  const panties = InventoryGet(player, "Panties");
  const suitLower = InventoryGet(player, "SuitLower");
  // @ts-expect-error Echo slot
  const panties2 = InventoryGet(player, "Panties_笨笨蛋Luzi");

  let size = 50;
  if (pelvisItem && isDiaper(pelvisItem)) {
    size += getDiaperSize(pelvisItem);
  }
  if (suitLower && isDiaper(suitLower)) {
    size += getDiaperSize(suitLower);
  }
  if (panties && isDiaper(panties)) {
    size += getDiaperSize(panties);
  }
  if (panties2 && isDiaper(panties2)) {
    size += getDiaperSize(panties2);
  }
  return size;
}
export function getDiaperSize(diaper: Item): number {
  if (diaper.Asset.Name === "PoofyDiaper" && diaper.Property?.TypeRecord?.typed === 1) {
    return ABCLdata.DiaperSizeScale.heavy_adult;
  }
  return ABCLdata.DiaperSizeScale[
    ABCLdata.Diapers[(diaper.Asset.DynamicGroupName + diaper.Asset.Name) as keyof typeof ABCLdata.Diapers].size as keyof typeof ABCLdata.DiaperSizeScale
  ];
}

export const getPlayerDiaper = (): {
  ItemPelvis: Item | null;
  Panties: Item | null;
} => {
  const pelvisItem = InventoryGet(Player, "ItemPelvis");
  const panties = InventoryGet(Player, "Panties");
  const suitLower = InventoryGet(Player, "SuitLower");
  // @ts-expect-error Echo slot
  const panties2 = InventoryGet(player, "Panties_笨笨蛋Luzi");
  let diapers: { ItemPelvis: Item | null; Panties: Item | null; Panties_笨笨蛋Luzi: Item | null; SuitLower: Item | null } = {
    ItemPelvis: null,
    Panties: null,
    Panties_笨笨蛋Luzi: null,
    SuitLower: null,
  };
  if (suitLower && isDiaper(suitLower)) {
    diapers["SuitLower"] = suitLower;
  }
  if (pelvisItem && isDiaper(pelvisItem)) {
    diapers["ItemPelvis"] = pelvisItem;
  }
  if (panties && isDiaper(panties)) {
    diapers["Panties"] = panties;
  }
  if (panties2 && isDiaper(panties2)) {
    diapers["Panties_笨笨蛋Luzi"] = panties2;
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
  const matches = Player.Appearance.filter(clothing => {
    const key = clothing.Asset.DynamicGroupName + clothing.Asset.Name;
    return ABCLdata.ItemDefinitions.BabyItems.includes(key);
  });
  return Math.min(matches.length * 0.25, 1);
};
export const mentalRegressionOvertime = () => {
  let modifier = mentalRegressionBonus();
  if (isWearingBabyClothes()) modifier += 1;
  if (isDiaperDirty()) modifier += 1;
  if (isLeaking()) modifier += 1;

  const mentalRegressionGoal = modifier / 4;
  const minutes = 5;
  const speed = 0.0025;
  const regression = abclPlayer.stats.MentalRegression;

  return abclPlayer.stats.MentalRegression < mentalRegressionGoal
    ? Math.round(speed * modifier * (1 + regression / 3) * minutes * abclPlayer.stats.MentalRegressionModifier * 100) / 100
    : Math.round((-speed / Math.max(1, modifier) / (1 + regression)) * 3 * minutes * abclPlayer.stats.MentalRegressionModifier * 100) / 100;
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

export function applyRandomPelvisDiaper(player: Character = Player) {
  const diapers = ["PoofyDiaper", "UntrainersThin", "LatexDiaper", "BulkyDiaper"];
  const assetName = diapers[Math.floor(Math.random() * diapers.length)];
  const items = getCrafts("ItemPelvis").filter(item => isDiaper(item));

  if (items.length > 0 && Math.random() > 0.25) {
    const item = items[Math.floor(Math.random() * items.length)];
    if (!item || !item.Craft) return;
    InventoryWear(Player, item.Asset.Name, "ItemPelvis");
    InventoryCraft(null, Player, "ItemPelvis", item.Craft, true);
    sendChatLocal("The diaper goddess pacifies you");
    return;
  }

  if (assetName) {
    InventoryWear(player, assetName, "ItemPelvis");
    InventoryLock(player, "ItemPelvis", "ExclusivePadlock", null, true);
    sendChatLocal("The diaper goddess diapers you back up");
  }
}

export function applyRandomPacifier(player: Character = Player) {
  const itemMouth1 = InventoryGet(player, "ItemMouth");
  const itemMouth2 = InventoryGet(player, "ItemMouth2");
  let slot: AssetGroupName = "ItemMouth3";
  if (!itemMouth1) {
    slot = "ItemMouth";
  } else if (!itemMouth2) {
    slot = "ItemMouth2";
  }
  const items = getCrafts(slot).filter(item => isPacifier(item));

  const diapers = ["PacifierClip", "PaciGag", "HarnessPacifierGag", "PacifierGag"];
  const assetName = diapers[Math.floor(Math.random() * diapers.length)];

  if (items.length > 0 && Math.random() > 0.25) {
    const item = items[Math.floor(Math.random() * items.length)];
    if (!item || !item.Craft) return;
    InventoryWear(Player, item.Asset.Name, slot);
    InventoryCraft(null, Player, slot, item.Craft, true);
    sendChatLocal("The diaper goddess pacifies you");
    return;
  }

  if (assetName) {
    InventoryWear(Player, assetName, slot);
    sendChatLocal("The diaper goddess pacifies you");
  }
}

export const mentalRegressionOnAccident = () => {
  const modifier = 1 + mentalRegressionBonus() * abclPlayer.stats.MentalRegressionModifier;
  if (abclPlayer.stats.MentalRegression < 0.25) return modifier / 500;
  if (0.25 > abclPlayer.stats.MentalRegression && abclPlayer.stats.MentalRegression < 0.5 && isDiaperDirty()) return modifier / 500;
  if (0.5 > abclPlayer.stats.MentalRegression && abclPlayer.stats.MentalRegression < 0.75 && isLeaking()) return modifier / 1000;
  if (0.75 > abclPlayer.stats.MentalRegression && abclPlayer.stats.MentalRegression < 1 && isLeaking()) return modifier / 1500;
  return 0;
};
const wetnessVerbs = {
  0: "dry",
  15: "damp",
  30: "moist",
  45: "wet",
  60: "soggy",
  75: "flooded",
};
const soilinessVerbs = {
  0: "",
  15: "slightly stained",
  30: "smudged",
  45: "soiled",
  60: "messy",
  75: "heavy",
};

export const getDiaperVerb = (player: Character) => {
  if (!hasDiaper(player) || !isABCLPlayer(player)) return "";
  const size = getPlayerDiaperSize(player);

  const wetnessPercent = (player.ABCL!.Stats.Wetness.value / size) * 100;
  const soilinessPercent = (player.ABCL!.Stats.Soiliness.value / size) * 100;

  const wetnessVerb = getVerb(wetnessVerbs, wetnessPercent);
  const soilinessVerb = getVerb(soilinessVerbs, soilinessPercent);

  // Combined states for high levels of both
  if (soilinessPercent > 90) {
    return "stinky";
  }
  if (wetnessPercent > 90) {
    return "soaked";
  }

  if (wetnessPercent > 70 && soilinessPercent > 70) {
    return "dirty";
  }
  if (wetnessPercent > soilinessPercent) {
    if (wetnessVerb == "") return "";
    return wetnessVerb;
  } else {
    if (soilinessVerb == "") return "";
    return soilinessVerb;
  }
};
