import { sendUpdateMyData } from "../hooks";
import { logger } from "../logger";

import { ChatRoomEvents, ChatRoomRemoteEventEmitter } from "@sugarch/bc-event-handler";
import { updateData } from "../settings";
import { ModVersion } from "src/types/definitions";
import { PartialDeep } from "src/types/types";
import { sendChatLocal } from "../utils";

type EventMap = {
  updateSettings: [{ settings: PartialDeep<ModSettings>; settingPermissions: PartialDeep<ModStorageModel["SettingPermissions"]> }];
  init: [];
  sync: [{ Settings: ModSettings; Stats: ModStats; Version: string; SettingPermissions: ModStorageModel["SettingPermissions"] }];
};

export const settingsRemote = new ChatRoomRemoteEventEmitter<EventMap>(modIdentifier);
settingsRemote.on("updateSettings", (info, { settings, settingPermissions }) => {
  const character = ChatRoomCharacter.find(character => character.MemberNumber === info.sender);
  if (!character) return;
  if (window.LITTLISH_CLUB.isMommyOf(character, Player) || window.LITTLISH_CLUB.isCaregiverOf(character, Player)) {
    ToastManager.info(`${character.Nickname ?? character.Name} (${character.MemberNumber}) updated your settings.`);
    sendChatLocal(`${character.Nickname ?? character.Name} (${character.MemberNumber}) updated your settings.`);
    updateData({
      Settings: settings,
      SettingPermissions: settingPermissions,
    });
  }
  return;
});
settingsRemote.on("init", info => {
  logger.debug(`Received request for data`);
  sendUpdateMyData(info.sender);
});

ChatRoomEvents.on("PlayerJoin", player => {
  if (player.MemberNumber === Player.MemberNumber) return;
  settingsRemote.emitAll("sync", {
    Settings: Player.ABCL.Settings,
    SettingPermissions: Player.ABCL.SettingPermissions,
    Stats: Player.ABCL.Stats,
    Version: ModVersion,
  });
});
settingsRemote.on("sync", (info, { Settings, Stats, Version, SettingPermissions }) => {
  if (info.sender === Player.MemberNumber) return;

  const index = ChatRoomCharacter.findIndex(character => character.MemberNumber === info.sender);
  if (index === -1) return logger.warn(`Could not find character with member number ${info.sender}`);

  logger.debug(`Updating data for ${info.sender}`);
  ChatRoomCharacter[index].ABCL = {
    Stats,
    Version,
    SettingPermissions,
    Settings,
  };

  return;
});
