import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { CombinedAction } from "../../types/types";
import { abclPlayer } from "../player/player";

export const toPoop: CombinedAction = {
  activity: {
    activity: {
      Name: "Poop",
      MaxProgress: 0,
      Target: [],
      TargetSelf: ["ItemPelvis"],
      Prerequisite: [],
    },
    useImage: <ActivityImageSetting>`${publicURL}/activity/soilDiaper.svg`,
    run: (player, sender, info) => abclPlayer.soil(true),
  },
  command: {
    Tag: "poop",
    Action: () => abclPlayer.soil(true),
    Description: ` Relaxes your bowels.`,
  },
};
