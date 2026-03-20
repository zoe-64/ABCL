import initHooks from "./core/hooks";
import { logger } from "./core/logger";
import { loadOrGenerateData } from "./core/settings";
import { initSettingsScreen } from "./screens/Settings";
import { initMinigames } from "./core/minigames";
import { abclPlayer } from "./core/player/player";
import { initOverlay } from "./core/player/ui";
import { initActions } from "./core/actionLoader";
import { loopInterval } from "./constants";
import { initApi } from "./core/api";
import { initCustomItems } from "./core/customItems";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { initProperties } from "./core/properties";
initCustomItems();

const loop = () => {
  if (CurrentScreen !== "ChatRoom") {
    return;
  }
  abclPlayer.update();
};
HookManager.afterInit(() => {
  CraftingValidationRecord.Effects.Validate = function (c, a) {
    if (!CommonIsObject(c.Effects)) {
      return false;
    }
    if (c.Effects?.Normal) return false;
    return true;
  };
});
HookManager.afterPlayerLogin(async () => {
  loadOrGenerateData();
  initSettingsScreen();
  initActions();
  initHooks();
  initProperties();
  initMinigames();
  initOverlay();
  initApi();

  setInterval(loop, loopInterval);
  logger.info(`Ready.`);
});
