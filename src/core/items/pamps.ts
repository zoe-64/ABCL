import { AssetManager } from "../../../bc-modding-utilities/src";

export const pampsAssetDefintion: CustomAssetDefinition = {
  // Asset name, must be unique in the body group
  Name: "PampersDiaper",
  // item appearing on random character
  Random: false,
  //  player canvas size is 500x1000
  Left: 177,
  Top: 500,
  // the drawing order of the item, higher number means drawn later, and on top of other items
  Priority: 40,
  DefaultColor: ["#FFFFFF"],
  // Asset layers, picture resource names
  Layer: [
    //Assets/[BodyGroup]/[AssetName]_[LayerName].png
    {
      // resouce located at "Assets/ItemMisc/SimpleExample_Base.png"
      Name: "Base",
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
  AssetManager.addAsset("ItemPelvis", pampsAssetDefintion, undefined, translations);
}
