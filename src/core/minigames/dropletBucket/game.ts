import { abclPlayer } from "src/core/player/player";
import { syncData } from "src/core/settings";
import { BaseMiniGame } from "../baseMinigame";
import { AudioManager } from "./audio";
import "./dropletBucket.css";
import { BucketEntity } from "./entities/bucketEntity";
import { GameEntity } from "./entities/gameEntity";
import { InputManager } from "./input";
import { SpawnerManager } from "./spawner";
import { UIManager } from "./ui";

export const GAME_CONFIG = {
  BASE_WIDTH: 400,
  MAX_WIDTH: 800,
  HEIGHT: 800,
  DEFAULT_LIVES: 5,
  DEFAULT_TIME: 15,
  WARMUP_TIME: 5,
  BASE_DROPLET_SPEED: 6,
  BUCKET_WIDTH: 80,
  BUCKET_HEIGHT: 40,
  LERP_SPEED: 0.05,
  SPAWN_RATE: 15,
} as const;

export class DropletCatchGame extends BaseMiniGame {
  width: number = GAME_CONFIG.BASE_WIDTH;
  readonly height = GAME_CONFIG.HEIGHT;

  objects: Set<GameEntity> = new Set();
  lives = GAME_CONFIG.DEFAULT_LIVES;
  maxLives = GAME_CONFIG.DEFAULT_LIVES;
  timeLeft = GAME_CONFIG.DEFAULT_TIME;
  warmupTime = GAME_CONFIG.WARMUP_TIME;
  dropletSpeed = GAME_CONFIG.BASE_DROPLET_SPEED;

  isRunning = false;
  isPaused = false;
  isSlowed = false;
  isWarmingUp = false;

  uiManager: UIManager;
  inputManager: InputManager;
  spawnerManager: SpawnerManager;

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private bucket: BucketEntity | null = null;

  private spawnRate = 60;
  private slowTimeout: number | null = null;

  private gameLoop: number | null = null;
  private spawnInterval: number | null = null;
  private timerInterval: number | null = null;
  private warmupInterval: number | null = null;

  constructor() {
    super();
    this.name = "DropletCatch";
    this.uiManager = new UIManager(this);
    this.inputManager = new InputManager(this);
    this.spawnerManager = new SpawnerManager(this);
  }

  heal(number = 1): void {
    this.lives += number;
    this.uiManager.updateUI();
    AudioManager.playSFX("heal");
    if (this.lives > this.maxLives) {
      this.lives = this.maxLives;
    }
  }

  damage(number = 1): void {
    if (this.isWarmingUp) return;
    this.lives -= number;
    this.uiManager.updateUI();
    AudioManager.playSFX("miss");
    if (this.lives <= 0) {
      this.endGame(false);
    }
  }

  removeEntity(entity: GameEntity): void {
    this.objects.delete(entity);
  }

  moveBucketTo(x: number): void {
    if (this.bucket) {
      this.bucket.setTargetX(x);
    }
  }

