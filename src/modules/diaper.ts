import bcModSdk from "bondage-club-mod-sdk";
import { modSession, modStorage, TSavedDiaper, TSavedItem } from "./storage";
import { hookFunction } from "./bcModSdk";
import { ABCLdata } from "../index";
import { DiaperUseLevels, MessageType } from "./data";
import { AverageColor, Messager } from "zoelib/dist/zoelib.mjs";
import { promptMessage, sendChangeDiaperMessage } from "./message";
import { applyColorToItems, nextDiaperAction, TDiaperAction } from "./utils";
import { getRegressionIncreese } from "./stats";

export function itemToSavedItem(item: Item): TSavedItem {
	return {
		Asset: {
			Name: item.Asset.Name,
			DynamicGroupName: item.Asset.DynamicGroupName,
			Description: item.Asset.Description,
		},
		Color: item.Color,
		Craft: item.Craft,
		Property: item.Property
	}
}
export function savedItemToItem(item:TSavedItem): Item {
	const Asset = AssetGet("Female3DCG", item.Asset.DynamicGroupName, item.Asset.Name)
	if (!Asset) {
		throw Error("Asset not recognized")
	}
	return {
		Asset: Asset,
		Color: item.Color,
		Craft: item.Craft,
		Property: item.Property
	}
}
export function diaperToSavedDiaper(diaper:Diaper): TSavedDiaper {
	return {
		Messes:diaper.messes,
		Wettings:diaper.wettings,
		Layer:diaper.layer,
		SavedItem:itemToSavedItem(diaper.item)
	}
}
export function savedDiaperToDiaper(savedDiaper:TSavedDiaper): Diaper | null {
	let diaper = null

	if (savedDiaper.Layer == 0) {
		diaper = new Diaper(replaceSlotWithSavedItem("ItemPelvis",savedDiaper.SavedItem,false));
	}
	if (savedDiaper.Layer == 1) {
		diaper = new Diaper(replaceSlotWithSavedItem("ItemPelvis",savedDiaper.SavedItem,false));
	}
	if (!diaper) return null;
	ServerPlayerInventorySync()
	return diaper
}
export function compareItemToSavedItem(item:Item, savedItem:TSavedItem) {
	return item.Asset.Name === savedItem.Asset.Name && item.Color === savedItem.Color 
		&& item.Craft === savedItem.Craft && item.Property === savedItem.Property	
}

export function replaceSlotWithSavedItem(slot:AssetGroupName,savedItem: TSavedItem, push=true): Item {
	const item = InventoryGet(Player, slot)
	if (item && compareItemToSavedItem(item,savedItem)) return item

	if (item) InventoryRemove(Player, slot, false)	
	InventoryWear(Player, savedItem.Asset.Name, slot, savedItem.Color, 10, Player.MemberNumber, savedItem.Craft, false)
	const newItem = InventoryGet(Player, slot) as Item 
	
	/*if (savedItem.Property && savedItem.Property.hasOwnProperty("LockedBy")) {
		const lockName = savedItem.Property["LockedBy"]
		const asset = lockName ? AssetGet(Player.AssetFamily, "ItemMisc", lockName) : null 
		
		if (asset) {
			InventoryLock(Player, newItem, {Asset:asset})
		}
	}*/
	newItem.Property = savedItem.Property

	if (push) ServerPlayerInventorySync()
	return newItem
}



export function loadDiaperLayers(): void {
	hookFunction('CharacterAppearanceSetItem', 2, (args:any, next:Function) => {
		let [_character, slot, _asset] = args;
		if (slot == "ItemPelvis" || slot == "Panties") {
			updateDiaper(false) 
		}
		return next(args);
	});

}

