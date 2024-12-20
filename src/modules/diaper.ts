

import { AverageColor } from "zoelib/dist/zoelib";
import { player } from "./player";
import { settings } from "./settings";
import { ABCLdata } from "..";
export function getPlayerDiaper(player: typeof Player=Player):{ItemPelvis:Item|null, Panties:Item|null} {
	const pelvisItem = InventoryGet(player, "ItemPelvis")
	const panties = InventoryGet(player, "Panties")
	let diapers:{ItemPelvis:Item|null, Panties:Item|null} = {ItemPelvis: null, Panties:null}
	if (pelvisItem && isDiaper(pelvisItem)) {
		diapers["ItemPelvis"] = pelvisItem
	}	
	if (panties && isDiaper(panties)) {
		diapers["Panties"] = panties
	}
	return diapers
} 
export function getPlayerDiaperSize(player: typeof Player=Player ): number {
	const pelvisItem = InventoryGet(player, "ItemPelvis")
	const panties = InventoryGet(player, "Panties")
	let size = 0
	if (pelvisItem && isDiaper(pelvisItem)) {
		size += getDiaperSize(pelvisItem)
	}	
	if (panties && isDiaper(panties)) {
		size += getDiaperSize(panties)
	}
	return size
}

export function getDiaperSize(diaper:Item):number {
	if (diaper.Asset.Description === "Poofy Chastity Diaper" && diaper.Property?.TypeRecord?.Typed === 1) {
		return ABCLdata.DiaperSizeScale["Large"]
	}
	return ABCLdata.DiaperSizeScale[ABCLdata.Diapers[diaper.Asset.Description].size]
} 

export function isDiaper(item:Item):boolean {
	return item.Asset.Description.toLowerCase().includes('diaper') && item.Asset.Description in ABCLdata.Diapers;
}

function updateDiaperColor(slot: AssetGroupName, primaryColor: string, secondaryColor: string, player: typeof Player=Player) {
	const item = InventoryGet(player, slot)
    if (item && isDiaper(item)) {
        const type = typeof item.Asset.DefaultColor;
        const diaper = ABCLdata.Diapers[item.Asset.Description];

        if (type !== typeof item.Color) {
            item.Color = item.Asset.DefaultColor as ItemColor;
        }
        if (type === "object" && JSON.stringify(item.Color).includes('"Default"')) {
            item.Color = JSON.parse(JSON.stringify(item.Color).replaceAll(/"Default"/g, '"#FFFFFF"'));
        }
        const color: string[] = (item.Color ?? item.Asset.DefaultColor) as string[];
		if (typeof diaper?.primaryColor === "number") {
			color[diaper.primaryColor] = primaryColor;
        }
		if (typeof diaper?.secondaryColor === "number") {
            color[diaper.secondaryColor] = secondaryColor;
        }
        item.Color = color;
    }
}
export function updateColor(player: typeof Player=Player) {
	const messLevel = settings.soiliness/getPlayerDiaperSize();
	const wetLevel = settings.wetness/getPlayerDiaperSize();

	const messColor = mixLevels(messLevel, ABCLdata.DiaperColors["maximummess"], ABCLdata.DiaperColors["middlemess"], ABCLdata.DiaperColors["clean"]);
	const wetColor = mixLevels(wetLevel, ABCLdata.DiaperColors["maximumwet"], ABCLdata.DiaperColors["middlewet"], ABCLdata.DiaperColors["clean"]);
	
	const primaryColor = AverageColor(messColor, wetColor, 0.7);
	const secondaryColor = AverageColor(messColor, wetColor, 0.9);
		
	updateDiaperColor("ItemPelvis", primaryColor, secondaryColor, player)
	updateDiaperColor("Panties", primaryColor, secondaryColor, player)
	CharacterRefresh(Player, true);
	ChatRoomCharacterUpdate(Player);
}

function mixLevels(level: number, highLevel: string, midLevel: string, lowLevel: string): string {
    if (level > 0.75) {
        return level > 0.9 ? highLevel : AverageColor(highLevel, midLevel, level - 0.75);
    } else {
        return AverageColor(midLevel, lowLevel, level);
    }
}
