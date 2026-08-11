import abclData from "./assets/dictionary.json" with { type: "json" };
export const ABCLdata = abclData;

export const loopInterval = 60 * 1000;

//balancing
export const THEME = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
export const INCONTINENCE_ON_MINIGAME_FAILURE = 0.002;
export const INCONTINENCE_ON_MINIGAME_SUCCESS = -0.01;
export const INCONTINENCE_ON_POTTY_USE = -0.02;
export const INCONTINENCE_ON_TOILET_USE = -0.02;
export const INCONTINENCE_ON_STATS_OVERFLOW = 0.25; // bowel/bladder overflow, += value * (1-incontinence)
export const STATS_OVERFLOW_LIMIT = 1;
export const PUDDLE_MAX_SIZE = 250;

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
