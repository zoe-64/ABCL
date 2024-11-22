import abcl from "../../images/abcl.png";
import { modSession } from "./storage";
import { ABCLgetSetting, ABCLsetSetting } from "./utils";
interface ISetting {
    element: HTMLInputElement | HTMLSelectElement;
    set: () => void;
    load: () => void;
}

interface ISettings {
    [key: string]: ISetting;
}
export function loadSettingsMenu(): void {
    const settings = {
        messing: {
            element:document.querySelector("#property-messing") as HTMLInputElement,
            set: () => {
                modSession.settings.messing = settings.messing.element.checked
            },
            load: () => {
                settings.messing.element.checked = modSession.settings.messing
            },
        },
        wetting: {
            element: document.querySelector("#property-wetting") as HTMLInputElement,
            set: () => {
                modSession.settings.wetting = settings.wetting.element.checked
            },
            load: () => {
                settings.wetting.element.checked = modSession.settings.wetting
            },
        },
        visuals: {
            element: document.querySelector("#property-visuals") as HTMLInputElement,
            set: () => {
                modSession.settings.visuals = settings.visuals.element.checked
            },
            load: () => {
                settings.visuals.element.checked = modSession.settings.visuals
            },
        },
        intentionalLeaks: {
            element: document.querySelector("#property-intentionalLeaks") as HTMLInputElement,
            set: () => {
                modSession.settings.intentionalLeaks = settings.intentionalLeaks.element.checked
            },
            load: () => {
                settings.intentionalLeaks.element.checked = modSession.settings.intentionalLeaks
            },
        },
        accidentalLeaks: {
            element: document.querySelector("#property-accidentalLeaks") as HTMLInputElement,
            set: () => {
                modSession.settings.accidentalLeaks = settings.accidentalLeaks.element.checked
            },
            load: () => {
                settings.accidentalLeaks.element.checked = modSession.settings.accidentalLeaks
            },
        },
        timerPaused: {
            element: document.querySelector("#property-timerPaused") as HTMLInputElement,
            set: () => {
                modSession.settings.lastAccident.paused = settings.timerPaused.element.checked
            },
            load: () => {
                settings.timerPaused.element.checked = modSession.settings.lastAccident.paused 
            },
        },
        timerDuration: {
            element: document.querySelector("#property-timerDuration") as HTMLInputElement,
            set: () => {
                modSession.settings.lastAccident.lastDuration = Number(settings.timerDuration.element.value)*60
            },
            load: () => {
                settings.timerDuration.element.value = String(Math.round(modSession.settings.lastAccident.lastDuration/60))
            },
        },
        messChanceWetChance: {
            element: document.querySelector("#property-messChanceWetChance") as HTMLInputElement,
            set: () => {
                const messChance = 1 - (Number(settings.messChanceWetChance.element.value) / 100);
                const wetChance = Number(settings.messChanceWetChance.element.value) / 100;

                modSession.settings.wetChance = wetChance
                modSession.settings.messChance = messChance
            },
            load: () => {
                const messChance = (1 - Number(modSession.settings.messChance)) * 100;
                settings.messChanceWetChance.element.value = String(messChance)       
            },
        },
        messageType: {
            element: document.querySelector("#property-messageType") as HTMLSelectElement,
            set: () => {
                modSession.settings.messageType = settings.messageType.element.value
            },
            load: () => {
                settings.messageType.element.value = String(modSession.settings.messageType)
            },
        }
    }
	initializeSettings(settings)
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
    // set'PropertyName'
    // load'PropertyName'
    
    function initializeSettings(settings:ISettings) {
        for(let [key,setting] of Object.entries(settings)) {
            if (setting.element) {
                setting.element.addEventListener("change", setting.set)
                setting.load()
            } else {
                console.warn(`${key} setting doesn't have an element`)
            }
        }
    }
