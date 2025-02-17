import { merge } from "lodash-es";
import { PartialDeep, PermissionLevels } from "../types/types";
import { sendUpdateMyData as sendUpdateMyData } from "./hooks";
import { logger } from "./logger";

export const defaultSettings: ModSettings = {
  Metabolism: {
    value: "Normal",
    permission: {
      canView: PermissionLevels.Anyone,
      canModify: PermissionLevels.Owner,
    },
  },
  DisableWetting: {
    value: false,
    permission: {
      canView: PermissionLevels.Owner, // maybe it could be used to signal to other players that this player does not like wetting
      canModify: PermissionLevels.Self,
    },
  },
  DisableSoiling: {
    value: false,
    permission: {
      canView: PermissionLevels.Owner,
      canModify: PermissionLevels.Self,
    },
  },
  CaregiverIDs: {
    value: [],
    permission: {
      canView: PermissionLevels.Anyone, // if this is not set to anyone then it would mean only those that fit the permission level could be caregivers, however it could be a good thing
      canModify: PermissionLevels.Self,
    },
  },
  OpenRemoteSettings: {
    value: false,
    permission: {
      canView: PermissionLevels.Anyone, // this should probably always be visible
      canModify: PermissionLevels.Self,
    },
  },
  LockedOutOfSettings: {
    value: false,
    permission: {
      canView: PermissionLevels.Owner,
      canModify: PermissionLevels.Self, // if value becomes true then the player wouldn't be able to turn it off, we should warn for this
    },
  },
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

export const mutateData = (newData: PartialDeep<ModStorageModel>) => {
  Player[modIdentifier] = merge(Player[modIdentifier] || defaultData, newData);
  saveData();
};

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

export const clearData = () => {
  Player.ExtensionSettings[modIdentifier] = "N4XyA==="; // Empty object compressed
  ServerPlayerExtensionSettingsSync(modIdentifier);
  logger.warn("cleared data");
};
