import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { getDiaperVerb, hasDiaper } from "../player/diaper";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

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

export const diaperPatBack: CombinedAction = {
  activity: {
    ID: "diaper-pat-back",
    Name: "Diaper Pat Bottom",
    Image: `${publicURL}/activity/diaperPatBack.png`,
    Target: ["ItemButt"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperPatBackRequest(player),
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
    "diaper-pat-back": ({ Sender }) => diaperPatBackFunction(getCharacter(Sender!) ?? Player),
  },
};
