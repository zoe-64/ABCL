import { merge } from "lodash-es";
import { PartialDeep, PermissionLevels } from "../types/types";
import { sendUpdateMyData as sendUpdateMyData } from "./hooks";
import { logger } from "./logger";

const defaultSettings: ModSettings = {
  ExampleSetting1: {
    value: "example value",
    permission: {
      canView: PermissionLevels.Anyone,
      canModify: PermissionLevels.Self,
    },
  },
  Metabolism: {
    value: "normal", // "slow", "normal", "fast"
    permission: {
      canView: PermissionLevels.Self,
      canModify: PermissionLevels.Self,
    },
  },
};

const defaultStats: ModStats = {
  Bladder: {
    value: 0.0,
  },
  Bowel: {
    value: 0.0,
  },
  Soiliness: {
    value: 0,
  },
  Wetness: {
    value: 0,
  },
  WaterIntake: {
    value: 1 / 450,
  },
  FoodIntake: {
    value: 1 / 250,
  },
};
const defaultData: ModStorageModel = {
  Settings: defaultSettings,
  Stats: defaultStats,
};

export const mutateData = (newData: PartialDeep<ModStorageModel>) => {
  Player[modIdentifier] = merge(Player[modIdentifier] || defaultData, newData);
  saveData();
};
(window as any).mutateData = mutateData;

let dataSaveTimeout: number | null = null;
/**
 * Saves the data by compressing and storing them in the Player object and sending an update to the server.
 *
 * @remarks
 * This function compresses the data using LZString and stores them in the Player object.
 * It also sets a timeout to synchronize the extension data with the server and send an update if necessary.
 */
export const saveData = () => {
  const compressed = LZString.compressToBase64(
    JSON.stringify(Player[modIdentifier])
  );
  Player.ExtensionSettings[modIdentifier] = compressed;

  if (dataSaveTimeout) {
    logger.debug("Clearing existing data save timeout");
    clearTimeout(dataSaveTimeout);
  }
  dataSaveTimeout = setTimeout(() => {
    ServerPlayerExtensionSettingsSync(modIdentifier);
    logger.debug({
      message: "Data saved, sending update to server",
      data: compressed,
    });
    sendUpdateMyData();
  }, 1000);
};

const devMode = false; // Manually toggle during local development if needed to clear settings
export const loadOrGenerateData = () => {
  if (devMode) {
    Player.ExtensionSettings[modIdentifier] = "N4XyA==="; // Empty object compressed
    ServerPlayerExtensionSettingsSync(modIdentifier);
    logger.warn("Dev mode enabled, cleared data");
  }

  let Settings, Stats;
  const dataString = LZString.decompressFromBase64(
    Player.ExtensionSettings[modIdentifier]
  );
  if (!dataString) {
    logger.info(`Generating new settings`);
    Settings = {};
    Stats = {};
  } else {
    logger.info(`Loaded settings from server`);
    Settings = JSON.parse(dataString).Settings as ModSettings;
    Stats = JSON.parse(dataString).Stats as ModStats;
  }

  const modStorageObject = merge(
    {
      Settings: defaultSettings, // Start with default settings, so if new settings are added they are added to all players
      Stats: defaultStats,
      ModVersion: modVersion,
    },
    { Settings, Stats } // Merge in the user's existing data
  );

  logger.debug({ message: "Merged settings object", modStorageObject });

  Player[modIdentifier] = modStorageObject;
};
