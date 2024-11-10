var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/bondage-club-mod-sdk/dist/bcmodsdk.js
var require_bcmodsdk = __commonJS({
  "node_modules/bondage-club-mod-sdk/dist/bcmodsdk.js"(exports2) {
    var bcModSdk2 = function() {
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
      return "undefined" != typeof exports2 && (Object.defineProperty(exports2, "__esModule", { value: true }), exports2.default = y), y;
    }();
  }
});

// node_modules/uuid/dist/esm-browser/rng.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}

// node_modules/uuid/dist/esm-browser/regex.js
var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

// node_modules/uuid/dist/esm-browser/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default = validate;

// node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
var i;
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var stringify_default = stringify;

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default = v4;

// node_modules/zoelib/dist/zoelib.mjs
var Pronoun = class _Pronoun {
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
    if (!player) {
      return "Unknown";
    }
    let pronouns = player.GetPronouns();
    return _Pronoun.pronouns[pronouns][shape];
  }
};
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
var Messager = class _Messager {
  static beepListeners = /* @__PURE__ */ new Map();
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
  static async request(message, target, type = "HiddenBeep") {
    const messageId = v4_default();
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        _Messager.removeBeepListener(messageId);
        reject(new Error("Request timed out"));
      }, 1e4);
      _Messager.addBeepListener(messageId, (response, sender) => {
        const parsedResponse = JSON.parse(response);
        if (parsedResponse?.id == messageId) {
          clearTimeout(timeout);
          _Messager.removeBeepListener(messageId);
          resolve(parsedResponse);
        }
      });
      _Messager.send({
        id: messageId,
        content: message
      }, target, type);
    });
  }
  static send(message, target, type = "Hidden") {
    if (typeof message != "string") {
      message = JSON.stringify(message);
    }
    if (type == "AccountBeep" && target) {
      ServerSend("AccountBeep", { Message: message, BeepType: "", MemberNumber: target });
    } else if (type == "HiddenBeep" && target) {
      ServerSend("AccountBeep", { Message: JSON.stringify({ Content: message, isZoelib: true, sender: Player.MemberNumber }), BeepType: "Leash", MemberNumber: target });
    } else if (type == "Action" && typeof message == "string") {
      ServerSend("ChatRoomChat", { Content: "Beep", Type: "Action", Dictionary: [
        { Tag: "Beep", Text: "msg" },
        { Tag: "msg", Text: message }
      ] });
      return;
    } else if (type == "Emote" && typeof message == "string") {
      ChatRoomSendEmote("/action" + message);
      return;
    } else if (type == "LocalMessage" && typeof message == "string") {
      ChatRoomSendLocal(message);
      return;
    } else if (type in ["Chat", "Whisper", "Action", "Emote", "Status", "ServerMessage"]) {
      ServerSend("ChatRoomChat", { Content: message, Type: type, Target: target });
    }
  }
  // warning: any function passed in addBeepListener will not have error management
  static addBeepListener(id, callback) {
    _Messager.beepListeners.set(id, callback);
  }
  static removeBeepListener(id) {
    _Messager.beepListeners.delete(id);
  }
  static addListener(callback, priority = -5, description = "") {
    ChatRoomRegisterMessageHandler({ Description: description, Callback: callback, Priority: priority });
  }
};
globalThis.Messager = Messager;
var LocalCache = class {
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
var SentenceBuilder = class _SentenceBuilder {
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
function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
async function GetJson(url) {
  return fetch(url).then((response) => response.json());
}
async function GetText(url) {
  return fetch(url).then((response) => response.text());
}
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
var modApi = bcModSDK.registerMod({
  name: "zoelib",
  fullName: "Zoe's Library",
  version: "1.1.5",
  repository: ""
});
modApi.hookFunction("ServerAccountBeep", 10, (args, next) => {
  let data = args[0];
  if (data.BeepType == "Leash" && !!data.Message) {
    try {
      const json = JSON.parse(data.Message);
      if (json?.isZoelib) {
        Messager.beepListeners.forEach((callback, key) => {
          callback(json.Content, json.sender);
        });
      }
    } catch (e) {
      console.trace(e);
      return next(args);
    }
  } else {
    return next(args);
  }
});

// src/data.ts
function getRuntime() {
  if (document.getElementById("ABCLruntimeID")) {
    const runtimeElement = document.getElementById("ABCLruntimeID");
    if (!runtimeElement?.innerText) {
      throw new Error("Runtime element not found");
    }
    return runtimeElement.innerText;
  }
  return "https://raw.githubusercontent.com/zoe-64/ABCL/main/";
}
async function createABCLHtml(runtime2) {
  const abclHtml = await GetText(runtime2 + "data/settings.html");
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = runtime2 + "data/abcl.css";
  (document.head || document.documentElement).appendChild(link);
  document.body.insertAdjacentHTML("beforeend", abclHtml);
}
var DiaperUseLevels = {
  "Clean": "#8F8F8F",
  "Middlewet": "#ffe58b",
  "Maximumwet": "#ffd33e",
  "Middlemess": "#423019",
  "Maximummess": "#3C302C",
  "Selfwet": "#4F4B1B",
  "Selfmess": "#3B2B17"
};
var runtime = getRuntime();
var ABCLdata = await GetJson(runtime + "data/dictionary.json");
var templates = {
  stats: await GetText(runtime + "data/stats.html"),
  settings: await GetText(runtime + "data/settings.html")
};
var diaperDefaultValues = {
  messChance: 0.3,
  wetChance: 0.5,
  timer: 30,
  regressionLevel: 0,
  desperationLevel: 0,
  messageType: "internalMonologue",
  wetting: true,
  messing: true,
  accidents: false,
  visual: true,
  enabled: true
};

// src/message.ts
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
function promptMessage(unformatedMessage) {
  SentenceBuilder.target = Player;
  let message = SentenceBuilder.prompt(unformatedMessage, Player);
  if (!globalThis?.ABCLLOADED) {
    console.error("ABCL not loaded");
    return;
  }
  let abcl2 = globalThis.abcl;
  if (abcl2.messageType == "internalMonologue") {
    Messager.send(message, Player.MemberNumber, "LocalMessage");
  } else {
    ServerSend("ChatRoomChat", { Content: "Beep", Type: "Action", Dictionary: [
      { Tag: "Beep", Text: "msg" },
      { Tag: "msg", Text: message }
    ] });
  }
}

// src/objects.ts
var Diaper = class _Diaper {
  item;
  wettings;
  messes;
  slot;
  constructor(item) {
    this.item = item;
    this.slot = item.Asset.DynamicGroupName;
    this.wettings = 0;
    this.messes = 0;
  }
  get absorbancy() {
    let total = 0;
    const { Diapers, CraftingModifiers } = ABCLdata;
    const itemDescription = this.item?.Asset?.Description;
    const craftingDescription = this.item?.Craft?.Description;
    if (itemDescription) {
      total += Diapers[itemDescription]?.absorbancy ?? 0;
    }
    if (craftingDescription) {
      for (const [key, value] of Object.entries(CraftingModifiers.absorbancy)) {
        if (craftingDescription.includes(key)) {
          total += value;
        }
      }
    }
    return total;
  }
  wet() {
    this.wettings += 1;
  }
  mess() {
    this.messes += 1;
  }
  change() {
    this.wettings = 0;
    this.messes = 0;
  }
  static isDiaper(item) {
    return item.Asset.Description.toLowerCase().includes("diaper");
  }
  // should be called BEFORE update color
  isReplaced() {
    let item = InventoryGet(Player, this.slot);
    return !(item && item.Color && _Diaper.isDiaper(item) && this.item.Asset.InventoryID === item.Asset.InventoryID);
  }
  getColor() {
    if (Array.isArray(this.item.Color)) {
      this.item.Color = this.item.Color.map(
        (color, index) => color === "Default" ? this.item.Asset.DefaultColor[index] : color
      );
    } else if (this.item.Color === "Default") {
      this.item.Color = this.item.Asset.DefaultColor;
    }
    const diaperData = ABCLdata["Diapers"][this.item.Asset.Description];
    if ((diaperData.type === "primary" || diaperData.type === "primary&secondary") && typeof this.item.Color == "string") {
      this.item.Color = this.item.Asset.DefaultColor;
    }
    let messyColor = DiaperUseLevels["Clean"];
    let wetColor = DiaperUseLevels["Clean"];
    const messyLevel = this.messes / this.absorbancy;
    const wetLevel = this.wettings / this.absorbancy;
    messyColor = getColor(messyLevel, "Maximummess", "Middlemess", "Clean");
    wetColor = getColor(wetLevel, "Maximumwet", "Middlewet", "Clean");
    const primaryColor = AverageColor(messyColor, wetColor, 0.7);
    const secondaryColor = AverageColor(messyColor, wetColor, 0.9);
    const { indexes } = diaperData;
    if (diaperData.type === "mono") {
      return primaryColor;
    } else if (diaperData.type === "primary" && Array.isArray(this.item.Color) && indexes && indexes[0] !== void 0) {
      return [primaryColor];
    } else if (diaperData.type === "primary&secondary" && Array.isArray(this.item.Color) && indexes && indexes[0] !== void 0 && indexes[1] !== void 0) {
      return [primaryColor, secondaryColor];
    }
  }
};
function getColor(level, highLevel, midLevel, lowLevel) {
  if (level > 0.75) {
    return level > 0.9 ? DiaperUseLevels[highLevel] : AverageColor(DiaperUseLevels[highLevel], DiaperUseLevels[midLevel], level - 0.75);
  } else {
    return AverageColor(DiaperUseLevels[midLevel], DiaperUseLevels[lowLevel], level);
  }
}

// src/ABCL.ts
var import_bondage_club_mod_sdk = __toESM(require_bcmodsdk());
async function statUpdateLoop() {
  const abcl2 = globalThis.Abcl;
  if (abcl2 != null) {
    const statBoxes = document.querySelectorAll(".stats-box");
    const seconds = abcl2.nextEncounter;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const chance = abcl2.calculateChance();
    const totalAbsorbancy = (abcl2.topLayer?.absorbancy ?? 0) + (abcl2.bottomLayer?.absorbancy ?? 0);
    const totalMesses = (abcl2.topLayer?.messes ?? 0) + (abcl2.bottomLayer?.messes ?? 0);
    const totalWettings = (abcl2.topLayer?.wettings ?? 0) + (abcl2.bottomLayer?.wettings ?? 0);
    statBoxes.forEach((statbox) => {
      const wetCount = statbox.querySelector(".wetCount");
      const messCount = statbox.querySelector(".messCount");
      const wetChance = statbox.querySelector(".wetChance");
      const messChance = statbox.querySelector(".messChance");
      const tickMinutes = statbox.querySelector(".tickMinutes");
      const tickSeconds = statbox.querySelector(".tickSeconds");
      const bar = statbox.querySelector(".bar");
      const absorbancyTotal = statbox.querySelector(".absorbancyTotal");
      const desperationBase = statbox.querySelector(".desperationBase");
      const regressionBase = statbox.querySelector(".regressionbase");
      const regressionModifier = statbox.querySelector(".regressionModifier");
      if (wetCount) wetCount.textContent = (totalWettings * 60).toString();
      if (messCount) messCount.textContent = (totalMesses * 60).toString();
      if (wetChance) wetChance.textContent = Math.floor(chance.wet * 100) + "%";
      if (messChance) messChance.textContent = Math.floor(chance.mess * 100) + "%";
      if (tickMinutes) tickMinutes.textContent = minutes.toString();
      if (tickSeconds) tickSeconds.textContent = remainingSeconds.toString();
      if (bar) bar.style.width = seconds / (abcl2.diaperTimer * 60) * 100 + "%";
      if (absorbancyTotal) absorbancyTotal.textContent = (totalAbsorbancy * 60).toString();
      if (desperationBase) desperationBase.textContent = (Math.floor(abcl2.desperation.base * 10) / 10).toString();
      if (regressionBase) regressionBase.textContent = (Math.floor((abcl2.regression.modifier + abcl2.regression.base) * 10) / 10).toString();
      if (regressionModifier) regressionModifier.textContent = (Math.floor(abcl2.regression.modifier * 10) / 10).toString();
    });
  }
}
var ABCLversion = "1.1.0";
var modAPI = import_bondage_club_mod_sdk.default.registerMod({
  name: "ABCL",
  version: ABCLversion,
  fullName: "Adult Baby Club Lover",
  repository: "https://github.com/zoe-64/ABCL"
}, {
  allowReplace: false
});
if (typeof globalThis.ABCLversion != "undefined") {
  throw new Error("ABCL already loaded. No double loading");
}
var abcl = null;
globalThis.ABCLversion = ABCLversion;
globalThis.ABCLLOADED = true;
await createABCLHtml(runtime);
setInterval(statUpdateLoop, 1e3);
var ABCL = class {
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
    if (response.Type == "Hidden") {
      try {
        JSON.parse(response.Content);
      } catch (e) {
        return false;
      }
      let content = JSON.parse(response.Content);
      if (content.Action == "ChangeDiaper" && content.MemberNumber == Player.MemberNumber) {
        if (globalThis.BCC_LOADED) {
          if (hasPermissionToChangeDiaper(content.Sender)) {
            this.changeDiaper(Player, GetName(Player));
          }
        }
        let player = GetPlayer(content.MemberNumber);
        let responder = GetPlayer(response.Sender);
        if (player) {
          this.changeDiaper(player, GetName(responder));
        }
      }
    }
    return false;
  }
  cache;
  enabled;
  visual;
  accidents;
  messageType;
  loopTimestamp;
  wet;
  mess;
  regression;
  desperation;
  timer;
  automatic_accidents;
  permissions;
  topLayer;
  bottomLayer;
  constructor() {
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
    globalThis.Abcl = this;
    const abcl2 = this;
    this.permissions = new ABCLPermissions(this);
    this.cache = new LocalCache(`Abcl-${Player.MemberNumber}`);
    Messager.addListener(this.ABCLMessagerListener.bind(this), -5, "ABCL Message Processor");
    this.topLayer = null;
    this.bottomLayer = null;
    this.loopTimestamp = Date.now();
    this.enabled = this.cache.get("enabled", diaperDefaultValues.enabled);
    this.visual = this.cache.get("visual", diaperDefaultValues.visual);
    this.accidents = this.cache.get("accidents", diaperDefaultValues.accidents);
    this.messageType = this.cache.get("messageType", diaperDefaultValues.messageType);
    this.timer = this.cache.get("timer", diaperDefaultValues.timer);
    this.automatic_accidents = this.cache.get("automatic_accidents", true);
    this.wet = {
      _enabled: abcl2.cache.get("wet_enabled", diaperDefaultValues.wetting),
      _wetChance: abcl2.cache.get("wet_base", diaperDefaultValues.wetChance),
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
      _messChance: abcl2.cache.get("mess_base", diaperDefaultValues.messChance),
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
    this.loop();
  }
  get diaperTimer() {
    let modifier = Math.pow(1.02, this.regression.base + 1) * (this.desperation.modifier + 1);
    return Math.floor(this.timer / modifier * 100) / 100;
  }
  get nextEncounter() {
    let encounter = (this.loopTimestamp + this.diaperTimer * 60 * 1e3 - Date.now()) / 1e3;
    return encounter;
  }
  reset() {
    localStorage.removeItem(`Abcl-${Player.MemberNumber}`);
    setTimeout(() => location.reload(), 2e3);
  }
  changeDiaper(player, by = "self") {
    if (player != Player && player != null) {
      Messager.send({ "Action": "ChangeDiaper", "MemberNumber": player.MemberNumber }, player.MemberNumber, "Hidden");
      return;
    }
    if (globalThis.BCC_LOADED) {
      if (!hasPermissionToChangeDiaper(Player, Player)) {
        return;
      }
    }
    this.topLayer?.change();
    this.bottomLayer?.change();
    this.updateDiapers();
    if (by != "self") {
      SentenceBuilder.data["\xA7by-player\xA7"] = { "neutral": [by] };
      promptMessage(ABCLdata.messages[this.messageType]["changeBy"]);
    } else {
      SentenceBuilder.data["\xA7by-player\xA7"] = { "neutral": [GetName(Player)] };
      promptMessage(ABCLdata.messages[this.messageType]["changeSelf"]);
      SentenceBuilder.data["\xA7by-player\xA7"] = { "neutral": [Pronoun.get("Reflexive", Player)] };
    }
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
  accident(result = null) {
    if (!this.enabled || !this.accidents) {
      return;
    }
    if (result == null) {
      result = "self" + this.calculateChance()["result"];
      if (result == "nothing") return;
    }
    promptMessage(ABCLdata.messages[this.messageType][result]);
    if (!this.visual) return;
    let itemsBelow = [];
    itemsBelow.push(
      ...["Shoes", "Socks", "Panties", "ItemPelvis", "ItemBoots", "Garters", "RightAnklet", "LeftAnklet", "SuitLower", "ClothLower"].map((slot) => InventoryGet(Player, slot))
    );
    itemsBelow = itemsBelow.filter((item) => item != null);
    for (let item of itemsBelow) {
      if (!item.Color) continue;
      if (typeof item.Color === "string") {
        item.Color = AverageColor(item.Color, DiaperUseLevels[result], 0.2);
      } else {
        for (let index = 0; index < item.Color.length; index++) {
          item.Color[index] = AverageColor(item.Color[index], DiaperUseLevels[result], 0.2);
        }
      }
    }
    this.updateDiapers();
  }
  updateDiapers(refresh = true) {
    if (!this.bottomLayer || this.bottomLayer.isReplaced()) {
      const item = InventoryGet(Player, "Panties");
      if (item && Diaper.isDiaper(item)) {
        this.bottomLayer = new Diaper(item);
      }
    }
    if (!this.topLayer || this.topLayer.isReplaced()) {
      const item = InventoryGet(Player, "ItemPelvis");
      if (item && Diaper.isDiaper(item)) {
        this.topLayer = new Diaper(item);
      }
    }
    if (!this.enabled || !this.visual) {
      return;
    }
    const topItem = InventoryGet(Player, "ItemPelvis");
    if (this.topLayer && topItem) {
      this.topLayer.item.Color = this.topLayer.getColor();
      topItem.Color = this.topLayer.item.Color;
    }
    const bottomItem = InventoryGet(Player, "Panties");
    if (this.bottomLayer && bottomItem) {
      this.bottomLayer.item.Color = this.bottomLayer.getColor();
      bottomItem.Color = this.bottomLayer.item.Color;
    }
    if (refresh) {
      CharacterRefresh(Player, true);
      ChatRoomCharacterUpdate(Player);
    }
  }
  async loop() {
    this.updateDiapers();
    while (true) {
      if (!this.enabled || !this.automatic_accidents || this.nextEncounter > 0) {
        await new Promise((r) => setTimeout(r, this.diaperTimer * 1e3));
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
    const chanceForNothing = 0.1;
    const total = this.mess.chance + this.wet.chance + chanceForNothing;
    const messChance = this.mess.chance / total * +this.mess.enabled;
    const wetChance = this.wet.chance / total * +this.wet.enabled;
    const result = ["mess", "wet", "nothing"][+("0".repeat(messChance * 100) + "1".repeat(wetChance * 100) + "2".repeat(chanceForNothing * 100))[RandomInt(0, total * 100)]];
    return { result, mess: messChance, wet: wetChance, nothing: chanceForNothing };
  }
  tick() {
    const result = this.calculateChance()["result"];
    if (result == "nothing") {
      return;
    }
    switch (result) {
      case "nothing":
        return;
        break;
      // panties item -> pelvis item
      // bottomLayer -> topLayer
      case "wet":
        if (this.bottomLayer && this.bottomLayer.wettings + this.bottomLayer.messes < this.bottomLayer.absorbancy) {
          this.bottomLayer.wettings += 1;
          break;
        }
        if (this.topLayer) {
          this.topLayer.wettings += 1;
          break;
        }
        break;
      case "mess": {
        if (this.bottomLayer && this.bottomLayer.wettings + this.bottomLayer.messes < this.bottomLayer.absorbancy) {
          this.bottomLayer.messes += 1;
          break;
        }
        if (this.topLayer) {
          this.topLayer.messes += 1;
          break;
        }
        break;
      }
    }
    this.regression.step();
    this.desperation.check();
    let message = "immergency";
    let absorbancy = 0;
    let total = 0;
    if (this.topLayer) {
      absorbancy += this.topLayer.absorbancy;
      total += this.topLayer.messes + this.topLayer.wettings;
    }
    if (this.bottomLayer) {
      absorbancy += this.bottomLayer.absorbancy;
      total += this.bottomLayer.messes + this.bottomLayer.wettings;
    }
    if (absorbancy > total) {
      message = result;
    } else if (total == absorbancy) {
      message = "fully" + result;
    }
    promptMessage(ABCLdata.messages[this.messageType][message]);
    this.updateDiapers();
  }
  setupSettings() {
    PreferenceSubscreenList.push("Abcl");
    const abclSettings = document.querySelector("#abcl");
    if (!abclSettings) {
      console.error("ABCL settings not found");
      return;
    }
    if (!abcl) {
      return;
    }
    const setInputValue = (selector, value) => {
      const input = assertQuerySelector(selector);
      if (input.type === "checkbox") {
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
    const settingsMap = {
      "#abcl-visual input": {
        event: "change",
        handler: (e) => {
          this.visual = e.target.checked;
          this.cache.set("visual", this.visual);
          this.updateDiapers();
        }
      },
      "#abcl-wet input": {
        event: "change",
        handler: (e) => {
          this.wet.enabled = e.target.checked;
        }
      },
      "#abcl-mess input": {
        event: "change",
        handler: (e) => {
          this.mess.enabled = e.target.checked;
        }
      },
      "#abcl-clothing-accidents input": {
        event: "change",
        handler: (e) => {
          this.accidents = e.target.checked;
          this.cache.set("accidents", this.accidents);
        }
      },
      "#abcl-mess-wet-chance input": {
        event: "change",
        handler: (e) => {
          const value = +e.target.value / 100;
          this.wet.base = value;
          this.mess.base = 1 - value;
        }
      },
      "#abcl-message-type select": {
        event: "change",
        handler: (e) => {
          this.messageType = e.target.value;
          this.cache.set("messageType", this.messageType);
        }
      },
      "#abcl-timer-duration input": {
        event: "change",
        handler: (e) => {
          this.timer = +e.target.value;
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
};
function assertQuerySelector(selector) {
  const el = document.querySelector(selector);
  if (!el) throw new Error(`Failed to find element for selector ${selector}`);
  return el;
}
ABCLLoginDoLogin();
ABCLCharacterAppearanceSetItem();
ABCLTextGet();
ABCLDrawButton();
if (CurrentScreen && CurrentScreen != "Login" && globalThis.Abcl == null) {
  globalThis.Abcl = new ABCL();
  abcl = globalThis.Abcl;
  globalThis.Abcl.setupSettings();
}
async function ABCLLoginDoLogin() {
  modAPI.hookFunction(
    "LoginDoLogin",
    1,
    (args, next) => {
      next(args);
      setTimeout(() => {
        if (globalThis.Abcl == null) {
          globalThis.Abcl = new ABCL();
          abcl = globalThis.Abcl;
          globalThis.Abcl.setupSettings();
        }
      }, 1e3);
    }
  );
}
async function ABCLCharacterAppearanceSetItem() {
  modAPI.hookFunction("CharacterAppearanceSetItem", 2, (args, next) => {
    let [_character, slot, _asset] = args;
    if (abcl) {
      if (slot == "ItemPelvis" || slot == "Panties") {
        abcl.updateDiapers(false);
      }
    }
    return next(args);
  });
}
async function ABCLTextGet() {
  modAPI.hookFunction("TextGet", 2, (args, next) => {
    if (args[0] == "HomepageAbcl") return "ABCL";
    else return next(args);
  });
}
async function ABCLDrawButton() {
  modAPI.hookFunction("DrawButton", 2, (args, next) => {
    if (args[6] == "Icons/Abcl.png") args[6] = runtime + "images/abcl.png";
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
  Description: "Type /abcl help for a list of commands.",
  Action: (args) => {
    let [command, ...input] = args.split(/[ ,]+/);
    let identifier = input[0];
    if (!abcl) {
      return;
    }
    switch (command) {
      case "help":
      case "":
        ChatRoomSendLocal(
          "<p style='background-color:#ecc826'><b>ABCL</b>: Welcome to Adult Baby Club Lover! Where we make sure babies use their diapers!\n \n<b>/abcl tick</b> to force a tick\n<b>/abcl stats</b> to see your current diaper stats\n<b>/abcl help</b> to see this message\n \nTo get new clean diapers:\n<b>/abcl change</b> to change your diaper\n<b>/abcl change (target)</b> to change someone else's diaper\n \nIf you have any issues or suggestions then please join https://discord.gg/V9rNpRQqtZ</p>"
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
        ChatRoomSendLocal(`<p style='background-color:#ecc826'>ABCL: ${Player.Nickname == "" ? Player.Name : Player.Nickname} squeezes ${Pronoun.get("dependent", Player)} abdomen trying to get it all out. (only you can see this).</p>`);
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
          let player = GetPlayer(identifier);
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
var ABCLPermissions = class {
  abcl;
  trusted;
  constructor(abcl2) {
    this.trusted = [];
    this.abcl = abcl2;
    Messager.addBeepListener(
      "getTrusted",
      (json, sender) => {
        const msg = JSON.parse(json);
        const response = msg.content;
        if (!response?.method || response.method !== "getTrusted") {
          return;
        }
        const isTrusted = sender != null && this.trusted.includes(sender);
        Messager.send({ "isTrusted": isTrusted, "id": msg.id }, sender, "HiddenBeep");
      }
    );
    Messager.addBeepListener(
      "addTrusted",
      (json, sender) => {
        const msg = JSON.parse(json);
        const response = msg.content;
        if (!response?.method || response.method !== "addTrusted") {
          return;
        }
        if (!sender) {
          return;
        }
        if (false) {
          Messager.send({ "success": false, "id": msg.id }, sender, "HiddenBeep");
          return;
        }
        this.trusted.push(sender);
        Messager.send({ "success": true, "id": msg.id }, sender, "HiddenBeep");
      }
    );
  }
  async getTrusted(MemberNumber) {
    try {
      const promise = Messager.request({ "method": "getTrusted" }, MemberNumber, "HiddenBeep");
      const response = await promise;
      if (response && typeof response.isTrusted === "boolean") {
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
  async addTrusted(MemberNumber) {
    try {
      const promise = Messager.request({ "method": "addTrusted" }, MemberNumber, "HiddenBeep");
      const response = await promise;
      return response.success;
    } catch (error) {
      console.error("Error in addTrusted:", error);
      return false;
    }
  }
};
export {
  modAPI
};
