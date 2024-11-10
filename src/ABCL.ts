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
import { runtime, createABCLHtml, DiaperUseLevels, ABCLdata, templates, diaperDefaultValues, MessageType } from "./data"
import { getItemsBelow, promptMessage } from "./message"
import { Diaper } from "./objects";
import bcModSdk, {ModSDKModAPI} from "bondage-club-mod-sdk"

async function statUpdateLoop() {
    const abcl = (globalThis as any).Abcl as ABCL;
    if (abcl != null) {
        const statBoxes = document.querySelectorAll('.stats-box');
        const seconds = abcl.nextEncounter;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const chance = abcl.calculateChance();
        const totalAbsorbancy = (abcl.topLayer?.absorbancy ?? 0) + (abcl.bottomLayer?.absorbancy ?? 0)
        const totalMesses = (abcl.topLayer?.messes ?? 0) + (abcl.bottomLayer?.messes ?? 0)
        const totalWettings = (abcl.topLayer?.wettings ?? 0) + (abcl.bottomLayer?.wettings ?? 0)

        statBoxes.forEach(statbox => {
            const wetCount = statbox.querySelector('.wetCount');
            const messCount = statbox.querySelector('.messCount');
            const wetChance = statbox.querySelector('.wetChance');
            const messChance = statbox.querySelector('.messChance');
            const tickMinutes = statbox.querySelector('.tickMinutes');
            const tickSeconds = statbox.querySelector('.tickSeconds');
            const bar = statbox.querySelector('.bar') as HTMLElement; 
            const absorbancyTotal = statbox.querySelector('.absorbancyTotal');
            const desperationBase = statbox.querySelector('.desperationBase');
            const regressionBase = statbox.querySelector('.regressionbase');
            const regressionModifier = statbox.querySelector('.regressionModifier');

            if (wetCount) wetCount.textContent = (totalWettings * 60).toString();
            if (messCount) messCount.textContent = (totalMesses * 60).toString();
            if (wetChance) wetChance.textContent = Math.floor(chance.wet * 100) + '%';
            if (messChance) messChance.textContent = Math.floor(chance.mess * 100) + '%';
            if (tickMinutes) tickMinutes.textContent = minutes.toString();
            if (tickSeconds) tickSeconds.textContent = remainingSeconds.toString();
            if (bar) bar.style.width = (seconds / (abcl.diaperTimer * 60)) * 100 + '%';
            if (absorbancyTotal) absorbancyTotal.textContent = (totalAbsorbancy * 60).toString();
            if (desperationBase) desperationBase.textContent = (Math.floor(abcl.desperation.base * 10) / 10).toString();
            if (regressionBase) regressionBase.textContent = (Math.floor((abcl.regression.modifier + abcl.regression.base) * 10) / 10).toString();
            if (regressionModifier) regressionModifier.textContent = (Math.floor(abcl.regression.modifier * 10) / 10).toString();
        });
    }
}
const ABCLversion = "1.1.0";

export const modAPI: ModSDKModAPI = bcModSdk.registerMod({
    name: "ABCL",
    version: ABCLversion,
    fullName: "Adult Baby Club Lover",
    repository: 'https://github.com/zoe-64/ABCL'
}, {
    allowReplace: false
});

if (typeof (globalThis as any).ABCLversion != 'undefined') {
    throw new Error("ABCL already loaded. No double loading");
}
var abcl:ABCL | null = null;

(globalThis as any).ABCLversion = ABCLversion;
(globalThis as any).ABCLLOADED = true;

await createABCLHtml(runtime)

setInterval(statUpdateLoop, 1000);

   

