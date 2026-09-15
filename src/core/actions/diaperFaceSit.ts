import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { ABCLTarget, CombinedAction } from "../../types/types";
import { checkIsABCL, checkIsRestrained, checkIsSelfDiapered } from "../actionCheck";
import { ComposePrerequisites, Prerequisiter, Printable } from "../actionLoader";
import { sendDataToAction } from "../hooks";
import { abclPlayer } from "../player/player";
import { getCharacter, replace_template, sendABCLAction } from "../player/playerUtils";

const diaperFaceSitRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) {
    ActivityEffectFlat(Player, Player, 5, "ItemButt", 1);
    return sendDataToAction("diaper-face-sit", undefined, player.MemberNumber);
  }
  diaperFaceSitFunction(player);
};
export const diaperFaceSitFunction = (player: Character) => {
  const otherMessage = "%OPP_NAME% sits with %OPP_POSSESSIVE% diapered butt on %NAME%'s face.";
  sendABCLAction(replace_template(otherMessage, player), undefined, "playerActivity", player);
  abclPlayer.stats.MentalRegression += 0.03 * abclPlayer.stats.MentalRegressionModifier;
  ActivityEffectFlat(Player, Player, 8, "ItemNose", 1);
  if (Player.ABCL.Settings.ExpressionsByActivities) {
    CharacterSetFacialExpression(Player, "Blush", "ShortBreath", 30);
    CharacterSetFacialExpression(Player, "Eyebrows", "Soft", 30);

    CharacterSetFacialExpression(Player, "Eyes", "Dizzy", 30);
  }
};
export type diaperFaceSitListeners = {
  "diaper-face-sit": void;
};
const InsertCriteria = ComposePrerequisites(checkIsABCL, checkIsSelfDiapered);
const Criteria = Printable(ComposePrerequisites(InsertCriteria, checkIsRestrained));
// function InsertCriteria(player: Character): CriteriaResult {
//   let message = null;
//   if (!isABCLPlayer(player)) message ??= "They are not an ABCL player.";
//   if (!hasDiaper(Player)) message ??= "You are not diapered.";
//   if (player.MemberNumber === Player.MemberNumber) message = "You can't sit with your own diaper on your face.";
//   return CriteriaResult.fromMessage(message);
// }
// function Criteria(player: Character, silent?: boolean): CriteriaResult {
//   const result = InsertCriteria?.(player) ?? null;
//   let message = result?.toMessage();
//   if (Player.IsRestrained()) message ??= "You are restrained.";
//   if (!silent && message) sendChatLocal(message);
//   return CriteriaResult.fromMessage(message);
// }

export const diaperFaceSit: CombinedAction = {
  activity: {
    Name: "Sits with Diaper on Face",
    MaxProgress: 0,
    Prerequisite: [Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true)],
    Target: [ABCLTarget.Others("ItemNose")],
    useImage: <ActivityImageSetting>`${publicURL}/activity/diaperFaceSit.png`,
    run: (player, sender, info) => diaperFaceSitRequest(getCharacter(info.TargetCharacter)!),
  },
  listeners: {
    "diaper-face-sit": ({ Sender }) => diaperFaceSitFunction(getCharacter(Sender!) ?? Player),
  },
};
