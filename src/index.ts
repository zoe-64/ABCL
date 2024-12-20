export function getModVersion(): string {
    return "2.0";
}
import data from "../data/dictionary.json"
import { player } from "./modules/player";
(globalThis as any).ABCLdata = data;
export const abclData:any = data

console.log(`abcl loaded version: ${getModVersion()}`)

// temporary until settings have been implemented
export const settings = { // all properties aren't changable even though they are called settings
    metabolism: 1.0,
    waterIntake: 1/200, 
	foodIntake: 1/450,
}

function loop() {  
    player.update() 
  
}
setInterval(loop, 1000);
loop()