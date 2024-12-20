import { settings } from ".."

export const player = {
	_bladder: 0.0,
	_bowel: 0.0,
	waterIntake: settings.waterIntake, 
	foodIntake: settings.foodIntake,
	metabolism: settings.metabolism, // slow / normal / fast 
	get bladder() {
		return this._bladder
	},
	set bladder(value) {
		this._bladder = value 
		if (value > 1) this._bladder = 1 
		if (value < 0) this._bladder = 0
	},

	get bowel() {
		return this._bowel
	},
	set bowel(value) {
		this._bowel = value 
		if (value > 1) this._bowel = 1 
		if (value < 0) this._bowel = 0
	},
	update() {
		player.bladder += player.waterIntake * player.metabolism / 100
		player.bowel += player.foodIntake * player.metabolism / 100
		if (player.bladder === 1) {
			player.bladder = 0
			console.log("wet accident!!!")
		}
		if (player.bowel === 1) {
			player.bowel = 0
			console.log("messy accident!!!")
		}
	}
}