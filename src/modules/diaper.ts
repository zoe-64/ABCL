import bcModSdk from "bondage-club-mod-sdk";
import { modSession, modStorage, TSavedDiaper, TSavedItem } from "./storage";
import { hookFunction } from "./bcModSdk";
import { ABCLdata } from "../index";
import { DiaperUseLevels, MessageType, TMessageVariants } from "./data";
import { AverageColor, GetName, Messager, Pronoun, SentenceBuilder } from "zoelib/dist/zoelib.mjs";
import { sendMessage } from "./message";
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
		diaper = new Diaper(replaceSlotWithSavedItem("Panties",savedDiaper.SavedItem,false));
		diaper.wettings = savedDiaper.Wettings
		diaper.messes = savedDiaper.Messes
	}
	if (savedDiaper.Layer == 1) {
		diaper = new Diaper(replaceSlotWithSavedItem("ItemPelvis",savedDiaper.SavedItem,false));
		diaper.wettings = savedDiaper.Wettings
		diaper.messes = savedDiaper.Messes
		
	}
	if (!diaper) return null;
	updateDiaper()
	ServerPlayerInventorySync()
	return diaper
}
export function compareItemToSavedItem(item:Item, savedItem:TSavedItem) {
	return item.Asset.Name === savedItem.Asset.Name && JSON.stringify(item.Color) === JSON.stringify(savedItem.Color)
		&& JSON.stringify(item.Craft) === JSON.stringify(savedItem.Craft) && JSON.stringify(item.Property) === JSON.stringify(savedItem.Property)	
}
export function replaceSlotWithSavedItem(slot:AssetGroupName,savedItem: TSavedItem, push=true): Item {
	const item = InventoryGet(Player, slot)
	if (item && compareItemToSavedItem(item,savedItem)) return item

	if (item) InventoryRemove(Player, slot, false)	
	InventoryWear(Player, savedItem.Asset.Name, slot, savedItem.Color, 10, Player.MemberNumber, savedItem.Craft, false)
	const newItem = InventoryGet(Player, slot) as Item 
	
	if (savedItem.Property && savedItem.Property.hasOwnProperty("LockedBy")) {
		const lockName = savedItem.Property["LockedBy"]
		const asset = lockName ? AssetGet(Player.AssetFamily, "ItemMisc", lockName) : null 
		
		console.log("new lock")
		if (asset) {
			InventoryLock(Player, slot, {Asset:asset}, savedItem.Property.LockMemberNumber)
			
		}
		
	}
	console.log(newItem, savedItem)
	if (push) ServerPlayerInventorySync()
	return newItem
}
export function loadDiaperLayers(): void {

	hookFunction('CharacterAppearanceSetItem', 2, (args:any, next:Function) => {
		let [_character, slot, _asset] = args;
		const action = next(args)
		if (slot == "ItemPelvis" || slot == "Panties") {
			updateDiaper(false) 
		}
		return action;
	});
	hookFunction('InventoryRemove',2 ,(args:any, next:Function) => {
		let [_character, slot] = args;
		const action = next(args)
		if (slot == "ItemPelvis" || slot == "Panties") {
			updateDiaper(false) 
		}
		return action;
	})
	hookFunction('InventoryLock', 2, (args:any, next:Function) => {
		let [_C, _Item, _Lock, _MemberNumber] = args;
		const action = next(args)
		// @ts-ignore
		if (typeof _Item === 'string') _Item = InventoryGet(_C, _Item) as Item;
		if (Diaper.isDiaper(_Item) && modSession["topLayer"]?.item) {	
			modSession["topLayer"].item = _Item
		}
		return action;
	});
	hookFunction('InventoryUnlock', 2, (args:any, next:Function) => {
		let [_C, _Item] = args;
		const action = next(args)
		// @ts-ignore
		if (typeof _Item === 'string') _Item = InventoryGet(_C, _Item) as Item;
		if (_Item && _Item.Property && _Item.Property.Effect) {
			if (Diaper.isDiaper(_Item) && modSession["topLayer"]?.item) {	
				modSession["topLayer"].item = _Item
			}
		}
		return action;

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
		let messyColor = DiaperUseLevels["clean"];
		let wetColor = DiaperUseLevels["clean"];
		const messyLevel = this.messes / this.absorbancy;
		const wetLevel = this.wettings / this.absorbancy;
		messyColor = getColor(messyLevel, "maximummess", "middlemess", "clean");
		wetColor = getColor(wetLevel, "maximumwet", "middlewet", "clean");
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
function getColor(level: number, highLevel: string, midLevel: string, lowLevel: string): string {
    if (level > 0.75) {
        return level > 0.9 ? DiaperUseLevels[highLevel] : AverageColor(DiaperUseLevels[highLevel], DiaperUseLevels[midLevel], level - 0.75);
    } else {
        return AverageColor(DiaperUseLevels[midLevel], DiaperUseLevels[lowLevel], level);
    }
}
export function updateDiaper(refresh=true) {
	if (!modSession.bottomLayer || modSession.bottomLayer.isReplaced()) {
		const item = InventoryGet(Player, "Panties");
		if (item && Diaper.isDiaper(item)) {
			modSession.bottomLayer = new Diaper(item)
		} else {
			modSession.bottomLayer = null	
		}
	}
	if (!modSession.topLayer || modSession.topLayer.isReplaced()) {
		const item = InventoryGet(Player, "ItemPelvis");
		if (item && Diaper.isDiaper(item)) {
			modSession.topLayer = new Diaper(item)
		} else {
			modSession.topLayer = null
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


export function changeDiaper(player:typeof Player, by="self") {
	if (player != Player && player != null) { // change another player's diaper
		Messager.send({"Action": "ChangeDiaper", "MemberNumber": player.MemberNumber}, player.MemberNumber, "Hidden");
		return;
	}
	modSession.topLayer?.change()
	modSession.bottomLayer?.change()

	updateDiaper();
	if (by != "self") {
		SentenceBuilder.data["§by-player§"] = {"neutral":[by]};
		sendMessage("changeBy");
	} else {
		SentenceBuilder.data["§by-player§"] = {"neutral":[GetName(Player)]};
		sendMessage("changeSelf");
	}
	SentenceBuilder.data["§by-player§"] = {"neutral":[Pronoun.get("Reflexive", Player)]};

	}


export function releaseInClothes(action:TDiaperAction | null = null) {
	if (!modSession.settings.enabled || !modSession.settings.intentionalLeaks) {
		return;
	}
	if (action == null) {
		action = nextDiaperAction()["result"] as TDiaperAction; 
		if (action == "nothing") return; 
		
	}
	
	let result:MessageType = "selfmess"
	if (action == "messes") {
		result = "selfmess"
	}
	if (action == "wettings") {
		result = "selfwet" 
	}
	sendMessage(result)

	if (!modSession.settings.visuals) return
	
	let itemsBelow = []
	itemsBelow.push(
		...(["Shoes", "Socks", "Panties", "ItemPelvis", "ItemBoots", "Garters", "RightAnklet", "LeftAnklet", "SuitLower", "ClothLower"] as AssetGroupName[])
			.map(slot => InventoryGet(Player, slot))
	);
	itemsBelow = itemsBelow.filter(item => item != null);
	
	applyColorToItems(itemsBelow,DiaperUseLevels[result], 0.1)
	
	updateDiaper();
}
export function releaseInDiaper() {
	const { result } = nextDiaperAction();
	if (result === "nothing") return;
	const layers = [modSession.bottomLayer, modSession.topLayer];
	
	let absorbancy = 0;
	let total = 0;
	for (const layer of layers) {
		if (layer && layer.wettings + layer.messes < layer.absorbancy) {
		  	layer[result] += 1;
		}
		if (layer) {
			absorbancy += layer.absorbancy;
			total += layer.messes + layer.wettings;
		}
	}
  
	modSession.settings.regressionLevel += getRegressionIncreese();
	let message = {"messes":"mess","wettings":"wet"}[result] as keyof TMessageVariants
	if (total === absorbancy) {
		message = "fully" + message as keyof TMessageVariants;
	} else if (absorbancy < total) {
		message = "immergency"
	}

	sendMessage(message)
	updateDiaper();
  }

