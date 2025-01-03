interface Window {
  modLoadFlag?: boolean;
}

declare const modVersion: string;
declare const modName: string;
declare const modRepo: string;
declare const modIdentifier: string;
declare const publicURL: string;

interface ModSettings {
  ModVersion: string;
}

interface Character {
  [modIdentifier: string]:
    | {
        Settings: ModSettings;
      }
    | undefined;
}
