import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { getDiaperVerb, hasDiaper } from "../player/diaper";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

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

export const diaperSquishFront: CombinedAction = {
  activity: {
    ID: "diaper-squish-front",
    Name: "Diaper Squish Crotch",
    Image: `${publicURL}/activity/diaperSquishFront.png`,
    Target: ["ItemVulva"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperSquishFrontRequest(player),
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
    "diaper-squish-front": ({ Sender }) => diaperSquishFrontFunction(getCharacter(Sender!) ?? Player),
  },
};
