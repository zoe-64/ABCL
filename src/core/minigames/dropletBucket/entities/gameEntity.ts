import { DropletCatchGame } from "../game";

declare const publicURL: string;

export abstract class GameEntity {
  protected image: HTMLImageElement | null = null;
  protected imagePath: string | null = null;
  protected imageLoaded = false;

  x: number = 0;
  y: number = 0;
  isDestroyed: boolean = false;
  constructor(
    protected game: DropletCatchGame,
    public height: number,
    public width: number,
    x: number,
    y: number,
  ) {
    this.setPosition(x, y);
  }

  abstract update(): void;

  protected loadImage(path: string): Promise<void> {
    return new Promise(resolve => {
      this.imagePath = path;
      this.image = new Image();
      this.image.onload = () => {
        this.imageLoaded = true;
        resolve();
      };
      this.image.onerror = () => {
        console.error(`Failed to load image: ${path}`);
        this.imageLoaded = false;
        resolve();
      };
      this.image.src = `${publicURL}/${path}`;
    });
  }

  setPosition(x: number, y: number, allowOutOfBounds = false): void {
    if (allowOutOfBounds) {
      this.x = x;
      this.y = y;
      return;
    }

    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    const canvasWidth = this.game.width;
    const canvasHeight = this.game.height;

    this.x = Math.max(halfWidth, Math.min(canvasWidth - halfWidth, x));
    this.y = Math.max(halfHeight, Math.min(canvasHeight - halfHeight, y));
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.imageLoaded || !this.image) return;

    ctx.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  destroy(): void {
    if (this.isDestroyed) return;
    this.isDestroyed = true;
    this.game.removeEntity(this);
  }
}
