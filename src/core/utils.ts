import bcModSdkRef from "bondage-club-mod-sdk";
import { ModName, ModRepo, ModVersion } from "../types/definitions";
import { PermissionLevels } from "../types/types";
import { saveData } from "./settings";
import { ABCLdata } from "../main";

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

export function averageColor(
  color_1: HexColor,
  color_2: HexColor,
  ratio: number = 0.5
): HexColor {
  let rgb_1 = DrawHexToRGB(color_1);
  let rgb_2 = DrawHexToRGB(color_2);
  let avgRgb: RGBColor = {
    r: Math.round(rgb_1.r * ratio + rgb_2.r * (1 - ratio)),
    g: Math.round(rgb_1.g * ratio + rgb_2.g * (1 - ratio)),
    b: Math.round(rgb_1.b * ratio + rgb_2.b * (1 - ratio)),
  };
  return DrawRGBToHex([avgRgb.r, avgRgb.g, avgRgb.b]);
}

export function mixLevels(
  level: number,
  highLevel: string,
  midLevel: string,
  lowLevel: string
): string {
  if (level > 0.75) {
    return level > 0.9
      ? highLevel
      : averageColor(highLevel, midLevel, level - 0.75);
  } else {
    return averageColor(midLevel, lowLevel, level);
  }
}

export function hasDiaper(player: typeof Player = Player): boolean {
  const pelvisItem = InventoryGet(player, "ItemPelvis");
  const panties = InventoryGet(player, "Panties");
  return Boolean(
    (pelvisItem && isDiaper(pelvisItem)) || (panties && isDiaper(panties))
  );
}
export function getPlayerDiaperSize(player: typeof Player = Player): number {
  const pelvisItem = InventoryGet(player, "ItemPelvis");
  const panties = InventoryGet(player, "Panties");
  let size = 0;
  if (pelvisItem && isDiaper(pelvisItem)) {
    size += getDiaperSize(pelvisItem);
  }
  if (panties && isDiaper(panties)) {
    size += getDiaperSize(panties);
  }
  return size;
}
export function getDiaperSize(diaper: Item): number {
  if (
    diaper.Asset.Description === "Poofy Chastity Diaper" &&
    diaper.Property?.TypeRecord?.typed === 1
  ) {
    return ABCLdata.DiaperSizeScale.large;
  }
  return ABCLdata.DiaperSizeScale[
    ABCLdata.Diapers[diaper.Asset.Description as keyof typeof ABCLdata.Diapers]
      .size as keyof typeof ABCLdata.DiaperSizeScale
  ];
}
export function isDiaper(item: Item): boolean {
  return (
    item.Asset.Description.toLowerCase().includes("diaper") &&
    item.Asset.Description in ABCLdata.Diapers
  );
}
// might be useful
export class Saver {
  private lastSaveTime: number = 0;
  private allowedSaveInterval: number;
  constructor(allowedSaveInterval: number) {
    this.allowedSaveInterval = allowedSaveInterval;
  }
  save() {
    if (Date.now() - this.lastSaveTime > this.allowedSaveInterval) {
      saveData();
      this.lastSaveTime = Date.now();
    }
  }
}


export const waitForElement = async (
  selector: string,
  options: { childCheck?: boolean } = {}
): Promise<Element> => {
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
