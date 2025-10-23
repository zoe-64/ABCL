import { incontinenceOnAccident } from "../player/diaper";
import { abclPlayer, incontinenceCheck } from "../player/player";
import { sendChatLocal } from "../utils";

export abstract class BaseMiniGame {
  name: string = "";

  Run() {
    ChatRoomRun(CommonTime());
  }
  Click() {}
  Load() {}
  Unload() {}
  Resize() {}
  KeyDown() {}
  Exit() {}
  End(victory: boolean) {
    CommonSetScreen("Online", "ChatRoom");
    MiniGameVictory = victory;
    MiniGameEnded = true;
    MiniGameTimer = CommonTime();
    CommonCallFunctionByName(MiniGameReturnFunction);
  }
}

export function MessMinigameResult(victory?: boolean) {
  Player.ABCL.Stats.MinigameStatistics.Mess.Total++;
  if (victory ?? MiniGameVictory) {
    abclPlayer.stats.Incontinence -= incontinenceOnAccident(abclPlayer.stats.Incontinence) / 2;
    sendChatLocal("You managed to keep it together!");
    return;
  }

  abclPlayer.soil();
  abclPlayer.onAccident();
  incontinenceCheck.resetAllowedCallInterval();
}
export function WetMinigameResult(victory?: boolean) {
  Player.ABCL.Stats.MinigameStatistics.Wet.Total++;
  incontinenceCheck.resetAllowedCallInterval();
  if (victory ?? MiniGameVictory) {
    abclPlayer.stats.Incontinence -= incontinenceOnAccident(abclPlayer.stats.Incontinence) / 2;
    sendChatLocal("You managed to hold it in!");
    if (Player.ABCL.Settings.ExpressionsByActivities) {
      CharacterSetFacialExpression(Player, "Mouth", "Happy", 20);
    }
    Player.ABCL.Stats.MinigameStatistics.Wet.Success++;
    return;
  }
  if (Player.ABCL.Settings.ExpressionsByActivities) {
    CharacterSetFacialExpression(Player, "Blush", "Low", 10);
    CharacterSetFacialExpression(Player, "Eyes", "Surprised", 9);
  }
  abclPlayer.wet();
  abclPlayer.onAccident();
}

(window as any).WetMinigameResult = WetMinigameResult;
(window as any).MessMinigameResult = MessMinigameResult;
