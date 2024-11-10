import { GetJson, GetText } from "zoelib/dist/zoelib.mjs";



export function getRuntime() {
    if (document.getElementById('ABCLruntimeID')) {
        const runtimeElement = document.getElementById('ABCLruntimeID');
        if (!runtimeElement?.innerText) {
            throw new Error("Runtime element not found");
        }
        return runtimeElement.innerText;
    }
    return "https://raw.githubusercontent.com/zoe-64/ABCL/main/"; 
  
}
export async function createABCLHtml(runtime:string) {
    const abclHtml = await GetText(runtime+"data/settings.html");
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = runtime+"data/abcl.css";
    (document.head || document.documentElement).appendChild(link);
    document.body.insertAdjacentHTML('beforeend', abclHtml);
}

// data
export const DiaperUseLevels:Record<string, string> = {
    "Clean": "#8F8F8F",
    "Middlewet": "#ffe58b",
    "Maximumwet": "#ffd33e",
    "Middlemess": "#423019",
    "Maximummess": "#3C302C",
    "Selfwet": "#4F4B1B",
    "Selfmess": "#3B2B17",
} 
export const runtime = getRuntime()
export type MessageType = "mess" | "fullymess" | "wet" | "fullywet" | "immergency" | "selfwet" | "selfmess" | "noDiaper" | "changeSelf" | "changeBy";

export type ABCLdataType = {
    "Diapers": {[key: string]: {"indexes": number[], "type": string, "absorbancy": number}}
    "Items": {[key: string]:{"modifier": number}}
    "Regex": {[key: string]:{"modifier": number}}
    "CraftingModifiers": {
        "absorbancy": {
            [key: string]: number
        },
        "messChance": {
            [key: string]: number
        },
        "wetChance": {
            [key: string]: number
        },
        "regression": {
            [key: string]: number
        },
        "desperation": {
            [key: string]: number
        }
    }
    "messages": Record<MessageType, Record<string, string>>
    "verbs": {
        [key: string]: {"neutral"?:string[], "female"?:string[], "male"?:string[]},
    }
};
export const ABCLdata = await GetJson(runtime+"data/dictionary.json") as ABCLdataType
export const templates = {
    stats: await GetText(runtime + "data/stats.html"),
    settings: await GetText(runtime + "data/settings.html"),
}
export const diaperDefaultValues = {
    messChance: .3,
    wetChance: .5,
    timer: 30,
    regressionLevel: 0,
    desperationLevel: 0,
    messageType: "internalMonologue",
    wetting: true,
    messing: true,
    accidents: false,
    visual: true,
    enabled: true,
};