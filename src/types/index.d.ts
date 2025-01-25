interface Window {
  modLoadFlag?: boolean;
}

declare const modVersion: string;
declare const modName: string;
declare const modRepo: string;
declare const modIdentifier: string;
declare const publicURL: string;

interface ModSettings {
  [key: string]: {
    value: string | number;
    permission: {
      canView: number;
      canModify: number;
    };
  };
}
interface ModStats {
  [key: string]: {
    value: string | number;
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
