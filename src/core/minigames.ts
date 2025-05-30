// from LSCG - https://github.com/littlesera/LSCG/blob/8072c4d636a66bf12473823722afbc82fda8f98e/src/MiniGames/minigames.ts#L3C1-L3C87

import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { incontinenceOnAccident } from "./player/diaper";
import { abclPlayer } from "./player/player";
import { sendChatLocal } from "./utils";

// for minigame text loading
HookManager.hookFunction("TextLoad", 5, (args, next) => {
  if (CurrentScreen === "WetMinigame" || CurrentScreen === "MessMinigame") return;
  else return next(args);
});
export const initMinigames = () => {
  registerMiniGame(new MessMinigame());
  registerMiniGame(new WetMinigame());
};
export function registerMiniGame<T extends BaseMiniGame>(miniGame: T) {
  var name = miniGame.name;
  console.log("Registering minigame: " + name);
  (<any>window)[name + "Run"] = () => miniGame.Run();
  (<any>window)[name + "Click"] = () => miniGame.Click();
  (<any>window)[name + "Load"] = () => miniGame.Load();
  (<any>window)[name + "Unload"] = () => miniGame.Unload();
  (<any>window)[name + "Resize"] = () => miniGame.Resize();
  (<any>window)[name + "KeyDown"] = () => miniGame.KeyDown();
  (<any>window)[name + "Exit"] = () => miniGame.Exit();
  (<any>window)[name + "End"] = (victory: boolean) => miniGame.End(victory);
}

export abstract class BaseMiniGame {
  name: string = "";

  abstract Run(): void;
  abstract Click(): void;
  Load() {}
  Unload() {}
  Resize() {}
  KeyDown() {}
  Exit() {}
  End(victory: boolean) {}
}

export abstract class AccidentMiniGame extends BaseMiniGame {
  startText: string = "";
  hintText: string = "";
  failText: string = "";
  successText: string = "";

  tintColor = [{ r: 0, g: 0, b: 0, a: 0 }];

  GameStartTime: number = 0;
  GameEndTime: number = 0;

  StartDelay: number = 4000;
  AccidentVelocity = 0;
  AccidentPosition = 0;
  AccidentAcceleration = 0;
  AccidentMaxPosition = 100;
  AccidentGameDuration = 5000;
  AccidentNextTick = 0;
  AccidentText = "";
  AccidentChallenge = 0;

  BaseGameLength: number = 6000;

  End(Victory: boolean) {
    CommonSetScreen("Online", "ChatRoom");
    MiniGameVictory = Victory;
    MiniGameEnded = true;
    MiniGameTimer = CommonTime();
    this.GameEndTime = MiniGameTimer;
  }
  get IsStartDelay() {
    return CommonTime() < this.GameStartTime;
  }
  Load(): void {
    DrawFlashScreen("#000000", 750, 1000);

    this.GameStartTime = CommonTime() + this.StartDelay;
    this.AccidentVelocity = 0;
    this.AccidentAcceleration = 0;
    if (typeof MiniGameDifficulty != "number") {
      MiniGameTimer = CommonTime() + this.BaseGameLength; // 5 seconds base
      this.AccidentChallenge = 5;
    } else {
      var difficultyTimeAdd = (MiniGameDifficulty - 8) * 0.25;
      this.AccidentGameDuration = this.BaseGameLength + 1000 * difficultyTimeAdd;
      MiniGameTimer = this.GameStartTime + this.AccidentGameDuration; // One extra second per challenge level, minus a third of a second per willpower.
      this.AccidentChallenge = MiniGameDifficulty;
    }

    this.AccidentMaxPosition = 400;
    this.AccidentPosition = this.AccidentMaxPosition;

    console.info("Accident minigame started: difficulty - " + this.AccidentChallenge + " time - " + this.AccidentGameDuration);
    CharacterSetFacialExpression(Player, "Eyes", "Daydream", 10);
    if (this.AccidentChallenge > 25) {
      CharacterSetFacialExpression(Player, "Blush", "ShortBreath", 10);
    } else {
      CharacterSetFacialExpression(Player, "Blush", "Low", 10);
    }
  }
  get IsGameActive() {
    return CommonTime() < MiniGameTimer && !MiniGameEnded && !this.GameFailed;
  }

