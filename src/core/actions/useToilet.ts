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
  const canUseBathroomWithDiaper = Player.ABCL.Settings.CanUseBathroomWithDiaper && !isDiaperLocked(Player);

  if (isTooEarly) {
    return sendChatLocal("You try to use the toilet but you can't seem to get anything out.");
  }

  if ((hasDiaper(Player) && !canUseBathroomWithDiaper) || !abclPlayer.settings.CanUseToilet) {
    abclPlayer.wet(true, "toilet");
    abclPlayer.soil(true, "toilet");
    return;
  }
  let actionMessage = "";
  let additionalText = "";
  abclPlayer.stats.BladderFullness = 0;
  abclPlayer.stats.BowelFullness = 0;
  if (isGood) {
    additionalText = "and feels releaved";
    abclPlayer.stats.MentalRegression -= 0.02 * abclPlayer.stats.MentalRegressionModifier;
    abclPlayer.stats.Incontinence += INCONTINENCE_ON_TOILET_USE;
  }
  if (hasDiaper(Player) && canUseBathroomWithDiaper) {
    actionMessage = `%NAME% pulls %POSSESSIVE% diaper down, sits on the toilet and uses the toilet ${additionalText}.`;
  } else {
    actionMessage = `%NAME% sits down and uses the toilet ${additionalText}.`;
  }
  sendABCLAction(actionMessage, undefined, "useToilet");
};

export const useToilet: CombinedAction = {
  activity: {
    ID: "toilet",
    Name: "Sit and Use Toilet",
    Image: `${publicURL}/activity/toilet-temp.png`,
    OnClick: (player, group) => useToiletFunction(),
    // if the regression is too high, deny toilet usage
    Criteria: player => {
      if (abclPlayer.stats.MentalRegression >= 0.3)
        return {
          success: false,
          message: "You feel uncomfortable, the toilet is cold and hard almost like ice. You can't use it.",
        };
      if (!abclPlayer.settings.CanUseBathroomWithDiaper || !abclPlayer.settings.CanUseToilet)
        return {
          success: true,
        };
      if (!hasDiaper(player) && isDiaperLocked())
        return {
          success: false,
          message: "You can't use the toilet while your diaper is locked.",
        };
      if (Player.IsRestrained())
        return {
          success: false,
          message: "You are restrained.",
        };
      return {
        success: true,
      };
    },
    TargetSelf: ["ItemButt"],
  },
  command: {
    Tag: "use-toilet",
    Action: () => {
      // if the regression is too high, deny toilet usage
      if (abclPlayer.stats.MentalRegression >= 0.3) {
        if (Player.ABCL.Settings.ExpressionsByActivities) {
          CharacterSetFacialExpression(Player, "Eyes", "Dizzy", 8);
        }
        return sendChatLocal("You feel uncomfortable, the toilet is cold and hard almost like ice. You can't use it.");
      }
      if (hasDiaper() && (Player.IsRestrained() || isDiaperLocked())) return sendChatLocal("You can't use the toilet while your diaper is locked.");

      useToiletFunction();
    },
    Description: ` Sit down and use the toilet.`,
  },
};
