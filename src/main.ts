import initHooks from "./core/hooks";
import { logger } from "./core/logger";
import { loadOrGenerateData } from "./core/settings";
import { bcModSDK, isObject, waitForElement } from "./core/utils";
import { initScreens } from "./screens";
import { initSettingsScreen } from "./screens/Settings";
import { createCSS } from "./screens/styles/css";
import abclData from "./assets/dictionary.json" assert { type: "json" };
import { initActivities } from "./core/activities";
import { initMinigames } from "./core/minigames";
import { abclPlayer } from "./core/player/player";
import "./core/global";
import { initOverlay } from "./core/player/ui";
import { initCommands } from "./core/commands";
import bcModSdk from "bondage-club-mod-sdk";
export type AbclData = typeof abclData;
export const ABCLdata: AbclData = abclData;

export const updateInterval = 60 * 1000;

const initWait = () => {
  logger.info(`Waiting for possible login...`);
  if (CurrentScreen == null || CurrentScreen === "Login") {
    bcModSDK.hookFunction("LoginResponse", 0, (args, next) => {
      next(args);
      if (!isObject(args[0])) return;
      const { Name, AccountName } = args[0];
      if (typeof Name === "string" && typeof AccountName === "string") {
        if (window.modLoadFlag) return;
        init();
      }
    });
  }
  logger.info(`${modIdentifier}: Already logged in, loading...`);
  init();
};
const loop = () => {
  if (CurrentScreen !== "ChatRoom") {
    return;
  }
  abclPlayer.update();
};

const init = async () => {
  const currentAccount = Player.MemberNumber;
  if (currentAccount === null) {
    logger.error("No player MemberNumber");
    throw new Error("No player MemberNumber");
  }

  bcModSDK.hookFunction("LoginResponse", 0, (args, next) => {
    const response = args[0];
    if (isObject(response) && typeof response.Name === "string" && typeof response.AccountName === "string" && response.MemberNumber !== currentAccount) {
      const error = `Attempting to load ${modIdentifier} with different account than already loaded (${response.MemberNumber} vs ${currentAccount}). This is not supported, please refresh the page.`;
      logger.error(error);
      alert(error);
      throw new Error(error);
    }
    return next(args);
  });

  const isUsingFusam = () => bcModSdk.getModsInfo().some((mod: { name: string }) => mod.name === "FUSAM");
  const isUsingThemed = () => bcModSdk.getModsInfo().some((mod: { name: string }) => mod.name === "Themed");
  const isThemeLoaded = async () => {
    if (isUsingFusam()) {
      await waitForElement("#FUSAM");
      if (isUsingThemed()) {
        await new Promise((resolve) => {
          const interval = setInterval(() => {
            if ((<any>window).ThemedLoaded) {
              clearInterval(interval);
              resolve(true);
            }
          }, 100);
        });
      }
    }
  };
  await isThemeLoaded();
  const shoelaceCSSLight = document.createElement("link");
  shoelaceCSSLight.rel = "stylesheet";
  shoelaceCSSLight.href = "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.0/cdn/themes/light.css";
  document.head.appendChild(shoelaceCSSLight);

  const shoelaceCSSDark = document.createElement("link");
  shoelaceCSSDark.rel = "stylesheet";
  shoelaceCSSDark.href = "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.0/cdn/themes/dark.css";
  document.head.appendChild(shoelaceCSSDark);

  const shoelaceScript = document.createElement("script");
  shoelaceScript.src = "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.0/cdn/shoelace-autoloader.js";
  shoelaceScript.type = "module";
  shoelaceScript.async = true;
  document.head.appendChild(shoelaceScript);

  const injectedStyles = document.createElement("style");
  injectedStyles.innerHTML = createCSS(isUsingThemed());
  document.head.appendChild(injectedStyles);

  ServerPlayerSync();
  loadOrGenerateData();
  initSettingsScreen();
  initCommands();
  initScreens([]);
  initHooks();
  logger.info(`Ready.`);
  window.modLoadFlag = true;
  initActivities();
  initMinigames();
  initOverlay(isUsingThemed());
  setInterval(loop, updateInterval);
};

initWait();
