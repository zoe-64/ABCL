async function statUpdateLoop() {
	if (typeof Abcl !== 'undefined') {
	let statBoxes = document.querySelectorAll('.stats-box');
	let seconds = Abcl.nextEncounter
	let minutes = Math.floor(seconds / 60);
	let remainingSeconds = Math.floor(seconds % 60);
	let chance = Abcl.calculateChance();
	for (let statbox of statBoxes) {
		statbox.querySelector('.wetCount').textContent = Abcl.wet.count * 60;
		statbox.querySelector('.messCount').textContent = Abcl.mess.count * 60;
		statbox.querySelector('.wetChance').textContent = Math.floor(chance.wet * 100) + '%';
		statbox.querySelector('.messChance').textContent = Math.floor(chance.mess * 100) + '%';
		
		statbox.querySelector('.tickMinutes').textContent = minutes;
		statbox.querySelector('.tickSeconds').textContent = remainingSeconds;
		statbox.querySelector('.bar').style.width = (seconds/(Abcl.diaperTimer*60)) * 100 + '%';
		statbox.querySelector('.absorbancyTotal').textContent =  Abcl.absorbancy.total*60;

		statbox.querySelector('.desperationBase').textContent = Math.floor(Abcl.desperation.base * 10) / 10;
		statbox.querySelector('.regressionbase').textContent = Math.floor((Abcl.regression.modifier + Abcl.regression.base) * 10) / 10;
		statbox.querySelector('.regressionModifier').textContent = Math.floor(Abcl.regression.modifier * 10) / 10;

	}
	}
}
setInterval(statUpdateLoop, 1000);
