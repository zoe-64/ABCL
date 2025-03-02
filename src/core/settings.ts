import { merge, debounce } from "lodash-es";
import { PartialDeep } from "../types/types";
import { sendUpdateMyData as sendUpdateMyData } from "./hooks";
import { logger } from "./logger";

export const metabolismValues: Map<MetabolismSettingValues, number> = new Map([
  ["Disabled", 0],
  ["Slow", 0.5], // 40 min
  ["Normal", 1], // 20 min
  ["Fast", 1.5], // 13.3 min
  ["Faster", 2], // 10 min
  ["Fastest", 3], // 6.6 min
]);

export const defaultSettings: ModSettings = {
  Metabolism: "Normal",
  DisableWetting: false,
  DisableSoiling: false,
  OpenRemoteSettings: false,
  LockedOutOfSettings: false,
};

export const defaultStats: ModStats = {
  Bladder: {
    value: 0, // in ml
    size: 300, // in ml, quite arbitrary
  },
  Bowel: {
    value: 0, // in ml
    size: 200, // in ml
  },
  Soiliness: {
    value: 0, // in ml
  },
  Wetness: {
    value: 0, // in ml
  },
  WaterIntake: {
    value: 300 / 20, // accident every 20 minutes
  },
  FoodIntake: {
    value: 200 / 60,
  },
  Incontinence: {
    value: 0,
  },
  MentalRegression: {
    value: 0,
  },
};
const defaultData: ModStorageModel = {
  Settings: defaultSettings,
  Stats: defaultStats,
};

export const updateData = (newData: PartialDeep<ModStorageModel>) => {
  Player[modIdentifier] = merge(Player[modIdentifier] || defaultData, newData);
  syncData();
};

export const syncData = debounce(() => {
  const compressed = LZString.compressToBase64(JSON.stringify(Player[modIdentifier]));
  Player.ExtensionSettings[modIdentifier] = compressed;
  ServerPlayerExtensionSettingsSync(modIdentifier);
  sendUpdateMyData();
}, 1000);

//const devMode = false; use clearData() // Manually toggle during local development if needed to clear settings
export const loadOrGenerateData = () => {
  const dataString = LZString.decompressFromBase64(Player.ExtensionSettings[modIdentifier]);
  const data = dataString
    ? JSON.parse(dataString)
    : {
        Settings: {},
        Stats: {},
        ModVersion: modVersion,
      };

  // migrations
  if (data.ModVersion === "2.0.0") {
    // in 2.0.1 we removed the permission levels and caregivers from the settings because of littlish taking over
    data.Settings = Object.fromEntries(
      Object.entries(data.Settings as Record<string, { value: any }>)
        .filter(([key]) => key !== "CaregiverIDs")
        .map(([key, { value }]) => [key, value])
    );
    data.ModVersion = "2.0.1";
  }

  const modStorageObject = merge(
    {
      Settings: defaultSettings,
      Stats: defaultStats,
      ModVersion: modVersion,
    },
    data
  );
  logger.debug({ message: "Merged settings object", modStorageObject });
  Player[modIdentifier] = modStorageObject;
};

export const clearData = () => {
  Player.ExtensionSettings[modIdentifier] = "N4XyA==="; // Empty object compressed
  ServerPlayerExtensionSettingsSync(modIdentifier);
  logger.warn("cleared data");
};
