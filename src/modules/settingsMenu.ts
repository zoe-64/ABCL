import abcl from "../../images/abcl.png";

export function loadSettingsMenu(): void {
	let currentSettingsPage:any = null;

	const settingsButtonLeft = 200;
	const settingsButtonTop = 260;
	const settingsButtonWidth = 600;
	const settingsButtonHeight = 75;
	const settingsButtonsGap = 100;
	 
	PreferenceRegisterExtensionSetting({
		Identifier: "ABCL",
		ButtonText: "ABCL Settings",
		Image: abcl,
		click: () => {
			if (MouseIn(1815, 75, 90, 90)) currentSettingsPage === null ? PreferenceSubscreenExtensionsClear() : currentSettingsPage = null;
		},
		run: () => {
		
		},
		exit: () => {

		},
		load: () => {

		},
	});
}