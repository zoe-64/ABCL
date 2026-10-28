import { incontinenceOnAccident } from "../player/diaper";
import { abclPlayer, incontinenceCheck } from "../player/player";
import { sendChatLocal } from "../utils";

export abstract class BaseMiniGame {
  name: string = "";

  // @ts-ignore
  private _GetBackground() {
    if (!ChatRoomData) {
      return "";
    } else if (ChatRoomIsCustomized() && ChatRoomData?.Custom?.ImageURL) {
      return ChatRoomData?.Custom.ImageURL;
    } else {
      return `Backgrounds/${ChatRoomData.Background}`;
    }
  }

  Run() {
    (<any>window)[this.name + "Background"] = this._GetBackground();
    ChatRoomRun(CommonTime());
  }
  Click() {}
  Load() {}
  Unload() {}
  Resize() {}
  KeyDown() {}
  Exit() {
    incontinenceCheck.resume();
  }
  End(victory: boolean) {
    CommonSetScreen("Online", "ChatRoom");
    MiniGameVictory = victory;
    MiniGameEnded = true;
    MiniGameTimer = CommonTime();
    // @ts-expect-error
    CommonCallFunctionByName(MiniGameReturnFunction);
  }
}

export function MessMinigameResult(victory?: boolean) {
  Player.ABCL.Stats.MinigameStatistics.Mess.Total++;
  incontinenceCheck.resetAllowedCallInterval();
  ElementRemove("#abcl-chat-button-resist");
  ElementRemove("#abcl-chat-button-letgo");
  if (victory ?? MiniGameVictory) {
    abclPlayer.stats.Incontinence -= incontinenceOnAccident(abclPlayer.stats.Incontinence) / 2;
    sendChatLocal("You managed to keep it together!");
    Player.ABCL.Stats.MinigameStatistics.Mess.Success++;
    return;
  }

  abclPlayer.soil();
  abclPlayer.onAccident();
}
export function WetMinigameResult(victory?: boolean) {
  Player.ABCL.Stats.MinigameStatistics.Wet.Total++;
  if (abclPlayer.pendingMiniGameTimeout) clearTimeout(abclPlayer.pendingMiniGameTimeout);
  ElementRemove("#abcl-chat-button-resist");
  ElementRemove("#abcl-chat-button-letgo");
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
