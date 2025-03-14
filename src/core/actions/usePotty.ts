import { CombinedAction } from "../../types/types";
import { abclPlayer } from "../player/player";
import { sendChatLocal } from "../utils";

const usePottyFunction = () => {
  const isTooEarly = abclPlayer.stats.BladderFullness < 0.3 && abclPlayer.stats.BowelFullness < 0.3;
  const isPossible = !isTooEarly;
  const isGood = abclPlayer.stats.BladderFullness > 0.6 || abclPlayer.stats.BowelFullness > 0.6;
  const isEmbarrassed = abclPlayer.stats.MentalRegression < 0.3;
  const isTooFarGone = abclPlayer.stats.MentalRegression > 0.9;
  if (isTooEarly) {
    sendChatLocal("You sit down but you can't seem to get anything out.");
    return;
  }
  if (isPossible) {
    abclPlayer.stats.BladderFullness = 0;
    abclPlayer.stats.BowelFullness = 0;
    sendChatLocal("You sit down and use the potty.");
  }
  if (isEmbarrassed) {
    abclPlayer.stats.MentalRegression += 0.04;
  }
  if (isGood && !isTooFarGone) {
    abclPlayer.stats.MentalRegression -= 0.02;
    abclPlayer.stats.Incontinence -= 0.02;
  }
};

export const usePotty: CombinedAction = {
  activity: {
    ID: "potty",
    Name: "Sit and Use Potty",
    Image: `${publicURL}/activity/potty-temp.png`,
    OnClick: (player: Character) => {
      usePottyFunction();
    },
    TargetSelf: ["ItemButt"],
  },
  command: {
    Tag: "use-potty",
    Description: ` Sit down and use the potty.`,
    Action: (args, msg, parsed) => {
      usePottyFunction();
    },
  },
};
