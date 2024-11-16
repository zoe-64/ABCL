




// data
export const DiaperUseLevels:Record<string, string> = {
    "clean": "#8F8F8F",
    "middlewet": "#ffe58b",
    "maximumwet": "#ffd33e",
    "middlemess": "#423019",
    "maximummess": "#3C302C",
    "selfwet": "#242103",
    "selfmess": "#1f170d",
} 
export type MessageType = "mess" | "fullymess" | "wet" | "fullywet" | "immergency" | "selfwet" | "selfmess" | "noDiaper" | "changeSelf" | "changeBy";

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
export type TMessageVariants = Record<
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


