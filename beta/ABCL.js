"use strict";
(() => {
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

  // data/abcl.css
  var abcl_default = '.abcl-navbar {\r\n	overflow: auto;\r\n	white-space: nowrap;\r\n	padding: 0;\r\n	margin: 0;\r\n	position: relative;\r\n}\r\n.abcl-navbar li {\r\n	display: inline-block;\r\n	text-align: center;\r\n	text-decoration: none;\r\n}\r\n.abcl-navbar button {\r\n	padding: 12px;\r\n	border-top-left-radius: 6px;\r\n	border-top-right-radius: 6px;\r\n	border: 1px black solid;\r\n	border-bottom: 0;\r\n}\r\n.abcl-navbar button:disabled {\r\n	background: white;\r\n}\r\n#abcl {\r\n	aspect-ratio: auto 2000 / 1000;\r\n  	height: 100%;\r\n  	margin: auto;\r\n	max-width: 100%;\r\n}\r\n#abcl .page {\r\n	border: 1px solid #000;\r\n	width: calc(100% - 60px);\r\n	position: relative;\r\n\r\n	font-family: sans-serif;\r\n	padding: 30px;\r\n}\r\n\r\n#page-abcl-1:not(.hidden) {\r\n	display: grid;\r\n	grid-template-rows: 1fr 1fr 1fr;\r\n	grid-template-columns:repeat(6, min-content);\r\n	gap: 25px;\r\n	background-color: rgb(240, 240, 240);\r\n	width: unset;\r\n    height: 100%;\r\n}\r\n.tooltip {\r\n	position: relative;\r\n}\r\n#abcl label, #abcl button {\r\n	display: block;\r\n	text-align: center;\r\n}\r\n#abcl input {\r\n	position: relative;\r\n	left:50%;\r\n	transform:translateX(-50%)\r\n}\r\n#abcl-mess {grid-area: a;}\r\n#abcl-visual {grid-area: b;}\r\n#abcl-wet {grid-area: c;}\r\n#abcl-mess-wet-chance {grid-area: d;\r\n	width: 95%;\r\n	margin: auto;\r\n}\r\n\r\n#abcl-clothing-accidents {grid-area: e;}\r\n#abcl-automatic-accidents {grid-area: f;}\r\n#abcl-timer-duration {grid-area: g;}\r\n#wettings-messes-category {\r\n	display: grid;\r\n\r\n\r\n	grid-template-areas: \r\n		"a b c"\r\n		"d d d"\r\n		"e e e"\r\n		"f g .";\r\n	width: 250px;\r\n	grid-template-columns: 1fr 1fr 1fr;\r\n	\r\n}\r\n.settings-category {\r\n	background-color: gainsboro;\r\n	box-shadow: 0 0 5px 1px #c7c7c7 inset;\r\n	border-radius: 2px;\r\n	width: fit-content;\r\n	padding: 10px;\r\n}\r\n.abcl-exit-button {\r\n    background-image: url("Icons/Exit.png");\r\n    aspect-ratio: 1;\r\n    width: 6vw;\r\n    background-repeat: no-repeat;\r\n    background-position: center;\r\n    background-size: 5vw;\r\n    }\r\n#abcl-exit {\r\n	position: absolute;\r\n	top: 30px;\r\n	right: 30px;\r\n}\r\n.tooltip-down:before, .tooltip-down::after {\r\n	transform:  translateX(-50%) translateY(50%) scale(var(--scale)) !important;\r\n}\r\n.tooltip:before, .tooltip::after {\r\n	--scale: 0;\r\n	font-size: 17px;\r\n	content: attr(data-tooltip);\r\n	top: -0.25rem;\r\n	color: #000000;\r\n	padding: 0.5rem;\r\n	left: 50%;\r\n	background-color: #ffffff;\r\n	border: #000 1px solid;\r\n	border-radius: 5px;\r\n	position: absolute;\r\n	width: 100px;\r\n	transform:  translateX(-50%) translateY(-100%) scale(var(--scale));\r\n	box-shadow: 0px 2px 3px rgba(0,0,0,30%);\r\n	transition: transform 0.05s;\r\n	z-index: 100;\r\n	pointer-events: none;\r\n}\r\n.tooltip:hover:before, .tooltip:hover::after {\r\n	--scale: 1;\r\n}\r\n\r\n\r\n#abcl input[type="number"]:focus {\r\n	outline: none;\r\n}\r\n#abcl input[type="number"]::-webkit-inner-spin-button {\r\n	-webkit-appearance: none;\r\n}\r\n.ABCLstyle-interactable {\r\n	background-color: rgb(238, 238, 238);\r\n	border: rgb(175, 175, 175) 1px solid;\r\n	text-align: center;\r\n	margin: auto;\r\n	padding: 3px;\r\n	border-radius: 1px;\r\n}\r\n\r\ninput.ABCLstyle-interactable[type="checkbox"] {\r\n	width: 20px !important;\r\n	height: 20px !important;\r\n  }\r\n.ABCLstyle-interactable option {\r\n	text-align: center;\r\n}\r\n\r\n\r\n\r\n.hidden {\r\n	display: none !important;\r\n}\r\n';

  // data/settings.html
  var settings_default = `<!-- <head>-->\r
<!--    <link href="./abcl.css" rel="stylesheet">-->\r
    \r
<!--</head> -->\r
\r
<div id="abcl" class="hidden">\r
    <ol class="abcl-navbar">\r
        <li class="tab" id="page-abcl-1-tab" >\r
            <button disabled="" onclick="showPageById('page-abcl-1')">\r
            Your settings\r
        </button></li>\r
        <li class="tab" id="page-abcl-2-tab"><button onclick="showPageById('page-abcl-2')">\r
            Other's settings    \r
        </button></li>\r
    </ol>\r
<div id="page-abcl-1" class="page">\r
    <div id="wettings-messes-category" class="settings-category"> <!-- All mess/wet related --> \r
        \r
        <p class="setting tooltip tooltip-down" id="abcl-mess" data-tooltip="If checked, mess accidents will happen.">\r
            <label for="mess-checkbox">Messes</label>\r
            <input type="checkbox" id="mess-checkbox" class="ABCLstyle-interactable" checked> \r
        </p>\r
        \r
        <p class="setting tooltip tooltip-down" id="abcl-visuals" data-tooltip="Controls if accidents are visible on the character.">\r
            <label for="visuals-checkbox">Visuals</label>\r
            <input type="checkbox" id="visuals-checkbox" class="ABCLstyle-interactable" checked>\r
        </p>\r
        \r
        <p class="setting tooltip tooltip-down" id="abcl-wet" data-tooltip="If checked, wet accidents will happen.">\r
            <label for="wet-checkbox">Wets</label>\r
            <input type="checkbox" id="wet-checkbox" class="ABCLstyle-interactable" checked>\r
        </p>\r
        \r
        <p class="setting tooltip tooltip-down" id="abcl-mess-wet-chance" data-tooltip="The chance of a mess accident happening instead of a wet accident.">\r
            <label for="mess-wet-range">Mess vs Wet</label>\r
            <input type="range" id="mess-wet-range" min="0" max="100" value="66">\r
        </p>\r
        \r
        <p class="setting tooltip" id="abcl-clothing-accidents" data-tooltip="Accidents that happen without the diaper.">\r
            <label for="clothing-accidents-checkbox">Clothing-Accidents</label>\r
            <input type="checkbox" id="clothing-accidents-checkbox" class="ABCLstyle-interactable" checked>\r
        </p>\r
        \r
        <p class="setting tooltip" id="abcl-leaks" data-tooltip="Leakage that happen when the diaper is full.">\r
            <label for="leaks-checkbox">Leaks</label>\r
            <input type="checkbox" id="leaks-checkbox" class="ABCLstyle-interactable" checked>\r
        </p>\r
        \r
        <p class="setting tooltip" id="abcl-timer-enabled" data-tooltip="If checked, accidents will happen automatically by the timer.">\r
            <label for="timer-enabled-checkbox">Timer enabled</label>\r
            <input type="checkbox" id="timer-enabled-checkbox" class="ABCLstyle-interactable" checked>\r
        </p>\r
\r
        <p class="setting tooltip" id="abcl-timer-duration" data-tooltip="The time between automatic accidents.">\r
            <label>Timer duration</label>\r
            <input type="number" value="30" min="15" max="420"><span>minutes</span>\r
        </p>\r
    </div>\r
    <div class="settings-category">\r
        <p class="setting" id="abcl-message-type">\r
            <label>Message style:</label>\r
            <select class="ABCLstyle-interactable" id="abcl-message-type">\r
                <option value="default">Normal</option>\r
                <option value="internalMonologue">Internal Monologue</option>\r
                <option value="embarrassment">Embarressment</option>\r
            </select>\r
        </p>\r
    </div>\r
    <div class="settings-category">  \r
    <button id="abcl-reset-button" onclick="document.getElementById('reset-confirm-abcl').showModal()">Reset data</button>\r
    </div>\r
    <button class="abcl-exit-button" id="abcl-exit" onclick="PreferenceSubscreenExtensionsClear(); document.querySelector('#abcl').classList.add('hidden')"></button>\r
\r
</div>\r
<div id="page-abcl-2" class="page"></div>\r
<dialog id="reset-confirm-abcl">\r
    <p>Are you sure you want to reset all ABCL data?</p>\r
    <button onclick="Abcl.reset()">Yes</button>\r
    <button onclick="document.getElementById('reset-confirm-abcl').close()">No</button>\r
</dialog>\r
</div>\r
`;

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
  function isJsonParsable(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  modApi.hookFunction("ServerAccountBeep", 10, (args, next) => {
    let data = args[0];
    if (data.BeepType == "Leash" && !!data.Message && isJsonParsable(data.Message)) {
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

  // src/modules/stats.ts
  function getRegressionItems(items = Player.Appearance) {
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
  function getRegressionIncreese() {
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
    for (let item of getRegressionItems()) {
      for (let key in ABCLdata.CraftingModifiers.regression) {
        total += item?.Craft?.Description?.includes(key) ? ABCLdata.CraftingModifiers.regression[key] : 0;
      }
    }
    return total;
  }
  function getDesperationLevel() {
    let total = modStorage.settings.desperationLevel;
    for (let item of getRegressionItems()) {
      for (let key in ABCLdata.CraftingModifiers.desperation) {
        total += item?.Craft?.Description?.includes(key) ? ABCLdata.CraftingModifiers.regression[key] : 0;
      }
    }
    ;
    return total;
  }
  function desperationTick() {
    let total = modStorage.settings.desperationLevel;
    if (isMilk()) {
      total = 3;
    }
    if (!isMilk()) {
      total = total != 0 ? total - 1 : 0;
    }
    return total;
  }

  // src/modules/utils.ts
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function waitFor(func, cancelFunc = () => false) {
    while (!func()) {
      if (cancelFunc()) {
        return false;
      }
      await sleep(10);
    }
    return true;
  }
  function chatSendABCLMessage(msg, _data = void 0, targetNumber = void 0) {
    const data = {
      Content: "abclMsg",
      Dictionary: {
        //@ts-ignore
        msg
      },
      Type: "Hidden"
    };
    if (_data) data.Dictionary.data = _data;
    if (targetNumber) data.Target = targetNumber;
    ServerSend("ChatRoomChat", data);
  }
  function getPlayer(value) {
    if (!value) return;
    return ChatRoomCharacter.find((Character) => {
      return Character.MemberNumber == value || Character.Name.toLowerCase() === value || Character.Nickname?.toLowerCase() === value;
    });
  }
  function isVersionNewer(version1, version2) {
    const v1Parts = version1.split(".");
    const v2Parts = version2.split(".");
    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      const v1Part = parseInt(v1Parts[i] || "0", 10);
      const v2Part = parseInt(v2Parts[i] || "0", 10);
      if (v1Part > v2Part) {
        return true;
      } else if (v1Part < v2Part) {
        return false;
      }
    }
    return false;
  }
  function getTime() {
    const regressionLevel = modSession.settings.regressionLevel;
    const desperationLevel = getDesperationLevel();
    const modifier = Math.max(1, Math.pow(1.02, regressionLevel) * (desperationLevel + 1));
    const currentTime = Date.now();
    const accidentTime = modSession.settings.lastAccident + modSession.settings.timerDuration * 60 / modifier;
    const deltaMilliseconds = accidentTime - currentTime;
    const deltaSeconds = Math.max(0, Math.floor(deltaMilliseconds / 1e3));
    return Math.max(0, Math.floor(deltaSeconds));
  }
  function isMilk() {
    let items = Player.Appearance;
    for (let item of items) {
      if (item.Asset.Description.toLowerCase().includes("milk")) {
        return true;
      }
    }
    return false;
  }
  function applyColorToItems(items, color, transparency = 0.2) {
    for (let item of items) {
      if (!item.Color) continue;
      if (typeof item.Color === "string") {
        item.Color = AverageColor(item.Color, color, transparency);
      } else {
        for (let index = 0; index < item.Color.length; index++) {
          item.Color[index] = AverageColor(item.Color[index], color, 0.2);
        }
      }
    }
  }
  function nextDiaperAction() {
    const chanceForNothing = 0.1;
    const total = modSession.settings.messChance + modSession.settings.wetChance + chanceForNothing;
    const messChance = modSession.settings.messChance / total * +modSession.settings.messing;
    const wetChance = modSession.settings.wetChance / total * +modSession.settings.wetting;
    const weightedArray = [
      ...Array(Math.round(messChance * 100)).fill("messes"),
      ...Array(Math.round(wetChance * 100)).fill("wettings"),
      ...Array(Math.round(chanceForNothing * 100)).fill("nothing")
    ];
    const result = weightedArray[RandomInt(0, weightedArray.length - 1)];
    return { result, mess: messChance, wet: wetChance, nothing: chanceForNothing };
  }
  function ABCLsetSetting(key, value) {
    modSession.settings[key] = value;
  }
  function ABCLgetSetting(key) {
    return modSession.settings[key];
  }
  globalThis.ABCLsetSetting = ABCLsetSetting;
  globalThis.ABCLgetSetting = ABCLgetSetting;

  // src/modules/bcModSdk.ts
  var import_bondage_club_mod_sdk = __toESM(require_bcmodsdk());
  var modSdk = import_bondage_club_mod_sdk.default.registerMod({
    name: "ABCL",
    fullName: "Adult Baby Club Lover",
    version: getModVersion(),
    repository: "https://github.com/zoe-64/ABCL"
  });
  function hookFunction(functionName, priority, hook) {
    return modSdk.hookFunction(functionName, priority, hook);
  }

  // data/stats.html
  var stats_default = `<style>\r
	:root {\r
		--abcl-border: 1px solid #341446;\r
		--abcl-background: #e9d94f;\r
		--abcl-color: #aa882a;\r
		\r
	}\r
	.mess-text {\r
		color: #873e23;\r
		-webkit-text-stroke: 0.5px black;\r
		-webkit-text-fill-color: #873e23;\r
	}\r
	.wet-text {\r
		color: #f0f338;\r
		-webkit-text-stroke: 0.5px black;\r
		-webkit-text-fill-color: #f0f338\r
	}\r
	.stats-box {\r
		background-color: #e9d94f;\r
		border: 1px solid var(--abcl-color);\r
		font-family: 'Arial';\r
		margin: -50px 0px 0 -13px;\r
		color: var(--abcl-color);\r
		font-size: 110%;\r
		display: grid;\r
		grid-template-rows: 1fr;\r
		width: 102%\r
	}\r
	.stats-box h1{\r
		margin: 0;\r
		width: 100%;\r
		border-bottom: #fff1d2 2px solid;\r
		text-align: center;\r
		padding: 8px 0px 4px 0;\r
		font-size: 200%;\r
\r
		background-color: var(--abcl-background);\r
		margin-bottom: 5px;\r
	}\r
	.stats-box p{\r
		padding: 2px 10px;\r
		margin: 3px 0;\r
	}\r
	.timerBar {\r
		width: 100%;\r
		height: 40px;\r
		background-color: #ecc826;\r
		display: flex;\r
		border-top: 2px solid #fff1d2;\r
	}\r
	.timerBar .bar {\r
		width: 50%;\r
		height: 100%;\r
		background-color: #ffdd46;\r
		margin: 0;\r
		position: relative;\r
		float: left;\r
	}\r
	.timerBar div:not(.bar) {\r
		color : #b87e27;\r
		font-weight: bold;\r
		position: absolute;\r
		justify-self: center;\r
		align-self: center;\r
		width: 100%;\r
		font-size: 70% ; \r
		text-align: center;\r
	}\r
</style>\r
<section class="stats-box">\r
<h1>STATS</h1>\r
<p>Desperation For Milk: <span class="desperationBase desperation-text"></span></p>\r
<p>Regression: <span class="regressionbase regression-text"></span>, adds: <span class="regressionModifier regression-text"></span> next tick</p>\r
<p>Wet Chance: <span class="wetChance"></span></p>\r
<p>Mess Chance: <span class="messChance"></span></p>\r
<p>Capacity: <span class="wetCount wet-text"></span> + <span class="messCount mess-text"></span>/<span class="absorbancyTotal absorbancy-text"></span>ml</p>\r
<div class="timerBar">\r
	<div class="bar"></div>\r
	<div><span class="tickMinutes time-text"></span> Minutes and <span class="tickSeconds time-text"></span> seconds till next accident</div>\r
</section>`;

  // src/modules/data.ts
  var DiaperUseLevels = {
    "clean": "#8F8F8F",
    "middlewet": "#ffe58b",
    "maximumwet": "#ffd33e",
    "middlemess": "#423019",
    "maximummess": "#3C302C",
    "selfwet": "#242103",
    "selfmess": "#1f170d"
  };
  var templates = {
    stats: stats_default,
    settings: settings_default
  };

  // src/modules/message.ts
  function loadMessages() {
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
    Messager.addListener(ABCLMessagerListener, -5, "ABCL Message Processor");
  }
  function ABCLMessagerListener(response) {
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
            changeDiaper(Player, GetName(Player));
          }
        }
        let player = GetPlayer(content.MemberNumber);
        let responder = GetPlayer(response.Sender);
        if (player) {
          changeDiaper(player, GetName(responder));
        }
      }
    }
    return false;
  }
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
  function sendMessage(variant) {
    SentenceBuilder.target = Player;
    let message = SentenceBuilder.prompt(ABCLdata.messages[modSession.settings.messageType][variant], Player);
    if (modSession.settings.messageType == "internalMonologue") {
      Messager.send(message, Player.MemberNumber, "LocalMessage");
    } else {
      Messager.send(message, void 0, "Action");
    }
  }

  // src/modules/diaper.ts
  function itemToSavedItem(item) {
    return {
      Asset: {
        Name: item.Asset.Name,
        DynamicGroupName: item.Asset.DynamicGroupName,
        Description: item.Asset.Description
      },
      Color: item.Color,
      Craft: item.Craft,
      Property: item.Property
    };
  }
  function diaperToSavedDiaper(diaper) {
    return {
      Messes: diaper.messes,
      Wettings: diaper.wettings,
      Layer: diaper.layer,
      SavedItem: itemToSavedItem(diaper.item)
    };
  }
  function savedDiaperToDiaper(savedDiaper) {
    let diaper = null;
    if (savedDiaper.Layer == 0) {
      diaper = new Diaper(replaceSlotWithSavedItem("Panties", savedDiaper.SavedItem, false));
      diaper.wettings = savedDiaper.Wettings;
      diaper.messes = savedDiaper.Messes;
    }
    if (savedDiaper.Layer == 1) {
      diaper = new Diaper(replaceSlotWithSavedItem("ItemPelvis", savedDiaper.SavedItem, false));
      diaper.wettings = savedDiaper.Wettings;
      diaper.messes = savedDiaper.Messes;
    }
    if (!diaper) return null;
    updateDiaper();
    ServerPlayerInventorySync();
    return diaper;
  }
  function compareItemToSavedItem(item, savedItem) {
    return item.Asset.Name === savedItem.Asset.Name && JSON.stringify(item.Color) === JSON.stringify(savedItem.Color) && JSON.stringify(item.Craft) === JSON.stringify(savedItem.Craft) && JSON.stringify(item.Property) === JSON.stringify(savedItem.Property);
  }
  function replaceSlotWithSavedItem(slot, savedItem, push = true) {
    const item = InventoryGet(Player, slot);
    if (item && compareItemToSavedItem(item, savedItem)) return item;
    if (item) InventoryRemove(Player, slot, false);
    InventoryWear(Player, savedItem.Asset.Name, slot, savedItem.Color, 10, Player.MemberNumber, savedItem.Craft, false);
    const newItem = InventoryGet(Player, slot);
    if (savedItem.Property && savedItem.Property.hasOwnProperty("LockedBy")) {
      const lockName = savedItem.Property["LockedBy"];
      const asset = lockName ? AssetGet(Player.AssetFamily, "ItemMisc", lockName) : null;
      console.log("new lock");
      if (asset) {
        InventoryLock(Player, slot, { Asset: asset }, savedItem.Property.LockMemberNumber);
      }
    }
    console.log(newItem, savedItem);
    if (push) ServerPlayerInventorySync();
    return newItem;
  }
  function loadDiaperLayers() {
    hookFunction("CharacterAppearanceSetItem", 2, (args, next) => {
      let [_character, slot, _asset] = args;
      const action = next(args);
      if (slot == "ItemPelvis" || slot == "Panties") {
        updateDiaper(false);
      }
      return action;
    });
    hookFunction("InventoryRemove", 2, (args, next) => {
      let [_character, slot] = args;
      const action = next(args);
      if (slot == "ItemPelvis" || slot == "Panties") {
        updateDiaper(false);
      }
      return action;
    });
    hookFunction("InventoryLock", 2, (args, next) => {
      let [_C, _Item, _Lock, _MemberNumber] = args;
      const action = next(args);
      if (typeof _Item === "string") _Item = InventoryGet(_C, _Item);
      if (Diaper.isDiaper(_Item) && modSession["topLayer"]?.item) {
        modSession["topLayer"].item = _Item;
      }
      return action;
    });
    hookFunction("InventoryUnlock", 2, (args, next) => {
      let [_C, _Item] = args;
      const action = next(args);
      if (typeof _Item === "string") _Item = InventoryGet(_C, _Item);
      if (_Item && _Item.Property && _Item.Property.Effect) {
        if (Diaper.isDiaper(_Item) && modSession["topLayer"]?.item) {
          modSession["topLayer"].item = _Item;
        }
      }
      return action;
    });
  }
  var Diaper = class _Diaper {
    item;
    wettings;
    messes;
    layer;
    constructor(item) {
      this.item = item;
      this.layer = item.Asset.DynamicGroupName == "Panties" ? 0 : 1;
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
      let item = InventoryGet(Player, this.layer == 0 ? "Panties" : "ItemPelvis");
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
      let messyColor = DiaperUseLevels["clean"];
      let wetColor = DiaperUseLevels["clean"];
      const messyLevel = this.messes / this.absorbancy;
      const wetLevel = this.wettings / this.absorbancy;
      messyColor = getColor(messyLevel, "maximummess", "middlemess", "clean");
      wetColor = getColor(wetLevel, "maximumwet", "middlewet", "clean");
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
  function updateDiaper(refresh = true) {
    if (!modSession.bottomLayer || modSession.bottomLayer.isReplaced()) {
      const item = InventoryGet(Player, "Panties");
      if (item && Diaper.isDiaper(item)) {
        modSession.bottomLayer = new Diaper(item);
      } else {
        modSession.bottomLayer = null;
      }
    }
    if (!modSession.topLayer || modSession.topLayer.isReplaced()) {
      const item = InventoryGet(Player, "ItemPelvis");
      if (item && Diaper.isDiaper(item)) {
        modSession.topLayer = new Diaper(item);
      } else {
        modSession.topLayer = null;
      }
    }
    if (!modStorage.settings.enabled || !modStorage.settings.visuals) {
      return;
    }
    const topItem = InventoryGet(Player, "ItemPelvis");
    if (modSession.topLayer && topItem) {
      modSession.topLayer.item.Color = modSession.topLayer.getColor();
      topItem.Color = modSession.topLayer.item.Color;
    }
    const bottomItem = InventoryGet(Player, "Panties");
    if (modSession.bottomLayer && bottomItem) {
      modSession.bottomLayer.item.Color = modSession.bottomLayer.getColor();
      bottomItem.Color = modSession.bottomLayer.item.Color;
    }
    if (refresh) {
      CharacterRefresh(Player, true);
      ChatRoomCharacterUpdate(Player);
    }
  }
  function changeDiaper(player, by = "self") {
    if (player != Player && player != null) {
      Messager.send({ "Action": "ChangeDiaper", "MemberNumber": player.MemberNumber }, player.MemberNumber, "Hidden");
      return;
    }
    modSession.topLayer?.change();
    modSession.bottomLayer?.change();
    updateDiaper();
    if (by != "self") {
      SentenceBuilder.data["\xA7by-player\xA7"] = { "neutral": [by] };
      sendMessage("changeBy");
    } else {
      SentenceBuilder.data["\xA7by-player\xA7"] = { "neutral": [GetName(Player)] };
      sendMessage("changeSelf");
    }
    SentenceBuilder.data["\xA7by-player\xA7"] = { "neutral": [Pronoun.get("Reflexive", Player)] };
  }
  function releaseInClothes(action = null) {
    if (!modSession.settings.enabled || !modSession.settings.intentionalLeaks) {
      return;
    }
    if (action == null) {
      action = nextDiaperAction()["result"];
      if (action == "nothing") return;
    }
    let result = "selfmess";
    if (action == "messes") {
      result = "selfmess";
    }
    if (action == "wettings") {
      result = "selfwet";
    }
    sendMessage(result);
    if (!modSession.settings.visuals) return;
    let itemsBelow = [];
    itemsBelow.push(
      ...["Shoes", "Socks", "Panties", "ItemPelvis", "ItemBoots", "Garters", "RightAnklet", "LeftAnklet", "SuitLower", "ClothLower"].map((slot) => InventoryGet(Player, slot))
    );
    itemsBelow = itemsBelow.filter((item) => item != null);
    applyColorToItems(itemsBelow, DiaperUseLevels[result], 0.1);
    updateDiaper();
  }
  function releaseInDiaper() {
    const { result } = nextDiaperAction();
    if (result === "nothing") return;
    const layers = [modSession.bottomLayer, modSession.topLayer];
    let absorbancy = 0;
    let total = 0;
    for (const layer of layers) {
      if (layer && layer.wettings + layer.messes < layer.absorbancy) {
        layer[result] += 1;
      }
      if (layer) {
        absorbancy += layer.absorbancy;
        total += layer.messes + layer.wettings;
      }
    }
    modSession.settings.regressionLevel += getRegressionIncreese();
    let message = { "messes": "mess", "wettings": "wet" }[result];
    if (total === absorbancy) {
      message = "fully" + message;
    } else if (absorbancy < total) {
      message = "immergency";
    }
    sendMessage(message);
    updateDiaper();
  }

  // src/modules/storage.ts
  var modStorage;
  var modSession = {
    settings: {
      enabled: true,
      visuals: true,
      wetting: true,
      messing: true,
      intentionalLeaks: false,
      accidentalLeaks: false,
      messChance: 0.3,
      wetChance: 0.5,
      messageType: "internalMonologue",
      timerEnabled: true,
      timerDuration: 30 * 60 * 60,
      lastAccident: Date.now() / 1e3,
      regressionLevel: 0,
      desperationLevel: 0
    }
  };
  var modStorageSaveString;
  function initStorage() {
    const data = {
      settings: {
        enabled: true,
        visuals: true,
        wetting: true,
        messing: true,
        intentionalLeaks: false,
        accidentalLeaks: false,
        messChance: 0.3,
        wetChance: 0.5,
        messageType: "internalMonologue",
        timerEnabled: true,
        timerDuration: 30 * 60 * 60,
        lastAccident: Date.now() / 1e3,
        regressionLevel: 0,
        desperationLevel: 0
      },
      version: getModVersion()
    };
    const storage = Player.ExtensionSettings.ABCL;
    if (typeof storage === "string") {
      const decompressed = LZString.decompressFromBase64(storage);
      modStorage = decompressed ? JSON.parse(decompressed) : data;
    } else {
      modStorage = data;
    }
    Object.keys(data).forEach((key) => {
      if (modStorage[key] === void 0) {
        modStorage[key] = data[key];
      }
    });
    deserializeStorage();
    modStorageSaveString = JSON.stringify(modStorage);
    chatSendABCLMessage("syncStorage", {
      storage: modStorage
    });
    hookFunction("ChatRoomMessage", 20, (args, next) => {
      const message = args[0];
      const sender = getPlayer(message.Sender);
      if (!sender) return next(args);
      if (message.Content === "abclmsg" && !sender.IsPlayer()) {
        const msg = message.Dictionary.msg;
        const data2 = message.Dictionary.data;
        if (msg === "syncStorage") {
          if (!sender.ABCL) {
            chatSendABCLMessage("syncStorage", {
              storage: modStorage
            }, sender.MemberNumber);
          }
          sender.ABCL = data2.storage;
        }
      }
      next(args);
    });
    hookFunction("ChatRoomSync", -20, (args, next) => {
      next(args);
      chatSendABCLMessage("syncStorage", {
        storage: modStorage
      });
    });
  }
  function deserializeStorage() {
    if (modStorage.topLayer) {
      modSession.topLayer = savedDiaperToDiaper(modStorage.topLayer);
    }
    if (modStorage.bottomLayer) {
      modSession.bottomLayer = savedDiaperToDiaper(modStorage.bottomLayer);
    }
    modSession.settings = modStorage.settings;
  }
  function serializeStorage() {
    if (modSession.topLayer) {
      modStorage.topLayer = diaperToSavedDiaper(modSession.topLayer);
    } else {
      modStorage.topLayer = null;
    }
    if (modSession.bottomLayer) {
      modStorage.bottomLayer = diaperToSavedDiaper(modSession.bottomLayer);
    } else {
      modStorage.bottomLayer = null;
    }
    modStorage.settings = modSession.settings;
  }
  function updateModStorage() {
    if (typeof modStorage !== "object") return;
    serializeStorage();
    if (JSON.stringify(modStorage) === modStorageSaveString) return;
    modStorageSaveString = JSON.stringify(modStorage);
    Player.ExtensionSettings.ABCL = LZString.compressToBase64(JSON.stringify(modStorage));
    ServerPlayerExtensionSettingsSync("ABCL");
    chatSendABCLMessage("syncStorage", {
      storage: modStorage
    });
  }
  setInterval(updateModStorage, 800);

  // images/abcl.png
  var abcl_default2 = "data:image/png;base64,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";

  // src/modules/settingsMenu.ts
  function loadSettingsMenu() {
    initializeSettings();
    PreferenceRegisterExtensionSetting({
      Identifier: "ABCL",
      ButtonText: "ABCL Settings",
      Image: abcl_default2,
      click: () => {
      },
      run: () => {
      },
      exit: () => {
        document.querySelector("#abcl")?.classList.add("hidden");
      },
      load: () => {
        document.querySelector("#abcl")?.classList.remove("hidden");
      }
    });
  }
  function initializeSettings() {
    const settings = [
      { id: "#abcl-mess input", key: "messing", type: "checkbox" },
      { id: "#abcl-visuals input", key: "visuals", type: "checkbox" },
      { id: "#abcl-wet input", key: "wetting", type: "checkbox" },
      { id: "#abcl-mess-wet-chance input", key: "messChance", type: "range" },
      { id: "#abcl-clothing-accidents input", key: "intentionalLeaks", type: "checkbox" },
      { id: "#abcl-leaks input", key: "accidentalLeaks", type: "checkbox" },
      { id: "#abcl-timer-enabled input", key: "timerEnabled", type: "checkbox" },
      { id: "#abcl-timer-duration input", key: "timerDuration", type: "number" },
      { id: "#abcl-message-type select", key: "messageType", type: "text" }
    ];
    settings.forEach((setting) => {
      const element = document.querySelector(setting.id);
      if (element) {
        const value = ABCLgetSetting(setting.key);
        if (setting.type === "checkbox") {
          element.checked = value;
        } else if (setting.id == "#abcl-timer-duration input") {
          element.value = Number(value) / (60 * 30);
        } else if (setting.type === "range" || setting.type === "number" || setting.type === "text") {
          element.value = value;
        }
        element.addEventListener("change", function() {
          let newValue;
          if (setting.id == "#abcl-mess-wet-chance input") {
            updateMessWetChance(Number(this.value));
            return;
          }
          if (setting.type === "checkbox") {
            newValue = this.checked;
          } else if (setting.id == "#abcl-timer-duration input") {
            newValue = Number(this.value * (60 * 30));
          } else if (setting.type === "range" || setting.type === "number") {
            newValue = Number(this.value);
          } else if (setting.type === "text") {
            newValue = this.value;
          }
          ABCLsetSetting(setting.key, newValue);
        });
      }
    });
  }
  function updateMessWetChance(value) {
    const messChance = 1 - value / 100;
    const wetChance = value / 100;
    ABCLsetSetting("wetChance", wetChance);
    ABCLsetSetting("messChance", messChance);
  }

  // src/modules/commands.ts
  var commands = [
    {
      name: "help",
      description: "Open ABCL help menu",
      action: () => {
        ChatRoomSendLocal(
          "<p style='background-color:#ecc826'><b>ABCL</b>: Welcome to Adult Baby Club Lover! Where we make sure babies use their diapers!\n \n<b>/abcl tick</b> to force a tick\n<b>/abcl stats</b> to see your current diaper stats\n<b>/abcl help</b> to see this message\n \nTo get new clean diapers:\n<b>/abcl change</b> to change your diaper\n<b>/abcl change (target)</b> to change someone else's diaper\n \nIf you have any issues or suggestions then please join https://discord.gg/V9rNpRQqtZ</p>"
        );
      }
    },
    {
      name: "stats",
      description: "Displays ABCL info",
      action: () => {
        ChatRoomSendLocal(templates.stats);
      }
    },
    {
      name: "tick",
      description: "Jumps forward to the next accident",
      action: () => {
        if (modSession.topLayer || modSession.bottomLayer) {
          releaseInDiaper();
        } else {
          releaseInClothes();
          modSession.settings.regressionLevel += getRegressionIncreese();
          desperationTick();
        }
        ChatRoomSendLocal(`<p style='background-color:#ecc826'>ABCL: ${Player.Nickname == "" ? Player.Name : Player.Nickname} squeezes ${Pronoun.get("dependent", Player)} abdomen trying to get it all out. (only you can see this).</p>`);
      }
    },
    {
      name: "change",
      description: "Changes you or another person",
      args: "[username]",
      action: (args) => {
        let [command, ...input] = args.split(/[ ,]+/);
        let identifier = input[0];
        if (identifier == null) {
          if (!(modStorage.topLayer || modStorage.bottomLayer)) {
            ChatRoomSendLocal(
              "<p style='background-color:#ecc826'>ABCL: You don't have a diaper!</p>"
            );
          } else
            changeDiaper(Player);
        } else {
          let player = GetPlayer(identifier);
          if (player == null) {
            ChatRoomSendLocal("<p style='background-color:#ecc826'>ABCL: Player not found!</p>");
            return;
          }
          if (modStorage.topLayer || modStorage.bottomLayer) {
            changeDiaper(player);
          } else {
            ChatRoomSendLocal("<p style='background-color:#ecc826'>ABCL: " + ChatRoomHTMLEntities(GetName(player)) + " does not have a diaper!</p>");
          }
        }
      }
    }
  ];
  function loadCommands() {
    CommandCombine([
      {
        Tag: "abcl",
        Description: "Execute ABCL command",
        Action: function(text) {
          const commandName = text.split(" ")[0];
          const commandText = text.split(" ").slice(1).join(" ");
          const command = commands.find((c) => c.name === commandName);
          if (command) {
            command.action(commandText);
          } else {
            Messager.send("Unknown command, use <!/abcl help!> to view a list of all available commands!", Player.MemberNumber, "LocalMessage");
          }
        }
      }
    ]);
    setInterval(statUpdateLoop, 1e3);
  }
  async function statUpdateLoop() {
    const statBoxes = document.querySelectorAll(".stats-box");
    const seconds = getTime();
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const chance = nextDiaperAction();
    const totalAbsorbancy = (modSession.topLayer?.absorbancy ?? 0) + (modSession.bottomLayer?.absorbancy ?? 0);
    const totalMesses = (modSession.topLayer?.messes ?? 0) + (modSession.bottomLayer?.messes ?? 0);
    const totalWettings = (modSession.topLayer?.wettings ?? 0) + (modSession.bottomLayer?.wettings ?? 0);
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
      if (bar) bar.style.width = seconds / (getTime() * 60) * 100 + "%";
      if (absorbancyTotal) absorbancyTotal.textContent = (totalAbsorbancy * 60).toString();
      if (desperationBase) desperationBase.textContent = (Math.floor(modSession.settings.desperationLevel * 10) / 10).toString();
      if (regressionBase) regressionBase.textContent = (Math.floor((getRegressionIncreese() + modSession.settings.regressionLevel) * 10) / 10).toString() + "%";
      if (regressionModifier) regressionModifier.textContent = (Math.floor(getRegressionIncreese() * 10) / 10).toString() + "%";
    });
  }

  // data/dictionary.json
  var dictionary_default = `{ \r
    "Diapers": {\r
            "Patterned Diaper": {\r
            "indexes": [1],\r
            "type": "primary",\r
            "absorbancy": 2\r
            },\r
            "Bulky Diaper": {\r
            "indexes": [1,0],\r
            "type": "primary&secondary",\r
            "absorbancy": 4\r
            },\r
            "Poofy Diaper": {\r
            "indexes": [1,0],\r
            "type": "primary&secondary",\r
            "absorbancy": 4\r
            },\r
            "Bulky Chastity Diaper": {\r
            "indexes": [1,0],\r
            "type": "primary&secondary",\r
            "absorbancy": 5\r
            },\r
            "Poofy Chastity Diaper": {\r
            "indexes": [1,0],\r
            "type": "primary&secondary",\r
            "absorbancy": 4\r
            },\r
            "Plastic Covered Diaper": {\r
            "indexes": [0],\r
            "type": "primary",\r
            "absorbancy": 4\r
            },\r
            "Satin Covered Diaper": {\r
                "indexes": [0],\r
                "type": "primary",\r
                "absorbancy": 6\r
            },\r
            "Diaper": {\r
                "type": "mono",\r
                "absorbancy": 2\r
            },\r
            "Diaper Harness": {\r
                "type": "mono",\r
                "absorbancy": 0\r
            }\r
    },\r
    "Items": {\r
        "Adult Baby Harness": {"modifier": 0.2},\r
        "Shiny Dress": {"modifier": 0.4},\r
        "Bows Dress": {"modifier": 0.3},\r
        "Puffy Dress" : { "modifier": 0.2}, \r
        "Sumer flower dress" : {"modifier": 0.2},\r
        "Bib": {"modifier": 0.3},\r
        "Bonnet Style 1": {"modifier": 0.2},\r
        "Bonnet Style 2": {"modifier": 0.2},\r
        "Rose Tiara": {"modifier": 0.2},\r
        "Tutu": {"modifier": 0.2},\r
        "Hollow Butt Plug": {"modifier": 0.2},\r
\r
        "Cow Printed Socks": {"modifier": 0.1},\r
        "Striped Socks": {"modifier": 0.1},\r
        "Vinyl Socks": {"modifier": 0.1},\r
        "Style 4": {"modifier": 0.1},\r
\r
        "Halo": {"modifier": 0.1},       \r
        "Unicorn Horn": {"modifier": 0.1},\r
        "Reindeer Hairband": {"modifier": 0.1},\r
\r
        "Piercing Set": {"modifier": -0.1},\r
        "Harem Stockings": {"modifier": -0.1},\r
        "ID Card": {"modifier": -0.1}, \r
        "Key Necklace": {"modifier": -0.1}\r
        },\r
    "Regex": {\r
        "Cute": {"modifier": 0.1},\r
        "Frill": {"modifier": 0.2},\r
        "Panties": {"modifier": -0.1},\r
        "Bra": {"modifier": -0.1},\r
        "Bikini": {"modifier": -0.1},\r
        "Business": {"modifier": -0.1},\r
        "Cheerleader": {"modifier": 0.1},\r
        "Fur": {"modifier": 0.1},\r
        "Fishnet": {"modifier": -0.1},\r
        "Latex": {"modifier": -0.05},\r
        "Flower": {"modifier": 0.1},\r
        "Leather": {"modifier": -0.1},\r
        "Puff": {"modifier": 0.1},\r
        "Shiny": {"modifier": 0.1},\r
        "Satin": {"modifier": 0.1},\r
        "Ears": {"modifier": 0.1},\r
        "Horns": {"modifier": -0.1},\r
        "Crown": {"modifier": 0.1},\r
        "Briefs": {"modifier": -0.1},\r
        "Thong": {"modifier": -0.1},\r
        "Crotch": {"modifier": -0.1},\r
        "Heels": {"modifier": -0.1},\r
        "Angel": {"modifier": 0.1},\r
        "Pet": {"modifier": 0.1},\r
        "Ribbons": {"modifier": 0.1},\r
        "Plush": {"modifier": 0.1},\r
        "Crib": {"modifier": 0.5},\r
        "Cushion": {"modifier": 0.1},\r
        "Teddy": {"modifier": 0.1},\r
        "Bow": {"modifier": 0.1},\r
        "Mittes": {"modifier": 0.1},\r
        "Mits": {"modifier": 0.1},\r
        "Pacifier": {"modifier": 0.3},\r
        "Milk": {"modifier": 0.1},\r
        "Nursery": {"modifier": 3},\r
        "Heart": {"modifier": 0.1},\r
        "Doll": {"modifier": 0.1},\r
        "Baby": {"modifier": 0.1}\r
    },\r
    "CraftingModifiers": {\r
        "absorbancy": {\r
            "massive": 3,\r
            "big": 2,\r
            "large": 1\r
        },\r
        "messChance": {\r
            "special laxative": 0.8,\r
            "laxative": 0.4,\r
            "weak laxative": 0.2,\r
            "stinkies": 0.4,\r
            "messy": 0.2\r
        },\r
        "wetChance": {\r
            "special diuretic": 0.8,\r
            "diuretic": 0.4,\r
            "weak diuretic": 0.2\r
        },\r
        "regression": {\r
            "hypnotic": 5\r
        },\r
        "desperation": {\r
            "hypnotic": 5\r
        }\r
    },\r
    "messages":{\r
        "internalMonologue": {\r
            "mess": "You have made a mess in your \xA7diaper\xA7.",\r
            "fullymess": "You have fully soiled your \xA7diaper\xA7.",\r
            "wet": "You have wet your \xA7diaper\xA7.",\r
            "fullywet": "You have fully soiled your \xA7diaper\xA7.",\r
            "immergency": "You are really in need of a diaper change!",\r
            "selfwet": "You have wet your clothing. Get a \xA7diaper\xA7 on you before You make another mess!",\r
            "selfmess": "You have soiled your clothing. Get a \xA7diaper\xA7 on you before You make another mess!",\r
            "noDiaper": "You do not have a \xA7diaper\xA7! Get one on before You make a mess!",\r
            "changeSelf": "You have changed your \xA7diaper\xA7.",\r
            "changeBy": "\xA7by-player\xA7 has changed your \xA7diaper\xA7."\r
        },\r
        "default": {\r
            "mess": "\xA7name\xA7 has made a mess in \xA7dependent\xA7 \xA7current-diaper\xA7.",\r
            "fullymess": "\xA7name\xA7 has fully soiled \xA7dependent\xA7 \xA7current-diaper\xA7.",\r
            "wet": "\xA7name\xA7 has wet \xA7dependent\xA7 \xA7current-diaper\xA7.",\r
            "fullywet": "\xA7name\xA7 has fully wet \xA7dependent\xA7 \xA7current-diaper\xA7.",\r
            "immergency": "\xA7name\xA7 is really in need of a diaper change!",\r
            "selfwet": "\xA7name\xA7 has wet \xA7dependent\xA7 clothes. Get a \xA7diaper\xA7 on \xA7objective\xA7 before \xA7subjective\xA7 makes another mess!",\r
            "selfmess": "\xA7name\xA7 has soiled \xA7dependent\xA7 clothes. Get a \xA7diaper\xA7 on \xA7objective\xA7 before \xA7subjective\xA7 makes another mess!",\r
            "noDiaper": "\xA7name\xA7 does not have a \xA7diaper\xA7! Get one on \xA7objective\xA7 before \xA7subjective\xA7 makes a mess~",\r
            "changeSelf": "\xA7name\xA7 has changed \xA7dependent\xA7 \xA7current-diaper\xA7.",\r
            "changeBy": "\xA7by-player\xA7 has changed \xA7name\xA7 \xA7current-diaper\xA7. \xA7name\xA7 is now clean and dry~"\r
        },\r
        "embarrassment": {\r
            "mess": "\xA7name\xA7 \xA7trembles\xA7 as \xA7dependent\xA7 diaper filled, trying desperately to remain discreet..",\r
            "fullymess": "\xA7name\xA7 diaper \xA7quickly\xA7 fills, \xA7name\xA7's \xA7trembles\xA7 intensifies, \xA7subjective\xA7's desperate to remain inconspicuous",\r
            "wet": "\xA7name\xA7 \xA7desperately\xA7 \xA7trembles\xA7 to conceal \xA7dependent\xA7 embarrassment as \xA7dependent\xA7 diaper \xA7quickly\xA7 soaks.",\r
            "fullywet": "\xA7name\xA7 \xA7burns\xA7 with \xA7embarrassment\xA7 as \xA7dependent\xA7 diaper is completely saturated, \xA7subjective\xA7 can't bear to imagine how \xA7obvious\xA7 the soggy bulge peeks",\r
            "immergency": "\xA7name\xA7 silently \xA7trembles\xA7, as \xA7dependent\xA7 diaper saggs heavily down \xA7dependent\xA7 legs, \xA7subjective\xA7 is in dire need of a change~",\r
            "selfwet": "\xA7name\xA7 freezes as \xA7warm\xA7 liquid trickles down \xA7dependent\xA7 legs, quickly creating a puddle beneath \xA7dependent\xA7; \xA7dependent\xA7 \xA7items-below\xA7 visibly damp.",\r
            "selfmess": "\xA7name\xA7 \xA7shudders\xA7 as \xA7warm\xA7 and \xA7wet\xA7 mess spreads across \xA7dependent\xA7 bottom, \xA7dependent\xA7 \xA7items-below\xA7 are now visibly soiled.",\r
            "changeSelf": "\xA7name\xA7 \xA7quickly\xA7 \xA7trembling\xA7 changes \xA7dependent\xA7 \xA7current-diaper\xA7.",\r
            "changeBy": "\xA7name\xA7 \xA7trembles\xA7 as \xA7by-player\xA7 changes \xA7name\xA7 \xA7current-diaper\xA7.",\r
            "noDiaper": "\xA7name\xA7 \xA7trembles\xA7 as \xA7subjective\xA7 realizes \xA7dependent\xA7 \xA7current-diaper\xA7 is missing, \xA7subjective\xA7 is in dire need of a change~"\r
        }\r
    },\r
    "verbs": {\r
        "\xA7trembles\xA7": {"neutral":["trembles", "shudders", "shakes", "quivers", "shivers", "struggles", "squirms"]},\r
        "\xA7trembling\xA7": {"neutral":["trembling", "shaking", "quivering", "shivering", "struggling", "squirming"]},\r
        "\xA7moan\xA7": {"neutral":["moan", "groan", "whimper", "whine", "cry"]},\r
        "\xA7squirm\xA7": {"neutral":["squirm", "wriggle", "fidget", "shift", "shuffle"]},\r
        "\xA7blush\xA7": {"neutral":["blush", "flush", "redden"]},\r
        "\xA7quickly\xA7": {"neutral":["quickly", "rapidly", "swiftly", "promptly"]},\r
        "\xA7desperately\xA7": {"neutral":["desperatly", "frantically", "anxiously"]},\r
        "\xA7burns\xA7": {"neutral":["burns", "flushes", "glows"]},\r
        "\xA7embarrassment\xA7": {"neutral":["embarrassment", "shame", "humiliation"]},\r
        "\xA7obvious\xA7": {"neutral":["obvious", "clear", "evident"]},\r
        "\xA7wet\xA7": {"neutral":["wet", "soaked", "soggy", "damp", "moist"]},\r
        "\xA7has-wet\xA7": {"neutral":["wet", "soaked"]},\r
        "\xA7warm\xA7": {"neutral":["warm", "hot"]},\r
        "\xA7diaper\xA7": {"neutral":["diaper", "nappy", "pullup"]}\r
    }\r
}\r
`;

  // src/index.ts
  function getModVersion() {
    return "1.2.1";
  }
  var ABCLdata = JSON.parse(dictionary_default.toString());
  globalThis.ABCLdata = dictionary_default;
  var style = document.createElement("style");
  style.innerHTML = abcl_default;
  document.head.append(style);
  document.body.insertAdjacentHTML("beforeend", settings_default);
  waitFor(() => typeof window.Player?.MemberNumber === "number").then(() => {
    initStorage();
    loadSettingsMenu();
    loadCommands();
    loadMessages();
    loadDiaperLayers();
    if (isVersionNewer(getModVersion(), modStorage.version)) {
      if (ServerPlayerIsInChatRoom()) {
        modStorage.version = getModVersion();
      } else {
        ServerSocket.once("ChatRoomSync", () => {
          modStorage.version = getModVersion();
        });
      }
    }
    loop();
  });
  async function loop() {
    updateDiaper();
    while (true) {
      if (!modSession.settings.enabled || !modSession.settings.timerEnabled || getTime() > 0) {
        await new Promise((r) => setTimeout(r, Math.max(getTime() * 1e3)));
        continue;
      }
      modSession.settings.lastAccident = Date.now() + 6e4;
      if (modSession.topLayer || modSession.bottomLayer) {
        releaseInDiaper();
      } else {
        modSession.settings.regressionLevel += getRegressionIncreese();
        desperationTick();
        releaseInClothes();
      }
    }
  }
})();
