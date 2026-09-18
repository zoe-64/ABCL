import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { ABCLTarget, CombinedAction } from "../../types/types";
import { checkIsABCL, checkIsDiapered, checkIsRestrained } from "../actionCheck";
import { ComposePrerequisites, Prerequisiter, Printable, RunAction } from "../actionLoader";
import { sendDataToAction } from "../hooks";
import { getDiaperVerb } from "../player/diaper";
import { getCharacter, replace_template, sendABCLAction } from "../player/playerUtils";

const diaperPatBackRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-pat-back", undefined, player.MemberNumber);
  diaperPatBackFunction(player);
};
export const diaperPatBackFunction = (player: Character) => {
  const diaperVerb = getDiaperVerb(Player);
  const diaperSound = diaperVerb === "dry" ? "crinkles" : "sloshes";
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = `%NAME% playfully pats %POSSESSIVE% ${diaperVerb} diapered butt, enjoying the soft ${diaperSound} it makes.`;
  const otherMessage = `%OPP_NAME% gives %NAME%'s diapered butt a playful pat, as the ${diaperVerb} diaper ${diaperSound} softly.`;
  ActivityEffectFlat(Player, Player, 1, "ItemButt", 1);
  sendABCLAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
};

export type diaperPatBackListeners = {
  "diaper-pat-back": void;
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

export const diaperPatBack: CombinedAction = {
  activity: {
    Name: "Diaper Pat Bottom",
    Target: [ABCLTarget.Any("ItemButt")],
    MaxProgress: 50,
    Prerequisite: [Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true)],
    useImage: <ActivityImageSetting>`${publicURL}/activity/diaperPatBack.png`,
    run: (player, sender, info) => RunAction(info, diaperPatBackRequest),
  },
  listeners: {
    "diaper-pat-back": ({ Sender }) => diaperPatBackFunction(getCharacter(Sender!) ?? Player),
  },
};
