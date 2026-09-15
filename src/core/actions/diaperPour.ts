import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { ABCLTarget, CombinedAction } from "../../types/types";
import { checkIsABCL, checkIsDiapered, checkIsRestrained } from "../actionCheck";
import { ComposePrerequisites, Prerequisiter, Printable } from "../actionLoader";
import { sendDataToAction } from "../hooks";
import { updateDiaperColor } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, replace_template, sendABCLAction } from "../player/playerUtils";

const diaperPourRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-pour", undefined, player.MemberNumber);

  diaperPourFunction(player);
};
export const diaperPourFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = "%NAME% pours water in %POSSESSIVE% diaper.";
  const otherMessage = "%OPP_NAME% pours water in %NAME%'s diaper.";
  sendABCLAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
  abclPlayer.stats.WetnessValue += 500;
  updateDiaperColor(true);
  if (Player.ABCL.Settings.ExpressionsByActivities) {
    CharacterSetFacialExpression(Player, "Blush", "Low", 8);
    CharacterSetFacialExpression(Player, "Eyebrows", "Soft", 8);

    CharacterSetFacialExpression(Player, "Eyes", "Surprised", 5);
    CharacterSetFacialExpression(Player, "Eyes", "Daydream", 2);
  }
};

export type diaperPourListeners = {
  "diaper-pour": void;
};

const InsertCriteria = ComposePrerequisites(checkIsABCL, checkIsDiapered);
const Criteria = Printable(ComposePrerequisites(InsertCriteria, checkIsRestrained));

// function InsertCriteria(player: Character): CriteriaResult {
//   let message = null;
//   if (!isABCLPlayer(player)) message ??= "They are not an ABCL player.";
//   if (!hasDiaper(player)) message ??= "They are not diapered.";
//   return CriteriaResult.fromMessage(message);
// }

// function Criteria(player: Character, silent?: boolean): CriteriaResult {
//   const result = InsertCriteria?.(player);
//   let message = result?.toMessage();
//   if (Player.IsRestrained()) message ??= "You are restrained.";
//   if (!silent && message) sendChatLocal(message);
//   return CriteriaResult.fromMessage(message);
// }

export const diaperPour: CombinedAction = {
  activity: {
    Name: "Pour Water in Diaper",
    Target: [ABCLTarget.Others("ItemPelvis")],
    MaxProgress: 50,
    Prerequisite: [Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true)],
    useImage: <ActivityImageSetting>`${publicURL}/activity/diaperPour.png`,
    run: (player, sender, info) => diaperPourRequest(getCharacter(info.TargetCharacter)!),
  },
  listeners: {
    "diaper-pour": ({ Sender }) => diaperPourFunction(getCharacter(Sender!) ?? Player),
  },
};
