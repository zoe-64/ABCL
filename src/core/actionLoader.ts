import { ActivityManager, CustomActivity } from "@sugarch/bc-activity-manager";
import { ActivityInfo } from "@sugarch/bc-mod-types";
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
import { getCharacter } from "./player/playerUtils";
import { sendChatLocal } from "./utils";

export function RunAction<Output extends unknown, RestOfArgs extends unknown[]>(
  info: ActivityInfo,
  f: (target: Character, ...args: RestOfArgs) => Output,
  ...args: RestOfArgs
): Output | undefined {
  if (Player.MemberNumber === info.TargetCharacter && Player.MemberNumber !== info.SourceCharacter) return;
  return f(getCharacter(info.TargetCharacter)!, ...args);
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
    if (!silent && res.toMessage()) sendChatLocal(res.toMessage() as unknown as string);
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
  activity.Target.forEach(({ mode, ItemGroup }) => {
    const type = mode.type === "self" ? "ChatSelf" : "ChatOther";
    if (mode.type === "any") {
      mode.labelOthers ??= activity.Name;
      mode.labelSelf ??= mode.labelOthers;
      if (ItemGroup === "ItemVulva") {
        textCachePush(`Label-ChatOther-ItemPenis-${activity.Name}`, mode.labelOthers);
        textCachePush(`ChatOther-ItemPenis-${activity.Name}`, NO_OUTPUT_ACT);

        textCachePush(`Label-ChatSelf-ItemPenis-${activity.Name}`, mode.labelSelf);
        textCachePush(`ChatSelf-ItemPenis-${activity.Name}`, NO_OUTPUT_ACT);
      }
      textCachePush(`Label-ChatOther-${ItemGroup}-${activity.Name}`, mode.labelOthers);
      textCachePush(`ChatOther-${ItemGroup}-${activity.Name}`, NO_OUTPUT_ACT);

      textCachePush(`Label-ChatSelf-${ItemGroup}-${activity.Name}`, mode.labelSelf);
      textCachePush(`ChatSelf-${ItemGroup}-${activity.Name}`, NO_OUTPUT_ACT);
      return;
    }
    mode.label ??= activity.Name;
    if (ItemGroup === "ItemVulva") {
      textCachePush(`Label-${type}-ItemPenis-${activity.Name}`, mode.label);
      textCachePush(`${type}-ItemPenis-${activity.Name}`, NO_OUTPUT_ACT);
    }
    textCachePush(`Label-${type}-${ItemGroup}-${activity.Name}`, mode.label);
    textCachePush(`${type}-${ItemGroup}-${activity.Name}`, NO_OUTPUT_ACT);
  });
}

function ABCLActToSugarch<P extends string = ActivityPrerequisite>(abcl: ABCLActivity<P>): CustomActivity<string, P> {
  return {
    activity: {
      Name: abcl.Name,
      MaxProgress: abcl.MaxProgress,
      Prerequisite: abcl.Prerequisite ?? [],
      Target: abcl.Target.filter(x => x.mode.type === "any" || x.mode.type === "others").map(x => x.ItemGroup),
      TargetSelf: abcl.Target.filter(x => x.mode.type === "any" || x.mode.type === "self").map(x => x.ItemGroup),
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
export const activityNames = activites.flatMap(activity => activity.Name);
