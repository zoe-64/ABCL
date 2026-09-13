import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { CombinedAction } from "../../types/types";
import { ABCLTarget } from "../actionLoader";
import { abclPlayer } from "../player/player";

export const toPee: CombinedAction = {
  activity: {
    Name: "Pee",
    MaxProgress: 0,
    Target: [ABCLTarget.Self("ItemPelvis")],
    Prerequisite: [],
    useImage: <ActivityImageSetting>`${publicURL}/activity/wetDiaper.svg`,
    run: (player: Character, sender, info) => abclPlayer.wet(true),
  },
  command: {
    Tag: "pee",
    Action: (args, msg, parsed) => abclPlayer.wet(true),
    Description: ` Lets go of your bladder.`,
  },
};
