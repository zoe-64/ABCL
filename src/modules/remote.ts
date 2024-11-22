import { Messager } from "zoelib/dist/zoelib.mjs";
import { hookFunction } from "./bcModSdk";
import { IModStorage, modSession, modStorage } from "./storage";
import { sendMessage } from "./message";
import { ABCLSettingsToSavedABCLSettings, TsavedABCLSettings } from "./save";

// add this to zoelib
// messages that come in are called "packets"
// and operations are called "actions" such as "getSettings"
// 
function isJsonParsable(str:string) {
	try {
	  JSON.parse(str);
	  return true;
	} catch (e) {
	  return false;
	}
  }

// msg: {
// id
// content -> json
// }
Messager.addBeepListener("getSettings", (request:string, sender:typeof Player.MemberNumber) => {
	if (!isJsonParsable(request)) return;
	if (!sender) return
	const message = JSON.parse(request) as {id:number, content:string}
	if (!isJsonParsable(message.content)) return;
	const content = JSON.parse(message.content) as {action?:string}
	if (content.action !== "getSettings") return;
	if (!(sender in modSession.settings.settingAccess)) {
		Messager.send({
			response: "noPermission",
			id: message.id
		}, sender, "HiddenBeep");
		return;
	}

	Messager.send({
		response: "success",
		settings: ABCLSettingsToSavedABCLSettings(modSession.settings),
		id: message.id
	}, sender, "HiddenBeep");
});
export type TRemoteSettings = {
    visuals?:boolean,
    messing?: boolean,
    wetting?: boolean,

    intentionalLeaks:boolean,
    accidentalLeaks:boolean,
    messChance: number,
    wetChance: number,
   
    messageType:string,
    timerPaused: boolean,
    timerDuration: number, 
	
    settingAccess: (typeof Player.MemberNumber)[]
}
Messager.addBeepListener("setSettings", (request:string, sender:typeof Player.MemberNumber) => {
	if (!isJsonParsable(request)) return;
	if (!sender) return
	const message = JSON.parse(request) as {id:number, content:string}
	if (!isJsonParsable(message.content)) return;
	const content = JSON.parse(message.content) as {action?:string, settings:TRemoteSettings}
	if (content.action !== "setSettings") return;

	if (!(sender in modSession.settings.settingAccess)) {
		Messager.send({
			reason: "noPermissions",
			id: message.id
		}, sender, "HiddenBeep");
	}
	for(const [key, param] of Object.entries(content.settings)) {
		if (!(key in modSession.settings.allowedSettings)) {
			Messager.send({
				reason: "settingNotAllowed",
				id: message.id
			}, sender, "HiddenBeep");
			return;
		}
	}
	const newSettings = new Map();
	for(const [key, param] of Object.entries(modStorage.settings)) {
		newSettings.set(key, key in content.settings ? content.settings[key] : param);
	}
	Messager.send({
		response: "success",
		id: message.id
	}, sender, "HiddenBeep");
	
	const name = Player?.FriendNames?.get(sender) || sender;
	Messager.send(`${name} updates your ABCL settings!`,Player.MemberNumber, "LocalMessage");
});