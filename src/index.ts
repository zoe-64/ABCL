export function getModVersion(): string {
    return "2.0";
}
import data from "../data/dictionary.json"
(globalThis as any).ABCLdata = data;