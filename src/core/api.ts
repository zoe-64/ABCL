import { sendDataToAction, sendRequestOtherDataPacket, sendUpdateMyData } from "./hooks";
import { isABCLPlayer } from "./player/playerUtils";
import { overlay } from "./player/ui";

export function initApi(): void {
  (<any>window)[`${modIdentifier}`] = {
    inModSubscreen: () => Boolean(overlay.querySelector(`.${modIdentifier}SettingPage`)?.classList.contains(`${modIdentifier}Hidden`)),
    isABCLPlayer,
    sendDataToAction,
    sendUpdateMyData,
    sendRequestOtherDataPacket,

    //
  };
}
