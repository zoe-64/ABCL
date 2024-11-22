import { getModVersion } from "../index";
import { chatSendABCLMessage, getPlayer } from "./utils";
import { hookFunction } from "./bcModSdk";
import { Diaper} from "./diaper";
import { ABCLSettingsToSavedABCLSettings, diaperToSavedDiaper, savedABCLSettingsToABCLSettings, savedDiaperToDiaper, TABCLSettings, TsavedABCLSettings, TSavedDiaper } from "./save";

export interface ISessionStorage {
    topLayer?: Diaper | null
	bottomLayer?: Diaper | null
    settings: TABCLSettings
}
export interface IModStorage {
	topLayer?: TSavedDiaper | null
	bottomLayer?: TSavedDiaper | null
    settings: TsavedABCLSettings
    version: string
}

export let modStorage: IModStorage

const defaultSettings: TsavedABCLSettings = {
    enabled:true,
    visuals:true,
    wetting: true,
    messing: true,
    intentionalLeaks:false,
    accidentalLeaks:false,
    messChance: .3,
    wetChance: .5,
    messageType: "internalMonologue",
    timerPaused: false,
    timerDuration: 30*60,
    lastAccident: Date.now(),
    regressionLevel: 0,
    desperationLevel: 0,
    desperationMetabolismLevel: 0,
    settingAccess: [],
    allowedSettings: [],
}
export let modSession: ISessionStorage = {
    settings: savedABCLSettingsToABCLSettings(defaultSettings),
}

let modStorageSaveString: string;
function mergeData(target: any, source: any) {
    Object.keys(source).forEach((key) => {
        if (typeof source[key] === 'object' && source[key] !== null) {
            if (typeof target[key] !== 'object' || target[key] === null) {
                target[key] = Array.isArray(source[key]) ? [] : {};
            }
            mergeData(target[key], source[key]);
        } else {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }
    });
}
const defaultStorage = {
    settings: defaultSettings,
    version: getModVersion(),
};
export function initStorage(): void {
   
	const storage = Player.ExtensionSettings.ABCL;
    if (typeof storage === "string") {
        const decompressed = LZString.decompressFromBase64(storage);
        modStorage = decompressed ? JSON.parse(decompressed) : modSession;
	} else {
		modStorage = defaultStorage
	}
    mergeData(modStorage, defaultStorage);
    Object.keys(defaultStorage).forEach((key) => {
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
    modSession.settings = savedABCLSettingsToABCLSettings(modStorage.settings)

}
export function resetStorage() {
    modSession = {settings: savedABCLSettingsToABCLSettings(defaultSettings)}
}
export function serializeStorage() {
    if (modSession.topLayer) {
		modStorage.topLayer = diaperToSavedDiaper(modSession.topLayer)
	} else {
        modStorage.topLayer = null
    }
	if (modSession.bottomLayer) {
		modStorage.bottomLayer = diaperToSavedDiaper(modSession.bottomLayer);
	} else {
        modStorage.bottomLayer = null
    }
    modStorage.settings = ABCLSettingsToSavedABCLSettings(modSession.settings)
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