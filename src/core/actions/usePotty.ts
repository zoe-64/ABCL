import { CombinedAction } from "../../types/types";
import { abclPlayer } from "../player/player";
import { SendAction } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

const usePottyFunction = () => {
  const isTooEarly = abclPlayer.stats.BladderFullness < 0.3 && abclPlayer.stats.BowelFullness < 0.3;
  const isGood = abclPlayer.stats.BladderFullness > 0.6 || abclPlayer.stats.BowelFullness > 0.6;
  const isEmbarrassed = abclPlayer.stats.MentalRegression < 0.3;
  const isTooFarGone = abclPlayer.stats.MentalRegression > 0.9;
  if (isTooEarly) {
    SendAction("%NAME% tries to use the potty but can't seem to get anything out.");
    return;
  }
  abclPlayer.stats.BladderFullness = 0;
  abclPlayer.stats.BowelFullness = 0;
  let additionalText = "";
  if (isEmbarrassed) {
    additionalText = "and feels embarrased";
    abclPlayer.stats.MentalRegression += 0.04;
  }
  if (isGood && !isTooFarGone) {
    if (isEmbarrassed) {
      additionalText += " but is releaved";
    } else {
      additionalText = "and feels releaved";
    }
    abclPlayer.stats.MentalRegression -= 0.02;
    abclPlayer.stats.Incontinence -= 0.02;
  }
  SendAction("%NAME% sits down uses the potty " + additionalText + ".");
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
