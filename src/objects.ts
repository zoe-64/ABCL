import { AverageColor } from "zoelib/dist/zoelib.mjs";
import { ABCLdata, DiaperUseLevels } from "./data";

export class Diaper {
	item: Item
	wettings: number
	messes: number
	slot: AssetGroupName 
	constructor(item:Item) {
		this.item = item
		this.slot = item.Asset.DynamicGroupName
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
		let item = InventoryGet(Player, this.slot);
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
function getColor(level: number, highLevel: string, midLevel: string, lowLevel: string): string {
    if (level > 0.75) {
        return level > 0.9 ? DiaperUseLevels[highLevel] : AverageColor(DiaperUseLevels[highLevel], DiaperUseLevels[midLevel], level - 0.75);
    } else {
        return AverageColor(DiaperUseLevels[midLevel], DiaperUseLevels[lowLevel], level);
    }
}