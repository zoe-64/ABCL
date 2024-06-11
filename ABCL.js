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

//SDK stuff
var bcModSDK=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();
//SDKstuff end

(async function() {
    if (window.ABCLversion) {
        console.warn("ABCL already loaded. No double loading");
        return;
    }
    abcl = null;
    
    const ABCLversion = "1.0";
    const modApi = bcModSDK.registerMod({
        name: 'ABCL',
        fullName: 'Adult Baby Club Lover',
        version: ABCLversion,
        repository: 'https://github.com/zoe-64/ABCL',
    });

    window.ABCLversion = ABCLversion;

// general functions
const pronounMap = {
        "HeHim": {"subjective": "he", "objective": "him", "dependent": "his", "independent": "his", "reflexive": "himself"},
        "SheHer": {"subjective": "she", "objective": "her", "dependent": "her", "independent": "hers", "reflexive": "herself"},
        "TheyThem": {"subjective": "they", "objective": "them", "dependent": "their", "independent": "theirs", "reflexive": "themself"},
        "ItIt": {"subjective": "it", "objective": "it", "dependent": "its", "independent": "its", "reflexive": "itself"}, // not sure if it's even used
};
/**
 * @param {String} shape aka subjecive (they, she), objective (them, her),  depdendant (their, her), independent (theirs, hers), reflexive (themself, herself)
 * @returns {String} pronoun
 */
function Pronoun(shape) {
    let pronouns = Player.GetPronouns()
    return pronounMap[pronouns][shape.toLowerCase()]
}

function getJson(url) {
    return fetch(url).then(response => response.json());
}
 
//#region Abcl                                  
  

    DiaperUseLevels = {
        "Clean": "#8F8F8F",
        "MiddleWet": "#ffe58b",
        "MaximumWet": "#ffd33e",
        "MiddleMessy": "#423019",
        "MaximumMessy": "#3C302C",
        "SelfWet": "#4F4B1B",
        "SelfMessy": "#3B2B17",
    }
    // Table to store all the defaul values for Abcl()
    const diaperDefaultValues = {
        messChance: .3,
        wetChance: .5,
        baseTimer: 30,
        regressionLevel: 0,
        desperationLevel: 0,
        messageType: "default",
    };

    // Convert the hex color to an RGB array
    function hexToRgb(hex) {
        if (hex == "Default" || hex == "#") {
            hex = "#808080";
        }
        return hex.replace(/^#/, '').match(/.{2}/g).map(x => parseInt(x, 16));
    }
    // Convert the RGB array to a hex color
    function rgbToHex([r, g, b]) {
        return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    }

    function averageColor(hex1, hex2, ratio = 0.5) {
        // Convert hex colors to RGB arrays
        let rgb1 = hexToRgb(hex1);
        let rgb2 = hexToRgb(hex2);
    
        // Calculate the weighted average RGB values based on the ratio
        let avgRgb = rgb1.map((x, i) => Math.round(x * ratio + rgb2[i] * (1 - ratio)));
    
        // Convert the average RGB values back to hex
        return rgbToHex(avgRgb);
    }

    // Initializer function
    const verbs = {
        "trembles": ["trembles", "shudders", "shakes", "quivers", "shivers", "struggles", "squirms"],
        "trembling": ["trembling", "shaking", "quivering", "shivering", "struggling", "squirming"],
        "moan": ["moan", "groan", "whimper", "whine", "cry"],
        "squirm": ["squirm", "wriggle", "fidget", "shift", "shuffle"],
        "blush": ["blush", "flush", "redden"],
        "quickly": ["quickly", "rapidly", "swiftly", "promptly"],
        "desperately": ["desperatly", "frantically", "anxiously"],
        "burns": ["burns", "flushes", "glows"],
        "embarrassment": ["embarrassment", "shame", "humiliation"],
        "obvious": ["obvious", "clear", "evident"],
        "wet": ["wet", "soaked", "soggy", "damp", "moist"],
        "has-wet": ["wet", "soaked"],
        "warm": ["warm", "hot"],
        "diaper": ["diaper", "nappy", "pullup"],
    }
    function getVerb(verb) {
        return verbs[verb][Math.floor(Math.random() * verbs[verb].length)];
    }
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
    function promptMessage(messageOptions) {
        let message = messageOptions[Math.floor(Math.random() * messageOptions.length)];
        currentDiaper = InventoryGet(Player, "ItemPelvis")?.Asset?.Description || InventoryGet(Player, "Panties")?.Asset?.Description || "diaper";
        message = message.replace(/%name%/g, Player.Nickname != '' ? Player.Nickname : Player.Name)
                         .replace(/%dependent%/g, Pronoun("Dependent"))
                         .replace(/%objective%/g, Pronoun("Objective"))
                         .replace(/%subjective%/g, Pronoun("Subjective"))
                         .replace(/%items-below%/g, getItemsBelow())
                         .replace(/%current-diaper%/g, currentDiaper);
        for(let verb in verbs) {
            message = message.replace(new RegExp(`%${verb}%`, "g"), getVerb(verb));
        }

        console.log(message);
        if (abcl.messageType === "descreet") {
            ChatRoomSendLocal(
                message,
                false
            )
        } else {
        ServerSend("ChatRoomChat", {
            Type: "Action",
            Content: "gag",
            Dictionary: [{
                Tag: "gag",
                Text: message
            }]
        });
        }
    } 
    const ABCLdata = await getJson("https://raw.githubusercontent.com/zoe-64/ABCL/main/dictionary.json");
   
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
        constructor() {

            const abcl = this;
            this.messageType = diaperDefaultValues.messageType || "default",
            this._wets = 0,
            this._messes = 0,
            this._PelvisItem = false,
            this._PantiesItem = false,
            this._messChance = diaperDefaultValues.messChance,
            this._wetChance = diaperDefaultValues.wetChance,
            this._regression = diaperDefaultValues.regressionLevel,
            this._desperation = diaperDefaultValues.desperationLevel
            this.enabled = true;

            this.loopTimestamp = Date.now();
            // Handle modifiers
            
            this.wet = {
                set count(value) {
                    abcl._wets = value;
                    abcl.refreshDiaper();
                },
                get count() {return abcl._wets},
                set base(value) {abcl._wetChance = value},
                get base() {return abcl._wetChance},
                get chance() {
                    let chance = abcl._wetChance;
                    for (let item of abcl.getRegressionItems()) {
                        for (let key in ABCLdata.CraftingModifiers.wetChance) {
                            chance += item?.Craft?.Description?.includes(key) ? ABCLdata.CraftingModifiers.wetChance[key] : 0;
                        }
                    }
                    return chance;
                }
            };
            this.mess = {
                set count(value) {
                    abcl._messes = value;
                    abcl.refreshDiaper();
                },
                get count() {return abcl._messes},
                set base(value) {abcl._messChance = value},
                get base() {return abcl._messChance},
                get chance() {
                    let chance = abcl._messChance;
                    for (let item of abcl.getRegressionItems()) {
                        for (let key in ABCLdata.CraftingModifiers.messChance) {
                            chance += item?.Craft?.Description?.includes(key) ? ABCLdata.CraftingModifiers.messChance[key] : 0;
                        }
                    }
                    return chance;
                }
            }
            this.regression = {
                get base() {return abcl._regression},
                set base(value) {abcl._regression = value},
                get modifier() {
                    let total = 0;
                    console.log()
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
                get base() { return abcl._desperation },
                set base(value) { abcl._desperation = value },
                get modifier() {
                    let total = abcl._desperation;
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
                    }
                  
                    if (abcl.PantiesItem) {
                        total += ABCLdata["Diapers"][abcl.PantiesItem.Asset.Description].absorbancy;
                    }
                    return total;
                }
            }
            localStorage.getItem(`abcl-${Player.MemberNumber}`) ? this.load() : null;
            this.diaperTimerModifier = 1; // We will divide by the modifier (positive modifiers decrease the timer)
            this.diaperRunning = true; // Helps with the kill switch
            this.loop();
            
        }
      
        get diaperTimer() {
            let modifier = this.diaperTimerModifier * Math.pow(0.5, (this.regression.base+1)) * (this.desperation.modifier + 1);

            if (this.mess.chance + this.wet.chance > 1) {
                modifier *= (this.mess.chance + this.wet.chance); 
            }
            return diaperDefaultValues.baseTimer / (1 + modifier);
        }
        get nextEncounter() {
            let nextEncounter = ((this.loopTimestamp + this.diaperTimer * 60 * 1000)- Date.now())/1000 // bruh I spent 30 minutes on this mang.. I should start sleeping
            return nextEncounter;
        }
        set PelvisItem(item) { 
            this._PelvisItem = item;
            if (!this.PelvisItem && !this.PantiesItem) {
                this.mess.count = 0;
                this.wet.count = 0;
            }
            this.refreshDiaper();
        }
        get PelvisItem() {
            this._PelvisItem = InventoryGet(Player, 'ItemPelvis');
            return this.isDiaper(this._PelvisItem) ? this._PelvisItem: false;
        }
        set PantiesItem(item) {
            this._PantiesItem = item;
            if (!this.PelvisItem && !this.PantiesItem) {
                this.mess.count = 0;
                this.wet.count = 0;
            }
            this.refreshDiaper();
        }
        get PantiesItem() {
            this._PantiesItem = InventoryGet(Player, 'Panties');
            return this.isDiaper(this._PantiesItem) ? this._PantiesItem: false;
        }
    

        load() {
            let data = JSON.parse(localStorage.getItem(`Abcl-${Player.MemberNumber}`));
            this.wet.count = parseInt(data.wets) || 0;
            this.mess.count = parseInt(data.messes) || 0;
            this.regression.base = parseInt(data.regression) || 0;
    
            this.mess.base = parseFloat(data.messChance) || diaperDefaultValues.messChance;
            this.wet.base = parseFloat(data.wetChance) || diaperDefaultValues.wetChance;
            this.messageType = data.messageType  || diaperDefaultValues.messageType;
            this.enabled = data.enabled;
            this.refreshDiaper();
        }
        save() {
            localStorage.setItem(`Abcl-${Player.MemberNumber}`, JSON.stringify({
                wets: this.wet.count || 0,
                messes: this.mess.count || 0,
                regression: this.regression.base || 0,
                messChance: this.mess.base || diaperDefaultValues.messChance,
                wetChance: this.mess.base || diaperDefaultValues.wetChance,
                messageType: this.messageType || diaperDefaultValues.messageType,
                enabled: this.enabled
            }));
        }
        reset () {
            this.wet.count = 0;
            this.mess.count = 0;
            this.regression.base = diaperDefaultValues.regressionLevel;
            this.mess.base = diaperDefaultValues.messChance;
            this.wet.base = diaperDefaultValues.wetChance;
            this.messageType = diaperDefaultValues.messageType;
            this.enabled = true;
            this.save();
        }
        refreshDiaper() { 
            if (!this.enabled) {
                return;
            }
            this.updateDiaperColor("ItemPelvis");
            this.updateDiaperColor("Panties");
            CharacterRefresh(Player, true);
            ChatRoomCharacterUpdate(Player);
            this.save();
        }

        changeDiaper() {
            this.PelvisItem = InventoryGet(Player, "ItemPelvis");
            this.PantiesItem = InventoryGet(Player, "Panties");
            
            this.wet.count = 0;
            this.mess.count = 0;
           
            this.updateDiaperColor("ItemPelvis");
            this.updateDiaperColor("Panties");
            promptMessage(ABCLdata.messages[this.messageType].change)

        }
        changePlayerDiaper(player) {
            let pelvisItem = InventoryGet(player, "ItemPelvis");
            let pantiesItem = InventoryGet(player, "Panties");
            if (this.isDiaper(pelvisItem)) {
                pelvisItem.Color = DiaperUseLevels["Clean"];
            }
            if (this.isDiaper(pantiesItem)) {
                pantiesItem.Color = DiaperUseLevels["Clean"];
            }
        }
            
        // Check for if a diaper is in the Panties or ItemPelvies slot
        isDiaper(item) {
            return item?.Asset?.Name.toLowerCase().includes('diaper');
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
        updateDiaperColor(slot) {
            if (!this.enabled) {
                return;
            }
            let item = InventoryGet(Player, slot);
            if (!this.isDiaper(item)) { 
                return;
            }
            let diaper = ABCLdata["Diapers"][item.Asset.Description];
            if ((diaper.type === "primary" || diaper.type === "primary&secondary") && typeof item.Color == "string") {
                item.Color = item.Asset.DefaultColor
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
                    color.messy = DiaperUseLevels["MaximumMessy"];
                } else {
                    color.messy = averageColor(DiaperUseLevels["MaximumMessy"], DiaperUseLevels["MiddleMessy"], delta.messy - 0.75);
                }
            } else {
                color.messy = averageColor(DiaperUseLevels["MiddleMessy"], DiaperUseLevels["Clean"], delta.messy);
            }
            if (delta.wet > 0.75) {
                // between clean and middle wet
                if (delta.wet > 0.9) {
                    color.wet = DiaperUseLevels["MaximumWet"];
                } else {
                    color.wet = averageColor(DiaperUseLevels["MaximumWet"], DiaperUseLevels["MiddleWet"], delta.wet - 0.75);
                }
            } else {
                color.wet = averageColor(DiaperUseLevels["MiddleWet"], DiaperUseLevels["Clean"], delta.wet);
            }
            let primary = averageColor(color.messy, color.wet, 0.7);
            let secondary = averageColor(color.messy, color.wet, 0.9);
            if (diaper.type === "mono") {
                if (item.Color == "Default") {
                    item.Color = "#FFFFFF";
                }
                item.Color = primary; 
            }

            else if (diaper.type === "primary") {
                item.Color[ABCLdata["Diapers"][item.Asset.Description].indexes[0]] = primary
            }
            else if (diaper.type === "primary&secondary") {
                item.Color[ABCLdata["Diapers"][item.Asset.Description].indexes[0]] = primary;
                
                if (item.Color[ABCLdata["Diapers"][item.Asset.Description].indexes[1]] == "Default") {
                    item.Color[ABCLdata["Diapers"][item.Asset.Description].indexes[1]] = "#FFFFFF";
                }
                item.Color[ABCLdata["Diapers"][item.Asset.Description].indexes[1]] = secondary
            }
        
        }

        accident(isMess = false) {
            if (!this.enabled) {
                return;
            }
            // color shoes, socks, panties, and pelvis, suitlower, bottom, right leg, left leg, and suit, garters, socks
            let itemsBelow = []
            itemsBelow.push(
                ...["Shoes", "Socks", "Panties", "ItemPelvis", "ItemBoots", "Garters", "RightAnklet", "LeftAnklet", "SuitLower", "ClothLower"]
                    .map(slot => InventoryGet(Player, slot))
            );

            for (let item of itemsBelow) {
                if (item) {
                    if (typeof item.Color === "string") {
                        if (isMess) {
                            item.Color = averageColor(item.Color, DiaperUseLevels["SelfMessy"], 0.2);
                        } else {
                            item.Color = averageColor(item.Color, DiaperUseLevels["SelfWet"], 0.2);
                        }
                    } else {
                    for(let index in item.Color) {
                        if (isMess) {
                            item.Color[index] = averageColor(item.Color[index], DiaperUseLevels["SelfMessy"], 0.2);
                        } else {
                            item.Color[index] = averageColor(item.Color[index], DiaperUseLevels["SelfWet"], 0.2);
                        }
                    }
                } 
                }    
            }
            isMess ? promptMessage(ABCLdata.messages[this.messageType]["SelfMess"]) : promptMessage(ABCLdata.messages[this.messageType]["SelfWet"]);
            this.refreshDiaper();
        }

        async loop() {
            while (true) {
                if (!this.enabled) {
                    await new Promise(r => setTimeout(r, this.diaperTimer * 60 * 1000));
                    continue;
                }
                this.loopTimestamp = Date.now();
                await new Promise(r => setTimeout(r, this.diaperTimer * 60 * 1000));
                this.regression.step();
                this.desperation.check();
                let pelvis = InventoryGet(Player, "ItemPelvis");
                let panties = InventoryGet(Player, "Panties");
                if ((this.isDiaper(pelvis) || this.isDiaper(panties)) && this.diaperRunning === true) {
                    this.tick();
                } else {
                    this.accident();
                }
            }
        }
        tick() {
            let rngMess = Math.random();
            let rngWet = Math.random();
            let chanceForNothing = 0.1;
            let total = this.mess.chance + this.wet.chance;
            let messChance = this.mess.chance / total;
            let wetChance = this.wet.chance / total;
            const randomValue = Math.random();

            console.log("mess: " + messChance + " wet: " + wetChance);
            if (randomValue < messChance) {
                this.mess.count++;
                if (this.absorbancy.total > this.mess.count) {
                    promptMessage(ABCLdata.messages[this.messageType]["Mess"])
                } else if (this.absorbancy.total == this.mess.count) {
                    promptMessage(ABCLdata.messages[this.messageType]["FullyMess"])
                } else {
                    promptMessage(ABCLdata.messages[this.messageType]["Immergency"])
                }
            } else if (randomValue < wetChance + chanceForNothing) {
            } else {
                this.wet.count++;
                if (this.absorbancy.total > this.mess.count) {
                    promptMessage(ABCLdata.messages[this.messageType]["Wet"])
                }
                else if (this.absorbancy.total == this.wet.count) {
                    promptMessage(ABCLdata.messages[this.messageType]["FullyWet"])
                } else {
                    promptMessage(ABCLdata.messages[this.messageType]["Immergency"])
                }
            }
         
         
            this.updateDiaperColor("ItemPelvis");
            this.updateDiaperColor("Panties");
            ChatRoomCharacterUpdate(Player);
        }

    }
   
    //hooks
    ABCLLoginDoLogin();
    ABCLCharacterAppearanceSetItem();
    async function ABCLLoginDoLogin() {
        modApi.hookFunction('LoginDoLogin', 1, (args, next) => {
            if (abcl == null) {
                abcl = new ABCL();
            }
            next(args);
        }
        );
    }
    async function ABCLCharacterAppearanceSetItem() {
        modApi.hookFunction('PlatformAttack', 4, (args, next) => {
            if (MagiccheatOn == true) {
                PlatformPlayer.Health = 100;
                PlatformPlayer.Magic = 100;
                PlatformPlayer.Projectile = 100;
            }
            next(args);
        });
    }

    CommandCombine([{
        Tag: 'abcl',
        Description: "(action) (target or value) = plays with diapers (ABDL game).",
        Action: (args) => {
            let [command, ...input] = args.split(/[ ,]+/);
            let playerName = input[0]
            let change = parseFloat(input[0]); 

            switch (command) {
                case "": 
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'><b>ABCL</b>: Welcome to Adult Baby Club Lover! Where we make sure babies use their diapers!\n" +
                        " \n" +
                        "<b>/abcl start</b> to enable the script\n" +
                        "<b>/abcl stop</b> to disable the script\n" +
                        "<b>/abcl tick</b> to force a tick\n" +
                        " \n" +
                        "To get new clean diapers:\n" +
                        "<b>/abcl change</b> to change your diaper\n" +
                        "<b>/abcl change (target)</b> to change someone else's diaper\n" +
                        " \n" +
                        "Customisation:\n" +
                        "Use <b>/abcl custom</b> for detailed info</p>"
                    );
                    break;
                case "custom":
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'><b>ABCL</b>: Diaper customisation:\n" +
                        //"<b>/abcl desperation</b> (value between 0 and 3) for desperation level, normally controlled by having a milk bottle used on you\n" +
                        "<b>/abcl regression</b> (value between 0 and 3) for regression level, normally controlled by wearing Nursery Milk for an extended period of time\n" +
                        "<b>/abcl timer</b> (minutes) to change the wet/mess timer\n" +
                        "<b>/abcl wetchance</b> (value between 0 and 1) to control how often you will wet\n" +
                        "<b>/abcl messchance</b> (value between 0 and 1) to control how often you will mess. Make sure this is lower than wetchance.\n" +
                        "<b>/abcl wettings</b> (value) for wet level of normal diapers\n" +
                        "<b>/abcl messes</b> (value) for mess level of normal diapers\n"+
                        "<b>/abcl messageType</b> (descreet|embarressed|default) to change the message type\n"
                    );
                    break;
                case "stats":
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'>ABCL: Your current diaper stats are: \n" +
                        "Desperation: " + abcl.desperation.modifier + ", \n" +
                        "Regression: " + abcl.regression.total + ", \n" +
                        "Regressive change: " + abcl.regression.modifier + ", \n" +
                        "Wet Chance: " + abcl.wet.chance *100 + "%, \n" +
                        "Mess Chance: " + abcl.mess.chance *100+ "%, \n" +
                        "Wets: " + abcl.wet.count + ", \n" +
                        "Messes: " + abcl.mess.count + ", \n" +
                        "Padding: " + abcl.padding.total + ", \n" +
                        "Aproximate timer: " + Math.floor(abcl.diaperTimer) + " minutes.</p>\n"
                    );
                    break;
            //-------------------- this should be a setting ------------------------------------------------------
                case "start": 
                    abcl.enabled = true;
                    ChatRoomSendLocal("<p style='background-color:#5fbd7a'>ABCL: The diaper script has been enabled.</p>");
                    break;
                case "stop":
                    abcl.enabled = false;
                    ChatRoomSendLocal("<p style='background-color:#5fbd7a'>ABCL: The diaper script has been disabled.</p>")
                    break;
                case "messageType":
                    abcl.messageType = change.toLowerCase()
                    ChatRoomSendLocal(`<p style='background-color:#5fbd7a'>ABCL: Your message type has been changed to ${abcl.messageType}.</p>`);
                    abcl.save();
                    break;
            //---------------------------------------------------------------------------------------------------- 
                case "tick":
                    abcl.tick();
                    ChatRoomSendLocal(`<p style='background-color:#5fbd7a'>ABCL: ${Player.Nickname == '' ? Player.name : Player.Nickname} uses ${Pronoun("dependent")} timemachine.</p>`);
                    break;
                case "change":
                    let target;
                    // 1. Changing yourself
                    // 2. Changing someone else
                        if (playerName == null) {
                            if (!(abcl.PelvisItem || abcl.PantiesItem)) {
                                ChatRoomSendLocal(
                                    "<p style='background-color:#5fbd7a'>ABCL: You don't have a diaper!</p>"
                                );
                            } else 
                                abcl.changeDiaper();
                            } else {
                                // inputs: Player.Name, Player.MemberNumber, Player.Nickname
                                let player = ChatRoomCharacter.filter(A => (A.Name.toLowerCase().startsWith(playerName.toLowerCase())))[0];
                                if (player == null) {
                                    let playerID = parseInt(playerName);
                                    player = ChatRoomCharacter.find((x) => x.MemberNumber === playerID);
                                }
                                if (player != null) {
                                    if ((player.Nickname == '') || (player.Nickname == undefined)) {
                                        tgpname = player.Name;
                                    } else {
                                        tgpname = player.Nickname;
                                    }
                                    if (!abcl.isDiaper(InventoryGet(player, "Panties")) && !abcl.isDiaper(InventoryGet(player, "ItemPelvis"))) {
                                        ChatRoomSendLocal("<p style='background-color:#5fbd7a'>ABCL: " + ChatRoomHTMLEntities(tgpname) + " does not have normal diapers!</p>");
                                    } else {
                                        abcl.changePlayerDiaper(player);
                                        ChatRoomTargetMemberNumber = player.MemberNumber;
                                        var msg = "" + Player.Nickname == '' ? Player.name : Player.Nickname + " changed your diaper!";
                                        targetNumber = ChatRoomTargetMemberNumber; 
                                        ChatRoomSendWhisper(targetNumber, msg);
                                    }
                                    ChatRoomSetTarget(-1);
                                }
                            } 
                        break;
                    case "desperation":
                        abcl.desperation.base = change
                        ChatRoomSendLocal(`<p style='background-color:#5fbd7a'>ABCL: Your desperation level has been changed to ${abcl.desperation.modifier}.</p>`);
                        break;
                    case "messchance": // this could be a setting         
                            abcl.mess.chance = change
                        ChatRoomSendLocal(`<p style='background-color:#5fbd7a'>ABCL: Your chance to mess diapers has been changed to ${abcl.mess.chance*100}%.</p>`
                        );
                        abcl.save();
                        break;
                    case "messes":
                        if (!abcl.PelvisItem || !abcl.PantiesItem) {
                            return;
                        } 
                        abcl.mess.count = change
                        ChatRoomSendLocal( `<p style='background-color:#5fbd7a'>ABCL: Your messes in your diaper has been changed to ${abcl.mess.count} messes.</p>`);
                        break;
                    case "regression": 
                        abcl.regression.base = change
                        ChatRoomSendLocal(`<p style='background-color:#5fbd7a'>ABCL: Your regression level has been changed to ${abcl.regression.total}.</p>`);
                        break;
                    case "timer":
                        abcl.diaperTimer = change
                        ChatRoomSendLocal(`<p style='background-color:#5fbd7a'>ABCL: Your wet/mess timer has been changed to ${abcl.diaperTimer} minutes.</p>`);
                        break;
                    case "wetchance": // this could be a setting            
                        abcl.wet.chance = change
                        ChatRoomSendLocal(`<p style='background-color:#5fbd7a'>ABCL: Your chance to wet diapers has been changed to ${abcl.wet.chance*100}%.</p>`);
                        abcl.save();
                        break;
                    case "wettings":
                        if (abcl.PelvisItem || abcl.PantiesItem) {
                            let [change,..._] = input
                            abcl.wet.count = change
                            ChatRoomSendLocal(`<p style='background-color:#5fbd7a'>ABCL: Your wettings in your diaper has been changed to ${abcl.wet.count} wettings.</p>`);
                        }
                        break;
                    default:
                        ChatRoomSendLocal("<p style='background-color:#5fbd7a'>ABCL: The diaper command must include an action.</p>");
                        break;
                }
            }
    }]);

})();