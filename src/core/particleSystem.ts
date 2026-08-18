import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { getPlayerDiaperSize, hasDiaper } from "./player/diaper";
import { abclPlayer } from "./player/player";
import { isABCLPlayer } from "./player/playerUtils";

export class Particle {
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  life: number;
  startLife: number;
  image: HTMLImageElement;
  size: number;
  startSize: number;
  maxSize: number;
  alpha: number;
  maxAlpha: number;
  rotation: number;
  rotationSpeed: number;
  loaded: boolean = false;

  constructor(options: {
    x: number;
    y: number;
    xSpeed: number;
    ySpeed: number;
    life: number;
    image: string;
    size?: number;
    maxSize?: number;
    alpha?: number;
    rotation?: number;
    rotationSpeed?: number;
  }) {
    this.x = options.x;
    this.y = options.y;
    this.xSpeed = options.xSpeed;
    this.ySpeed = options.ySpeed;
    this.startLife = options.life;
    this.life = options.life;

    this.size = options.size || 20;
    this.startSize = this.size;
    this.maxSize = options.maxSize || this.size * 2;
    this.alpha = 0;
    this.maxAlpha = options.alpha || 0.8;
    this.rotation = options.rotation || 0;
    this.rotationSpeed = options.rotationSpeed || 0.01;

    this.image = new Image();
    this.image.src = options.image;
    this.loadImage(options.image);
  }

  private loadImage(url: string) {
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.onerror = () => {
      console.warn("Failed to load image:", url);
      this.loaded = false;
    };
    this.image.src = url;
  }

  update(delta: number = 1) {
    this.x += this.xSpeed * delta;
    this.y += this.ySpeed * delta;
    this.life -= 1 * delta;
    this.rotation += this.rotationSpeed * delta;

    const lifeRatio = this.life / this.startLife;

    // Grow then shrink
    if (lifeRatio > 0.6) {
      const progress = (1 - lifeRatio) / 0.4;
      this.size = this.startSize + (this.maxSize - this.startSize) * progress;
    } else {
      this.size = this.maxSize * (lifeRatio / 0.6);
    }

    // Fade in then fade out
    if (lifeRatio > 0.7) {
      this.alpha = ((1 - lifeRatio) / 0.3) * this.maxAlpha;
    } else if (lifeRatio > 0.3) {
      this.alpha = this.maxAlpha;
    } else {
      this.alpha = (lifeRatio / 0.3) * this.maxAlpha;
    }

    this.alpha = Math.max(0, Math.min(this.maxAlpha, this.alpha));
  }
  render(ctx: CanvasRenderingContext2D, x: number, y: number, zoom: number = 1) {
    if (CurrentScreen !== "ChatRoom") return;

    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(x + this.x * zoom, y + this.y * zoom);
    ctx.rotate(this.rotation);
    ctx.drawImage(this.image, (-this.size * zoom) / 2, (-this.size * zoom) / 2, this.size * zoom, this.size * zoom);
    ctx.restore();
  }
}

export class ParticleSystem {
  playerParticles: Map<Number, Particle[]> = new Map();

  settings = {
    limit: 100,
    spawnChance: 0.3,
    spread: 0.5,
    speedVariance: 0.4,
    lifeVariance: 0.4,
    positionVariance: 10,
    particlesPerSpawn: 3,
    // Particle defaults
    size: 20,
    maxSize: 40,
    alpha: 0.8,
    rotationSpeed: 0.01,
  };

