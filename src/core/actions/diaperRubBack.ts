import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { getDiaperVerb, hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction } from "../player/playerUtils";

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

export const diaperRubBack: CombinedAction = {
  activity: {
    ID: "diaper-rub-back",
    Name: "Diaper Rub Bottom",
    Image: `${publicURL}/activity/diaperRubBack.png`,
    Target: ["ItemButt"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperRubBackRequest(player),
    InsertCriteria: function (player: Character) {
      let message = null;
      if (!isABCLPlayer(player)) message ??= "They are not an ABCL player.";
      if (!hasDiaper(player)) message ??= "They are not diapered.";
      return {
        success: message == null,
        message: message == null ? undefined : message,
      };
    },
    Criteria: function (player: Character, silent?: boolean) {
      const result = this.InsertCriteria?.(player) ?? null;
      let message = result?.message ?? null;
      if (Player.IsRestrained()) message = "You are restrained.";
      return {
        success: message == null,
        message: message == null ? undefined : message,
      };
    },
  },
  listeners: {
    "diaper-rub-back": ({ Sender }) => diaperRubBackFunction(getCharacter(Sender!) ?? Player),
  },
};
