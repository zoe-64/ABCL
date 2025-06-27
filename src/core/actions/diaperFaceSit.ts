import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, SendABCLAction } from "../player/playerUtils";

const diaperFaceSitRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) {
    ActivityEffectFlat(Player, Player, 5, "ItemButt", 1);
    return sendDataToAction("diaper-face-sit", undefined, player.MemberNumber);
  }
  diaperFaceSitFunction(player);
};
export const diaperFaceSitFunction = (player: Character) => {
  const otherMessage = "%OPP_NAME% sits with %OPP_POSSESSIVE% diapered butt on %NAME%'s face.";
  SendABCLAction(replace_template(otherMessage, player), undefined, "playerActivity", player);
  abclPlayer.stats.MentalRegression += 0.03 * abclPlayer.stats.MentalRegressionModifier;
  ActivityEffectFlat(Player, Player, 8, "ItemNose", 1);
  CharacterSetFacialExpression(Player, "Blush", "ShortBreath", 30);
  CharacterSetFacialExpression(Player, "Eyebrows", "Soft", 30);

  CharacterSetFacialExpression(Player, "Eyes", "Dizzy", 30);
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
    Criteria: (player: Character) => hasDiaper(Player) && isABCLPlayer(player) && !Player.IsRestrained() && player.MemberNumber !== Player.MemberNumber,
  },
  listeners: {
    "diaper-face-sit": ({ Sender }) => diaperFaceSitFunction(getCharacter(Sender!) ?? Player),
  },
};
