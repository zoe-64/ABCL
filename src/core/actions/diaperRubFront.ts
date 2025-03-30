import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";

const diaperRubFrontRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-rub-front", undefined, player.MemberNumber);

  diaperRubFrontFunction(player);
};
export const diaperRubFrontFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = "%NAME% rubs %POSSESSIVE% diapered crotch.";
  const otherMessage = "%OPP_NAME% rubs %NAME%'s diapered crotch.";
  SendAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
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
    Target: ["ItemVulvaPiercings"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperRubFrontRequest(player),
    Criteria: (player: Character) => isABCLPlayer(player) && hasDiaper(player) && !Player.IsRestrained(),
  },
  listeners: {
    "diaper-rub-front": ({ Sender }) => diaperRubFrontRequest(getCharacter(Sender!) ?? Player),
  },
};
