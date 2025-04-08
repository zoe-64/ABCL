import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { getDiaperVerb, hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { getCharacter, isABCLPlayer, replace_template, SendAction } from "../player/playerUtils";

const diaperRubFrontRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-rub-front", undefined, player.MemberNumber);

  diaperRubFrontFunction(player);
};
export const diaperRubFrontFunction = (player: Character) => {
  const diaperVerb = getDiaperVerb(Player);
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = `%NAME% blushes as %PRONOUN% rubs circles over the front of %POSSESSIVE% ${diaperVerb} diaper, biting %POSSESSIVE% lip as %PRONOUN% grinds down into %POSSESSIVE% own hand.`;
  const otherMessage = `%OPP_NAME% rubs up and down %NAME%'s ${diaperVerb} diaper, %OPP_POSSESSIVE% fingers pressing into the ${diaperVerb} padding over the front and between %POSSESSIVE% legs.`;
  SendAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
  ActivityEffectFlat(Player, Player, 10, "ItemVulva", 1);
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
    Target: ["ItemVulva"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperRubFrontRequest(player),
    Criteria: (player: Character) => isABCLPlayer(player) && hasDiaper(player) && !Player.IsRestrained(),
  },
  listeners: {
    "diaper-rub-front": ({ Sender }) => diaperRubFrontFunction(getCharacter(Sender!) ?? Player),
  },
};
