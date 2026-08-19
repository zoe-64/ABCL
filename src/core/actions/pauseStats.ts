import { CombinedAction } from "../../types/types";
import { sendABCLAction } from "../player/playerUtils";
import { sendChatLocal } from "../utils";

export const pauseStatsFunction = () => {
  const isPaused = Player.ABCL.Settings.PauseStats;
  sendABCLAction(isPaused ? "%NAME% resumed their ABCL stats." : "%NAME% paused their ABCL stats.", Player, "pauseStats");
  Player.ABCL.Settings.PauseStats = !isPaused;
};

export const pauseStats: CombinedAction = {
  activity: {
    ID: "pauseStats",
    Name: "Pause Stats",
    Image: `${publicURL}/activity/pauseStats.png`,
    TargetSelf: ["ItemPelvis"],
    OnClick: (player: Character, group: AssetGroupItemName) => pauseStatsFunction(),
    InsertCriteria: function (player: Character) {
      let message = null;
      return {
        success: message == null,
        message: message == null ? undefined : message,
      };
    },
    Criteria: function (player: Character, silent?: boolean) {
      const result = this.InsertCriteria?.(player) ?? null;
      let message = result?.message ?? null;
      if (Player.ABCL.SettingPermissions.PauseStats) message ??= "Your parent(s) don't allow you to pause your stats";
      if (!silent && message) sendChatLocal(message);
      return {
        success: message == null,
        message: message == null ? undefined : message,
      };
    },
  },
  command: {
    Tag: "pause-stats",
    Action: (args, msg, parsed) => {
      if (!pauseStats.activity!.Criteria!(Player).success) return;
      pauseStatsFunction();
    },
    Description: ` Pauses the ABCL stats.`,
  },
};