export class Diaper {
	item: Item
	wettings: number
	messes: number
	layer: number 
	constructor(item:Item) {
		this.item = item
		this.layer = item.Asset.DynamicGroupName == "Panties" ? 0 : 1
		this.wettings = 0
		this.messes = 0
	}
	get absorbancy() {
		let total = 0;
		const { Diapers, CraftingModifiers } = ABCLdata;
		const itemDescription = this.item?.Asset?.Description;
		const craftingDescription = this.item?.Craft?.Description;
		if (itemDescription) {
			total += Diapers[itemDescription]?.absorbancy ?? 0;
		}
		
		if (craftingDescription) {
			for (const [key, value] of Object.entries(CraftingModifiers.absorbancy)) {
				if (craftingDescription.includes(key)) {
					total += value;
				}
			}
		}
		return total
	}
	wet() {
		this.wettings +=1
	}
	mess() {
		this.messes +=1
	}	
	change() {
		this.wettings = 0;
        this.messes = 0;
	}
	static isDiaper(item:Item) {
		return item.Asset.Description.toLowerCase().includes('diaper');
	}
	// should be called BEFORE update color
	isReplaced() {
		let item = InventoryGet(Player, this.layer == 0 ? "Panties" : "ItemPelvis");
		return !(item && item.Color && Diaper.isDiaper(item) && this.item.Asset.InventoryID === item.Asset.InventoryID)		
	}
	getColor() {
		if (Array.isArray(this.item.Color)) {
			this.item.Color = this.item.Color.map((color, index) => 
				color === "Default" ? this.item.Asset.DefaultColor[index] : color
			);
		} else if (this.item.Color === "Default") {
			this.item.Color = this.item.Asset.DefaultColor as ItemColor;
		}
		
		const diaperData = ABCLdata["Diapers"][this.item.Asset.Description];
		if ((diaperData.type === "primary" || diaperData.type === "primary&secondary") && typeof this.item.Color == "string") {
			this.item.Color = this.item.Asset.DefaultColor as ItemColor;
		}
		let messyColor = DiaperUseLevels["Clean"];
		let wetColor = DiaperUseLevels["Clean"];
		const messyLevel = this.messes / this.absorbancy;
		const wetLevel = this.wettings / this.absorbancy;
		messyColor = getColor(messyLevel, "Maximummess", "Middlemess", "Clean");
		wetColor = getColor(wetLevel, "Maximumwet", "Middlewet", "Clean");
		const primaryColor = AverageColor(messyColor, wetColor, 0.7);
		const secondaryColor = AverageColor(messyColor, wetColor, 0.9);
		
		const { indexes } = diaperData;
		if (diaperData.type === "mono") {
			return primaryColor;
		} else if (diaperData.type === "primary" && Array.isArray(this.item.Color) && indexes && indexes[0] !== undefined) {
			return [primaryColor];
		} else if (diaperData.type === "primary&secondary" && Array.isArray(this.item.Color) && indexes && indexes[0] !== undefined && indexes[1] !== undefined) {
			return [primaryColor, secondaryColor]
		}
	}
}
export function updateDiaper(refresh=true) {
	if (!modSession.bottomLayer || modSession.bottomLayer.isReplaced()) {
		const item = InventoryGet(Player, "Panties");
		if (item && Diaper.isDiaper(item)) {
			modSession.bottomLayer = new Diaper(item)
		}
	}
	if (!modSession.topLayer || modSession.topLayer.isReplaced()) {
		const item = InventoryGet(Player, "ItemPelvis");
		if (item && Diaper.isDiaper(item)) {
			modSession.topLayer = new Diaper(item)
		}
	}
	if (!modStorage.settings.enabled || !modStorage.settings.visuals) {
		return;
	}            
	const topItem = InventoryGet(Player, "ItemPelvis");
	if (modSession.topLayer && topItem) {
		modSession.topLayer.item.Color = modSession.topLayer.getColor()
		topItem.Color = modSession.topLayer.item.Color
	}

	const bottomItem = InventoryGet(Player, "Panties");
	if (modSession.bottomLayer && bottomItem) {
		modSession.bottomLayer.item.Color = modSession.bottomLayer.getColor()
		bottomItem.Color = modSession.bottomLayer.item.Color
	}
	if (refresh) {
		CharacterRefresh(Player, true);
		ChatRoomCharacterUpdate(Player);
	}
}
function getColor(level: number, highLevel: string, midLevel: string, lowLevel: string): string {
    if (level > 0.75) {
        return level > 0.9 ? DiaperUseLevels[highLevel] : AverageColor(DiaperUseLevels[highLevel], DiaperUseLevels[midLevel], level - 0.75);
    } else {
        return AverageColor(DiaperUseLevels[midLevel], DiaperUseLevels[lowLevel], level);
    }
}

