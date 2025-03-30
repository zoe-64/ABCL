import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";

const diaperPourRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-pour-front", undefined, player.MemberNumber);

  diaperPourFunction(player);
};
export const diaperPourFunction = (player: Character) => {
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = "%NAME% pours water in %POSSESSIVE% diaper.";
  const otherMessage = "%OPP_NAME% pours water in %NAME%'s diaper.";
  SendAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
  abclPlayer.stats.WetnessValue += 500;
};

export type diaperPourListeners = {
  "diaper-pour": void;
};

export const diaperPour: CombinedAction = {
  activity: {
    ID: "diaper-pour",
    Name: "Pour Water in Diaper",
    Image: `${publicURL}/activity/diaperPour.png`,
    Target: ["ItemPelvis"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperPourRequest(player),
    Criteria: (player: Character) => hasDiaper(player) && isABCLPlayer(player) && !Player.IsRestrained(), // Assume this is correct? target needs to have Diaper, ABCL and player can't do it while restrained?
  },
  listeners: {
    "diaper-pour": ({ Sender }) => diaperPourRequest(getCharacter(Sender!) ?? Player),
  },
};
