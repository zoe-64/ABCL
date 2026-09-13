import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { CombinedAction } from "../../types/types";
import { ABCLTarget, CriteriaResult, Prerequisiter } from "../actionLoader";
import { sendDataToAction } from "../hooks";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction, targetInputExtractor } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

const lickPuddleRequest = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  if (!isSelf) return sendDataToAction("lick-puddle", undefined, player.MemberNumber);
  LickPuddleFunction(Player);
};
const LickPuddleFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = "%NAME% licks %POSSESSIVE% puddle of pee.";
  const otherMessage = "%OPP_NAME% licks %NAME%'s puddle of pee.";
  sendABCLAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "lickPuddle", player);
  if (Player.ABCL.Settings.ExpressionsByActivities) {
    CharacterSetFacialExpression(Player, "Fluids", "DroolLow", 20);
  }
  abclPlayer.stats.PuddleSize -= 50;
};
export type lickPuddleListeners = {
  "lick-puddle": undefined;
};

function InsertCriteria(player: Character) {
  let message = null;
  if (!isABCLPlayer(player)) message ??= "They are not an ABCL player.";
  if (player?.ABCL && player.ABCL!.Stats.PuddleSize.value <= 0) message ??= "They have no puddle of pee.";
  return CriteriaResult.fromMessage(message);
}

function Criteria(player: Character, silent?: boolean) {
  const result = InsertCriteria?.(player);
  let message = result?.toMessage();
  if (!silent && message) sendChatLocal(message);
  return CriteriaResult.fromMessage(message);
}

export const lickPuddle: CombinedAction = {
  activity: {
    Name: "Lick Puddle",
    Target: [ABCLTarget.Any("ItemBoots")],
    MaxProgress: 0,
    Prerequisite: [Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true)],
    useImage: <ActivityImageSetting>`${publicURL}/activity/lickPuddle.png`,
    run: (player: Character, sender, info) => lickPuddleRequest(player),
  },
  command: {
    Tag: "lick-puddle",
    Action: (args, msg, parsed) => {
      const character = targetInputExtractor(parsed) ?? Player;
      if (!Criteria!(character).isOk()) return;
      lickPuddleRequest(character);
    },
    Description: ` [MemberNumber|Name|Nickname]: Licks a puddle of pee.`,
  },
  listeners: {
    "lick-puddle": ({ Sender }) => LickPuddleFunction(getCharacter(Sender!) ?? Player),
  },
};