export function changeDiaper(player:typeof Player, by="self") {
	if (player != Player && player != null) { // change another player's diaper
		Messager.send({"Action": "ChangeDiaper", "MemberNumber": player.MemberNumber}, player.MemberNumber, "Hidden");
		return;
	}
	if ((globalThis as any).BCC_LOADED) { // @ts-ignore
		if (!hasPermissionToChangeDiaper(Player, Player)) {
			return;
		}
	}
	modSession.topLayer?.change()
	modSession.bottomLayer?.change()
	

	updateDiaper();
	  // being changed by someone else
	sendChangeDiaperMessage(by)
}


export function triggerDiaperAccident(action:TDiaperAction | null = null) {
	if (!modSession.settings.enabled || !modSession.settings.intentionalLeaks) {
		return;
	}
	if (action == null) {
		const action = nextDiaperAction()["result"] as TDiaperAction; 
		if (action == "nothing") return; 
		
	}
	let result:MessageType = "selfmess"
	if (action == "messes") {
		result = "selfmess"
	}
	if (action == "wettings") {
		result = "selfwet" 
	}
	promptMessage(ABCLdata.messages[modSession.settings.messageType][result])

	if (!modSession.settings.visuals) return
	
	let itemsBelow = []
	itemsBelow.push(
		...(["Shoes", "Socks", "Panties", "ItemPelvis", "ItemBoots", "Garters", "RightAnklet", "LeftAnklet", "SuitLower", "ClothLower"] as AssetGroupName[])
			.map(slot => InventoryGet(Player, slot))
	);
	itemsBelow = itemsBelow.filter(item => item != null);
	
	applyColorToItems(itemsBelow,DiaperUseLevels[result])
	
	updateDiaper();
}
export function triggerDiaperAction() {
	const { result } = nextDiaperAction();
	if (result === "nothing") return;
	const layers = [modSession.bottomLayer, modSession.topLayer];
	
	applyDiaperActionToLayer(layers, result)
	
  
	modSession.settings.regressionLevel += getRegressionIncreese();
	getDiaperActionMessage(layers, result);
	updateDiaper();
  }
  function applyDiaperActionToLayer(layers: (Diaper | null | undefined)[] , result: "messes" | "wettings"): boolean {
	for (const layer of layers) {
	  if (layer && layer.wettings + layer.messes < layer.absorbancy) {
		layer[result] += 1;
		return true;
	  }
	}
	return false;
}
function getDiaperActionMessage(layers: (Diaper | null | undefined)[], action:TDiaperAction) {
	let message:MessageType = "immergency";
	let absorbancy = 0;
	let total = 0;
	let result:MessageType = "mess"
	if (action == "messes") {
		result = "mess"
	}
	if (action == "wettings") {
		result = "wet" 
	}
	for (const layer of layers) {
	  if (layer) {
		absorbancy += layer.absorbancy;
		total += layer.messes + layer.wettings;
	  }
	}
  
	if (absorbancy > total) {
	  message = result;
	} else if (total === absorbancy) {
	  message = "fully" + result as MessageType;
	}
  
	promptMessage(ABCLdata.messages[modSession.settings.messageType][message]);
}