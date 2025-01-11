import bcModSdkRef from "bondage-club-mod-sdk";
import { ModName, ModRepo, ModVersion } from "../types/definitions";
import { PermissionLevels } from "../types/types";

export const bcModSDK = bcModSdkRef.registerMod({
  name: ModName,
  fullName: ModName,
  version: ModVersion,
  repository: ModRepo,
});

export function isObject(obj: unknown): obj is Record<string, any> {
  return !!obj && typeof obj === "object" && !Array.isArray(obj);
}

export async function waitFor(
  func: { (): any; (): boolean; (): any },
  cancelFunc = () => false
) {
  while (!func()) {
    if (cancelFunc()) return false;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  return true;
}

export function getCharacter(
  memberNumber: number
): PlayerCharacter | Character | null {
  const character = ChatRoomCharacter.find(
    (c) => c.MemberNumber === memberNumber
  );

  if (!character) {
    return null;
  }

  if (character?.IsPlayer()) {
    return character as PlayerCharacter;
  }

  return character as Character;
}

export const sendChatLocal = (message: string): void => {
  if (!ServerPlayerIsInChatRoom()) return;
  const msgElement = document.createElement("div");
  msgElement.innerHTML = message
    .split("\n")
    .map((line) => line.trim())
    .join("<br/>");
  msgElement.classList.add(`${modIdentifier}LocalMessage`);
  document.querySelector("#TextAreaChatLog")?.appendChild(msgElement);
  ElementScrollToEnd("TextAreaChatLog");
};

export const getMyMaxPermissionLevel = (
  target: PlayerCharacter | Character
) => {
  if (target.MemberNumber === Player.MemberNumber) return PermissionLevels.Self;
  if (target.IsOwnedByPlayer()) return PermissionLevels.Owner;
  if (target.IsLoverOfPlayer()) return PermissionLevels.Lovers;

  if (target.MemberNumber && Player.FriendList?.includes(target.MemberNumber))
    return PermissionLevels.Friends;

  if (ServerChatRoomGetAllowItem(Player, target))
    return PermissionLevels.ItemPermission;

  return PermissionLevels.Anyone;
};
