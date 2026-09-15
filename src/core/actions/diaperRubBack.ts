import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { ABCLTarget, CombinedAction } from "../../types/types";
import { checkIsABCL, checkIsDiapered, checkIsRestrained } from "../actionCheck";
import { ComposePrerequisites, Prerequisiter, Printable, RunAction } from "../actionLoader";
import { sendDataToAction } from "../hooks";
import { getDiaperVerb } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, replace_template, sendABCLAction } from "../player/playerUtils";

const diaperRubBackRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-rub-back", undefined, player.MemberNumber);

  diaperRubBackFunction(player);
};
export const diaperRubBackFunction = (player: Character) => {
  const diaperVerb = getDiaperVerb(Player);
  const diaperSound = diaperVerb === "dry" ? "crinkles" : "sloshes";
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = `%NAME% blushes as %PRONOUN% rubs %POSSESSIVE% ${diaperVerb} diapered butt with both hands, breath hitching at the soft ${diaperSound} under %POSSESSIVE% hands.`;
  const otherMessage = `%OPP_NAME% runs %OPP_POSSESSIVE% hand over %NAME%'s ${diaperVerb} diapered butt, rubbing affectionate circles into the padding.`;
  sendABCLAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
  ActivityEffectFlat(Player, Player, 5, "ItemButt", 1);
  if (abclPlayer.stats.Incontinence > Math.random()) {
    {
      abclPlayer.attemptSoiling();
    }
  }
};

export type diaperRubBackListeners = {
  "diaper-rub-back": void;
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
//   const result = InsertCriteria?.(player) ?? null;
//   let message = result?.toMessage();
//   if (Player.IsRestrained()) message = "You are restrained.";
//   return CriteriaResult.fromMessage(message);
// }

export const diaperRubBack: CombinedAction = {
  activity: {
    Name: "Diaper Rub Bottom",
    Target: [ABCLTarget.Others("ItemButt")],
    MaxProgress: 0,
    Prerequisite: [Prerequisiter(InsertCriteria), Prerequisiter(Criteria, true)],

    useImage: <ActivityImageSetting>`${publicURL}/activity/diaperRubBack.png`,
    run: (player, sender, info) => RunAction(info, diaperRubBackRequest),
  },
  listeners: {
    "diaper-rub-back": ({ Sender }) => diaperRubBackFunction(getCharacter(Sender!) ?? Player),
  },
};
