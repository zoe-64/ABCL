import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { ABCLTarget, CombinedAction } from "../../types/types";
import { checkIsABCL, checkIsDiapered, checkIsRestrained } from "../actionCheck";
import { ComposePrerequisites, Prerequisiter, Printable, RunAction } from "../actionLoader";
import { sendDataToAction } from "../hooks";
import { getDiaperVerb } from "../player/diaper";
import { getCharacter, replace_template, sendABCLAction } from "../player/playerUtils";

const diaperSquishFrontRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-squish-front", undefined, player.MemberNumber);

  diaperSquishFrontFunction(player);
};
export const diaperSquishFrontFunction = (player: Character) => {
  const diaperVerb = getDiaperVerb(Player);
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = `%NAME% presses into the front of %POSSESSIVE% ${diaperVerb} diaper, blushing as %PRONOUN% squishes %POSSESSIVE% padding.`;
  const otherMessage = `%OPP_NAME% presses %OPP_POSSESSIVE% hand into %NAME%'s diaper, giggling as %OPP_PRONOUN% squishes the ${diaperVerb} padding between %POSSESSIVE% legs.`;
  sendABCLAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
};

export type diaperSquishFrontListeners = {
  "diaper-squish-front": void;
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

export const diaperSquishFront: CombinedAction = {
  activity: {
    Name: "Diaper Squish Crotch",
    Target: [ABCLTarget.Any("ItemVulva")],
    Prerequisite: [Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true)],
    MaxProgress: 0,
    useImage: <ActivityImageSetting>`${publicURL}/activity/diaperSquishFront.png`,
    run: (player, sender, info) => RunAction(info, diaperSquishFrontRequest),
  },
  listeners: {
    "diaper-squish-front": ({ Sender }) => diaperSquishFrontFunction(getCharacter(Sender!) ?? Player),
  },
};
