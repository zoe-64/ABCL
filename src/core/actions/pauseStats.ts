import { CombinedAction } from "../../types/types";
import { SendAction } from "../player/playerUtils";

export const pauseStatsFunction = () => {
  const isPaused = Player.ABCL.Settings.PauseStats;
  SendAction(isPaused ? "%NAME% resumed their ABCL stats." : "%NAME% paused their ABCL stats.", Player, "pauseStats");
  Player.ABCL.Settings.PauseStats = !isPaused;
};

export const pauseStats: CombinedAction = {
  activity: {
    ID: "pauseStats",
    Name: "Pause Stats",
    Image: `${publicURL}/activity/pauseStats.png`,
    TargetSelf: ["ItemPelvis"],
    OnClick: (player: Character, group: AssetGroupItemName) => pauseStatsFunction(),
    Criteria: (player: Character) => true,
  },
  command: {
    Tag: "pause-stats",
    Action: (args, msg, parsed) => pauseStatsFunction(),
    Description: ` Pauses the ABCL stats.`,
  },
};
