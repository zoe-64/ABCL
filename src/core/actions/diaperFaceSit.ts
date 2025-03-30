import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";

const diaperFaceSitRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-face-sit", undefined, player.MemberNumber);
  diaperFaceSitFunction(player);
};
export const diaperFaceSitFunction = (player: Character) => {
  const otherMessage = "%OPP_NAME% sits with her diapered butt on %NAME%'s face.";
  SendAction(replace_template(otherMessage, player), undefined, "playerActivity", player);
  abclPlayer.stats.MentalRegression += 0.03;
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
    "diaper-face-sit": ({ Sender }) => diaperFaceSitRequest(getCharacter(Sender!) ?? Player),
  },
};
