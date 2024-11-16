import { ABCLdata } from "../index";
import { modStorage } from "./storage";
import { isMilk } from "./utils";

export function getRegressionItems(items=Player.Appearance): Item[] {
	let inFilter = [];
	for (let item of items) {
		if (ABCLdata.Items[item.Asset.Description]) {
			inFilter.push(item);
		}
	}
	for (let item of items) {
		for (let key in ABCLdata.Regex) {
			if (item.Asset.Description.toLowerCase().match(key.toLowerCase())) {
				if (!inFilter.includes(item)) {
					inFilter.push(item);
				}
			}
		}
	}       
	return inFilter;
}
export function getWetChance() {
	let chance = modStorage.settings.wetChance
	for (let item of getRegressionItems()) {
		for (let key in ABCLdata.CraftingModifiers.wetChance) {
			chance += item?.Craft?.Description?.includes(key) ? ABCLdata.CraftingModifiers.wetChance[key] : 0;
		}
	}
	return chance;
}

export function getMessChance() {
	let chance = modStorage.settings.messChance
	for (let item of getRegressionItems()) {
		for (let key in ABCLdata.CraftingModifiers.messChance) {
			chance += item?.Craft?.Description?.includes(key) ? ABCLdata.CraftingModifiers.messChance[key] : 0;
		}
	}
	return chance;
}

export function getRegressionIncreese() {
	let total = 0;
	for (let item of Player.Appearance) {
		if (ABCLdata.Items[item.Asset.Description]) {
			total += ABCLdata.Items[item.Asset.Description].modifier;
		}
		for (let key in ABCLdata.Regex) {
			if (item.Asset.Description.toLowerCase().match(key.toLowerCase())) {
				total += ABCLdata.Regex[key].modifier;
			}
		}
	}
	for (let item of getRegressionItems()) {
		for (let key in ABCLdata.CraftingModifiers.regression) {
			total += item?.Craft?.Description?.includes(key) ? ABCLdata.CraftingModifiers.regression[key] : 0;
		}
	}
	return total
}
export function increeseRegression() {
	modStorage.settings.regressionLevel = Math.min(modStorage.settings.regressionLevel+getRegressionIncreese(), 100)
}

// desperation needs rework
export function getDesperationLevel() {
	let total = modStorage.settings.desperationLevel;
	
	for (let item of getRegressionItems()) {
		for (let key in ABCLdata.CraftingModifiers.desperation) {
			total += item?.Craft?.Description?.includes(key) ? ABCLdata.CraftingModifiers.regression[key] : 0;
		}
	};
	
	return total;
}
export function desperationTick() {
	let total = modStorage.settings.desperationLevel;
	if (isMilk()) {
		total = 3;
	}
	if (!isMilk()) {
		total = (total != 0) ? total - 1 : 0;
	}
	return total
}
/*
export function getWetBaseChance() {
	return modStorage.settings.wetChance
}
export function setWetBaseChance(chance:number) {
	modStorage.settings.wetChance = chance
}

*/
