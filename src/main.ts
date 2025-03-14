import initHooks from "./core/hooks";
import { logger } from "./core/logger";
import { loadOrGenerateData } from "./core/settings";
import { bcModSDK, HookPriority } from "./core/utils";
import { initScreens } from "./screens";
import { initSettingsScreen } from "./screens/Settings";
import { initMinigames } from "./core/minigames";
import { abclPlayer } from "./core/player/player";
import "./core/global";
import { initOverlay } from "./core/player/ui";
import { initActions } from "./core/actionLoader";
import { loopInterval } from "./constants";
import { initApi } from "./core/api";

const init = async () => {
  //  ServerPlayerSync();
  loadOrGenerateData();

  initSettingsScreen();
  initActions();
  initScreens([]);
  initHooks();
  initMinigames();
  initOverlay();
  initApi();

  setInterval(loop, loopInterval);
  logger.info(`Ready.`);
};

if (CurrentScreen == null || CurrentScreen === "Login") {
  bcModSDK.hookFunction("LoginResponse", HookPriority.OBSERVE, (args, next) => {
    next(args);
    const response = args[0];
    if (response === "InvalidNamePassword") return;
    const { Name, AccountName } = response;
    if (typeof Name === "string" && typeof AccountName === "string") init();
  });
} else init();

const loop = () => {
  if (CurrentScreen !== "ChatRoom") {
    return;
  }
  abclPlayer.update();
};
