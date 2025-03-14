import { CombinedAction } from "../../types/types";
import { abclPlayer } from "../player/player";
import { sendChatLocal } from "../utils";

const useToiletFunction = () => {
  const isTooEarly = abclPlayer.stats.BladderFullness < 0.3 && abclPlayer.stats.BowelFullness < 0.3;
  const isPossible = !isTooEarly;
  const isGood = abclPlayer.stats.BladderFullness > 0.6 || abclPlayer.stats.BowelFullness > 0.6;
  if (isTooEarly) return;
  if (isPossible) {
    abclPlayer.stats.BladderFullness = 0;
    abclPlayer.stats.BowelFullness = 0;
    sendChatLocal("You sit down and use the toilet.");
  }
  if (isGood) {
    abclPlayer.stats.MentalRegression -= 0.02;
    abclPlayer.stats.Incontinence -= 0.02;
  }
};

export const useToilet: CombinedAction = {
  activity: {
    ID: "toilet",
    Name: "Sit and Use Toilet",
    Image: `${publicURL}/activity/toilet-temp.png`,
    OnClick: (player: Character) => {
      useToiletFunction();
    },
    TargetSelf: ["ItemButt"],
    Criteria: (player: Character) => {
      if (abclPlayer.stats.MentalRegression > 0.3) {
      }
      return abclPlayer.stats.MentalRegression < 0.3;
    },
  },
  command: {
    Tag: "use-toilet",
    Description: ` Sit down and use the toilet.`,
    Action: () => {
      if (!useToilet.activity!.Criteria!(Player)) sendChatLocal("You try to use the toilet but you can't seem to get anything out.");
      useToilet.activity!.Criteria!(Player) && useToiletFunction();
    },
  },
};
