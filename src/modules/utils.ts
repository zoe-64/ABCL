import { AverageColor, Messager, RandomInt, SentenceBuilder } from "zoelib/dist/zoelib.mjs";
import { modSession } from "./storage";
import { getDesperationLevel } from "./stats";

export function sleep(ms: number): Promise<() => {}> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function waitFor(func: () => boolean, cancelFunc = () => false): Promise<boolean> {
	while (!func()) {
		if (cancelFunc()) {
			return false;
		}
		// eslint-disable-next-line no-await-in-loop
		await sleep(10);
	}
	return true;
}

export function chatSendABCLMessage(msg: string, _data:any = undefined, targetNumber: typeof Player.MemberNumber = undefined): void {
	const data: ServerChatRoomMessage = {
		Content: "abclMsg",
		Dictionary: {
			//@ts-ignore
			msg
		}, 
		Type: "Hidden",
	};
	//@ts-ignore
	if (_data) data.Dictionary.data = _data;
	if (targetNumber) data.Target = targetNumber;
	ServerSend("ChatRoomChat", data);
}

export function getPlayer(value: string | number): Character | undefined {
	if (!value) return;
	return ChatRoomCharacter.find((Character) => {
		return (
			Character.MemberNumber == value ||
			Character.Name.toLowerCase() === value ||
			Character.Nickname?.toLowerCase() === value
		);
	});
}

export function isVersionNewer(version1: string, version2: string): boolean {
	const v1Parts = version1.split('.');
	const v2Parts = version2.split('.');
  
	for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
		const v1Part = parseInt(v1Parts[i] || '0', 10);
		const v2Part = parseInt(v2Parts[i] || '0', 10);

		if (v1Part > v2Part) {
			return true;
		} else if (v1Part < v2Part) {
			return false;
		}
	}

	return false;
}
export function getTime() {
	let modifier = Math.pow(1.02, (modSession.settings.regressionLevel +1)) * (getDesperationLevel() + 1)
	return Math.floor((getTimeUntilAccident() / modifier)*100)/100;
}
export function isMilk() {
	let items = Player.Appearance
	for (let item of items) {
		if (item.Asset.Description.toLowerCase().includes("milk")) {
			return true;
		}
	}
	return false;
}
export function applyColorToItems(items:Item[], color:HexColor, transparency:number = 0.2) {
    for (let item of items) {
        if (!item.Color) continue;
        if (typeof item.Color === "string") {
            item.Color = AverageColor(item.Color, color, transparency);
        } else {
            for (let index = 0; index < item.Color.length; index++) {
                item.Color[index] = AverageColor(item.Color[index], color, 0.2);
            }
        }
    }
}

export function getTimeUntilAccident():number {
	const currentTime = Date.now(); 
    const accidentTime = modSession.settings.lastAccident + modSession.settings.timerDuration;
    const deltaMilliseconds = accidentTime - currentTime;
    const deltaSeconds = Math.max(0, Math.floor(deltaMilliseconds / 1000)); 
    return deltaSeconds;
}

export type TDiaperAction = "messes" | "wettings" | "nothing"
export function nextDiaperAction(): { result: TDiaperAction; mess: number; wet: number; nothing: number } {
    const chanceForNothing = 0.1;
    const total = modSession.settings.messChance + modSession.settings.wetChance + chanceForNothing;
    const messChance = (modSession.settings.messChance / total) * +modSession.settings.messing;
    const wetChance = (modSession.settings.wetChance / total) * +modSession.settings.wetting;

    const weightedArray: TDiaperAction[] = [
        ...Array(Math.round(messChance * 100)).fill("messes"),
        ...Array(Math.round(wetChance * 100)).fill("wettings"),
        ...Array(Math.round(chanceForNothing * 100)).fill("nothing"),
    ];

	const result = weightedArray[RandomInt(0, weightedArray.length - 1)];

    return { result, mess: messChance, wet: wetChance, nothing: chanceForNothing };
}