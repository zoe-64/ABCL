import { AssetManager, CustomAssetDefinition } from "@sugarch/bc-asset-manager";

export const pampsAssetDefintion: CustomAssetDefinition = {
  // Asset name, must be unique in the body group
  Name: "Untrainers_Pamp",
  // item appearing on random character
  Random: false,
  //  player canvas size is 500x1000
  Left: 174,
  Top: 434,
  // the drawing order of the item, higher number means drawn later, and on top of other items
  Priority: 20,
  DefaultColor: ["#FFFFFF"],
  // @ts-expect-error
  ParentGroup: {},
  // Asset layers, picture resource names
  Layer: [
    //Assets/[BodyGroup]/[AssetName]_[LayerName].png
    {
      // resouce located at "Assets/ItemMisc/SimpleExample_Base.png"
      Name: "Base",
      AllowColorize: true,
    },
    {
      Name: "Patch",
      AllowColorize: true,
    },
    {
      Name: "Detail_2",
      AllowColorize: true,
    },
    {
      Name: "Detail_1",
      AllowColorize: true,
    },
    {
      Name: "Detail_3",
      AllowColorize: true,
    },
    {
      Name: "Indicator",
      AllowColorize: true,
    },
    {
      Name: "Tabs",
      AllowColorize: true,
    },
  ],
};
const translations = {
  CN: "Pampers尿布",
  EN: "Pampers Diaper",
  RU: "Памперсовые диаперы",
};
export default function () {
  AssetManager.addImageMapping({
    "Assets/Female3DCG/ItemPelvis/Untrainers_Pamp_Base.png": `${publicURL}/items/diapers/Untrainers_Pamp_Base.png`,
    "Assets/Female3DCG/ItemPelvis/Untrainers_Pamp_Patch.png": `${publicURL}/items/diapers/Untrainers_Pamp_Patch.png`,
    "Assets/Female3DCG/ItemPelvis/Untrainers_Pamp_Detail_1.png": `${publicURL}/items/diapers/Untrainers_Pamp_Detail_1.png`,
    "Assets/Female3DCG/ItemPelvis/Untrainers_Pamp_Detail_2.png": `${publicURL}/items/diapers/Untrainers_Pamp_Detail_2.png`,
    "Assets/Female3DCG/ItemPelvis/Untrainers_Pamp_Detail_3.png": `${publicURL}/items/diapers/Untrainers_Pamp_Detail_3.png`,
    "Assets/Female3DCG/ItemPelvis/Untrainers_Pamp_Indicator.png": `${publicURL}/items/diapers/Untrainers_Pamp_Indicator.png`,
    "Assets/Female3DCG/ItemPelvis/Untrainers_Pamp_Tabs.png": `${publicURL}/items/diapers/Untrainers_Pamp_Tabs.png`,
    "Assets/Female3DCG/ItemPelvis/Preview/Untrainers_Pamp.png": `${publicURL}/items/diapers/Untrainers_Pamp_Preview.png`,
  });
  AssetManager.addAsset("ItemPelvis", pampsAssetDefintion, undefined, translations);
}
