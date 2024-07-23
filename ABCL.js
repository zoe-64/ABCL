"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/zoelib/dist/zoelib.mjs
  function GetName(player) {
    return player.Nickname || player.Name || "Unknown";
  }
  function GetPlayer(identifier) {
    if (typeof identifier == "string") {
      identifier = identifier?.toLowerCase();
    }
    for (let character of ChatRoomCharacter) {
      if (character.MemberNumber == identifier) {
        return character;
      }
      if (typeof identifier == "number") {
        continue;
      }
      if (character.Name?.toLowerCase() == identifier) {
        return character;
      }
      if (character.Nickname && character.Nickname.toLowerCase() == identifier) {
        return character;
      }
    }
    if (identifier == "random") {
      return ChatRoomCharacter[Math.floor(Math.random() * ChatRoomCharacter.length)];
    }
    console.error("Player not found: ", identifier);
    return null;
  }
  function AverageColor(color_1, color_2, ratio = 0.5) {
    let rgb_1 = DrawHexToRGB(color_1);
    let rgb_2 = DrawHexToRGB(color_2);
    let avgRgb = {
      r: Math.round(rgb_1.r * ratio + rgb_2.r * (1 - ratio)),
      g: Math.round(rgb_1.g * ratio + rgb_2.g * (1 - ratio)),
      b: Math.round(rgb_1.b * ratio + rgb_2.b * (1 - ratio))
    };
    return DrawRGBToHex([avgRgb.r, avgRgb.g, avgRgb.b]);
  }
  function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  async function GetJson(url) {
    return fetch(url).then((response) => response.json());
  }
  var Pronoun, Messager, LocalCache, SentenceBuilder;
  var init_zoelib = __esm({
    "node_modules/zoelib/dist/zoelib.mjs"() {
      Pronoun = class _Pronoun {
        static pronouns = {
          "HeHim": { "subjective": "he", "objective": "him", "dependent": "his", "independent": "his", "reflexive": "himself" },
          "SheHer": { "subjective": "she", "objective": "her", "dependent": "her", "independent": "hers", "reflexive": "herself" },
          "TheyThem": { "subjective": "they", "objective": "them", "dependent": "their", "independent": "theirs", "reflexive": "themself" },
          // not used by bc
          "ItIt": { "subjective": "it", "objective": "it", "dependent": "its", "independent": "its", "reflexive": "itself" }
          // not used by bc
        };
        static shapes = ["subjective", "objective", "dependent", "independent", "reflexive"];
        static get(shape, player) {
          let pronouns = player.GetPronouns();
          return _Pronoun.pronouns[pronouns][shape];
        }
      };
      Messager = class {
        // Processes a response based on the specified type.
        static process(response, isJson = true, type = "Hidden") {
          if (response.Type != type) return null;
          if (isJson) {
            let data;
            try {
              data = JSON.parse(response.Content);
            } catch (e) {
              return null;
            }
            return { ...data, ...response };
          }
          return response;
        }
        static send(json, target, type = "Hidden") {
          if (typeof json != "string") {
            json = JSON.stringify(json);
          }
          ServerSend("ChatRoomChat", { Content: json, Type: type, Target: target });
        }
        static localSend(message) {
          ChatRoomSendLocal(message);
        }
        static listener(callback, priority = -5, description = "") {
          ChatRoomRegisterMessageHandler({ Description: description, Callback: callback, Priority: priority });
        }
      };
      globalThis.Messager = Messager;
      LocalCache = class {
        prefix;
        constructor(prefix) {
          this.prefix = prefix;
        }
        //Retrieves the value of a property from the cache.
        get(property, defaultValue = null) {
          let data = JSON.parse(localStorage.getItem(`${this.prefix}`)) || {};
          return typeof data[property] != "undefined" && data[property] != null ? data[property] : defaultValue;
        }
        set(property, value) {
          let data = JSON.parse(localStorage.getItem(`${this.prefix}`)) || {};
          data[property] = value;
          localStorage.setItem(`${this.prefix}`, JSON.stringify(data));
        }
      };
      SentenceBuilder = class _SentenceBuilder {
        static target;
        set target(player) {
          _SentenceBuilder.target = player;
        }
        get target() {
          return _SentenceBuilder.target;
        }
        static data = {
          "\xA7dependent\xA7": { get neutral() {
            return [Pronoun.get("dependent", _SentenceBuilder.target)];
          } },
          "\xA7subjective\xA7": { get neutral() {
            return [Pronoun.get("subjective", _SentenceBuilder.target)];
          } },
          "\xA7objective\xA7": { get neutral() {
            return [Pronoun.get("objective", _SentenceBuilder.target)];
          } },
          "\xA7independent\xA7": { get neutral() {
            return [Pronoun.get("independent", _SentenceBuilder.target)];
          } },
          "\xA7reflexive\xA7": { get neutral() {
            return [Pronoun.get("reflexive", _SentenceBuilder.target)];
          } }
        };
        static prompt(sentence, player = Player) {
          let pronoun = { "SheHer": "female", "HeHim": "male" }[player.GetPronouns()];
          let sentenceKeys = sentence.match(/§[a-zA-Z-]*§/g);
          if (!sentenceKeys) {
            return sentence;
          }
          for (let key of sentenceKeys) {
            if (!_SentenceBuilder.data.hasOwnProperty(key)) {
              _SentenceBuilder.data[key] = { "neutral": ["(key-" + key + "-missing)"] };
            }
            let options = [
              ...typeof _SentenceBuilder.data[key][pronoun] != "undefined" ? _SentenceBuilder.data[key][pronoun] : [],
              ...typeof _SentenceBuilder.data[key].neutral != "undefined" ? _SentenceBuilder.data[key].neutral : []
            ];
            sentence = sentence.replaceAll(key, options[RandomInt(0, options.length - 1)]);
          }
          if (sentence.match(/§[a-zA-Z-]*§/g)) {
            return _SentenceBuilder.prompt(sentence, player);
          }
          return sentence;
        }
      };
    }
  });

  // src/ABCL.ts
  var require_ABCL = __commonJS({
    "src/ABCL.ts"(exports) {
      init_zoelib();
      var local = false;
      var bcModSDK = function() {
        "use strict";
        const o = "1.2.0";
        function e(o2) {
          alert("Mod ERROR:\n" + o2);
          const e2 = new Error(o2);
          throw console.error(e2), e2;
        }
        const t = new TextEncoder();
        function n(o2) {
          return !!o2 && "object" == typeof o2 && !Array.isArray(o2);
        }
        function r(o2) {
          const e2 = /* @__PURE__ */ new Set();
          return o2.filter((o3) => !e2.has(o3) && e2.add(o3));
        }
        const i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
        function c(o2) {
          a.has(o2) || (a.add(o2), console.warn(o2));
        }
        function s(o2) {
          const e2 = [], t2 = /* @__PURE__ */ new Map(), n2 = /* @__PURE__ */ new Set();
          for (const r3 of f.values()) {
            const i3 = r3.patching.get(o2.name);
            if (i3) {
              e2.push(...i3.hooks);
              for (const [e3, a2] of i3.patches.entries()) t2.has(e3) && t2.get(e3) !== a2 && c(`ModSDK: Mod '${r3.name}' is patching function ${o2.name} with same pattern that is already applied by different mod, but with different pattern:
Pattern:
${e3}
Patch1:
${t2.get(e3) || ""}
Patch2:
${a2}`), t2.set(e3, a2), n2.add(r3.name);
            }
          }
          e2.sort((o3, e3) => e3.priority - o3.priority);
          const r2 = function(o3, e3) {
            if (0 === e3.size) return o3;
            let t3 = o3.toString().replaceAll("\r\n", "\n");
            for (const [n3, r3] of e3.entries()) t3.includes(n3) || c(`ModSDK: Patching ${o3.name}: Patch ${n3} not applied`), t3 = t3.replaceAll(n3, r3);
            return (0, eval)(`(${t3})`);
          }(o2.original, t2);
          let i2 = function(e3) {
            var t3, i3;
            const a2 = null === (i3 = (t3 = m.errorReporterHooks).hookChainExit) || void 0 === i3 ? void 0 : i3.call(t3, o2.name, n2), c2 = r2.apply(this, e3);
            return null == a2 || a2(), c2;
          };
          for (let t3 = e2.length - 1; t3 >= 0; t3--) {
            const n3 = e2[t3], r3 = i2;
            i2 = function(e3) {
              var t4, i3;
              const a2 = null === (i3 = (t4 = m.errorReporterHooks).hookEnter) || void 0 === i3 ? void 0 : i3.call(t4, o2.name, n3.mod), c2 = n3.hook.apply(this, [e3, (o3) => {
                if (1 !== arguments.length || !Array.isArray(e3)) throw new Error(`Mod ${n3.mod} failed to call next hook: Expected args to be array, got ${typeof o3}`);
                return r3.call(this, o3);
              }]);
              return null == a2 || a2(), c2;
            };
          }
          return { hooks: e2, patches: t2, patchesSources: n2, enter: i2, final: r2 };
        }
        function l(o2, e2 = false) {
          let r2 = i.get(o2);
          if (r2) e2 && (r2.precomputed = s(r2));
          else {
            let e3 = window;
            const a2 = o2.split(".");
            for (let t2 = 0; t2 < a2.length - 1; t2++) if (e3 = e3[a2[t2]], !n(e3)) throw new Error(`ModSDK: Function ${o2} to be patched not found; ${a2.slice(0, t2 + 1).join(".")} is not object`);
            const c2 = e3[a2[a2.length - 1]];
            if ("function" != typeof c2) throw new Error(`ModSDK: Function ${o2} to be patched not found`);
            const l2 = function(o3) {
              let e4 = -1;
              for (const n2 of t.encode(o3)) {
                let o4 = 255 & (e4 ^ n2);
                for (let e5 = 0; e5 < 8; e5++) o4 = 1 & o4 ? -306674912 ^ o4 >>> 1 : o4 >>> 1;
                e4 = e4 >>> 8 ^ o4;
              }
              return ((-1 ^ e4) >>> 0).toString(16).padStart(8, "0").toUpperCase();
            }(c2.toString().replaceAll("\r\n", "\n")), d2 = { name: o2, original: c2, originalHash: l2 };
            r2 = Object.assign(Object.assign({}, d2), { precomputed: s(d2), router: () => {
            }, context: e3, contextProperty: a2[a2.length - 1] }), r2.router = /* @__PURE__ */ function(o3) {
              return function(...e4) {
                return o3.precomputed.enter.apply(this, [e4]);
              };
            }(r2), i.set(o2, r2), e3[r2.contextProperty] = r2.router;
          }
          return r2;
        }
        function d() {
          for (const o2 of i.values()) o2.precomputed = s(o2);
        }
        function p() {
          const o2 = /* @__PURE__ */ new Map();
          for (const [e2, t2] of i) o2.set(e2, { name: e2, original: t2.original, originalHash: t2.originalHash, sdkEntrypoint: t2.router, currentEntrypoint: t2.context[t2.contextProperty], hookedByMods: r(t2.precomputed.hooks.map((o3) => o3.mod)), patchedByMods: Array.from(t2.precomputed.patchesSources) });
          return o2;
        }
        const f = /* @__PURE__ */ new Map();
        function u(o2) {
          f.get(o2.name) !== o2 && e(`Failed to unload mod '${o2.name}': Not registered`), f.delete(o2.name), o2.loaded = false, d();
        }
        function g(o2, t2) {
          o2 && "object" == typeof o2 || e("Failed to register mod: Expected info object, got " + typeof o2), "string" == typeof o2.name && o2.name || e("Failed to register mod: Expected name to be non-empty string, got " + typeof o2.name);
          let r2 = `'${o2.name}'`;
          "string" == typeof o2.fullName && o2.fullName || e(`Failed to register mod ${r2}: Expected fullName to be non-empty string, got ${typeof o2.fullName}`), r2 = `'${o2.fullName} (${o2.name})'`, "string" != typeof o2.version && e(`Failed to register mod ${r2}: Expected version to be string, got ${typeof o2.version}`), o2.repository || (o2.repository = void 0), void 0 !== o2.repository && "string" != typeof o2.repository && e(`Failed to register mod ${r2}: Expected repository to be undefined or string, got ${typeof o2.version}`), null == t2 && (t2 = {}), t2 && "object" == typeof t2 || e(`Failed to register mod ${r2}: Expected options to be undefined or object, got ${typeof t2}`);
          const i2 = true === t2.allowReplace, a2 = f.get(o2.name);
          a2 && (a2.allowReplace && i2 || e(`Refusing to load mod ${r2}: it is already loaded and doesn't allow being replaced.
Was the mod loaded multiple times?`), u(a2));
          const c2 = (o3) => {
            let e2 = g2.patching.get(o3.name);
            return e2 || (e2 = { hooks: [], patches: /* @__PURE__ */ new Map() }, g2.patching.set(o3.name, e2)), e2;
          }, s2 = (o3, t3) => (...n2) => {
            var i3, a3;
            const c3 = null === (a3 = (i3 = m.errorReporterHooks).apiEndpointEnter) || void 0 === a3 ? void 0 : a3.call(i3, o3, g2.name);
            g2.loaded || e(`Mod ${r2} attempted to call SDK function after being unloaded`);
            const s3 = t3(...n2);
            return null == c3 || c3(), s3;
          }, p2 = { unload: s2("unload", () => u(g2)), hookFunction: s2("hookFunction", (o3, t3, n2) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3), a3 = c2(i3);
            "number" != typeof t3 && e(`Mod ${r2} failed to hook function '${o3}': Expected priority number, got ${typeof t3}`), "function" != typeof n2 && e(`Mod ${r2} failed to hook function '${o3}': Expected hook function, got ${typeof n2}`);
            const s3 = { mod: g2.name, priority: t3, hook: n2 };
            return a3.hooks.push(s3), d(), () => {
              const o4 = a3.hooks.indexOf(s3);
              o4 >= 0 && (a3.hooks.splice(o4, 1), d());
            };
          }), patchFunction: s2("patchFunction", (o3, t3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3), a3 = c2(i3);
            n(t3) || e(`Mod ${r2} failed to patch function '${o3}': Expected patches object, got ${typeof t3}`);
            for (const [n2, i4] of Object.entries(t3)) "string" == typeof i4 ? a3.patches.set(n2, i4) : null === i4 ? a3.patches.delete(n2) : e(`Mod ${r2} failed to patch function '${o3}': Invalid format of patch '${n2}'`);
            d();
          }), removePatches: s2("removePatches", (o3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const t3 = l(o3);
            c2(t3).patches.clear(), d();
          }), callOriginal: s2("callOriginal", (o3, t3, n2) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to call a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3);
            return Array.isArray(t3) || e(`Mod ${r2} failed to call a function: Expected args array, got ${typeof t3}`), i3.original.apply(null != n2 ? n2 : globalThis, t3);
          }), getOriginalHash: s2("getOriginalHash", (o3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to get hash: Expected function name string, got ${typeof o3}`);
            return l(o3).originalHash;
          }) }, g2 = { name: o2.name, fullName: o2.fullName, version: o2.version, repository: o2.repository, allowReplace: i2, api: p2, loaded: true, patching: /* @__PURE__ */ new Map() };
          return f.set(o2.name, g2), Object.freeze(p2);
        }
        function h() {
          const o2 = [];
          for (const e2 of f.values()) o2.push({ name: e2.name, fullName: e2.fullName, version: e2.version, repository: e2.repository });
          return o2;
        }
        let m;
        const y = void 0 === window.bcModSdk ? window.bcModSdk = function() {
          const e2 = { version: o, apiVersion: 1, registerMod: g, getModsInfo: h, getPatchingInfo: p, errorReporterHooks: Object.seal({ apiEndpointEnter: null, hookEnter: null, hookChainExit: null }) };
          return m = e2, Object.freeze(e2);
        }() : (n(window.bcModSdk) || e("Failed to init Mod SDK: Name already in use"), 1 !== window.bcModSdk.apiVersion && e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`), window.bcModSdk.version !== o && alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')
One of mods you are using is using an old version of SDK. It will work for now but please inform author to update`), window.bcModSdk);
        return "undefined" != typeof exports && (Object.defineProperty(exports, "__esModule", { value: true }), exports.default = y), y;
      }();
      (async function() {
        if (typeof globalThis.ABCLversion != "undefined") {
          console.warn("ABCL already loaded. No double loading");
          return;
        }
        var abcl = null;
        let runtime = "";
        if (local) {
          const runtimeElement = document.getElementById("ABCLruntimeID");
          if (!runtimeElement?.innerText) {
            console.error("Runtime element not found");
            return;
          }
          runtime = runtimeElement.innerText;
        } else {
          runtime = "https://raw.githubusercontent.com/zoe-64/ABCL/main/";
        }
        const ABCLversion = "1.0";
        const modApi = bcModSDK.registerMod({
          name: "ABCL",
          fullName: "Adult Baby Club Lover",
          version: ABCLversion,
          repository: "https://github.com/zoe-64/ABCL"
        });
        globalThis.ABCLversion = ABCLversion;
        const ABCLdata = await GetJson(runtime + "Data/dictionary.json");
        const DiaperUseLevels = {
          "Clean": "#8F8F8F",
          "MiddleWet": "#ffe58b",
          "MaximumWet": "#ffd33e",
          "MiddleMessy": "#423019",
          "MaximumMessy": "#3C302C",
          "SelfWet": "#4F4B1B",
          "SelfMessy": "#3B2B17"
        };
        const diaperDefaultValues = {
          messChance: 0.3,
          wetChance: 0.5,
          baseTimer: 30,
          regressionLevel: 0,
          desperationLevel: 0,
          messageType: "internalMonologue",
          wetting: true,
          messing: true,
          accidents: false,
          visual: true,
          enabled: true
        };
        function getItemsBelow() {
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
            result += " gets";
          } else if (options.length === 1) {
            result = options[0] + " get";
          } else {
            result = "legs are";
          }
          return result;
        }
        SentenceBuilder.data["\xA7name\xA7"] = { get neutral() {
          return [GetName(Player)];
        } };
        SentenceBuilder.data["\xA7items-below\xA7"] = { get neutral() {
          return [getItemsBelow()];
        } };
        SentenceBuilder.data["\xA7current-diaper\xA7"] = { get neutral() {
          return [InventoryGet(Player, "ItemPelvis")?.Asset?.Description || InventoryGet(Player, "Panties")?.Asset?.Description || "diaper"];
        } };
        SentenceBuilder.data["\xA7by-player\xA7"] = { "neutral": [Pronoun.get("Reflexive", Player)] };
        SentenceBuilder.data = { ...ABCLdata.verbs, ...SentenceBuilder.data };
        function promptMessage(unformatedMessage) {
          console.log(unformatedMessage);
          SentenceBuilder.target = Player;
          let message = SentenceBuilder.prompt(unformatedMessage, Player);
          if (typeof abcl == "undefined" || abcl == null) {
            console.error("ABCL not loaded");
            return;
          }
          if (abcl.messageType == "internalMonologue") {
            Messager.localSend(message);
          } else {
            Messager.send(message, void 0, "Chat");
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
          getRegressionItems(items = Player.Appearance) {
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
                return false;
              }
              let content = JSON.parse(response.Content);
              console.log(content.Action, "ChangeDiaper", content.MemberNumber, Player.MemberNumber);
              if (content.Action == "ChangeDiaper" && content.MemberNumber == Player.MemberNumber) {
                let player = GetPlayer(content.MemberNumber);
                let responder = GetPlayer(response.Sender);
                if (player) {
                  this.changeDiaper(player, GetName(responder));
                }
              }
            }
            return false;
          }
          constructor() {
            globalThis.Abcl = this;
            const abcl2 = this;
            this.cache = new LocalCache(`Abcl-${Player.MemberNumber}`);
            this._PelvisItem = null, this._PantiesItem = null, Messager.listener(this.ABCLMessagerListener.bind(this), -5, "ABCL Message Processor");
            this.enabled = this.cache.get("enabled", diaperDefaultValues.enabled);
            this.visual = this.cache.get("visual", diaperDefaultValues.visual);
            this.accidents = this.cache.get("accidents", diaperDefaultValues.accidents);
            this.messageType = this.cache.get("messageType", diaperDefaultValues.messageType);
            this.loopTimestamp = Date.now();
            this.wet = {
              _enabled: abcl2.cache.get("wet_enabled", diaperDefaultValues.wetting),
              _wets: abcl2.cache.get("wet_count", 0),
              _wetChance: abcl2.cache.get("wet_base", diaperDefaultValues.wetChance),
              set count(value) {
                this._wets = value;
                abcl2.cache.set("wet_count", value);
                abcl2.refreshDiaper();
              },
              get count() {
                return this._wets;
              },
              set base(value) {
                this._wetChance = value;
                abcl2.cache.set("wet_base", value);
              },
              get base() {
                return this._wetChance;
              },
              get chance() {
                let chance = this._wetChance;
                for (let item of abcl2.getRegressionItems()) {
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
                this._enabled = value;
                abcl2.cache.set("wet_enabled", value);
              }
            };
            this.mess = {
              _enabled: abcl2.cache.get("mess_enabled", diaperDefaultValues.messing),
              _messes: abcl2.cache.get("mess_count", 0),
              _messChance: abcl2.cache.get("mess_base", diaperDefaultValues.messChance),
              set count(value) {
                this._messes = value;
                abcl2.cache.set("mess_count", value);
                abcl2.refreshDiaper();
              },
              get count() {
                return this._messes;
              },
              set base(value) {
                this._messChance = value;
                abcl2.cache.set("mess_base", value);
              },
              get base() {
                return this._messChance;
              },
              get chance() {
                let chance = this._messChance;
                for (let item of abcl2.getRegressionItems()) {
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
                abcl2.cache.set("mess_enabled", value);
              }
            };
            this.regression = {
              _regression: abcl2.cache.get("regression", diaperDefaultValues.regressionLevel),
              get base() {
                return this._regression;
              },
              set base(value) {
                this._regression = value;
                abcl2.cache.set("regression", value);
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
                for (let item of abcl2.getRegressionItems()) {
                  for (let key in ABCLdata.CraftingModifiers.regression) {
                    total += item?.Craft?.Description?.includes(key) ? ABCLdata.CraftingModifiers.regression[key] : 0;
                  }
                }
                return total;
              },
              step() {
                this.base += this.modifier;
              }
            };
            this.desperation = {
              _desperation: abcl2.cache.get("desperation", diaperDefaultValues.desperationLevel),
              get base() {
                return this._desperation;
              },
              set base(value) {
                this._desperation = value;
                abcl2.cache.set("desperation", value);
              },
              get modifier() {
                let total = this._desperation;
                for (let item of abcl2.getRegressionItems()) {
                  for (let key in ABCLdata.CraftingModifiers.desperation) {
                    total += item?.Craft?.Description?.includes(key) ? ABCLdata.CraftingModifiers.regression[key] : 0;
                  }
                }
                ;
                return total;
              },
              check() {
                if (abcl2.isMilk()) {
                  this.base = 3;
                }
                if (!abcl2.isMilk()) {
                  this.base = this.base != 0 ? this.base - 1 : 0;
                }
              }
            };
            this.absorbancy = {
              get total() {
                let total = 0;
                if (abcl2.PelvisItem) {
                  total += ABCLdata["Diapers"][abcl2.PelvisItem.Asset.Description].absorbancy;
                }
                if (abcl2.PantiesItem) {
                  total += ABCLdata["Diapers"][abcl2.PantiesItem.Asset.Description].absorbancy;
                }
                return total;
              }
            };
            this.diaperTimerModifier = 1;
            this.diaperRunning = true;
            this.loop();
          }
          get diaperTimer() {
            let modifier = this.diaperTimerModifier * Math.pow(0.5, this.regression.base + 1) * (this.desperation.modifier + 1);
            if (this.mess.chance + this.wet.chance > 1) {
              modifier *= this.mess.chance + this.wet.chance;
            }
            return diaperDefaultValues.baseTimer / (1 + modifier);
          }
          get nextEncounter() {
            let nextEncounter = (this.loopTimestamp + this.diaperTimer * 60 * 1e3 - Date.now()) / 1e3;
            return nextEncounter;
          }
          set PelvisItem(item) {
            this._PelvisItem = item;
            if (!this.PelvisItem && !this.PantiesItem) {
              this.mess.count = 0;
              this.wet.count = 0;
            }
            setTimeout(() => this.refreshDiaper(), 5e3);
          }
          get PelvisItem() {
            this._PelvisItem = InventoryGet(Player, "ItemPelvis");
            if (this._PelvisItem == null) {
              return null;
            }
            return this.isDiaper(this._PelvisItem) ? this._PelvisItem : null;
          }
          set PantiesItem(item) {
            this._PantiesItem = item;
            if (!this.PelvisItem && !this.PantiesItem) {
              this.mess.count = 0;
              this.wet.count = 0;
            }
            setTimeout(() => this.refreshDiaper(), 5e3);
          }
          get PantiesItem() {
            this._PantiesItem = InventoryGet(Player, "Panties");
            if (this._PantiesItem == null) {
              return null;
            }
            return this.isDiaper(this._PantiesItem) ? this._PantiesItem : null;
          }
          reset() {
            localStorage.removeItem(`Abcl-${Player.MemberNumber}`);
            setTimeout(() => location.reload(), 2e3);
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
          changeDiaper(player, by = "self") {
            if (player != Player && player != null) {
              Messager.send({ "Action": "ChangeDiaper", "MemberNumber": player.MemberNumber }, player.MemberNumber, "Hidden");
              return;
            }
            this.PelvisItem = InventoryGet(Player, "ItemPelvis");
            this.PantiesItem = InventoryGet(Player, "Panties");
            this.wet.count = 0;
            this.mess.count = 0;
            this.updateDiaperColor("ItemPelvis");
            this.updateDiaperColor("Panties");
            if (by != "self") {
              SentenceBuilder.data["\xA7by-player\xA7"] = { "neutral": [by] };
              promptMessage(ABCLdata.messages[this.messageType]["changeBy"]);
            } else {
              SentenceBuilder.data["\xA7by-player\xA7"] = { "neutral": [GetName(Player)] };
              promptMessage(ABCLdata.messages[this.messageType]["changeSelf"]);
              SentenceBuilder.data["\xA7by-player\xA7"] = { "neutral": [Pronoun.get("Reflexive", Player)] };
            }
          }
          // Check for if a diaper is in the Panties or ItemPelvies slot
          isDiaper(item) {
            return item?.Asset?.Name.toLowerCase().includes("diaper");
          }
          // Checks to see if the user has a nursery milk equiped
          hasMilk() {
            return InventoryGet(Player, "ItemMouth")?.Asset?.Name === "RegressedMilk" || InventoryGet(Player, "ItemMouth2")?.Asset?.Name === "RegressedMilk" || InventoryGet(Player, "ItemMouth3")?.Asset?.Name === "RegressedMilk";
          }
          // Checks for a normal milk bottle
          isMilk() {
            let items = Player.Appearance;
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
            if (item == null || item.Color == null || !this.isDiaper(item)) {
              return;
            }
            if (typeof item.Color == "object") {
              for (let index in item.Color) {
                if (item.Color[index] == "Default") {
                  item.Color[index] = item.Asset.DefaultColor[index];
                }
              }
            } else if (item.Color == "Default" && typeof item.Color == "string") {
              item.Color = item.Asset.DefaultColor;
            }
            let diaper = ABCLdata["Diapers"][item.Asset.Description];
            if ((diaper.type === "primary" || diaper.type === "primary&secondary") && typeof item.Color == "string") {
              item.Color = item.Asset.DefaultColor;
            }
            let color = {
              messy: DiaperUseLevels["Clean"],
              wet: DiaperUseLevels["Clean"]
              // in the end we just mix these together but messy is 50% stronger
            };
            let delta = {
              "messy": this.mess.count / this.absorbancy.total,
              "wet": this.wet.count / this.absorbancy.total
            };
            if (delta.messy > 0.75) {
              if (delta.messy > 0.9) {
                color.messy = DiaperUseLevels["MaximumMessy"];
              } else {
                color.messy = AverageColor(DiaperUseLevels["MaximumMessy"], DiaperUseLevels["MiddleMessy"], delta.messy - 0.75);
              }
            } else {
              color.messy = AverageColor(DiaperUseLevels["MiddleMessy"], DiaperUseLevels["Clean"], delta.messy);
            }
            if (delta.wet > 0.75) {
              if (delta.wet > 0.9) {
                color.wet = DiaperUseLevels["MaximumWet"];
              } else {
                color.wet = AverageColor(DiaperUseLevels["MaximumWet"], DiaperUseLevels["MiddleWet"], delta.wet - 0.75);
              }
            } else {
              color.wet = AverageColor(DiaperUseLevels["MiddleWet"], DiaperUseLevels["Clean"], delta.wet);
            }
            let primary = AverageColor(color.messy, color.wet, 0.7);
            let secondary = AverageColor(color.messy, color.wet, 0.9);
            if (diaper.type == "mono") {
              item.Color = primary;
            } else if (diaper.type === "primary") {
              item.Color = primary;
            } else if (diaper.type === "primary&secondary" && typeof item.Color != "string") {
              let primary_index = ABCLdata["Diapers"][item.Asset.Description].indexes[0];
              let secondary_index = ABCLdata["Diapers"][item.Asset.Description].indexes[1];
              item.Color[primary_index] = primary;
              item.Color[secondary_index] = secondary;
            }
          }
          accident(isMess = false) {
            if (!this.enabled || !this.accidents) {
              return;
            }
            let itemsBelow = [];
            itemsBelow.push(
              ...["Shoes", "Socks", "Panties", "ItemPelvis", "ItemBoots", "Garters", "RightAnklet", "LeftAnklet", "SuitLower", "ClothLower"].map((slot) => InventoryGet(Player, slot))
            );
            for (let item of itemsBelow) {
              if (item) {
                if (typeof item.Color === "string") {
                  if (isMess) {
                    item.Color = AverageColor(item.Color, DiaperUseLevels["SelfMessy"], 0.2);
                  } else {
                    item.Color = AverageColor(item.Color, DiaperUseLevels["SelfWet"], 0.2);
                  }
                } else {
                  if (!item.Color) {
                    continue;
                  }
                  for (let index = 0; index < item.Color.length; index++) {
                    if (isMess) {
                      item.Color[index] = AverageColor(item.Color[index], DiaperUseLevels["SelfMessy"], 0.2);
                    } else {
                      item.Color[index] = AverageColor(item.Color[index], DiaperUseLevels["SelfWet"], 0.2);
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
                await new Promise((r) => setTimeout(r, this.diaperTimer * 60 * 1e3));
                continue;
              }
              this.loopTimestamp = Date.now();
              await new Promise((r) => setTimeout(r, this.diaperTimer * 60 * 1e3));
              this.regression.step();
              this.desperation.check();
              let pelvis = InventoryGet(Player, "ItemPelvis");
              let panties = InventoryGet(Player, "Panties");
              if (this.diaperRunning && (pelvis && this.isDiaper(pelvis) || panties && this.isDiaper(panties))) {
                this.tick();
              } else {
                this.accident();
              }
            }
          }
          tick() {
            let chanceForNothing = 0.1;
            let total = this.mess.chance * +this.mess.enabled + this.wet.chance * +this.wet.enabled + chanceForNothing;
            let messChance = this.mess.chance / total;
            let wetChance = this.wet.chance / total;
            const randomValue = Math.random();
            if (randomValue < messChance) {
              this.mess.count++;
              if (this.absorbancy.total > this.mess.count) {
                promptMessage(ABCLdata.messages[this.messageType]["mess"]);
              } else if (this.absorbancy.total == this.mess.count) {
                promptMessage(ABCLdata.messages[this.messageType]["fullyMess"]);
              } else {
                promptMessage(ABCLdata.messages[this.messageType]["immergency"]);
              }
            } else if (randomValue < wetChance + chanceForNothing) {
            } else {
              this.wet.count++;
              if (this.absorbancy.total > this.wet.count) {
                promptMessage(ABCLdata.messages[this.messageType]["wet"]);
              } else if (this.absorbancy.total == this.wet.count) {
                promptMessage(ABCLdata.messages[this.messageType]["fullyWet"]);
              } else {
                promptMessage(ABCLdata.messages[this.messageType]["immergency"]);
              }
            }
            this.updateDiaperColor("ItemPelvis");
            this.updateDiaperColor("Panties");
            ChatRoomCharacterUpdate(Player);
          }
          setupSettings() {
            PreferenceSubscreenList.push("Abcl");
            const abcl_settings = document.querySelector("#abcl");
            const inspect = document.querySelector(".inspect");
            if (!abcl_settings || !inspect) {
              console.error("ABCL settings not found");
              return;
            }
            const abcl_descriptions = {
              "abcl-visual": "The visibility of wetting and soiling diapers including accidents.",
              "abcl-wetting": "The wetting of diapers.",
              "abcl-messing": "The soiling of diapers.",
              "abcl-accidents": "Controls having accidents accidents when not wearing protection.",
              "abcl-wetting-rate": "The chance of wetting diapers.",
              "abcl-messing-rate": "The chance of soiling diapers.",
              "abcl-message-type": "The style of messages that happen after an event.",
              "abcl-toggle": "If the ABCL system is enabled or disabled.",
              "abcl-toggle-text": "If the ABCL system is enabled or disabled."
            };
            abcl_settings.addEventListener("mouseover", (e) => {
              if (e.target.id in abcl_descriptions) {
                if (inspect.querySelector("p") != null) {
                  inspect.querySelector("p").textContent = abcl_descriptions[e.target.id];
                }
              }
            });
            if (!abcl) {
              return;
            }
            assertQuerySelector("#abcl-visual input").checked = abcl.visual;
            assertQuerySelector("#abcl-wetting input").checked = abcl.wet.enabled;
            assertQuerySelector("#abcl-messing input").checked = abcl.mess.enabled;
            assertQuerySelector("#abcl-accidents input").checked = abcl.accidents;
            assertQuerySelector("#abcl-wetting-rate input").value = String(Math.floor(abcl.mess.base * 100));
            assertQuerySelector("#abcl-messing-rate input").value = String(Math.floor(abcl.wet.base * 100));
            assertQuerySelector("#abcl-message-type select").value = abcl.messageType;
            assertQuerySelector("#abcl-toggle").checked = abcl.enabled;
            const settingsMap = {
              "#abcl-visual input": { property: "visual", event: "change", handler: (e) => {
                this.visual = e.target.checked;
                this.cache.set("visual", this.visual);
                this.refreshDiaper();
              } },
              "#abcl-wetting input": { event: "change", handler: (e) => {
                this.wet.enabled = e.target.checked;
              } },
              "#abcl-messing input": { event: "change", handler: (e) => {
                this.mess.enabled = e.target.checked;
              } },
              "#abcl-accidents input": { event: "change", handler: (e) => {
                this.accidents = e.target.checked;
                this.cache.set("accidents", e.target.checked);
              } },
              "#abcl-wetting-rate input": { event: "change", handler: (e) => {
                this.wet.base = +e.target.value / 100;
              } },
              "#abcl-messing-rate input": { event: "change", handler: (e) => {
                this.mess.base = +e.target.value / 100;
              } },
              "#abcl-message-type select": { event: "change", handler: (e) => {
                this.messageType = e.target.value;
                this.cache.set("messageType", this.messageType);
              } },
              "#abcl-toggle": { event: "change", handler: (e) => {
                this.enabled = e.target.checked;
                this.cache.set("enabled", this.enabled);
              } }
            };
            for (const key of Object.keys(settingsMap)) {
              const { event, handler } = settingsMap[key];
              assertQuerySelector(key).addEventListener(event, handler);
            }
          }
          test() {
            if (!abcl) {
              console.error("ABCL not loaded");
              return;
            }
            abcl.changeDiaper(Player);
            abcl.accident();
            abcl.accident(true);
            abcl.tick();
            abcl.regression.step();
            abcl.desperation.check();
          }
        }
        function assertQuerySelector(selector) {
          const el = document.querySelector(selector);
          if (!el) throw new Error(`Failed to find element for selector ${selector}`);
          return el;
        }
        ABCLLoginDoLogin();
        ABCLCharacterAppearanceSetItem();
        ABCLTextGet();
        ABCLDrawButton();
        async function ABCLLoginDoLogin() {
          modApi.hookFunction(
            "LoginDoLogin",
            1,
            (args, next) => {
              next(args);
              setTimeout(() => {
                if (abcl == null) {
                  abcl = new ABCL();
                  abcl.setupSettings();
                }
              }, 1e3);
            }
          );
        }
        async function ABCLCharacterAppearanceSetItem() {
          modApi.hookFunction("CharacterAppearanceSetItem", 2, (args, next) => {
            let [_character, slot, _asset] = args;
            if (abcl) {
              let item = { "Asset": _asset };
              if (slot == "ItemPelvis") {
                abcl.PelvisItem = abcl.isDiaper(item) ? null : item;
              }
              if (slot == "Panties") {
                abcl.PantiesItem = abcl.isDiaper(item) ? null : item;
              }
            }
            return next(args);
          });
        }
        async function ABCLTextGet() {
          modApi.hookFunction("TextGet", 2, (args, next) => {
            if (args[0] == "HomepageAbcl") return "ABCL";
            else return next(args);
          });
        }
        async function ABCLDrawButton() {
          modApi.hookFunction("DrawButton", 2, (args, next) => {
            if (args[6] == "Icons/Abcl.png") args[6] = runtime + "Assets/abcl.png";
            return next(args);
          });
        }
        globalThis.PreferenceSubscreenAbclLoad = () => {
          assertQuerySelector("#abcl").classList.remove("hidden");
        };
        globalThis.PreferenceSubscreenAbclRun = () => {
        };
        globalThis.PreferenceSubscreenAbclExit = () => {
          assertQuerySelector("#abcl").classList.add("hidden");
          PreferenceSubscreen = "";
          PreferenceMessage = "";
        };
        CommandCombine([{
          Tag: "abcl",
          Description: "(action) (target or value) = plays with diapers (ABDL game).",
          Action: (args) => {
            let [command, ...input] = args.split(/[ ,]+/);
            let identifier = input[0];
            if (!abcl) {
              return;
            }
            switch (command) {
              case "":
                ChatRoomSendLocal(
                  "<p style='background-color:#5fbd7a'><b>ABCL</b>: Welcome to Adult Baby Club Lover! Where we make sure babies use their diapers!\n \n<b>/abcl tick</b> to force a tick\n \nTo get new clean diapers:\n<b>/abcl change</b> to change your diaper\n<b>/abcl change (target)</b> to change someone else's diaper\n"
                );
                break;
              case "stats":
                ChatRoomSendLocal(
                  "<p style='background-color:#5fbd7a'>ABCL: Your current diaper stats are: \nDesperation: " + abcl.desperation.modifier + ", \nRegression: " + (abcl.regression.modifier + abcl.regression.base) + ", \nRegressive change: " + abcl.regression.modifier + ", \nWet Chance: " + abcl.wet.chance * 100 + "%, \nMess Chance: " + abcl.mess.chance * 100 + "%, \nWets: " + abcl.wet.count + ", \nMesses: " + abcl.mess.count + ", \nPadding: " + abcl.absorbancy.total + ", \nAproximate timer: " + Math.floor(abcl.diaperTimer) + " minutes.</p>\n"
                );
                break;
              case "tick":
                let pelvis = InventoryGet(Player, "ItemPelvis");
                let panties = InventoryGet(Player, "Panties");
                if ((pelvis && abcl.isDiaper(pelvis) || panties && abcl.isDiaper(panties)) && abcl.diaperRunning === true) {
                  abcl.tick();
                } else {
                  abcl.accident();
                }
                ChatRoomSendLocal(`<p style='background-color:#5fbd7a'>ABCL: ${Player.Nickname == "" ? Player.Name : Player.Nickname} uses ${Pronoun.get("dependent", Player)} timemachine.</p>`);
                break;
              case "change":
                if (identifier == null) {
                  if (!(abcl.PelvisItem || abcl.PantiesItem)) {
                    ChatRoomSendLocal(
                      "<p style='background-color:#5fbd7a'>ABCL: You don't have a diaper!</p>"
                    );
                  } else
                    abcl.changeDiaper(Player);
                } else {
                  let player = GetPlayer(identifier);
                  if (player == null) {
                    ChatRoomSendLocal("<p style='background-color:#5fbd7a'>ABCL: Player not found!</p>");
                    break;
                  }
                  let pelvis2 = InventoryGet(player, "ItemPelvis");
                  let panties2 = InventoryGet(player, "Panties");
                  if (pelvis2 && abcl.isDiaper(pelvis2) || panties2 && abcl.isDiaper(panties2)) {
                    abcl.changeDiaper(player);
                  } else {
                    ChatRoomSendLocal("<p style='background-color:#5fbd7a'>ABCL: " + ChatRoomHTMLEntities(GetName(player)) + " does not have a diaper!</p>");
                  }
                }
                break;
              default:
                ChatRoomSendLocal("<p style='background-color:#5fbd7a'>ABCL: The diaper command must include an action.</p>");
                break;
            }
          }
        }]);
      })();
    }
  });
  require_ABCL();
})();
