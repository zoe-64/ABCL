import { CombinedAction } from "../../types/types";
import { abclPlayer } from "../player/player";

export const toPoop: CombinedAction = {
  activity: {
    ID: "poop",
    Name: "Poop",
    Image: `${publicURL}/activity/soilDiaper.svg`,
    OnClick: (player: Character, group) => abclPlayer.soil(true),
    TargetSelf: ["ItemPelvis"],
  },
  command: {
    Tag: "poop",
    Action: () => abclPlayer.soil(true),
    Description: ` Relaxes your bowels.`,
  },
};
