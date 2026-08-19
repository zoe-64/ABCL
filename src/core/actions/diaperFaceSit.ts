import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

const diaperFaceSitRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) {
    ActivityEffectFlat(Player, Player, 5, "ItemButt", 1);
    return sendDataToAction("diaper-face-sit", undefined, player.MemberNumber);
  }
  diaperFaceSitFunction(player);
};
export const diaperFaceSitFunction = (player: Character) => {
  const otherMessage = "%OPP_NAME% sits with %OPP_POSSESSIVE% diapered butt on %NAME%'s face.";
  sendABCLAction(replace_template(otherMessage, player), undefined, "playerActivity", player);
  abclPlayer.stats.MentalRegression += 0.03 * abclPlayer.stats.MentalRegressionModifier;
  ActivityEffectFlat(Player, Player, 8, "ItemNose", 1);
  if (Player.ABCL.Settings.ExpressionsByActivities) {
    CharacterSetFacialExpression(Player, "Blush", "ShortBreath", 30);
    CharacterSetFacialExpression(Player, "Eyebrows", "Soft", 30);

    CharacterSetFacialExpression(Player, "Eyes", "Dizzy", 30);
  }
};
export type diaperFaceSitListeners = {
  "diaper-face-sit": void;
};

export const diaperFaceSit: CombinedAction = {
  activity: {
    ID: "diaper-face-sit",
    Name: "Sits with Diaper on Face",
    Image: `${publicURL}/activity/diaperFaceSit.png`,
    Target: ["ItemNose"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperFaceSitRequest(player),
    InsertCriteria: function (player: Character) {
      let message = null;
      if (!isABCLPlayer(player)) message ??= "They are not an ABCL player.";
      if (!hasDiaper(Player)) message ??= "You are not diapered.";
      if (player.MemberNumber === Player.MemberNumber) message = "You can't sit with your own diaper on your face.";
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
    "diaper-face-sit": ({ Sender }) => diaperFaceSitFunction(getCharacter(Sender!) ?? Player),
  },
};
