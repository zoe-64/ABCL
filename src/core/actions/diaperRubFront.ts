import { CombinedAction } from "../../types/types";
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

export const diaperRubFront: CombinedAction = {
  activity: {
    ID: "diaper-rub-front",
    Name: "Diaper Rub",
    Image: `${publicURL}/activity/diaperRubFront.png`,
    Target: ["ItemVulva"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperRubFrontRequest(player),
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
      if (Player.IsRestrained()) message ??= "You are restrained.";
      if (!silent && message) sendChatLocal(message);
      return {
        success: message == null,
        message: message == null ? undefined : message,
      };
    },
  },
  listeners: {
    "diaper-rub-front": ({ Sender }) => diaperRubFrontFunction(getCharacter(Sender!) ?? Player),
  },
};
