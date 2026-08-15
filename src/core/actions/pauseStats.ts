import { CombinedAction } from "../../types/types";
import { sendABCLAction } from "../player/playerUtils";

export const pauseStatsFunction = () => {
  if(Player.ABCL.SettingPermissions.PauseStats) {
    const isPaused = Player.ABCL.Settings.PauseStats;
    sendABCLAction(isPaused ? "%NAME% resumed their ABCL stats." : "%NAME% paused their ABCL stats.", Player, "pauseStats");
    Player.ABCL.Settings.PauseStats = !isPaused;
  }
};

export const pauseStats: CombinedAction = {
  activity: {
    ID: "pauseStats",
    Name: "Pause Stats",
    Image: `${publicURL}/activity/pauseStats.png`,
    TargetSelf: ["ItemPelvis"],
    OnClick: (player: Character, group: AssetGroupItemName) => pauseStatsFunction(),
    Criteria: (player: Character) => {
      return {
        success: true,
      };
    },
  },
  command: {
    Tag: "pause-stats",
    Action: (args, msg, parsed) => pauseStatsFunction(),
    Description: ` Pauses the ABCL stats.`,
  },
};
