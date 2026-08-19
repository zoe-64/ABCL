import { DropletCatchGame } from "./game";

export class InputManager {
  private game: DropletCatchGame;
  private canvas: HTMLCanvasElement | null = null;

  private boundKeyDown = this.handleKeyDown.bind(this);
  private boundKeyUp = this.handleKeyUp.bind(this);
  private boundMouseMove = this.handleMouseMove.bind(this);
  private boundTouchMove = this.handleTouch.bind(this);
  private boundCanvasClick = this.handleCanvasClick.bind(this);
  private boundVisibilityChange = this.handleVisibilityChange.bind(this);
  constructor(game: DropletCatchGame) {
    this.game = game;
  }
  private handleVisibilityChange(): void {
    if (document.hidden && this.game.isRunning && !this.game.isPaused) {
      this.game.togglePause();
    }
  }
  setup(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    document.addEventListener("keydown", this.boundKeyDown);
    document.addEventListener("keyup", this.boundKeyUp);
    document.addEventListener("visibilitychange", this.boundVisibilityChange);
    this.canvas.addEventListener("mousemove", this.boundMouseMove);
    this.canvas.addEventListener("touchmove", this.boundTouchMove);
    this.canvas.addEventListener("touchstart", this.boundTouchMove);
    this.canvas.addEventListener("click", this.boundCanvasClick);
  }

  cleanup(): void {
    document.removeEventListener("keydown", this.boundKeyDown);
    document.removeEventListener("keyup", this.boundKeyUp);
    if (this.canvas) {
      this.canvas.removeEventListener("mousemove", this.boundMouseMove);
      this.canvas.removeEventListener("touchmove", this.boundTouchMove);
      this.canvas.removeEventListener("touchstart", this.boundTouchMove);
      this.canvas.removeEventListener("click", this.boundCanvasClick);
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape" || event.key === "p" || event.key === "P") {
      event.preventDefault();
      this.game.togglePause();
      return;
    }
    /*
    if (["a", "A", "ArrowLeft", "d", "D", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
    }*/
  }

  private handleKeyUp(event: KeyboardEvent): void {}

  private getCanvasXPosition(clientX: number): number {
    if (!this.canvas) return 0;
    const rect = this.canvas.getBoundingClientRect();
    const touchX = clientX - rect.left;
    const scaleX = this.game.width / rect.width;
    return touchX * scaleX;
  }

  private handleTouch(e: TouchEvent): void {
    if (this.game.isPaused) {
      e.preventDefault();
      this.game.togglePause();
      return;
    }
    e.preventDefault();
    if (e.touches.length > 0 && e.touches[0]) {
      this.game.moveBucketTo(this.getCanvasXPosition(e.touches[0].clientX));
    }
  }

  private handleCanvasClick(): void {
    if (this.game.isPaused) {
      this.game.togglePause();
    }
  }

  private handleMouseMove(e: MouseEvent): void {
    if (this.game.isPaused) return;
    this.game.moveBucketTo(this.getCanvasXPosition(e.clientX));
  }
}
