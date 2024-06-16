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
    const runtime = document.getElementById('ABCLruntimeID').innerText;
    const ABCLversion = "1.0";
    const modApi = bcModSDK.registerMod({
        name: 'ABCL',
        fullName: 'Adult Baby Club Lover',
        version: ABCLversion,
        repository: 'https://github.com/zoe-64/ABCL',
    });
    window.ABCLversion = ABCLversion;
    


//#region Abcl                                  
    
    while (typeof getJson !== "function") {
        await new Promise(r => setTimeout(r, 100));
    }
    const ABCLdata = await getJson(runtime+"Data/dictionary.json");
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
        wetting: true,
        messing: true,
        accidents: false,
        visual: true,
        enabled: true,
    };


    

    // Initializer function
   
    function getVerb(verb) {
        return ABCLdata.verbs[verb][Math.floor(Math.random() * Object.keys(ABCLdata.verbs[verb]).length)];
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
    function promptMessage(messageOptions, args) {
        let message = messageOptions;
        if (typeof messageOptions == "object") {
            message = messageOptions[Math.floor(Math.random() * messageOptions.length)];
        } 
        currentDiaper = InventoryGet(Player, "ItemPelvis")?.Asset?.Description || InventoryGet(Player, "Panties")?.Asset?.Description || "diaper";
        message = message.replace(/%name%/g, Player.Nickname != '' ? Player.Nickname : Player.Name)
                         .replace(/%dependent%/g, Pronoun("Dependent"))
                         .replace(/%objective%/g, Pronoun("Objective"))
                         .replace(/%subjective%/g, Pronoun("Subjective"))
                         .replace(/%items-below%/g, getItemsBelow())
                         .replace(/%current-diaper%/g, currentDiaper)
                         .replace(/%by-player%/g, args["by-player"] || Pronoun("Reflexive"));
        for(let verb of Object.keys(ABCLdata.verbs)) {
            message = message.replace(new RegExp(`%${verb}%`, "g"), getVerb(verb));
        }
        if (abcl.messageType === "internalMonologue") {
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
   
    class ABCL {
        // localstorage save values
        // enabled -> this.enabled
        // wet_count -> this.wet.count
        // mess_count -> this.mess.count
        // mess_enabled -> this.mess.enabled
        // wet_enabled -> this.wet.enabled
        // regression -> this.regression.base
        // mess_base -> this.mess.base
        // wet_base -> this.wet.base
        // messageType -> this.messageType
        
        
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
        ABCLMessagerListener(response) {
            console.log(response, response.Type == "Hidden");
            if (response.Type == "Hidden") {   
                try {
                    JSON.parse(response.Content);
                } catch (e) {
                    return; // not a json message
                }
                let content = JSON.parse(response.Content);
                console.log(content.Action, "ChangeDiaper", content.MemberNumber, Player.MemberNumber);
                
                if (content.Action == "ChangeDiaper" && content.MemberNumber == Player.MemberNumber) {
                    let player = GetPlayer(content.MemberNumber);
                    this.changeDiaper(player,GetName(response.Sender));
                }
            }
        }
        constructor() {
            const abcl = this;
            this.cache = new LocalCache("Abcl");
            this.messager = new Messager(modApi);
            this._PelvisItem = false,
            this._PantiesItem = false,

            this.messager.register("ABCL Message Processor",this.ABCLMessagerListener.bind(this), -5);
            // options
            this.enabled = this.cache.get("enabled", diaperDefaultValues.enabled);
            this.visual = this.cache.get("visual", diaperDefaultValues.visual);
            this.accidents = this.cache.get("accidents", diaperDefaultValues.accidents);
            this.messageType = this.cache.get("messageType", diaperDefaultValues.messageType);

            this.loopTimestamp = Date.now();
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
                    }
                  
                    if (abcl.PantiesItem) {
                        total += ABCLdata["Diapers"][abcl.PantiesItem.Asset.Description].absorbancy;
                    }
                    return total;
                }
            }
           
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
  
        
        reset () {
            localStorage.removeItem(`Abcl-${Player.MemberNumber}`);
            location.reload();
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

        changeDiaper(player, by="self") {
            if (player != Player && player != null) { // change another player's diaper
                this.messager.send({"Action": "ChangeDiaper", "MemberNumber": player.MemberNumber}, player.MemberNumber);
                return;
            }
            this.PelvisItem = InventoryGet(Player, "ItemPelvis");
            this.PantiesItem = InventoryGet(Player, "Panties");
            
            this.wet.count = 0;
            this.mess.count = 0;
           
            this.updateDiaperColor("ItemPelvis");
            this.updateDiaperColor("Panties");
              // being changed by someone else
            if (by != "self") {
                promptMessage(ABCLdata.messages[this.messageType]["changeBy"], { "by-player": by});
            } else {
                promptMessage(ABCLdata.messages[this.messageType]["changeSelf"], { "by-player": GetName(Player)});
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
            if (!this.enabled || !this.accidents) {
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
            isMess ? promptMessage(ABCLdata.messages[this.messageType]["selfMess"]) : promptMessage(ABCLdata.messages[this.messageType]["selfWet"]);
            
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
            let chanceForNothing = 0.1;
            let total = this.mess.chance*(this.mess.enabled) + this.wet.chance*(this.wet.enabled) + chanceForNothing;
            let messChance = this.mess.chance / total;
            let wetChance = this.wet.chance / total;
            const randomValue = Math.random();

            if (randomValue < messChance) {
                this.mess.count++;
                if (this.absorbancy.total > this.mess.count) {
                    promptMessage(ABCLdata.messages[this.messageType]["mess"])
                } else if (this.absorbancy.total == this.mess.count) {
                    promptMessage(ABCLdata.messages[this.messageType]["fullyMess"])
                } else {
                    promptMessage(ABCLdata.messages[this.messageType]["immergency"])
                }
            } else if (randomValue < wetChance + chanceForNothing) {
            } else {
                this.wet.count++;
                if (this.absorbancy.total > this.wet.count) {
                    promptMessage(ABCLdata.messages[this.messageType]["wet"])
                }
                else if (this.absorbancy.total == this.wet.count) {
                    promptMessage(ABCLdata.messages[this.messageType]["fullyWet"])
                } else {
                    promptMessage(ABCLdata.messages[this.messageType]["immergency"])
                }
            }
         
         
            this.updateDiaperColor("ItemPelvis");
            this.updateDiaperColor("Panties");
            ChatRoomCharacterUpdate(Player);
        }
        setupSettings() {
            PreferenceSubscreenList.push("Abcl")
            // ABCL settings
            const abcl_settings = document.querySelector('#abcl');
            const inspect = document.querySelector('.inspect');

            // on hover change inspect
            const abcl_descriptions = {
                'abcl-visual': 'The visibility of wetting and soiling diapers including accidents.',
                'abcl-wetting': 'The wetting of diapers.',
                'abcl-messing': 'The soiling of diapers.',
                'abcl-accidents': 'Controls having accidents accidents.',
                'abcl-wetting-rate': 'The chance of wetting diapers.',
                'abcl-messing-rate': 'The chance of soiling diapers.',
                'abcl-message-type': 'The style of messages that happen after an event.',
                'abcl-toggle': 'If the ABCL system is enabled or disabled.',
                'abcl-toggle-text': 'If the ABCL system is enabled or disabled.'
            };
            abcl_settings.addEventListener('mouseover', (e) => {
                if (e.target.id in abcl_descriptions) {
                    inspect.querySelector('p').textContent = abcl_descriptions[e.target.id];
                
                }
            });
            document.querySelector("#abcl-visual input").checked = abcl.visual;
            document.querySelector("#abcl-wetting input").checked = abcl.wet.enabled;
            document.querySelector("#abcl-messing input").checked = abcl.mess.enabled;
            document.querySelector("#abcl-accidents input").checked = abcl.accidents;
            document.querySelector("#abcl-wetting-rate input").value = Math.floor(abcl.mess.base*100);
            document.querySelector("#abcl-messing-rate input").value = Math.floor(abcl.wet.base*100);
            document.querySelector("#abcl-message-type select").value = abcl.messageType;
            document.querySelector("#abcl-toggle").checked = abcl.enabled;
            const settingsMap = {
                '#abcl-visual input': { property: 'visual', event: 'change', handler: (e) => { 
                    this.visual = e.target.checked; 
                    this.cache.set("visual", e.target.checked);
                    this.refreshDiaper(); 
                }},
                '#abcl-wetting input': {event: 'change', handler: (e) => { 
                    this.wet.enabled = e.target.checked; 
                 } },
                '#abcl-messing input': {event: 'change', handler: (e) => { 
                    this.mess.enabled = e.target.checked; 
                } },
                '#abcl-accidents input': {event: 'change', handler: (e) => { 
                    this.accidents = e.target.checked; 
                    this.cache.set("accidents", e.target.checked);
                } },
                '#abcl-wetting-rate input':{event: 'change', handler: (e) => {
                    this.wet.base = e.target.value / 100; 
                } },
                '#abcl-messing-rate input': {event: 'change', handler: (e) => {
                    this.mess.base = e.target.value / 100; 
                    
                } },
                '#abcl-message-type select': {event: 'change', handler: (e) => {
                    this.messageType = e.target.value; 
                    this.cache.set("messageType", e.target.value);
            } },
                '#abcl-toggle': {event: 'change', handler: (e) => {
                    this.enabled = e.target.checked;
                    this.cache.set("enabled", e.target.checked);
            } }
            };

            for (const key of Object.keys(settingsMap)) {
                const {event, handler } = settingsMap[key];
                document.querySelector(key).addEventListener(event, handler);
            }
        }
        test() {
            abcl.changeDiaper();
            abcl.accident();
            abcl.accident(true);
            abcl.tick();
            abcl.regression.step();
            abcl.desperation.check();
        }

    }
    //hooks
    ABCLLoginDoLogin();
    ABCLCharacterAppearanceSetItem();
    ABCLTextGet();
    ABCLDrawButton();
    
    async function ABCLLoginDoLogin() {
        modApi.hookFunction('LoginDoLogin', 1, (args, next) => {
            next(args);
            setTimeout(() => {
                if (abcl == null) {
                    abcl = new ABCL();
                    abcl.setupSettings();
                }
            }, 1000); // Player.MemberNumber takes a while to get set
        }
        );
    }
    async function ABCLCharacterAppearanceSetItem() {
        modApi.hookFunction('CharacterAppearanceSetItem', 2, (args, next) => {
            let [_character, slot, _asset] = args;
            if (typeof ultrabdl !== 'undefined') {
                let item = {"Asset":_asset}
                if (slot == "ItemPelvis") {
                    ultrabdl.PelvisItem = ultrabdl.isDiaper(item) ? false : item;
                }
                if (slot == "Panties") {
                    ultrabdl.PantiesItem = ultrabdl.isDiaper(item) ? false : item;
                } 
            }
            next(args);
        });
    }
    async function ABCLTextGet() {
        modApi.hookFunction('TextGet', 2, (args, next) => {
            if(args[0] == "HomepageAbcl") return "ABCL";
            else return next(args);
        });
    }
    async function ABCLDrawButton() {
        modApi.hookFunction("DrawButton", 2, (args, next) => {
			// 7th argument is the image url
			if(args[6] == "Icons/Abcl.png") args[6] = runtime + "Assets/abcl.png";
			return next(args);
		});
    }
    PreferenceSubscreenAbclLoad = () => {
        document.getElementById("abcl").classList.remove("hidden");
    }
    PreferenceSubscreenAbclRun = () => {}
    PreferenceSubscreenAbclExit= () => {
        document.getElementById("abcl").classList.add("hidden");
        PreferenceSubscreen = "";
        PreferenceMessage = "";
    }
    
    CommandCombine([{
        Tag: 'abcl',
        Description: "(action) (target or value) = plays with diapers (ABDL game).",
        Action: (args) => {
            let [command, ...input] = args.split(/[ ,]+/);
            let identifier = input[0]
            let change = parseFloat(input[0]); 

            switch (command) {
                case "": 
                    ChatRoomSendLocal(
                        "<p style='background-color:#5fbd7a'><b>ABCL</b>: Welcome to Adult Baby Club Lover! Where we make sure babies use their diapers!\n" +
                        " \n" +
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
                        "<b>/abcl regression</b> (value between 0 and 3) for regression level, normally controlled by wearing Nursery Milk for an extended period of time\n" +
                        "<b>/abcl timer</b> (minutes) to change the wet/mess timer\n" +
                        "<b>/abcl wetchance</b> (value between 0 and 1) to control how often you will wet\n" +
                        "<b>/abcl messchance</b> (value between 0 and 1) to control how often you will mess. Make sure this is lower than wetchance.\n" +
                        "<b>/abcl wettings</b> (value) for wet level of normal diapers\n" +
                        "<b>/abcl messes</b> (value) for mess level of normal diapers\n"
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
                case "tick":
                    let pelvis = InventoryGet(Player, "ItemPelvis");
                    let panties = InventoryGet(Player, "Panties");
                    if ((abcl.isDiaper(pelvis) || abcl.isDiaper(panties)) && abcl.diaperRunning === true) {
                        abcl.tick();
                    } else {
                        abcl.accident();
                    }
                    ChatRoomSendLocal(`<p style='background-color:#5fbd7a'>ABCL: ${Player.Nickname == '' ? Player.Name : Player.Nickname} uses ${Pronoun("dependent")} timemachine.</p>`);
                break;
                case "change":
                    if (identifier == null) {
                        if (!(abcl.PelvisItem || abcl.PantiesItem)) {
                            ChatRoomSendLocal(
                                "<p style='background-color:#5fbd7a'>ABCL: You don't have a diaper!</p>"
                            );
                        } else 
                            abcl.changeDiaper();
                        } else {
                            // inputs: Player.Name, Player.MemberNumber, Player.Nickname
                            let player = GetPlayer(identifier);                                
                            if (player == null) {
                                ChatRoomSendLocal("<p style='background-color:#5fbd7a'>ABCL: Player not found!</p>");
                                break;
                            }
                            if (abcl.isDiaper(InventoryGet(player, "Panties")) || abcl.isDiaper(InventoryGet(player, "ItemPelvis"))) {
                                abcl.changeDiaper(player);
                                ChatRoomSendWhisper(player.MemberNumber,  "I changed your diaper!");
                            } else {
                                ChatRoomSendLocal("<p style='background-color:#5fbd7a'>ABCL: " + ChatRoomHTMLEntities(GetName(player.MemberNumber)) + " does not have a diaper!</p>");
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

