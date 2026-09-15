import { diaperRubFrontListeners } from "src/core/actions/diaperRubFront";
import { changeDiaperListeners } from "../core/actions/changeDiaper";
import { lickPuddleListeners } from "../core/actions/lickPuddle";
import { onABCLMessageListeners } from "../core/actions/onABCLMessage";

import { diaperFaceRubListeners } from "src/core/actions/diaperFaceRub";
import { diaperFaceSitListeners } from "src/core/actions/diaperFaceSit";
import { diaperPatBackListeners } from "src/core/actions/diaperPatBack";
import { diaperPatFrontListeners } from "src/core/actions/diaperPatFront";
import { diaperPeeOthersDiaperListeners } from "src/core/actions/diaperPeeOthersDiaper";
import { diaperPourListeners } from "src/core/actions/diaperPour";
import { diaperRubBackListeners } from "src/core/actions/diaperRubBack";
import { diaperSquishBackListeners } from "src/core/actions/diaperSquishBack";
import { diaperSquishFrontListeners } from "src/core/actions/diaperSquishFront";
import { wipePuddleListeners } from "../core/actions/wipePuddle";
import { ModVersion } from "./definitions";

import { ActivityImageSetting, ExCustomActivityPrerequisite } from "@sugarch/bc-activity-manager";
import { ActivityInfo } from "@sugarch/bc-mod-types";
export type PartialDeep<T> = {
  [P in keyof T]?: PartialDeep<T[P]>;
};

export const MetabolismSettings = Object.freeze({
  Disabled: "Disabled",
  Normal: "Normal",
  Slow: "Slow",
  Fast: "Fast",
  Faster: "Faster",
  Fastest: "Fastest",
}) satisfies Record<MetabolismSetting, MetabolismSetting>;

export const DiaperSettingValues = Object.freeze({
  Deny: "Deny",
  Ask: "Ask",
  Allow: "Allow",
}) satisfies Record<DiaperChangePromptSetting, DiaperChangePromptSetting>;
export const MetabolismSettingValues = Object.freeze({
  Disabled: 0,
  Slow: 0.5,
  Normal: 1,
  Fast: 1.5,
  Faster: 2,
  Fastest: 3,
}) satisfies Record<MetabolismSetting, number>;

export const MiniGameDifficultyToNumber = Object.freeze({
  Easy: 3,
  Normal: 5,
  Hard: 7,
  Impossible: 10,
}) satisfies Record<MiniGameDifficulty, number>;

// entries
export type NewSettingsEntry = {
  type: "newSettings";
  settings: Partial<ModSettings>;
  version: typeof ModVersion;
};
export type SyncEntry = {
  type: "sync";
  settings: ModSettings;
  stats: ModStats;
  version: typeof ModVersion;
  target?: number;
};
export type InitEntry = {
  type: "init";
};

export type LickPuddleEntry = {
  type: "lickPuddle";
};
export type WipePuddleEntry = {
  type: "wipePuddle";
};
export type MessageEntry = SyncEntry | InitEntry | NewSettingsEntry | LickPuddleEntry | WipePuddleEntry;

export interface PluginServerChatRoomMessage extends ServerChatRoomMessageBase {
  /** The character to target the message at. null means it's broadcast to the room. */
  Target?: number;
  Content: ServerChatRoomMessageContentType;
  Type: ServerChatRoomMessageType;
  Dictionary?: {
    type: string;
    data?: any;
  }[];
  Timeout?: number;
}
export type PreferenceActivity = {
  self: number;
  other: number;
  isSelfExclusive: boolean;
};

export type ModScreen = {
  id: string;
  module: string;
  functions: ScreenFunctions;
};

export enum PermissionLevels {
  Anyone = 0,
  ItemPermission = 1,
  Friends = 2,
  Lovers = 3,
  // TODO: Mistress = 4 Perhaps counts mistress as BCX Mistresses, BCC Caretakers, etc
  Owner = 5, // TODO: Consider BCX owners, BCC Mommies, etc
  Self = 6,
}

export type HookListener<T> = (raw: PluginServerChatRoomMessage, data: T) => void;
export type ListenerTypeMap = wipePuddleListeners &
  lickPuddleListeners &
  changeDiaperListeners &
  onABCLMessageListeners &
  diaperRubFrontListeners &
  diaperRubBackListeners &
  diaperPatBackListeners &
  diaperPatFrontListeners &
  diaperSquishBackListeners &
  diaperFaceSitListeners &
  diaperFaceRubListeners &
  diaperPourListeners &
  diaperPeeOthersDiaperListeners &
  diaperSquishFrontListeners;

export type CombinedAction = {
  activity?: ABCLActivity;
  command?: ICommand;
  listeners?: Partial<{
    [K in keyof ListenerTypeMap]: HookListener<ListenerTypeMap[K]>;
  }>;
};

export class CriteriaResult {
  readonly type: "ok" | "err";
  readonly message?: string;

  private constructor(type: "ok" | "err", message?: string) {
    this.type = type;
    this.message = message;
  }

  static ok(): CriteriaResult {
    return new CriteriaResult("ok");
  }

  static err(message: string): CriteriaResult {
    return new CriteriaResult("err", message);
  }

  public toMessage(): string | undefined {
    return this.message;
  }

  public isOk(): boolean {
    return this.type == "ok";
  }

  public isErr(): boolean {
    return this.type == "err";
  }

  public static fromMessage(message: string | undefined | null): CriteriaResult {
    return message ? CriteriaResult.err(message) : CriteriaResult.ok();
  }

  public static OkIf(condition: boolean, message: string): CriteriaResult {
    return condition ? CriteriaResult.ok() : CriteriaResult.err(message);
  }
}

type TargetMode =
  | {
      type: "others";
      label?: string;
    }
  | {
      type: "self";
      label?: string;
    }
  | {
      type: "any";
      labelSelf?: string;
      labelOthers?: string;
    };

export class ABCLTarget {
  private constructor(item: AssetGroupItemName, mode: TargetMode) {
    this.ItemGroup = item;
    this.mode = mode;
  }

  ItemGroup: AssetGroupItemName;
  mode: TargetMode;

  public static Self(group: AssetGroupItemName, label?: string): ABCLTarget {
    return new ABCLTarget(group, { type: "self", label: label });
  }

  public static Others(group: AssetGroupItemName, label?: string): ABCLTarget {
    return new ABCLTarget(group, { type: "others", label: label });
  }

  public static AnySameLabel(group: AssetGroupItemName, label?: string): ABCLTarget {
    return new ABCLTarget(group, { type: "any", labelSelf: label, labelOthers: label });
  }

  public static Any(group: AssetGroupItemName, labelOthers?: string, labelSelf?: string): ABCLTarget {
    return new ABCLTarget(group, { type: "any", labelSelf: labelSelf, labelOthers: labelOthers });
  }
}

export interface ABCLActivity<CustomPrereq extends string = ActivityPrerequisite> {
  Name: string;
  Target: ABCLTarget[];
  MaxProgress: number;
  Prerequisite?: ExCustomActivityPrerequisite<CustomPrereq>[];
  useImage?: ActivityImageSetting;
  run?: (player: Character, sender: Character, info: ActivityInfo) => void | undefined;
}
