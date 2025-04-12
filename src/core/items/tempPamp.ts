import { AssetManager, CustomAssetDefinition } from "@sugarch/bc-asset-manager";

const assetDefintion: CustomAssetDefinition = {
  Name: "Temp_Pamp",
  Random: false,
  EditOpacity: true,
  Left: 160,
  Top: 411,
  Priority: 20,
  DefaultColor: ["#d6efff", "#7B7B7B", "#8197A7", "#4880B9", "#B5A95B", "#AAA44E"],
  // @ts-expect-error
  ParentGroup: {},
  Category: ["ABDL"],
  Fetish: ["ABDL"],
  Attribute: ["GenitaliaCover"],
  Value: 30,
  Difficulty: 50,
  Time: 5,
  RemoveTime: 5,
  AllowLock: true,
  DrawLocks: false,
  Block: ["ItemVulva", "ItemButt", "ItemVulvaPiercings"],

  HideItem: [
    "ItemButtAnalBeads2",
    "ItemVulvaVibratingDildo",
    "ItemVulvaInflatableVibeDildo",
    "ItemVulvaClitSuctionCup",
    "ItemVulvaPiercingsVibeHeartClitPiercing",
    "ItemVulvaPiercingsClitRing",
  ],
  HideItemExclude: [
    "ClothLowerHaremPants",
    "ClothLowerPleatedSkirt",
    "ClothLowerSkirt2",
    "ClothLowerSkirt3",
    "ClothLowerTennisSkirt1",
    "ClothLowerLeggings1",
    "ClothLowerLeggings2",
  ],
  Layer: [
    {
      Name: "Back",
      AllowColorize: true,
      Priority: -1,
    },
    {
      Name: "Base",
      AllowColorize: true,
    },
    {
      Name: "Middle",
      AllowColorize: true,
    },
    {
      Name: "Tabs",
      AllowColorize: true,
    },
    {
      Opacity: 1,
      MinOpacity: 0,
      MaxOpacity: 1,
      Name: "Wet",
      AllowColorize: true,
    },
    {
      Name: "Indicator",
      AllowColorize: true,
    },
  ],
};
const translations = {
  EN: "Cutest Diaper",
  RU: "Самый лучший диапер",
  CN: "最好的尿布",
};
export default function () {
  AssetManager.addImageMapping({
    "Assets/Female3DCG/ItemPelvis/Temp_Pamp_Base.png": `${publicURL}/items/diapers/Temp/Base.png`,
    "Assets/Female3DCG/ItemPelvis/Temp_Pamp_Middle.png": `${publicURL}/items/diapers/Temp/Middle.png`,
    "Assets/Female3DCG/ItemPelvis/Temp_Pamp_Tabs.png": `${publicURL}/items/diapers/Temp/Tabs.png`,
    "Assets/Female3DCG/ItemPelvis/Temp_Pamp_Indicator.png": `${publicURL}/items/diapers/Temp/Indicator.png`,
    "Assets/Female3DCG/ItemPelvis/Temp_Pamp_Wet.png": `${publicURL}/items/diapers/Temp/Wet.png`,
    "Assets/Female3DCG/ItemPelvis/Temp_Pamp_Back.png": `${publicURL}/items/diapers/Temp/Back.png`,
    "Assets/Female3DCG/ItemPelvis/Preview/Temp_Pamp.png": `${publicURL}/items/diapers/Temp/Preview.png`,
  });
  AssetManager.addImageMapping({
    "Assets/Female3DCG/Panties/Temp_Pamp_Base.png": `${publicURL}/items/diapers/Temp/Base.png`,
    "Assets/Female3DCG/Panties/Temp_Pamp_Middle.png": `${publicURL}/items/diapers/Temp/Middle.png`,
    "Assets/Female3DCG/Panties/Temp_Pamp_Tabs.png": `${publicURL}/items/diapers/Temp/Tabs.png`,
    "Assets/Female3DCG/Panties/Temp_Pamp_Indicator.png": `${publicURL}/items/diapers/Temp/Indicator.png`,
    "Assets/Female3DCG/Panties/Temp_Pamp_Wet.png": `${publicURL}/items/diapers/Temp/Wet.png`,
    "Assets/Female3DCG/Panties/Temp_Pamp_Back.png": `${publicURL}/items/diapers/Temp/Back.png`,
    "Assets/Female3DCG/Panties/Preview/Temp_Pamp.png": `${publicURL}/items/diapers/Temp/Preview.png`,
  });
  AssetManager.addAsset("ItemPelvis", assetDefintion, undefined, translations);
  AssetManager.addAsset("Panties", assetDefintion, undefined, translations);
}
