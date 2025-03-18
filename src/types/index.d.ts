interface Window {
  modLoadFlag?: boolean;
  LITTLISH_CLUB: LITTLISH_CLUB_API;
}

declare const modVersion: string;
declare const modName: string;
declare const modRepo: string;
declare const modIdentifier: string;
declare const publicURL: string;

type MetabolismSetting = "Disabled" | "Normal" | "Slow" | "Fast" | "Faster" | "Fastest";

type DiaperChangePromptSetting = "Deny" | "Ask" | "Allow";

interface ModSettings {
  PeeMetabolism: MetabolismSetting;
  PoopMetabolism: MetabolismSetting;
  OnDiaperChange: DiaperChangePromptSetting;
  OpenRemoteSettings: boolean;
  LockedOutOfSettings: boolean;
  DisableWettingLeaks: boolean;
  DisableSoilingLeaks: boolean;
  visibleMessages: {
    changeDiaper: boolean;
    checkDiaper: boolean;
    lickPuddle: boolean;
    wetDiaper: boolean;
    wetClothing: boolean;
    soilDiaper: boolean;
    soilClothing: boolean;
    usePotty: boolean;
    useToilet: boolean;
    wipePuddle: boolean;
  };
}
interface ModStats {
  PuddleSize: {
    value: number;
  };
  Bladder: {
    value: number;
    size: number;
  };
  Bowel: {
    value: number;
    size: number;
  };
  Soiliness: {
    value: number;
  };
  Wetness: {
    value: number;
  };
  WaterIntake: {
    value: number;
  };
  FoodIntake: {
    value: number;
  };
  MentalRegression: {
    value: number;
  };
  Incontinence: {
    value: number;
  };
}

interface ModStorageModel {
  Version?: string;
  Settings: ModSettings;
  Stats: ModStats;
}

interface PlayerCharacter {
  [modIdentifier: string]: ModStorageModel;
}

interface Character {
  [modIdentifier: string]: ModStorageModel | undefined;
}
