import { merge } from "lodash-es";
import { PermissionLevels } from "../types/types";
import { sendUpdateMySettings } from "./hooks";
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

export const mutateSettings = (newSettings: Partial<ModSettings>) => {
  Player[modIdentifier].Settings = merge(
    Player[modIdentifier].Settings,
    newSettings
  );

  saveSettings();
};

let settingsSaveTimeout: number | null = null;
/**
 * Saves the settings by compressing and storing them in the Player object and sending an update to the server.
 *
 * @remarks
 * This function compresses the settings using LZString and stores them in the Player object.
 * It also sets a timeout to synchronize the extension settings with the server and send an update if necessary.
 */
export const saveSettings = () => {
  const compressed = LZString.compressToBase64(
    JSON.stringify(Player[modIdentifier].Settings)
  );
  Player.ExtensionSettings[modIdentifier] = compressed;

  if (settingsSaveTimeout) {
    logger.debug("Clearing existing settings save timeout");
    clearTimeout(settingsSaveTimeout);
  }
  settingsSaveTimeout = setTimeout(() => {
    ServerPlayerExtensionSettingsSync(modIdentifier);
    logger.debug({
      message: "Settings saved, sending update to server",
      data: compressed,
    });
    sendUpdateMySettings();
  }, 1000);
};

const devMode = false; // Manually toggle during local development if needed to clear settings
export const loadOrGenerateSettings = () => {
  if (devMode) {
    Player.ExtensionSettings[modIdentifier] = "N4XyA==="; // Empty object compressed
    ServerPlayerExtensionSettingsSync(modIdentifier);
    logger.warn("Dev mode enabled, cleared settings");
  }

  let Settings;
  const dataString = LZString.decompressFromBase64(
    Player.ExtensionSettings[modIdentifier]
  );
  if (!dataString) {
    logger.info(`Generating new settings`);
    Settings = {};
  } else {
    logger.info(`Loaded settings from server`);
    Settings = JSON.parse(dataString) as ModSettings;
  }

  const modStorageObject = merge(
    {
      Settings: defaultSettings, // Start with default settings, so if new settings are added they are added to all players
      Stats: defaultStats,
      ModVersion: modVersion,
    },
    { Settings } // Merge in the user's existing settings
  );

  logger.debug({ message: "Merged settings object", modStorageObject });

  Player[modIdentifier] = modStorageObject;
};
