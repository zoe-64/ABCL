interface Window {
  modLoadFlag?: boolean;
}

declare const modVersion: string;
declare const modName: string;
declare const modRepo: string;
declare const modIdentifier: string;
declare const publicURL: string;

type MetabolismSettingValues =
  | "Normal"
  | "Slow"
  | "Fast"
  | "Faster"
  | "Fastest";
interface ModSettings {
  Metabolism: {
    value: MetabolismSettingValues;
    permission: ModSettingPermission;
  };
  DisableWetting: {
    value: boolean;
    permission: ModSettingPermission;
  };
  DisableSoiling: {
    value: boolean;
    permission: ModSettingPermission;
  };
  CaregiverIDs: {
    value: number[];
    permission: ModSettingPermission;
  };
  OpenRemoteSettings: {
    value: boolean;
    permission: ModSettingPermission;
  };
  LockedOutOfSettings: {
    value: boolean;
    permission: ModSettingPermission;
  };
}
type ModSettingPermission = {
  canView: number;
  canModify: number;
};
interface ModStats {
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
  ModVersion?: string;
  Settings: ModSettings;
  Stats: ModStats;
}

interface PlayerCharacter {
  [modIdentifier: string]: ModStorageModel;
}

interface Character {
  [modIdentifier: string]: ModStorageModel | undefined;
}
