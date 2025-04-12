import { CombinedAction } from "../../types/types";
import { sendDataToAction } from "../hooks";
import { getDiaperVerb, hasDiaper } from "../player/diaper";
import { getCharacter, isABCLPlayer, replace_template, SendABCLAction } from "../player/playerUtils";

const diaperPatBackRequest = (player: Character) => {
  if (player.MemberNumber !== Player.MemberNumber) return sendDataToAction("diaper-pat-back", undefined, player.MemberNumber);
  diaperPatBackFunction(player);
};
export const diaperPatBackFunction = (player: Character) => {
  const diaperVerb = getDiaperVerb(Player);
  const diaperSound = diaperVerb === "dry" ? "crinkles" : "sloshes";
  const diaperSoundSingular = diaperVerb === "dry" ? "crinkle" : "slosh";
  const isSelf = player.MemberNumber === Player.MemberNumber;
  const selfMessage = `%NAME% playfully pats %POSSESSIVE% ${diaperVerb} diapered butt, enjoying the soft ${diaperSound} it makes.`;
  const otherMessage = `%OPP_NAME% gives %NAME%'s diapered butt a playful pat, as the ${diaperVerb} diaper ${diaperSoundSingular} softly.`;
  ActivityEffectFlat(Player, Player, 1, "ItemButt", 1);
  SendABCLAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "playerActivity", player);
};

export type diaperPatBackListeners = {
  "diaper-pat-back": void;
};

export const diaperPatBack: CombinedAction = {
  activity: {
    ID: "diaper-pat-back",
    Name: "Diaper Pat Bottom",
    Image: `${publicURL}/activity/diaperPatBack.png`,
    Target: ["ItemButt"],
    OnClick: (player: Character, group: AssetGroupItemName) => diaperPatBackRequest(player),
    Criteria: (player: Character) => isABCLPlayer(player) && hasDiaper(player) && !Player.IsRestrained(),
  },
  listeners: {
    "diaper-pat-back": ({ Sender }) => diaperPatBackFunction(getCharacter(Sender!) ?? Player),
  },
};
