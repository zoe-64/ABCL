import bcModSdk from "bondage-club-mod-sdk";
import {
  SyncEntry,
  PluginServerChatRoomMessage,
  MessageEntry,
  ChangeDiaperRequestEntry,
} from "../types/types";
import { logger } from "./logger";
import { pendingRequests } from "./pendingRequest";
import { changeDiaper, updateDiaperColor } from "./player/diaper";
import { getCharacter, getCharacterName } from "./player/playerUtils";
import { ABCLYesNoPrompt } from "./player/ui";
import {
  bcModSDK,
  getMyMaxPermissionLevel,
  sendChatLocal,
  waitFor,
} from "./utils";

const filterRestrictedSettings = (settings: ModSettings, target: Character) => {
  const myHighestPermission = getMyMaxPermissionLevel(target);

  return Object.entries(settings).reduce((acc, [key, value]) => {
    if (value.permission.canView <= myHighestPermission) {
      acc[key as keyof ModSettings] = value;
    }
    return acc;
  }, {} as ModSettings);
};

export const sendServerChatRoomMessage = (
  message: MessageEntry
): PluginServerChatRoomMessage => {
  const ChatRoomMessage: PluginServerChatRoomMessage = {
    Type: "Hidden",
    Content: `${modIdentifier}Msg`,
    Sender: Player.MemberNumber,
    Dictionary: [
      {
        message: message,
      },
    ],
  };

  ServerSend("ChatRoomChat", ChatRoomMessage as ServerChatRoomMessage);
  return ChatRoomMessage;
};
/**
 * Sends an update of the player's settings to the specified target or to everyone in the chat room.
 *
 * @param {number} [target] - The MemberNumber of the target player. If not specified, the update is sent to all players.
 */
export const sendUpdateMyData = (target?: number) => {
  const syncDataMessage: PluginServerChatRoomMessage =
    sendServerChatRoomMessage({
      type: "sync",
      settings: Player[modIdentifier].Settings,
      stats: Player[modIdentifier].Stats,
      target,
    });

  logger.debug({
    message: `Sending updated data to ${target ?? "everyone"}`,
    data: syncDataMessage,
  });
};

/**
 * Sends a request packet to other players in the chat room to retrieve their data.
 */
export const sendRequestOtherDataPacket = () => {
  sendServerChatRoomMessage({
    type: "init",
  });

  logger.debug(`Requesting data from others.`);
};

/**
 * Handles the "sync" packet received from other players, updating the local player's data with the received data.
 *
 * @param {PluginServerChatRoomMessage} data - The message data received from the server.
 */
const handleSyncPacket = (data: PluginServerChatRoomMessage) => {
  if (!data.Sender) return;
  const message = data.Dictionary?.[0]?.message as SyncEntry | undefined;
  if (!message) return;
  logger.debug({
    message: `Received updated data`,
    data,
  });

  const otherCharacter = getCharacter(data.Sender);
  if (!otherCharacter) return;

  otherCharacter[modIdentifier] = {
    Settings: filterRestrictedSettings(message.settings, otherCharacter),
    Stats: message.stats,
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
  if (!data.Sender || !data.Dictionary) return;
  if (data.Sender === Player.MemberNumber) return;
  if (data.Type !== "Hidden") return;
  if (!data.Dictionary[0]?.message) return;

  const message = data.Dictionary[0].message;
  if ("type" in message) {
    const type = message.type;
    switch (type) {
      case "init":
        handleInitPacket(data);
        break;
      case "sync":
        handleSyncPacket(data);
        break;
      case "changeDiaper":
        console.log(pendingRequests.get(message.id));
        let request = pendingRequests.get(message.id);
        if (
          !request &&
          (message.state === "accepted" || message.state === "rejected")
        )
          return;

        switch (message.state) {
          case "accepted":
            request!.state = "accepted";
            sendChatLocal(
              `${getCharacterName(
                data.Sender
              )} accepted your change diaper request.`
            );
            break;
          case "rejected":
            request!.state = "rejected";
            sendChatLocal(
              `${getCharacterName(
                data.Sender
              )} rejected your change diaper request.`
            );
            break;
          case "pending":
            new ABCLYesNoPrompt(
              `${getCharacterName(data.Sender)} wants to change your diaper.`,
              () => {
                sendChatLocal(
                  `${getCharacterName(data.Sender)} changed your diaper.`
                );
                changeDiaper();
                sendServerChatRoomMessage({
                  type: "changeDiaper",
                  state: "accepted",
                  id: message.id,
                } as ChangeDiaperRequestEntry);
              },
              () => {
                sendServerChatRoomMessage({
                  type: "changeDiaper",
                  state: "rejected",
                  id: message.id,
                } as ChangeDiaperRequestEntry);
              },
              10 * 1000
            );
            break;
          case "timedout":
            sendChatLocal(
              `${getCharacterName(
                data.Sender
              )}'s change diaper request timed out.`
            );
            break;
          case "cancelled":
            sendChatLocal(
              `${getCharacterName(
                data.Sender
              )} cancelled their change diaper request.`
            );
            break;
        }

        break;
    }
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
  bcModSDK.hookFunction("CharacterAppearanceSetItem", 1, (args, next) => {
    let [_character, _slot, _asset] = args;
    const _result = next(args);
    updateDiaperColor();
    return _result;
  });
};

export default initHooks;

const reportWebhookURL = `https://discord.com/api/webhooks/1340000414506029162/aqt7qruFnzDMM5BN_kLtv9gCcallIF-JeRVYl9k23uSIlxrHRvcFMy5mtPUPGDpWZhHX`;
const lastDetectedErrors: string[] = [];

window.addEventListener("error", async (e) => {
  if (e.filename !== `https://zoe-64.github.io/ABCL/beta/abcl.js`) return;
  const detectedError = `${e.message} at ${e.filename} ${e.lineno}`;
  if (lastDetectedErrors.includes(detectedError)) return;
  lastDetectedErrors.push(detectedError);

  const body = {
    username: `${Player.Name} ${
      Player.Nickname === "" ? "" : `aka ${Player.Nickname}`
    } (${Player.MemberNumber})`,
    thread_name: `${modIdentifier} ${modVersion} Error ${detectedError}`,
    content: `
\`\`\`
${e.error.stack}
\`\`\`
mods: ${bcModSdk
      .getModsInfo()
      .map((m) => m.name)
      .join(", ")}`,
  };
  await fetch(reportWebhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
});
