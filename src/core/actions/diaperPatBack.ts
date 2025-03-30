import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper } from "../player/diaper";
import { getCharacter, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";

const diaperPatBackRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-pat-back", undefined, player.MemberNumber);

  diaperPatBackFunction(player);
};
export const diaperPatBackFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = "%NAME% pats %POSSESSIVE% diapered butt.";
  const otherMessage = "%OPP_NAME% pats %NAME%'s diapered butt.";
  SendAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
};

export type diaperPatBackListeners = {
  "diaper-pat-back": void;
};

export const diaperPatBack: CombinedAction = {
  activity: {
    ID: "diaper-pat-back",
    Name: "Diaper Pat",
    Image: `${publicURL}/activity/diaperPatBack.png`,
    Target: ["ItemButt"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperPatBackRequest(player),
    Criteria: (player: Character) => isABCLPlayer(player) && hasDiaper(player) && !Player.IsRestrained(),
  },
  listeners: {
    "diaper-pat-back": ({ Sender }) => diaperPatBackRequest(getCharacter(Sender!) ?? Player),
  },
};
