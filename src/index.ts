export function getModVersion(): string {
    return "2.0";
}
import data from "../data/dictionary.json"
import { updateColor } from "./modules/diaper";

// @ts-ignore 
export const ABCLdata:abclData = JSON.parse(data);

(globalThis as any).ABCLdata = ABCLdata



console.log(`abcl loaded version: ${getModVersion()}`)
import { player } from "./modules/player";

function loop() {  
    if (CurrentScreen === "Login" || !CurrentScreen) {
        return
    }
    player.update() 
    updateColor()
}
setInterval(loop, 1000);

loop()