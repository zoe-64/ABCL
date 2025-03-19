import bcModSdk from "bondage-club-mod-sdk";
import { PluginServerChatRoomMessage, ListenerTypeMap, HookListener } from "../types/types";
import { logger } from "./logger";
import { isDiaper, updateDiaperColor } from "./player/diaper";
import { isABCLPlayer } from "./player/playerUtils";
import { bcModSDK, waitFor } from "./utils";
import { overlay } from "./player/ui";
import { ModIdentifier, ModVersion } from "../types/definitions";
import { actions } from "./actionLoader";
export const sendDataToAction = (type: string, data?: any, target?: number) => {
  const ChatRoomMessage: PluginServerChatRoomMessage = {
    Type: "Hidden",
    Content: `${ModIdentifier}Msg`,
    Sender: Player.MemberNumber,
    Target: target,
    Dictionary: [
      {
        type: type,
        data: data,
      },
    ],
  };
  ServerSend("ChatRoomChat", ChatRoomMessage as ServerChatRoomMessage);
  console.log("sendDataToAction", type, data, target);
};

/**
 * Sends an update of the player's settings to the specified target or to everyone in the chat room.
 *
 * @param {number} [target] - The MemberNumber of the target player. If not specified, the update is sent to all players.
 */
export const sendUpdateMyData = (target?: number) => {
  console.log("sendUpdateMyData target", target);
  sendDataToAction(
    "sync",
    {
      settings: Player[ModIdentifier].Settings,
      stats: Player[ModIdentifier].Stats,
      version: ModVersion,
    },
    target,
  );
  logger.debug({
    message: `Sending updated data to ${target ?? "everyone"}`,
  });
};

/**
 * Sends a request packet to other players in the chat room to retrieve their data.
 */
export const sendRequestOtherDataPacket = () => {
  sendDataToAction("init", 1);

  logger.debug(`Requesting data from others.`);
};

/**
 * Processes incoming packets and delegates them to the appropriate handler based on their type.
 *
 * @param {PluginServerChatRoomMessage} receivedMessage - The message data received from the server.
 */

const receivePacket = (receivedMessage: PluginServerChatRoomMessage) => {
  if (receivedMessage?.Content !== `${modIdentifier}Msg`) return;
  if (!receivedMessage.Sender || !receivedMessage.Dictionary) return;
  if (receivedMessage.Sender === Player.MemberNumber) return;
  if (receivedMessage.Type !== "Hidden") return;
  if (!receivedMessage.Dictionary[0]?.type) return;

  const type = receivedMessage.Dictionary[0]?.type as keyof ListenerTypeMap;
  const data = receivedMessage.Dictionary[0]?.data as ListenerTypeMap[typeof type];
  for (const action of actions) {
    const listener = action.listeners?.[type];

    if (listener) {
      (listener as HookListener<ListenerTypeMap[typeof type]>)(receivedMessage, data);
    }
  }
  console.log("receivePacket", type, data, receivedMessage.Sender);
};

/**
 *
 * Initializes hooks for intercepting chat room messages and synchronizing player data.
 * This function waits until the server is connected before setting up hooks.
 */

const initHooks = async () => {
  await waitFor(() => ServerSocket && ServerIsConnected);
  bcModSDK.hookFunction("DrawCharacter", 1, (args, next) => {
    const [C, CharX, CharY, Zoom] = args;

    if (isABCLPlayer(C) && C.ABCL!.Stats.PuddleSize.value > 0) {
      const puddleSizeFactor = C.ABCL!.Stats.PuddleSize.value / 300;

      const width = 512 * puddleSizeFactor;
      const height = 235 * puddleSizeFactor;

      // Calculate the centered position
      const x = CharX + (250 * Zoom - width / 2);
      const y = CharY + (940 * Zoom - height / 2);

      DrawImageResize(`${publicURL}/puddle.png`, x, y, width, height);
    }

    return next(args);
  });
  bcModSDK.hookFunction("ChatRoomSync", 1, (args, next) => {
    sendUpdateMyData(); // Tell everyone else to update their copy of our data, when we join a room.
    return next(args);
  });

  bcModSDK.hookFunction("ChatRoomMessage", 1, (args, next) => {
    if (args[0].Content === "ServerEnter" && args[0].Sender === Player.MemberNumber) {
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
    if (_slot === "ItemPelvis" && _asset) {
      if (isDiaper({ Asset: _asset })) updateDiaperColor();
    }
    return _result;
  });

  bcModSDK.hookFunction("PreferenceSubscreenChatClick", 1, (args, next) => {
    if (MouseIn(1815, 75, 90, 90)) {
      const theme = Player.ChatSettings?.ColorTheme ?? "Light";
      if (theme.startsWith("Light") && !!overlay && !overlay.classList.contains("sl-theme-light")) {
        overlay.classList.remove("sl-theme-dark");
        overlay.classList.add("sl-theme-light");
        overlay.style.color = "black";
        logger.info(`SL theme switching: Light`);
      }
      if (theme.startsWith("Dark") && !!overlay && !overlay.classList.contains("sl-theme-dark")) {
        overlay.classList.remove("sl-theme-light");
        overlay.classList.add("sl-theme-dark");
        overlay.style.color = "white";
        logger.info(`SL theme switching: Dark`);
      }
    }
    return next(args);
  });
};

export default initHooks;

const reportWebhookURL = `https://discord.com/api/webhooks/1340000414506029162/aqt7qruFnzDMM5BN_kLtv9gCcallIF-JeRVYl9k23uSIlxrHRvcFMy5mtPUPGDpWZhHX`;
const lastDetectedErrors: string[] = [];

window.addEventListener("error", async e => {
  console.error(e.filename);
  if (!e.filename.toLowerCase().includes("abcl")) return;
  const detectedError = `${e.message} at ${e.filename} ${e.lineno}`;
  if (lastDetectedErrors.includes(detectedError)) return;
  lastDetectedErrors.push(detectedError);
  const body = {
    username: `${Player.Name} ${Player.Nickname === "" ? "" : `aka ${Player.Nickname}`} (${Player.MemberNumber})`,
    thread_name: `${ModIdentifier} ${ModVersion} Error ${e.message}`.slice(0, 100),
    content: `
    error: ${detectedError}
\`\`\`
${e.error.stack}
\`\`\`
mods: ${bcModSdk
      .getModsInfo()
      .map(m => m.name)
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
