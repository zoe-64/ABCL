import { AssetManager } from "@sugarch/bc-asset-manager";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import echoOverwirte from "./echoOverwirte";
const defaultLayer: AssetLayer = {
  AllowColorize: true,
  AllowTypes: null,
  Alpha: [],
  BlendingMode: "source-over",
  ColorSuffix: {},
  CreateLayerTypes: [],
  ColorGroup: null,
  CopyLayerColor: null,
  FixedPosition: false,
  MirrorExpression: undefined,
  HasImage: true,
  HideAs: undefined,
  HideColoring: false,
  HideForAttribute: null,
  InheritColor: null,
  LockLayer: false,
  ShowForAttribute: null,
  TextureMask: undefined,
  Visibility: null,
  ParentGroup: {},
  PoseMapping: {},
  Priority: 24,
  Opacity: 0,
  MaxOpacity: 1,
  MinOpacity: 0,
  Name: null,
  Asset: undefined!,
  DrawingLeft: { "": 0 },
  DrawingTop: { "": 0 },
  ColorIndex: 0,
};
const generateItemEntry = (itemName: string, itemGroup: string, echo = false) => {
  const obj: Record<string, string> = {};
  obj[`Assets/Female3DCG/${itemGroup}/${itemName}_Small_Gradient.png`] = `${publicURL}/items/diaper/${itemName}${echo ? "_echo" : ""}/small.png`;
  obj[`Assets/Female3DCG/${itemGroup}/${itemName}_Normal_Gradient.png`] = `${publicURL}/items/diaper/${itemName}${echo ? "_echo" : ""}/normal.png`;
  obj[`Assets/Female3DCG/${itemGroup}/${itemName}_Large_Gradient.png`] = `${publicURL}/items/diaper/${itemName}${echo ? "_echo" : ""}/large.png`;
  obj[`Assets/Female3DCG/${itemGroup}/${itemName}_XLarge_Gradient.png`] = `${publicURL}/items/diaper/${itemName}${echo ? "_echo" : ""}/xlarge.png`;
  return obj;
};
HookManager.afterPlayerLogin(() => {
  const echo = Boolean((<any>globalThis)?.__BC_LUZI_GLOBALS__?.["OnceFlag.服装拓展"]);

  AssetManager.addImageMapping({
    ...generateItemEntry("Diapers1", "Override/EchoV2/Panties", true),
    ...generateItemEntry("Diapers2", "Override/EchoV2/Panties", true),
    ...generateItemEntry("Diapers3", "Override/EchoV2/Panties", true),
    ...generateItemEntry("Diapers4", "Override/EchoV2/Panties", true),

    ...generateItemEntry("Diapers1", "Panties", echo),
    ...generateItemEntry("Diapers2", "Panties", echo),
    ...generateItemEntry("Diapers3", "Panties", echo),
    ...generateItemEntry("Diapers4", "Panties", echo),

    ...generateItemEntry("LatexDiaper", "Panties", echo),
    "Assets/Female3DCG/Panties/BulkyDiaper_Back_Gradient.png": `${publicURL}/BulkyDiaper/back.png`,
    ...generateItemEntry("BulkyDiaper", "Panties", echo),
    ...generateItemEntry("PoofyDiaper", "Panties", echo),

    ...generateItemEntry("LatexDiaper", "ItemPelvis", echo),
    "Assets/Female3DCG/ItemPelvis/BulkyDiaper_Back_Gradient.png": `${publicURL}/BulkyDiaper/back.png`,
    ...generateItemEntry("BulkyDiaper", "ItemPelvis", echo),
    "Assets/Female3DCG/ItemPelvis/PoofyDiaper_Back_Gradient.png": `${publicURL}/PoofyDiaper/back.png`,
    ...generateItemEntry("PoofyDiaper", "ItemPelvis", echo),
  });
});
export default function () {
  const echo = Boolean((<any>globalThis)?.__BC_LUZI_GLOBALS__?.["OnceFlag.服装拓展"]);
  AssetManager.addImageMapping({
    ...generateItemEntry("Diapers1", "Override/EchoV2/Panties", true),
    ...generateItemEntry("Diapers2", "Override/EchoV2/Panties", true),
    ...generateItemEntry("Diapers3", "Override/EchoV2/Panties", true),
    ...generateItemEntry("Diapers4", "Override/EchoV2/Panties", true),

    ...generateItemEntry("Diapers1", "Panties", echo),
    ...generateItemEntry("Diapers2", "Panties", echo),
    ...generateItemEntry("Diapers3", "Panties", echo),
    ...generateItemEntry("Diapers4", "Panties", echo),

    ...generateItemEntry("LatexDiaper", "Panties", echo),
    "Assets/Female3DCG/Panties/BulkyDiaper_Back_Gradient.png": `${publicURL}/BulkyDiaper/back.png`,
    ...generateItemEntry("BulkyDiaper", "Panties", echo),
    ...generateItemEntry("PoofyDiaper", "Panties", echo),

    ...generateItemEntry("LatexDiaper", "ItemPelvis", echo),
    "Assets/Female3DCG/ItemPelvis/BulkyDiaper_Back_Gradient.png": `${publicURL}/BulkyDiaper/back.png`,
    ...generateItemEntry("BulkyDiaper", "ItemPelvis", echo),
    "Assets/Female3DCG/ItemPelvis/PoofyDiaper_Back_Gradient.png": `${publicURL}/PoofyDiaper/back.png`,
    ...generateItemEntry("PoofyDiaper", "ItemPelvis", echo),
  });
  AssetManager.addLayerNamesRaw("Panties", "Diapers1", { EN: { "": "Diaper", Gradient: "Wet stains" } });
  AssetManager.addLayerNamesRaw("Panties", "Diapers3", { EN: { "": "Diaper", Gradient: "Wet stains" } });
  AssetManager.addLayerNamesRaw("Panties", "Diapers2", { EN: { Gradient: "Wet stains" } });
  AssetManager.addLayerNamesRaw("Panties", "Diapers4", { EN: { Gradient: "Wet stains" } });

  AssetManager.addLayerNamesRaw("Panties", "LatexDiaper", { EN: { Gradient: "Wet stains" } });
  AssetManager.addLayerNamesRaw("Panties", "BulkyDiaper", { EN: { Gradient: "Wet stains" } });
  AssetManager.addLayerNamesRaw("Panties", "PoofyDiaper", { EN: { Gradient: "Wet stains" } });

  AssetManager.addLayerNamesRaw("ItemPelvis", "LatexDiaper", { EN: { Gradient: "Wet stains" } });
  AssetManager.addLayerNamesRaw("ItemPelvis", "BulkyDiaper", { EN: { Gradient: "Wet stains" } });
  AssetManager.addLayerNamesRaw("ItemPelvis", "PoofyDiaper", { EN: { Gradient: "Wet stains" } });

  AssetManager.modifyAsset("Panties", "Diapers1", (assetGroup, asset) => {
    asset.DefaultColor = ["#817884", "#a88800"];
    asset.ColorableLayerCount = 2;
    asset.EditOpacity = true;
    (asset.Layer as Mutable<AssetLayer[]>).push({
      ...defaultLayer,
      ParentGroup: { "": "BodyLower" },
      Priority: 24,
      Opacity: 0,
      Name: "Gradient",
      ColorIndex: 1,
      DrawingLeft: { "": 150 },
      DrawingTop: { "": 395 },
      Asset: AssetGet("Female3DCG", "Panties", "Diapers1")!,
    });
  });
  AssetManager.modifyAsset("Panties", "Diapers1", (assetGroup, asset) => {
    asset.DefaultColor = ["#817884", "#a88800"];
    asset.ColorableLayerCount = 2;
    asset.EditOpacity = true;
    (asset.Layer as Mutable<AssetLayer[]>).push({
      ...defaultLayer,
      ParentGroup: { "": "BodyLower" },
      Priority: 24,
      Opacity: 0,
      Name: "Gradient",
      ColorIndex: 1,
      DrawingLeft: { "": 150 },
      DrawingTop: { "": 395 },
      Asset: AssetGet("Female3DCG", "Panties", "Diapers1")!,
    });
  });

  AssetManager.modifyAsset("Panties", "Diapers2", (assetGroup, asset) => {
    asset.DefaultColor = ["#817884", "#808080", "#a88800"];
    asset.ColorableLayerCount = 3;
    asset.EditOpacity = true;
    (asset.Layer as Mutable<AssetLayer[]>).push({
      ...defaultLayer,
      ParentGroup: { "": "BodyLower" },
      Priority: 24,
      Opacity: 0,
      Name: "Gradient",
      ColorIndex: 2,
      DrawingLeft: { "": 150 },
      DrawingTop: { "": 395 },
      Asset: AssetGet("Female3DCG", "Panties", "Diapers2")!,
    });
  });

  AssetManager.modifyAsset("Panties", "Diapers3", (assetGroup, asset) => {
    asset.DefaultColor = ["#89798C", "#7E6E28"];
    asset.ColorableLayerCount = 2;
    asset.EditOpacity = true;
    (asset.Layer as Mutable<AssetLayer[]>).push({
      ...defaultLayer,
      ParentGroup: { "": "BodyLower" },
      Priority: 24,
      Opacity: 0,
      Name: "Gradient",
      ColorIndex: 1,
      DrawingLeft: { "": 150 },
      DrawingTop: { "": 395 },
      Asset: AssetGet("Female3DCG", "Panties", "Diapers3")!,
    });
  });

  AssetManager.modifyAsset("Panties", "Diapers4", (assetGroup, asset) => {
    asset.DefaultColor = ["#847786", "#787C8A", "#F56363", "#a88800"];
    asset.ColorableLayerCount = 4;
    asset.EditOpacity = true;
    (asset.Layer as Mutable<AssetLayer[]>).push({
      ...defaultLayer,
      ParentGroup: { "": "BodyLower" },
      Priority: 24,
      Opacity: 0,
      Name: "Gradient",
      ColorIndex: 3,
      DrawingLeft: { "": 150 },
      DrawingTop: { "": 395 },
      Asset: AssetGet("Female3DCG", "Panties", "Diapers4")!,
    });
  });

  AssetManager.modifyAsset("Panties", "LatexDiaper", (assetGroup, asset) => {
    asset.DefaultColor = ["#9763A6", "#658AA6", "#a88800"];
    asset.ColorableLayerCount = 3;
    asset.EditOpacity = true;
    (asset.Layer as Mutable<AssetLayer[]>).push({
      ...defaultLayer,
      ParentGroup: { "": "BodyLower" },
      Priority: 26,
      Opacity: 0,
      Name: "Gradient",
      ColorIndex: 2,
      DrawingLeft: { "": 49 },
      DrawingTop: { "": 360 },
      Asset: AssetGet("Female3DCG", "Panties", "LatexDiaper")!,
    });
  });
  AssetManager.modifyAsset("ItemPelvis", "LatexDiaper", (assetGroup, asset) => {
    asset.DefaultColor = ["#9763A6", "#658AA6", "#a88800"];
    asset.ColorableLayerCount = 3;
    asset.EditOpacity = true;
    (asset.Layer as Mutable<AssetLayer[]>).push({
      ...defaultLayer,
      ParentGroup: { "": "BodyLower" },
      Priority: 26,
      Opacity: 0,
      Name: "Gradient",
      ColorIndex: 2,
      DrawingLeft: { "": 49 },
      DrawingTop: { "": 360 },
      Asset: AssetGet("Female3DCG", "ItemPelvis", "LatexDiaper")!,
    });
  });
  AssetManager.modifyAsset("Panties", "BulkyDiaper", (assetGroup, asset) => {
    asset.DefaultColor = ["#688599", "#808080", "#8c7384", "#BF3F97", "#a88800"];
    asset.ColorableLayerCount = 5;
    asset.EditOpacity = true;
    (asset.Layer as Mutable<AssetLayer[]>).push({
      ...defaultLayer,
      ParentGroup: { "": "BodyLower" },
      Priority: 26,
      Opacity: 0,
      Name: "Gradient",
      ColorIndex: 4,
      DrawingLeft: { "": 49 },
      DrawingTop: { "": 360 },
      Asset: AssetGet("Female3DCG", "Panties", "BulkyDiaper")!,
    });
  });
  AssetManager.modifyAsset("ItemPelvis", "BulkyDiaper", (assetGroup, asset) => {
    asset.DefaultColor = ["#688599", "#808080", "#8c7384", "#BF3F97", "#a88800"];
    asset.ColorableLayerCount = 5;
    asset.EditOpacity = true;
    (asset.Layer as Mutable<AssetLayer[]>).push({
      ...defaultLayer,
      ParentGroup: { "": "BodyLower" },
      Priority: 26,
      Opacity: 0,
      Name: "Gradient",
      ColorIndex: 4,
      DrawingLeft: { "": 49 },
      DrawingTop: { "": 360 },
      Asset: AssetGet("Female3DCG", "ItemPelvis", "BulkyDiaper")!,
    });
  });
  AssetManager.modifyAsset("Panties", "PoofyDiaper", (assetGroup, asset) => {
    asset.DefaultColor = ["#9763A6", "#658AA6", "#997391", "#a916cc", "#a88800"];
    asset.ColorableLayerCount = 5;
    asset.EditOpacity = true;
    (asset.Layer as Mutable<AssetLayer[]>).push({
      ...defaultLayer,
      ParentGroup: { "": "BodyLower" },
      Priority: 26,
      Opacity: 0,
      Name: "Gradient",
      ColorIndex: 4,
      DrawingLeft: { "": 49 },
      DrawingTop: { "": 360 },
      Asset: AssetGet("Female3DCG", "Panties", "PoofyDiaper")!,
    });
  });
  AssetManager.modifyAsset("ItemPelvis", "PoofyDiaper", (assetGroup, asset) => {
    asset.DefaultColor = ["#9763A6", "#658AA6", "#997391", "#a916cc", "#a88800"];
    asset.ColorableLayerCount = 5;
    asset.EditOpacity = true;
    (asset.Layer as Mutable<AssetLayer[]>).push({
      ...defaultLayer,
      ParentGroup: { "": "BodyLower" },
      Priority: 26,
      Opacity: 0,
      Name: "Gradient",
      ColorIndex: 4,
      DrawingLeft: { "": 49 },
      DrawingTop: { "": 360 },
      Asset: AssetGet("Female3DCG", "ItemPelvis", "PoofyDiaper")!,
    });
  });
  if (echo) {
    echoOverwirte();
  }
}
