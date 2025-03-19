import { CombinedAction } from "../../types/types";
import { abclPlayer } from "../player/player";

export const toPee: CombinedAction = {
  activity: {
    ID: "pee",
    Name: "Pee",
    Image: `${publicURL}/activity/wetDiaper.svg`,
    OnClick: (player: Character, group: AssetGroupItemName) => abclPlayer.wet(true),
    TargetSelf: ["ItemPelvis"],
  },
  command: {
    Tag: "pee",
    Action: (args, msg, parsed) => abclPlayer.wet(true),
    Description: ` Lets go of your bladder.`,
  },
};
