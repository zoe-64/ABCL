import { GetName, GetPlayer, Messager, Pronoun, SentenceBuilder } from "zoelib/dist/zoelib.mjs";
import { ABCLdata } from "../index";
import { modSession, modStorage } from "./storage";
import { changeDiaper } from "./diaper";

export function loadMessages() {
	SentenceBuilder.data["§name§"] = {get neutral() {return [GetName(Player)]}};
	SentenceBuilder.data["§items-below§"] = {get neutral() {return [getItemsBelow()]}};
	SentenceBuilder.data["§current-diaper§"] = {get neutral() {return [InventoryGet(Player, "ItemPelvis")?.Asset?.Description || InventoryGet(Player, "Panties")?.Asset?.Description || "diaper"]}};
	SentenceBuilder.data["§by-player§"] = {"neutral":[Pronoun.get("Reflexive", Player)]};
	SentenceBuilder.data = {...ABCLdata.verbs, ...SentenceBuilder.data};

	Messager.addListener(ABCLMessagerListener, -5, "ABCL Message Processor");
}

export function sendChangeDiaperMessage(by:string){
	if (by != "self") {
		SentenceBuilder.data["§by-player§"] = {"neutral":[by]};
		promptMessage(ABCLdata.messages[modStorage.settings.messageType]["changeBy"]);
	} else {
		SentenceBuilder.data["§by-player§"] = {"neutral":[GetName(Player)]};
		promptMessage(ABCLdata.messages[modStorage.settings.messageType]["changeSelf"]);
		SentenceBuilder.data["§by-player§"] = {"neutral":[Pronoun.get("Reflexive", Player)]};
	}
   
}
export function ABCLMessagerListener(response:ServerChatRoomMessage):boolean {
	if (response.Type == "Hidden") {   
		try {
			JSON.parse(response.Content);
		} catch (e) {
			return false
		}
		let content = JSON.parse(response.Content);                
		if (content.Action == "ChangeDiaper" && content.MemberNumber == Player.MemberNumber) {
			if ((globalThis as any).BCC_LOADED) { // @ts-ignore
				if (hasPermissionToChangeDiaper(content.Sender)) { 
					changeDiaper(Player, GetName(Player));
				}
			}
			let player = GetPlayer(content.MemberNumber);
			let responder:typeof Player = GetPlayer(response.Sender) as typeof Player;
			if (player) {
				changeDiaper(player, GetName(responder));
			}
		}
	}
	return false
}
export function getItemsBelow() {
	// if wearing stockings, socks, or shoes, skirt, they should be damp
	let socks = InventoryGet(Player, "Socks")?.Asset?.Description?.toLowerCase();
	let cloth = InventoryGet(Player, "Cloth")?.Asset?.Description?.toLowerCase();
	let panties = InventoryGet(Player, "Panties")?.Asset?.Description?.toLowerCase();
	let itemsBelow = [socks, cloth, panties];
	let itemsToLookFor = ["stockings", "socks", "shoes", "skirt", "panties", "dress"];

	let options = [];
	for (let word of itemsToLookFor) {
		for (let item of itemsBelow)
		if (item?.includes(word)) {
			options.push(item);
		}
	}
	let result = "";
	if (options.length > 1) {
		options = options.slice(0, 2);
		result = options.join(" and ");
		result += " gets"
	} else if (options.length === 1) {
		result = options[0] + " get";
	} else {
		result = "legs are";
	}
	return result;
} 
export function promptMessage(unformatedMessage:string) {
	SentenceBuilder.target = Player;
	let message = SentenceBuilder.prompt(unformatedMessage, Player);
	
	if (modSession.settings.messageType == "internalMonologue") {
		Messager.send(message,Player.MemberNumber, "LocalMessage");
	} else {
		ServerSend("ChatRoomChat", {Content: "Beep", Type: "Action", Dictionary: [
			{ Tag: "Beep", Text: "msg" },
			{ Tag: "msg", Text: message},
		]});        
	}
} 