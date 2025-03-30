import { AssetManager, CustomAssetDefinition } from "@sugarch/bc-asset-manager";

const assetDefintion: CustomAssetDefinition = {
  Name: "Stroller",
  Random: false,
  Left: 0,
  Top: 0,
  //RemoveTime: 15,
  Priority: 40,
  DefaultColor: ["#676285"],
  //AllowLock: true,
  //AllowTighten: true,
  //Difficulty: 8,
  Fetish: ["ABDL"],
  //Effect: [E.Freeze],
  //AllowActivePose: [...PoseAllKneeling],
  Property: {
    OverrideHeight: {
      Height: 200,
      Priority: 51,
    },
    Effect: [E.Lifted],
  },
  // @ts-expect-error
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
