import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";

const diaperFaceRubRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-face-rub", undefined, player.MemberNumber);
  diaperFaceRubFunction(player);
};
export const diaperFaceRubFunction = (player: Character) => {
  const otherMessage = "%OPP_NAME% rubs %OPP_POSSESSIVE% diaper against %NAME%'s face.";
  SendAction(replace_template(otherMessage, player), undefined, "playerActivity", player);
  abclPlayer.stats.MentalRegression += 0.02;
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
    Criteria: (player: Character) => hasDiaper(player) && isABCLPlayer(player) && !Player.IsRestrained() && player.MemberNumber !== Player.MemberNumber,
  },
  listeners: {
    "diaper-face-rub": ({ Sender }) => diaperFaceRubRequest(getCharacter(Sender!) ?? Player),
  },
};
