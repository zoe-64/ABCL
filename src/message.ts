import { Messager, SentenceBuilder } from "zoelib/dist/zoelib.mjs";

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
	if (!(globalThis as any)?.ABCLLOADED) {
		console.error("ABCL not loaded");
		return;
	}
	let abcl = (globalThis as any).abcl // temporary solution should be fixed soon

	if (abcl.messageType == "internalMonologue") {
		Messager.send(message,Player.MemberNumber, "LocalMessage");
	} else {
		ServerSend("ChatRoomChat", {Content: "Beep", Type: "Action", Dictionary: [
			{ Tag: "Beep", Text: "msg" },
			{ Tag: "msg", Text: message},
		]});        
	}
} 