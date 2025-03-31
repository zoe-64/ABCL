import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper } from "../player/diaper";
import { getCharacter, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";

const diaperPatFrontRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-pat-front", undefined, player.MemberNumber);

  diaperPatFrontFunction(player);
};
export const diaperPatFrontFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = "%NAME% pats %POSSESSIVE% diapered crotch.";
  const otherMessage = "%OPP_NAME% pats %NAME%'s diapered crotch.";
  SendAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
  ActivityEffectFlat(Player, Player, 1, "ItemVulva", 1);
};

export type diaperPatFrontListeners = {
  "diaper-pat-front": void;
};

export const diaperPatFront: CombinedAction = {
  activity: {
    ID: "diaper-pat-front",
    Name: "Diaper Pat Crotch",
    Image: `${publicURL}/activity/diaperPatFront.png`,
    Target: ["ItemVulva"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperPatFrontRequest(player),
    Criteria: (player: Character) => isABCLPlayer(player) && hasDiaper(player) && !Player.IsRestrained(),
  },
  listeners: {
    "diaper-pat-front": ({ Sender }) => diaperPatFrontFunction(getCharacter(Sender!) ?? Player),
  },
};
