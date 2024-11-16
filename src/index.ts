import css from "../data/abcl.css"
import html from "../data/settings.html"
import { modSession, modStorage, initStorage } from "./modules/storage";
import { loadSettingsMenu } from "./modules/settingsMenu";
import { loadCommands } from "./modules/commands";

import { getTime, isVersionNewer, waitFor } from "./modules/utils";
import { loadDiaperLayers, releaseInClothes, releaseInDiaper, updateDiaper } from "./modules/diaper";
import { IModData } from "./modules/data";
export function getModVersion(): string {
    return "1.2.1";
}
import { desperationTick, getRegressionIncreese } from "./modules/stats";
import data from "../data/dictionary.json"
import { loadMessages } from "./modules/message";

export const ABCLdata:IModData = JSON.parse(data.toString());
(globalThis as any).ABCLdata = data;
const style = document.createElement("style");
style.innerHTML = css;
document.head.append(style);
document.body.insertAdjacentHTML("beforeend",html)
waitFor(() => typeof window.Player?.MemberNumber === "number").then(() => {
    initStorage();
    loadSettingsMenu();
    loadCommands();
    loadMessages()
    loadDiaperLayers();
    if (isVersionNewer(getModVersion(), modStorage.version)) {
        if (ServerPlayerIsInChatRoom()) {
			modStorage.version = getModVersion();
		} else {
			ServerSocket.once("ChatRoomSync", () => {
				modStorage.version = getModVersion();
			});
		}
    }
    loop();
});

async function loop() {
    updateDiaper()
    while (true) {
        if (!modSession.settings.enabled || !modSession.settings.timerEnabled || getTime() > 0) {
            await new Promise(r => setTimeout(r, Math.max(getTime() * 1000)));
            continue;
        }
        modSession.settings.lastAccident = Date.now() +60000;

     
        if (modSession.topLayer || modSession.bottomLayer) {
            releaseInDiaper()
        } else {
            modSession.settings.regressionLevel+= getRegressionIncreese()
            desperationTick()
            releaseInClothes()
        }
    }
}