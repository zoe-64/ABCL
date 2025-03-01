import { overlay } from "./player/ui";

export function initApi(): void {
  (<any>window)[`${modIdentifier}`] = {
    inModSubscreen: () => Boolean(overlay.querySelector(`.${modIdentifier}SettingPage`)?.classList.contains(`${modIdentifier}Hidden`)),

    //
  };
}
