import { CombinedAction } from "../../types/types";
import { sendUpdateMyData } from "../hooks";
import { logger } from "../logger";
import { getCharacter } from "../player/playerUtils";

export type syncListeners = {
  init: never;
  sync: { settings: ModSettings; stats: ModStats; version: typeof modVersion; target?: number };
};

export const sync: CombinedAction = {
  listeners: {
    sync: ({ Sender }, data) => {
      if (!Sender) return;
      console.log("sync:" + modIdentifier);

      logger.debug({
        message: `Received updated data`,
        data,
      });

      const otherCharacter = getCharacter(Sender);
      if (!otherCharacter) return;

      otherCharacter[modIdentifier] = {
        Stats: data.stats,
        Version: data.version,
        Settings: data.settings,
      };
    },
    init: ({ Sender }) => {
      console.log("init");
      logger.debug(`Received request for data`);
      sendUpdateMyData(Sender);
    },
  },
};
