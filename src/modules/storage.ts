import { getModVersion } from "../index";
import { chatSendABCLMessage, getPlayer } from "./utils";
import { hookFunction } from "./bcModSdk";
import { Diaper, diaperToSavedDiaper, savedDiaperToDiaper } from "./diaper";

export type TSavedItem = {
    Asset: {
        DynamicGroupName: AssetGroupName
        Name: string
        Description: string
        InventoryID?: number
    }
    Color?: ItemColor
    Craft?: CraftingItem
    Property?: ItemProperties
    
}

export type TSavedDiaper = {
    SavedItem: TSavedItem
    Messes:number
    Wettings:number
    Layer:number
}
export type ABCLSettings = {
    enabled:boolean;
    visuals:boolean;
    messing: boolean,
    wetting: boolean,

    intentionalLeaks:boolean,
    accidentalLeaks:boolean,
    messChance: number,
    wetChance: number,
   
    
    messageType:string;
    timerEnabled: boolean 
    timerDuration: number, // seconds
    lastAccident: number, // unix
    
    regressionLevel: number,
    desperationLevel: number,
}
export interface ISessionStorage {
    topLayer?: Diaper | null
	bottomLayer?: Diaper | null
    settings: ABCLSettings
}
export interface IModStorage {
	topLayer?: TSavedDiaper | null
	bottomLayer?: TSavedDiaper | null
    settings: ABCLSettings
    version: string
}

export let modStorage: IModStorage
    
export let modSession: ISessionStorage = {
    settings: {
        enabled:true,
        visuals:true,
        wetting: true,
        messing: true,
    
        intentionalLeaks:false,
        accidentalLeaks:false,

        messChance: .3,
        wetChance: .5,
        messageType: "internalMonologue",
        timerEnabled: true,
        timerDuration: 30*60*60,
        lastAccident: Date.now()/1000,
        regressionLevel: 0,
        desperationLevel: 0,
    },
}

let modStorageSaveString: string;

export function initStorage(): void {
    const data = {
        settings: {
            enabled:true,
            visuals:true,
            wetting: true,
            messing: true,
        
            intentionalLeaks:false,
            accidentalLeaks:false,

            messChance: .3,
            wetChance: .5,
            messageType: "internalMonologue",
            timerEnabled: true,
            timerDuration: 30*60*60,
            lastAccident: Date.now()/1000,
            regressionLevel: 0,
            desperationLevel: 0,
        },
        version: getModVersion(),
    };
	const storage = Player.ExtensionSettings.ABCL;
    if (typeof storage === "string") {
        const decompressed = LZString.decompressFromBase64(storage);
        modStorage = decompressed ? JSON.parse(decompressed) : data;
	} else {
		modStorage = data
	}
    
    Object.keys(data).forEach((key) => {
        // @ts-ignore
        if (modStorage[key] === undefined) {
            // @ts-ignore
            modStorage[key] = (data as any)[key];
        }
    });
    deserializeStorage()
    modStorageSaveString = JSON.stringify(modStorage);
    chatSendABCLMessage("syncStorage", {
        storage: modStorage,
    });

    hookFunction("ChatRoomMessage", 20, (args, next) => {
        const message = args[0];
        const sender = getPlayer(message.Sender);
        if (!sender) return next(args);
        if (message.Content === "abclmsg" && !sender.IsPlayer()) {
            const msg = message.Dictionary.msg;
            const data = message.Dictionary.data;
            if (msg === "syncStorage") {
				//@ts-ignore
                if (!sender.ABCL) {
                    chatSendABCLMessage("syncStorage", {
                        storage: modStorage,
                    }, sender.MemberNumber);
                }
				//@ts-ignore
                sender.ABCL = data.storage;
            }
        }
        next(args);
    });
    
    hookFunction("ChatRoomSync", -20, (args, next) => {
        next(args);
        chatSendABCLMessage("syncStorage", {
            storage: modStorage,
        });
    });

    // window.modStorage = modStorage;
}
export function deserializeStorage() {
    if (modStorage.topLayer) {
		modSession.topLayer = savedDiaperToDiaper(modStorage.topLayer)
	}
	if (modStorage.bottomLayer) {
		modSession.bottomLayer = savedDiaperToDiaper(modStorage.bottomLayer);
	}
    modSession.settings = modStorage.settings

}
export function serializeStorage() {
    if (modSession.topLayer) {
		modStorage.topLayer = diaperToSavedDiaper(modSession.topLayer)
	} else {
        modStorage.bottomLayer = null
    }
	if (modSession.bottomLayer) {
		modStorage.bottomLayer = diaperToSavedDiaper(modSession.bottomLayer);
	} else {
        modStorage.bottomLayer = null
    }
    modStorage.settings = modSession.settings
}

function updateModStorage(): void {
    if (typeof modStorage !== "object") return;
    serializeStorage()
	if (JSON.stringify(modStorage) === modStorageSaveString) return;
	modStorageSaveString = JSON.stringify(modStorage);
	Player.ExtensionSettings.ABCL = LZString.compressToBase64(JSON.stringify(modStorage));
	ServerPlayerExtensionSettingsSync("ABCL");
    chatSendABCLMessage("syncStorage", {
        storage: modStorage,
    });
}

setInterval(updateModStorage, 800);