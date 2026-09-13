import { ActivityImageSetting, ActivityManager, CustomActivity, ExCustomActivityPrerequisite } from "@sugarch/bc-activity-manager";
import { ActivityInfo } from "@sugarch/bc-mod-types";
import { CombinedAction } from "src/types/types";
import { changeDiaper } from "./actions/changeDiaper";
import { checkDiaper } from "./actions/checkDiaper";
import { diaperFaceRub } from "./actions/diaperFaceRub";
import { diaperFaceSit } from "./actions/diaperFaceSit";
import { diaperPatBack } from "./actions/diaperPatBack";
import { diaperPatFront } from "./actions/diaperPatFront";
import { diaperPeeOthersDiaper } from "./actions/diaperPeeOthersDiaper";
import { diaperPour } from "./actions/diaperPour";
import { diaperRubBack } from "./actions/diaperRubBack";
import { diaperRubFront } from "./actions/diaperRubFront";
import { diaperSquishBack } from "./actions/diaperSquishBack";
import { diaperSquishFront } from "./actions/diaperSquishFront";
import { lickPuddle } from "./actions/lickPuddle";
import { makeAWish } from "./actions/makeAWish";
import { onABCLMessage } from "./actions/onABCLMessage";
import { pauseStats } from "./actions/pauseStats";
import { toPee } from "./actions/toPee";
import { toPoop } from "./actions/toPoop";
import { usePotty } from "./actions/usePotty";
import { useToilet } from "./actions/useToilet";
import { wipePuddle } from "./actions/wipePuddle";
import { sendChatLocal } from "./utils";

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

export interface ABCLActivity<CustomPrereq extends string = ActivityPrerequisite> {
  Name: string;
  Target: ABCLTarget[];
  MaxProgress: number;
  Prerequisite?: ExCustomActivityPrerequisite<CustomPrereq>[];
  useImage?: ActivityImageSetting;
  run?: (player: Character, sender: Character, info: ActivityInfo) => void | undefined;
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

export function ComposePrerequisites(...args: ((player: Character) => CriteriaResult)[]): (player: Character) => CriteriaResult {
  return (player: Character) => {
    let message = CriteriaResult.ok();
    for (var a of args) {
      message = a(player);
      if (message.isErr()) break;
    }
    return message;
  };
}

export function Prerequisiter<RestOfArgs extends unknown[]>(
  f: (acted: Character | PlayerCharacter, ...args: RestOfArgs) => CriteriaResult,
  ...args: RestOfArgs
): (prereq: ActivityPrerequisite, acting: Character | PlayerCharacter, acted: Character | PlayerCharacter, group: AssetGroup) => boolean {
  return (prereq: ActivityPrerequisite, acting: Character | PlayerCharacter, acted: Character | PlayerCharacter, group: AssetGroup) => {
    return f(acted, ...args).isOk();
  };
}

export function Printable(f: (player: Character) => CriteriaResult): (player: Character, silent?: boolean) => CriteriaResult {
  return (player, silent?) => {
    const res = f(player);
    if (!silent && res.toMessage()) sendChatLocal(res.toMessage as unknown as string);
    return res;
  };
}

export function DoCheckIf(
  condition: boolean | ((player: Character) => boolean),
  run: (player: Character) => CriteriaResult,
): (player: Character) => CriteriaResult {
  return player => {
    if (typeof condition === "boolean") {
      if (condition) return run(player);
    } else if (condition(player)) {
      return run(player);
    }
    return CriteriaResult.ok();
  };
}

const NO_OUTPUT_ACT = "¶¶¶";

function addToDictCache(dict: TextCache, activity: ABCLActivity) {
  var textCachePush = (k: string, v: string) => (dict.cache[k] = v);
  activity.Target.forEach(t => {
    if (t.mode.type === "others") {
      t.mode.label ??= activity.Name;

      textCachePush("Label-ChatOther-" + t.ItemGroup + "-" + activity.Name, t.mode.label);
      textCachePush("Label-ChatOther-" + t.ItemGroup + "-" + activity.Name, NO_OUTPUT_ACT);
    } else if (t.mode.type == "self") {
      t.mode.label ??= activity.Name;

      textCachePush("Label-ChatSelf-" + t.ItemGroup + "-" + activity.Name, t.mode.label);
      textCachePush("Label-ChatSelf-" + t.ItemGroup + "-" + activity.Name, NO_OUTPUT_ACT);
    } else {
      t.mode.labelOthers ??= activity.Name;
      t.mode.labelSelf ??= t.mode.labelOthers;

      textCachePush("Label-ChatOther-" + t.ItemGroup + "-" + activity.Name, t.mode.labelOthers);
      textCachePush("Label-ChatOther-" + t.ItemGroup + "-" + activity.Name, NO_OUTPUT_ACT);

      textCachePush("Label-ChatSelf-" + t.ItemGroup + "-" + activity.Name, t.mode.labelSelf);
      textCachePush("Label-ChatSelf-" + t.ItemGroup + "-" + activity.Name, NO_OUTPUT_ACT);
    }
  });
}

function ABCLActToSugarch<P extends string = ActivityPrerequisite>(abcl: ABCLActivity<P>): CustomActivity<string, P> {
  return {
    activity: {
      Name: abcl.Name,
      MaxProgress: abcl.MaxProgress,
      Prerequisite: abcl.Prerequisite ?? [],
      Target: abcl.Target.filter(x => x.mode.type === "any" || x.mode.type === "others").map(x => x.ItemGroup),
      TargetSelf: abcl.Target.filter(x => x.mode.type === "self").map(x => x.ItemGroup),
    },
    useImage: abcl.useImage,
    run: abcl.run,
  };
}

export function initActions(): void {
  const activity_dict = ActivityDictionaryLoad();

  activites.forEach(act => {
    ActivityManager.addCustomActivity(ABCLActToSugarch(act));
    addToDictCache(activity_dict, act);
  });

  CommandCombine(commands);
  ActivityManager.init();
}

export const actions: CombinedAction[] = [
  changeDiaper,
  checkDiaper,
  toPee,
  toPoop,
  usePotty,
  useToilet,
  lickPuddle,
  wipePuddle,
  onABCLMessage,
  diaperFaceRub,
  diaperFaceSit,
  diaperPatBack,
  diaperPatFront,
  diaperPeeOthersDiaper,
  diaperPour,
  diaperRubFront,
  diaperRubBack,
  diaperSquishBack,
  diaperSquishFront,
  pauseStats,
  makeAWish,
];

export const commands = actions.reduce((commands, { command }) => (command ? [...commands, command] : commands), [] as ICommand[]);
export const activites = actions.reduce(
  (activites, { activity }) => (activity ? [...activites, activity] : activites),
  [] as ABCLActivity<ActivityPrerequisite>[],
);
