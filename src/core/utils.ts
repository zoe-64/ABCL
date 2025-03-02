import bcModSdkRef from "bondage-club-mod-sdk";
import { ModName, ModRepo, ModVersion } from "../types/definitions";
import { PermissionLevels } from "../types/types";
import { syncData } from "./settings";

export const bcModSDK = bcModSdkRef.registerMod({
  name: ModName,
  fullName: ModName,
  version: ModVersion,
  repository: ModRepo,
});

export function isObject(obj: unknown): obj is Record<string, any> {
  return !!obj && typeof obj === "object" && !Array.isArray(obj);
}

export async function waitFor(func: { (): any; (): boolean; (): any }, cancelFunc = () => false) {
  while (!func()) {
    if (cancelFunc()) return false;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  return true;
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

export const getMyMaxPermissionLevel = (target: Character) => {
  if (target.MemberNumber === Player.MemberNumber) return PermissionLevels.Self;
  if (target.IsOwnedByPlayer()) return PermissionLevels.Owner;
  if (target.IsLoverOfPlayer()) return PermissionLevels.Lovers;

  if (target.MemberNumber && Player.FriendList?.includes(target.MemberNumber)) return PermissionLevels.Friends;

  if (ServerChatRoomGetAllowItem(Player, target)) return PermissionLevels.ItemPermission;

  return PermissionLevels.Anyone;
};

// might be useful
export class Saver {
  private lastSaveTime: number = 0;
  private allowedSaveInterval: number;
  constructor(allowedSaveInterval: number) {
    this.allowedSaveInterval = allowedSaveInterval;
  }
  save() {
    if (Date.now() - this.lastSaveTime > this.allowedSaveInterval) {
      syncData();
      this.lastSaveTime = Date.now();
    }
  }
}

export const waitForElement = async (selector: string, options: { childCheck?: boolean } = {}): Promise<Element> => {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const target = document.querySelector(selector);
      if (target && (!options.childCheck || target.childElementCount > 0)) {
        observer.disconnect();
        resolve(target);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
};
export const generateUniqueID = (identifier?: string) => {
  identifier = identifier || modIdentifier;
  return `${identifier}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
// similar to saver but limits how often a function can be called
export class Debouncer {
  private lastCallTime: number = 0;
  private allowedCallInterval: number;
  constructor(allowedCallInterval: number) {
    this.allowedCallInterval = allowedCallInterval;
  }
  check(): boolean {
    if (Date.now() - this.lastCallTime > this.allowedCallInterval) {
      this.lastCallTime = Date.now();
      return true;
    }
    return false;
  }
  reset() {
    this.lastCallTime = 0;
  }
  isReady() {
    return Date.now() - this.lastCallTime > this.allowedCallInterval;
  }
}
