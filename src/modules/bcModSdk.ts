import bcModSdk, { PatchHook } from "bondage-club-mod-sdk";
import { getModVersion } from "../index";

const modSdk  = bcModSdk.registerMod({
    name: "ABCL",
    fullName: "Adult Baby Club Lover",
    version: getModVersion(),
    repository: 'https://github.com/zoe-64/ABCL'
});

export function hookFunction(functionName: string, priority: number, hook: PatchHook): () => void {
    return modSdk.hookFunction(functionName, priority, hook);
}

export function patchFunction(functionName: string, patches: Record<string, string | null>): void {
    modSdk.patchFunction(functionName, patches);
}

export function callOriginal(functionName: string, args: any[]): any {
    return modSdk.callOriginal(functionName, args as never);
}