//#region Abcl                                  
  
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
                        if (hasPermissionToChangeDiaper(content.Sender)) { 
                            this.changeDiaper(Player, GetName(Player));
                        }
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
        messageType:MessageType;
        loopTimestamp:number;
        wet: {
            _enabled:boolean,
            _wetChance:number,
            base:number,
            chance:number,
            enabled:boolean
        };
        mess: {
            _enabled:boolean,
            _messChance:number,
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

        timer:number;
        automatic_accidents:boolean;
        permissions: ABCLPermissions
        topLayer: Diaper | null
        bottomLayer: Diaper | null
        constructor() {
            SentenceBuilder.data["§name§"] = {get neutral() {return [GetName(Player)]}};
            SentenceBuilder.data["§items-below§"] = {get neutral() {return [getItemsBelow()]}};
            SentenceBuilder.data["§current-diaper§"] = {get neutral() {return [InventoryGet(Player, "ItemPelvis")?.Asset?.Description || InventoryGet(Player, "Panties")?.Asset?.Description || "diaper"]}};
            SentenceBuilder.data["§by-player§"] = {"neutral":[Pronoun.get("Reflexive", Player)]};
            SentenceBuilder.data = {...ABCLdata.verbs, ...SentenceBuilder.data};
    
            (globalThis as any).Abcl = this;
            const abcl = this;
            this.permissions = new ABCLPermissions(this);
            this.cache = new LocalCache(`Abcl-${Player.MemberNumber}`);
 
            Messager.addListener(this.ABCLMessagerListener.bind(this), -5, "ABCL Message Processor");


            this.topLayer = null
            this.bottomLayer = null
       
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
                _wetChance: abcl.cache.get("wet_base", diaperDefaultValues.wetChance),
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
                _messChance: abcl.cache.get("mess_base", diaperDefaultValues.messChance),
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
        

        reset() {
            localStorage.removeItem(`Abcl-${Player.MemberNumber}`);
            setTimeout(() => location.reload(), 2000);
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
            this.topLayer?.change()
            this.bottomLayer?.change()
            
            this.updateDiapers();
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
            
            this.updateDiapers();
        }
        updateDiapers(refresh=true) {
            if (!this.bottomLayer || this.bottomLayer.isReplaced()) {
                const item = InventoryGet(Player, "Panties");
                if (item && Diaper.isDiaper(item)) {
                    this.bottomLayer = new Diaper(item)
                }
            }
            if (!this.topLayer || this.topLayer.isReplaced()) {
                const item = InventoryGet(Player, "ItemPelvis");
                if (item && Diaper.isDiaper(item)) {
                    this.topLayer = new Diaper(item)
                }
            }
            if (!this.enabled || !this.visual) {
                return;
            }            
            const topItem = InventoryGet(Player, "ItemPelvis");
            if (this.topLayer && topItem) {
                this.topLayer.item.Color = this.topLayer.getColor()
                topItem.Color = this.topLayer.item.Color
            }

            const bottomItem = InventoryGet(Player, "Panties");
            if (this.bottomLayer && bottomItem) {
                this.bottomLayer.item.Color = this.bottomLayer.getColor()
                bottomItem.Color = this.bottomLayer.item.Color
            }
            if (refresh) {
                CharacterRefresh(Player, true);
                ChatRoomCharacterUpdate(Player);
            }
        }
        async loop() {
            this.updateDiapers()
            while (true) {
                if (!this.enabled || !this.automatic_accidents || this.nextEncounter > 0) {
                    await new Promise(r => setTimeout(r, this.diaperTimer * 1000));
                    continue;
                }
                this.loopTimestamp = Date.now();

             
                if (this.topLayer || this.bottomLayer) {
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
            switch (result) {
                case "nothing":
                    return;
                break
                // panties item -> pelvis item
                // bottomLayer -> topLayer
                case "wet": 
                    if (this.bottomLayer && this.bottomLayer.wettings + this.bottomLayer.messes < this.bottomLayer.absorbancy) {
                        this.bottomLayer.wettings += 1
                        break
                    }
                    if (this.topLayer /*&& this.topLayer.wettings + this.topLayer.messes < this.topLayer.absorbancy*/) { // leaks
                        this.topLayer.wettings += 1
                        break
                    }
                break;
                case "mess": {
                    if (this.bottomLayer && this.bottomLayer.wettings + this.bottomLayer.messes < this.bottomLayer.absorbancy) {
                        this.bottomLayer.messes += 1
                        break
                    }
                    
                    if (this.topLayer /*&& this.topLayer.wettings + this.topLayer.messes < this.topLayer.absorbancy*/) { // leaks
                        this.topLayer.messes += 1
                        break
                    }
                    
                    
                break;
                }
            }
            this.regression.step();
            this.desperation.check();
            let message = "immergency";
            let absorbancy = 0
            let total = 0
            if (this.topLayer) {
                absorbancy += this.topLayer.absorbancy
                total += this.topLayer.messes + this.topLayer.wettings
            }
            if (this.bottomLayer) {
                absorbancy += this.bottomLayer.absorbancy
                total += this.bottomLayer.messes + this.bottomLayer.wettings
            }
            if (absorbancy > total) {
                message = result 
            } else if (total == absorbancy)  {
                message = "fully"+result;
            } 
            promptMessage(ABCLdata.messages[this.messageType][message]);
            
            this.updateDiapers()
        }
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
          
        
            setInputValue("#abcl-visual input", abcl.visual);
            setInputValue("#abcl-wet input", abcl.wet.enabled);
            setInputValue("#abcl-mess input", abcl.mess.enabled);
            setInputValue("#abcl-clothing-accidents input", abcl.accidents);
            setInputValue("#abcl-mess-wet-chance input", Math.floor((1 - abcl.mess.chance) * 100));
            setInputValue("#abcl-message-type select", abcl.messageType);
            setInputValue("#abcl-timer-duration input", abcl.timer);

            const settingsMap: Record<string, { event: string, handler: (e: Event) => void }> = {
                '#abcl-visual input': {
                    event: 'change', handler: (e: Event) => {
                        this.visual = (e.target as HTMLInputElement).checked;
                        this.cache.set("visual", this.visual);
                        this.updateDiapers();
                    }
                },
                '#abcl-wet input': {
                    event: 'change', handler: (e: Event) => {
                        this.wet.enabled = (e.target as HTMLInputElement).checked;
                    }
                },
                '#abcl-mess input': {
                    event: 'change', handler: (e: Event) => {
                        this.mess.enabled = (e.target as HTMLInputElement).checked;
                    }
                },
                '#abcl-clothing-accidents input': {
                    event: 'change', handler: (e: Event) => {
                        this.accidents = (e.target as HTMLInputElement).checked;
                        this.cache.set("accidents", this.accidents);
                    }
                },
                '#abcl-mess-wet-chance input': {
                    event: 'change', handler: (e: Event) => {
                        const value = +(e.target as HTMLInputElement).value / 100;
                        this.wet.base = value;
                        this.mess.base = 1 - value;
                    }
                },
                '#abcl-message-type select': {
                    event: 'change', handler: (e: Event) => {
                        this.messageType = (e.target as HTMLInputElement).value as MessageType;
                        this.cache.set("messageType", this.messageType);
                    }
                },
                '#abcl-timer-duration input': {
                    event: 'change', handler: (e: Event) => {
                        this.timer = +(e.target as HTMLInputElement).value;
                        this.cache.set("timer", this.timer);
                    }
                }
            };
        
            for (const [selector, { event, handler }] of Object.entries(settingsMap)) {
                assertQuerySelector(selector).addEventListener(event, handler);
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
        modAPI.hookFunction('LoginDoLogin', 1, (args:any, next:Function) => {
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
        modAPI.hookFunction('CharacterAppearanceSetItem', 2, (args:any, next:Function) => {
            let [_character, slot, _asset] = args;
      
            if (abcl) {                
                if (slot == "ItemPelvis" || slot == "Panties") {
                    abcl.updateDiapers(false) 
                }
            }
          
            return next(args);
        });
    }
    async function ABCLTextGet() {
        modAPI.hookFunction('TextGet', 2,  (args:any, next:Function) => {
            if(args[0] == "HomepageAbcl") return "ABCL";
            else return next(args);
        });
    }
    async function ABCLDrawButton() {
        modAPI.hookFunction("DrawButton", 2,  (args:any, next:Function) => {
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
                case "help":
                case "": 
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
                    if (abcl.topLayer || abcl.bottomLayer) {
                        abcl.tick();
                    } else {
                        abcl.accident();
                    }
                    ChatRoomSendLocal(`<p style='background-color:#ecc826'>ABCL: ${Player.Nickname == '' ? Player.Name : Player.Nickname} squeezes ${Pronoun.get("dependent", Player)} abdomen trying to get it all out. (only you can see this).</p>`);
                break;
                case "change":
                    if (identifier == null) {
                        if (!(abcl.topLayer || abcl.bottomLayer)) {
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

                            if (abcl.topLayer || abcl.bottomLayer) {
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
   