  get IsGameTimeout() {
    return CommonTime() >= MiniGameTimer && !MiniGameEnded;
  }

  get IsEndGameReport() {
    return CommonTime() < this.GameEndTime + 5000;
  }

  get GameFailed() {
    return this.AccidentPosition <= 0;
  }

  RunGame(delta: number) {
    var timeElapsed = (this.AccidentGameDuration + CommonTime() - MiniGameTimer) / 1000;

    // Adjust acceleration every .4s ticks
    if (CommonTime() > this.AccidentNextTick) {
      this.AccidentNextTick = CommonTime() + 400;
      this.AccidentAcceleration = -(this.AccidentChallenge * 1.25) - timeElapsed * Math.random();
    }
    this.AccidentVelocity = Math.min(this.AccidentVelocity, this.AccidentVelocity + this.AccidentAcceleration * 0.25);
    if (this.AccidentPosition >= this.AccidentMaxPosition) this.AccidentVelocity = Math.min(0, this.AccidentVelocity);

    if (this.AccidentPosition > 0) {
      this.AccidentPosition += (this.AccidentVelocity / 1000) * delta * 3.5;
    }

    this.AccidentPosition = Math.max(0, Math.min(this.AccidentPosition, this.AccidentMaxPosition));

    DrawProgressBar(500 - this.AccidentMaxPosition, 800, 2 * this.AccidentMaxPosition, 50, 100 * (this.AccidentPosition / this.AccidentMaxPosition));
    DrawText(this.hintText, 500, 875, "white", "black");

    // var debugStr = "Chal: " + this.AccidentChallenge + " Pos: " + this.AccidentPosition + " Vel: " + this.AccidentVelocity + " Acc: " + this.AccidentAcceleration;
    // var prev = MainCanvas.textAlign;
    // MainCanvas.textAlign = "left";
    // DrawText(debugStr, 0, 100, "White", "Black");
    // MainCanvas.textAlign = prev;
    // console.info(debugStr);
  }

  Run() {
    ChatRoomRun(CommonTime());

    if (this.IsStartDelay) {
      DrawText(this.startText, 500, 500, "white", "black");
    } else if (this.IsGameActive) {
      this.RunGame(TimerRunInterval);
    } else if ((this.IsGameTimeout || this.GameFailed) && !MiniGameEnded) {
      this.End(this.AccidentPosition > 0);
      MiniGameEnd();
    }
  }

  Click() {
    //CommonIsMobile
    if (this.IsGameActive) this.AccidentVelocity = Math.max(this.AccidentVelocity + (getRandomInt(11) + 5), 20);
  }
}
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export class MessMinigame extends AccidentMiniGame {
  startText: string = "A sudden pressure builds within you...";
  hintText: string = "Click to maintain control. Keep it together!";
  failText: string = "Oops! You've had an accident!";
  successText: string = "Crisis averted! You stayed composed!";
  name = "MessMinigame";
  End(victory: boolean) {
    super.End(victory);
    if (victory) {
      abclPlayer.stats.Incontinence -= incontinenceOnAccident(abclPlayer.stats.Incontinence) / 2;
      sendChatLocal("You managed to keep it together!");
      return;
    }

    abclPlayer.soil();
    abclPlayer.onAccident();
  }
}

export class WetMinigame extends AccidentMiniGame {
  startText: string = "You feel a trickle starting...";
  hintText: string = "Click to squeeze tight. Don't let it get away!";
  failText: string = "Oh no! You lost control!";
  successText: string = "You held it in! Phew!";
  name = "WetMinigame";
  End(victory: boolean) {
    super.End(victory);
    if (victory) {
      abclPlayer.stats.Incontinence -= incontinenceOnAccident(abclPlayer.stats.Incontinence) / 2;
      sendChatLocal("You managed to hold it in!");
      CharacterSetFacialExpression(Player, "Mouth", "Happy", 20);
      return;
    }
    CharacterSetFacialExpression(Player, "Blush", "Low", 10);
    CharacterSetFacialExpression(Player, "Eyes", "Surprised", 9);

    abclPlayer.wet();
    abclPlayer.onAccident();
  }
}
