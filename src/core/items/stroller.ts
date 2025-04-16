import { AssetManager, CustomAssetDefinition } from "@sugarch/bc-asset-manager";

const assetDefintion: CustomAssetDefinition = {
  Name: "Stroller",
  Random: false,
  Left: 0,
  Top: 0,
  Priority: 40,
  Fetish: ["ABDL"],
  Category: ["ABDL"],
  DefaultColor: ["#676285"],
  SetPose: [...PoseAllKneeling],
  AllowActivePose: [...PoseAllKneeling],
  Difficulty: 8,
  RemoveTime: 15,
  AllowLock: true,
  AllowTighten: true,
  Effect: [E.Freeze, E.Leash],
  AllowEffect: [E.Leash, E.IsLeashed],

  OverrideHeight: {
    Height: -100,
    Priority: 51,
    HeightRatioProportion: 0,
  },
  ParentGroup: {},
  Layer: [
    {
      Priority: 3,
      Name: "Outline",
    },
  ],
};
const translations = {
  EN: "Stroller (DO NOT USE PLZZZ)",
  RU: "Стрелка",
  CN: "婴儿推车",
};
export default function () {
  AssetManager.addImageMapping({
    "Assets/Female3DCG/ItemDevices/Stroller_Outline.png": `${publicURL}/items/other/stroller/Stroller_Outline.png`,
    "Assets/Female3DCG/ItemDevices/Preview/Stroller.png": `${publicURL}/items/other/stroller/Stroller_Outline.png`,
  });

  AssetManager.addAsset("ItemDevices", assetDefintion, undefined, translations);
}
