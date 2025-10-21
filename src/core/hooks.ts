import { PluginServerChatRoomMessage, ListenerTypeMap, HookListener } from "../types/types";
import { logger } from "./logger";
import { isDiaper, isLeaking, updateDiaperColor } from "./player/diaper";
import { isABCLPlayer } from "./player/playerUtils";
import { resizeElements } from "./player/ui";
import { ModIdentifier, ModVersion } from "../types/definitions";
import { actions } from "./actionLoader";
import { abclPlayer } from "./player/player";
import { ACCIDENTS_ON_ACTIVITIES, THEME } from "../constants";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { getElement, HookPriority, waitFor } from "./utils";
import bcModSdk from "bondage-club-mod-sdk";
import { settingsRemote } from "./actions/sync";
import { inModSubscreen } from "src/screens/Settings";
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
};

/**
 * Sends an update of the player's settings to the specified target or to everyone in the chat room.
 *
 * @param {number} [target] - The MemberNumber of the target player. If not specified, the update is sent to all players.
 */
export const sendUpdateMyData = (target?: number) => {
  if (typeof target === "undefined") {
    settingsRemote.emitAll("sync", {
      Settings: Player.ABCL.Settings,
      SettingPermissions: Player.ABCL.SettingPermissions,
      Stats: Player.ABCL.Stats,
      Version: ModVersion,
    });
  } else {
    settingsRemote.emit(target, "sync", {
      Settings: Player.ABCL.Settings,
      SettingPermissions: Player.ABCL.SettingPermissions,
      Stats: Player.ABCL.Stats,
      Version: ModVersion,
    });
  }

  logger.debug({
    message: `Sending updated data to ${target ?? "everyone"}`,
  });
};

/**
 * Sends a request packet to other players in the chat room to retrieve their data.
 */
export const sendRequestOtherDataPacket = () => {
  settingsRemote.emitAll("init");

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
};

/**
 *
 * Initializes hooks for intercepting chat room messages and synchronizing player data.
 * This function waits until the server is connected before setting up hooks.
 */

