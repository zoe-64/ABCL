import { AssetManager, CustomAssetDefinition } from "@sugarch/bc-asset-manager";

const assetDefintion: CustomAssetDefinition = {
  Name: "Highchair",
  Random: false,
  Left: 32,
  Top: 280,
  RemoveTime: 15,
  Priority: 46,
  DefaultColor: ["#676285", "#848484", "#4a468d", "#939394"],
  AllowLock: true,
  AllowTighten: true,
  Difficulty: 8,
  Fetish: ["ABDL"],
  Effect: [E.Freeze, E.MapImmobile],
  AllowActivePose: [...PoseAllStanding],
  Height: 50,
  ParentGroup: {},
  Layer: [
    {
      Priority: 3,
      Name: "Chair",
    },
    {
      Priority: 26,
      Name: "Tray",
    },
    {
      Priority: 3,
      Name: "Seat",
    },
    {
      Name: "Split",
      CopyLayerColor: "Seat",
    },
    {
      Priority: 1,
      Name: "Legs",
    },
    {
      Name: "BabyFood",
      AllowTypes: { a: 1 },
      Top: 425,
      Left: 231,
    },
    {
      Name: "Fork",
      AllowTypes: { a: 2 },
      Top: 452,
      Left: 181,
    },
    {
      Name: "Plate",
      AllowTypes: { a: 2 },
      Top: 452,
      Left: 203,
    },
    {
      Name: "Brocoli",
      AllowTypes: { a: 2 },
      Top: 452,
      Left: 203,
    },
    {
      Name: "Potato",
      AllowTypes: { a: 2 },
      Top: 452,
      Left: 203,
    },
    {
      Name: "CookieShapes",
      AllowTypes: { a: 2 },
      Top: 452,
      Left: 203,
    },
    {
      Name: "Cookies",
      AllowTypes: { a: 3 },
      Top: 474,
      Left: 194,
    },
    {
      Name: "BottleMilk",
      AllowTypes: { b: 1 },
      Top: 378,
      Left: 116,
    },
    {
      Name: "BottleOutline",
      AllowTypes: { b: 1 },
      Top: 378,
      Left: 116,
    },
    {
      Name: "BottleCork",
      AllowTypes: { b: 1 },
      Top: 378,
      Left: 116,
    },
    {
      Name: "SippyCup",
      AllowTypes: { b: 2 },
      Top: 446,
      Left: 128,
    },
    {
      Name: "FaceStains",
      Top: 184,
      Left: 213,
      AllowTypes: { c: 1 },
    },
  ],
};

const extended: AssetArchetypeConfig = {
  Archetype: ExtendedArchetype.MODULAR,
  Modules: [
    {
      Name: "Drink",
      Key: "b",
      Options: [
        {}, // None
        {}, // Bottle
        {}, // Sippy
      ],
    },
    {
      Name: "Stains",
      Key: "c",
      Options: [
        {}, // None
        {}, // Stains
      ],
    },
    {
      Name: "Food",
      Key: "a",
      Options: [
        {}, // None
        {}, // Baby Food
        {}, // Plate of Food
        {}, // Cookies
      ],
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
    "Assets/Female3DCG/ItemDevices/Highchair_Fork.png": `${publicURL}/items/other/highchair/Fork.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_BottleMilk.png": `${publicURL}/items/other/highchair/BottleMilk.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_BottleOutline.png": `${publicURL}/items/other/highchair/BottleOutline.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_BottleCork.png": `${publicURL}/items/other/highchair/BottleCork.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_SippyCup.png": `${publicURL}/items/other/highchair/SippyCup.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_FaceStains.png": `${publicURL}/items/other/highchair/Stains.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_BabyFood.png": `${publicURL}/items/other/highchair/BabyFood.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_Plate.png": `${publicURL}/items/other/highchair/Plate.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_Brocoli.png": `${publicURL}/items/other/highchair/Brocoli.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_Potato.png": `${publicURL}/items/other/highchair/Potato.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_CookieShapes.png": `${publicURL}/items/other/highchair/CookieShapes.png`,
    "Assets/Female3DCG/ItemDevices/Highchair_Cookies.png": `${publicURL}/items/other/highchair/Cookies.png`,
    "Screens/Inventory/ItemDevices/Highchair/a0.png": `${publicURL}/items/other/highchair/a0.png`,
    "Screens/Inventory/ItemDevices/Highchair/a1.png": `${publicURL}/items/other/highchair/a1.png`,
    "Screens/Inventory/ItemDevices/Highchair/a2.png": `${publicURL}/items/other/highchair/a2.png`,
    "Screens/Inventory/ItemDevices/Highchair/a3.png": `${publicURL}/items/other/highchair/a3.png`,
    "Screens/Inventory/ItemDevices/Highchair/b0.png": `${publicURL}/items/other/highchair/b0.png`,
    "Screens/Inventory/ItemDevices/Highchair/b1.png": `${publicURL}/items/other/highchair/b1.png`,
    "Screens/Inventory/ItemDevices/Highchair/b2.png": `${publicURL}/items/other/highchair/b2.png`,
    "Screens/Inventory/ItemDevices/Highchair/c0.png": `${publicURL}/items/other/highchair/c0.png`,
    "Screens/Inventory/ItemDevices/Highchair/c1.png": `${publicURL}/items/other/highchair/c1.png`,
  });
  AssetManager.addCustomDialog({
    EN: {
      ItemDevicesHighchairSelectBase: "Select an option",
      ItemDevicesHighchairModuleDrink: "Drink",
      ItemDevicesHighchairOptionb0: "No Drink",
      ItemDevicesHighchairOptionb1: "Bottle of Milk",
      ItemDevicesHighchairOptionb2: "Sippy Cup",
      ItemDevicesHighchairModuleFood: "Food",
      ItemDevicesHighchairOptiona0: "No Food",
      ItemDevicesHighchairOptiona1: "Baby Food",
      ItemDevicesHighchairOptiona2: "Plate of Food",
      ItemDevicesHighchairOptiona3: "Cookies",
      ItemDevicesHighchairModuleStains: "Stains",
      ItemDevicesHighchairOptionc0: "No Stains",
      ItemDevicesHighchairOptionc1: "Stains",
    },
  });
  AssetManager.addAsset("ItemDevices", assetDefintion, extended, translations);
}
