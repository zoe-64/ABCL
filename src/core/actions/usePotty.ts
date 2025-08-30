import { INCONTINENCE_ON_POTTY_USE } from "../../constants";
import { CombinedAction } from "../../types/types";
import { hasDiaper, isDiaperLocked } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { sendABCLAction } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

export const usePottyFunction = () => {
  const incontinenceOffset = 0.3 * abclPlayer.stats.Incontinence;
  const isGood = abclPlayer.stats.BladderFullness > 0.6 || abclPlayer.stats.BowelFullness > 0.6;
  const isTooEarly = abclPlayer.stats.BladderFullness < 0.3 - incontinenceOffset && abclPlayer.stats.BowelFullness < 0.3 - incontinenceOffset;
  const isTooFarGone = abclPlayer.stats.MentalRegression > 0.9;
  const isEmbarrassed = abclPlayer.stats.MentalRegression < 0.3;
  if (isTooEarly) {
    sendABCLAction("%NAME% tries to use the potty but can't seem to get anything out.", undefined, "usePotty");
    return;
  }
  abclPlayer.stats.BowelFullness = 0;
  abclPlayer.stats.BladderFullness = 0;
  let additionalText = "";
  if (isEmbarrassed) {
    additionalText = "and feels embarrased";
    if (Player.ABCL.Settings.ExpressionsByActivities) {
      CharacterSetFacialExpression(Player, "Blush", "Low", 10);
    }
    abclPlayer.stats.MentalRegression += 0.04 * abclPlayer.stats.MentalRegressionModifier;
  }
  if (isGood && !isTooFarGone) {
    additionalText += isEmbarrassed ? " but is releaved" : "and feels releaved";

    abclPlayer.stats.Incontinence += INCONTINENCE_ON_POTTY_USE;
    abclPlayer.stats.MentalRegression -= 0.02 * abclPlayer.stats.MentalRegressionModifier;
    if (Player.ABCL.Settings.ExpressionsByActivities) {
      CharacterSetFacialExpression(Player, "Mouth", "Happy", 8);
    }
  }
  sendABCLAction("%NAME% sits down and uses the potty " + additionalText + ".", undefined, "usePotty");
};

export const usePotty: CombinedAction = {
  activity: {
    ID: "potty",
    Name: "Sit and Use Potty",
    Image: `${publicURL}/activity/potty-temp.png`,
    OnClick: (player: Character, group) => usePottyFunction(),
    TargetSelf: ["ItemButt"],
    Criteria: (player: Character) => !(hasDiaper(player) && isDiaperLocked()) && !Player.IsRestrained(),
  },
  command: {
    Tag: "use-potty",
    Action: (args, msg, parsed) => {
      if (!usePotty.activity?.Criteria!(Player)) return sendChatLocal("You are restrained or diaper is locked.");
      usePottyFunction();
    },
    Description: ` Sit down and use the potty.`,
  },
};
