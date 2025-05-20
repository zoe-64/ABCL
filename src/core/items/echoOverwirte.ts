import { AssetManager } from "@sugarch/bc-asset-manager";
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
export default function () {
  AssetManager.addImageMapping({
    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers1_Small_Gradient.png": `${publicURL}/items/diaper/Diapers1_echo/small.png`,
    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers1_Normal_Gradient.png": `${publicURL}/items/diaper/Diapers1_echo//normal.png`,
    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers1_Large_Gradient.png": `${publicURL}/items/diaper/Diapers1_echo//large.png`,
    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers1_XLarge_Gradient.png": `${publicURL}/items/diaper/Diapers1_echo//xlarge.png`,

    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers2_Small_Gradient.png": `${publicURL}/items/diaper/Diapers1_echo//small.png`,
    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers2_Normal_Gradient.png": `${publicURL}/items/diaper/Diapers1_echo//normal.png`,
    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers2_Large_Gradient.png": `${publicURL}/items/diaper/Diapers1_echo//large.png`,
    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers2_XLarge_Gradient.png": `${publicURL}/items/diaper/Diapers1_echo//xlarge.png`,

    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers3_Small_Gradient.png": `${publicURL}/items/diaper/Diapers3_echo//small.png`,
    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers3_Normal_Gradient.png": `${publicURL}/items/diaper/Diapers3_echo//normal.png`,
    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers3_Large_Gradient.png": `${publicURL}/items/diaper/Diapers3_echo//large.png`,
    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers3_XLarge_Gradient.png": `${publicURL}/items/diaper/Diapers3_echo//xlarge.png`,

    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers4_Small_Gradient.png": `${publicURL}/items/diaper/Diapers4_echo//small.png`,
    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers4_Normal_Gradient.png": `${publicURL}/items/diaper/Diapers4_echo//normal.png`,
    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers4_Large_Gradient.png": `${publicURL}/items/diaper/Diapers4_echo//large.png`,
    "Assets/Female3DCG/Panties_笨笨蛋Luzi/Diapers4_XLarge_Gradient.png": `${publicURL}/items/diaper/Diapers4_echo//xlarge.png`,
  });

  // @ts-expect-error "Panties_笨笨蛋Luzi"
  AssetManager.addLayerNamesRaw("Panties_笨笨蛋Luzi", "Diapers1", { EN: { "": "Diaper", Gradient: "Wet stains" } });
  // @ts-expect-error "Panties_笨笨蛋Luzi"
  AssetManager.addLayerNamesRaw("Panties_笨笨蛋Luzi", "Diapers3", { EN: { "": "Diaper", Gradient: "Wet stains" } });
  // @ts-expect-error "Panties_笨笨蛋Luzi"
  AssetManager.addLayerNamesRaw("Panties_笨笨蛋Luzi", "Diapers2", { EN: { Gradient: "Wet stains" } });
  // @ts-expect-error "Panties_笨笨蛋Luzi"
  AssetManager.addLayerNamesRaw("Panties_笨笨蛋Luzi", "Diapers4", { EN: { Gradient: "Wet stains" } });

  // @ts-expect-error "Panties_笨笨蛋Luzi"
  AssetManager.addLayerNamesRaw("Panties_笨笨蛋Luzi", "LatexDiaper", { EN: { Gradient: "Wet stains" } });
  // @ts-expect-error "Panties_笨笨蛋Luzi"
  AssetManager.addLayerNamesRaw("Panties_笨笨蛋Luzi", "BulkyDiaper", { EN: { Gradient: "Wet stains" } });
  // @ts-expect-error "Panties_笨笨蛋Luzi"
  AssetManager.addLayerNamesRaw("Panties_笨笨蛋Luzi", "PoofyDiaper", { EN: { Gradient: "Wet stains" } });
  // @ts-expect-error "Panties_笨笨蛋Luzi"
  AssetManager.modifyAsset("Panties_笨笨蛋Luzi", "Diapers1", (assetGroup, asset) => {
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
      // @ts-expect-error "Panties_笨笨蛋Luzi"
      Asset: AssetGet("Female3DCG", "Panties_笨笨蛋Luzi", "Diapers1")!,
    });
  });

  // @ts-expect-error "Panties_笨笨蛋Luzi"
  AssetManager.modifyAsset("Panties_笨笨蛋Luzi", "Diapers2", (assetGroup, asset) => {
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
      // @ts-expect-error "Panties_笨笨蛋Luzi"
      Asset: AssetGet("Female3DCG", "Panties_笨笨蛋Luzi", "Diapers2")!,
    });
  });

  // @ts-expect-error "Panties_笨笨蛋Luzi"
  AssetManager.modifyAsset("Panties_笨笨蛋Luzi", "Diapers3", (assetGroup, asset) => {
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
      // @ts-expect-error "Panties_笨笨蛋Luzi"
      Asset: AssetGet("Female3DCG", "Panties_笨笨蛋Luzi", "Diapers3")!,
    });
  });

  // @ts-expect-error "Panties_笨笨蛋Luzi"
  AssetManager.modifyAsset("Panties_笨笨蛋Luzi", "Diapers4", (assetGroup, asset) => {
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
      // @ts-expect-error "Panties_笨笨蛋Luzi"
      Asset: AssetGet("Female3DCG", "Panties_笨笨蛋Luzi", "Diapers4")!,
    });
  });

  // @ts-expect-error "Panties_笨笨蛋Luzi"
  AssetManager.modifyAsset("Panties_笨笨蛋Luzi", "LatexDiaper", (assetGroup, asset) => {
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
      // @ts-expect-error "Panties_笨笨蛋Luzi"
      Asset: AssetGet("Female3DCG", "Panties_笨笨蛋Luzi", "LatexDiaper")!,
    });
  });
  // @ts-expect-error "Panties_笨笨蛋Luzi"
  AssetManager.modifyAsset("Panties_笨笨蛋Luzi", "BulkyDiaper", (assetGroup, asset) => {
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
      // @ts-expect-error "Panties_笨笨蛋Luzi"
      Asset: AssetGet("Female3DCG", "Panties_笨笨蛋Luzi", "BulkyDiaper")!,
    });
  });
}
