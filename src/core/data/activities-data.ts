import { activities } from "../activities";
import { hasDiaper } from "../utils";
export const initActivitiesData = (): void => {
  activities["ChangeDiaper"] = {
    Name: "Change Diaper",
    Image: `${publicURL}/activity/changeDiaper.svg`,
    OnClick: (player: typeof Player) => {
      console.log("Change Diaper");
    },
    Target: ["ItemPelvis"],
    Criteria: (player) => {
      return hasDiaper(player);
    },
  };

  activities["UsePotty"] = {
    Name: "Sit and Use Potty",
    Image: `${publicURL}/activity/potty-temp.png`,
    OnClick: (player: typeof Player) => {
      console.log("Potty Break");
    },
    TargetSelf: ["ItemButt"],
    Criteria: (player) => {
      return true;
    },
  };

  activities["UseToilet"] = {
    Name: "Sit and Use Toilet",
    Image: `${publicURL}/activity/toilet-temp.png`,
    OnClick: (player: typeof Player) => {
      console.log("Toilet Break");
    },
    TargetSelf: ["ItemButt"],
    Criteria: (player) => {
      return true;
    },
  };
};
