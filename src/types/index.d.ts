interface Window {
  modLoadFlag?: boolean;
  LITTLISH_CLUB: {
    inModSubscreen(): boolean;
    getCaregiversOf(C: Character): number[];
    getMommyOf(C: Character): {
      name: string;
      id: number;
    } | null;
    hasAccessRightTo(C1: Character, C2: Character, accessRight: AccessRight): boolean;
  };
}
// Littlish club
declare enum AccessRight {
  MANAGE_DIAPER = "MANAGE_DIAPER",
  MANAGE_RULES = "MANAGE_RULES",
  TURN_RULE_STRICT_MODE = "TURN_RULE_STRICT_MODE",
  DELETE_NOTES = "DELETE_NOTES",
  MANAGE_APPEARANCE = "MANAGE_APPEARANCE",
  MANAGE_CAREGIVERS_ACCESS_RIGHTS = "MANAGE_CAREGIVERS_ACCESS_RIGHTS",
  TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST = "TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST",
  CHANGE_CAREGIVERS_LIST = "CHANGE_CAREGIVERS_LIST",
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
