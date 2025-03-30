import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";

const diaperRubBackRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-rub-back", undefined, player.MemberNumber);

  diaperRubBackFunction(player);
};
export const diaperRubBackFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = "%NAME% rubs %POSSESSIVE% diapered butt.";
  const otherMessage = "%OPP_NAME% rubs %NAME%'s diapered butt.";
  SendAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
  if (abclPlayer.stats.Incontinence > Math.random()) {
    {
      abclPlayer.attemptSoiling();
    }
  }
};

export type diaperRubBackListeners = {
  "diaper-rub-back": void;
};

export const diaperRubBack: CombinedAction = {
  activity: {
    ID: "diaper-rub-back",
    Name: "Diaper Rub",
    Image: `${publicURL}/activity/diaperRubBack.png`,
    Target: ["ItemButt"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperRubBackFunction(player),
    Criteria: (player: Character) => isABCLPlayer(player) && hasDiaper(player) && !Player.IsRestrained(),
  },
  listeners: {
    "diaper-rub-back": ({ Sender }) => diaperRubBackRequest(getCharacter(Sender!) ?? Player),
  },
};
