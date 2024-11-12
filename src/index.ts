import css from "../data/abcl.css"
import html from "../data/settings.html"
import { modSession, modStorage, initStorage } from "./modules/storage";
import { loadSettingsMenu } from "./modules/settingsMenu";
import { loadCommands } from "./modules/commands";

import { getTime, getTimeUntilAccident, isVersionNewer, waitFor } from "./modules/utils";
import { loadDiaperLayers, triggerDiaperAccident, triggerDiaperAction, updateDiaper } from "./modules/diaper";
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
document.body.append(html)
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
        if (!modSession.settings.enabled || !modSession.settings.timerEnabled || getTimeUntilAccident() > 0) {
            await new Promise(r => setTimeout(r, getTime() * 1000));
            continue;
        }
        modSession.settings.lastAccident = Date.now() ;

     
        if (modSession.topLayer || modSession.bottomLayer) {
            triggerDiaperAction()
        } else {
            modSession.settings.regressionLevel+= getRegressionIncreese()
            desperationTick()
            triggerDiaperAccident()
        }
    }
}