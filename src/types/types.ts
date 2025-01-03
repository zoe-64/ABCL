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
