import initHooks from "./core/hooks";
import { logger } from "./core/logger";
import { handlePlayerUpdate, modData } from "./core/player";
import { loadOrGenerateData } from "./core/settings";
import { bcModSDK, isObject } from "./core/utils";
import { initScreens } from "./screens";
import { initSettingsScreen } from "./screens/Settings";
import { css } from "./screens/styles/css";

export const updateInterval = 60 * 1000;
const initWait = () => {
  logger.info(`Waiting for possible login...`);
  if (CurrentScreen == null || CurrentScreen === "Login") {
    bcModSDK.hookFunction("LoginResponse", 0, (args, next) => {
      next(args);
      const response = args[0];
      if (
        isObject(response) &&
        typeof response.Name === "string" &&
        typeof response.AccountName === "string"
      ) {
        if (window.modLoadFlag) return;
        init();
      }
    });
  } else {
    logger.info(`${modIdentifier}: Already logged in, loading...`);
    init();
  }
};

const init = () => {
  const currentAccount = Player.MemberNumber;
  if (currentAccount === null) {
    logger.error("No player MemberNumber");
    throw new Error("No player MemberNumber");
  }

  bcModSDK.hookFunction("LoginResponse", 0, (args, next) => {
    const response = args[0];
    if (
      isObject(response) &&
      typeof response.Name === "string" &&
      typeof response.AccountName === "string" &&
      response.MemberNumber !== currentAccount
    ) {
      const error = `Attempting to load ${modIdentifier} with different account than already loaded (${response.MemberNumber} vs ${currentAccount}). This is not supported, please refresh the page.`;
      logger.error(error);
      alert(error);
      throw new Error(error);
    }
    return next(args);
  });

  const injectedStyles = document.createElement("style");
  injectedStyles.innerHTML = css;
  document.head.appendChild(injectedStyles);

  ServerPlayerSync();
  loadOrGenerateData();
  initSettingsScreen();
  initScreens([]);
  initHooks();
  logger.info(`Ready.`);
  window.modLoadFlag = true;
  modData.load();
  setInterval(loop, updateInterval);
  loop();
};

initWait();

const loop = () => {
  handlePlayerUpdate();
};
