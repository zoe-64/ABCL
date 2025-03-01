import { activities } from "../activities";
import { changeDiaper, hasDiaper } from "../player/diaper";
import { abclPlayer } from "../player/player";
import { isABCLPlayer } from "../player/playerUtils";
import { abclStatsWindow } from "../player/ui";
import { sendChatLocal } from "../utils";
export const initActivitiesData = (): void => {
  activities["ChangeDiaper"] = {
    Name: "Change Diaper",
    Image: `${publicURL}/activity/changeDiaper.svg`,
    OnClick: (player: Character, group) => {
      changeDiaper(player.MemberNumber);
    },
    Target: ["ItemPelvis"],
    Criteria: (player) => {
      return hasDiaper(player) && isABCLPlayer(player);
    },
  };

  activities["UsePotty"] = {
    Name: "Sit and Use Potty",
    Image: `${publicURL}/activity/potty-temp.png`,
    OnClick: (player: Character) => {
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
    },
    TargetSelf: ["ItemButt"],

    Criteria: (player) => {
      return true;
    },
  };
  activities["UseToilet"] = {
    Name: "Sit and Use Toilet",
    Image: `${publicURL}/activity/toilet-temp.png`,
    OnClick: (player: Character) => {
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
    },
    TargetSelf: ["ItemButt"],
    Criteria: (player) => {
      if (abclPlayer.stats.MentalRegression > 0.3) {
        sendChatLocal("You try to use the toilet but you can't seem to get anything out.");
      }
      return abclPlayer.stats.MentalRegression < 0.3;
    },
  };
  activities["WetDiaper"] = {
    Name: "Wet Diaper",
    Image: `${publicURL}/activity/wetDiaper.svg`,
    OnClick: (player: Character, group) => {
      abclPlayer.releaseBladder();
    },
    TargetSelf: ["ItemPelvis"],
    Criteria: (player) => {
      return hasDiaper(player);
    },
  };

  activities["SoilDiaper"] = {
    Name: "Soil Diaper",
    Image: `${publicURL}/activity/soilDiaper.svg`,
    OnClick: (player: Character, group) => {
      abclPlayer.releaseBowel();
    },
    TargetSelf: ["ItemPelvis"],
    Criteria: (player) => {
      return hasDiaper(player);
    },
  };
  activities["DiaperCheck"] = {
    Name: "Diaper Check",
    Image: `${publicURL}/activity/diaperCheck.png`,
    OnClick: (player: Character, group) => {
      abclStatsWindow.open(player.MemberNumber);
    },
    Target: ["ItemPelvis"],
    Criteria: (player) => {
      return isABCLPlayer(player);
    },
  };
};
