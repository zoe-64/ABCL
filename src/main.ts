import initHooks from "./core/hooks";
import { logger } from "./core/logger";
import { loadOrGenerateData } from "./core/settings";
import { bcModSDK, isObject } from "./core/utils";
import { initScreens } from "./screens";
import { initSettingsScreen } from "./screens/Settings";
import { css } from "./screens/styles/css";
import abclData from "./assets/dictionary.json" assert { type: "json" };
import { initActivities } from "./core/activities";
import { initMinigames } from "./core/minigames";
import { abclPlayer } from "./core/player/player";
import "./core/globalExpose";
import { initOverlay } from "./core/player/ui";
export type AbclData = typeof abclData;
export const ABCLdata: AbclData = abclData;

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
const loop = () => {
  if (CurrentScreen !== "ChatRoom") {
    return;
  }
  abclPlayer.update();
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

  const shoelaceCSS = document.createElement("link");
  shoelaceCSS.rel = "stylesheet";
  shoelaceCSS.href =
    "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.0/cdn/themes/light.css";
  document.head.appendChild(shoelaceCSS);

  const shoelaceScript = document.createElement("script");
  shoelaceScript.src =
    "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.0/cdn/shoelace-autoloader.js";
  shoelaceScript.type = "module";
  shoelaceScript.async = true;
  document.head.appendChild(shoelaceScript);

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
  initActivities();
  initMinigames();
  initOverlay();
  setInterval(loop, updateInterval);
};

initWait();
