import { PendingRequest } from "../core/pendingRequest";

export type PartialDeep<T> = {
  [P in keyof T]?: PartialDeep<T[P]>;
};

// entries
export type NewSettingsEntry = {
  type: "newSettings";
  settings: Partial<ModSettings>;
  version: typeof modVersion;
};
export type SyncEntry = {
  type: "sync";
  settings: ModSettings;
  stats: ModStats;
  target?: number;
};
export type InitEntry = {
  type: "init";
};
export type RequestEntry = {
  type: "pendingRequest";
  state: typeof PendingRequest.prototype.state;
  identifier: typeof PendingRequest.prototype.type;
  id: typeof PendingRequest.prototype.id;
};
export type ChangeDiaperRequestEntry = Omit<RequestEntry, "type"> & {
  type: "changeDiaper";
};
export type MessageEntry = SyncEntry | InitEntry | RequestEntry | ChangeDiaperRequestEntry | NewSettingsEntry;

export interface PluginServerChatRoomMessage extends ServerChatRoomMessageBase {
  /** The character to target the message at. null means it's broadcast to the room. */
  Target?: number;
  Content: ServerChatRoomMessageContentType;
  Type: ServerChatRoomMessageType;
  Dictionary?: {
    message: MessageEntry;
  }[];
  Timeout?: number;
}
export type PreferenceActivity = {
  self: number;
  other: number;
  isSelfExclusive: boolean;
};

export type ModScreen = {
  id: string;
  module: string;
  functions: ScreenFunctions;
};

export enum PermissionLevels {
  Anyone = 0,
  ItemPermission = 1,
  Friends = 2,
  Lovers = 3,
  // TODO: Mistress = 4 Perhaps counts mistress as BCX Mistresses, BCC Caretakers, etc
  Owner = 5, // TODO: Consider BCX owners, BCC Mommies, etc
  Self = 6,
}

/** Overall structure for additional data */
export type AbclData = {
  DiaperSizeScale: {
    [key: string]: number;
  };
  Diapers: {
    [key: string]: {
      primaryColor?: number;
      secondaryColor?: number;
      size: number;
    };
  };
  DiaperColors: {
    [key: string]: string;
  };
  BabyItems: string[];
};
