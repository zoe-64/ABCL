import { DIAPER_USAGE_SOUNDS } from "../../constants";
import { CombinedAction } from "../../types/types";
import { sendChatLocal } from "../utils";

export type onABCLMessageListeners = {
  onABCLMessage: { message: string; local: boolean };
};
export type diaperUsageSoundListeners = {
  "diaper-usage-sound": { type: keyof typeof DIAPER_USAGE_SOUNDS };
};

const playDiaperUsageSound = (type: keyof typeof DIAPER_USAGE_SOUNDS) => {
  const config = DIAPER_USAGE_SOUNDS[type];
  const clip = config.clips[Math.floor(Math.random() * config.clips.length)];
  if (!clip) return;

  const audio = new Audio(`${publicURL}/audio/diaper/${type}/${clip}`);
  audio.volume = Math.min(1, Number(Player.AudioSettings.Volume ?? 1) * config.volume);
  audio.play().catch(() => {});
};

export const onABCLMessage: CombinedAction = {
  listeners: {
    onABCLMessage: ({ Sender }, { message, local }) => {
      sendChatLocal(message, undefined, "background: #FFA9A93B", local);
    },
  },
};

export const diaperUsageSound: CombinedAction = {
  listeners: {
    "diaper-usage-sound": ({ Sender }, data) => {
      if (Sender === Player.MemberNumber) return;
      if (!Player.ABCL?.Settings.DiaperUsageSounds) return;
      if (!Player.AudioSettings?.PlayItem) return;
      if (!data || !Object.prototype.hasOwnProperty.call(DIAPER_USAGE_SOUNDS, data.type)) return;
      playDiaperUsageSound(data.type);
    },
  },
};
