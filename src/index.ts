export function getModVersion(): string {
    return "2.0";
}
import data from "../data/dictionary.json"
import { player } from "./modules/player";
(globalThis as any).ABCLdata = data;
export const abclData:any = data

console.log(`abcl loaded version: ${getModVersion()}`)

function loop() {
    player.update()
    if (player.bladder === 1) {
        player.bladder = 0
        console.log("wet accident!!!")
    }
    if (player.bowel === 1) {
        player.bowel = 0
        console.log("messy accident!!!")
    }
}
setInterval(loop, 1000);
loop()