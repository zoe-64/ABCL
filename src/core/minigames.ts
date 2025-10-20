// from LSCG - https://github.com/littlesera/LSCG/blob/8072c4d636a66bf12473823722afbc82fda8f98e/src/MiniGames/minigames.ts#L3C1-L3C87

import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { incontinenceOnAccident } from "./player/diaper";
import { abclPlayer } from "./player/player";
import { getRandomInt, sendChatLocal } from "./utils";

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
  }
}

export abstract class ClickTheRightThingMinigame extends BaseMiniGame {
  /**
   * @param {Record<string, number>} imageArray - An array of images src's with good / bad score paired to them
   */
  correctAnswers: number = 0;
  timerLength: number = 30;
  timeLeft: number = 0;
  rounds: number = 5;
  options: Record<string, number> = {
    "Maybe I should just let go..": -1,
    "I'm not sure..": 0,
    "I'm not a baby": 1,
    "I can hold it": 1,
    "The pressure is too much": -1,
    "It's too hard": -1,
    "I'm an adult now": 1,
  };
  constructor() {
    super();
    this.name = "ClickTheRightThing";
  }
  Load() {
    const updateRounds = () => {
      this.timeLeft = this.timerLength;
      this.rounds--;
      const container = document.getElementById("abcl-minigame-container");
      if (!container) return;
      container.innerHTML = "";
      // pick 5 random options with one postive
      for (let i = 0; i < 5; i++) {
        const option = Object.keys(this.options).filter(key => this.options[key] === 1)[Math.floor(Math.random() * Object.keys(this.options).length)];
        container.appendChild(
          ElementCreate({
            tag: "div",
            attributes: {
              class: "abcl-minigame-option",
            },
            dataAttributes: {
              option: option,
              good: this.options[option],
            },
            children: [option],
          }),
        );
      }
      const updateTimer = () => {
        const timer = document.getElementById("abcl-minigame-timer");
        if (!timer) return;
        const time = this.timeLeft;
        timer.innerHTML = time < 10 ? "0" + time : time.toString();
      };

      ElementCreate({
        tag: "div",
        attributes: {
          id: "abcl-minigame",
        },
        children: [
          ElementCreate({
            tag: "div",
            attributes: {
              id: "abcl-minigame-timer",
            },
            children: ["00"],
          }),
          ElementCreate({
            tag: "div",
            attributes: {
              id: "abcl-minigame-container",
            },
            children: [],
          }),
        ],
        parent: document.body,
      });
    };
  }

  End(victory: boolean): void {
    super.End(victory);
    ElementRemove("#abcl-minigame");
  }
}

export abstract class AccidentMiniGame extends BaseMiniGame {
  startText: string = "";
  hintText: string = "";
  failText: string = "";
  successText: string = "";

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
    if (Player.ABCL.Settings.ExpressionsByActivities) {
      CharacterSetFacialExpression(Player, "Eyes", "Daydream", 10);
      if (this.AccidentChallenge > 25) {
        CharacterSetFacialExpression(Player, "Blush", "ShortBreath", 10);
      } else {
        CharacterSetFacialExpression(Player, "Blush", "Low", 10);
      }
    }
  }
  get IsGameActive() {
    return CommonTime() < MiniGameTimer && !MiniGameEnded && !this.GameFailed;
  }

  get IsGameTimeout() {
    return CommonTime() >= MiniGameTimer && !MiniGameEnded;
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
    Player.ABCL.Stats.MinigameStatistics.Wet.Total++;
    if (victory) {
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
}
