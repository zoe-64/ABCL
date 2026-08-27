import { debounce, merge } from "lodash-es";
import { ModVersion } from "src/types/definitions";
import { DiaperSettingValues, MetabolismSettings, PartialDeep } from "../types/types";
import { sendUpdateMyData } from "./hooks";
import { logger } from "./logger";
import { updatePlayerClothes } from "./player/player";
import { getElement, summarizeVersionRange } from "./utils";

export const defaultSettings: ModSettings = {
  MiniGameDifficulty: "Normal",
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
  ExpressionsByActivities: false,
  AccidentAutopilot: false,
  ShowOwnBadges: true,

  CanChangeSelf: true,
  CanUseBathroomWithDiaper: false,
  CanCheckDiaperWithRestraints: true,
  CanUseToilet: true,
  CanUsePotty: true,
  CanChangeDiapers: true,
  DisableParticles: false,
  UnPauseStatsWhenDiapered: true,
  MiniGameAudioMuted: false,
  UseNewMiniGame: true,
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
  MinigameStatistics: {
    Wet: {
      Total: 0,
      Success: 0,
    },
    Mess: {
      Total: 0,
      Success: 0,
    },
  },
};

export const defaultSettingPermissions: ModStorageModel["SettingPermissions"] = {
  MiniGameDifficulty: false,
  PeeMetabolism: false,
  PoopMetabolism: false,
  MentalRegressionModifier: false,
  OnDiaperChange: false,
  PauseStats: false,
  DisableWettingLeaks: false,
  DisableSoilingLeaks: false,
  DisableClothingStains: false,
  DisableDiaperStains: false,
  AccidentsByActivities: false,
  ExpressionsByActivities: false, // Experimental / buggy

  changeDiaper: false,
  checkDiaper: false,
  lickPuddle: false,
  wetDiaper: false,
  wetClothing: false,
  soilDiaper: false,
  soilClothing: false,
  usePotty: false,
  useToilet: false,
  wipePuddle: false,
  statusMessages: false,
  playerActivity: false,

  pauseStats: false,
  OpenRemoteSettings: false,
  LockedOutOfSettings: false,
  StatusMessages: false,
  AccidentAutopilot: false,
  ShowOwnBadges: false,
  CanChangeSelf: false,
  CanUseBathroomWithDiaper: false,
  CanCheckDiaperWithRestraints: false,
  CanUseToilet: false,
  CanUsePotty: false,
  CanChangeDiapers: false,
  DisableParticles: false,
  UnPauseStatsWhenDiapered: false,
  MiniGameAudioMuted: false,
  UseNewMiniGame: false,
};

const defaultData: ModStorageModel = {
  Settings: defaultSettings,
  Stats: defaultStats,
  SettingPermissions: defaultSettingPermissions,
};

export const updateData = (newData: PartialDeep<ModStorageModel>) => {
  Player.ABCL = merge(Player.ABCL || defaultData, newData);
  syncData();
};
export const syncData = debounce(() => {
  const compressed = LZString.compressToBase64(JSON.stringify(Player.ABCL));
  Player.ExtensionSettings.ABCL = compressed;
  ServerPlayerExtensionSettingsSync(modIdentifier);
  sendUpdateMyData();
  updatePlayerClothes();
}, 1000);

//const devMode = false; use clearData() // Manually toggle during local development if needed to clear settings
export const loadOrGenerateData = async () => {
  const dataString = LZString.decompressFromBase64(Player.ExtensionSettings.ABCL);
  const data = dataString
    ? JSON.parse(dataString)
    : {
        Settings: {},
        Stats: {},
        SettingPermissions: {},
        Version: ModVersion,
      };
  if (data.Version !== ModVersion) {
    summarizeVersionRange("https://github.com/zoe-64/ABCL/src/changelog", data.Version, ModVersion).then(result => {
      if (!result) return;
      setTimeout(() => {
        ServerAccountBeep({
          Message: `ABCL Updated! ${data.Version} -> ${ModVersion}\nSee settings for full changelog.\n\n${result}`,
          MemberNumber: 164988,
          MemberName: "Zoe - author of ABCL",
          ChatRoomSpace: "",
          ChatRoomName: "",
          Private: true,
          BeepType: "",
        });
      }, 15000);
    });
  }

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
  if (data.LastVersion == null) {
    ToastManager.custom("Do you want to see introduction for ABCL?", "info", {
      duration: 10 * 3 * 1000,
      onClick: (_, toast) => {},
      onClose: (toast, reason) => {
        if (reason === "click") toast.setAttribute("aria-checked", "true");
      },
      buttons: [
        {
          label: "Yes",
          onClick: async (_, toast) => {
            toast?._dismiss?.("click");
            getElement<HTMLButtonElement>(document.body, "#ABCL-intro-button").click();
          },
        },
        {
          label: "No",
          onClick: (_, toast) => {
            toast?._dismiss?.("click");
          },
        },
      ],
    });
  }
  data.LastVersion = data.Version;

  const modStorageObject = merge(
    {
      Settings: defaultSettings,
      Stats: defaultStats,
      SettingPermissions: defaultSettingPermissions,
    } satisfies ModStorageModel,
    data,
    {
      Version: modVersion,
      //  LastVersion: data.Version,
    },
  );
  logger.debug({ message: "Merged settings object", modStorageObject });
  Player.ABCL = modStorageObject;
};

export const clearData = () => {
  Player.ExtensionSettings.ABCL = "N4XyA==="; // Empty object compressed
  ServerPlayerExtensionSettingsSync(modIdentifier);
  logger.warn("cleared data");
};
