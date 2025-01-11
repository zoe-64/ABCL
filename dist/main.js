"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) =>
    function __require() {
      return (
        mod ||
          (0, cb[__getOwnPropNames(cb)[0]])(
            (mod = { exports: {} }).exports,
            mod
          ),
        mod.exports
      );
    };
  var __copyProps = (to, from, except, desc) => {
    if ((from && typeof from === "object") || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, {
            get: () => from[key],
            enumerable:
              !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
          });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (
    (target = mod != null ? __create(__getProtoOf(mod)) : {}),
    __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule
        ? __defProp(target, "default", { value: mod, enumerable: true })
        : target,
      mod
    )
  );

  // node_modules/bondage-club-mod-sdk/dist/bcmodsdk.js
  var require_bcmodsdk = __commonJS({
    "node_modules/bondage-club-mod-sdk/dist/bcmodsdk.js"(exports2) {
      var bcModSdk = (function () {
        "use strict";
        const o = "1.2.0";
        function e(o2) {
          alert("Mod ERROR:\n" + o2);
          const e2 = new Error(o2);
          throw (console.error(e2), e2);
        }
        const t = new TextEncoder();
        function n(o2) {
          return !!o2 && "object" == typeof o2 && !Array.isArray(o2);
        }
        function r(o2) {
          const e2 = /* @__PURE__ */ new Set();
          return o2.filter((o3) => !e2.has(o3) && e2.add(o3));
        }
        const i = /* @__PURE__ */ new Map(),
          a = /* @__PURE__ */ new Set();
        function c(o2) {
          a.has(o2) || (a.add(o2), console.warn(o2));
        }
        function s(o2) {
          const e2 = [],
            t2 = /* @__PURE__ */ new Map(),
            n2 = /* @__PURE__ */ new Set();
          for (const r3 of f.values()) {
            const i3 = r3.patching.get(o2.name);
            if (i3) {
              e2.push(...i3.hooks);
              for (const [e3, a2] of i3.patches.entries())
                t2.has(e3) &&
                  t2.get(e3) !== a2 &&
                  c(`ModSDK: Mod '${r3.name}' is patching function ${
                    o2.name
                  } with same pattern that is already applied by different mod, but with different pattern:
Pattern:
${e3}
Patch1:
${t2.get(e3) || ""}
Patch2:
${a2}`),
                  t2.set(e3, a2),
                  n2.add(r3.name);
            }
          }
          e2.sort((o3, e3) => e3.priority - o3.priority);
          const r2 = (function (o3, e3) {
            if (0 === e3.size) return o3;
            let t3 = o3.toString().replaceAll("\r\n", "\n");
            for (const [n3, r3] of e3.entries())
              t3.includes(n3) ||
                c(`ModSDK: Patching ${o3.name}: Patch ${n3} not applied`),
                (t3 = t3.replaceAll(n3, r3));
            return (0, eval)(`(${t3})`);
          })(o2.original, t2);
          let i2 = function (e3) {
            var t3, i3;
            const a2 =
                null === (i3 = (t3 = m.errorReporterHooks).hookChainExit) ||
                void 0 === i3
                  ? void 0
                  : i3.call(t3, o2.name, n2),
              c2 = r2.apply(this, e3);
            return null == a2 || a2(), c2;
          };
          for (let t3 = e2.length - 1; t3 >= 0; t3--) {
            const n3 = e2[t3],
              r3 = i2;
            i2 = function (e3) {
              var t4, i3;
              const a2 =
                  null === (i3 = (t4 = m.errorReporterHooks).hookEnter) ||
                  void 0 === i3
                    ? void 0
                    : i3.call(t4, o2.name, n3.mod),
                c2 = n3.hook.apply(this, [
                  e3,
                  (o3) => {
                    if (1 !== arguments.length || !Array.isArray(e3))
                      throw new Error(
                        `Mod ${
                          n3.mod
                        } failed to call next hook: Expected args to be array, got ${typeof o3}`
                      );
                    return r3.call(this, o3);
                  },
                ]);
              return null == a2 || a2(), c2;
            };
          }
          return {
            hooks: e2,
            patches: t2,
            patchesSources: n2,
            enter: i2,
            final: r2,
          };
        }
        function l(o2, e2 = false) {
          let r2 = i.get(o2);
          if (r2) e2 && (r2.precomputed = s(r2));
          else {
            let e3 = window;
            const a2 = o2.split(".");
            for (let t2 = 0; t2 < a2.length - 1; t2++)
              if (((e3 = e3[a2[t2]]), !n(e3)))
                throw new Error(
                  `ModSDK: Function ${o2} to be patched not found; ${a2
                    .slice(0, t2 + 1)
                    .join(".")} is not object`
                );
            const c2 = e3[a2[a2.length - 1]];
            if ("function" != typeof c2)
              throw new Error(`ModSDK: Function ${o2} to be patched not found`);
            const l2 = (function (o3) {
                let e4 = -1;
                for (const n2 of t.encode(o3)) {
                  let o4 = 255 & (e4 ^ n2);
                  for (let e5 = 0; e5 < 8; e5++)
                    o4 = 1 & o4 ? -306674912 ^ (o4 >>> 1) : o4 >>> 1;
                  e4 = (e4 >>> 8) ^ o4;
                }
                return ((-1 ^ e4) >>> 0)
                  .toString(16)
                  .padStart(8, "0")
                  .toUpperCase();
              })(c2.toString().replaceAll("\r\n", "\n")),
              d2 = { name: o2, original: c2, originalHash: l2 };
            (r2 = Object.assign(Object.assign({}, d2), {
              precomputed: s(d2),
              router: () => {},
              context: e3,
              contextProperty: a2[a2.length - 1],
            })),
              (r2.router = /* @__PURE__ */ (function (o3) {
                return function (...e4) {
                  return o3.precomputed.enter.apply(this, [e4]);
                };
              })(r2)),
              i.set(o2, r2),
              (e3[r2.contextProperty] = r2.router);
          }
          return r2;
        }
        function d() {
          for (const o2 of i.values()) o2.precomputed = s(o2);
        }
        function p() {
          const o2 = /* @__PURE__ */ new Map();
          for (const [e2, t2] of i)
            o2.set(e2, {
              name: e2,
              original: t2.original,
              originalHash: t2.originalHash,
              sdkEntrypoint: t2.router,
              currentEntrypoint: t2.context[t2.contextProperty],
              hookedByMods: r(t2.precomputed.hooks.map((o3) => o3.mod)),
              patchedByMods: Array.from(t2.precomputed.patchesSources),
            });
          return o2;
        }
        const f = /* @__PURE__ */ new Map();
        function u(o2) {
          f.get(o2.name) !== o2 &&
            e(`Failed to unload mod '${o2.name}': Not registered`),
            f.delete(o2.name),
            (o2.loaded = false),
            d();
        }
        function g(o2, t2) {
          (o2 && "object" == typeof o2) ||
            e("Failed to register mod: Expected info object, got " + typeof o2),
            ("string" == typeof o2.name && o2.name) ||
              e(
                "Failed to register mod: Expected name to be non-empty string, got " +
                  typeof o2.name
              );
          let r2 = `'${o2.name}'`;
          ("string" == typeof o2.fullName && o2.fullName) ||
            e(
              `Failed to register mod ${r2}: Expected fullName to be non-empty string, got ${typeof o2.fullName}`
            ),
            (r2 = `'${o2.fullName} (${o2.name})'`),
            "string" != typeof o2.version &&
              e(
                `Failed to register mod ${r2}: Expected version to be string, got ${typeof o2.version}`
              ),
            o2.repository || (o2.repository = void 0),
            void 0 !== o2.repository &&
              "string" != typeof o2.repository &&
              e(
                `Failed to register mod ${r2}: Expected repository to be undefined or string, got ${typeof o2.version}`
              ),
            null == t2 && (t2 = {}),
            (t2 && "object" == typeof t2) ||
              e(
                `Failed to register mod ${r2}: Expected options to be undefined or object, got ${typeof t2}`
              );
          const i2 = true === t2.allowReplace,
            a2 = f.get(o2.name);
          a2 &&
            ((a2.allowReplace && i2) ||
              e(`Refusing to load mod ${r2}: it is already loaded and doesn't allow being replaced.
Was the mod loaded multiple times?`),
            u(a2));
          const c2 = (o3) => {
              let e2 = g2.patching.get(o3.name);
              return (
                e2 ||
                  ((e2 = { hooks: [], patches: /* @__PURE__ */ new Map() }),
                  g2.patching.set(o3.name, e2)),
                e2
              );
            },
            s2 =
              (o3, t3) =>
              (...n2) => {
                var i3, a3;
                const c3 =
                  null ===
                    (a3 = (i3 = m.errorReporterHooks).apiEndpointEnter) ||
                  void 0 === a3
                    ? void 0
                    : a3.call(i3, o3, g2.name);
                g2.loaded ||
                  e(
                    `Mod ${r2} attempted to call SDK function after being unloaded`
                  );
                const s3 = t3(...n2);
                return null == c3 || c3(), s3;
              },
            p2 = {
              unload: s2("unload", () => u(g2)),
              hookFunction: s2("hookFunction", (o3, t3, n2) => {
                ("string" == typeof o3 && o3) ||
                  e(
                    `Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`
                  );
                const i3 = l(o3),
                  a3 = c2(i3);
                "number" != typeof t3 &&
                  e(
                    `Mod ${r2} failed to hook function '${o3}': Expected priority number, got ${typeof t3}`
                  ),
                  "function" != typeof n2 &&
                    e(
                      `Mod ${r2} failed to hook function '${o3}': Expected hook function, got ${typeof n2}`
                    );
                const s3 = { mod: g2.name, priority: t3, hook: n2 };
                return (
                  a3.hooks.push(s3),
                  d(),
                  () => {
                    const o4 = a3.hooks.indexOf(s3);
                    o4 >= 0 && (a3.hooks.splice(o4, 1), d());
                  }
                );
              }),
              patchFunction: s2("patchFunction", (o3, t3) => {
                ("string" == typeof o3 && o3) ||
                  e(
                    `Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`
                  );
                const i3 = l(o3),
                  a3 = c2(i3);
                n(t3) ||
                  e(
                    `Mod ${r2} failed to patch function '${o3}': Expected patches object, got ${typeof t3}`
                  );
                for (const [n2, i4] of Object.entries(t3))
                  "string" == typeof i4
                    ? a3.patches.set(n2, i4)
                    : null === i4
                    ? a3.patches.delete(n2)
                    : e(
                        `Mod ${r2} failed to patch function '${o3}': Invalid format of patch '${n2}'`
                      );
                d();
              }),
              removePatches: s2("removePatches", (o3) => {
                ("string" == typeof o3 && o3) ||
                  e(
                    `Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`
                  );
                const t3 = l(o3);
                c2(t3).patches.clear(), d();
              }),
              callOriginal: s2("callOriginal", (o3, t3, n2) => {
                ("string" == typeof o3 && o3) ||
                  e(
                    `Mod ${r2} failed to call a function: Expected function name string, got ${typeof o3}`
                  );
                const i3 = l(o3);
                return (
                  Array.isArray(t3) ||
                    e(
                      `Mod ${r2} failed to call a function: Expected args array, got ${typeof t3}`
                    ),
                  i3.original.apply(null != n2 ? n2 : globalThis, t3)
                );
              }),
              getOriginalHash: s2("getOriginalHash", (o3) => {
                ("string" == typeof o3 && o3) ||
                  e(
                    `Mod ${r2} failed to get hash: Expected function name string, got ${typeof o3}`
                  );
                return l(o3).originalHash;
              }),
            },
            g2 = {
              name: o2.name,
              fullName: o2.fullName,
              version: o2.version,
              repository: o2.repository,
              allowReplace: i2,
              api: p2,
              loaded: true,
              patching: /* @__PURE__ */ new Map(),
            };
          return f.set(o2.name, g2), Object.freeze(p2);
        }
        function h() {
          const o2 = [];
          for (const e2 of f.values())
            o2.push({
              name: e2.name,
              fullName: e2.fullName,
              version: e2.version,
              repository: e2.repository,
            });
          return o2;
        }
        let m;
        const y =
          void 0 === window.bcModSdk
            ? (window.bcModSdk = (function () {
                const e2 = {
                  version: o,
                  apiVersion: 1,
                  registerMod: g,
                  getModsInfo: h,
                  getPatchingInfo: p,
                  errorReporterHooks: Object.seal({
                    apiEndpointEnter: null,
                    hookEnter: null,
                    hookChainExit: null,
                  }),
                };
                return (m = e2), Object.freeze(e2);
              })())
            : (n(window.bcModSdk) ||
                e("Failed to init Mod SDK: Name already in use"),
              1 !== window.bcModSdk.apiVersion &&
                e(
                  `Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`
                ),
              window.bcModSdk.version !== o &&
                alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')
One of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),
              window.bcModSdk);
        return (
          "undefined" != typeof exports2 &&
            (Object.defineProperty(exports2, "__esModule", { value: true }),
            (exports2.default = y)),
          y
        );
      })();
    },
  });

  // src/core/logger.ts
  var Logger = class {
    constructor() {
      this.logs = [];
      this.maxLogSize = 100;
    }
    log(level, message, logFunction) {
      const timestamp = /* @__PURE__ */ new Date().toISOString();
      const logEntry = {
        message,
        level,
        version: modVersion,
        timestamp,
      };
      logFunction(
        `%c${modIdentifier}:`,
        `font-weight: bold; color: #f6cbde;`,
        logEntry
      );
      this.logs.push(logEntry);
      if (this.logs.length > this.maxLogSize) {
        this.logs.shift();
      }
    }
    info(message) {
      this.log("INFO", message, console.log);
    }
    debug(message) {
      this.log("DEBUG", message, console.debug);
    }
    warn(message) {
      this.log("WARN", message, console.warn);
    }
    error(message) {
      this.log("ERROR", message, console.error);
    }
    getLogs() {
      return this.logs;
    }
  };
  var logger = new Logger();

  // src/core/utils.ts
  var import_bondage_club_mod_sdk = __toESM(require_bcmodsdk());

  // src/types/definitions.ts
  var ModVersion = modVersion;
  var ModName = modName;
  var ModRepo = modRepo;
  var ModIdentifier = modIdentifier;
  var PublicURL = publicURL;

  // src/core/utils.ts
  var bcModSDK = import_bondage_club_mod_sdk.default.registerMod({
    name: ModName,
    fullName: ModName,
    version: ModVersion,
    repository: ModRepo,
  });
  function isObject(obj) {
    return !!obj && typeof obj === "object" && !Array.isArray(obj);
  }
  async function waitFor(func, cancelFunc = () => false) {
    while (!func()) {
      if (cancelFunc()) return false;
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    return true;
  }
  function getCharacter(memberNumber) {
    const character = ChatRoomCharacter.find(
      (c) => c.MemberNumber === memberNumber
    );
    if (!character) {
      return null;
    }
    if (character?.IsPlayer()) {
      return character;
    }
    return character;
  }

  // src/core/hooks.ts
  var sendUpdateMySettings = (target) => {
    const syncSettingsMessage = {
      Type: "Hidden",
      Content: `${modIdentifier}Msg`,
      Sender: Player.MemberNumber,
      Dictionary: [
        {
          message: {
            type: "sync",
            settings: Player[modIdentifier].Settings,
            target,
          },
        },
      ],
    };
    logger.debug({
      message: `Sending updated settings to ${target ?? "everyone"}`,
      data: syncSettingsMessage,
    });
    ServerSend("ChatRoomChat", syncSettingsMessage);
  };
  var sendRequestOtherSettingsPacket = () => {
    const syncSettingsMessage = {
      Type: "Hidden",
      Content: `${modIdentifier}Msg`,
      Sender: Player.MemberNumber,
      Dictionary: [
        {
          message: {
            type: "init",
          },
        },
      ],
    };
    logger.debug(`Requesting settings from others.`);
    ServerSend("ChatRoomChat", syncSettingsMessage);
  };
  var handleSyncPacket = (data) => {
    if (!data.Sender) return;
    const dict = data.Dictionary?.[0];
    if (!dict?.message) return;
    logger.debug({
      message: `Received updated settings`,
      data,
    });
    const otherCharacter = getCharacter(data.Sender);
    if (!otherCharacter) return;
    otherCharacter[modIdentifier] = { Settings: dict.message.settings };
  };
  var handleInitPacket = (data) => {
    if (!data.Sender) return;
    logger.debug(`Received request for settings`);
    sendUpdateMySettings(data.Sender);
  };
  var receivePacket = (data) => {
    if (data?.Content !== `${modIdentifier}Msg`) return;
    if (!data.Sender) return;
    if (data.Sender === Player.MemberNumber) return;
    if (data.Type !== "Hidden") return;
    if (!data.Dictionary?.[0]?.message) return;
    switch (data.Dictionary[0].message.type) {
      case "init":
        handleInitPacket(data);
        break;
      case "sync":
        handleSyncPacket(data);
        break;
    }
  };
  var initHooks = async () => {
    await waitFor(() => ServerSocket && ServerIsConnected);
    bcModSDK.hookFunction("ChatRoomSync", 1, (args, next) => {
      sendUpdateMySettings();
      return next(args);
    });
    bcModSDK.hookFunction("ChatRoomMessage", 1, (args, next) => {
      if (
        args[0].Content === "ServerEnter" &&
        args[0].Sender === Player.MemberNumber
      ) {
        sendRequestOtherSettingsPacket();
        return;
      }
      receivePacket(args[0]);
      return next(args);
    });
  };
  var hooks_default = initHooks;

  // node_modules/lodash-es/_freeGlobal.js
  var freeGlobal =
    typeof global == "object" && global && global.Object === Object && global;
  var freeGlobal_default = freeGlobal;

  // node_modules/lodash-es/_root.js
  var freeSelf =
    typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal_default || freeSelf || Function("return this")();
  var root_default = root;

  // node_modules/lodash-es/_Symbol.js
  var Symbol2 = root_default.Symbol;
  var Symbol_default = Symbol2;

  // node_modules/lodash-es/_getRawTag.js
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {}
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  var getRawTag_default = getRawTag;

  // node_modules/lodash-es/_objectToString.js
  var objectProto2 = Object.prototype;
  var nativeObjectToString2 = objectProto2.toString;
  function objectToString(value) {
    return nativeObjectToString2.call(value);
  }
  var objectToString_default = objectToString;

  // node_modules/lodash-es/_baseGetTag.js
  var nullTag = "[object Null]";
  var undefinedTag = "[object Undefined]";
  var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag2 && symToStringTag2 in Object(value)
      ? getRawTag_default(value)
      : objectToString_default(value);
  }
  var baseGetTag_default = baseGetTag;

  // node_modules/lodash-es/isObjectLike.js
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var isObjectLike_default = isObjectLike;

  // node_modules/lodash-es/isArray.js
  var isArray = Array.isArray;
  var isArray_default = isArray;

  // node_modules/lodash-es/isObject.js
  function isObject2(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var isObject_default = isObject2;

  // node_modules/lodash-es/identity.js
  function identity(value) {
    return value;
  }
  var identity_default = identity;

  // node_modules/lodash-es/isFunction.js
  var asyncTag = "[object AsyncFunction]";
  var funcTag = "[object Function]";
  var genTag = "[object GeneratorFunction]";
  var proxyTag = "[object Proxy]";
  function isFunction(value) {
    if (!isObject_default(value)) {
      return false;
    }
    var tag = baseGetTag_default(value);
    return (
      tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
    );
  }
  var isFunction_default = isFunction;

  // node_modules/lodash-es/_coreJsData.js
  var coreJsData = root_default["__core-js_shared__"];
  var coreJsData_default = coreJsData;

  // node_modules/lodash-es/_isMasked.js
  var maskSrcKey = (function () {
    var uid = /[^.]+$/.exec(
      (coreJsData_default &&
        coreJsData_default.keys &&
        coreJsData_default.keys.IE_PROTO) ||
        ""
    );
    return uid ? "Symbol(src)_1." + uid : "";
  })();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var isMasked_default = isMasked;

  // node_modules/lodash-es/_toSource.js
  var funcProto = Function.prototype;
  var funcToString = funcProto.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return func + "";
      } catch (e) {}
    }
    return "";
  }
  var toSource_default = toSource;

  // node_modules/lodash-es/_baseIsNative.js
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto2 = Function.prototype;
  var objectProto3 = Object.prototype;
  var funcToString2 = funcProto2.toString;
  var hasOwnProperty2 = objectProto3.hasOwnProperty;
  var reIsNative = RegExp(
    "^" +
      funcToString2
        .call(hasOwnProperty2)
        .replace(reRegExpChar, "\\$&")
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          "$1.*?"
        ) +
      "$"
  );
  function baseIsNative(value) {
    if (!isObject_default(value) || isMasked_default(value)) {
      return false;
    }
    var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource_default(value));
  }
  var baseIsNative_default = baseIsNative;

  // node_modules/lodash-es/_getValue.js
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  var getValue_default = getValue;

  // node_modules/lodash-es/_getNative.js
  function getNative(object, key) {
    var value = getValue_default(object, key);
    return baseIsNative_default(value) ? value : void 0;
  }
  var getNative_default = getNative;

  // node_modules/lodash-es/_baseCreate.js
  var objectCreate = Object.create;
  var baseCreate = /* @__PURE__ */ (function () {
    function object() {}
    return function (proto) {
      if (!isObject_default(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object();
      object.prototype = void 0;
      return result;
    };
  })();
  var baseCreate_default = baseCreate;

  // node_modules/lodash-es/_apply.js
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  var apply_default = apply;

  // node_modules/lodash-es/_copyArray.js
  function copyArray(source, array) {
    var index = -1,
      length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  var copyArray_default = copyArray;

  // node_modules/lodash-es/_shortOut.js
  var HOT_COUNT = 800;
  var HOT_SPAN = 16;
  var nativeNow = Date.now;
  function shortOut(func) {
    var count = 0,
      lastCalled = 0;
    return function () {
      var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(void 0, arguments);
    };
  }
  var shortOut_default = shortOut;

  // node_modules/lodash-es/constant.js
  function constant(value) {
    return function () {
      return value;
    };
  }
  var constant_default = constant;

  // node_modules/lodash-es/_defineProperty.js
  var defineProperty = (function () {
    try {
      var func = getNative_default(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {}
  })();
  var defineProperty_default = defineProperty;

  // node_modules/lodash-es/_baseSetToString.js
  var baseSetToString = !defineProperty_default
    ? identity_default
    : function (func, string) {
        return defineProperty_default(func, "toString", {
          configurable: true,
          enumerable: false,
          value: constant_default(string),
          writable: true,
        });
      };
  var baseSetToString_default = baseSetToString;

  // node_modules/lodash-es/_setToString.js
  var setToString = shortOut_default(baseSetToString_default);
  var setToString_default = setToString;

  // node_modules/lodash-es/_isIndex.js
  var MAX_SAFE_INTEGER = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return (
      !!length &&
      (type == "number" || (type != "symbol" && reIsUint.test(value))) &&
      value > -1 &&
      value % 1 == 0 &&
      value < length
    );
  }
  var isIndex_default = isIndex;

  // node_modules/lodash-es/_baseAssignValue.js
  function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty_default) {
      defineProperty_default(object, key, {
        configurable: true,
        enumerable: true,
        value: value,
        writable: true,
      });
    } else {
      object[key] = value;
    }
  }
  var baseAssignValue_default = baseAssignValue;

  // node_modules/lodash-es/eq.js
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }
  var eq_default = eq;

  // node_modules/lodash-es/_assignValue.js
  var objectProto4 = Object.prototype;
  var hasOwnProperty3 = objectProto4.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (
      !(hasOwnProperty3.call(object, key) && eq_default(objValue, value)) ||
      (value === void 0 && !(key in object))
    ) {
      baseAssignValue_default(object, key, value);
    }
  }
  var assignValue_default = assignValue;

  // node_modules/lodash-es/_copyObject.js
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1,
      length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue_default(object, key, newValue);
      } else {
        assignValue_default(object, key, newValue);
      }
    }
    return object;
  }
  var copyObject_default = copyObject;

  // node_modules/lodash-es/_overRest.js
  var nativeMax = Math.max;
  function overRest(func, start, transform) {
    start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
    return function () {
      var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);
      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply_default(func, this, otherArgs);
    };
  }
  var overRest_default = overRest;

  // node_modules/lodash-es/_baseRest.js
  function baseRest(func, start) {
    return setToString_default(
      overRest_default(func, start, identity_default),
      func + ""
    );
  }
  var baseRest_default = baseRest;

  // node_modules/lodash-es/isLength.js
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  function isLength(value) {
    return (
      typeof value == "number" &&
      value > -1 &&
      value % 1 == 0 &&
      value <= MAX_SAFE_INTEGER2
    );
  }
  var isLength_default = isLength;

  // node_modules/lodash-es/isArrayLike.js
  function isArrayLike(value) {
    return (
      value != null &&
      isLength_default(value.length) &&
      !isFunction_default(value)
    );
  }
  var isArrayLike_default = isArrayLike;

  // node_modules/lodash-es/_isIterateeCall.js
  function isIterateeCall(value, index, object) {
    if (!isObject_default(object)) {
      return false;
    }
    var type = typeof index;
    if (
      type == "number"
        ? isArrayLike_default(object) && isIndex_default(index, object.length)
        : type == "string" && index in object
    ) {
      return eq_default(object[index], value);
    }
    return false;
  }
  var isIterateeCall_default = isIterateeCall;

  // node_modules/lodash-es/_createAssigner.js
  function createAssigner(assigner) {
    return baseRest_default(function (object, sources) {
      var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : void 0,
        guard = length > 2 ? sources[2] : void 0;
      customizer =
        assigner.length > 3 && typeof customizer == "function"
          ? (length--, customizer)
          : void 0;
      if (guard && isIterateeCall_default(sources[0], sources[1], guard)) {
        customizer = length < 3 ? void 0 : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }
  var createAssigner_default = createAssigner;

  // node_modules/lodash-es/_isPrototype.js
  var objectProto5 = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor,
      proto = (typeof Ctor == "function" && Ctor.prototype) || objectProto5;
    return value === proto;
  }
  var isPrototype_default = isPrototype;

  // node_modules/lodash-es/_baseTimes.js
  function baseTimes(n, iteratee) {
    var index = -1,
      result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  var baseTimes_default = baseTimes;

  // node_modules/lodash-es/_baseIsArguments.js
  var argsTag = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
  }
  var baseIsArguments_default = baseIsArguments;

  // node_modules/lodash-es/isArguments.js
  var objectProto6 = Object.prototype;
  var hasOwnProperty4 = objectProto6.hasOwnProperty;
  var propertyIsEnumerable = objectProto6.propertyIsEnumerable;
  var isArguments = baseIsArguments_default(
    /* @__PURE__ */ (function () {
      return arguments;
    })()
  )
    ? baseIsArguments_default
    : function (value) {
        return (
          isObjectLike_default(value) &&
          hasOwnProperty4.call(value, "callee") &&
          !propertyIsEnumerable.call(value, "callee")
        );
      };
  var isArguments_default = isArguments;

  // node_modules/lodash-es/stubFalse.js
  function stubFalse() {
    return false;
  }
  var stubFalse_default = stubFalse;

  // node_modules/lodash-es/isBuffer.js
  var freeExports =
    typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule =
    freeExports &&
    typeof module == "object" &&
    module &&
    !module.nodeType &&
    module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root_default.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse_default;
  var isBuffer_default = isBuffer;

  // node_modules/lodash-es/_baseIsTypedArray.js
  var argsTag2 = "[object Arguments]";
  var arrayTag = "[object Array]";
  var boolTag = "[object Boolean]";
  var dateTag = "[object Date]";
  var errorTag = "[object Error]";
  var funcTag2 = "[object Function]";
  var mapTag = "[object Map]";
  var numberTag = "[object Number]";
  var objectTag = "[object Object]";
  var regexpTag = "[object RegExp]";
  var setTag = "[object Set]";
  var stringTag = "[object String]";
  var weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]";
  var dataViewTag = "[object DataView]";
  var float32Tag = "[object Float32Array]";
  var float64Tag = "[object Float64Array]";
  var int8Tag = "[object Int8Array]";
  var int16Tag = "[object Int16Array]";
  var int32Tag = "[object Int32Array]";
  var uint8Tag = "[object Uint8Array]";
  var uint8ClampedTag = "[object Uint8ClampedArray]";
  var uint16Tag = "[object Uint16Array]";
  var uint32Tag = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag] =
    typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] =
    typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] =
    typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] =
    typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] =
      true;
  typedArrayTags[argsTag2] =
    typedArrayTags[arrayTag] =
    typedArrayTags[arrayBufferTag] =
    typedArrayTags[boolTag] =
    typedArrayTags[dataViewTag] =
    typedArrayTags[dateTag] =
    typedArrayTags[errorTag] =
    typedArrayTags[funcTag2] =
    typedArrayTags[mapTag] =
    typedArrayTags[numberTag] =
    typedArrayTags[objectTag] =
    typedArrayTags[regexpTag] =
    typedArrayTags[setTag] =
    typedArrayTags[stringTag] =
    typedArrayTags[weakMapTag] =
      false;
  function baseIsTypedArray(value) {
    return (
      isObjectLike_default(value) &&
      isLength_default(value.length) &&
      !!typedArrayTags[baseGetTag_default(value)]
    );
  }
  var baseIsTypedArray_default = baseIsTypedArray;

  // node_modules/lodash-es/_baseUnary.js
  function baseUnary(func) {
    return function (value) {
      return func(value);
    };
  }
  var baseUnary_default = baseUnary;

  // node_modules/lodash-es/_nodeUtil.js
  var freeExports2 =
    typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule2 =
    freeExports2 &&
    typeof module == "object" &&
    module &&
    !module.nodeType &&
    module;
  var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
  var freeProcess = moduleExports2 && freeGlobal_default.process;
  var nodeUtil = (function () {
    try {
      var types =
        freeModule2 && freeModule2.require && freeModule2.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {}
  })();
  var nodeUtil_default = nodeUtil;

  // node_modules/lodash-es/isTypedArray.js
  var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
  var isTypedArray = nodeIsTypedArray
    ? baseUnary_default(nodeIsTypedArray)
    : baseIsTypedArray_default;
  var isTypedArray_default = isTypedArray;

  // node_modules/lodash-es/_arrayLikeKeys.js
  var objectProto7 = Object.prototype;
  var hasOwnProperty5 = objectProto7.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_default(value),
      isArg = !isArr && isArguments_default(value),
      isBuff = !isArr && !isArg && isBuffer_default(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_default(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes_default(value.length, String) : [],
      length = result.length;
    for (var key in value) {
      if (
        (inherited || hasOwnProperty5.call(value, key)) &&
        !(
          skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            (isBuff && (key == "offset" || key == "parent")) || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            (isType &&
              (key == "buffer" ||
                key == "byteLength" ||
                key == "byteOffset")) || // Skip index properties.
            isIndex_default(key, length))
        )
      ) {
        result.push(key);
      }
    }
    return result;
  }
  var arrayLikeKeys_default = arrayLikeKeys;

  // node_modules/lodash-es/_overArg.js
  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }
  var overArg_default = overArg;

  // node_modules/lodash-es/_nativeKeysIn.js
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  var nativeKeysIn_default = nativeKeysIn;

  // node_modules/lodash-es/_baseKeysIn.js
  var objectProto8 = Object.prototype;
  var hasOwnProperty6 = objectProto8.hasOwnProperty;
  function baseKeysIn(object) {
    if (!isObject_default(object)) {
      return nativeKeysIn_default(object);
    }
    var isProto = isPrototype_default(object),
      result = [];
    for (var key in object) {
      if (
        !(
          key == "constructor" &&
          (isProto || !hasOwnProperty6.call(object, key))
        )
      ) {
        result.push(key);
      }
    }
    return result;
  }
  var baseKeysIn_default = baseKeysIn;

  // node_modules/lodash-es/keysIn.js
  function keysIn(object) {
    return isArrayLike_default(object)
      ? arrayLikeKeys_default(object, true)
      : baseKeysIn_default(object);
  }
  var keysIn_default = keysIn;

  // node_modules/lodash-es/_nativeCreate.js
  var nativeCreate = getNative_default(Object, "create");
  var nativeCreate_default = nativeCreate;

  // node_modules/lodash-es/_hashClear.js
  function hashClear() {
    this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
    this.size = 0;
  }
  var hashClear_default = hashClear;

  // node_modules/lodash-es/_hashDelete.js
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var hashDelete_default = hashDelete;

  // node_modules/lodash-es/_hashGet.js
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var objectProto9 = Object.prototype;
  var hasOwnProperty7 = objectProto9.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate_default) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty7.call(data, key) ? data[key] : void 0;
  }
  var hashGet_default = hashGet;

  // node_modules/lodash-es/_hashHas.js
  var objectProto10 = Object.prototype;
  var hasOwnProperty8 = objectProto10.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate_default
      ? data[key] !== void 0
      : hasOwnProperty8.call(data, key);
  }
  var hashHas_default = hashHas;

  // node_modules/lodash-es/_hashSet.js
  var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] =
      nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
    return this;
  }
  var hashSet_default = hashSet;

  // node_modules/lodash-es/_Hash.js
  function Hash(entries) {
    var index = -1,
      length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear_default;
  Hash.prototype["delete"] = hashDelete_default;
  Hash.prototype.get = hashGet_default;
  Hash.prototype.has = hashHas_default;
  Hash.prototype.set = hashSet_default;
  var Hash_default = Hash;

  // node_modules/lodash-es/_listCacheClear.js
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  var listCacheClear_default = listCacheClear;

  // node_modules/lodash-es/_assocIndexOf.js
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_default(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var assocIndexOf_default = assocIndexOf;

  // node_modules/lodash-es/_listCacheDelete.js
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__,
      index = assocIndexOf_default(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  var listCacheDelete_default = listCacheDelete;

  // node_modules/lodash-es/_listCacheGet.js
  function listCacheGet(key) {
    var data = this.__data__,
      index = assocIndexOf_default(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  var listCacheGet_default = listCacheGet;

  // node_modules/lodash-es/_listCacheHas.js
  function listCacheHas(key) {
    return assocIndexOf_default(this.__data__, key) > -1;
  }
  var listCacheHas_default = listCacheHas;

  // node_modules/lodash-es/_listCacheSet.js
  function listCacheSet(key, value) {
    var data = this.__data__,
      index = assocIndexOf_default(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  var listCacheSet_default = listCacheSet;

  // node_modules/lodash-es/_ListCache.js
  function ListCache(entries) {
    var index = -1,
      length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear_default;
  ListCache.prototype["delete"] = listCacheDelete_default;
  ListCache.prototype.get = listCacheGet_default;
  ListCache.prototype.has = listCacheHas_default;
  ListCache.prototype.set = listCacheSet_default;
  var ListCache_default = ListCache;

  // node_modules/lodash-es/_Map.js
  var Map2 = getNative_default(root_default, "Map");
  var Map_default = Map2;

  // node_modules/lodash-es/_mapCacheClear.js
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      hash: new Hash_default(),
      map: new (Map_default || ListCache_default)(),
      string: new Hash_default(),
    };
  }
  var mapCacheClear_default = mapCacheClear;

  // node_modules/lodash-es/_isKeyable.js
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" ||
      type == "number" ||
      type == "symbol" ||
      type == "boolean"
      ? value !== "__proto__"
      : value === null;
  }
  var isKeyable_default = isKeyable;

  // node_modules/lodash-es/_getMapData.js
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable_default(key)
      ? data[typeof key == "string" ? "string" : "hash"]
      : data.map;
  }
  var getMapData_default = getMapData;

  // node_modules/lodash-es/_mapCacheDelete.js
  function mapCacheDelete(key) {
    var result = getMapData_default(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  var mapCacheDelete_default = mapCacheDelete;

  // node_modules/lodash-es/_mapCacheGet.js
  function mapCacheGet(key) {
    return getMapData_default(this, key).get(key);
  }
  var mapCacheGet_default = mapCacheGet;

  // node_modules/lodash-es/_mapCacheHas.js
  function mapCacheHas(key) {
    return getMapData_default(this, key).has(key);
  }
  var mapCacheHas_default = mapCacheHas;

  // node_modules/lodash-es/_mapCacheSet.js
  function mapCacheSet(key, value) {
    var data = getMapData_default(this, key),
      size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  var mapCacheSet_default = mapCacheSet;

  // node_modules/lodash-es/_MapCache.js
  function MapCache(entries) {
    var index = -1,
      length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear_default;
  MapCache.prototype["delete"] = mapCacheDelete_default;
  MapCache.prototype.get = mapCacheGet_default;
  MapCache.prototype.has = mapCacheHas_default;
  MapCache.prototype.set = mapCacheSet_default;
  var MapCache_default = MapCache;

  // node_modules/lodash-es/_getPrototype.js
  var getPrototype = overArg_default(Object.getPrototypeOf, Object);
  var getPrototype_default = getPrototype;

  // node_modules/lodash-es/isPlainObject.js
  var objectTag2 = "[object Object]";
  var funcProto3 = Function.prototype;
  var objectProto11 = Object.prototype;
  var funcToString3 = funcProto3.toString;
  var hasOwnProperty9 = objectProto11.hasOwnProperty;
  var objectCtorString = funcToString3.call(Object);
  function isPlainObject(value) {
    if (
      !isObjectLike_default(value) ||
      baseGetTag_default(value) != objectTag2
    ) {
      return false;
    }
    var proto = getPrototype_default(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty9.call(proto, "constructor") && proto.constructor;
    return (
      typeof Ctor == "function" &&
      Ctor instanceof Ctor &&
      funcToString3.call(Ctor) == objectCtorString
    );
  }
  var isPlainObject_default = isPlainObject;

  // node_modules/lodash-es/_stackClear.js
  function stackClear() {
    this.__data__ = new ListCache_default();
    this.size = 0;
  }
  var stackClear_default = stackClear;

  // node_modules/lodash-es/_stackDelete.js
  function stackDelete(key) {
    var data = this.__data__,
      result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  var stackDelete_default = stackDelete;

  // node_modules/lodash-es/_stackGet.js
  function stackGet(key) {
    return this.__data__.get(key);
  }
  var stackGet_default = stackGet;

  // node_modules/lodash-es/_stackHas.js
  function stackHas(key) {
    return this.__data__.has(key);
  }
  var stackHas_default = stackHas;

  // node_modules/lodash-es/_stackSet.js
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache_default) {
      var pairs = data.__data__;
      if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache_default(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  var stackSet_default = stackSet;

  // node_modules/lodash-es/_Stack.js
  function Stack(entries) {
    var data = (this.__data__ = new ListCache_default(entries));
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear_default;
  Stack.prototype["delete"] = stackDelete_default;
  Stack.prototype.get = stackGet_default;
  Stack.prototype.has = stackHas_default;
  Stack.prototype.set = stackSet_default;
  var Stack_default = Stack;

  // node_modules/lodash-es/_cloneBuffer.js
  var freeExports3 =
    typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule3 =
    freeExports3 &&
    typeof module == "object" &&
    module &&
    !module.nodeType &&
    module;
  var moduleExports3 = freeModule3 && freeModule3.exports === freeExports3;
  var Buffer3 = moduleExports3 ? root_default.Buffer : void 0;
  var allocUnsafe = Buffer3 ? Buffer3.allocUnsafe : void 0;
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
      result = allocUnsafe
        ? allocUnsafe(length)
        : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  var cloneBuffer_default = cloneBuffer;

  // node_modules/lodash-es/_Uint8Array.js
  var Uint8Array2 = root_default.Uint8Array;
  var Uint8Array_default = Uint8Array2;

  // node_modules/lodash-es/_cloneArrayBuffer.js
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array_default(result).set(new Uint8Array_default(arrayBuffer));
    return result;
  }
  var cloneArrayBuffer_default = cloneArrayBuffer;

  // node_modules/lodash-es/_cloneTypedArray.js
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep
      ? cloneArrayBuffer_default(typedArray.buffer)
      : typedArray.buffer;
    return new typedArray.constructor(
      buffer,
      typedArray.byteOffset,
      typedArray.length
    );
  }
  var cloneTypedArray_default = cloneTypedArray;

  // node_modules/lodash-es/_initCloneObject.js
  function initCloneObject(object) {
    return typeof object.constructor == "function" &&
      !isPrototype_default(object)
      ? baseCreate_default(getPrototype_default(object))
      : {};
  }
  var initCloneObject_default = initCloneObject;

  // node_modules/lodash-es/_createBaseFor.js
  function createBaseFor(fromRight) {
    return function (object, iteratee, keysFunc) {
      var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;
      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }
  var createBaseFor_default = createBaseFor;

  // node_modules/lodash-es/_baseFor.js
  var baseFor = createBaseFor_default();
  var baseFor_default = baseFor;

  // node_modules/lodash-es/_assignMergeValue.js
  function assignMergeValue(object, key, value) {
    if (
      (value !== void 0 && !eq_default(object[key], value)) ||
      (value === void 0 && !(key in object))
    ) {
      baseAssignValue_default(object, key, value);
    }
  }
  var assignMergeValue_default = assignMergeValue;

  // node_modules/lodash-es/isArrayLikeObject.js
  function isArrayLikeObject(value) {
    return isObjectLike_default(value) && isArrayLike_default(value);
  }
  var isArrayLikeObject_default = isArrayLikeObject;

  // node_modules/lodash-es/_safeGet.js
  function safeGet(object, key) {
    if (key === "constructor" && typeof object[key] === "function") {
      return;
    }
    if (key == "__proto__") {
      return;
    }
    return object[key];
  }
  var safeGet_default = safeGet;

  // node_modules/lodash-es/toPlainObject.js
  function toPlainObject(value) {
    return copyObject_default(value, keysIn_default(value));
  }
  var toPlainObject_default = toPlainObject;

  // node_modules/lodash-es/_baseMergeDeep.js
  function baseMergeDeep(
    object,
    source,
    key,
    srcIndex,
    mergeFunc,
    customizer,
    stack
  ) {
    var objValue = safeGet_default(object, key),
      srcValue = safeGet_default(source, key),
      stacked = stack.get(srcValue);
    if (stacked) {
      assignMergeValue_default(object, key, stacked);
      return;
    }
    var newValue = customizer
      ? customizer(objValue, srcValue, key + "", object, source, stack)
      : void 0;
    var isCommon = newValue === void 0;
    if (isCommon) {
      var isArr = isArray_default(srcValue),
        isBuff = !isArr && isBuffer_default(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray_default(srcValue);
      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray_default(objValue)) {
          newValue = objValue;
        } else if (isArrayLikeObject_default(objValue)) {
          newValue = copyArray_default(objValue);
        } else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer_default(srcValue, true);
        } else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray_default(srcValue, true);
        } else {
          newValue = [];
        }
      } else if (
        isPlainObject_default(srcValue) ||
        isArguments_default(srcValue)
      ) {
        newValue = objValue;
        if (isArguments_default(objValue)) {
          newValue = toPlainObject_default(objValue);
        } else if (
          !isObject_default(objValue) ||
          isFunction_default(objValue)
        ) {
          newValue = initCloneObject_default(srcValue);
        }
      } else {
        isCommon = false;
      }
    }
    if (isCommon) {
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack["delete"](srcValue);
    }
    assignMergeValue_default(object, key, newValue);
  }
  var baseMergeDeep_default = baseMergeDeep;

  // node_modules/lodash-es/_baseMerge.js
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor_default(
      source,
      function (srcValue, key) {
        stack || (stack = new Stack_default());
        if (isObject_default(srcValue)) {
          baseMergeDeep_default(
            object,
            source,
            key,
            srcIndex,
            baseMerge,
            customizer,
            stack
          );
        } else {
          var newValue = customizer
            ? customizer(
                safeGet_default(object, key),
                srcValue,
                key + "",
                object,
                source,
                stack
              )
            : void 0;
          if (newValue === void 0) {
            newValue = srcValue;
          }
          assignMergeValue_default(object, key, newValue);
        }
      },
      keysIn_default
    );
  }
  var baseMerge_default = baseMerge;

  // node_modules/lodash-es/merge.js
  var merge = createAssigner_default(function (object, source, srcIndex) {
    baseMerge_default(object, source, srcIndex);
  });
  var merge_default = merge;

  // src/core/settings.ts
  var defaultSettings = {};
  var devMode = false;
  var loadOrGenerateSettings = () => {
    if (devMode) {
      Player.ExtensionSettings[modIdentifier] = "N4XyA===";
      ServerPlayerExtensionSettingsSync(modIdentifier);
      logger.warn("Dev mode enabled, cleared settings");
    }
    let Settings;
    const dataString = LZString.decompressFromBase64(
      Player.ExtensionSettings[modIdentifier]
    );
    if (!dataString) {
      logger.info(`Generating new settings`);
      Settings = {};
    } else {
      logger.info(`Loaded settings from server`);
      Settings = JSON.parse(dataString);
    }
    const settingsObject = merge_default(
      // Combines objects recursively in order, to
      {
        Settings: defaultSettings,
      },
      { Settings },
      {
        Settings: {
          ModVersion: modVersion,
          // Always override the mod version
        },
      }
    );
    logger.debug({ message: "Merged settings object", settingsObject });
    Player[modIdentifier] = settingsObject;
  };

  // src/screens/index.ts
  var initScreens = (screens) => {
    bcModSDK.hookFunction("TextLoad", 5, (args, next) => {
      if (
        screens.some(
          (screen) =>
            screen.module === CurrentModule && screen.id === CurrentScreen
        )
      ) {
        return;
      }
      return next(args);
    });
    screens.forEach((screen) => {
      window[`${screen.id}Background`] = "Sheet";
      const { KeyUp, Click, ...rest } = screen.functions;
      const injectedScreenFunctions = {
        ...rest,
        KeyUp: (event) => {
          if (event.key === "Escape") {
            window[`${screen.id}Exit`]();
          }
          KeyUp?.(event);
        },
        Click: (event) => {
          if (MouseIn(1815, 75, 90, 90)) {
            window[`${screen.id}Exit`]();
          }
          Click?.(event);
        },
      };
      window[`${screen.id}ScreenFunctions`] = injectedScreenFunctions;
      Object.entries(injectedScreenFunctions).forEach(([key, value]) => {
        window[`${screen.id}${key}`] = value;
      });
    });
  };

  // src/screens/Settings/index.ts
  var initSettingsScreen = async () => {
    PreferenceRegisterExtensionSetting({
      Identifier: modIdentifier,
      ButtonText: `${ModName} Settings`,
      Image: `${publicURL}/abcl.png`,
      click: () => {},
      run: () => {},
      exit: () => {
        return true;
      },
      load: () => {},
    });
  };

  // src/screens/styles/css.ts
  var css = ``;

  // src/main.ts
  var initWait = () => {
    logger.info(`Waiting for possible login...`);
    if (CurrentScreen == null || CurrentScreen === "Login") {
      bcModSDK.hookFunction("LoginResponse", 0, (args, next) => {
        next(args);
        const response = args[0];
        if (
          isObject(response) &&
          typeof response.Name === "string" &&
          typeof response.AccountName === "string"
        ) {
          if (window.modLoadFlag) return;
          init();
        }
      });
    } else {
      logger.info(`${modIdentifier}: Already logged in, loading...`);
      init();
    }
  };
  var init = () => {
    const currentAccount = Player.MemberNumber;
    if (currentAccount === null) {
      logger.error("No player MemberNumber");
      throw new Error("No player MemberNumber");
    }
    bcModSDK.hookFunction("LoginResponse", 0, (args, next) => {
      const response = args[0];
      if (
        isObject(response) &&
        typeof response.Name === "string" &&
        typeof response.AccountName === "string" &&
        response.MemberNumber !== currentAccount
      ) {
        const error = `Attempting to load ${modIdentifier} with different account than already loaded (${response.MemberNumber} vs ${currentAccount}). This is not supported, please refresh the page.`;
        logger.error(error);
        alert(error);
        throw new Error(error);
      }
      return next(args);
    });
    const injectedStyles = document.createElement("style");
    injectedStyles.innerHTML = css;
    document.head.appendChild(injectedStyles);
    ServerPlayerSync();
    loadOrGenerateSettings();
    initSettingsScreen();
    initScreens([]);
    hooks_default();
    logger.info(`Ready.`);
    window.modLoadFlag = true;
  };
  initWait();
})();
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
