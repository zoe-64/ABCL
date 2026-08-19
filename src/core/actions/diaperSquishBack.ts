import { CombinedAction } from "../../types/types";
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

export const diaperSquishBack: CombinedAction = {
  activity: {
    ID: "diaper-squish-back",
    Name: "Diaper Squish Bottom",
    Image: `${publicURL}/activity/diaperSquishBack.png`,
    Target: ["ItemButt"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperSquishBackRequest(player),
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
    "diaper-squish-back": ({ Sender }) => diaperSquishBackFunction(getCharacter(Sender!) ?? Player),
  },
};
