import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { CombinedAction } from "../../types/types";
import { CriteriaResult, Prerequisiter } from "../actionLoader";
import { sendDataToAction } from "../hooks";
import { getDiaperVerb, hasDiaper } from "../player/diaper";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

const diaperSquishBackRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-squish-back", undefined, player.MemberNumber);

  diaperSquishBackFunction(player);
};
export const diaperSquishBackFunction = (player: Character) => {
  const diaperVerb = getDiaperVerb(Player);
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = `%NAME% gives %POSSESSIVE% ${diaperVerb} diapered butt a squeeze, blushing a little as it squishes under %POSSESSIVE% hand.`;
  const otherMessage = `%OPP_NAME% gives %NAME%'s diapered butt a teasing squeeze, smiling as %OPP_PRONOUN% squishes and kneads the ${diaperVerb} padding.`;
  sendABCLAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
};

export type diaperSquishBackListeners = {
  "diaper-squish-back": void;
};

function InsertCriteria(player: Character): CriteriaResult {
  let message = null;
  if (!isABCLPlayer(player)) message ??= "They are not an ABCL player.";
  if (!hasDiaper(player)) message ??= "They are not diapered.";
  return CriteriaResult.fromMessage(message);
}
function Criteria(player: Character, silent?: boolean) {
  const result = InsertCriteria?.(player);
  let message = result?.toMessage();
  if (Player.IsRestrained()) message ??= "You are restrained.";
  if (!silent && message) sendChatLocal(message);
  return CriteriaResult.fromMessage(message);
}
export const diaperSquishBack: CombinedAction = {
  activity: {
    activity: {
      Name: "Diaper Squish Bottom",
      Target: ["ItemButt"],
      MaxProgress: 0,
      Prerequisite: [ Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true) ],
    },
    useImage: <ActivityImageSetting>`${publicURL}/activity/diaperSquishBack.png`,
    run: (player: Character, sender, info) => diaperSquishBackRequest(player),
  },
  listeners: {
    "diaper-squish-back": ({ Sender }) => diaperSquishBackFunction(getCharacter(Sender!) ?? Player),
  },
};
