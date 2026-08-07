declare const publicURL: string;

export interface SoundConfig {
  volume?: number;      // Range: 0.0 to 1.0 (default: 1.0)
  pitch?: number;       // Base pitch multiplier (default: 1.0)
  pitchVariance?: number; // Pitch randomization offset range (e.g., 0.1 gives pitch +/- 0.1)
}

export class AudioManager {
  private static sounds: Record<string, HTMLAudioElement> = {};
  private static soundConfigs: Record<string, SoundConfig> = {};
  private static isInitialized = false;

  public static init(): void {
    if (this.isInitialized) return;

    const soundFiles: Record<string, { path: string; config?: SoundConfig }> = {
      catch: { path: "catch.mp3", config: { volume: 0.8, pitch: 1.0, pitchVariance: 0.1 } },
      miss: { path: "miss.mp3", config: { volume: 0.9, pitch: 1.0, pitchVariance: 0.05 } },
      pause: { path: "pause.mp3", config: { volume: 0.7, pitch: 1.0 } },
      win: { path: "win.mp3", config: { volume: 1.0, pitch: 1.0 } },
      lose: { path: "lose.mp3", config: { volume: 1.0, pitch: 1.0 } },
      bomb: { path: "wet-explosion.mp3", config: { volume: 1.0, pitch: 0.9, pitchVariance: 0.15 } },
    };

    for (const [key, entry] of Object.entries(soundFiles)) {
      const audio = new Audio(`${publicURL}/audio/${entry.path}`);
      audio.preload = "auto";
      this.sounds[key] = audio;
      if (entry.config) {
        this.soundConfigs[key] = entry.config;
      }
    }

    this.isInitialized = true;
  }

  public static playSFX(soundName: string, overrideConfig?: SoundConfig): void {
    if (!this.isInitialized) {
      this.init();
    }

    const baseSound = this.sounds[soundName];
    if (!baseSound) return;

    const defaultConfig = this.soundConfigs[soundName] || {};
    const volume = overrideConfig?.volume ?? defaultConfig.volume ?? 1.0;
    const pitch = overrideConfig?.pitch ?? defaultConfig.pitch ?? 1.0;
    const pitchVariance = overrideConfig?.pitchVariance ?? defaultConfig.pitchVariance ?? 0;

    let finalPitch = pitch;
    if (pitchVariance > 0) {
      const offset = (Math.random() * 2 - 1) * pitchVariance;
      finalPitch = Math.max(0.1, pitch + offset);
    }

    const soundInstance = baseSound.cloneNode(true) as HTMLAudioElement;
    soundInstance.volume = Math.max(0, Math.min(1, volume));
    soundInstance.playbackRate = finalPitch;

    soundInstance.play().catch(() => {});
  }

  public static setSoundConfig(soundName: string, config: SoundConfig): void {
    this.soundConfigs[soundName] = {
      ...this.soundConfigs[soundName],
      ...config,
    };
  }
}