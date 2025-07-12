import { INCONTINENCE_ON_TOILET_USE } from "../../constants";
import { CombinedAction } from "../../types/types";
import { hasDiaper, isDiaperLocked } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { sendABCLAction } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

export const useToiletFunction = () => {
  const incontinenceOffset = 0.3 * abclPlayer.stats.Incontinence;
  const isTooEarly = abclPlayer.stats.BladderFullness < 0.3 && abclPlayer.stats.BowelFullness < 0.3;
  const isGood = abclPlayer.stats.BladderFullness > 0.6 - incontinenceOffset || abclPlayer.stats.BowelFullness > 0.6 - incontinenceOffset;
  if (isTooEarly) return sendChatLocal("You try to use the toilet but you can't seem to get anything out.");
  let additionalText = "";
  if (isGood) {
    additionalText = "and feels releaved";
    abclPlayer.stats.MentalRegression -= 0.02 * abclPlayer.stats.MentalRegressionModifier;
    abclPlayer.stats.Incontinence += INCONTINENCE_ON_TOILET_USE;
  }
  abclPlayer.stats.BladderFullness = 0;
  abclPlayer.stats.BowelFullness = 0;
  sendABCLAction("%NAME% goes to the bathroom and uses the toilet " + additionalText + ".", undefined, "useToilet");
};

export const useToilet: CombinedAction = {
  activity: {
    ID: "toilet",
    Name: "Sit and Use Toilet",
    Image: `${publicURL}/activity/toilet-temp.png`,
    OnClick: (player, group) => useToiletFunction(),
    Criteria: player => abclPlayer.stats.MentalRegression < 0.3 && !(hasDiaper(player) && isDiaperLocked()) && !Player.IsRestrained(),
    TargetSelf: ["ItemButt"],
  },
  command: {
    Tag: "use-toilet",
    Action: () => {
      if (abclPlayer.stats.MentalRegression < 0.3) {
        CharacterSetFacialExpression(Player, "Eyes", "Dizzy", 8);
        return sendChatLocal("You feel uncomfortable, the toilet is cold and hard almost like ice. You can't use it.");
      }
      if (hasDiaper() && (Player.IsRestrained() || isDiaperLocked())) return sendChatLocal("You can't use the toilet while your diaper is locked.");

      useToiletFunction();
    },
    Description: ` Sit down and use the toilet.`,
  },
};
