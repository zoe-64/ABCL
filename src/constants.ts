import abclData from "./assets/dictionary.json" with { type: "json" };
export const ABCLdata = abclData;

export const loopInterval = 60 * 1000;

export const ABCLOwner = 164988;
export const ABCLAdmins = [ABCLOwner];
export const CONTRIBUTORS = new Set([155633, 54811, 126467, 178496, 33367, 198473, 149267, 213616, 250801, 257511]);

//balancing
export const THEME = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
export const INCONTINENCE_ON_MINIGAME_FAILURE = 0.002;
export const INCONTINENCE_ON_MINIGAME_SUCCESS = -0.01;
export const INCONTINENCE_ON_POTTY_USE = -0.02;
export const INCONTINENCE_ON_TOILET_USE = -0.02;
export const INCONTINENCE_ON_STATS_OVERFLOW = 0.25; // bowel/bladder overflow, += value * (1-incontinence)
export const STATS_OVERFLOW_LIMIT = 1;
export const PUDDLE_MAX_SIZE = 250;
export const MENTAL_REGRESSION_STRUGGLE_STANDING_UP_THRESHOLD = 0.6; // when standing up becomes harder
export const MENTAL_REGRESSION_SUCKING_HABIT_THRESHOLD = 0.4;
export const MENTAL_REGRESSION_DROOL_THRESHOLD = 0.7;
export const ACCIDENTS_ON_ACTIVITIES: Partial<Record<Activity["Name"], { wetting?: number; messing?: number }>> = {
  Tickle: { wetting: 0.1, messing: 0.01 },
  TickleItem: { wetting: 0.18, messing: 0.01 },
  Spank: { wetting: 0.25, messing: 0.25 },
  ShockItem: { wetting: 0.25, messing: 0.3 },
  Kick: { wetting: 0.75, messing: 0.75 },
  Rub: { wetting: 0.05 },
  SpankItem: { wetting: 0.15, messing: 0.2 },
  Slap: { wetting: 0.03, messing: 0.04 },
  Grope: { wetting: 0.06, messing: 0.05 },
};
export const DIAPER_USAGE_SOUNDS = {
  diaper_wetting: {
    clips: ["fastening_diaper_tape_1.mp3", "fastening_diaper_tape_2.mp3", "fastening_diaper_tape_3.mp3"],
    volume: 0.05,
  },
  diaper_soiling: {
    clips: ["crinkling_short_1.mp3", "crinkling_short_3.mp3", "crinkling_short_4.mp3"],
    volume: 0.05,
  },
  changing: {
    clips: [
      "undoing_diaper_tape_1.mp3",
      "undoing_diaper_tape_2.mp3",
      "undoing_diaper_tape_3.mp3",
      "undoing_diaper_tape_4.mp3",
      "undoing_diaper_tape_5.mp3",
      "undoing_diaper_tape_6.mp3",
    ],
    volume: 0.1,
  },
  misc_wetting: {
    clips: ["short_diaper_wetting.mp3"],
    volume: 0.1,
  },
  puddle: {
    clips: ["short_diaper_wetting.mp3"],
    volume: 0.1,
  },
} as const;
