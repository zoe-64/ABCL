import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper } from "../player/diaper";
import { getCharacter, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";

const diaperSquishFrontRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-squish-front", undefined, player.MemberNumber);

  diaperSquishFrontFunction(player);
};
export const diaperSquishFrontFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = "%NAME% squishes %POSSESSIVE% diapered crotch.";
  const otherMessage = "%OPP_NAME% squishes %NAME%'s diapered crotch.";
  SendAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
};

export type diaperSquishFrontListeners = {
  "diaper-squish-front": void;
};

export const diaperSquishFront: CombinedAction = {
  activity: {
    ID: "diaper-squish-front",
    Name: "Diaper Squish Crotch",
    Image: `${publicURL}/activity/diaperSquishFront.png`,
    Target: ["ItemVulva"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperSquishFrontRequest(player),
    Criteria: (player: Character) => isABCLPlayer(player) && hasDiaper(player) && !Player.IsRestrained(),
  },
  listeners: {
    "diaper-squish-front": ({ Sender }) => diaperSquishFrontFunction(getCharacter(Sender!) ?? Player),
  },
};
