export const player = {
	_bladder: 0.0,
	_bowel: 0.0,
	waterIntake: 1/200, 
	foodIntake: 1/450,
	metabolism: 1.0, // slow / normal / fast
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
	}
}