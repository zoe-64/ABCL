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

import { RandomInt, GetText, GetJson, SentenceBuilder, GetName, Pronoun, LocalCache, Messager, GetPlayer, AverageColor } from "../node_modules/zoelib/dist/zoelib.mjs";
const local = false;
// get the html from this url and paste it into game
// https://github.com/zoe-64/ABCL/blob/main/data/settings.html

async function statUpdateLoop() {
	if ((globalThis as any).Abcl != null) {
        let statBoxes = document.querySelectorAll('.stats-box');
        let seconds = (globalThis as any).Abcl.nextEncounter
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = Math.floor(seconds % 60);
        let chance = (globalThis as any).Abcl.calculateChance(); 
        for (let statbox of statBoxes) { // @ts-ignore
            statbox.querySelector('.wetCount').textContent = (globalThis as any).Abcl.wet.count * 60; // @ts-ignore
            statbox.querySelector('.messCount').textContent = (globalThis as any).Abcl.mess.count * 60; // @ts-ignore
            statbox.querySelector('.wetChance').textContent = Math.floor(chance.wet * 100) + '%'; // @ts-ignore
            statbox.querySelector('.messChance').textContent = Math.floor(chance.mess * 100) + '%'; // @ts-ignore
            
            statbox.querySelector('.tickMinutes').textContent = minutes; // @ts-ignore 
            statbox.querySelector('.tickSeconds').textContent = remainingSeconds; // @ts-ignore
            statbox.querySelector('.bar').style.width = (seconds/((globalThis as any).Abcl.diaperTimer*60)) * 100 + '%'; // @ts-ignore
            statbox.querySelector('.absorbancyTotal').textContent =  (globalThis as any).Abcl.absorbancy.total*60; // @ts-ignore

            statbox.querySelector('.desperationBase').textContent = Math.floor((globalThis as any).Abcl.desperation.base * 10) / 10; // @ts-ignore
            statbox.querySelector('.regressionbase').textContent = Math.floor(((globalThis as any).Abcl.regression.modifier + (globalThis as any).Abcl.regression.base) * 10) / 10;// @ts-ignore
            statbox.querySelector('.regressionModifier').textContent = Math.floor((globalThis as any).Abcl.regression.modifier * 10) / 10;// @ts-ignore 

        }
	}
}
setInterval(statUpdateLoop, 1000);
// @ts-ignore
var bcModSDK=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();
(async function() {
    if (typeof (globalThis as any).ABCLversion != 'undefined') {
        console.warn("ABCL already loaded. No double loading");
        return;
    }
    var abcl:ABCL | null = null;
    let runtime = "";
    if (local) {
        const runtimeElement = document.getElementById('ABCLruntimeID');
        if (!runtimeElement?.innerText) {
            console.error("Runtime element not found");
            return;
        }
        runtime = runtimeElement.innerText;
        const abclHtml = await GetText(runtime+"data/settings.html");
        document.body.insertAdjacentHTML('beforeend', abclHtml);
    } else {
        runtime = "https://raw.githubusercontent.com/zoe-64/ABCL/main/"; 
        const abclHtml = await GetText("https://raw.githubusercontent.com/zoe-64/ABCL/main/data/settings.html");
        document.body.insertAdjacentHTML('beforeend', abclHtml);
    }
    const ABCLversion = "1.0";
    const modApi = bcModSDK.registerMod({
        name: 'ABCL',
        fullName: 'Adult Baby Club Lover',
        version: ABCLversion,
        repository: 'https://github.com/zoe-64/ABCL',
    });
    (globalThis as any).ABCLversion = ABCLversion;
    
 
    
//#region Abcl                                  
    let templates = {
        stats: await GetText(runtime + "data/stats.html"),
        settings: await GetText(runtime + "data/settings.html"),
    }
    const ABCLdata = await GetJson(runtime+"data/dictionary.json");
    const DiaperUseLevels:Record<string, string> = {
        "Clean": "#8F8F8F",
        "Middlewet": "#ffe58b",
        "Maximumwet": "#ffd33e",
        "Middlemess": "#423019",
        "Maximummess": "#3C302C",
        "Selfwet": "#4F4B1B",
        "Selfmess": "#3B2B17",
    }
    // Table to store all the defaul values for Abcl()
    const diaperDefaultValues = {
        messChance: .3,
        wetChance: .5,
        timer: 30,
        regressionLevel: 0,
        desperationLevel: 0,
        messageType: "internalMonologue",
        wetting: true,
        messing: true,
        accidents: false,
        visual: true,
        enabled: true,
    };
    

    // Initializer function
    function getItemsBelow() {
        // if wearing stockings, socks, or shoes, skirt, they should be damp
        let socks = InventoryGet(Player, "Socks")?.Asset?.Description?.toLowerCase();
        let cloth = InventoryGet(Player, "Cloth")?.Asset?.Description?.toLowerCase();
        let panties = InventoryGet(Player, "Panties")?.Asset?.Description?.toLowerCase();
        let itemsBelow = [socks, cloth, panties];
        let itemsToLookFor = ["stockings", "socks", "shoes", "skirt", "panties", "dress"];

        let options = [];
        for (let word of itemsToLookFor) {
            for (let item of itemsBelow)
            if (item?.includes(word)) {
                options.push(item);
            }
        }
        let result = "";
        if (options.length > 1) {
            options = options.slice(0, 2);
            result = options.join(" and ");
            result += " gets"
        } else if (options.length === 1) {
            result = options[0] + " get";
        } else {
            result = "legs are";
        }
        return result;
    } 

    function promptMessage(unformatedMessage:string) {
        SentenceBuilder.target = Player;
        let message = SentenceBuilder.prompt(unformatedMessage, Player);

        if (typeof abcl == 'undefined' || abcl == null) {
            console.error("ABCL not loaded");
            return;
        }
        if (abcl.messageType == "internalMonologue") {
            Messager.localSend(message);
        } else {
            //ChatRoomSendEmote("/action "+ message)
            ServerSend("ChatRoomChat", {Content: "Beep", Type: "Action", Dictionary: [
                // EN
                { Tag: "Beep", Text: "msg" },
                { Tag: "msg", Text: message},
        
            ]});        
            //Messager.send(message, undefined,);
        }
    } 
   
    class ABCL {
        getRegressionItems(items=Player.Appearance) {
            let inFilter = [];
            for (let item of items) {
                if (ABCLdata.Items[item.Asset.Description]) {
                    inFilter.push(item);
                }
            }
            for (let item of items) {
                for (let key in ABCLdata.Regex) {
                    if (item.Asset.Description.toLowerCase().match(key.toLowerCase())) {
                        if (!inFilter.includes(item)) {
                            inFilter.push(item);
                        }
                    }
                }
            }       
            return inFilter;
        }
        // message calls
        ABCLMessagerListener(response:ServerChatRoomMessage):boolean {
            if (response.Type == "Hidden") {   
                try {
                    JSON.parse(response.Content);
                } catch (e) {
                    return false
                }
                let content = JSON.parse(response.Content);                
                if (content.Action == "ChangeDiaper" && content.MemberNumber == Player.MemberNumber) {
                    if ((globalThis as any).BCC_LOADED) { // @ts-ignore
                        //if (hasPermissionToChangeDiaper(content.Sender)) { 
                	//	this.changeDiaper(Player, GetName(Player));
                        //}
                    }
                    let player = GetPlayer(content.MemberNumber);
                    let responder:typeof Player = GetPlayer(response.Sender) as typeof Player;
                    if (player) {
                        this.changeDiaper(player, GetName(responder));
                    }
                }
            }
            return false
        }

        cache:LocalCache;
        enabled:boolean;
        visual:boolean;
        accidents:boolean;
        messageType:string;
        loopTimestamp:number;
        wet: {
            _enabled:boolean,
            _wets:number,
            _wetChance:number,
            count:number,
            base:number,
            chance:number,
            enabled:boolean
        };
        mess: {
            _enabled:boolean,
            _messes:number,
            _messChance:number,
            count:number,
            base:number,
            chance:number,
            enabled:boolean
        };
        regression: {
            _regression:number,
            base:number,
            modifier:number,
            step:()=>void
        };
        desperation: {
            _desperation:number,
            base:number,
            modifier:number,
            check:()=>void
        };
        absorbancy: {
            total:number
        };
        timer:number;
        _PelvisItem:Item | null;
        _PantiesItem:Item | null;
        automatic_accidents:boolean;
        constructor() {
            SentenceBuilder.data["§name§"] = {get neutral() {return [GetName(Player)]}};
            SentenceBuilder.data["§items-below§"] = {get neutral() {return [getItemsBelow()]}};
            SentenceBuilder.data["§current-diaper§"] = {get neutral() {return [InventoryGet(Player, "ItemPelvis")?.Asset?.Description || InventoryGet(Player, "Panties")?.Asset?.Description || "diaper"]}};
            SentenceBuilder.data["§by-player§"] = {"neutral":[Pronoun.get("Reflexive", Player)]};
            SentenceBuilder.data = {...ABCLdata.verbs, ...SentenceBuilder.data};

           
            (globalThis as any).Abcl = this;
            const abcl = this;
            this.cache = new LocalCache(`Abcl-${Player.MemberNumber}`);
            this._PelvisItem = null,
            this._PantiesItem = null,
            Messager.listener(this.ABCLMessagerListener.bind(this), -5, "ABCL Message Processor");
            this.loopTimestamp = Date.now();

            // options
            this.enabled = this.cache.get("enabled", diaperDefaultValues.enabled);
            this.visual = this.cache.get("visual", diaperDefaultValues.visual);
            this.accidents = this.cache.get("accidents", diaperDefaultValues.accidents);
            this.messageType = this.cache.get("messageType", diaperDefaultValues.messageType);
            this.timer = this.cache.get("timer", diaperDefaultValues.timer);
            this.automatic_accidents = this.cache.get("automatic_accidents", true);
            // Handle modifiers
            
            this.wet = {
                _enabled: abcl.cache.get("wet_enabled", diaperDefaultValues.wetting),
                _wets: abcl.cache.get("wet_count", 0),
                _wetChance: abcl.cache.get("wet_base", diaperDefaultValues.wetChance),
                set count(value) {
                    this._wets = value;
                    abcl.cache.set("wet_count", value);
                    abcl.refreshDiaper();
                },
                get count() {return this._wets},
                set base(value) {
                    this._wetChance = value
                    abcl.cache.set("wet_base", value);
                },
                get base() {return this._wetChance},
                get chance() {
                    let chance = this._wetChance;
                    for (let item of abcl.getRegressionItems()) {
                        for (let key in ABCLdata.CraftingModifiers.wetChance) {
                            chance += item?.Craft?.Description?.includes(key) ? ABCLdata.CraftingModifiers.wetChance[key] : 0;
                        }
                    }
                    return chance;
                },
                get enabled() {
                    return this._enabled;
                },
                set enabled(value) {
                    this._enabled = value
                    abcl.cache.set("wet_enabled", value);
                }
            };
            this.mess = {
                _enabled: abcl.cache.get("mess_enabled", diaperDefaultValues.messing) ,
                _messes: abcl.cache.get("mess_count", 0),
                _messChance: abcl.cache.get("mess_base", diaperDefaultValues.messChance),
                set count(value) {
                    this._messes = value;
                    abcl.cache.set("mess_count", value);
                    abcl.refreshDiaper();
                },
                get count() {return this._messes},
                set base(value) {
                    this._messChance = value
                    abcl.cache.set("mess_base", value);
                },
                get base() {return this._messChance},
                get chance() {
                    let chance = this._messChance;
                    for (let item of abcl.getRegressionItems()) {
                        for (let key in ABCLdata.CraftingModifiers.messChance) {
                            chance += item?.Craft?.Description?.includes(key) ? ABCLdata.CraftingModifiers.messChance[key] : 0;
                        }
                    }
                    return chance;
                },
                get enabled() {
                    return this._enabled;
                },
                set enabled(value) {
                    this._enabled = value;
                    abcl.cache.set("mess_enabled", value);
                }
            }
            this.regression = {
                _regression: abcl.cache.get("regression", diaperDefaultValues.regressionLevel),
                get base() {return this._regression},
                set base(value) {
                    this._regression = value
                    abcl.cache.set("regression", value);
                },
                get modifier() {
                    let total = 0;
                    for (let item of Player.Appearance) {
                        if (ABCLdata.Items[item.Asset.Description]) {
                            total += ABCLdata.Items[item.Asset.Description].modifier;
                        }
                        for (let key in ABCLdata.Regex) {
                            if (item.Asset.Description.toLowerCase().match(key.toLowerCase())) {
                                total += ABCLdata.Regex[key].modifier;
                            }
                        }
                    }
                    for (let item of abcl.getRegressionItems()) {
                        for (let key in ABCLdata.CraftingModifiers.regression) {
                            total += item?.Craft?.Description?.includes(key) ? ABCLdata.CraftingModifiers.regression[key] : 0;
                        }
                    }
                    return total;
                },
                step() {
                    this.base += this.modifier;
                }
            }

            this.desperation = {
                _desperation: abcl.cache.get("desperation", diaperDefaultValues.desperationLevel),
                get base() { return this._desperation },
                set base(value) { 
                    this._desperation = value
                    abcl.cache.set("desperation", value);
                },
                get modifier() {
                    let total = this._desperation;
                    for (let item of abcl.getRegressionItems()) {
                        for (let key in ABCLdata.CraftingModifiers.desperation) {
                            total += item?.Craft?.Description?.includes(key) ? ABCLdata.CraftingModifiers.regression[key] : 0;
                        }
                    };
                    
                    return total;
                },
                check() {
                    if (abcl.isMilk()) {
                        this.base = 3;
                    }
                    if (!abcl.isMilk()) {
                        this.base = (this.base != 0) ? this.base - 1 : 0;
                    }
                }
            }
            
            this.absorbancy = { 
                get total() {
                    let total = 0;
                    if (abcl.PelvisItem) {
                        total += ABCLdata["Diapers"][abcl.PelvisItem.Asset.Description].absorbancy;
                        for (let key in ABCLdata.CraftingModifiers.absorbancy) {
                            if (abcl.PelvisItem?.Craft?.Description?.includes(key)) {
                                total += ABCLdata.CraftingModifiers.absorbancy[key];
                            }
                        }
                    }
                  
                    if (abcl.PantiesItem) {
                        total += ABCLdata["Diapers"][abcl.PantiesItem.Asset.Description].absorbancy;
                    }
                    
                        
                    return total;
                }
            }
           
            this.loop();
            
        }
      
        get diaperTimer() {
            
            let modifier = Math.pow(1.02, (this.regression.base+1)) * (this.desperation.modifier + 1)

            return Math.floor((this.timer / modifier)*100)/100;
        }
        get nextEncounter() {
          
            let encounter = ((this.loopTimestamp + this.diaperTimer * 60 * 1000)- Date.now())/1000 // bruh I spent 30 minutes on this mang.. I should start sleeping
            return encounter;
        }
        
        set PelvisItem(item:Item | null) { 
            this._PelvisItem = item;
            if (!this._PelvisItem && !this._PantiesItem) {
                this.mess.count = 0;
                this.wet.count = 0;
            }
            //setTimeout(() => this.refreshDiaper(), 5000);
        }
        get PelvisItem(): Item | null {
            this._PelvisItem = InventoryGet(Player, 'ItemPelvis');
            if (this._PelvisItem == null) {
                return null;
            }
            return this.isDiaper(this._PelvisItem) ? this._PelvisItem: null;
        }
        set PantiesItem(item: Item | null) {
            this._PantiesItem = item;
            if (!this._PelvisItem && !this._PantiesItem) {
                this.mess.count = 0;
                this.wet.count = 0;
            }
            setTimeout(() => this.refreshDiaper(), 5000);
        }
        get PantiesItem(): Item | null {
            this._PantiesItem = InventoryGet(Player, 'Panties');
            if (this._PantiesItem == null) {
                return null;
            }
            return this.isDiaper(this._PantiesItem) ? this._PantiesItem: null;
        }
        reset() {
            localStorage.removeItem(`Abcl-${Player.MemberNumber}`);
            setTimeout(() => location.reload(), 2000);
        }
        refreshDiaper() { 
            if (!this.enabled) {
                return;
            }
            this.updateDiaperColor("ItemPelvis");
            this.updateDiaperColor("Panties");
            CharacterRefresh(Player, true);
            ChatRoomCharacterUpdate(Player);
        }

        changeDiaper(player:typeof Player, by="self") {
            if (player != Player && player != null) { // change another player's diaper
                Messager.send({"Action": "ChangeDiaper", "MemberNumber": player.MemberNumber}, player.MemberNumber, "Hidden");
                return;
            }
            if ((globalThis as any).BCC_LOADED) { // @ts-ignore
                if (!hasPermissionToChangeDiaper(Player, Player)) {
                    return;
                }
            }
            this.PelvisItem = InventoryGet(Player, "ItemPelvis");
            this.PantiesItem = InventoryGet(Player, "Panties");
            
            this.wet.count = 0;
            this.mess.count = 0;
           
            this.updateDiaperColor("ItemPelvis");
            this.updateDiaperColor("Panties");
              // being changed by someone else
            if (by != "self") {
                SentenceBuilder.data["§by-player§"] = {"neutral":[by]};
                promptMessage(ABCLdata.messages[this.messageType]["changeBy"]);
            } else {
                SentenceBuilder.data["§by-player§"] = {"neutral":[GetName(Player)]};
                promptMessage(ABCLdata.messages[this.messageType]["changeSelf"]);
                SentenceBuilder.data["§by-player§"] = {"neutral":[Pronoun.get("Reflexive", Player)]};
            }
           
        }
            
        // Check for if a diaper is in the Panties or ItemPelvies slot
        isDiaper(item:Item) {
            return item?.Asset?.Description.toLowerCase().includes('diaper');
        }
        // Checks to see if the user has a nursery milk equiped
        hasMilk() {
            return (InventoryGet(Player, "ItemMouth")?.Asset?.Name === "RegressedMilk") || (InventoryGet(Player, "ItemMouth2")?.Asset?.Name === "RegressedMilk") || (InventoryGet(Player, "ItemMouth3")?.Asset?.Name === "RegressedMilk");
        }
        // Checks for a normal milk bottle
        isMilk() {
            let items = Player.Appearance
            for (let item of items) {
                if (item.Asset.Description.toLowerCase().includes("milk")) {
                    return true;
                }
            }
            return false;
        }

       
        // ItemPelvis or Panties as slot
        updateDiaperColor(slot: AssetGroupName) { // this section is a bit more messy than the other
            if (!this.enabled || !this.visual) {
                return;
            }
            let item = InventoryGet(Player, slot);
            if (!item || !item.Color || !this.isDiaper(item)) { 
                return;
            }
            
            if (typeof item.Color == "object") {
                for (let index in item.Color) {
                    if (item.Color[index] == "Default") {
                        item.Color[index] = item.Asset.DefaultColor[index];
                    }
                }
            } else if (item.Color == "Default" && typeof item.Color == "string") {
                item.Color = item.Asset.DefaultColor as ItemColor;
            }

            let diaper = ABCLdata["Diapers"][item.Asset.Description];
            if ((diaper.type === "primary" || diaper.type === "primary&secondary") && typeof item.Color == "string") {
                item.Color = item.Asset.DefaultColor as ItemColor;
            }
            let color = {
                messy: DiaperUseLevels["Clean"],
                wet: DiaperUseLevels["Clean"] // in the end we just mix these together but messy is 50% stronger
            }
            let delta = {
                "messy": this.mess.count / this.absorbancy.total,
                "wet": this.wet.count / this.absorbancy.total,
            }
            // between clean and middle messy
            if (delta.messy > 0.75) {
                // between middle and maximum messy
                if (delta.messy > 0.9) {
                    color.messy = DiaperUseLevels["Maximummess"];
                } else {
                    color.messy = AverageColor(DiaperUseLevels["Maximummess"], DiaperUseLevels["Middlemess"], delta.messy - 0.75);
                }
            } else {
                color.messy = AverageColor(DiaperUseLevels["Middlemess"], DiaperUseLevels["Clean"], delta.messy);
            }
            if (delta.wet > 0.75) {
                // between clean and middle wet
                if (delta.wet > 0.9) {
                    color.wet = DiaperUseLevels["Maximumwet"];
                } else {
                    color.wet = AverageColor(DiaperUseLevels["Maximumwet"], DiaperUseLevels["Middlewet"], delta.wet - 0.75);
                }
            } else {
                color.wet = AverageColor(DiaperUseLevels["Middlewet"], DiaperUseLevels["Clean"], delta.wet);
            }
            let primary = AverageColor(color.messy, color.wet, 0.7);
            let secondary = AverageColor(color.messy, color.wet, 0.9);
            if (diaper.type == "mono") {
                item.Color = primary; 
            }
            
            else if (diaper.type === "primary" && typeof item.Color != "string") {
                item.Color[ABCLdata["Diapers"][item.Asset.Description].indexes[0]] = primary;
            }
            
            else if (diaper.type === "primary&secondary" && typeof item.Color != "string") {     
                let primary_index = ABCLdata["Diapers"][item.Asset.Description].indexes[0]
                let secondary_index = ABCLdata["Diapers"][item.Asset.Description].indexes[1]
                item.Color[primary_index] = primary
                item.Color[secondary_index] = secondary
            }
        
        }

        accident(result:string | null = null) {
            if (!this.enabled || !this.accidents) {
                return;
            }
            if (result == null) {
                result = "self" + this.calculateChance()["result"];
                if (result == "nothing") return; 
            }
            promptMessage(ABCLdata.messages[this.messageType][result])

            if (!this.visual) return
            let itemsBelow = []
            itemsBelow.push(
                ...(["Shoes", "Socks", "Panties", "ItemPelvis", "ItemBoots", "Garters", "RightAnklet", "LeftAnklet", "SuitLower", "ClothLower"] as AssetGroupName[])
                    .map(slot => InventoryGet(Player, slot))
            );
            itemsBelow = itemsBelow.filter(item => item != null);
            for (let item of itemsBelow) {
                    if (!item.Color) continue;
                    if (typeof item.Color === "string") {
                        item.Color = AverageColor(item.Color, DiaperUseLevels[result], 0.2);
                    } else {
                    for(let index = 0; index < item.Color.length; index++) {
                        item.Color[index] = AverageColor(item.Color[index], DiaperUseLevels[result], 0.2);                                           
                    }
                }    
            }
            
            this.refreshDiaper();
        }
        async loop() {
            while (true) {
                if (!this.enabled || !this.automatic_accidents || this.nextEncounter > 0) {
                    await new Promise(r => setTimeout(r, this.diaperTimer * 1000));
                    continue;
                }
                this.loopTimestamp = Date.now();

                
                const pelvis = InventoryGet(Player, "ItemPelvis");
                const panties = InventoryGet(Player, "Panties");
                if (pelvis && this.isDiaper(pelvis) || panties && this.isDiaper(panties)) {
                    this.tick();
                } else {
                    this.regression.step();
                    this.desperation.check();
                    this.accident();
                }
            }
        }
        calculateChance() {
            const chanceForNothing = 0.1
            const total = this.mess.chance + this.wet.chance + chanceForNothing;
            const messChance = this.mess.chance / total * +this.mess.enabled;
            const wetChance = this.wet.chance / total * +this.wet.enabled;
            const result = ["mess","wet","nothing"][+('0'.repeat(messChance*100) + '1'.repeat(wetChance*100) + '2'.repeat(chanceForNothing*100))[RandomInt(0, total*100)]]; 
            return {result:result, mess:messChance, wet:wetChance, nothing:chanceForNothing};
        }
        tick() {
            const result = this.calculateChance()["result"]
            if (result == "nothing") {
                return;
            }
            this.regression.step();
            this.desperation.check();
            let property = {"mess":()=>{return this.mess}, "wet":()=>{return this.wet}}[result] // I know how unusual this looks but it's short and effective
            if (property == null) {
                return;
            }
            property().count += 1;
            let message = "immergency";
            if (this.absorbancy.total > this.mess.count + this.wet.count) {
                message = result 
            } else if (this.absorbancy.total == this.mess.count + this.wet.count)  {
                message = "fully"+result;
            } 
            promptMessage(ABCLdata.messages[this.messageType][message]);
            
            this.updateDiaperColor("ItemPelvis");
            this.updateDiaperColor("Panties");
            ChatRoomCharacterUpdate(Player);
        }
        setupSettings() {
            
            PreferenceSubscreenList.push("Abcl" as PreferenceSubscreenName);
            // ABCL settings
            const abcl_settings = document.querySelector('#abcl');
            const inspect = document.querySelector('.inspect');
            if (!abcl_settings || !inspect) {
                console.error("ABCL settings not found");
                return;
            }
            // on hover change inspect
            const abcl_descriptions:Record<string, string> = {
                'abcl-visual': 'The visibility of wetting and soiling diapers including accidents.',
                'abcl-wetting': 'The wetting of diapers.',
                'abcl-messing': 'The soiling of diapers.',
                'abcl-accidents': 'Controls having accidents accidents when not wearing protection.',
                'abcl-wetting-rate': 'The chance of wetting diapers.',
                'abcl-messing-rate': 'The chance of soiling diapers.',
                'abcl-message-type': 'The style of messages that happen after an event.',
                'abcl-toggle': 'If the ABCL system is enabled or disabled.',
                'abcl-toggle-text': 'If the ABCL system is enabled or disabled.',
                'abcl-timer-duration': 'The time in minutes between accidents.',
                'abcl-automatic-accidents': 'If the system should automatically have accidents'
            };
            abcl_settings.addEventListener('mouseover', (e:Event) => {
                if ((e.target as HTMLElement).id in abcl_descriptions) {
                    if (inspect.querySelector('p') != null) {
                        (inspect.querySelector('p') as HTMLElement).textContent = abcl_descriptions[(e.target as HTMLElement).id];
                    }
                
                }
            });
            if (!abcl) {
                return;
            }
            (assertQuerySelector("#abcl-visual input") as HTMLInputElement).checked = abcl.visual;
            (assertQuerySelector("#abcl-wetting input") as HTMLInputElement).checked = abcl.wet.enabled;
            (assertQuerySelector("#abcl-messing input") as HTMLInputElement).checked = abcl.mess.enabled;
            (assertQuerySelector("#abcl-accidents input") as HTMLInputElement).checked = abcl.accidents;
            (assertQuerySelector("#abcl-wetting-rate input") as HTMLInputElement).value = String(Math.floor(abcl.mess.base*100));
            (assertQuerySelector("#abcl-messing-rate input") as HTMLInputElement).value = String(Math.floor(abcl.wet.base*100));
            (assertQuerySelector("#abcl-message-type select") as HTMLInputElement).value = abcl.messageType;
            (assertQuerySelector("#abcl-toggle") as HTMLInputElement).checked = abcl.enabled;
            (assertQuerySelector("#abcl-timer-duration input") as HTMLInputElement).value = String(abcl.timer);
            (assertQuerySelector("#abcl-automatic-accidents") as HTMLInputElement).checked = abcl.automatic_accidents;
            const settingsMap: Record<string, {property?: string, event: string, handler: (e:Event) => void}> = {
                '#abcl-visual input': { property: 'visual', event: 'change', handler: (e:Event) => { 
                    this.visual = (e.target as HTMLInputElement).checked; 
                    this.cache.set("visual", this.visual);
                    this.refreshDiaper(); 
                }},
                '#abcl-wetting input': {event: 'change', handler: (e:Event) => { 
                    this.wet.enabled = (e.target as HTMLInputElement).checked; 
                 } },
                '#abcl-messing input': {event: 'change', handler: (e:Event) => { 
                    this.mess.enabled = (e.target as HTMLInputElement).checked; 
                } },
                '#abcl-accidents input': {event: 'change', handler: (e:Event) => { 
                    this.accidents = (e.target as HTMLInputElement).checked; 
                    this.cache.set("accidents", (e.target as HTMLInputElement).checked);
                } },
                '#abcl-wetting-rate input':{event: 'change', handler: (e:Event) => {
                    this.wet.base = +(e.target as HTMLInputElement).value / 100; 
                } },
                '#abcl-messing-rate input': {event: 'change', handler: (e:Event) => {
                    this.mess.base = +(e.target as HTMLInputElement).value / 100; 
                    
                } },
                '#abcl-message-type select': {event: 'change', handler: (e:Event) => {
                    this.messageType = (e.target as HTMLInputElement).value
                    this.cache.set("messageType",  this.messageType);
            } },
                '#abcl-toggle': {event: 'change', handler: (e:Event) => {
                    this.enabled = (e.target as HTMLInputElement).checked;
                    this.cache.set("enabled", this.enabled);
            } }, 
                '#abcl-timer-duration input': {event: 'change', handler: (e:Event) => {
                    this.timer = +(e.target as HTMLInputElement).value;
                    this.cache.set("timer", this.timer);
                } },
                '#abcl-automatic-accidents': {event: 'change', handler: (e:Event) => {
                    this.automatic_accidents = (e.target as HTMLInputElement).checked;
                    this.cache.set("automatic_accidents", this.automatic_accidents); 
                }}
            };

            for (const key of Object.keys(settingsMap)) {
                const {event, handler } = settingsMap[key];
                assertQuerySelector(key).addEventListener(event, handler);
            }
        }
        test() {
            if (!abcl) {
                console.error("ABCL not loaded");
                return;
            }
            abcl.changeDiaper(Player);
            abcl.accident("selfwet");
            abcl.accident("selfmess");
            abcl.tick();
            abcl.regression.step();
            abcl.desperation.check();
        }

    }
    function assertQuerySelector(selector: string): Element {
        const el = document.querySelector(selector);
        
        if(!el) throw new Error(`Failed to find element for selector ${selector}`);
        return el;
    }
    //hooks
    ABCLLoginDoLogin();
    ABCLCharacterAppearanceSetItem();
    ABCLTextGet();
    ABCLDrawButton();
    if (CurrentScreen && CurrentScreen != "Login" && (globalThis as any).Abcl == null) {
        (globalThis as any).Abcl = new ABCL();
        abcl = (globalThis as any).Abcl;
        (globalThis as any).Abcl.setupSettings();
    }
    async function ABCLLoginDoLogin() {
        modApi.hookFunction('LoginDoLogin', 1, (args:any, next:Function) => {
            next(args);
            setTimeout(() => {
                if ((globalThis as any).Abcl == null) {
                    (globalThis as any).Abcl = new ABCL();
                    abcl = (globalThis as any).Abcl;
                    (globalThis as any).Abcl.setupSettings();
                }
            }, 1000); // Player.MemberNumber takes a while to get set
        }
        );
    }
    async function ABCLCharacterAppearanceSetItem() {
        modApi.hookFunction('CharacterAppearanceSetItem', 2, (args:any, next:Function) => {
            let [_character, slot, _asset] = args;
      
            if (abcl) {
                let item = {"Asset":_asset}
                if (slot == "ItemPelvis") {
                    console.log("Pelvis", item, abcl.isDiaper(item));
                    abcl.PelvisItem = abcl.isDiaper(item) ? item : null;
                }
                if (slot == "Panties") {
                    abcl.PantiesItem = abcl.isDiaper(item) ? item : null;
                } 
            }
          
            return next(args);
        });
    }
    async function ABCLTextGet() {
        modApi.hookFunction('TextGet', 2,  (args:any, next:Function) => {
            if(args[0] == "HomepageAbcl") return "ABCL";
            else return next(args);
        });
    }
    async function ABCLDrawButton() {
        modApi.hookFunction("DrawButton", 2,  (args:any, next:Function) => {
			// 7th argument is the image url
			if(args[6] == "Icons/Abcl.png") args[6] = runtime + "images/abcl.png";
			return next(args);
		});
    }
    (globalThis as any).PreferenceSubscreenAbclLoad = () => {
        assertQuerySelector("#abcl").classList.remove("hidden");
    }
    (globalThis as any).PreferenceSubscreenAbclRun = () => {}
    (globalThis as any).PreferenceSubscreenAbclExit= () => {
        assertQuerySelector("#abcl").classList.add("hidden");
        PreferenceSubscreen = "";
        PreferenceMessage = "";
    }
    
    CommandCombine([{
        Tag: 'abcl',
        Description: "Type /abcl help for a list of commands.",
        Action: (args) => {
            let [command, ...input] = args.split(/[ ,]+/);
            let identifier = input[0]
            if (!abcl) {
                return;
            }
            switch (command) {
                case "" || "help": 
                    ChatRoomSendLocal(
                        "<p style='background-color:#ecc826'><b>ABCL</b>: Welcome to Adult Baby Club Lover! Where we make sure babies use their diapers!\n" +
                        " \n" +
                        "<b>/abcl tick</b> to force a tick\n" +
                        "<b>/abcl stats</b> to see your current diaper stats\n" +
                        "<b>/abcl help</b> to see this message\n" +
                        " \n" +
                        "To get new clean diapers:\n" +
                        "<b>/abcl change</b> to change your diaper\n" +
                        "<b>/abcl change (target)</b> to change someone else's diaper\n" +
                        " \n" +
                        "If you have any issues or suggestions then please join https://discord.gg/V9rNpRQqtZ</p>"
                    );
                break;
                case "stats":
                    ChatRoomSendLocal(templates.stats);  
                break;
                case "tick":
                    let pelvis = InventoryGet(Player, "ItemPelvis");
                    let panties = InventoryGet(Player, "Panties");
                    if (pelvis && abcl.isDiaper(pelvis) || panties && abcl.isDiaper(panties)) {
                        abcl.tick();
                    } else {
                        abcl.accident();
                    }
                    ChatRoomSendLocal(`<p style='background-color:#ecc826'>ABCL: ${Player.Nickname == '' ? Player.Name : Player.Nickname} uses ${Pronoun.get("dependent", Player)} timemachine.</p>`);
                break;
                case "change":
                    if (identifier == null) {
                        if (!(abcl.PelvisItem || abcl.PantiesItem)) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#ecc826'>ABCL: You don't have a diaper!</p>"
                            );
                        } else 
                            abcl.changeDiaper(Player);
                        } else {
                            // inputs: Player.Name, Player.MemberNumber, Player.Nickname
                            let player = GetPlayer(identifier) as typeof Player;                                
                            if (player == null) {
                                ChatRoomSendLocal("<p style='background-color:#ecc826'>ABCL: Player not found!</p>");
                                break;
                            }
                            let pelvis = InventoryGet(player, "ItemPelvis");
                            let panties = InventoryGet(player, "Panties");

                            if (pelvis && abcl.isDiaper(pelvis) || panties && abcl.isDiaper(panties)) {
                                abcl.changeDiaper(player);
                            } else {
                                ChatRoomSendLocal("<p style='background-color:#ecc826'>ABCL: " + ChatRoomHTMLEntities(GetName(player)) + " does not have a diaper!</p>");
                            }
                            
                        } 
                break;
                default:
                    ChatRoomSendLocal("<p style='background-color:#ecc826'>ABCL: Unknown command. Type /abcl help for a list of commands.</p>");
                break;
            }
        }
    }]);

})();

