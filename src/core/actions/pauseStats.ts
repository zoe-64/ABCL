import { ActivityImageSetting } from "@sugarch/bc-activity-manager";
import { ABCLTarget, CombinedAction } from "../../types/types";
import { checkCanPauseStats } from "../actionCheck";
import { Prerequisiter, Printable } from "../actionLoader";
import { sendABCLAction } from "../player/playerUtils";
import { syncData } from "../settings";

export const pauseStatsFunction = () => {
  const isPaused = Player.ABCL.Settings.PauseStats;
  sendABCLAction(isPaused ? "%NAME% resumed %POSSESSIVE% ABCL stats." : "%NAME% paused %POSSESSIVE% ABCL stats.", Player, "pauseStats");
  Player.ABCL.Settings.PauseStats = !isPaused;
  syncData();
};

const Criteria = Printable(checkCanPauseStats);

// function Criteria(player: Character, silent?: boolean): CriteriaResult {
//   const result = InsertCriteria?.(player);
//   let message = result?.toMessage();
//   if (Player.ABCL.SettingPermissions.PauseStats) message ??= "Your parent(s) don't allow you to pause your stats";
//   if (!silent && message) sendChatLocal(message);
//   return CriteriaResult.fromMessage(message);
// }

export const pauseStats: CombinedAction = {
  activity: {
    Name: "Pause Stats",
    Target: [ABCLTarget.Self("ItemPelvis")],
    MaxProgress: 0,
    Prerequisite: [Prerequisiter(Criteria, true)],

    useImage: <ActivityImageSetting>`${publicURL}/activity/pauseStats.png`,
    run: (player: Character, sender, info) => pauseStatsFunction(),
  },
  command: {
    Tag: "pause-stats",
    Action: (args, msg, parsed) => {
      if (!Criteria!(Player).isOk()) return;
      pauseStatsFunction();
    },
    Description: ` Pauses the ABCL stats.`,
  },
};
