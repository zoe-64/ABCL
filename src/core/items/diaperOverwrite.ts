import { AssetManager, CustomAssetDefinition } from "@sugarch/bc-asset-manager";
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
HookManager.afterPlayerLogin(() => {
  const echo = Boolean((<any>globalThis)?.__BC_LUZI_GLOBALS__?.["OnceFlag.服装拓展"]);
  AssetManager.addImageMapping({
    "Assets/Female3DCG/Panties/Diapers1_Small_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}/small.png`,
    "Assets/Female3DCG/Panties/Diapers1_Normal_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}//normal.png`,
    "Assets/Female3DCG/Panties/Diapers1_Large_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}//large.png`,
    "Assets/Female3DCG/Panties/Diapers1_XLarge_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}//xlarge.png`,

    "Assets/Female3DCG/Panties/Diapers2_Small_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}//small.png`,
    "Assets/Female3DCG/Panties/Diapers2_Normal_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}//normal.png`,
    "Assets/Female3DCG/Panties/Diapers2_Large_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}//large.png`,
    "Assets/Female3DCG/Panties/Diapers2_XLarge_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}//xlarge.png`,

    "Assets/Female3DCG/Panties/Diapers3_Small_Gradient.png": `${publicURL}/items/diaper/Diapers3${echo ? "_echo" : ""}//small.png`,
    "Assets/Female3DCG/Panties/Diapers3_Normal_Gradient.png": `${publicURL}/items/diaper/Diapers3${echo ? "_echo" : ""}//normal.png`,
    "Assets/Female3DCG/Panties/Diapers3_Large_Gradient.png": `${publicURL}/items/diaper/Diapers3${echo ? "_echo" : ""}//large.png`,
    "Assets/Female3DCG/Panties/Diapers3_XLarge_Gradient.png": `${publicURL}/items/diaper/Diapers3${echo ? "_echo" : ""}//xlarge.png`,

    "Assets/Female3DCG/Panties/Diapers4_Small_Gradient.png": `${publicURL}/items/diaper/Diapers4${echo ? "_echo" : ""}//small.png`,
    "Assets/Female3DCG/Panties/Diapers4_Normal_Gradient.png": `${publicURL}/items/diaper/Diapers4${echo ? "_echo" : ""}//normal.png`,
    "Assets/Female3DCG/Panties/Diapers4_Large_Gradient.png": `${publicURL}/items/diaper/Diapers4${echo ? "_echo" : ""}//large.png`,
    "Assets/Female3DCG/Panties/Diapers4_XLarge_Gradient.png": `${publicURL}/items/diaper/Diapers4${echo ? "_echo" : ""}//xlarge.png`,

    "Assets/Female3DCG/Panties/LatexDiaper_Small_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/small.png`,
    "Assets/Female3DCG/Panties/LatexDiaper_Normal_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/normal.png`,
    "Assets/Female3DCG/Panties/LatexDiaper_Large_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/large.png`,
    "Assets/Female3DCG/Panties/LatexDiaper_XLarge_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/xlarge.png`,

    "Assets/Female3DCG/Panties/BulkyDiaper_Back_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/back.png`,
    "Assets/Female3DCG/Panties/BulkyDiaper_Small_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/small.png`,
    "Assets/Female3DCG/Panties/BulkyDiaper_Normal_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/normal.png`,
    "Assets/Female3DCG/Panties/BulkyDiaper_Large_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/large.png`,
    "Assets/Female3DCG/Panties/BulkyDiaper_XLarge_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/xlarge.png`,

    "Assets/Female3DCG/Panties/PoofyDiaper_Back_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/back.png`,
    "Assets/Female3DCG/Panties/PoofyDiaper_Small_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/small.png`,
    "Assets/Female3DCG/Panties/PoofyDiaper_Normal_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/normal.png`,
    "Assets/Female3DCG/Panties/PoofyDiaper_Large_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/large.png`,
    "Assets/Female3DCG/Panties/PoofyDiaper_XLarge_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/xlarge.png`,

    // ItemPelvis
    "Assets/Female3DCG/ItemPelvis/LatexDiaper_Small_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/small.png`,
    "Assets/Female3DCG/ItemPelvis/LatexDiaper_Normal_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/normal.png`,
    "Assets/Female3DCG/ItemPelvis/LatexDiaper_Large_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/large.png`,
    "Assets/Female3DCG/ItemPelvis/LatexDiaper_XLarge_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/xlarge.png`,

    "Assets/Female3DCG/ItemPelvis/BulkyDiaper_Back_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/back.png`,
    "Assets/Female3DCG/ItemPelvis/BulkyDiaper_Small_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/small.png`,
    "Assets/Female3DCG/ItemPelvis/BulkyDiaper_Normal_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/normal.png`,
    "Assets/Female3DCG/ItemPelvis/BulkyDiaper_Large_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/large.png`,
    "Assets/Female3DCG/ItemPelvis/BulkyDiaper_XLarge_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/xlarge.png`,

    "Assets/Female3DCG/ItemPelvis/PoofyDiaper_Back_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/back.png`,
    "Assets/Female3DCG/ItemPelvis/PoofyDiaper_Small_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/small.png`,
    "Assets/Female3DCG/ItemPelvis/PoofyDiaper_Normal_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/normal.png`,
    "Assets/Female3DCG/ItemPelvis/PoofyDiaper_Large_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/large.png`,
    "Assets/Female3DCG/ItemPelvis/PoofyDiaper_XLarge_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/xlarge.png`,
  });
});
export default function () {
  const echo = Boolean((<any>globalThis)?.__BC_LUZI_GLOBALS__?.["OnceFlag.服装拓展"]);
  AssetManager.addImageMapping({
    "Assets/Female3DCG/Panties/Diapers1_Small_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}/small.png`,
    "Assets/Female3DCG/Panties/Diapers1_Normal_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}//normal.png`,
    "Assets/Female3DCG/Panties/Diapers1_Large_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}//large.png`,
    "Assets/Female3DCG/Panties/Diapers1_XLarge_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}//xlarge.png`,

    "Assets/Female3DCG/Panties/Diapers2_Small_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}//small.png`,
    "Assets/Female3DCG/Panties/Diapers2_Normal_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}//normal.png`,
    "Assets/Female3DCG/Panties/Diapers2_Large_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}//large.png`,
    "Assets/Female3DCG/Panties/Diapers2_XLarge_Gradient.png": `${publicURL}/items/diaper/Diapers1${echo ? "_echo" : ""}//xlarge.png`,

    "Assets/Female3DCG/Panties/Diapers3_Small_Gradient.png": `${publicURL}/items/diaper/Diapers3${echo ? "_echo" : ""}//small.png`,
    "Assets/Female3DCG/Panties/Diapers3_Normal_Gradient.png": `${publicURL}/items/diaper/Diapers3${echo ? "_echo" : ""}//normal.png`,
    "Assets/Female3DCG/Panties/Diapers3_Large_Gradient.png": `${publicURL}/items/diaper/Diapers3${echo ? "_echo" : ""}//large.png`,
    "Assets/Female3DCG/Panties/Diapers3_XLarge_Gradient.png": `${publicURL}/items/diaper/Diapers3${echo ? "_echo" : ""}//xlarge.png`,

    "Assets/Female3DCG/Panties/Diapers4_Small_Gradient.png": `${publicURL}/items/diaper/Diapers4${echo ? "_echo" : ""}//small.png`,
    "Assets/Female3DCG/Panties/Diapers4_Normal_Gradient.png": `${publicURL}/items/diaper/Diapers4${echo ? "_echo" : ""}//normal.png`,
    "Assets/Female3DCG/Panties/Diapers4_Large_Gradient.png": `${publicURL}/items/diaper/Diapers4${echo ? "_echo" : ""}//large.png`,
    "Assets/Female3DCG/Panties/Diapers4_XLarge_Gradient.png": `${publicURL}/items/diaper/Diapers4${echo ? "_echo" : ""}//xlarge.png`,

    "Assets/Female3DCG/Panties/LatexDiaper_Small_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/small.png`,
    "Assets/Female3DCG/Panties/LatexDiaper_Normal_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/normal.png`,
    "Assets/Female3DCG/Panties/LatexDiaper_Large_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/large.png`,
    "Assets/Female3DCG/Panties/LatexDiaper_XLarge_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/xlarge.png`,

    "Assets/Female3DCG/Panties/BulkyDiaper_Back_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/back.png`,
    "Assets/Female3DCG/Panties/BulkyDiaper_Small_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/small.png`,
    "Assets/Female3DCG/Panties/BulkyDiaper_Normal_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/normal.png`,
    "Assets/Female3DCG/Panties/BulkyDiaper_Large_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/large.png`,
    "Assets/Female3DCG/Panties/BulkyDiaper_XLarge_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/xlarge.png`,

    "Assets/Female3DCG/Panties/PoofyDiaper_Back_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/back.png`,
    "Assets/Female3DCG/Panties/PoofyDiaper_Small_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/small.png`,
    "Assets/Female3DCG/Panties/PoofyDiaper_Normal_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/normal.png`,
    "Assets/Female3DCG/Panties/PoofyDiaper_Large_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/large.png`,
    "Assets/Female3DCG/Panties/PoofyDiaper_XLarge_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/xlarge.png`,

    // ItemPelvis
    "Assets/Female3DCG/ItemPelvis/LatexDiaper_Small_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/small.png`,
    "Assets/Female3DCG/ItemPelvis/LatexDiaper_Normal_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/normal.png`,
    "Assets/Female3DCG/ItemPelvis/LatexDiaper_Large_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/large.png`,
    "Assets/Female3DCG/ItemPelvis/LatexDiaper_XLarge_Gradient.png": `${publicURL}/items/diaper/LatexDiaper/xlarge.png`,

    "Assets/Female3DCG/ItemPelvis/BulkyDiaper_Back_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/back.png`,
    "Assets/Female3DCG/ItemPelvis/BulkyDiaper_Small_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/small.png`,
    "Assets/Female3DCG/ItemPelvis/BulkyDiaper_Normal_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/normal.png`,
    "Assets/Female3DCG/ItemPelvis/BulkyDiaper_Large_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/large.png`,
    "Assets/Female3DCG/ItemPelvis/BulkyDiaper_XLarge_Gradient.png": `${publicURL}/items/diaper/BulkyDiaper/xlarge.png`,

    "Assets/Female3DCG/ItemPelvis/PoofyDiaper_Back_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/back.png`,
    "Assets/Female3DCG/ItemPelvis/PoofyDiaper_Small_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/small.png`,
    "Assets/Female3DCG/ItemPelvis/PoofyDiaper_Normal_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/normal.png`,
    "Assets/Female3DCG/ItemPelvis/PoofyDiaper_Large_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/large.png`,
    "Assets/Female3DCG/ItemPelvis/PoofyDiaper_XLarge_Gradient.png": `${publicURL}/items/diaper/PoofyDiaper/xlarge.png`,
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
