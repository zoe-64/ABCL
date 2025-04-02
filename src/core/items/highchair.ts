import { AssetManager, CustomAssetDefinition } from "@sugarch/bc-asset-manager";

const assetDefintion: CustomAssetDefinition = {
  Name: "Highchair",
  Random: false,
  Left: 55,
  Top: 320,
  RemoveTime: 15,
  Priority: 40,
  DefaultColor: ["#676285", "#848484", "#4a468d", "#939394"],
  AllowLock: true,
  AllowTighten: true,
  Difficulty: 8,
  Fetish: ["ABDL"],
  Effect: [E.Freeze, E.MapImmobile],
  AllowActivePose: [...PoseAllStanding],
  Height: 50,
  // @ts-expect-error
  ParentGroup: {},
  Layer: [
    {
      Priority: 3,
      Name: "Chair",
    },
    {
      Priority: 50,
      Name: "Tray",
    },
    {
      Priority: 3,
      Name: "Seat",
    },
    {
      Priority: 45,
      Name: "Split",
      CopyLayerColor: "Seat",
    },
    {
      Priority: 1,
      Name: "Legs",
    },
  ],
};
const translations = {
  EN: "Little's Highchair",
  RU: "Высокое кресло",
  CN: "小孩子的高椅",
};
export default function () {
  AssetManager.addImageMapping({
    "Assets/Female3DCG/ItemDevices/Highchair_Chair.png": `${publicURL}/items/other/highchair/Chair.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_Tray.png": `${publicURL}/items/other/highchair/Tray.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_Seat.png": `${publicURL}/items/other/highchair/Seat.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_Split.png": `${publicURL}/items/other/highchair/Split.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_Legs.png": `${publicURL}/items/other/highchair/Legs.png`,
    "Assets/Female3DCG/ItemDevices/Preview/Highchair.png": `${publicURL}/items/other/highchair/Preview.png`,
  });

  AssetManager.addAsset("ItemDevices", assetDefintion, undefined, translations);
}
