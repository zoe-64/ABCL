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
  msgElement.innerText = ((local && "(local) ") || "") + message;
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
  pausedTime: number | null = null;
  pausedOffset: number = 0;
  constructor(allowedCallInterval: number) {
    this.allowedCallInterval = allowedCallInterval;
  }
  pause() {
    this.pausedTime = Date.now();
    this.pausedOffset = this.lastCallTime - this.pausedTime;
  }
  resume() {
    this.pausedTime = null;
    this.lastCallTime = Date.now() - this.pausedOffset;
  }
  check(): boolean {
    if (this.pausedTime) {
      return false;
    }
    if (Date.now() - this.lastCallTime > this.allowedCallInterval) {
      this.lastCallTime = Date.now();
      return true;
    }
    return false;
  }
  reset() {
    this.lastCallTime = 0;
    this.pausedTime = null;
  }
  resetAllowedCallInterval() {
    this.lastCallTime = Date.now();
    this.pausedTime = null;
  }
  isReady() {
    return Date.now() - this.lastCallTime > this.allowedCallInterval;
  }
}

// input can be "default", null, hex code, an array of hexes, an array of default
// expect to be given the asset, in asset there's a default color
// return a hex color
export const isColorable = (color: string) => color !== "Default" && typeof color === "string";

export const getColor = (color: ItemColor | null | "Default" | string[] | ItemColor, asset: Asset): BCColor[] => {
  if (typeof color === "string" && color !== "Default") logger.warn(`Unknown color: ${color}`);
  if (!color || color === "Default") return [...asset.DefaultColor.map(color => (color === "Default" ? "#FFFFFF" : color))];

  if (Array.isArray(color)) {
    return color.map(mappedColor => {
      if (mappedColor === "Default") {
        return "#FFFFFF";
      }
      return mappedColor;
    }) as BCColor[];
  }

  return [color];
};
export const getElement = <T extends Element>(parent: Element, selector: string): T => {
  const element = parent.querySelector<T>(selector);
  if (element) return element;
  throw new Error(`Element with selector "${selector}" not found`);
};

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function createRateLimiter<T extends (...args: any[]) => Promise<any>>(func: T, delay: number): (...funcArgs: Parameters<T>) => void {
  const queue: Parameters<T>[] = [];
  let isProcessing: boolean = false;

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async function worker(): Promise<void> {
    if (isProcessing) return;
    isProcessing = true;

    while (queue.length > 0) {
      const args = queue.shift()!; // '!' is non-null assertion as we checked queue.length

      await func(...args);

      await sleep(delay);
    }
    isProcessing = false;
  }

  return function (...args: Parameters<T>): void {
    queue.push(args);
    worker();
  };
}

export interface VersionSummary {
  version: string;
  fileName: string;
  content: string;
}

export interface ChangelogSummaryResult {
  combinedText: string;
  entries: VersionSummary[];
}


export interface GitHubFileItem {
  name: string;
  path: string;
  type: "file" | "dir" | "symlink" | "submodule";
  size: number;
  download_url: string | null;
  html_url: string;
}

function parseGitHubUrl(url: string) {
  const parsed = new URL(url);
  const parts = parsed.pathname.split("/").filter(Boolean);

  const owner = parts[0];
  const repo = parts[1];
  const path = parts.slice(2).join("/");

  return { owner, repo, path };
}

export async function getDirectoryContents(githubUrl: string): Promise<GitHubFileItem[]> {
  const { owner, repo, path } = parseGitHubUrl(githubUrl);

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const response = await fetch(apiUrl, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned status ${response.status}: ${response.statusText}`);
  }

  const data: GitHubFileItem[] = await response.json();
  return data;
}
import semver from "semver";

function extractSemver(filename: string): string | null {
  const match = filename.match(/\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?/);
  if (!match) return null;
  return semver.clean(match[0]);
}

export async function summarizeVersionRange(
  dirUrl: string,
  startVersion: string,
  endVersion: string
): Promise<ChangelogSummaryResult> {
  const directoryItems: GitHubFileItem[] = await getDirectoryContents(dirUrl);
  const validFiles = directoryItems
    .filter((item) => item.type === "file" && item.download_url)
    .map((item) => ({
      item,
      version: extractSemver(item.name),
    }))
    .filter((file): file is { item: GitHubFileItem; version: string } => {
      if (!file.version) return false;

      const isGteStart = semver.gte(file.version, startVersion);
      const isLteEnd = semver.lte(file.version, endVersion);

      return isGteStart && isLteEnd;
    })
    .sort((a, b) => semver.compare(a.version, b.version));

  const entries: VersionSummary[] = await Promise.all(
    validFiles.map(async ({ item, version }) => {
      const res = await fetch(item.download_url!);
      const content = await res.text();
      return {
        version,
        fileName: item.name,
        content,
      };
    })
  );

  const combinedText = entries
    .map((entry) => `=== Version ${entry.version} ===\n${entry.content}`)
    .join("\n\n");

  return {
    combinedText,
    entries,
  };
}