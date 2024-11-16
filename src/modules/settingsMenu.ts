import abcl from "../../images/abcl.png";
import { ABCLgetSetting, ABCLsetSetting } from "./utils";

export function loadSettingsMenu(): void {

	initializeSettings()
	PreferenceRegisterExtensionSetting({
		Identifier: "ABCL",
		ButtonText: "ABCL Settings",
		Image: abcl,
		click: () => {
		},
		run: () => {
		
		},
		exit: () => {
			document.querySelector("#abcl")?.classList.add("hidden")
		},
		load: () => {
			document.querySelector("#abcl")?.classList.remove("hidden")
		},
	});
}


function showPageById(visiblePageId:string) {
    const pages = document.querySelectorAll('#abcl .page');
    pages.forEach(page => {
        if (page.id === visiblePageId) {
            page.classList.remove("hidden")
        } else {
            page.classList.add("hidden")
        }
    });
    const tabs = document.querySelectorAll('#abcl .tab');
        
        tabs.forEach(tab => {
          
			if (tab.id !== visiblePageId + "-tab") {
                tab.querySelector("button")?.removeAttribute("disabled");
            } else {
                tab.querySelector("button")?.setAttribute("disabled", "");
            }
        });
    }
    function initializeSettings() {
        const settings = [
            { id: '#abcl-mess input', key: 'messing', type: 'checkbox' },
            { id: '#abcl-visuals input', key: 'visuals', type: 'checkbox' },
            { id: '#abcl-wet input', key: 'wetting', type: 'checkbox' },
            { id: '#abcl-mess-wet-chance input', key: 'messChance', type: 'range' },
            { id: '#abcl-clothing-accidents input', key: 'intentionalLeaks', type: 'checkbox' },
            { id: '#abcl-leaks input', key: 'accidentalLeaks', type: 'checkbox' },
            { id: '#abcl-timer-enabled input', key: 'timerEnabled', type: 'checkbox' },
            { id: '#abcl-timer-duration input', key: 'timerDuration', type: 'number' },
			{ id: '#abcl-message-type select', key: 'messageType', type: 'text' },

        ];

        settings.forEach(setting => {
        const element = document.querySelector(setting.id) as HTMLInputElement;
        if (element) {
            const value = ABCLgetSetting(setting.key);
			if (setting.type === 'checkbox') {
                element.checked = value;
            } else if (setting.id == '#abcl-timer-duration input') {
				// @ts-ignore SHUT UP! Istg...
				element.value = Number(value)/(60*30);
 			} else if (setting.type === 'range' || setting.type === 'number' || setting.type === 'text') {
                element.value = value;
            }

            // Attach event listener to update settings
            element.addEventListener('change', function() {
                let newValue;
				if (setting.id == '#abcl-mess-wet-chance input') {
					updateMessWetChance(Number(this.value))
					return;	
				}
                if (setting.type === 'checkbox') {
                    newValue = this.checked;
				} else if (setting.id == '#abcl-timer-duration input') {
					// @ts-ignore SHUT UP! Istg...
					newValue = Number(this.value*(60*30));
                } else if (setting.type === 'range' || setting.type === 'number') {
					newValue = Number(this.value);
                } else if (setting.type === 'text') {
					newValue = this.value
				}
                ABCLsetSetting(setting.key, newValue);
            });
        }
    });
    }
    function updateMessWetChance(value:number) {
        const messChance = 1 - (value / 100);
        const wetChance = value / 100;
        ABCLsetSetting('wetChance', wetChance);
        ABCLsetSetting('messChance', messChance);
    }
