import { AssetManager, CustomAssetDefinition } from "@sugarch/bc-asset-manager";

const assetDefintion: CustomAssetDefinition = {
  // Asset name, must be unique in the body group
  Name: "Temp_Pamp",
  // item appearing on random character
  Random: false,
  EditOpacity: true,
  //  player canvas size is 500x1000
  Left: 160,
  Top: 411,
  // the drawing order of the item, higher number means drawn later, and on top of other items
  Priority: 20,
  DefaultColor: ["#d6efff", "#7B7B7B", "#8197A7", "#4880B9", "#B5A95B", "#AAA44E"],
  // @ts-expect-error
  ParentGroup: {},
  // Asset layers, picture resource names
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
