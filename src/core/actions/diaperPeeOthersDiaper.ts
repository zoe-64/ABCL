import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

const diaperPeeOthersDiaperRequest = (player: Character, volume: number) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-pee-others-diaper", { volume: volume }, player.MemberNumber);
  abclPlayer.stats.BladderValue = 0;
  diaperPeeOthersDiaperFunction(player, volume);
};
export const diaperPeeOthersDiaperFunction = (player: Character, volume: number) => {
  const otherMessage = "%OPP_NAME% tugs %NAME%'s diaper waistband and pees inside.";
  sendABCLAction(replace_template(otherMessage, player), undefined, "playerActivity", player);
  if (Player.ABCL.Settings.ExpressionsByActivities) {
    CharacterSetFacialExpression(Player, "Blush", "Low", 8);
    CharacterSetFacialExpression(Player, "Eyebrows", "Soft", 8);

    CharacterSetFacialExpression(Player, "Eyes", "Surprised", 5);
  }
  abclPlayer.stats.WetnessValue += volume ?? 0;
};
export type diaperPeeOthersDiaperListeners = {
  "diaper-pee-others-diaper": { volume: number };
};

export const diaperPeeOthersDiaper: CombinedAction = {
  activity: {
    ID: "pee-in-diaper",
    Name: "Pees in Diaper",
    Image: `${publicURL}/activity/diaperPeeOthersDiaper.png`,
    Target: ["ItemPelvis"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperPeeOthersDiaperRequest(player, abclPlayer.stats.BladderValue),
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
      if (player === Player) message ??= "You can't pee in your own diaper."; // that's a funny one
      if (abclPlayer.stats.BladderFullness < 0.15) message ??= "Your bladder is empty.";

      if (!silent && message) sendChatLocal(message);
      return {
        success: message == null,
        message: message == null ? undefined : message,
      };
    },
  },
  listeners: {
    "diaper-pee-others-diaper": ({ Sender }, { volume }) => diaperPeeOthersDiaperFunction(getCharacter(Sender!) ?? Player, volume),
  },
};
