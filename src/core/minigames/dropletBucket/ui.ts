import { abclPlayer } from "src/core/player/player";
import { overlay } from "src/core/player/ui";
import { DropletCatchGame } from "./game";

export class UIManager {
  private game: DropletCatchGame;
  private timeElement: HTMLElement | null = null;
  private heartsContainer: HTMLDivElement | null = null;
  private messageTimeout: number | null = null;
  public pauseButton: HTMLButtonElement | null = null;
  public audioPauseButton: HTMLButtonElement | null = null;
  public forfeitButton: HTMLButtonElement | null = null;
  constructor(game: DropletCatchGame) {
    this.game = game;
  }

  mountUI(): void {
    this.timeElement = ElementCreate({
      tag: "span",
      classList: ["timer-value"],
      children: [this.game.timeLeft.toString()],
      attributes: { id: "timer-display" },
    });

    const timerWrapper = ElementCreate({
      tag: "div",
      classList: ["timer-container"],
      children: [
        {
          tag: "span",
          classList: ["timer-icon"],
          children: ["⏱️"],
        },
        this.timeElement,
      ],
    });

    this.pauseButton = ElementCreate({
      tag: "button",
      classList: ["pause-button"],
      children: ["⏸"],
      attributes: { type: "button", "aria-label": "Pause Game" },
    });
    this.audioPauseButton = ElementCreate({
      tag: "button",
      classList: ["pause-button"],
      children: [abclPlayer.settings.MiniGameAudioMuted ? "🔇" : "🔊"],
      attributes: { type: "button", "aria-label": "Pause Audio" },
    });
    this.forfeitButton = ElementCreate({
      tag: "button",
      classList: ["pause-button", "forfeit-button"],
      children: ["🏳️"],
      attributes: { type: "button", "aria-label": "Forfeit Game" },
    });
    this.audioPauseButton.addEventListener("click", () => this.game.toggleAudio());
    this.pauseButton.addEventListener("click", () => this.game.togglePause());
    this.forfeitButton.addEventListener("click", () => this.game.endGame(false));
    const hudLeft = ElementCreate({
      tag: "div",
      classList: ["hud-left"],
      children: [this.pauseButton, this.audioPauseButton, this.forfeitButton, timerWrapper],
    });

    this.heartsContainer = ElementCreate({
      tag: "div",
      classList: ["hearts-container"],
      attributes: { id: "hearts-container" },
    });

    ElementCreate({
      tag: "div",
      attributes: { id: "abcl-minigame" },
      classList: ["game-container"],
      children: [
        {
          tag: "div",
          attributes: { id: "abcl-minigame-overlay" },
          children: [
            {
              tag: "div",
              attributes: { id: "abcl-minigame-status" },
              classList: ["status-bar"],
              children: [hudLeft, this.heartsContainer],
            },
          ],
        },
        {
          tag: "canvas",
          attributes: {
            id: "droplet-canvas",
            width: this.game.width.toString(),
            height: this.game.height.toString(),
          },
          classList: ["droplet-canvas"],
        },
      ],
      parent: overlay,
    });

    this.updateHearts();
  }

  updateUI(): void {
    if (this.timeElement) {
      this.timeElement.textContent = this.game.timeLeft.toString();
    }
    this.updateHearts();
  }

  private updateHearts(): void {
    if (!this.heartsContainer) return;
    this.heartsContainer.innerHTML = "";
    for (let i = 0; i < this.game.maxLives; i++) {
      const heart = document.createElement("span");
      heart.textContent = "❤️";
      heart.className = `heart-icon ${i >= this.game.lives ? "lost" : ""}`;
      this.heartsContainer.appendChild(heart);
    }
  }

  drawPauseOverlay(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
    ctx.fillRect(0, 0, this.game.width, this.game.height);

    const boxWidth = 240;
    const boxHeight = 110;
    const boxX = (this.game.width - boxWidth) / 2;
    const boxY = (this.game.height - boxHeight) / 2;

    ctx.fillStyle = "rgba(30, 41, 59, 0.9)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.rect(boxX, boxY, boxWidth, boxHeight);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "600 24px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PAUSED", this.game.width / 2, this.game.height / 2 - 8);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "400 13px system-ui, sans-serif";
    ctx.fillText("Press ESC to resume", this.game.width / 2, this.game.height / 2 + 22);
  }

  showMessage(victory: boolean): void {
    const overlayContainer = document.getElementById("abcl-minigame-overlay");
    if (!overlayContainer) return;

    let noun = "job!";
    switch (Player.GetPronouns()) {
      case "SheHer":
        noun = "girl~";
        break;
      case "HeHim":
        noun = "boy~";
        break;
    }

    const victoryTitle = victory ? "Victory!" : "Game Over";
    const victoryMessage = victory ? `Good ${noun}` : "You ran out of lives.";

    ElementCreate({
      tag: "div",
      classList: ["abcl-minigame-result-modal"],
      children: [
        {
          tag: "h2",
          children: [document.createTextNode(victoryTitle)],
        },
        {
          tag: "p",
          children: [document.createTextNode(victoryMessage)],
        },
        ElementButton.Create(null, () => this.game.End(victory), null, {
          button: {
            classList: ["abcl-distraction-rush-button"],
            children: ["Continue"],
          },
        }),
      ],
      parent: overlayContainer,
    });

    this.messageTimeout = window.setTimeout(() => {
      if (!MiniGameEnded) this.game.End(victory);
    }, 15000);
  }

  cleanup(): void {
    if (this.messageTimeout !== null) clearTimeout(this.messageTimeout);
    const minigameElem = document.getElementById("abcl-minigame");
    if (minigameElem) ElementRemove(minigameElem);
  }
}
