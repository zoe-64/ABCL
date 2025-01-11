export type ChatMessageSyncDictionaryEntry = {
  message: {
    type: "sync";
    settings: ModSettings;
    target?: number;
  };
};

export type ChatMessageInitDictionaryEntry = {
  message: {
    type: "init";
  };
};

export interface PluginServerChatRoomMessage extends ServerChatRoomMessageBase {
  /** The character to target the message at. null means it's broadcast to the room. */
  Target?: number;
  Content: ServerChatRoomMessageContentType;
  Type: ServerChatRoomMessageType;
  Dictionary?:
    | ChatMessageSyncDictionaryEntry[]
    | ChatMessageInitDictionaryEntry[];
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
};
