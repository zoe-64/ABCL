import { Diaper, updateDiaper } from "./diaper"
import { WaitForCondition } from "./utils"

//#region saved
export type TSavedItem = {
    Asset: {
        DynamicGroupName: AssetGroupName
        Name: string
        Description: string
        InventoryID?: number
    }
    Color?: ItemColor
    Craft?: CraftingItem
    Property?: ItemProperties
    
}

export type TSavedDiaper = {
    SavedItem: TSavedItem
    Messes:number
    Wettings:number
    Layer:number
}

export type TsavedABCLSettings = {
    enabled:boolean,
    visuals:boolean,
    messing: boolean,
    wetting: boolean,

    intentionalLeaks:boolean,
    accidentalLeaks:boolean,
    messChance: number,
    wetChance: number,
   
    messageType:string,
    timerPaused: boolean,
    timerDuration: number, // seconds
    lastAccident: number, // unix
    
    regressionLevel: number,
    desperationLevel: number,
    desperationMetabolismLevel: number,
    settingAccess: (typeof Player.MemberNumber)[]
    allowedSettings: (keyof TsavedABCLSettings)[]
}

//#region instanciated
export type TABCLSettings = {
    lastAccident: WaitForCondition

    enabled:boolean,
    visuals:boolean,
    messing: boolean,
    wetting: boolean,

    intentionalLeaks:boolean,
    accidentalLeaks:boolean,
    messChance: number,
    wetChance: number,
   
    messageType:string,
    regressionLevel: number,
    desperationLevel: number,
    desperationMetabolismLevel: number,
    settingAccess: (typeof Player.MemberNumber)[],
    allowedSettings: (keyof TsavedABCLSettings)[],
}

//#region conversions
export function savedABCLSettingsToABCLSettings(savedABCLSettings:TsavedABCLSettings):TABCLSettings {
    return {
        lastAccident: new WaitForCondition(savedABCLSettings.timerDuration, null, savedABCLSettings.lastAccident, savedABCLSettings.timerPaused),
        enabled: savedABCLSettings.enabled,
        visuals: savedABCLSettings.visuals,
        messing: savedABCLSettings.messing,
        wetting: savedABCLSettings.wetting,
    
        intentionalLeaks: savedABCLSettings.intentionalLeaks,
        accidentalLeaks: savedABCLSettings.accidentalLeaks,
        messChance: savedABCLSettings.messChance,
        wetChance: savedABCLSettings.wetChance,
       
        messageType: savedABCLSettings.messageType,
        regressionLevel: savedABCLSettings.regressionLevel,
        desperationLevel: savedABCLSettings.desperationLevel,
        desperationMetabolismLevel: savedABCLSettings.desperationMetabolismLevel,
        settingAccess: savedABCLSettings.settingAccess,
        allowedSettings: savedABCLSettings.allowedSettings,
    }
}
export function ABCLSettingsToSavedABCLSettings(ABCLSettings:TABCLSettings):TsavedABCLSettings {
    return {
        enabled: ABCLSettings.enabled,
        visuals: ABCLSettings.visuals,
        messing: ABCLSettings.messing,
        wetting: ABCLSettings.wetting,
        
        timerDuration: ABCLSettings.lastAccident.waitDuration,
        timerPaused: ABCLSettings.lastAccident.paused,
        lastAccident: ABCLSettings.lastAccident.lastCalled,
        
        intentionalLeaks: ABCLSettings.intentionalLeaks,
        accidentalLeaks: ABCLSettings.accidentalLeaks,
        messChance: ABCLSettings.messChance,
        wetChance: ABCLSettings.wetChance,
       
        messageType: ABCLSettings.messageType,
        regressionLevel: ABCLSettings.regressionLevel,
        desperationLevel: ABCLSettings.desperationLevel,
        desperationMetabolismLevel: ABCLSettings.desperationMetabolismLevel,
        settingAccess: ABCLSettings.settingAccess,
        allowedSettings: ABCLSettings.allowedSettings,
    }
}

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