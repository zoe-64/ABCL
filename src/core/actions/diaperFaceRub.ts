import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction } from "../player/playerUtils";

const diaperFaceRubRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) {
    ActivityEffectFlat(Player, Player, 12, "ItemVulva", 1);
    return sendDataToAction("diaper-face-rub", undefined, player.MemberNumber);
  }
  diaperFaceRubFunction(player);
};
export const diaperFaceRubFunction = (player: Character) => {
  const otherMessage = "%OPP_NAME% rubs %OPP_POSSESSIVE% diaper against %NAME%'s face.";
  sendABCLAction(replace_template(otherMessage, player), undefined, "playerActivity", player);
  ActivityEffectFlat(player, Player, 8, "ItemVulva", 1);
  if (Player.ABCL.Settings.ExpressionsByActivities) {
    CharacterSetFacialExpression(Player, "Blush", "Medium", 5);
    CharacterSetFacialExpression(Player, "Eyebrows", "Soft", 10);
    CharacterSetFacialExpression(Player, "Eyes", "Dizzy", 10);
  }
  abclPlayer.stats.MentalRegression += 0.02 * abclPlayer.stats.MentalRegressionModifier;
};
export type diaperFaceRubListeners = {
  "diaper-face-rub": void;
};

export const diaperFaceRub: CombinedAction = {
  activity: {
    ID: "diaper-face-rub",
    Name: "Rub Diaper Against Face",
    Image: `${publicURL}/activity/diaperFaceRub.png`,
    Target: ["ItemNose"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperFaceRubRequest(player),
    Criteria: (player: Character) => {
      if (!isABCLPlayer(player))
        return {
          success: false,
          message: "They are not an ABCL player.",
        };
      if (Player.IsRestrained())
        return {
          success: false,
          message: "You are restrained.",
        };
      if (!hasDiaper(Player))
        return {
          success: false,
          message: "You are not diapered.",
        };
      if (player.MemberNumber === Player.MemberNumber)
        return {
          success: false,
          message: "You can't rub your own diaper against your face.",
        };
      return {
        success: true,
      };
    },
  },
  listeners: {
    "diaper-face-rub": ({ Sender }) => diaperFaceRubFunction(getCharacter(Sender!) ?? Player),
  },
};
