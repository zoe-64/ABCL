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
export const sendUpdateMyData = (target?: number) => {
  const syncDataMessage: any = {
    Type: "Hidden",
    Content: `${modIdentifier}Msg`,
    Sender: Player.MemberNumber,
    Dictionary: [
      {
        message: {
          type: "sync",
          settings: Player[modIdentifier].Settings,
          stats: Player[modIdentifier].Stats,
          target,
        },
      },
    ],
  };

  logger.debug({
    message: `Sending updated data to ${target ?? "everyone"}`,
    data: syncDataMessage,
  });
  ServerSend("ChatRoomChat", syncDataMessage);
};

/**
 * Sends a request packet to other players in the chat room to retrieve their data.
 */
export const sendRequestOtherDataPacket = () => {
  const syncDataMessage: any = {
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

  logger.debug(`Requesting data from others.`);
  ServerSend("ChatRoomChat", syncDataMessage);
};

/**
 * Handles the "sync" packet received from other players, updating the local player's data with the received data.
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
    message: `Received updated data`,
    data,
  });

  const otherCharacter = getCharacter(data.Sender);
  if (!otherCharacter) return;

  otherCharacter[modIdentifier] = {
    Settings: filterRestrictedSettings(dict.message.settings, otherCharacter),
    Stats: dict.message.stats,
  };
};

/**
 * Handles the "init" packet received from other players, sending the player's data to the requester.
 *
 * @param {PluginServerChatRoomMessage} data - The message data received from the server.
 */
const handleInitPacket = (data: PluginServerChatRoomMessage) => {
  if (!data.Sender) return;
  logger.debug(`Received request for data`);

  sendUpdateMyData(data.Sender);
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
 * Initializes hooks for intercepting chat room messages and synchronizing player data.
 * This function waits until the server is connected before setting up hooks.
 */
const initHooks = async () => {
  await waitFor(() => ServerSocket && ServerIsConnected);

  bcModSDK.hookFunction("ChatRoomSync", 1, (args, next) => {
    sendUpdateMyData(); // Tell everyone else to update their copy of our data, when we join a room.
    return next(args);
  });

  bcModSDK.hookFunction("ChatRoomMessage", 1, (args, next) => {
    if (
      args[0].Content === "ServerEnter" &&
      args[0].Sender === Player.MemberNumber
    ) {
      // Announce (via an init packet) that we're ready to receive data models.
      sendRequestOtherDataPacket();
      return;
    }

    receivePacket(args[0] as PluginServerChatRoomMessage);
    return next(args);
  });
};

export default initHooks;