const initHooks = async () => {
  await waitFor(() => ServerSocket && ServerIsConnected);
  HookManager.hookFunction(
    "DrawRoomBackground",
    HookPriority.OBSERVE,
    ([URL, ...args]: Parameters<typeof DrawRoomBackground>, next: (args: Parameters<typeof DrawRoomBackground>) => ReturnType<typeof DrawRoomBackground>) => {
      if (URL.includes("Sheet.jpg") && inModSubscreen() && !(<any>window)?.ThemedLoaded) {
        next([URL, ...args]);
        MainCanvas.save();
        MainCanvas.globalCompositeOperation = "multiply";
        DrawRect(0, 0, 2000, 1000, THEME === "light" ? "#f1f1f1" : "#4d4d4d");
        MainCanvas.restore();
      } else {
        next([URL, ...args]);
      }
    },
  );

  HookManager.hookFunction("DrawCharacter", 1, (args, next) => {
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
  HookManager.hookFunction("ChatRoomSyncSingle", 1, (args, next) => {
    settingsRemote.emitAll("sync", {
      Settings: Player.ABCL.Settings,
      SettingPermissions: Player.ABCL.SettingPermissions,
      Stats: Player.ABCL.Stats,
      Version: ModVersion,
    });
    return next(args);
  });

  HookManager.hookFunction("ChatRoomSyncMemberJoin", 1, (args, next) => {
    settingsRemote.emitAll("sync", {
      Settings: Player.ABCL.Settings,
      SettingPermissions: Player.ABCL.SettingPermissions,
      Stats: Player.ABCL.Stats,
      Version: ModVersion,
    });
    // Tell everyone else to update their copy of our data, when we join a room.
    return next(args);
  });

  HookManager.hookFunction("ChatRoomMessage", 1, (args, next) => {
    if (args[0].Content === "ServerEnter" && args[0].Sender === Player.MemberNumber) {
      // Announce (via an init packet) that we're ready to receive data models.
      sendRequestOtherDataPacket();
      return;
    }

    receivePacket(args[0] as PluginServerChatRoomMessage);
    return next(args);
  });
  HookManager.hookFunction("CharacterAppearanceSetItem", 1, (args, next) => {
    let [_character, _slot, _asset] = args;
    const _result = next(args);
    if (_slot === "ItemPelvis" && _asset) {
      if (isDiaper({ Asset: _asset })) updateDiaperColor();
    }
    return _result;
  });
  HookManager.hookFunction("ActivityRun", 1, (args, next) => {
    const result = next(args);
    const [_actor, acted, _targetGroup, ItemActivity, ..._rest] = args;
    const activity = ItemActivity?.Activity;
    if (Player.ABCL.Settings.AccidentsByActivities && acted.MemberNumber === Player.MemberNumber && activity.Name in ACCIDENTS_ON_ACTIVITIES) {
      const chance = ACCIDENTS_ON_ACTIVITIES[activity.Name] as { wetting?: number; messing?: number };
      if (Player.ABCL.Settings.PeeMetabolism !== "Disabled" && chance.wetting && Math.random() < chance.wetting * (1 + 2 * abclPlayer.stats.Incontinence)) {
        abclPlayer.attemptWetting();
      }
      if (Player.ABCL.Settings.PoopMetabolism !== "Disabled" && chance.messing && Math.random() < chance.messing * (1 + 2 * abclPlayer.stats.Incontinence)) {
        abclPlayer.attemptSoiling();
      }
    }
    return result;
  });
  /* HookManager.hookFunction("PreferenceSubscreenChatClick", 1, (args, next) => {
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
 */
  HookManager.hookFunction("InformationSheetRun", HookPriority.TOP, (args, next) => {
    if (
      InformationSheetSelection?.ABCL &&
      !window?.bcx?.inBcxSubscreen?.() &&
      !window.MPA?.menuLoaded &&
      window.LITTLISH_CLUB &&
      !window.LITTLISH_CLUB.inModSubscreen() &&
      (window.LITTLISH_CLUB.isCaregiverOf(Player, InformationSheetSelection) || window.LITTLISH_CLUB.isMommyOf(Player, InformationSheetSelection)) &&
      window.LITTLISH_CLUB.hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_ABCL_SETTINGS")
    ) {
      DrawButton(1700 - 90 - 20, 700 - 15, 90, 90, "", "White", `${publicURL}/icon-small.png`, modName);
    }
    next(args);
  });

  HookManager.hookFunction("CharacterNickname", 1, (args, next) => {
    const [_C] = args;
    let nickname = next(args);
    if (isABCLPlayer(_C) && isLeaking("any", _C)) {
      nickname = "🍼 " + nickname;
    }
    if (_C.MemberNumber === 54811) {
      nickname = "❀ " + nickname;
    }
    if (_C.MemberNumber === 164988) {
      nickname = "ᐢ. ₓ .ᐢ " + nickname;
    }

    return nickname;
  });

  HookManager.hookFunction("InformationSheetClick", HookPriority.OBSERVE, (args, next) => {
    if (
      InformationSheetSelection?.ABCL &&
      !window?.bcx?.inBcxSubscreen?.() &&
      !window.MPA?.menuLoaded &&
      !window?.LSCG_REMOTE_WINDOW_OPEN &&
      window.LITTLISH_CLUB &&
      !window.LITTLISH_CLUB.inModSubscreen() &&
      (window.LITTLISH_CLUB.isCaregiverOf(Player, InformationSheetSelection) || window.LITTLISH_CLUB.isMommyOf(Player, InformationSheetSelection)) &&
      window.LITTLISH_CLUB.hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_ABCL_SETTINGS") &&
      MouseIn(1700 - 90 - 10, 800 - 100, 90, 90)
    ) {
      getElement(document.body, "#ABCL-settings-page").classList.remove(`ABCL-hidden`);
      resizeElements();
      (async () => {
        await CommonSetScreen("Character", "Preference");
        PreferenceSubscreen = PreferenceSubscreens.find(s => s.name === "Extensions") ?? null;
        PreferenceSubscreen?.load?.();
        const mod = PreferenceExtensionsDisplay.find(e => e.Button === "ABCL Settings");
        if (!mod) return;
        mod.click();
        getElement<HTMLButtonElement>(document.body, "#ABCL-shared-settings-button").click();
      })();
    }
    next(args);
  });

  HookManager.hookFunction("InformationSheetExit", HookPriority.OBSERVE, (args, next) => {
    next(args);
  });
};

export default initHooks;

const reportWebhookURL = `https://discord.com/api/webhooks/1397630713783648308/e_afTapfhvTLU7Qs-XmZrhRu9jatXdnnGX_r0tnSu5ke11Bqk1NI_yZMS7fHfU8t2hSq`;
const lastDetectedErrors: string[] = [];
const ignoredIssues = ["Refusing to load mod"];
window.addEventListener("error", async e => {
  console.error(e.filename);
  if (!e.filename.toLowerCase().includes("abcl") || ignoredIssues.some(k => e.message.toLowerCase().includes(k.toLowerCase()))) return;
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
