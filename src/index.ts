import css from "../data/abcl.css"
import html from "../data/settings.html"
import { modSession, modStorage, initStorage, resetStorage } from "./modules/storage";
import { loadSettingsMenu } from "./modules/settingsMenu";
import { loadCommands } from "./modules/commands";

import { getTime, isVersionNewer, waitFor, WaitForCondition } from "./modules/utils";
import { loadDiaperLayers, releaseInClothes, releaseInDiaper, updateDiaper } from "./modules/diaper";
import { IModData } from "./modules/data";
export function getModVersion(): string {
    return "1.2.1";
}
import { increeseDesperation, getRegressionIncreese } from "./modules/stats";
import data from "../data/dictionary.json"
import { loadMessages } from "./modules/message";

export const ABCLdata:IModData = JSON.parse(data.toString());
(globalThis as any).ABCLdata = data;
const style = document.createElement("style");
style.innerHTML = css;
document.head.append(style);
document.body.insertAdjacentHTML("beforeend",html)
console.info("ABCL Loaded: " + getModVersion())
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
    updateDiaper()
    console.log(modSession.settings.lastAccident)
    setInterval(loop, 1000)
});
const bottleChecker = new WaitForCondition(30, increeseDesperation) 
async function loop() {
    if (!modSession.settings.enabled) {
        return
    }
    if (modSession.settings.lastAccident.checkIn(getTime())) {
        if (modSession.topLayer || modSession.bottomLayer) {
            releaseInDiaper()
        } else {
            modSession.settings.regressionLevel+= getRegressionIncreese()
            increeseDesperation()
            releaseInClothes()
        }
    }
    bottleChecker.repeat()

}