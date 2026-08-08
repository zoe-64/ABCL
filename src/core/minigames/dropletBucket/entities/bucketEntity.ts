import { GameEntity } from "./gameEntity";
import { DropletEntity } from "./dropletEntity";
import { DropletCatchGame, GAME_CONFIG } from "../game";

declare const MiniGameDifficulty: number;

export class BucketEntity extends GameEntity {
  targetX: number = 0;

  constructor(
    game: DropletCatchGame,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super(game, height, width, x, y);
    this.targetX = x;
    this.loadImage("bucket.svg");
  }

  catches(droplet: DropletEntity): boolean {
    const bucketLeft = this.x - this.width / 2;
    const bucketRight = this.x + this.width / 2;
    const bucketTop = this.y - this.height / 2;
    const bucketBottom = this.y + this.height / 2;

    const dropletLeft = droplet.x - droplet.width / 2;
    const dropletRight = droplet.x + droplet.width / 2;
    const dropletTop = droplet.y - droplet.height / 2;
    const dropletBottom = droplet.y + droplet.height / 2;

    return (
      dropletRight > bucketLeft &&
      dropletLeft < bucketRight &&
      dropletBottom > bucketTop &&
      dropletTop < bucketBottom
    );
  }

  setTargetX(x: number): void {
    const halfWidth = this.width / 2;
    this.targetX = Math.max(
      halfWidth,
      Math.min(this.game.width - halfWidth, x)
    );
  }

  update(): void {
    this.x += (this.targetX - this.x) * (Math.min(1, GAME_CONFIG.LERP_SPEED * MiniGameDifficulty));

    if (Math.abs(this.x - this.targetX) < 0.1) {
      this.x = this.targetX;
    }

    for (const entity of this.game.objects) {
      if (entity instanceof DropletEntity && !entity.isDestroyed && this.catches(entity)) {
        entity.onCaught();
      }
    }
  }
}