import { ActivityManager, CustomActivity } from "@sugarch/bc-activity-manager";
import { ABCLActivity, CombinedAction, CriteriaResult } from "src/types/types";
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
      textCachePush("ChatOther-" + t.ItemGroup + "-" + activity.Name, NO_OUTPUT_ACT);
    } else if (t.mode.type == "self") {
      t.mode.label ??= activity.Name;

      textCachePush("Label-ChatSelf-" + t.ItemGroup + "-" + activity.Name, t.mode.label);
      textCachePush("ChatSelf-" + t.ItemGroup + "-" + activity.Name, NO_OUTPUT_ACT);
    } else {
      t.mode.labelOthers ??= activity.Name;
      t.mode.labelSelf ??= t.mode.labelOthers;

      textCachePush("Label-ChatOther-" + t.ItemGroup + "-" + activity.Name, t.mode.labelOthers);
      textCachePush("ChatOther-" + t.ItemGroup + "-" + activity.Name, NO_OUTPUT_ACT);

      textCachePush("Label-ChatSelf-" + t.ItemGroup + "-" + activity.Name, t.mode.labelSelf);
      textCachePush("ChatSelf-" + t.ItemGroup + "-" + activity.Name, NO_OUTPUT_ACT);
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
