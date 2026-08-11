import { AudioManager } from "../audio";
import { DropletCatchGame } from "../game";
import { GameEntity } from "./gameEntity";

export abstract class DropletEntity extends GameEntity {
  speed: number;

  constructor(game: DropletCatchGame, x: number, y: number, radius: number, speed: number, imageFileName: string) {
    super(game, radius * 2, radius * 2, x, y);
    this.speed = speed;
    this.loadImage(imageFileName);
  }

  update(): void {
    const activeSpeed = this.game.isSlowed ? this.speed * 0.75 : this.speed;
    this.y += activeSpeed;

    if (this.y - this.height / 2 <= this.game.height) return;

    this.destroy();
    this.onMissed();
  }

  protected abstract onMissed(): void;
  public abstract onCaught(): void;
}

export class NormalDropletEntity extends DropletEntity {
  constructor(game: DropletCatchGame, x: number, y: number, radius: number, speed: number) {
    super(game, x, y, radius, speed, "droplet_normal.png");
  }

  protected onMissed(): void {
    this.game.damage();
  }

  onCaught(): void {
    AudioManager.playSFX("catch");
    this.destroy();
  }
}

export class InstantDeathDropletEntity extends DropletEntity {
  constructor(game: DropletCatchGame, x: number, y: number, radius: number, speed: number) {
    super(game, x, y, radius, speed, "droplet_instant_death.svg");
  }

  protected onMissed(): void {}

  onCaught(): void {
    AudioManager.playSFX("catch");
    this.game.endGame(false);
    this.destroy();
  }
}

export class BadDropletEntity extends DropletEntity {
  constructor(game: DropletCatchGame, x: number, y: number, radius: number, speed: number) {
    super(game, x, y, radius, speed, "droplet_damage.svg");
  }

  protected onMissed(): void {}

  onCaught(): void {
    AudioManager.playSFX("catch");
    this.game.damage();
    this.destroy();
  }
}

export class SlowDropletEntity extends DropletEntity {
  constructor(game: DropletCatchGame, x: number, y: number, radius: number, speed: number) {
    super(game, x, y, radius, speed, "droplet_slow.svg");
  }

  protected onMissed(): void {
    this.game.damage();
  }

  onCaught(): void {
    AudioManager.playSFX("catch");
    this.game.applySlowMotion(5000);
    this.destroy();
  }
}

export class GoldenDropletEntity extends DropletEntity {
  constructor(game: DropletCatchGame, x: number, y: number, radius: number, speed: number) {
    super(game, x, y, radius, speed, "droplet_heal.svg");
  }

  protected onMissed(): void {}

  onCaught(): void {
    AudioManager.playSFX("catch");
    this.game.heal();
    this.destroy();
  }
}

export class BombDropletEntity extends DropletEntity {
  constructor(game: DropletCatchGame, x: number, y: number, radius: number, speed: number) {
    super(game, x, y, radius, speed, "droplet_bomb.svg");
  }

  protected onMissed(): void {}

  onCaught(): void {
    AudioManager.playSFX("bomb");
    this.game.damage(2);

    for (const entity of Array.from(this.game.objects)) {
      if (entity instanceof DropletEntity && entity !== this && !entity.isDestroyed) {
        entity.destroy();
      }
    }

    this.destroy();
  }
}

export class ZigZagDropletEntity extends DropletEntity {
  private startX: number;
  private timePassed: number = 0;

  constructor(game: DropletCatchGame, x: number, y: number, radius: number, speed: number) {
    super(game, x, y, radius, speed, "droplet_zig_zag.svg");
    this.startX = x;
  }

  update(): void {
    this.timePassed += 0.05;
    const offset = Math.sin(this.timePassed) * 40;
    this.x = Math.max(this.width / 2, Math.min(this.game.width - this.width / 2, this.startX + offset));

    super.update();
  }

  protected onMissed(): void {
    this.game.damage();
  }

  onCaught(): void {
    AudioManager.playSFX("catch");
    this.destroy();
  }
}
