import { abclData } from "..";


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

export function getDiaperSize(diaper:Item) {
	return abclData.DiaperSizeScale[abclData.Diapers[diaper.Asset.Description].size]
} 
export function isDiaper(item:Item) {
	return item.Asset.Description.toLowerCase().includes('diaper') && item.Asset.Description in abclData.Diapers;
}

