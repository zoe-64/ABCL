import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { CombinedAction } from "../../types/types";
import { ABCLTarget, CriteriaResult, Prerequisiter } from "../actionLoader";
import { sendDataToAction } from "../hooks";
import { getDiaperVerb, hasDiaper } from "../player/diaper";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction } from "../player/playerUtils";

const diaperPatFrontRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-pat-front", undefined, player.MemberNumber);

  diaperPatFrontFunction(player);
};
function InsertCriteria(player: Character): CriteriaResult {
  let message = null;
  if (!isABCLPlayer(player)) message ??= "They are not an ABCL player.";
  if (!hasDiaper(player)) message ??= "They are not diapered.";
  return CriteriaResult.fromMessage(message);
}

function Criteria(player: Character, silent?: boolean): CriteriaResult {
  const result = InsertCriteria?.(player);
  let message = result?.toMessage();
  if (Player.IsRestrained()) message = "You are restrained.";
  return CriteriaResult.fromMessage(message);
}

export const diaperPatFrontFunction = (player: Character) => {
  const diaperVerb = getDiaperVerb(Player);
  const diaperSound = diaperVerb === "dry" ? "crinkles" : "sloshes";
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = `%NAME% pats the front of %POSSESSIVE% ${diaperVerb} diaper playfully, smiling at the soft ${diaperSound}.`;
  const otherMessage = `%OPP_NAME% playfully pats the front of %NAME%'s ${diaperVerb} diaper, as the padding ${diaperSound} softly.`;
  sendABCLAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
  ActivityEffectFlat(Player, Player, 1, "ItemVulva", 1);
};

export type diaperPatFrontListeners = {
  "diaper-pat-front": void;
};

export const diaperPatFront: CombinedAction = {
  activity: {
    Name: "Diaper Pat Crotch",
    Target: [ABCLTarget.Others("ItemVulva")],
    MaxProgress: 50,
    Prerequisite: [Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true)],
    useImage: <ActivityImageSetting>`${publicURL}/activity/diaperPatFront.png`,
    run: (player, sender, info) => diaperPatFrontRequest(player),
  },
  listeners: {
    "diaper-pat-front": ({ Sender }) => diaperPatFrontFunction(getCharacter(Sender!) ?? Player),
  },
};