  constructor(options?: Partial<typeof this.settings>) {
    if (options) {
      Object.assign(this.settings, options);
    }
  }
  addParticle(memberNumber: number, x: number, y: number, speed: number, life: number, angle: number = 0, image: string) {
    const maxAllowed = this.settings.limit * (ChatRoomCharacter?.length || 1);
    const particles = this.playerParticles.getOrInsert(memberNumber, []);
    if (particles.length > maxAllowed || Math.random() > this.settings.spawnChance) {
      return;
    }

    const count = Math.floor(Math.random() * this.settings.particlesPerSpawn) + 1;
    for (let i = 0; i < count; i++) {
      const spreadAngle = angle + (Math.random() - 0.5) * this.settings.spread;
      const xSpeed = Math.cos(spreadAngle) * speed * (1 - this.settings.speedVariance / 2 + Math.random() * this.settings.speedVariance);
      const ySpeed = Math.sin(spreadAngle) * speed * (1 - this.settings.speedVariance / 2 + Math.random() * this.settings.speedVariance);
      const particleLife = life * (1 - this.settings.lifeVariance / 2 + Math.random() * this.settings.lifeVariance);

      particles.push(
        new Particle({
          x: x + (Math.random() - 0.5) * this.settings.positionVariance,
          y: y + (Math.random() - 0.5) * this.settings.positionVariance,
          xSpeed,
          ySpeed,
          life: particleLife,
          image,
          size: this.settings.size * (0.8 + Math.random() * 0.4),
          maxSize: this.settings.maxSize * (0.8 + Math.random() * 0.4),
          alpha: this.settings.alpha * (0.8 + Math.random() * 0.4),
          rotationSpeed: (Math.random() - 0.5) * this.settings.rotationSpeed * 2,
        }),
      );
    }
  }
  update() {
    for (let [_, particles] of this.playerParticles) {
      for (let particle of particles) particle.update();
      particles = particles.filter(particle => particle.life > 0);
      this.playerParticles.set(_, particles);
    }
  }
  render(memberNumber: number, ctx: CanvasRenderingContext2D, x: number, y: number, zoom: number = 1) {
    const particles = this.playerParticles.get(memberNumber);
    if (!particles) return;
    particles.forEach(particle => particle.render(ctx, x, y, zoom));
  }
}

const back = new ParticleSystem({
  limit: 80,
  spawnChance: 0.2,
  particlesPerSpawn: 1,

  spread: 0.3,
  speedVariance: 0.3,
  lifeVariance: 0.5,
  positionVariance: 15,

  size: 120,
  maxSize: 200,
  alpha: 0.5,
  rotationSpeed: 0.005,
});

const front = new ParticleSystem({
  limit: 50,
  spawnChance: 0.02,
  particlesPerSpawn: 1,

  spread: 0.1,
  speedVariance: 0.2,
  lifeVariance: 0.3,
  positionVariance: 5,

  size: 25,
  maxSize: 25,
  alpha: 0.7,
  rotationSpeed: 0.02,
});

export function initParticles() {
  HookManager.hookFunction("DrawCharacter", 1, (args, next) => {
    const [_player, _x, _y, _zoom, _resize, canvas] = args;
    if (!isABCLPlayer(_player)) return next(args);
    if (!hasDiaper(_player)) return next(args);
    if (abclPlayer.settings.DisableParticles) return next(args);
    const memberNumber = _player.MemberNumber!;
    const size = getPlayerDiaperSize(_player);
    if (_player.ABCL!.Stats.Wetness.value / size > 0.75) {
      front.addParticle(memberNumber, Math.random() * 180 + 150, 220 + 320, 7, 50, Math.PI * 2.5, publicURL + "/pee_particle.svg");
    }
    if (_player.ABCL!.Stats.Soiliness.value / size > 0.5) {
      back.addParticle(memberNumber, 250 + 100 - Math.random() * 200, 220 + 320, 3, 50, Math.PI * 1.5, publicURL + "/stink_particle.svg");
    }

    const offset = CharacterAppearanceYOffset(_player, _player.HeightRatio);
    back.render(_player.MemberNumber!, canvas ?? MainCanvas, _x, _y + offset / 2, _zoom);
    const render = next(args);
    front.render(_player.MemberNumber!, canvas ?? MainCanvas, _x, _y + offset / 2, _zoom);
    return render;
  });
  setInterval(() => {
    back.update();
    front.update();
  }, 1000 / 30);
}
