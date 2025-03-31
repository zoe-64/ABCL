import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";

const diaperPeeOthersDiaperRequest = (player: Character, volume: number) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-pee-others-diaper", { volume: volume }, player.MemberNumber);
  abclPlayer.stats.BladderValue = 0;
  diaperPeeOthersDiaperFunction(player, volume);
};
export const diaperPeeOthersDiaperFunction = (player: Character, volume: number) => {
  const otherMessage = "%OPP_NAME% tugs %NAME%'s diaper waistband and pees inside.";
  SendAction(replace_template(otherMessage, player), undefined, "playerActivity", player);
  CharacterSetFacialExpression(Player, "Blush", "Low", 8);
  CharacterSetFacialExpression(Player, "Eyebrows", "Soft", 8);

  CharacterSetFacialExpression(Player, "Eyes", "Surprised", 5);
  abclPlayer.stats.WetnessValue += volume ?? 0;
};
export type diaperPeeOthersDiaperListeners = {
  "diaper-pee-others-diaper": { volume: number };
};

export const diaperPeeOthersDiaper: CombinedAction = {
  activity: {
    ID: "pee-in-diaper",
    Name: "Pees in Diaper",
    Image: `${publicURL}/activity/diaperPeeOthersDiaper.png`,
    Target: ["ItemPelvis"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperPeeOthersDiaperRequest(player, abclPlayer.stats.BladderValue),
    Criteria: (player: Character) =>
      isABCLPlayer(player) && hasDiaper(player) && abclPlayer.stats.BladderValue > 0 && player !== Player && !Player.IsRestrained(),
  },
  listeners: {
    "diaper-pee-others-diaper": ({ Sender }, { volume }) => diaperPeeOthersDiaperFunction(getCharacter(Sender!) ?? Player, volume),
  },
};
