import { AssetManager, CustomGroupedAssetDefinitions, Translation } from "@sugarch/bc-asset-manager";

const assetDefintion: CustomGroupedAssetDefinitions = {
  Panties: [
    {
      Name: "UntrainersThin",
      Random: false,
      InventoryID: 1241,
      Top: 325,
      Left: 127,
      Value: 28,
      BuyGroup: "UntrainersThins",
      Priority: 20,
      Fetish: ["ABDL"],
      EditOpacity: true,
      Category: ["ABDL"],
      ParentGroup: "BodyLower",
      Hide: ["Pussy", "ItemVulva"],
      Attribute: ["GenitaliaCover"],
      DefaultColor: ["#d6efff", "#7B7B7B", "#8197A7", "#4880B9", "#B5A95B", "#AAA44E"],
      HideItemExclude: ["ItemVulvaWandBelt", "ItemVulvaHempRopeBelt", "ItemVulvaFullLatexSuitWand", "ItemVulvaWiredEgg"],
      Layer: [
        {
          Name: "Back",
          Priority: 3,
        },
        {
          Name: "Base",
        },
        {
          Name: "Middle",
        },
        {
          Name: "Tabs",
        },
        {
          Opacity: 0,
          MinOpacity: 0,
          MaxOpacity: 1,
          Name: "Wet",
        },
        {
          Opacity: 1,
          Name: "Indicator",
          MinOpacity: 0,
          MaxOpacity: 1,
        },
      ],
    },
  ],
  ItemPelvis: [
    {
      Name: "UntrainersThin",
      CopyConfig: {
        AssetName: "UntrainersThin",
        GroupName: "Panties",
        BuyGroup: true,
      },
      Difficulty: 50,
      Time: 5,
      RemoveTime: 5,
      AllowLock: true,
      DrawLocks: false,
    },
  ],
};
const translations: Translation.GroupedEntries = {
  EN: {
    Panties: {
      UntrainersThin: "Crinkly Diaper",
    },
    ItemPelvis: {
      UntrainersThin: "Crinkly Diaper",
    },
  },
};
export default function () {
  AssetManager.addImageMapping({
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Large_Back.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Large_Back.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Large_Base.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Large_Base.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Large_Indicator.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Large_Indicator.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Large_Middle.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Large_Middle.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Large_Tabs.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Large_Tabs.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Large_Wet.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Large_Wet.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Normal_Back.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Normal_Back.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Normal_Base.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Normal_Base.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Normal_Indicator.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Normal_Indicator.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Normal_Middle.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Normal_Middle.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Normal_Tabs.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Normal_Tabs.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Normal_Wet.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Normal_Wet.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Small_Back.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Small_Back.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Small_Base.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Small_Base.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Small_Indicator.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Small_Indicator.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Small_Middle.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Small_Middle.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Small_Tabs.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Small_Tabs.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_Small_Wet.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Small_Wet.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_XLarge_Back.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_XLarge_Back.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_XLarge_Base.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_XLarge_Base.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_XLarge_Indicator.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_XLarge_Indicator.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_XLarge_Middle.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_XLarge_Middle.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_XLarge_Tabs.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_XLarge_Tabs.png`,
    "Assets/Female3DCG/ItemPelvis/UntrainersThin_XLarge_Wet.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_XLarge_Wet.png`,
    "Assets/Female3DCG/ItemPelvis/Preview/UntrainersThin.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin.png`,
  });
  AssetManager.addImageMapping({
    "Assets/Female3DCG/Panties/UntrainersThin_Large_Back.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Large_Back.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Large_Base.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Large_Base.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Large_Indicator.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Large_Indicator.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Large_Middle.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Large_Middle.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Large_Tabs.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Large_Tabs.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Large_Wet.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Large_Wet.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Normal_Back.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Normal_Back.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Normal_Base.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Normal_Base.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Normal_Indicator.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Normal_Indicator.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Normal_Middle.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Normal_Middle.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Normal_Tabs.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Normal_Tabs.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Normal_Wet.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Normal_Wet.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Small_Back.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Small_Back.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Small_Base.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Small_Base.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Small_Indicator.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Small_Indicator.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Small_Middle.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Small_Middle.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Small_Tabs.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Small_Tabs.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_Small_Wet.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_Small_Wet.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_XLarge_Back.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_XLarge_Back.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_XLarge_Base.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_XLarge_Base.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_XLarge_Indicator.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_XLarge_Indicator.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_XLarge_Middle.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_XLarge_Middle.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_XLarge_Tabs.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_XLarge_Tabs.png`,
    "Assets/Female3DCG/Panties/UntrainersThin_XLarge_Wet.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin_XLarge_Wet.png`,
    "Assets/Female3DCG/Panties/Preview/UntrainersThin.png": `${publicURL}/items/diapers/UntrainersThin/UntrainersThin.png`,
  });
  AssetManager.addGroupedAssets(assetDefintion, translations, undefined);
}
