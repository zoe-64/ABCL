import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { ABCLTarget, CombinedAction } from "../../types/types";
import { checkIsABCL, checkIsDiapered, checkIsRestrained } from "../actionCheck";
import { ComposePrerequisites, Prerequisiter, Printable } from "../actionLoader";
import { sendDataToAction } from "../hooks";
import { abclPlayer } from "../player/player";
import { getCharacter, replace_template, sendABCLAction } from "../player/playerUtils";

const diaperFaceRubRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) {
    ActivityEffectFlat(Player, Player, 12, "ItemVulva", 1);
    return sendDataToAction("diaper-face-rub", undefined, player.MemberNumber);
  }
  diaperFaceRubFunction(player);
};
export const diaperFaceRubFunction = (player: Character) => {
  const otherMessage = "%OPP_NAME% rubs %OPP_POSSESSIVE% diaper against %NAME%'s face.";
  sendABCLAction(replace_template(otherMessage, player), undefined, "playerActivity", player);
  ActivityEffectFlat(player, Player, 8, "ItemVulva", 1);
  if (Player.ABCL.Settings.ExpressionsByActivities) {
    CharacterSetFacialExpression(Player, "Blush", "Medium", 5);
    CharacterSetFacialExpression(Player, "Eyebrows", "Soft", 10);
    CharacterSetFacialExpression(Player, "Eyes", "Dizzy", 10);
  }
  abclPlayer.stats.MentalRegression += 0.02 * abclPlayer.stats.MentalRegressionModifier;
};
export type diaperFaceRubListeners = {
  "diaper-face-rub": void;
};

const InsertCriteria = ComposePrerequisites(checkIsABCL, checkIsDiapered);
const Criteria = Printable(ComposePrerequisites(InsertCriteria, checkIsRestrained));
// function InsertCriteria(player: Character): CriteriaResult {
//   let message = null;
//   if (!isABCLPlayer(player)) message ??= "They are not an ABCL player.";
//   if (!hasDiaper(Player)) message ??= "You are not diapered.";
//   if (player.MemberNumber === Player.MemberNumber) message ??= "You can't rub your own diaper against your face.";
//   return CriteriaResult.fromMessage(message);
// }
// function Criteria(player: Character, silent?: boolean): CriteriaResult {
//   const result = InsertCriteria?.(player);
//   let message = result.toMessage();
//   if (Player.IsRestrained()) message ??= "You are restrained.";
//   if (!silent && message) sendChatLocal(message);
//   return CriteriaResult.fromMessage(message);
// }
export const diaperFaceRub: CombinedAction = {
  activity: {
    Name: "Rub Diaper Against Face",
    Target: [ABCLTarget.Others("ItemNose")],
    MaxProgress: 0,
    Prerequisite: [Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true)],

    useImage: <ActivityImageSetting>`${publicURL}/activity/diaperFaceRub.png`,
    run: (player, sender, info) => diaperFaceRubRequest(player),
  },

  listeners: {
    "diaper-face-rub": ({ Sender }) => diaperFaceRubFunction(getCharacter(Sender!) ?? Player),
  },
};
