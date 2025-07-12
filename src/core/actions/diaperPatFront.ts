import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { getDiaperVerb, hasDiaper } from "../player/diaper";
import { getCharacter, isABCLPlayer, replace_template, sendABCLAction } from "../player/playerUtils";

const diaperPatFrontRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-pat-front", undefined, player.MemberNumber);

  diaperPatFrontFunction(player);
};
export const diaperPatFrontFunction = (player: Character) => {
  const diaperVerb = getDiaperVerb(Player);
  const diaperSound = diaperVerb === "dry" ? "crinkles" : "sloshes";
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = `%NAME% pats the front of %POSSESSIVE% ${diaperVerb} diaper playfully, smiling at the soft ${diaperSound}.`;
  const otherMessage = `%OPP_NAME% playfully pats the front of %NAME%'s ${diaperVerb} diaper, as the padding ${diaperSound} softly.`;
  sendABCLAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
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
