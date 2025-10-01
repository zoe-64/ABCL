import { PermissionLevels } from "../types/types";
import { syncData } from "./settings";
import { logger } from "./logger";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import bcModSdk from "bondage-club-mod-sdk";

export const registeredMod = bcModSdk.registerMod({
  name: modName,
  fullName: modName,
  version: modVersion,
  repository: modRepo,
});

HookManager.initWithMod(registeredMod);

export enum HookPriority {
  OBSERVE = 0,
  ADD_BEHAVIOR = 1,
  MODIFY_BEHAVIOR = 5,
  OVERRIDE_BEHAVIOR = 10,
  TOP = 100,
}
export function isObject(obj: unknown): obj is Record<string, any> {
  return !!obj && typeof obj === "object" && !Array.isArray(obj);
}

export async function waitFor(func: { (): any; (): boolean; (): any }, cancelFunc = () => false) {
  while (!func()) {
    if (cancelFunc()) return false;
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  return true;
}

export const sendChatLocal = (message: string, classes: string[] = [], style?: string, local: boolean = true): void => {
  if (!ServerPlayerIsInChatRoom()) return;
  const msgElement = document.createElement("div");
  msgElement.innerHTML =
    ((local && "(local) ") || "") +
    message
      .split("\n")
      .map(line => line.trim())
      .join("<br/>");
  msgElement.classList.add(`${modIdentifier}LocalMessage`, "ChatMessage", ...classes);
  if (style) {
    msgElement.style.cssText = style;
  }
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

export const waitForElement = async (selector: string, options: { childCheck?: boolean; timeout?: number } = {}): Promise<Element> => {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const target = document.querySelector(selector);
      if (target && (!options.childCheck || target.childElementCount > 0)) {
        observer.disconnect();
        clearTimeout(timeoutId);
        resolve(target);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const timeoutId = setTimeout(() => {
      observer.disconnect();
      console.warn(`Element with selector "${selector}" not found within timeout`);
    }, options.timeout || 10000);
  });
};
export const generateUniqueID = (identifier?: string) => {
  identifier = identifier || modIdentifier;
  return `${identifier}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
// similar to saver but limits how often a function can be called
export class Throttler {
  private lastCallTime: number = 0;
  allowedCallInterval: number;
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

// input can be "default", null, hex code, an array of hexes, an array of default
// expect to be given the asset, in asset there's a default color
// return a hex color
export const isColorable = (color: string) => color !== "Default" && typeof color === "string";

export const getColor = (color: ItemColor | null | "Default" | string[] | ItemColor, asset: Asset): string[] => {
  if (typeof color === "string" && color !== "Default") logger.warn(`Unknown color: ${color}`);
  if (!color || color === "Default") return [...asset.DefaultColor.map(color => (color === "Default" ? "#FFFFFF" : color))];

  if (Array.isArray(color)) {
    return color.map(mappedColor => {
      if (mappedColor === "Default") {
        return "#FFFFFF";
      }
      return mappedColor;
    });
  }

  return [color];
};
export const getElement = <T extends Element>(parent: Element, selector: string): T => {
  const element = parent.querySelector<T>(selector);
  if (element) return element;
  throw new Error(`Element with selector "${selector}" not found`);
};
