import abclData from "./assets/dictionary.json" assert { type: "json" };
export const ABCLdata = abclData;

export const loopInterval = 60 * 1000;

//balancing

export const INCONTINENCE_ON_MINIGAME_FAILURE = 0.005;
export const INCONTINENCE_ON_MINIGAME_SUCCESS = -0.01;
export const INCONTINENCE_ON_POTTY_USE = -0.01;
export const INCONTINENCE_ON_TOILET_USE = -0.01;

export const ACCIDENTS_ON_ACTIVITIES: Partial<Record<Activity["Name"], { wetting?: number; messing?: number }>> = {
  Tickle: { wetting: 0.05, messing: 0.01 },
  TickleItem: { wetting: 0.08, messing: 0.01 },
  Spank: { wetting: 0.12, messing: 0.15 },
  ShockItem: { wetting: 0.15, messing: 0.2 },
  Kick: { wetting: 0.05, messing: 0.05 },
  Rub: { wetting: 0.01 },
  SpankItem: { wetting: 0.15, messing: 0.2 },
  Slap: { wetting: 0.03, messing: 0.04 },
  Grope: { wetting: 0.06, messing: 0.05 },
};