  Load(): void {
    super.Load();
    this.isPaused = false;
    this.timeLeft = GAME_CONFIG.DEFAULT_TIME;
    this.lives = GAME_CONFIG.DEFAULT_LIVES;
    this.warmupTime = GAME_CONFIG.WARMUP_TIME;
    this.isSlowed = false;
    this.isWarmingUp = true;
    this.spawnRate = 60 + GAME_CONFIG.SPAWN_RATE * (MiniGameDifficulty || 1);
    this.objects.clear();

    const difficultyMultiplier = MiniGameDifficulty || 1;
    this.width = Math.min(GAME_CONFIG.MAX_WIDTH, Math.round(GAME_CONFIG.BASE_WIDTH * (1 + (difficultyMultiplier - 1) * 0.25)));
    this.uiManager.mountUI();
    this.canvas = document.getElementById("droplet-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas?.getContext("2d") || null;

    if (!this.canvas || !this.ctx) {
      console.error("Failed to initialize canvas");
      this.End(false);
      return;
    }

    this.spawnerManager.selectRandomPool();
    this.isRunning = true;

    this.bucket = new BucketEntity(this, this.width / 2, this.height - 30, GAME_CONFIG.BUCKET_WIDTH, GAME_CONFIG.BUCKET_HEIGHT);
    this.objects.add(this.bucket);

    this.inputManager.setup(this.canvas);

    this.gameLoop = requestAnimationFrame(this.update.bind(this));
    this.startWarmupTimer();
  }

  private startWarmupTimer(): void {
    this.warmupInterval = window.setInterval(() => {
      if (this.isPaused) return;

      this.warmupTime--;
      this.uiManager.updateUI();

      if (this.warmupTime <= 0) {
        if (this.warmupInterval !== null) clearInterval(this.warmupInterval);
        this.isWarmingUp = false;
        this.startMainLoop();
      }
    }, 1000);
  }

  private startMainLoop(): void {
    this.spawnInterval = window.setInterval(() => this.handleSpawn(), 60000 / this.spawnRate);
    this.timerInterval = window.setInterval(() => this.updateTimer(), 1000);
  }

  public togglePause(): void {
    if (!this.isRunning) return;
    this.isPaused = !this.isPaused;
    AudioManager.playSFX("pause");
  }

  public toggleAudio(): void {
    if (!this.isRunning) return;
    abclPlayer.settings.MiniGameAudioMuted = !abclPlayer.settings.MiniGameAudioMuted;
    syncData();
    if (!this.uiManager.audioPauseButton) return;
    this.uiManager.audioPauseButton.innerText = abclPlayer.settings.MiniGameAudioMuted ? "🔇" : "🔊";
    AudioManager.playSFX("click");
  }

  public applySlowMotion(durationMs: number): void {
    this.isSlowed = true;

    if (this.slowTimeout !== null) {
      clearTimeout(this.slowTimeout);
    }

    this.slowTimeout = window.setTimeout(() => {
      this.isSlowed = false;
    }, durationMs);
  }

  private handleSpawn(): void {
    if (!this.isRunning || this.isPaused || this.isWarmingUp) return;
    this.spawnerManager.spawnDroplet();
  }

  private update(): void {
    if (!this.isRunning || !this.ctx || !this.canvas) return;

    if (this.isPaused) {
      this.uiManager.drawPauseOverlay(this.ctx);
    } else {
      this.objects.forEach(entity => entity.update());
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.objects.forEach(entity => entity.draw(this.ctx!));

      if (this.isWarmingUp) {
        this.drawWarmupOverlay(this.ctx);
      }
    }

    this.gameLoop = requestAnimationFrame(this.update.bind(this));
  }

  private drawWarmupOverlay(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`Get Ready!`, this.width / 2, this.height / 2 - 30);
    ctx.fillText(`${this.warmupTime}`, this.width / 2, this.height / 2 + 30);
    ctx.restore();
  }

  private updateTimer(): void {
    if (!this.isRunning || this.isPaused || this.isWarmingUp) return;

    this.timeLeft--;
    this.uiManager.updateUI();
    if (this.timeLeft <= 0) {
      this.endGame(true);
    }
  }

  endGame(victory: boolean): void {
    if (!this.isRunning) return;
    AudioManager.playSFX(victory ? "win" : "lose");
    this.stopLoops();
    this.isRunning = false;
    this.uiManager.showMessage(victory);
  }

  private stopLoops(): void {
    if (this.gameLoop !== null) cancelAnimationFrame(this.gameLoop);
    if (this.spawnInterval !== null) clearInterval(this.spawnInterval);
    if (this.timerInterval !== null) clearInterval(this.timerInterval);
    if (this.warmupInterval !== null) clearInterval(this.warmupInterval);
    if (this.slowTimeout !== null) clearTimeout(this.slowTimeout);
  }

  End(victory: boolean): void {
    this.inputManager.cleanup();
    this.uiManager.cleanup();
    this.stopLoops();
    super.End(victory);
  }

  Unload(): void {
    this.isRunning = false;
    this.inputManager.cleanup();
    this.uiManager.cleanup();
    this.stopLoops();
  }
}
