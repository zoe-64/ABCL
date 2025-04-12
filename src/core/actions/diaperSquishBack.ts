import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { getDiaperVerb, hasDiaper } from "../player/diaper";
import { getCharacter, isABCLPlayer, replace_template, SendABCLAction } from "../player/playerUtils";

const diaperSquishBackRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-squish-back", undefined, player.MemberNumber);

  diaperSquishBackFunction(player);
};
export const diaperSquishBackFunction = (player: Character) => {
  const diaperVerb = getDiaperVerb(Player);
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = `%NAME% gives %POSSESSIVE% ${diaperVerb} diapered butt a squeeze, blushing a little as it squishes under %POSSESSIVE% hand.`;
  const otherMessage = `%OPP_NAME% gives %NAME%'s ${diaperVerb} diapered butt a teasing squeeze, smiling as %OPP_PRONOUN% squishes and kneads the ${diaperVerb} padding.`;
  SendABCLAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
};

export type diaperSquishBackListeners = {
  "diaper-squish-back": void;
};

export const diaperSquishBack: CombinedAction = {
  activity: {
    ID: "diaper-squish-back",
    Name: "Diaper Squish Bottom",
    Image: `${publicURL}/activity/diaperSquishBack.png`,
    Target: ["ItemButt"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperSquishBackRequest(player),
    Criteria: (player: Character) => isABCLPlayer(player) && hasDiaper(player) && !Player.IsRestrained(),
  },
  listeners: {
    "diaper-squish-back": ({ Sender }) => diaperSquishBackFunction(getCharacter(Sender!) ?? Player),
  },
};
