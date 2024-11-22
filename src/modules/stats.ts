import { ABCLdata } from "../index";
import { modSession, modStorage } from "./storage";
import { hasMilk } from "./utils";

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
	return chance + Math.floor(modSession.settings.desperationLevel/3);
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
 
// https://discord.com/channels/1253391626378674289/1253411913128214578/1265667020012388496
export function increeseDesperation() { // milk dependance
	const {isNursery,isMilk,state} = hasMilk()
	const modifier = {"resting":0, "held up":1, "held up high":3}[state]
	if (isMilk && modSession.settings.desperationLevel < 100) {
		if (isNursery) {
			modSession.settings.desperationLevel += modifier/2
		} else {
			modSession.settings.desperationLevel += modifier
		}
	} else if (modSession.settings.desperationLevel > 0) {
		modSession.settings.desperationLevel -= 1
	}
	
	if (isNursery && modSession.settings.desperationMetabolismLevel < 100) {
		modSession.settings.desperationMetabolismLevel += modifier
	} else if (modSession.settings.desperationMetabolismLevel > 0) {
		modSession.settings.desperationMetabolismLevel -= 1
	}
}



export function setWetBaseChance(chance:number) {
	modStorage.settings.wetChance = chance
}


