import {
  ChatMessageSyncDictionaryEntry,
  PluginServerChatRoomMessage,
} from "../types/types";
import { logger } from "./logger";
import {
  bcModSDK,
  getCharacter,
  getMyMaxPermissionLevel,
  waitFor,
} from "./utils";

const filterRestrictedSettings = (
  settings: ModSettings,
  target: PlayerCharacter | Character
) => {
  const myHighestPermission = getMyMaxPermissionLevel(target);

  return Object.entries(settings).reduce((acc, [key, value]) => {
    if (value.permission.canView <= myHighestPermission) {
      acc[key] = value;
    }
    return acc;
  }, {} as ModSettings);
};

/**
 * Sends an update of the player's settings to the specified target or to everyone in the chat room.
 *
 * @param {number} [target] - The MemberNumber of the target player. If not specified, the update is sent to all players.
 */
export const sendUpdateMySettings = (target?: number) => {
  const syncSettingsMessage: any = {
    Type: "Hidden",
    Content: `${modIdentifier}Msg`,
    Sender: Player.MemberNumber,
    Dictionary: [
      {
        message: {
          type: "sync",
          settings: Player[modIdentifier].Settings,
          target,
        },
      },
    ],
  };

  logger.debug({
    message: `Sending updated settings to ${target ?? "everyone"}`,
    data: syncSettingsMessage,
  });
  ServerSend("ChatRoomChat", syncSettingsMessage);
};

/**
 * Sends a request packet to other players in the chat room to retrieve their settings.
 */
export const sendRequestOtherSettingsPacket = () => {
  const syncSettingsMessage: any = {
    Type: "Hidden",
    Content: `${modIdentifier}Msg`,
    Sender: Player.MemberNumber,
    Dictionary: [
      {
        message: {
          type: "init",
        },
      },
    ],
  };

  logger.debug(`Requesting settings from others.`);
  ServerSend("ChatRoomChat", syncSettingsMessage);
};

/**
 * Handles the "sync" packet received from other players, updating the local player's settings with the received data.
 *
 * @param {PluginServerChatRoomMessage} data - The message data received from the server.
 */
const handleSyncPacket = (data: PluginServerChatRoomMessage) => {
  if (!data.Sender) return;
  const dict = data.Dictionary?.[0] as
    | ChatMessageSyncDictionaryEntry
    | undefined;
  if (!dict?.message) return;
  logger.debug({
    message: `Received updated settings`,
    data,
  });

  const otherCharacter = getCharacter(data.Sender);
  if (!otherCharacter) return;

  otherCharacter[modIdentifier] = {
    Settings: filterRestrictedSettings(dict.message.settings, otherCharacter),
  };
};

/**
 * Handles the "init" packet received from other players, sending the player's settings to the requester.
 *
 * @param {PluginServerChatRoomMessage} data - The message data received from the server.
 */
const handleInitPacket = (data: PluginServerChatRoomMessage) => {
  if (!data.Sender) return;
  logger.debug(`Received request for settings`);

  sendUpdateMySettings(data.Sender);
};

/**
 * Processes incoming packets and delegates them to the appropriate handler based on their type.
 *
 * @param {PluginServerChatRoomMessage} data - The message data received from the server.
 */
const receivePacket = (data: PluginServerChatRoomMessage) => {
  if (data?.Content !== `${modIdentifier}Msg`) return;
  if (!data.Sender) return;
  if (data.Sender === Player.MemberNumber) return;
  if (data.Type !== "Hidden") return;
  if (!data.Dictionary?.[0]?.message) return;

  switch (data.Dictionary[0].message.type) {
    case "init":
      handleInitPacket(data);
      break;
    case "sync":
      handleSyncPacket(data);
      break;
  }
};

/**
 * Initializes hooks for intercepting chat room messages and synchronizing player settings.
 * This function waits until the server is connected before setting up hooks.
 */
const initHooks = async () => {
  await waitFor(() => ServerSocket && ServerIsConnected);

  bcModSDK.hookFunction("ChatRoomSync", 1, (args, next) => {
    sendUpdateMySettings(); // Tell everyone else to update their copy of our settings, when we join a room.
    return next(args);
  });

  bcModSDK.hookFunction("ChatRoomMessage", 1, (args, next) => {
    if (
      args[0].Content === "ServerEnter" &&
      args[0].Sender === Player.MemberNumber
    ) {
      // Announce (via an init packet) that we're ready to receive data models.
      sendRequestOtherSettingsPacket();
      return;
    }

    receivePacket(args[0] as PluginServerChatRoomMessage);
    return next(args);
  });
};

export default initHooks;
