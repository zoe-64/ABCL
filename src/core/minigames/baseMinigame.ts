import { incontinenceOnAccident } from "../player/diaper";
import { abclPlayer, incontinenceCheck } from "../player/player";
import { sendChatLocal } from "../utils";

export abstract class BaseMiniGame {
  name: string = "";

  private _GetBackground() {
    if (!ChatRoomData) {
      return "";
    } else if (ChatRoomIsCustomized() && ChatRoomData?.Custom?.ImageURL) {
      return ChatRoomData?.Custom.ImageURL;
    } else {
      return `Backgrounds/${ChatRoomData.Background}.jpg`;
    }  
  }

  Run() {
    /**
     * TODO: R129
     * Remove & replace `this._GetBackground()` in favor of `ChatRoomGetBackgroundURL()` in R129
     * xref: https://gitgud.io/BondageProjects/Bondage-College/-/merge_requests/6336/diffs#c4a4ecaa7eeeddf307bdcb1c254d8aca9d2bbfac_6870_6879
     */
    (<any>window)[this.name + "Background"] = this._GetBackground();
    ChatRoomRun(CommonTime());
  }
  Click() {}
  Load() {}
  Unload() {}
  Resize() {}
  KeyDown() {}
  Exit() {}
  End(victory: boolean) {2
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
