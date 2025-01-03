import { merge } from "lodash-es";
import { sendUpdateMySettings } from "./hooks";
import { logger } from "./logger";

const defaultSettings: Omit<ModSettings, "ModVersion"> = {};

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

  const settingsObject = merge(
    // Combines objects recursively in order, to
    {
      Settings: defaultSettings,
    },
    { Settings },
    {
      Settings: {
        ModVersion: modVersion, // Always override the mod version
      },
    }
  );

  logger.debug({ message: "Merged settings object", settingsObject });

  Player[modIdentifier] = settingsObject;
};
