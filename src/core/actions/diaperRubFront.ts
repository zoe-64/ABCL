import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { CombinedAction } from "../../types/types";
import { CriteriaResult, Prerequisiter } from "../actionLoader";
import { sendDataToAction } from "../hooks";
import { getDiaperVerb, hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

const diaperRubFrontRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-rub-front", undefined, player.MemberNumber);

  diaperRubFrontFunction(player);
};
export const diaperRubFrontFunction = (player: Character) => {
  const diaperVerb = getDiaperVerb(Player);
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = `%NAME% blushes as %PRONOUN% rubs circles over the front of %POSSESSIVE% ${diaperVerb} diaper, biting %POSSESSIVE% lip as %PRONOUN% grinds down into %POSSESSIVE% own hand.`;
  const otherMessage = `%OPP_NAME% rubs up and down %NAME%'s diaper, %OPP_POSSESSIVE% fingers pressing into the ${diaperVerb} padding over the front and between %POSSESSIVE% legs.`;
  sendABCLAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
  ActivityEffectFlat(Player, Player, 10, "ItemVulva", 1);
  if (abclPlayer.stats.Incontinence > Math.random()) {
    {
      abclPlayer.attemptWetting();
    }
  }
};

export type diaperRubFrontListeners = {
  "diaper-rub-front": void;
};

function InsertCriteria(player: Character): CriteriaResult{
  let message = null;
  if (!isABCLPlayer(player)) message ??= "They are not an ABCL player.";
  if (!hasDiaper(player)) message ??= "They are not diapered.";
  return CriteriaResult.fromMessage(message);
}

function Criteria(player: Character, silent?: boolean): CriteriaResult {
  const result = InsertCriteria?.(player);
  let message = result?.toMessage();
  if (Player.IsRestrained()) message ??= "You are restrained.";
  if (!silent && message) sendChatLocal(message);
  return CriteriaResult.fromMessage(message);
}
export const diaperRubFront: CombinedAction = {
  activity: {
    activity: {
      Name: "Diaper Rub",
      Target: ["ItemVulva"],
      MaxProgress: 0,
      Prerequisite: [ Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true) ],
    },
    useImage: <ActivityImageSetting>`${publicURL}/activity/diaperRubFront.png`,
    run: (player: Character, sender, info) => diaperRubFrontRequest(player),
  },
  listeners: {
    "diaper-rub-front": ({ Sender }) => diaperRubFrontFunction(getCharacter(Sender!) ?? Player),
  },
};
