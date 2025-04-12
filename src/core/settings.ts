import { merge, debounce } from "lodash-es";
import { DiaperSettingValues, MetabolismSettings, PartialDeep } from "../types/types";
import { sendUpdateMyData as sendUpdateMyData } from "./hooks";
import { logger } from "./logger";

export const defaultSettings: ModSettings = {
  PauseStats: false,
  PeeMetabolism: MetabolismSettings.Normal,
  PoopMetabolism: MetabolismSettings.Normal,
  MentalRegressionModifier: MetabolismSettings.Normal,
  OpenRemoteSettings: false,
  LockedOutOfSettings: false,
  DisableWettingLeaks: false,
  DisableSoilingLeaks: true,
  OnDiaperChange: DiaperSettingValues.Ask,
  VisibleMessages: {
    changeDiaper: true,
    checkDiaper: true,
    lickPuddle: true,
    wetDiaper: true,
    wetClothing: true,
    soilDiaper: true,
    soilClothing: true,
    usePotty: true,
    useToilet: true,
    wipePuddle: true,
    statusMessages: false,
    playerActivity: true,
    pauseStats: false,
  },
  StatusMessages: {
    Bladder: true,
    Bowel: true,
    Soiliness: true,
    Wetness: true,
    MentalRegression: true,
    Incontinence: true,
    PuddleSize: true,
  },
  DisableClothingStains: false,
  DisableDiaperStains: false,
  AccidentsByActivities: true,
};

export const defaultStats: ModStats = {
  PuddleSize: {
    value: 0,
  },
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
    value: 300 / 20,
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
export const loadOrGenerateData = async () => {
  const dataString = LZString.decompressFromBase64(Player.ExtensionSettings[modIdentifier]);
  const data = dataString
    ? JSON.parse(dataString)
    : {
        Settings: {},
        Stats: {},
      };

  // migrations
  if (data.ModVersion === "2.0.0") {
    const metabolismValue = data.Settings.Metabolism;
    const disableWetting = data.Settings.DisableWetting;
    data.Settings = {
      ...Object.fromEntries(
        Object.entries(data.Settings as Record<string, { value: any }>)
          .filter(([key]) => !["DisableWetting", "DisableSoiling", "Metabolism", "CaregiverIDs"].includes(key))
          .map(([key, { value }]) => [key, value]),
      ),
      PeeMetabolism: disableWetting ? "Disabled" : metabolismValue,
      PoopMetabolism: disableWetting ? "Disabled" : metabolismValue,
    };
    data.ModVersion = undefined;
    data.Version = "2.0.1";
  }

  const modStorageObject = merge(
    {
      Settings: defaultSettings,
      Stats: defaultStats,
      Version: modVersion,
    },
    data,
  );
  logger.debug({ message: "Merged settings object", modStorageObject });
  Player[modIdentifier] = modStorageObject;
};

export const clearData = () => {
  Player.ExtensionSettings[modIdentifier] = "N4XyA==="; // Empty object compressed
  ServerPlayerExtensionSettingsSync(modIdentifier);
  logger.warn("cleared data");
};
