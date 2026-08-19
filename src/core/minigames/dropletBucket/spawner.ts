import { DropletCatchGame } from "./game";

import {
  BadDropletEntity,
  BombDropletEntity,
  DropletEntity,
  GoldenDropletEntity,
  InstantDeathDropletEntity,
  NormalDropletEntity,
  SlowDropletEntity,
  ZigZagDropletEntity,
} from "./entities/dropletEntity";

type DropletConstructor = new (game: DropletCatchGame, x: number, y: number, radius: number, speed: number) => DropletEntity;

interface WeightedDroplet {
  dropletClass: DropletConstructor;
  weight: number;
}

const ALL_DROPLET_WEIGHTS: WeightedDroplet[] = [
  { dropletClass: NormalDropletEntity, weight: 50 },
  { dropletClass: BadDropletEntity, weight: 20 },
  { dropletClass: SlowDropletEntity, weight: 10 },
  { dropletClass: ZigZagDropletEntity, weight: 10 },
  { dropletClass: GoldenDropletEntity, weight: 5 },
  { dropletClass: BombDropletEntity, weight: 10 },
  { dropletClass: InstantDeathDropletEntity, weight: 10 },
];

const BAD_DROPLET_CLASSES: DropletConstructor[] = [BadDropletEntity, BombDropletEntity, InstantDeathDropletEntity];

export class SpawnerManager {
  private game: DropletCatchGame;
  private activePool: WeightedDroplet[] = [];
  private totalActiveWeight: number = 0;

  constructor(game: DropletCatchGame) {
    this.game = game;
  }

  selectRandomPool(): void {
    const pool = [...ALL_DROPLET_WEIGHTS];

    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // @ts-expect-error
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const selected = pool.slice(0, 3);

    const hasNormal = selected.some(item => item.dropletClass === NormalDropletEntity);

    if (!hasNormal) {
      const normalItem = ALL_DROPLET_WEIGHTS.find(item => item.dropletClass === NormalDropletEntity)!;
      selected[0] = normalItem;
    }

    const hasBad = selected.some(item => BAD_DROPLET_CLASSES.includes(item.dropletClass));

    if (!hasBad) {
      const availableBadItems = ALL_DROPLET_WEIGHTS.filter(item => BAD_DROPLET_CLASSES.includes(item.dropletClass));

      const chosenBad = availableBadItems[Math.floor(Math.random() * availableBadItems.length)];
      if (chosenBad == null) return;
      const replaceIndex = selected.findIndex(item => item.dropletClass !== NormalDropletEntity);

      if (replaceIndex !== -1) {
        selected[replaceIndex] = chosenBad;
      } else {
        selected[1] = chosenBad;
      }
    }

    this.activePool = selected;
    this.totalActiveWeight = this.activePool.reduce((sum, item) => sum + item.weight, 0);
  }

  spawnDroplet(): void {
    if (this.activePool.length === 0 || this.totalActiveWeight === 0) {
      this.selectRandomPool();
    }

    let randomWeight = Math.random() * this.totalActiveWeight;
    if (this.activePool[0] == null) return;
    let SelectedClass: DropletConstructor = this.activePool[0].dropletClass;

    for (const item of this.activePool) {
      if (randomWeight < item.weight) {
        SelectedClass = item.dropletClass;
        break;
      }
      randomWeight -= item.weight;
    }

    const x = Math.random() * (this.game.width - 20) + 10;
    const radius = 16 + Math.random() * 12;
    const speed = this.game.dropletSpeed * (0.8 + Math.random() * 0.8);

    this.game.objects.add(new SelectedClass(this.game, x, -radius, radius, speed));
  }
}
