// ==UserScript==
// @name ABCL
// @namespace https://www.bondageprojects.com/
// @version 1.0
// @description Diaper lover mod for Bondage Club
// @author Zoe
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match http://localhost:*/*
// @icon data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant none
// @run-at document-end
// ==/UserScript==
/*
import { RandomInt, GetText, GetJson, SentenceBuilder, GetName, Pronoun, LocalCache, Messager, GetPlayer, AverageColor } from "../node_modules/zoelib/dist/zoelib.mjs";
import { runtime, DiaperUseLevels, templates, diaperDefaultValues, MessageType } from "./modules/data"
import { desperationTick, getDesperationLevel, getRegressionIncreese } from "./modules/stats";
import { modSession } from "./modules/storage";
import { promptMessage, sendChangeDiaperMessage } from "./modules/message";
import { hookFunction } from "./modules/bcModSdk";
import { Diaper, triggerDiaperAccident, triggerDiaperAction, updateDiaper } from "./modules/diaper";
import { getTimeUntilAccident, nextDiaperAction, TDiaperAction } from "./modules/utils";


const ABCLversion = "1.1.0";



if (typeof (globalThis as any).ABCLversion != 'undefined') {
    throw new Error("ABCL already loaded. No double loading");
}
var abcl:ABCL | null = null;

(globalThis as any).ABCLversion = ABCLversion;
(globalThis as any).ABCLLOADED = true;

//await createABCLHtml(runtime)


   

//#region Abcl                                  

    class ABCL {
eturn Math.floor((getTimeUntilAccident() / modifier)*100)/100;
        
        get nextEncounter() {
            let encounter = ((this.loopTimestamp + this.diaperTimer * 60 * 1000)- Date.now())/1000 // bruh I spent 30 minutes on this mang.. I should start sleeping
            return encounter;
        }
          
        // Checks to see if the user has a nursery milk equiped
       
       
 
        
      
        
        setupSettings() {
            
            PreferenceSubscreenList.push("Abcl" as PreferenceSubscreenName);
            // ABCL settings
            const abclSettings = document.querySelector('#abcl');
            if (!abclSettings) {
                console.error("ABCL settings not found");
                return;
            }
        
            if (!abcl) {
                return;
            }
        
            const setInputValue = (selector: string, value: any) => {
                const input = assertQuerySelector(selector) as HTMLInputElement;
                if (input.type === 'checkbox') {
                    input.checked = value;
                } else {
                    input.value = String(value);
                }
            };
          
        
            setInputValue("#abcl-visual input", modSession.settings.visuals);
            setInputValue("#abcl-wet input", modSession.settings.wetting);
            setInputValue("#abcl-mess input", modSession.settings.messing);
            setInputValue("#abcl-clothing-accidents input", modSession.settings.intentionalLeaks);
            setInputValue("#abcl-mess-wet-chance input", Math.floor((1 - modSession.settings.messChance) * 100));
            setInputValue("#abcl-message-type select", modSession.settings.messageType);
            setInputValue("#abcl-timer-duration input", modSession.settings.timerDuration);

            const settingsMap: Record<string, { event: string, handler: (e: Event) => void }> = {
                '#abcl-visual input': {
                    event: 'change', handler: (e: Event) => {
                        modSession.settings.visuals = (e.target as HTMLInputElement).checked;
                        updateDiaper();
                    }
                },
                '#abcl-wet input': {
                    event: 'change', handler: (e: Event) => {
                        modSession.settings.wetting = (e.target as HTMLInputElement).checked;
                    }
                },
                '#abcl-mess input': {
                    event: 'change', handler: (e: Event) => {
                        modSession.settings.messing = (e.target as HTMLInputElement).checked;
                    }
                },
                '#abcl-clothing-accidents input': {
                    event: 'change', handler: (e: Event) => {
                        modSession.settings.intentionalLeaks = (e.target as HTMLInputElement).checked;
                    }
                },
                '#abcl-mess-wet-chance input': {
                    event: 'change', handler: (e: Event) => {
                        const value = +(e.target as HTMLInputElement).value / 100;
                        modSession.settings.wetChance = value;
                        modSession.settings.messChance = 1 - value;
                    }
                },
                '#abcl-message-type select': {
                    event: 'change', handler: (e: Event) => {
                        modSession.settings.messageType = (e.target as HTMLInputElement).value as MessageType;
                    }
                },
                '#abcl-timer-duration input': {
                    event: 'change', handler: (e: Event) => {
                        modSession.settings.timerDuration = +(e.target as HTMLInputElement).value;
                    }
                }
            };
        
            for (const [selector, { event, handler }] of Object.entries(settingsMap)) {
                assertQuerySelector(selector).addEventListener(event, handler);
            }
        }
        
    }
    function assertQuerySelector(selector: string): Element {
        const el = document.querySelector(selector);
        
        if(!el) throw new Error(`Failed to find element for selector ${selector}`);
        return el;
    }

    if (CurrentScreen && CurrentScreen != "Login" && (globalThis as any).Abcl == null) {
        (globalThis as any).Abcl = new ABCL();
        abcl = (globalThis as any).Abcl;
        (globalThis as any).Abcl.setupSettings();
    }
    hookFunction('LoginDoLogin', 1, (args:any, next:Function) => {
        next(args);
        setTimeout(() => {
            if ((globalThis as any).Abcl == null) {
                (globalThis as any).Abcl = new ABCL();
                abcl = (globalThis as any).Abcl;
                (globalThis as any).Abcl.setupSettings();
            }
        }, 1000); // Player.MemberNumber takes a while to get set
    });

    
    
    
    class ABCLPermissions {
        abcl:ABCL
        trusted: (string | number)[]
        constructor(abcl:ABCL) {
            this.trusted = []
            this.abcl = abcl
            Messager.addBeepListener("getTrusted", 
                (json:string, sender:typeof Player.MemberNumber) => {
                    const msg = JSON.parse(json) as { "content": { "method"?: string }, "id"?: string };
                    const response = msg.content;
                    if (!response?.method || response.method !== "getTrusted") {
                        return;
                    }
                    const isTrusted = sender != null && this.trusted.includes(sender);
                    Messager.send({ "isTrusted": isTrusted, "id": msg.id }, sender, "HiddenBeep");
                })
            Messager.addBeepListener("addTrusted", 
                (json:string, sender:typeof Player.MemberNumber) => {
                    const msg = JSON.parse(json) as { "content": { "method"?: string }, "id"?: string };
                    const response = msg.content;
                    if (!response?.method || response.method !== "addTrusted") {
                        return;
                    }
                    if (!sender) {
                        return;
                    }
                    if (false) { // denied
                        Messager.send({ "success": false, "id": msg.id }, sender, "HiddenBeep");
                        return;
                    }
                    this.trusted.push(sender);
                    Messager.send({ "success": true, "id": msg.id }, sender, "HiddenBeep");
            })
    
        }
        async getTrusted(MemberNumber: typeof Player.MemberNumber): Promise<boolean> {
            try {
                const promise = Messager.request({ "method": "getTrusted" }, MemberNumber, "HiddenBeep");
                const response = await promise;
                if (response && typeof response.isTrusted === 'boolean') {
                    return response.isTrusted;
                } else {
                    console.error("Unexpected response structure:", response);
                    return false;
                }
            } catch (error) {
                console.error("Error in getTrusted:", error);
                return false; 
            }
        }
        async addTrusted(MemberNumber: typeof Player.MemberNumber): Promise<boolean> {
            try {
                const promise = Messager.request({ "method": "addTrusted" }, MemberNumber, "HiddenBeep");
                const response = await promise;
                return response.success;
            } catch (error) {
                console.error("Error in addTrusted:", error);
                return false; 
            }
        }
    }
   
  
*/