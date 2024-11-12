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
import data from "../../data/dictionary.json"
export interface IModData {
    Diapers: Record<string, IDiaperData>;
    Items: Record<string, TItemModifier>;
    Regex: Record<string, TItemModifier>;
    CraftingModifiers: ICraftingModifiers;
    messages: IMessages;
    verbs: {[key: string]: {
        [values: string]: string[]
    };}
}

interface IDiaperData {
    indexes?: number[];
    type: string;
    absorbancy: number;
}
// Shared ItemModifier type for Items and Regex
type TItemModifier = { modifier: number };

// CraftingModifiers interface with each category's modifiers as key-value pairs
interface ICraftingModifiers {
    [key: string]: Record<string, number>;
}

// Messages interface with different message categories
interface IMessages {
    [key: string]: TMessageVariants;
}

// Reusable MessageVariants type for different message structures
type TMessageVariants = Record<
    "mess" | "fullymess" | "wet" | "fullywet" | "immergency" |
    "selfwet" | "selfmess" | "noDiaper" | "changeSelf" | "changeBy",
    string
>;


//export const ABCLdata = await GetJson(runtime+"data/dictionary.json") as IModData
import settings from "../../data/settings.html"
import stats from "../../data/stats.html"
export const templates = {
    stats: stats,
    settings: settings
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

