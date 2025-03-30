import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper } from "../player/diaper";
import { getCharacter, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";

const diaperSquishBackRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-squish-back", undefined, player.MemberNumber);

  diaperSquishBackFunction(player);
};
export const diaperSquishBackFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = "%NAME% squishes %POSSESSIVE% diapered butt.";
  const otherMessage = "%OPP_NAME% squishes %NAME%'s diapered butt.";
  SendAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
};

export type diaperSquishBackListeners = {
  "diaper-squish-back": void;
};

export const diaperSquishBack: CombinedAction = {
  activity: {
    ID: "diaper-squish-back",
    Name: "Diaper Squish",
    Image: `${publicURL}/activity/diaperSquishBack.png`,
    Target: ["ItemButt"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperSquishBackRequest(player),
    Criteria: (player: Character) => isABCLPlayer(player) && hasDiaper(player) && !Player.IsRestrained(),
  },
  listeners: {
    "diaper-squish-back": ({ Sender }) => diaperSquishBackRequest(getCharacter(Sender!) ?? Player),
  },
};
