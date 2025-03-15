import { CombinedAction } from "../../types/types";
import { abclPlayer } from "../player/player";
import { SendAction } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

const useToiletFunction = () => {
  const isTooEarly = abclPlayer.stats.BladderFullness < 0.3 && abclPlayer.stats.BowelFullness < 0.3;
  const isGood = abclPlayer.stats.BladderFullness > 0.6 || abclPlayer.stats.BowelFullness > 0.6;
  if (isTooEarly) return sendChatLocal("You try to use the toilet but you can't seem to get anything out.");
  let additionalText = "";
  if (isGood) {
    additionalText = "and feels releaved";
    abclPlayer.stats.MentalRegression -= 0.02;
    abclPlayer.stats.Incontinence -= 0.02;
  }
  abclPlayer.stats.BladderFullness = 0;
  abclPlayer.stats.BowelFullness = 0;
  SendAction("%NAME% goes to the bathroom uses the toilet " + additionalText + ".");
};

export const useToilet: CombinedAction = {
  activity: {
    ID: "toilet",
    Name: "Sit and Use Toilet",
    Image: `${publicURL}/activity/toilet-temp.png`,
    OnClick: (player: Character) => useToiletFunction(),
    Criteria: (player: Character) => abclPlayer.stats.MentalRegression < 0.3,
    TargetSelf: ["ItemButt"],
  },
  command: {
    Tag: "use-toilet",
    Action: () => {
      if (!useToilet.activity!.Criteria!(Player))
        return sendChatLocal("You feel uncomfortable, the toilet is cold and hard almost like ice. You can't use it.");
      useToiletFunction();
    },
    Description: ` Sit down and use the toilet.`,
  },
};
