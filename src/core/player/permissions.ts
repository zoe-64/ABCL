import { PermissionLevels } from "../../types/types";
import { getCharacter } from "./playerUtils";

// TODO: BCX owners, BCC Mommies, etc
export const getPermissionLevel = (targetIdentifier: number | Character, reverse: boolean = false): PermissionLevels => {
  const target = getCharacter(targetIdentifier);
  if (!target || !target.ABCL) return PermissionLevels.Self;

  if (Player.MemberNumber === target.MemberNumber) return PermissionLevels.Self;
  if (reverse) {
    if (Player.OwnerNumber() === target.MemberNumber || isCaregiverTo(target, true)) return PermissionLevels.Owner;
    if (target.IsLoverOfPlayer()) return PermissionLevels.Lovers;
    if (Player.FriendList?.includes(target.MemberNumber!)) return PermissionLevels.Friends;
    if (ServerChatRoomGetAllowItem(target, Player)) return PermissionLevels.ItemPermission;
    return PermissionLevels.Anyone;
  }
  if (target.IsLoverOfPlayer()) return PermissionLevels.Lovers;
  if (target.IsOwnedByPlayer() || isCaregiverTo(target)) return PermissionLevels.Owner;

  if (Player.FriendList?.includes(target.MemberNumber!)) return PermissionLevels.Friends;

  if (ServerChatRoomGetAllowItem(Player, target)) return PermissionLevels.ItemPermission;

  return PermissionLevels.Anyone;
};
export const isCaregiverTo = (identifier: number | Character, reverse = false): boolean => {
  const character = getCharacter(identifier);
  if (!character || !character.ABCL) return false;
  if (reverse) return Player.ABCL.Settings.CaregiverIDs.value.some((x) => x.memberNumber === character.MemberNumber);
  return character.ABCL.Settings.CaregiverIDs.value.some((x) => x.memberNumber === Player.MemberNumber);
};

export const hasPermissionToRemote = (identifier: number | Character, reverse = false): boolean => {
  const character = getCharacter(identifier);
  if (!character || !character.ABCL) return false;

  if (isCaregiverTo(character, reverse)) return true;
  const permissionLevel = getPermissionLevel(character, reverse);
  if (reverse) {
    return (
      Object.values(Player.ABCL.Settings).some((setting) => setting.permission.canModify <= permissionLevel) || Player.ABCL.Settings.OpenRemoteSettings.value
    );
  }
  return (
    Object.values(character.ABCL.Settings).some((setting) => setting.permission.canModify <= permissionLevel) ||
    character.ABCL.Settings.OpenRemoteSettings.value
  );
};

const hasPermissionToSeeSetting = (memberNumber: number | Character, setting: keyof ModSettings): boolean => {
  const character = getCharacter(memberNumber);
  if (!character || !character.ABCL) return false;
  if (isCaregiverTo(character)) return true;
  const permissionLevel = getPermissionLevel(character);
  return (
    character.ABCL.Settings[setting].permission.canView <= permissionLevel ||
    character.ABCL.Settings[setting].permission.canModify <= permissionLevel ||
    character.ABCL.Settings.OpenRemoteSettings.value
  );
};

export const hasPermissionToModifySetting = (memberNumber: number | Character, setting: keyof ModSettings, reverse = false): boolean => {
  const character = getCharacter(memberNumber);
  if (!character || !character.ABCL) return false;
  const permissionLevel = getPermissionLevel(memberNumber, reverse);
  if (reverse) return Player.ABCL.Settings[setting].permission.canModify <= permissionLevel || Player.ABCL.Settings.OpenRemoteSettings.value;
  return character.ABCL.Settings[setting].permission.canModify <= permissionLevel || character.ABCL.Settings.OpenRemoteSettings.value;
};
