(function () {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var bcmodsdk = {};

	(function (exports) {
		(function(){const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return !!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o));}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name);}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return (0, eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c};}return {hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else {let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o;}return ((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router;}return r}function d(){for(const o of i.values())o.precomputed=s(o);}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d();}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d());}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d();})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d();})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return (Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y})();
	} (bcmodsdk));
	var t$1 = getDefaultExportFromCjs(bcmodsdk);

	class Logger {
	    constructor() {
	        this.logsArray = [];
	        this.maxLogSize = 100;
	    }
	    log(level, message, logFunction) {
	        const timestamp = new Date().toISOString();
	        const logEntry = {
	            message,
	            level,
	            version: "2.0.3",
	            timestamp,
	        };
	        logFunction(`%c${"ABCL"}:`, `font-weight: bold; color: #f6cbde;`, logEntry);
	        this.logsArray.push(logEntry);
	        if (this.logsArray.length > this.maxLogSize) {
	            this.logsArray.shift();
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
	        return this.logsArray;
	    }
	}
	const logger = new Logger();

	var ItemDefinitions = {
		BabyItems: [
			"Bows Dress",
			"Babydoll Dress",
			"Puffy Dress",
			"Shiny dress",
			"Summmer flower dress",
			"Adult Baby Harness",
			"Tutu",
			"Frilled Bikni",
			"Cosplay Girl Suit",
			"Padded Mittens",
			"Paw Mittens",
			"Short Smooth Leather Mittens",
			"Changing Table",
			"Crib",
			"Fox Plush",
			"Bunny Plush",
			"Shark Plush"
		],
		Pants: [
			"Long Leggings",
			"Short Leggings",
			"Business Trousers",
			"Latex Pants",
			"Long Latex Pants",
			"Ripped Jeans",
			"Jeans",
			"Pajama"
		]
	};
	var DiaperColors = {
		clean: "#8F8F8F",
		middlewet: "#ffe58b",
		maximumwet: "#ffd33e",
		middlemess: "#423019",
		maximummess: "#3C302C",
		selfwet: "#242103",
		selfmess: "#1f170d"
	};
	var DiaperSizeScale = {
		none: 0,
		small: 300,
		regular: 500,
		overnight: 800,
		light_adult: 900,
		moderate_adult: 1500,
		heavy_adult: 2500,
		specialized: 3500
	};
	var Diapers = {
		"Patterned Diaper": {
			primaryColor: 1,
			size: "overnight"
		},
		"Bulky Diaper": {
			primaryColor: 1,
			secondaryColor: 0,
			size: "light_adult"
		},
		"Bulky Chastity Diaper": {
			primaryColor: 1,
			secondaryColor: 0,
			size: "moderate_adult"
		},
		"Poofy Diaper": {
			primaryColor: 1,
			secondaryColor: 0,
			size: "light_adult"
		},
		"Poofy Chastity Diaper 1": {
			primaryColor: 1,
			secondaryColor: 0,
			size: "heavy_adult"
		},
		"Poofy Chastity Diaper": {
			primaryColor: 1,
			secondaryColor: 0,
			size: "moderate_adult"
		},
		"Plastic Covered Diaper": {
			primaryColor: 0,
			size: "light_adult"
		},
		"Satin Covered Diaper": {
			primaryColor: 0,
			size: "light_adult"
		},
		Diaper: {
			size: "regular"
		},
		"Diaper Harness": {
			size: "none"
		}
	};
	var abclData = {
		ItemDefinitions: ItemDefinitions,
		DiaperColors: DiaperColors,
		DiaperSizeScale: DiaperSizeScale,
		Diapers: Diapers
	};

	const ABCLdata = abclData;
	const loopInterval = 60 * 1000;

	const ModVersion = "2.0.3";
	const ModName = "ABCL";
	const ModRepo = "https://github.com/zoe-64/ABCL";
	const ModIdentifier = "ABCL";

	const MetabolismSettings = {
	    Disabled: "Disabled",
	    Normal: "Normal",
	    Slow: "Slow",
	    Fast: "Fast",
	    Faster: "Faster",
	    Fastest: "Fastest",
	};
	const DiaperSettingValues = {
	    Deny: "Deny",
	    Ask: "Ask",
	    Allow: "Allow",
	};
	const MetabolismSettingValues = {
	    Disabled: 0,
	    Slow: 0.5,
	    Normal: 1,
	    Fast: 1.5,
	    Faster: 2,
	    Fastest: 3,
	};
	var PermissionLevels;
	(function (PermissionLevels) {
	    PermissionLevels[PermissionLevels["Anyone"] = 0] = "Anyone";
	    PermissionLevels[PermissionLevels["ItemPermission"] = 1] = "ItemPermission";
	    PermissionLevels[PermissionLevels["Friends"] = 2] = "Friends";
	    PermissionLevels[PermissionLevels["Lovers"] = 3] = "Lovers";
	    // TODO: Mistress = 4 Perhaps counts mistress as BCX Mistresses, BCC Caretakers, etc
	    PermissionLevels[PermissionLevels["Owner"] = 5] = "Owner";
	    PermissionLevels[PermissionLevels["Self"] = 6] = "Self";
	})(PermissionLevels || (PermissionLevels = {}));

	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	var root = freeGlobal || freeSelf || Function('return this')();

	var Symbol = root.Symbol;

	var objectProto$a = Object.prototype;
	var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
	var nativeObjectToString$1 = objectProto$a.toString;
	var symToStringTag$1 = Symbol ? Symbol.toStringTag : undefined;
	function getRawTag(value) {
	  var isOwn = hasOwnProperty$8.call(value, symToStringTag$1),
	      tag = value[symToStringTag$1];
	  try {
	    value[symToStringTag$1] = undefined;
	    var unmasked = true;
	  } catch (e) {}
	  var result = nativeObjectToString$1.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag$1] = tag;
	    } else {
	      delete value[symToStringTag$1];
	    }
	  }
	  return result;
	}

	var objectProto$9 = Object.prototype;
	var nativeObjectToString = objectProto$9.toString;
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	var symbolTag = '[object Symbol]';
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	var isArray = Array.isArray;

	var reWhitespace = /\s/;
	function trimmedEndIndex(string) {
	  var index = string.length;
	  while (index-- && reWhitespace.test(string.charAt(index))) {}
	  return index;
	}

	var reTrimStart = /^\s+/;
	function baseTrim(string) {
	  return string
	    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
	    : string;
	}

	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	var NAN = 0 / 0;
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	var reIsBinary = /^0b[01]+$/i;
	var reIsOctal = /^0o[0-7]+$/i;
	var freeParseInt = parseInt;
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = baseTrim(value);
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	function identity(value) {
	  return value;
	}

	var asyncTag = '[object AsyncFunction]',
	    funcTag$1 = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  var tag = baseGetTag(value);
	  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	var coreJsData = root['__core-js_shared__'];

	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	var funcProto$2 = Function.prototype;
	var funcToString$2 = funcProto$2.toString;
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString$2.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	var funcProto$1 = Function.prototype,
	    objectProto$8 = Object.prototype;
	var funcToString$1 = funcProto$1.toString;
	var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
	var reIsNative = RegExp('^' +
	  funcToString$1.call(hasOwnProperty$7).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	var objectCreate = Object.create;
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	var HOT_COUNT = 800,
	    HOT_SPAN = 16;
	var nativeNow = Date.now;
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;
	  return function() {
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
	    return func.apply(undefined, arguments);
	  };
	}

	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};
	var baseSetToString$1 = baseSetToString;

	var setToString = shortOut(baseSetToString$1);

	var MAX_SAFE_INTEGER$1 = 9007199254740991;
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	function isIndex(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER$1 : length;
	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}

	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	var objectProto$7 = Object.prototype;
	var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty$6.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});
	  var index = -1,
	      length = props.length;
	  while (++index < length) {
	    var key = props[index];
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;
	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	var nativeMax$1 = Math.max;
	function overRest(func, start, transform) {
	  start = nativeMax$1(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax$1(args.length - start, 0),
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
	    return apply(func, this, otherArgs);
	  };
	}

	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	var MAX_SAFE_INTEGER = 9007199254740991;
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
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

	var objectProto$6 = Object.prototype;
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$6;
	  return value === proto;
	}

	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	var argsTag$1 = '[object Arguments]';
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag$1;
	}

	var objectProto$5 = Object.prototype;
	var hasOwnProperty$5 = objectProto$5.hasOwnProperty;
	var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty$5.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};
	var isArguments$1 = isArguments;

	function stubFalse() {
	  return false;
	}

	var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;
	var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;
	var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
	var Buffer$1 = moduleExports$2 ? root.Buffer : undefined;
	var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : undefined;
	var isBuffer = nativeIsBuffer || stubFalse;

	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag$1 = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;
	var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;
	var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
	var freeProcess = moduleExports$1 && freeGlobal.process;
	var nodeUtil = (function() {
	  try {
	    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;
	    if (types) {
	      return types;
	    }
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	var objectProto$4 = Object.prototype;
	var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments$1(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;
	  for (var key in value) {
	    if ((inherited || hasOwnProperty$4.call(value, key)) &&
	        !(skipIndexes && (
	           key == 'length' ||
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var objectProto$3 = Object.prototype;
	var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];
	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty$3.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	var nativeCreate = getNative(Object, 'create');

	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
	var objectProto$2 = Object.prototype;
	var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED$1 ? undefined : result;
	  }
	  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
	}

	var objectProto$1 = Object.prototype;
	var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$1.call(data, key);
	}

	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	var arrayProto = Array.prototype;
	var splice = arrayProto.splice;
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
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

	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	  return index < 0 ? undefined : data[index][1];
	}

	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	var Map$1 = getNative(root, 'Map');

	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map$1 || ListCache),
	    'string': new Hash
	  };
	}

	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;
	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	var getPrototype = overArg(Object.getPrototypeOf, Object);

	var objectTag = '[object Object]';
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	var funcToString = funcProto.toString;
	var hasOwnProperty = objectProto.hasOwnProperty;
	var objectCtorString = funcToString.call(Object);
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);
	  this.size = data.size;
	  return result;
	}

	function stackGet(key) {
	  return this.__data__.get(key);
	}

	function stackHas(key) {
	  return this.__data__.has(key);
	}

	var LARGE_ARRAY_SIZE = 200;
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	var moduleExports = freeModule && freeModule.exports === freeExports;
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
	  buffer.copy(result);
	  return result;
	}

	var Uint8Array = root.Uint8Array;

	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
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

	var baseFor = createBaseFor();

	var now = function() {
	  return root.Date.now();
	};

	var FUNC_ERROR_TEXT = 'Expected a function';
	var nativeMax = Math.max,
	    nativeMin = Math.min;
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }
	  function leadingEdge(time) {
	    lastInvokeTime = time;
	    timerId = setTimeout(timerExpired, wait);
	    return leading ? invokeFunc(time) : result;
	  }
	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        timeWaiting = wait - timeSinceLastCall;
	    return maxing
	      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
	      : timeWaiting;
	  }
	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }
	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }
	  function trailingEdge(time) {
	    timerId = undefined;
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }
	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }
	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }
	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;
	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        clearTimeout(timerId);
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	function safeGet(object, key) {
	  if (key === 'constructor' && typeof object[key] === 'function') {
	    return;
	  }
	  if (key == '__proto__') {
	    return;
	  }
	  return object[key];
	}

	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}

	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = safeGet(object, key),
	      srcValue = safeGet(source, key),
	      stacked = stack.get(srcValue);
	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;
	  var isCommon = newValue === undefined;
	  if (isCommon) {
	    var isArr = isArray(srcValue),
	        isBuff = !isArr && isBuffer(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray(srcValue);
	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      }
	      else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      }
	      else {
	        newValue = [];
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments$1(srcValue)) {
	      newValue = objValue;
	      if (isArguments$1(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || isFunction(objValue)) {
	        newValue = initCloneObject(srcValue);
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}

	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  baseFor(source, function(srcValue, key) {
	    stack || (stack = new Stack);
	    if (isObject(srcValue)) {
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
	        : undefined;
	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  }, keysIn);
	}

	var merge = createAssigner(function(object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});

	const defaultSettings = {
	    PeeMetabolism: MetabolismSettings.Normal,
	    PoopMetabolism: MetabolismSettings.Normal,
	    OpenRemoteSettings: false,
	    LockedOutOfSettings: false,
	    DisableWettingLeaks: false,
	    DisableSoilingLeaks: true,
	    OnDiaperChange: DiaperSettingValues.Ask,
	    visibleMessages: {
	        changeDiaper: true,
	        checkDiaper: true,
	        lickPuddle: true,
	        wetDiaper: true,
	        wetClothing: true,
	        soilDiaper: true,
	        soilClothing: true,
	        usePotty: true,
	        useToilet: true,
	        wipePuddle: true,
	    },
	};
	const defaultStats = {
	    PuddleSize: {
	        value: 0,
	    },
	    Bladder: {
	        value: 0, // in ml
	        size: 300, // in ml, quite arbitrary
	    },
	    Bowel: {
	        value: 0, // in ml
	        size: 200, // in ml
	    },
	    Soiliness: {
	        value: 0, // in ml
	    },
	    Wetness: {
	        value: 0, // in ml
	    },
	    WaterIntake: {
	        value: 300 / 20, // accident every 20 minutes
	    },
	    FoodIntake: {
	        value: 200 / 60,
	    },
	    Incontinence: {
	        value: 0,
	    },
	    MentalRegression: {
	        value: 0,
	    },
	};
	const defaultData = {
	    Settings: defaultSettings,
	    Stats: defaultStats,
	};
	const updateData = (newData) => {
	    Player["ABCL"] = merge(Player["ABCL"] || defaultData, newData);
	    syncData();
	};
	const syncData = debounce(() => {
	    const compressed = LZString.compressToBase64(JSON.stringify(Player["ABCL"]));
	    Player.ExtensionSettings["ABCL"] = compressed;
	    ServerPlayerExtensionSettingsSync("ABCL");
	    sendUpdateMyData();
	}, 1000);
	//const devMode = false; use clearData() // Manually toggle during local development if needed to clear settings
	const loadOrGenerateData = async () => {
	    const dataString = LZString.decompressFromBase64(Player.ExtensionSettings["ABCL"]);
	    const data = dataString
	        ? JSON.parse(dataString)
	        : {
	            Settings: {},
	            Stats: {},
	        };
	    // migrations
	    if (data.ModVersion === "2.0.0") {
	        const metabolismValue = data.Settings.Metabolism;
	        const disableWetting = data.Settings.DisableWetting;
	        data.Settings = {
	            ...Object.fromEntries(Object.entries(data.Settings)
	                .filter(([key]) => !["DisableWetting", "DisableSoiling", "Metabolism", "CaregiverIDs"].includes(key))
	                .map(([key, { value }]) => [key, value])),
	            PeeMetabolism: disableWetting ? "Disabled" : metabolismValue,
	            PoopMetabolism: disableWetting ? "Disabled" : metabolismValue,
	        };
	        data.ModVersion = undefined;
	        data.Version = "2.0.1";
	    }
	    const modStorageObject = merge({
	        Settings: defaultSettings,
	        Stats: defaultStats,
	        Version: "2.0.3",
	    }, data);
	    logger.debug({ message: "Merged settings object", modStorageObject });
	    Player["ABCL"] = modStorageObject;
	};
	const clearData = () => {
	    Player.ExtensionSettings["ABCL"] = "N4XyA==="; // Empty object compressed
	    ServerPlayerExtensionSettingsSync("ABCL");
	    logger.warn("cleared data");
	};

	const bcModSDK = t$1.registerMod({
	    name: ModName,
	    fullName: ModName,
	    version: ModVersion,
	    repository: ModRepo,
	});
	var HookPriority;
	(function (HookPriority) {
	    HookPriority[HookPriority["OBSERVE"] = 0] = "OBSERVE";
	    HookPriority[HookPriority["ADD_BEHAVIOR"] = 1] = "ADD_BEHAVIOR";
	    HookPriority[HookPriority["MODIFY_BEHAVIOR"] = 5] = "MODIFY_BEHAVIOR";
	    HookPriority[HookPriority["OVERRIDE_BEHAVIOR"] = 10] = "OVERRIDE_BEHAVIOR";
	    HookPriority[HookPriority["TOP"] = 100] = "TOP";
	})(HookPriority || (HookPriority = {}));
	async function waitFor(func, cancelFunc = () => false) {
	    while (!func()) {
	        if (cancelFunc())
	            return false;
	        await new Promise(resolve => setTimeout(resolve, 10));
	    }
	    return true;
	}
	const sendChatLocal = (message, classes = [], style) => {
	    if (!ServerPlayerIsInChatRoom())
	        return;
	    const msgElement = document.createElement("div");
	    msgElement.innerHTML = message
	        .split("\n")
	        .map(line => line.trim())
	        .join("<br/>");
	    msgElement.classList.add(`${"ABCL"}LocalMessage`, "ChatMessage", ...classes);
	    if (style) {
	        msgElement.style.cssText = style;
	    }
	    document.querySelector("#TextAreaChatLog")?.appendChild(msgElement);
	    ElementScrollToEnd("TextAreaChatLog");
	};
	// might be useful
	class Saver {
	    constructor(allowedSaveInterval) {
	        this.lastSaveTime = 0;
	        this.allowedSaveInterval = allowedSaveInterval;
	    }
	    save() {
	        if (Date.now() - this.lastSaveTime > this.allowedSaveInterval) {
	            syncData();
	            this.lastSaveTime = Date.now();
	        }
	    }
	}
	const waitForElement = async (selector, options = {}) => {
	    return new Promise((resolve, reject) => {
	        const element = document.querySelector(selector);
	        if (element) {
	            resolve(element);
	            return;
	        }
	        const observer = new MutationObserver(() => {
	            const target = document.querySelector(selector);
	            if (target && (!options.childCheck || target.childElementCount > 0)) {
	                observer.disconnect();
	                clearTimeout(timeoutId);
	                resolve(target);
	            }
	        });
	        observer.observe(document.body, { childList: true, subtree: true });
	        const timeoutId = setTimeout(() => {
	            observer.disconnect();
	            console.warn(`Element with selector "${selector}" not found within timeout`);
	        }, options.timeout || 10000);
	    });
	};
	const generateUniqueID = (identifier) => {
	    identifier = identifier || "ABCL";
	    return `${identifier}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	};
	// similar to saver but limits how often a function can be called
	class Debouncer {
	    constructor(allowedCallInterval) {
	        this.lastCallTime = 0;
	        this.allowedCallInterval = allowedCallInterval;
	    }
	    check() {
	        if (Date.now() - this.lastCallTime > this.allowedCallInterval) {
	            this.lastCallTime = Date.now();
	            return true;
	        }
	        return false;
	    }
	    reset() {
	        this.lastCallTime = 0;
	    }
	    isReady() {
	        return Date.now() - this.lastCallTime > this.allowedCallInterval;
	    }
	}
	// input can be "default", null, hex code, an array of hexes, an array of default
	// expect to be given the asset, in asset there's a default color
	// return a hex color
	const isColorable = (color) => color !== "Default" && typeof color === "string";
	const getColor = (color, asset) => {
	    if (typeof color === "string" && color !== "Default")
	        logger.warn(`Unknown color: ${color}`);
	    if (!color || color === "Default")
	        return [...asset.DefaultColor.map(color => (color === "Default" ? "#FFFFFF" : color))];
	    if (Array.isArray(color)) {
	        return color.map(mappedColor => {
	            if (mappedColor === "Default") {
	                return "#FFFFFF";
	            }
	            return mappedColor;
	        });
	    }
	    return [color];
	};
	const getElement = (parent, selector) => {
	    const element = parent.querySelector(selector);
	    if (element)
	        return element;
	    throw new Error(`Element with selector "${selector}" not found`);
	};

	function getComputedColor(variable) {
	    const style = getComputedStyle(document.documentElement);
	    let color = style.getPropertyValue(variable).trim();
	    if (!color)
	        return "";
	    // Convert HEX to HSL
	    if (color.startsWith("#")) {
	        return hexToHsl(color);
	    }
	    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
	    if (rgbMatch) {
	        const [r, g, b] = rgbMatch.slice(1, 4).map(Number);
	        return rgbToHsl(r, g, b);
	    }
	    const hslMatch = color.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
	    if (hslMatch)
	        return color;
	    return "";
	}
	function hexToHsl(hex) {
	    let r = 0, g = 0, b = 0;
	    if (hex.length === 7) {
	        r = parseInt(hex.substring(1, 3), 16);
	        g = parseInt(hex.substring(3, 5), 16);
	        b = parseInt(hex.substring(5, 7), 16);
	    }
	    return rgbToHsl(r, g, b);
	}
	function rgbToHsl(r, g, b) {
	    (r /= 255), (g /= 255), (b /= 255);
	    let max = Math.max(r, g, b), min = Math.min(r, g, b);
	    let h = 0, s, l = (max + min) / 2;
	    if (max === min) {
	        h = s = 0;
	    }
	    else {
	        let d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch (max) {
	            case r:
	                h = (g - b) / d + (g < b ? 6 : 0);
	                break;
	            case g:
	                h = (b - r) / d + 2;
	                break;
	            case b:
	                h = (r - g) / d + 4;
	                break;
	        }
	        h *= 60;
	    }
	    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
	}
	function adjustLightness(baseColor, adjustment) {
	    const hslMatch = baseColor.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
	    if (!hslMatch)
	        return baseColor;
	    let h = parseInt(hslMatch[1], 10);
	    let s = parseInt(hslMatch[2], 10);
	    let l = parseInt(hslMatch[3], 10);
	    l = Math.min(100, Math.max(0, l + adjustment));
	    return `hsl(${h}, ${s}%, ${l}%)`;
	}
	function generateDynamicCSSVariables(property, sourceVariable, fallbackColor) {
	    let baseColor = getComputedColor(sourceVariable);
	    if (!baseColor)
	        baseColor = fallbackColor;
	    const lightnessAdjustments = {
	        50: 50,
	        100: 40,
	        200: 30,
	        300: 20,
	        400: 10,
	        500: 5,
	        600: 0,
	        700: -10,
	        800: -20,
	        900: -30,
	        950: -40,
	    };
	    return Object.entries(lightnessAdjustments)
	        .map(([strength, adjustment]) => `  --sl-${property}-${strength}: ${adjustLightness(baseColor, adjustment)};`)
	        .join("\n");
	}
	const createCSS = () => {
	    const shoelaceOverides = generateDynamicCSSVariables("color-primary", "--tmd-accent", hexToHsl("#0284c7")) +
	        generateDynamicCSSVariables("color-neutral", "--tmd-element", hexToHsl("#52525b"));
	    const fontColor = "var(--tmd-text, --sl-color-neutral-700)";
	    const sliders = [
	        {
	            className: "SoilinessPercentage",
	            primary: "#d1aa98ff",
	            secondary: "#ab674aff",
	        },
	        {
	            className: "WetnessPercentage",
	            primary: "#f3e1aeff",
	            secondary: "#e7c463ff",
	        },
	        {
	            className: "BowelFullness",
	            primary: "#b7795cff",
	            secondary: "#7c4c36ff",
	        },
	        {
	            className: "BladderFullness",
	            primary: "#eacd73ff",
	            secondary: "#cba01eff",
	        },
	        {
	            className: "Incontinence",
	            primary: "#eeacacff",
	            secondary: "#cb5b5bff",
	        },
	        {
	            className: "MentalRegression",
	            primary: "#e6bff1ff",
	            secondary: "#ad74beff",
	        },
	    ];
	    let cssSliders = "";
	    for (const slider of sliders) {
	        cssSliders += `
  .${"ABCL"}${slider.className} {
    margin-bottom: 10px;
    margin-top: 3px;
  }
	.${"ABCL"}${slider.className}::part(base) {
		background-color: ${slider.primary};
	}
  .${"ABCL"}${slider.className}::part(indicator) {
    background-color: ${slider.secondary};
  }`;
	    }
	    return `
#ABCLCurrentPlayerSelect {
  margin-bottom: 5px;
}

.ABCLOverlay {
	aspect-ratio: 2/1;
	max-width: 100%;
	max-height: 100%;
	margin: auto;
	position: relative;
	transform: translateY(-50%);
	top: 50%;
	pointer-events: none;
  font-family: arial;
  color: ${fontColor};
  order: 100;
  z-index: 10000;
}
.ABCLWindowHeaderTitle {
  margin: 5px;
  font-size: 32px;
  font-weight: bold;
}

.ABCLOpenStatsButton {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
  aspect-ratio: 1/1;
  width: 4%;
  white-space: collapse;
  text-align: center;
  border-radius: 5px;
  background: #ffffffa6;
  border: #e3e3e3 1px solid;
  backdrop-filter: blur(4px);
  pointer-events: all;
  font-size: clamp(9px, 1.3vw, 43px);
  cursor: pointer;
}
.ABCLOpenStatsButton:hover {
  background: #ffffffd1;
}
.ABCLWindowClose {
  aspect-ratio: 1/1;
  background: transparent;
  height: 29px;
  border-radius: 0px 4px 0 0;
  position: absolute;
  right: 0px;
  top: 0px;
  border: none;
  border-left: 1px #0000003d solid;
}
.ABCLWindowMinimize {
  aspect-ratio: 1/1;
  background: transparent;
  height: 29px;
  border-radius: 0px 0px 0 0;
  position: absolute;
  right: 30px;
  top: 0px;
  border: none;
  border-left: 1px #0000003d solid;
}
.ABCLWindowHeader {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 29px 24px;
  margin: -6px;
  padding: 5px;
  border: 1px #0000003d solid;
  border-radius: 6px 6px 0 0;
}
.ABCLNotification {
	background-color: white;
	width: fit-content;
	text-align: center;
	margin: auto;
	z-index: 10000;
	position: absolute;
	bottom: 30px;
	left: 25%;
	transform: translateX(-50%);
	border: 1px solid black;
	display: grid;
	grid-template-columns: 30px 1fr;
	padding: 5px;
	pointer-events: all;
}

.ABCLPrompt {
  background: white;
  width: fit-content;
  padding: 6px;
  border: 1px solid black;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
	pointer-events: all;
}
.ABCLButton {
  border: 1px #020202 solid;
  padding: 3px;
  margin: 4px;
  aspect-ratio: 3/2;
  width: 38px;
  cursor: pointer;
}
.ABCLPromptYes {
  background: #5ae85a;
  color: black;
}
.ABCLPromptNo {
  background: #ff4b4b;
  color: white;
}

.ABCLClose:hover {
  background: #ff4b4b;
  color: white;
  cursor: pointer;
}

.ABCLStatsWindow {
  width: 200px;
  height: fit-content;
  padding: 5px;
  background: #ffffffa6;
  border: #e3e3e3 1px solid;
  pointer-events: all;
  position: fixed;
  backdrop-filter: blur(4px);
  border-radius: 6px;
  box-shadow: 0 4px 5px 1px #00000014;
}

.ABCLSettingPage {
  width: 81%;
  margin: 6% auto;
  pointer-events: all;
}
.ABCLAddCaregiver {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 25rem;
}
.ABCLAddCaregiverButton {
  margin-left: 5px;
}
.ABCLAddCaregiverInput {
  margin-right: 5px;
  flex: 1;
}
.ABCLCaregiverLabel {
  margin-top: 1em;
  display: block;
}
.ABCLCaregiverList {
  list-style: none;
  border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  border-radius: var(--sl-input-border-radius-medium);
  padding: 0rem 0rem;
  width: fit-content;
  min-width: 17em;
  max-height: 15em;
  overflow-y: scroll;
  font-size: var(--sl-button-font-size-medium);
  line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
}
.ABCLCaregiver {
  padding: 0.3rem;
  border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  display: flex;
}
.ABCLRemoveCaregiver {
  aspect-ratio: 1;
  width: fit-content;
  margin-left: 0.5em;
}
.ABCLCaregiverName {
  flex: 1;
}
.ABCLRemoveCaregiver::part(base) {
  background: #ff7b7b;
  color: white;
  font-weight: bold;
}
.ABCLSettingPage sl-checkbox {
  display: block;
  margin: 1rem 0;
  width: fit-content;
}
.sl-theme-light, .sl-theme-dark {
  --sl-toggle-size-small: 0.875rem;
  --sl-toggle-size-medium: 1.125rem;
  --sl-toggle-size-large: 1.375rem;

  --sl-input-height-small: 1.875em;
  --sl-input-height-medium: 2.5em;
  --sl-input-height-large: 3.125em;

  --sl-letter-spacing-loose: 0.075em;
  --sl-letter-spacing-looser: 0.15em;

  --sl-font-size-large: 1.25em;
  --sl-font-size-x-large: 1.5em;
  --sl-font-size-2x-large: 2.25em;
  --sl-font-size-3x-large: 3em;
  --sl-font-size-4x-large: 4.5em;
  
  --sl-spacing-3x-small: 0.125em;
  --sl-spacing-2x-small: 0.25em;
  --sl-spacing-x-small: 0.5em;
  --sl-spacing-small: 0.75em;
  --sl-spacing-medium: 1em;
  --sl-spacing-large: 1.25em;
  --sl-spacing-x-large: 1.75em;
  --sl-spacing-2x-large: 2.25em;
  --sl-spacing-3x-large: 3em;
  --sl-spacing-4x-large: 4.5em;

  --sl-border-radius-small: 0.1875em;
  --sl-border-radius-medium: 0.25em;
  --sl-border-radius-large: 0.5em;
  --sl-border-radius-x-large: 1em;

  --sl-font-size-2x-small: 1.2vmin;
  --sl-font-size-x-small: 1.4vmin;
  --sl-font-size-small: 1.6vmin;
  --sl-font-size-medium: 1.6vmin;
  --sl-font-size-large: 2.5vmin;
  --sl-font-size-x-large: 3vmin;
  --sl-font-size-2x-large: 4.5vmin;
  --sl-font-size-3x-large: 6vmin;
  --sl-font-size-4x-large: 9vmin;
}
.ABCLoverlay sl-tab,.ABCLoverlay sl-radio-button,.ABCLoverlay sl-checkbox {
  pointer-events: all;
}



.ABCLMessageVisibility {
  margin-top: 1em
}

${cssSliders}

.ABCLHidden {
  display: none !important;
}
:root, :host, .sl-theme-light, .sl-theme-dark {
${shoelaceOverides}
}

.ABCLoverlay sl-radio-button::part(button),
  .ABCLoverlay sl-tab::part(base), 
  .ABCLoverlay sl-tab::part(base).tab {
  background-color: var(--tmd-element,  var(--sl-color-neutral-0));
  color: var(--tmd-text,  var(--sl-color-neutral-700));
}
.ABCLoverlay sl-radio-button::part(label) {
  color: var(--tmd-text,  var(--sl-color-neutral-700));
}
.ABCLoverlay sl-tab::part(base) {
  color: var(--tmd-text, --sl-color-neutral-700);
  background-color: var(--tmd-element-hover,  var(--sl-color-neutral-0));
}
.ABCLoverlay sl-tab::part(base):hover {
  color: var(--tmd-text, --sl-color-neutral-0);
  background-color: var(--tmd-element-hover,  var(--sl-color-primary-600));
}

sl-radio-button::part(button), sl-tab::part(base) {
  color: var(--tmd-text, --sl-color-neutral-700);
  background-color: var(--tmd-element,  var(--sl-color-neutral-0));
  
}
sl-tab::part(base) {
  border-radius: 0;
}
sl-radio-button::part(button) {
    border: var(--tmd-element,  var(--sl-color-neutral-200)) 1px solid;
}

sl-radio-button::part(button):hover, sl-tab::part(base):hover {
  color: var(--tmd-text, --sl-color-neutral-0);
  background-color: var(--tmd-element-hover,  var(--sl-color-primary-600));
}
sl-radio-button::part(button):hover {
  border: var(--tmd-element-hover,  var(--sl-color-primary-600)) 1px solid;
}

sl-radio-button::part(button--checked), sl-tab[aria-selected="true"]::part(base) {
  color: var(--tmd-text, --sl-color-neutral-0);
  background-color: var(--tmd-accent,  var(--sl-color-primary-600));
}
sl-radio-button::part(button--checked):hover ,sl-tab[aria-selected="true"]::part(base):hover {
  background-color: var(--tmd-accent-hover);
}

sl-button::part(base) {
  background-color: var(--tmd-element,  var(--sl-color-neutral-0));
  border-color: var(--tmd-accent,  var(--sl-color-primary-600));
}
sl-button::part(base):hover {
   background-color: var(--tmd-element-hover,  var(--sl-color-primary-600));
   border-color: var(--tmd-accent-hover,  var(--sl-color-primary-600));
}
sl-button::part(base):active {
  background-color: var(--tmd-accent-hover,  var(--sl-color-primary-700));
  border-color: var(--tmd-accent-hover,  var(--sl-color-primary-700));
}
sl-button::part(label) {
  color: var(--tmd-text,  var(--sl-color-neutral-700));
}
sl-button::part(label) {
  color: var(--tmd-text,  var(--sl-color-neutral-700));
}
sl-button {
    margin: 0.5em 0;
}
sl-drawer::part(panel) {
  background-color: var(--tmd-element,  var(--sl-color-neutral-0));
}
sl-checkbox::part(control--checked) {
  border-color: var(--tmd-accent-hover,  var(--sl-color-primary-600));
  background-color: var(--tmd-accent,  var(--sl-color-primary-600))
}

/* sorry fusam */
#fusam-addon-manager-container {
  position: absolute;
  top: 0;
}
`;
	};

	// luv you zoi <3
	const getCharacter = (identifier) => {
	    if (!identifier)
	        return;
	    if (typeof identifier === "object")
	        return identifier;
	    const characters = ChatRoomCharacter.filter(Character => {
	        const name = Character.Name.toLowerCase();
	        const nickname = Character.Nickname?.toLowerCase();
	        const identifierString = `${identifier}`.toLowerCase();
	        return (Character.MemberNumber == identifier ||
	            name === identifierString ||
	            nickname === identifierString ||
	            name.startsWith(identifierString) ||
	            nickname?.startsWith(identifierString));
	    });
	    return characters[0];
	};
	const targetInputExtractor = (parsed) => {
	    const name = parsed.join(" ");
	    const character = getCharacter(name);
	    if (!character) {
	        return;
	    }
	    return character;
	};
	const isABCLPlayer = (character, strict, version = Player.ABCL.Version) => {
	    return Boolean(character?.ABCL && (!strict || character.ABCL.Version === version));
	};
	function getCharacterName(memberNumber) {
	    if (!memberNumber) {
	        return "Unknown";
	    }
	    const character = getCharacter(memberNumber);
	    if (!character) {
	        return "Unknown";
	    }
	    return character.Nickname ? character.Nickname : character.Name;
	}
	// luv you sera <3
	function replace_template(text, source = null, fallbackSourceName = "") {
	    let result = text;
	    let pronounItem = CharacterPronounDescription(Player);
	    let isPlayerMale = pronounItem === "He/Him";
	    let possessive = isPlayerMale ? "His" : "Her";
	    let intensive = isPlayerMale ? "Him" : "Her";
	    let pronoun = isPlayerMale ? "He" : "She";
	    let opp_pronounItem = !source ? "They/Them" : CharacterPronounDescription(source);
	    let isOppMale = opp_pronounItem === "He/Him";
	    let oppName = source?.IsPlayer() ? (isOppMale ? "himself" : "herself") : !!source ? CharacterNickname(source) : fallbackSourceName;
	    let oppPossessive = isOppMale ? "His" : "Her";
	    let oppIntensive = source == Player ? (isOppMale ? "Himself" : "Herself") : isOppMale ? "Him" : "Her";
	    let oppPronoun = isOppMale ? "He" : "She";
	    return result
	        .replaceAll("%NAME%", CharacterNickname(Player))
	        .replaceAll("%POSSESSIVE%", possessive.toLocaleLowerCase())
	        .replaceAll("%PRONOUN%", pronoun.toLocaleLowerCase())
	        .replaceAll("%INTENSIVE%", intensive.toLocaleLowerCase())
	        .replaceAll("%CAP_POSSESSIVE%", possessive)
	        .replaceAll("%CAP_PRONOUN%", pronoun)
	        .replaceAll("%CAP_INTENSIVE%", intensive)
	        .replaceAll("%OPP_NAME%", oppName)
	        .replaceAll("%OPP_PRONOUN%", oppPronoun.toLocaleLowerCase())
	        .replaceAll("%OPP_POSSESSIVE%", oppPossessive.toLocaleLowerCase())
	        .replaceAll("%OPP_INTENSIVE%", oppIntensive.toLocaleLowerCase())
	        .replaceAll("%CAP_OPP_PRONOUN%", oppPronoun)
	        .replaceAll("%CAP_OPP_POSSESSIVE%", oppPossessive)
	        .replaceAll("%CAP_OPP_INTENSIVE%", oppIntensive);
	}
	function SendAction(action, sender = null, messageType, target) {
	    let msg = replace_template(action, sender);
	    if (!messageType) {
	        ServerSend("ChatRoomChat", {
	            Content: "Beep",
	            Type: "Action",
	            Dictionary: [
	                // EN
	                { Tag: "Beep", Text: "msg" },
	                // CN
	                { Tag: "发送私聊", Text: "msg" },
	                // DE
	                { Tag: "Biep", Text: "msg" },
	                // FR
	                { Tag: "Sonner", Text: "msg" },
	                // Message itself
	                { Tag: "msg", Text: msg },
	            ],
	        });
	        return;
	    }
	    sendChatLocal(msg, ["ChatMessageAction", "ChatMessageNonDialogue"], "--label-color:#ff4949");
	    if (abclPlayer.settings.getPublicMessage(messageType)) {
	        sendDataToAction("onABCLMessage", msg);
	    }
	    else if (target && target.MemberNumber !== Player.MemberNumber) {
	        sendDataToAction("onABCLMessage", msg, target.MemberNumber);
	    }
	}

	class ABCLStatsWindow {
	    constructor() {
	        this.folded = false;
	        this.statsDrawer = document.createElement("sl-drawer");
	        this.statsDrawer.innerHTML = `
    <p class="${"ABCL"}WindowHeaderTitle">Stats</p>
    <sl-select id="${"ABCL"}CurrentPlayerSelect" value="${Player.MemberNumber}">
    </sl-select>

  
		<div class="${"ABCL"}StatsWindowContent">
      <label id="SoilinessPercentage">Soiliness</label>
      <sl-progress-bar label="Soiliness" class="${"ABCL"}SoilinessPercentage"></sl-progress-bar>
      <label id="WetnessPercentage">Wetness</label>
      <sl-progress-bar label="Wetness" class="${"ABCL"}WetnessPercentage"></sl-progress-bar>
      <label id="BowelFullness">Bowel</label>
      <sl-progress-bar label="Bowel Fullness" class="${"ABCL"}BowelFullness"></sl-progress-bar>
      <label id="BladderFullness">Bladder</label>
      <sl-progress-bar label="Bladder Fullness" class="${"ABCL"}BladderFullness"></sl-progress-bar>
      <label id="Incontinence">Incontinence</label>
      <sl-progress-bar label="Incontinence" class="${"ABCL"}Incontinence"></sl-progress-bar>
      <label id="MentalRegression">Mental Regression</label>
      <sl-progress-bar label="Mental Regression" class="${"ABCL"}MentalRegression"></sl-progress-bar>
		</div>
   <sl-button class="${"ABCL"}RefreshButton">Refresh</sl-button>
	`;
	        overlay.appendChild(this.statsDrawer);
	        this.statsDrawer.querySelector(`#${"ABCL"}CurrentPlayerSelect`)?.addEventListener("sl-change", () => this.update());
	        this.statsDrawer.querySelector(`.${"ABCL"}RefreshButton`)?.addEventListener("click", () => this.update());
	        this.update();
	    }
	    close() {
	        this.statsDrawer.removeAttribute("open");
	    }
	    open(selectedPlayerId) {
	        this.statsDrawer.setAttribute("open", "true");
	        if (selectedPlayerId !== undefined) {
	            const currentPlayerSelect = this.statsDrawer.querySelector(`#${"ABCL"}CurrentPlayerSelect`);
	            if (currentPlayerSelect) {
	                currentPlayerSelect.value = selectedPlayerId.toString();
	            }
	        }
	        this.update();
	    }
	    async update() {
	        const currentPlayerSelect = this.statsDrawer.querySelector(`#${"ABCL"}CurrentPlayerSelect`);
	        if (!currentPlayerSelect)
	            return;
	        let selectedCharacter = getCharacter(currentPlayerSelect.value);
	        if (!selectedCharacter || !selectedCharacter?.ABCL) {
	            selectedCharacter = Player;
	        }
	        // fill select ChatRoomCharacter
	        currentPlayerSelect.innerHTML = "";
	        for (let character of ChatRoomCharacter) {
	            if (!character.ABCL)
	                continue;
	            currentPlayerSelect.innerHTML += `<sl-option value="${character.MemberNumber}">${getCharacterName(character.MemberNumber)}</sl-option>`;
	        }
	        const updateInput = (className, value) => {
	            value = Math.round(value);
	            const input = this.statsDrawer.querySelector(`.${"ABCL"}${className}`);
	            const label = this.statsDrawer.querySelector(`#${className}`);
	            if (!input || !label)
	                return;
	            const valueRounded = Math.round((value + Number.EPSILON) * 10) / 10;
	            if (value > 100) {
	                input.value = "100";
	                input.innerText = `overflowing ${Math.round((value - 100) / (value / 100))}%`;
	                label.innerText = `${label.innerText.split(":")[0]}: overflowing ${valueRounded - 100}%`;
	            }
	            else {
	                input.value = valueRounded.toString();
	                input.innerText = valueRounded.toString() + "%";
	                label.innerText = label.innerText.split(":")[0] + ": " + valueRounded.toString() + "%";
	            }
	        };
	        if (!selectedCharacter.ABCL) {
	            return;
	        }
	        if (hasDiaper(selectedCharacter)) {
	            updateInput("SoilinessPercentage", (selectedCharacter.ABCL.Stats.Soiliness.value / getPlayerDiaperSize(selectedCharacter)) * 100);
	            updateInput("WetnessPercentage", (selectedCharacter.ABCL.Stats.Wetness.value / getPlayerDiaperSize(selectedCharacter)) * 100);
	        }
	        else {
	            updateInput("SoilinessPercentage", 0);
	            updateInput("WetnessPercentage", 0);
	        }
	        updateInput("BowelFullness", (selectedCharacter.ABCL.Stats.Bowel.value / selectedCharacter.ABCL.Stats.Bowel.size) * 100);
	        updateInput("BladderFullness", (selectedCharacter.ABCL.Stats.Bladder.value / selectedCharacter.ABCL.Stats.Bladder.size) * 100);
	        updateInput("Incontinence", selectedCharacter.ABCL.Stats.Incontinence.value * 100);
	        updateInput("MentalRegression", selectedCharacter.ABCL.Stats.MentalRegression.value * 100);
	    }
	}
	class MovableElement {
	    constructor(element, resizable = false) {
	        this.newX = 0;
	        this.newY = 0;
	        this.oldX = 0;
	        this.oldY = 0;
	        this.isDragging = false;
	        this.isResizing = false;
	        this.resizeDirection = null;
	        this.edgeThreshold = 10; // Distance from the edge to trigger resizing
	        this.resizable = true;
	        this.element = element;
	        this.resizable = resizable;
	        // Bind methods to the instance
	        this.onMouseDown = this.onMouseDown.bind(this);
	        this.onMouseMove = this.onMouseMove.bind(this);
	        this.onMouseUp = this.onMouseUp.bind(this);
	        this.onMouseEnter = this.onMouseEnter.bind(this);
	        this.onMouseLeave = this.onMouseLeave.bind(this);
	        this.onMouseMoveForCursor = this.onMouseMoveForCursor.bind(this);
	        this.element.addEventListener("mousedown", this.onMouseDown);
	        this.element.addEventListener("mousemove", this.onMouseMoveForCursor);
	        this.element.style.position = "fixed";
	        if (!this.resizable) {
	            return;
	        }
	        this.element.style.resize = "none";
	        this.element.addEventListener("mouseenter", this.onMouseEnter);
	        this.element.addEventListener("mouseleave", this.onMouseLeave);
	    }
	    onMouseEnter(event) {
	        // Add mousemove listener for cursor updates
	        this.element.addEventListener("mousemove", this.onMouseMoveForCursor);
	    }
	    onMouseLeave(event) {
	        // Remove mousemove listener and reset cursor
	        this.element.removeEventListener("mousemove", this.onMouseMoveForCursor);
	        this.element.style.cursor = "default";
	    }
	    onMouseMoveForCursor(event) {
	        // Update cursor based on mouse position
	        const { offsetX, offsetY } = event;
	        const { offsetWidth, offsetHeight } = this.element;
	        if (!this.resizable)
	            return;
	        if (offsetX < this.edgeThreshold) {
	            this.element.style.cursor = "ew-resize"; // Left edge
	        }
	        else if (offsetX > offsetWidth - this.edgeThreshold) {
	            this.element.style.cursor = "ew-resize"; // Right edge
	        }
	        else if (offsetY < this.edgeThreshold) {
	            this.element.style.cursor = "ns-resize"; // Top edge
	        }
	        else if (offsetY > offsetHeight - this.edgeThreshold) {
	            this.element.style.cursor = "ns-resize"; // Bottom edge
	        }
	        else {
	            this.element.style.cursor = "default";
	        }
	    }
	    onMouseDown(event) {
	        const { offsetX, offsetY } = event;
	        const { offsetWidth, offsetHeight } = this.element;
	        // Determine if resizing or dragging
	        if (this.resizable) {
	            if (offsetX < this.edgeThreshold) {
	                this.isResizing = true;
	                this.resizeDirection = "left";
	            }
	            else if (offsetX > offsetWidth - this.edgeThreshold) {
	                this.isResizing = true;
	                this.resizeDirection = "right";
	            }
	            else if (offsetY < this.edgeThreshold) {
	                this.isResizing = true;
	                this.resizeDirection = "top";
	            }
	            else if (offsetY > offsetHeight - this.edgeThreshold) {
	                this.isResizing = true;
	                this.resizeDirection = "bottom";
	            }
	            else {
	                this.isDragging = true;
	            }
	        }
	        else {
	            this.isDragging = true;
	        }
	        if (this.isDragging || this.isResizing) {
	            event.preventDefault();
	            this.oldX = event.clientX;
	            this.oldY = event.clientY;
	            document.addEventListener("mousemove", this.onMouseMove);
	            document.addEventListener("mouseup", this.onMouseUp);
	        }
	    }
	    onMouseMove(event) {
	        if (this.isDragging) {
	            // Dragging logic
	            this.newX = this.oldX - event.clientX;
	            this.newY = this.oldY - event.clientY;
	            this.oldX = event.clientX;
	            this.oldY = event.clientY;
	            this.element.style.top = `${this.element.offsetTop - this.newY}px`;
	            this.element.style.left = `${this.element.offsetLeft - this.newX}px`;
	        }
	        else if (this.isResizing) {
	            // Resizing logic
	            const deltaX = event.clientX - this.oldX;
	            const deltaY = event.clientY - this.oldY;
	            const style = getComputedStyle(this.element);
	            const left = parseInt(style.left, 10);
	            const top = parseInt(style.top, 10);
	            const width = parseInt(style.width, 10);
	            const height = parseInt(style.height, 10);
	            switch (this.resizeDirection) {
	                case "left":
	                    this.element.style.width = `${width - deltaX}px`;
	                    this.element.style.left = `${left + deltaX / 2}px`;
	                    break;
	                case "right":
	                    this.element.style.width = `${width + deltaX}px`;
	                    this.element.style.left = `${left + deltaX / 2}px`;
	                    break;
	                case "top":
	                    this.element.style.height = `${height - deltaY}px`;
	                    this.element.style.top = `${top + deltaY / 2}px`;
	                    break;
	                case "bottom":
	                    this.element.style.height = `${height + deltaY}px`;
	                    this.element.style.top = `${top + deltaY / 2}px`;
	                    break;
	            }
	            this.oldX = event.clientX;
	            this.oldY = event.clientY;
	        }
	    }
	    onMouseUp(event) {
	        event.preventDefault();
	        // Clean up
	        this.isDragging = false;
	        this.isResizing = false;
	        this.resizeDirection = null;
	        document.removeEventListener("mousemove", this.onMouseMove);
	        document.removeEventListener("mouseup", this.onMouseUp);
	    }
	}
	class ABCLYesNoPrompt {
	    constructor(message, onAccept, onDeny, timeout = -1) {
	        this.prompt = document.createElement("div");
	        new MovableElement(this.prompt);
	        this.id = generateUniqueID();
	        this.message = message;
	        this.onAccept = onAccept;
	        this.onDeny = onDeny;
	        this.show();
	        if (timeout === -1)
	            return;
	        setTimeout(() => {
	            this.prompt.remove();
	        }, timeout);
	    }
	    show() {
	        this.prompt.classList.add(`${"ABCL"}Prompt`);
	        this.prompt.id = this.id;
	        this.prompt.innerHTML = `<p>${this.message}</p><button class="${"ABCL"}PromptNo ${"ABCL"}Button">Deny</button><button class="${"ABCL"}PromptYes ${"ABCL"}Button">Accept</button>`;
	        overlay.appendChild(this.prompt);
	        this.prompt.querySelector(`#${this.id} .${"ABCL"}PromptYes`)?.addEventListener("click", () => {
	            this.onAccept();
	            this.prompt.remove();
	        });
	        this.prompt.querySelector(`#${this.id} .${"ABCL"}PromptNo`)?.addEventListener("click", () => {
	            this.onDeny();
	            this.prompt.remove();
	        });
	    }
	}
	const overlay = document.createElement("div");
	let abclStatsWindow;
	overlay.classList.add(`${"ABCL"}Overlay`);
	const initOverlay = () => {
	    const shoelaceCSSLight = document.createElement("link");
	    shoelaceCSSLight.rel = "stylesheet";
	    shoelaceCSSLight.href = "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.0/cdn/themes/light.css";
	    document.head.appendChild(shoelaceCSSLight);
	    const shoelaceCSSDark = document.createElement("link");
	    shoelaceCSSDark.rel = "stylesheet";
	    shoelaceCSSDark.href = "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.0/cdn/themes/dark.css";
	    document.head.appendChild(shoelaceCSSDark);
	    const shoelaceScript = document.createElement("script");
	    shoelaceScript.src = "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.0/cdn/shoelace-autoloader.js";
	    shoelaceScript.type = "module";
	    shoelaceScript.async = true;
	    document.head.appendChild(shoelaceScript);
	    const injectedStyles = document.createElement("style");
	    injectedStyles.innerHTML = createCSS();
	    document.head.appendChild(injectedStyles);
	    abclStatsWindow = new ABCLStatsWindow();
	    overlay.classList.add((Player.ChatSettings?.ColorTheme ?? "Light").startsWith("Light") ? "sl-theme-light" : "sl-theme-dark");
	    overlay.style.color = (Player.ChatSettings?.ColorTheme ?? "Light").startsWith("Light") ? "var(--tmd-text,black)" : "var(--tmd-text,white)";
	    document.body.appendChild(overlay);
	    waitForElement("#chat-room-div", { childCheck: true, timeout: 9999999999999999999999 }).then(() => {
	        waitForElement(`.${"ABCL"}Overlay`, { timeout: 9999999999999999999999 }).then(() => {
	            document.removeChild(overlay);
	            setTimeout(() => {
	                document.appendChild(overlay);
	            }, 1000);
	        });
	    });
	};

	const updatePlayerClothes = () => {
	    CharacterRefresh(Player, true);
	    ChatRoomCharacterUpdate(Player);
	};
	const abclPlayer = {
	    onAccident: () => {
	        abclPlayer.stats.MentalRegression += mentalRegressionOnAccident();
	    },
	    update: () => {
	        // once per minute
	        abclPlayer.stats.MentalRegression += mentalRegressionOvertime();
	        abclPlayer.stats.BladderValue += abclPlayer.stats.WaterIntake * MetabolismSettingValues[abclPlayer.settings.PeeMetabolism];
	        abclPlayer.stats.BowelValue += abclPlayer.stats.FoodIntake * MetabolismSettingValues[abclPlayer.settings.PoopMetabolism];
	        abclPlayer.settings.PeeMetabolism !== "Disabled" && abclPlayer.attemptWetting();
	        abclPlayer.settings.PoopMetabolism !== "Disabled" && abclPlayer.attemptSoiling();
	        playerSaver.save();
	    },
	    wetClothing: () => {
	        // panties -> pants -> floor
	        sendChatLocal("You've had a wet accident in your clothes!");
	        abclPlayer.stats.PuddleSize += abclPlayer.stats.BladderValue;
	        abclPlayer.stats.BladderValue = 0;
	        const wetColor = "#96936C";
	        const panties = InventoryGet(Player, "Panties");
	        if (panties) {
	            const pantiesColors = getColor(panties.Color || panties.Asset.DefaultColor, panties.Asset);
	            for (let i = 0; i < pantiesColors.length; i++) {
	                if (!isColorable(pantiesColors[i]))
	                    continue;
	                pantiesColors[i] = averageColor(pantiesColors[i], wetColor, 0.3);
	            }
	            panties.Color = pantiesColors;
	        }
	        for (const item of Player.Appearance) {
	            if (ABCLdata.ItemDefinitions.Pants.some(pants => pants === item.Asset.Description)) {
	                const colors = getColor(item.Color || item.Asset.DefaultColor, item.Asset);
	                for (let i = 0; i < colors.length; i++) {
	                    if (!isColorable(colors[i]))
	                        continue;
	                    colors[i] = averageColor(colors[i], wetColor, 0.3);
	                }
	                item.Color = colors;
	            }
	        }
	        abclPlayer.stats.PuddleSize += abclPlayer.stats.BladderValue;
	        abclPlayer.stats.BladderFullness = 0;
	        if (hasDiaper()) {
	            SendAction("%NAME%'s diaper leaks and wet %INTENSIVE% clothes causing a puddle to form.", undefined, "wetClothing");
	        }
	        else {
	            SendAction("%NAME%'s wets %INTENSIVE% clothes leaks onto the floor.", undefined, "wetClothing");
	        }
	        updatePlayerClothes();
	        sendUpdateMyData();
	    },
	    soilClothing: () => {
	        abclPlayer.stats.PuddleSize += abclPlayer.stats.BladderValue;
	        abclPlayer.stats.BladderValue = 0;
	        const messColor = "#261a16";
	        const panties = InventoryGet(Player, "Panties");
	        if (panties) {
	            const pantiesColors = getColor(panties.Color || panties.Asset.DefaultColor, panties.Asset);
	            for (let i = 0; i < pantiesColors.length; i++) {
	                if (!isColorable(pantiesColors[i]))
	                    continue;
	                pantiesColors[i] = averageColor(pantiesColors[i], messColor, 0.3);
	            }
	            panties.Color = pantiesColors;
	        }
	        if (hasDiaper()) {
	            SendAction("%NAME%'s diaper leaks and soils %INTENSIVE% clothes and the floor.", undefined, "soilClothing");
	        }
	        else {
	            SendAction("%NAME% soils %INTENSIVE% clothes and the floor.", undefined, "soilClothing");
	        }
	        updatePlayerClothes();
	    },
	    wetDiaper: () => {
	        const diaperSize = getPlayerDiaperSize();
	        const absorbedVolume = Math.min(abclPlayer.stats.BladderValue, diaperSize - abclPlayer.stats.WetnessValue);
	        SendAction("%NAME% wets %INTENSIVE% diaper.", undefined, "wetDiaper");
	        abclPlayer.stats.BladderValue -= absorbedVolume;
	        abclPlayer.stats.WetnessValue += absorbedVolume;
	        if (abclPlayer.stats.WetnessValue >= diaperSize) {
	            abclPlayer.wetClothing();
	        }
	    },
	    soilDiaper: () => {
	        const diaperSize = getPlayerDiaperSize();
	        const absorbedVolume = Math.min(abclPlayer.stats.BowelValue, Math.max(0, diaperSize - abclPlayer.stats.SoilinessValue));
	        SendAction("%NAME% soils %INTENSIVE% diaper.", undefined, "soilDiaper");
	        abclPlayer.stats.BowelValue -= absorbedVolume;
	        abclPlayer.stats.SoilinessValue += absorbedVolume;
	        if (abclPlayer.stats.SoilinessValue > 0) {
	            abclPlayer.soilClothing();
	        }
	    },
	    attemptWetting: () => {
	        const limit = incontinenceLimitFormula(abclPlayer.stats.Incontinence);
	        const chance = incontinenceChanceFormula(abclPlayer.stats.Incontinence, abclPlayer.stats.BladderFullness);
	        if (!(Math.random() < chance || abclPlayer.stats.BladderFullness > limit))
	            return;
	        if (!incontinenceCheck.check())
	            return;
	        MiniGameStart("WetMinigame", 30 * chance, "noOp");
	    },
	    attemptSoiling: () => {
	        const limit = incontinenceLimitFormula(abclPlayer.stats.Incontinence);
	        const chance = incontinenceChanceFormula(abclPlayer.stats.Incontinence, abclPlayer.stats.BowelFullness);
	        if (!(Math.random() < chance || abclPlayer.stats.BowelFullness > limit))
	            return;
	        if (!incontinenceCheck.check())
	            return;
	        MiniGameStart("MessMinigame", 30 * chance, "noOp");
	    },
	    wet: (intentional = false) => {
	        const isTooEarly = abclPlayer.stats.BladderFullness < 0.3;
	        const isPossible = !isTooEarly;
	        const isGood = abclPlayer.stats.BladderFullness > 0.6;
	        if (isTooEarly) {
	            sendChatLocal("You try to pee, but it doesn't seem to be working.");
	            return;
	        }
	        if (isPossible) {
	            hasDiaper() ? abclPlayer.wetDiaper() : abclPlayer.wetClothing();
	        }
	        if (isGood && intentional) {
	            abclPlayer.stats.Incontinence -= 0.01;
	        }
	        else {
	            abclPlayer.stats.Incontinence += 0.02;
	        }
	    },
	    soil: (intentional = false) => {
	        const isTooEarly = abclPlayer.stats.BowelFullness < 0.3;
	        const isPossible = !isTooEarly;
	        const isGood = abclPlayer.stats.BowelFullness > 0.6;
	        if (isTooEarly) {
	            sendChatLocal("You try to let go, but nothing seems to happen.");
	            return;
	        }
	        if (isPossible) {
	            hasDiaper() ? abclPlayer.soilDiaper() : abclPlayer.soilClothing();
	        }
	        if (isGood && intentional) {
	            abclPlayer.stats.Incontinence -= 0.01;
	        }
	        else {
	            abclPlayer.stats.Incontinence += 0.02;
	        }
	    },
	    stats: {
	        set PuddleSize(value) {
	            if (value < 0)
	                value = 0;
	            if (value > 250)
	                value = 250;
	            Player["ABCL"].Stats.PuddleSize.value = value;
	        },
	        get PuddleSize() {
	            return Player["ABCL"].Stats.PuddleSize.value;
	        },
	        set MentalRegression(value) {
	            if (value < 0)
	                value = 0;
	            if (value > 1)
	                value = 1;
	            Player["ABCL"].Stats.MentalRegression.value = value;
	            abclStatsWindow.update();
	        },
	        get MentalRegression() {
	            return Player["ABCL"].Stats.MentalRegression.value;
	        },
	        set Incontinence(value) {
	            if (value < 0)
	                value = 0;
	            if (value > 1)
	                value = 1;
	            Player["ABCL"].Stats.Incontinence.value = value;
	            abclStatsWindow.update();
	        },
	        get Incontinence() {
	            return Player["ABCL"].Stats.Incontinence.value;
	        },
	        // intake
	        set WaterIntake(value) {
	            if (value < 0)
	                value = 0;
	            Player["ABCL"].Stats.WaterIntake.value = value;
	        },
	        get WaterIntake() {
	            return Player["ABCL"].Stats.WaterIntake.value;
	        },
	        set FoodIntake(value) {
	            if (value < 0)
	                value = 0;
	            Player["ABCL"].Stats.FoodIntake.value = value;
	        },
	        get FoodIntake() {
	            return Player["ABCL"].Stats.FoodIntake.value;
	        },
	        // bladder
	        set BladderValue(value) {
	            if (value < 0)
	                value = 0;
	            Player["ABCL"].Stats.Bladder.value = value;
	            abclStatsWindow.update();
	        },
	        get BladderValue() {
	            return Player["ABCL"].Stats.Bladder.value;
	        },
	        set BladderSize(value) {
	            if (value < 0)
	                value = 0;
	            Player["ABCL"].Stats.Bladder.size = value;
	            abclStatsWindow.update();
	        },
	        get BladderSize() {
	            return Player["ABCL"].Stats.Bladder.size;
	        },
	        set WetnessValue(value) {
	            if (value < 0)
	                value = 0;
	            Player["ABCL"].Stats.Wetness.value = value;
	            updateDiaperColor();
	            abclStatsWindow.update();
	        },
	        get WetnessValue() {
	            return Player["ABCL"].Stats.Wetness.value;
	        },
	        // computed
	        set BladderFullness(value) {
	            if (value < 0)
	                value = 0;
	            this.BladderValue = value * this.BladderSize;
	            abclStatsWindow.update();
	        },
	        get BladderFullness() {
	            return this.BladderValue / this.BladderSize;
	        },
	        // bowel
	        set BowelValue(value) {
	            if (value < 0)
	                value = 0;
	            Player["ABCL"].Stats.Bowel.value = value;
	            abclStatsWindow.update();
	        },
	        get BowelValue() {
	            return Player["ABCL"].Stats.Bowel.value;
	        },
	        set BowelSize(value) {
	            if (value < 0)
	                value = 0;
	            Player["ABCL"].Stats.Bowel.size = value;
	            abclStatsWindow.update();
	        },
	        get BowelSize() {
	            return Player["ABCL"].Stats.Bowel.size;
	        },
	        set SoilinessValue(value) {
	            if (value < 0)
	                value = 0;
	            Player["ABCL"].Stats.Soiliness.value = value;
	            updateDiaperColor();
	            abclStatsWindow.update();
	        },
	        get SoilinessValue() {
	            return Player["ABCL"].Stats.Soiliness.value;
	        },
	        // computed
	        set BowelFullness(value) {
	            if (value < 0)
	                value = 0;
	            this.BowelValue = value * this.BowelSize;
	            abclStatsWindow.update();
	        },
	        get BowelFullness() {
	            return this.BowelValue / this.BowelSize;
	        },
	        get SoilinessPercentage() {
	            if (getPlayerDiaperSize() == 0)
	                return 0;
	            return this.SoilinessValue / getPlayerDiaperSize();
	        },
	        set SoilinessPercentage(value) {
	            if (value < 0)
	                value = 0;
	            this.SoilinessValue = value * getPlayerDiaperSize();
	        },
	        get WetnessPercentage() {
	            if (getPlayerDiaperSize() == 0)
	                return 0;
	            return this.WetnessValue / getPlayerDiaperSize();
	        },
	        set WetnessPercentage(value) {
	            if (value < 0)
	                value = 0;
	            this.WetnessValue = value * getPlayerDiaperSize();
	        },
	    },
	    settings: {
	        publicMessages: {
	            changeDiaper: true,
	            checkDiaper: true,
	            lickPuddle: true,
	            toPee: true,
	            toPoop: true,
	            usePotty: true,
	            useToilet: true,
	            wipePuddle: true,
	        },
	        setPublicMessage(key, value) {
	            Player["ABCL"].Settings.visibleMessages[key] = value;
	        },
	        getPublicMessage(key) {
	            return Player["ABCL"].Settings.visibleMessages[key];
	        },
	        set PeeMetabolism(value) {
	            Player["ABCL"].Settings.PeeMetabolism = value;
	        },
	        set PoopMetabolism(value) {
	            Player["ABCL"].Settings.PoopMetabolism = value;
	        },
	        get PeeMetabolism() {
	            return Player["ABCL"].Settings.PeeMetabolism;
	        },
	        get PoopMetabolism() {
	            return Player["ABCL"].Settings.PoopMetabolism;
	        },
	        get OnDiaperChange() {
	            return Player["ABCL"].Settings.OnDiaperChange;
	        },
	        set OnDiaperChange(value) {
	            Player["ABCL"].Settings.OnDiaperChange = value;
	        },
	        set OpenRemoteSettings(value) {
	            Player["ABCL"].Settings.OpenRemoteSettings = value;
	        },
	        get OpenRemoteSettings() {
	            return Player["ABCL"].Settings.OpenRemoteSettings;
	        },
	    },
	};
	const playerSaver = new Saver(2 * 60 * 1000);
	const incontinenceCheck = new Debouncer(2 * 60 * 1000);
	window.abclPlayer = abclPlayer;

	// Is/Has
	const isLeaking = (type = "any") => {
	    const diaperSize = getPlayerDiaperSize();
	    if (type === "pee") {
	        return abclPlayer.stats.PuddleSize > 0;
	    }
	    if (type === "poop") {
	        return abclPlayer.stats.SoilinessValue >= diaperSize;
	    }
	    return abclPlayer.stats.SoilinessValue >= diaperSize || abclPlayer.stats.WetnessValue >= diaperSize;
	};
	const isDiaperDirty = () => {
	    const diaperSize = getPlayerDiaperSize();
	    return abclPlayer.stats.SoilinessValue + abclPlayer.stats.WetnessValue >= diaperSize / 2;
	};
	const isDiaper = (item) => {
	    return item.Asset.Description.toLowerCase().includes("diaper") && item.Asset.Description in ABCLdata.Diapers;
	};
	function hasDiaper(player = Player) {
	    if (!player)
	        return false;
	    const pelvisItem = InventoryGet(player, "ItemPelvis");
	    const panties = InventoryGet(player, "Panties");
	    return Boolean((pelvisItem && isDiaper(pelvisItem)) || (panties && isDiaper(panties)));
	}
	const isWearingBabyClothes = () => {
	    return Player.Appearance.some((clothing) => {
	        return ABCLdata.ItemDefinitions.BabyItems.includes(clothing.Asset.Description);
	    });
	};
	// Color
	function averageColor(color_1, color_2, ratio = 0.5) {
	    let rgb_1 = DrawHexToRGB(color_1);
	    let rgb_2 = DrawHexToRGB(color_2);
	    let avgRgb = {
	        r: Math.round(rgb_1.r * ratio + rgb_2.r * (1 - ratio)),
	        g: Math.round(rgb_1.g * ratio + rgb_2.g * (1 - ratio)),
	        b: Math.round(rgb_1.b * ratio + rgb_2.b * (1 - ratio)),
	    };
	    return DrawRGBToHex([avgRgb.r, avgRgb.g, avgRgb.b]);
	}
	function mixLevels(level, highLevel, midLevel, lowLevel) {
	    if (level > 0.75) {
	        return level > 0.9 ? highLevel : averageColor(highLevel, midLevel, level - 0.75);
	    }
	    else {
	        return averageColor(midLevel, lowLevel, level);
	    }
	}
	const setDiaperColor = (slot, primaryColor, secondaryColor, player = Player) => {
	    const item = InventoryGet(player, slot);
	    if (item && isDiaper(item)) {
	        const type = typeof item.Asset.DefaultColor;
	        const diaper = ABCLdata.Diapers[item.Asset.Description];
	        if (type !== typeof item.Color) {
	            item.Color = item.Asset.DefaultColor;
	        }
	        if (type === "object" && JSON.stringify(item.Color).includes('"Default"')) {
	            item.Color = JSON.parse(JSON.stringify(item.Color).replaceAll(/"Default"/g, '"#FFFFFF"'));
	        }
	        const color = (item.Color ?? item.Asset.DefaultColor);
	        if ("primaryColor" in diaper) {
	            color[diaper.primaryColor] = primaryColor;
	        }
	        if ("secondaryColor" in diaper) {
	            color[diaper.secondaryColor] = secondaryColor;
	        }
	        item.Color = color;
	    }
	};
	const updateDiaperColor = () => {
	    const messLevel = abclPlayer.stats.SoilinessValue / getPlayerDiaperSize();
	    const wetLevel = abclPlayer.stats.WetnessValue / getPlayerDiaperSize();
	    const messColor = mixLevels(messLevel, ABCLdata.DiaperColors["maximummess"], ABCLdata.DiaperColors["middlemess"], ABCLdata.DiaperColors["clean"]);
	    const wetColor = mixLevels(wetLevel, ABCLdata.DiaperColors["maximumwet"], ABCLdata.DiaperColors["middlewet"], ABCLdata.DiaperColors["clean"]);
	    const primaryColor = averageColor(messColor, wetColor, 0.7);
	    const secondaryColor = averageColor(messColor, wetColor, 0.9);
	    setDiaperColor("ItemPelvis", primaryColor, secondaryColor, Player);
	    setDiaperColor("Panties", primaryColor, secondaryColor, Player);
	    updatePlayerClothes();
	};
	// Size
	function getPlayerDiaperSize(player = Player) {
	    const pelvisItem = InventoryGet(player, "ItemPelvis");
	    const panties = InventoryGet(player, "Panties");
	    let size = 0;
	    if (pelvisItem && isDiaper(pelvisItem)) {
	        size += getDiaperSize(pelvisItem);
	    }
	    if (panties && isDiaper(panties)) {
	        size += getDiaperSize(panties);
	    }
	    return size;
	}
	function getDiaperSize(diaper) {
	    if (diaper.Asset.Description === "Poofy Chastity Diaper" && diaper.Property?.TypeRecord?.typed === 1) {
	        return ABCLdata.DiaperSizeScale.heavy_adult;
	    }
	    return ABCLdata.DiaperSizeScale[ABCLdata.Diapers[diaper.Asset.Description].size];
	}
	// incontinence
	const incontinenceLimitFormula = (incontinence) => {
	    return 0.9 - incontinence * 0.5;
	};
	function incontinenceChanceFormula(incontinence, fullness) {
	    const incontinenceWeight = 0.6;
	    const fullnessWeight = 0.8;
	    const threshold = incontinenceWeight * Math.pow(incontinence, 2) + fullnessWeight * Math.pow(fullness, 3);
	    return Math.min(Math.max(threshold, 0), 1);
	}
	// mental regression
	const mentalRegressionBonus = () => {
	    const assetDescriptions = Player.Appearance.map((clothing) => clothing.Asset.Description);
	    const matches = ABCLdata.ItemDefinitions.BabyItems.concat(["milk", "pacifier", "bib"]).filter((description) => assetDescriptions.some((assetDescription) => assetDescription.toLocaleLowerCase().includes(description)));
	    return Math.min(matches.length * 0.25, 1);
	};
	const mentalRegressionOvertime = () => {
	    // if wearing baby clothes, mental regression goes up
	    // if wet diaper, mental regression goes up
	    // if leaking, mental regression goes up a lot
	    let modifier = 0 + mentalRegressionBonus();
	    if (isWearingBabyClothes())
	        modifier += 1;
	    if (isDiaperDirty())
	        modifier += 0.25;
	    if (isLeaking())
	        modifier += 0.5;
	    return modifier / (150 * 60); // 150 hours till 100%
	};
	function incontinenceOnAccident() {
	    const stages = [
	        { totalAccidents: 60, start: 0, end: 0.25 },
	        { totalAccidents: 120, start: 0.25, end: 0.5 },
	        { totalAccidents: 240, start: 0.5, end: 0.75 },
	        { totalAccidents: 480, start: 0.75, end: 1 },
	    ];
	    for (const { totalAccidents, start, end } of stages) {
	        if (abclPlayer.stats.Incontinence >= start && abclPlayer.stats.Incontinence < end) {
	            return 0.25 / totalAccidents;
	        }
	    }
	    return 0;
	}
	const mentalRegressionOnAccident = () => {
	    const modifier = 1 + mentalRegressionBonus();
	    if (abclPlayer.stats.MentalRegression < 0.25)
	        return modifier / 500;
	    if (0.25 > abclPlayer.stats.MentalRegression && abclPlayer.stats.MentalRegression < 0.5 && isDiaperDirty())
	        return modifier / 500;
	    if (0.5 > abclPlayer.stats.MentalRegression && abclPlayer.stats.MentalRegression < 0.75 && isLeaking())
	        return modifier / 1000;
	    if (0.75 > abclPlayer.stats.MentalRegression && abclPlayer.stats.MentalRegression < 1 && isLeaking())
	        return modifier / 1500;
	    return 0;
	};

	const changeDiaperRequest = (player) => {
	    if (player.MemberNumber !== Player.MemberNumber)
	        return sendDataToAction("changeDiaper-pending", undefined, player.MemberNumber);
	    changeDiaperFunction(player);
	};
	const changeDiaperFunction = (player) => {
	    const isSelf = player.MemberNumber === Player.MemberNumber;
	    const selfMessage = "%NAME% changes %INTENSIVE% diaper.";
	    const otherMessage = "%NAME% changes %OPP_NAME%'s diaper.";
	    SendAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "changeDiaper", player);
	    updateDiaperColor();
	    abclPlayer.stats.WetnessValue = 0;
	    abclPlayer.stats.SoilinessValue = 0;
	};
	const changeDiaper = {
	    activity: {
	        ID: "diaper-change",
	        Name: "Change Diaper",
	        Image: `${"http://localhost:3042/assets"}/activity/changeDiaper.svg`,
	        Target: ["ItemPelvis"],
	        OnClick: (player, group) => changeDiaperRequest(player),
	        Criteria: (player) => hasDiaper(player) && isABCLPlayer(player),
	    },
	    command: {
	        Tag: "diaper-change",
	        Action: (args, msg, parsed) => {
	            const character = targetInputExtractor(parsed) ?? Player;
	            if (!changeDiaper.activity.Criteria(character))
	                return sendChatLocal("Is either not diapered or not an ABCL player.");
	            changeDiaperRequest(character);
	        },
	        Description: ` [MemberNumber|Name|Nickname]: Changes someone's diaper.`,
	    },
	    listeners: {
	        "changeDiaper-accepted": ({ Sender }) => sendChatLocal(`${getCharacterName(Sender)} accepted your change diaper request.`),
	        "changeDiaper-rejected": ({ Sender }) => sendChatLocal(`${getCharacterName(Sender)} rejected your change diaper request.`),
	        "changeDiaper-pending": ({ Sender }) => {
	            switch (abclPlayer.settings.OnDiaperChange) {
	                case DiaperSettingValues.Ask:
	                    new ABCLYesNoPrompt(`${getCharacterName(Sender)} wants to change your diaper.`, () => {
	                        changeDiaperFunction(getCharacter(Sender) ?? Player);
	                        sendDataToAction("changeDiaper-accepted", undefined, Sender);
	                    }, () => sendDataToAction("changeDiaper-rejected", undefined, Sender), 10 * 1000);
	                    break;
	                case DiaperSettingValues.Allow:
	                    changeDiaperFunction(getCharacter(Sender) ?? Player);
	                    sendDataToAction("changeDiaper-accepted", undefined, Sender);
	                    break;
	                case DiaperSettingValues.Deny:
	                    sendDataToAction("changeDiaper-rejected", undefined, Sender);
	                    break;
	            }
	        },
	    },
	};

	const diaperCheckFunction = (player) => {
	    const isSelf = player.MemberNumber === Player.MemberNumber;
	    const selfDiaperMessage = "%NAME% checks %INTENSIVE% diaper.";
	    const otherDiaperMessage = "%NAME% checks %OPP_NAME%'s diaper.";
	    const selfClothesMessage = "%NAME% checks %INTENSIVE% clothes for any accidents.";
	    const otherClothesMessage = "%NAME% checks %OPP_NAME%'s clothes for any accidents.";
	    abclStatsWindow.open(player.MemberNumber);
	    if (Math.random() < 0.75)
	        return;
	    if (hasDiaper(player))
	        return SendAction(replace_template(isSelf ? selfDiaperMessage : otherDiaperMessage, player), undefined, "checkDiaper", player);
	    return SendAction(replace_template(isSelf ? selfClothesMessage : otherClothesMessage, player), undefined, "checkDiaper", player);
	};
	const checkDiaper = {
	    activity: {
	        ID: "check-diaper",
	        Name: "Check Diaper",
	        Image: `${"http://localhost:3042/assets"}/activity/diaperCheck.png`,
	        OnClick: (player, group) => diaperCheckFunction(player),
	        Target: ["ItemPelvis"],
	        Criteria: (player) => isABCLPlayer(player),
	    },
	    command: {
	        Tag: "check-diaper",
	        Description: ` [MemberNumber|Name|Nickname]: Checks someone's diaper.`,
	        Action: (args, msg, parsed) => {
	            const character = targetInputExtractor(parsed) ?? Player;
	            if (!checkDiaper.activity.Criteria(character))
	                sendChatLocal("Is not an ABCL player.");
	            diaperCheckFunction(character);
	        },
	    },
	};

	const lickPuddleRequest = (player) => {
	    const isSelf = player.MemberNumber === Player.MemberNumber;
	    if (!isSelf)
	        return sendDataToAction("lick-puddle", undefined, player.MemberNumber);
	    LickPuddleFunction(Player);
	};
	const LickPuddleFunction = (player) => {
	    const isSelf = player.MemberNumber === Player.MemberNumber;
	    const selfMessage = "%NAME% licks %INTENSIVE% puddle of pee.";
	    const otherMessage = "%OPP_NAME% licks %NAME%'s puddle of pee.";
	    SendAction(replace_template(isSelf ? selfMessage : otherMessage, player), undefined, "lickPuddle", player);
	    sendUpdateMyData();
	    updatePlayerClothes();
	    abclPlayer.stats.PuddleSize -= 50;
	};
	const lickPuddle = {
	    activity: {
	        ID: "lick-puddle",
	        Name: "Lick Puddle",
	        Image: `${"http://localhost:3042/assets"}/activity/lickPuddle.png`,
	        Target: ["ItemBoots"],
	        OnClick: (player, group) => lickPuddleRequest(player),
	        Criteria: (player) => isABCLPlayer(player) && player.ABCL.Stats.PuddleSize.value > 0,
	    },
	    command: {
	        Tag: "lick-puddle",
	        Action: (args, msg, parsed) => {
	            const character = targetInputExtractor(parsed) ?? Player;
	            if (!lickPuddle.activity.Criteria(character))
	                return sendChatLocal("Is either not an ABCL player or has no puddle.");
	            lickPuddleRequest(character);
	        },
	        Description: ` [MemberNumber|Name|Nickname]: Licks a puddle of pee.`,
	    },
	    listeners: {
	        "lick-puddle": ({ Sender }) => LickPuddleFunction(getCharacter(Sender) ?? Player),
	    },
	};

	const onABCLMessage = {
	    listeners: {
	        onABCLMessage: ({ Sender }, message) => {
	            sendChatLocal(message, undefined, "background: #FFA9A93B");
	        },
	    },
	};

	const sync = {
	    listeners: {
	        sync: ({ Sender }, data) => {
	            if (!Sender)
	                return;
	            console.log("sync:" + "ABCL");
	            logger.debug({
	                message: `Received updated data`,
	                data,
	            });
	            const otherCharacter = getCharacter(Sender);
	            if (!otherCharacter)
	                return;
	            otherCharacter["ABCL"] = {
	                Stats: data.stats,
	                Version: data.version,
	                Settings: data.settings,
	            };
	        },
	        init: ({ Sender }) => {
	            console.log("init");
	            logger.debug(`Received request for data`);
	            sendUpdateMyData(Sender);
	        },
	    },
	};

	const toPee = {
	    activity: {
	        ID: "pee",
	        Name: "Pee",
	        Image: `${"http://localhost:3042/assets"}/activity/wetDiaper.svg`,
	        OnClick: (player, group) => abclPlayer.wet(),
	        TargetSelf: ["ItemPelvis"],
	    },
	    command: {
	        Tag: "pee",
	        Action: (args, msg, parsed) => abclPlayer.wet(),
	        Description: ` Lets go of your bladder.`,
	    },
	};

	const toPoop = {
	    activity: {
	        ID: "poop",
	        Name: "Poop",
	        Image: `${"http://localhost:3042/assets"}/activity/soilDiaper.svg`,
	        OnClick: (player, group) => abclPlayer.soil(),
	        TargetSelf: ["ItemPelvis"],
	    },
	    command: {
	        Tag: "poop",
	        Action: () => abclPlayer.soil(),
	        Description: ` Relaxes your bowels.`,
	    },
	};

	const usePottyFunction = () => {
	    const isGood = abclPlayer.stats.BladderFullness > 0.6 || abclPlayer.stats.BowelFullness > 0.6;
	    const isTooEarly = abclPlayer.stats.BladderFullness < 0.3 && abclPlayer.stats.BowelFullness < 0.3;
	    const isTooFarGone = abclPlayer.stats.MentalRegression > 0.9;
	    const isEmbarrassed = abclPlayer.stats.MentalRegression < 0.3;
	    if (isTooEarly) {
	        SendAction("%NAME% tries to use the potty but can't seem to get anything out.", undefined, "usePotty");
	        return;
	    }
	    abclPlayer.stats.BowelFullness = 0;
	    abclPlayer.stats.BladderFullness = 0;
	    let additionalText = "";
	    if (isEmbarrassed) {
	        additionalText = "and feels embarrased";
	        abclPlayer.stats.MentalRegression += 0.04;
	    }
	    if (isGood && !isTooFarGone) {
	        additionalText += isEmbarrassed ? " but is releaved" : "and feels releaved";
	        abclPlayer.stats.Incontinence -= 0.02;
	        abclPlayer.stats.MentalRegression -= 0.02;
	    }
	    SendAction("%NAME% sits down uses the potty " + additionalText + ".", undefined, "usePotty");
	};
	const usePotty = {
	    activity: {
	        ID: "potty",
	        Name: "Sit and Use Potty",
	        Image: `${"http://localhost:3042/assets"}/activity/potty-temp.png`,
	        OnClick: (player) => usePottyFunction(),
	        TargetSelf: ["ItemButt"],
	    },
	    command: {
	        Tag: "use-potty",
	        Action: (args, msg, parsed) => usePottyFunction(),
	        Description: ` Sit down and use the potty.`,
	    },
	};

	const useToiletFunction = () => {
	    const isTooEarly = abclPlayer.stats.BladderFullness < 0.3 && abclPlayer.stats.BowelFullness < 0.3;
	    const isGood = abclPlayer.stats.BladderFullness > 0.6 || abclPlayer.stats.BowelFullness > 0.6;
	    if (isTooEarly)
	        return sendChatLocal("You try to use the toilet but you can't seem to get anything out.");
	    let additionalText = "";
	    if (isGood) {
	        additionalText = "and feels releaved";
	        abclPlayer.stats.MentalRegression -= 0.02;
	        abclPlayer.stats.Incontinence -= 0.02;
	    }
	    abclPlayer.stats.BladderFullness = 0;
	    abclPlayer.stats.BowelFullness = 0;
	    SendAction("%NAME% goes to the bathroom uses the toilet " + additionalText + ".", undefined, "useToilet");
	};
	const useToilet = {
	    activity: {
	        ID: "toilet",
	        Name: "Sit and Use Toilet",
	        Image: `${"http://localhost:3042/assets"}/activity/toilet-temp.png`,
	        OnClick: (player) => useToiletFunction(),
	        Criteria: (player) => abclPlayer.stats.MentalRegression < 0.3,
	        TargetSelf: ["ItemButt"],
	    },
	    command: {
	        Tag: "use-toilet",
	        Action: () => {
	            if (!useToilet.activity.Criteria(Player))
	                return sendChatLocal("You feel uncomfortable, the toilet is cold and hard almost like ice. You can't use it.");
	            useToiletFunction();
	        },
	        Description: ` Sit down and use the toilet.`,
	    },
	};

	const WipePuddleRequest = (player) => {
	    if (player.MemberNumber !== Player.MemberNumber)
	        return sendDataToAction("wipe-puddle", undefined, player.MemberNumber);
	    WipePuddleFunction(Player);
	};
	const WipePuddleFunction = (player) => {
	    abclPlayer.stats.PuddleSize = 0;
	    sendUpdateMyData();
	    updatePlayerClothes();
	    if (player.MemberNumber !== Player.MemberNumber)
	        return SendAction(replace_template("%OPP_NAME% wipes %NAME%'s puddle of pee.", player), undefined, "wipePuddle", player);
	    SendAction(replace_template("%NAME% wipes %INTENSIVE% puddle of pee.", player), undefined, "wipePuddle", player);
	};
	const wipePuddle = {
	    activity: {
	        ID: "wipe-puddle",
	        Name: "Wipe Puddle",
	        Image: `./Assets/Female3DCG/ItemHandheld/Preview/Towel.png`,
	        Target: ["ItemBoots"],
	        OnClick: (player, group) => WipePuddleRequest(player),
	        Criteria: (player) => isABCLPlayer(player) && player.ABCL.Stats.PuddleSize.value > 0,
	    },
	    command: {
	        Tag: "wipe-puddle",
	        Action: (args, msg, parsed) => {
	            const character = getCharacter(parsed[0]) ?? Player;
	            if (!wipePuddle.activity.Criteria(character))
	                return sendChatLocal("Is either not an ABCL player or has no puddle.");
	            WipePuddleRequest(character);
	        },
	        Description: ` [MemberNumber|Name|Nickname]: Wipes a puddle of pee.`,
	    },
	    listeners: {
	        "wipe-puddle": ({ Sender }) => {
	            WipePuddleFunction(getCharacter(Sender) ?? Player);
	        },
	    },
	};

	class Activity {
	    constructor(id, name, image, onClick, target, targetSelf, criteria) {
	        this.id = id;
	        this.name = name;
	        this.image = image;
	        this.onClick = onClick;
	        this.target = target;
	        this.targetSelf = targetSelf;
	        this.criteria = criteria;
	    }
	    fitsCriteria(player, focusGroup) {
	        return Boolean((!this.criteria || this.criteria(player)) &&
	            (this.target?.includes(focusGroup) || (this.targetSelf?.includes(focusGroup) && Player.MemberNumber === player?.MemberNumber)));
	    }
	    createButton() {
	        const button = document.createElement("button");
	        button.id = this.id;
	        button.name = `${"ABCL"}_${this.name}`;
	        button.dataset.group = "ItemArms";
	        button.className = `blank-button button button-styling HideOnPopup dialog-grid-button`;
	        button.innerHTML = `<img decoding="async" loading="lazy" src="${this.image}" class="button-image"><span class="button-label button-label-bottom">${this.name}</span>`;
	        button.addEventListener("click", e => {
	            const player = CurrentCharacter?.FocusGroup ? CurrentCharacter : Player;
	            const focusGroup = player?.FocusGroup?.Name;
	            if (!this.onClick || !focusGroup)
	                return;
	            this.onClick(player, focusGroup);
	            DialogLeave();
	        });
	        return button;
	    }
	    static isInserted(id) {
	        return Boolean(document.getElementById(id));
	    }
	}
	const initActions = () => {
	    bcModSDK.hookFunction("DialogMenuMapping.activities.GetClickStatus", 1, (args, next) => {
	        const [_C, _clickedObj, _equippedItem] = args;
	        if (!_clickedObj)
	            return null;
	        return next(args);
	    });
	    bcModSDK.hookFunction("DialogChangeMode", 1, async (args, next) => {
	        const [_mode] = args;
	        next(args);
	        if (_mode !== "activities")
	            return;
	        const player = CurrentCharacter?.FocusGroup ? CurrentCharacter : Player;
	        const activityGrid = await waitForElement("#dialog-activity-grid");
	        const focusGroup = player.FocusGroup?.Name;
	        if (!focusGroup)
	            return;
	        for (const { activity } of actions) {
	            if (!activity)
	                continue;
	            const activityInstance = new Activity(activity.ID, activity.Name, activity.Image, activity.OnClick, activity.Target, activity.TargetSelf, activity.Criteria);
	            if (activityInstance.fitsCriteria(player, focusGroup)) {
	                if (!Activity.isInserted(activity.ID)) {
	                    activityGrid.appendChild(activityInstance.createButton());
	                }
	            }
	        }
	    });
	    CommandCombine(commands);
	};
	const actions = [changeDiaper, checkDiaper, toPee, toPoop, usePotty, useToilet, sync, lickPuddle, wipePuddle, onABCLMessage];
	const commands = actions.reduce((commands, { command }) => (command ? [...commands, command] : commands), []);
	actions.reduce((activites, { activity }) => (activity ? [...activites, activity] : activites), []);

	const sendDataToAction = (type, data, target) => {
	    const ChatRoomMessage = {
	        Type: "Hidden",
	        Content: `${ModIdentifier}Msg`,
	        Sender: Player.MemberNumber,
	        Target: target,
	        Dictionary: [
	            {
	                type: type,
	                data: data,
	            },
	        ],
	    };
	    ServerSend("ChatRoomChat", ChatRoomMessage);
	    console.log("sendDataToAction", type, data, target);
	};
	/**
	 * Sends an update of the player's settings to the specified target or to everyone in the chat room.
	 *
	 * @param {number} [target] - The MemberNumber of the target player. If not specified, the update is sent to all players.
	 */
	const sendUpdateMyData = (target) => {
	    console.log("sendUpdateMyData target", target);
	    sendDataToAction("sync", {
	        settings: Player[ModIdentifier].Settings,
	        stats: Player[ModIdentifier].Stats,
	        version: ModVersion,
	    }, target);
	    logger.debug({
	        message: `Sending updated data to ${target ?? "everyone"}`,
	    });
	};
	/**
	 * Sends a request packet to other players in the chat room to retrieve their data.
	 */
	const sendRequestOtherDataPacket = () => {
	    sendDataToAction("init", 1);
	    logger.debug(`Requesting data from others.`);
	};
	/**
	 * Processes incoming packets and delegates them to the appropriate handler based on their type.
	 *
	 * @param {PluginServerChatRoomMessage} receivedMessage - The message data received from the server.
	 */
	const receivePacket = (receivedMessage) => {
	    if (receivedMessage?.Content !== `${"ABCL"}Msg`)
	        return;
	    if (!receivedMessage.Sender || !receivedMessage.Dictionary)
	        return;
	    if (receivedMessage.Sender === Player.MemberNumber)
	        return;
	    if (receivedMessage.Type !== "Hidden")
	        return;
	    if (!receivedMessage.Dictionary[0]?.type)
	        return;
	    const type = receivedMessage.Dictionary[0]?.type;
	    const data = receivedMessage.Dictionary[0]?.data;
	    for (const action of actions) {
	        const listener = action.listeners?.[type];
	        if (listener) {
	            listener(receivedMessage, data);
	        }
	    }
	    console.log("receivePacket", type, data, receivedMessage.Sender);
	};
	/**
	 *
	 * Initializes hooks for intercepting chat room messages and synchronizing player data.
	 * This function waits until the server is connected before setting up hooks.
	 */
	const initHooks = async () => {
	    await waitFor(() => ServerSocket && ServerIsConnected);
	    bcModSDK.hookFunction("DrawCharacter", 1, (args, next) => {
	        const [C, CharX, CharY, Zoom] = args;
	        if (isABCLPlayer(C) && C.ABCL.Stats.PuddleSize.value > 0) {
	            const puddleSizeFactor = C.ABCL.Stats.PuddleSize.value / 300;
	            const width = 512 * puddleSizeFactor;
	            const height = 235 * puddleSizeFactor;
	            // Calculate the centered position
	            const x = CharX + (250 * Zoom - width / 2);
	            const y = CharY + (940 * Zoom - height / 2);
	            DrawImageResize(`${"http://localhost:3042/assets"}/puddle.png`, x, y, width, height);
	        }
	        return next(args);
	    });
	    bcModSDK.hookFunction("ChatRoomSync", 1, (args, next) => {
	        sendUpdateMyData(); // Tell everyone else to update their copy of our data, when we join a room.
	        return next(args);
	    });
	    bcModSDK.hookFunction("ChatRoomMessage", 1, (args, next) => {
	        if (args[0].Content === "ServerEnter" && args[0].Sender === Player.MemberNumber) {
	            // Announce (via an init packet) that we're ready to receive data models.
	            sendRequestOtherDataPacket();
	            return;
	        }
	        receivePacket(args[0]);
	        return next(args);
	    });
	    bcModSDK.hookFunction("CharacterAppearanceSetItem", 1, (args, next) => {
	        let [_character, _slot, _asset] = args;
	        const _result = next(args);
	        if (_slot === "ItemPelvis" && _asset) {
	            if (isDiaper({ Asset: _asset }))
	                updateDiaperColor();
	        }
	        return _result;
	    });
	    bcModSDK.hookFunction("PreferenceSubscreenChatClick", 1, (args, next) => {
	        if (MouseIn(1815, 75, 90, 90)) {
	            const theme = Player.ChatSettings?.ColorTheme ?? "Light";
	            if (theme.startsWith("Light") && !!overlay && !overlay.classList.contains("sl-theme-light")) {
	                overlay.classList.remove("sl-theme-dark");
	                overlay.classList.add("sl-theme-light");
	                overlay.style.color = "black";
	                logger.info(`SL theme switching: Light`);
	            }
	            if (theme.startsWith("Dark") && !!overlay && !overlay.classList.contains("sl-theme-dark")) {
	                overlay.classList.remove("sl-theme-light");
	                overlay.classList.add("sl-theme-dark");
	                overlay.style.color = "white";
	                logger.info(`SL theme switching: Dark`);
	            }
	        }
	        return next(args);
	    });
	};
	const reportWebhookURL = `https://discord.com/api/webhooks/1340000414506029162/aqt7qruFnzDMM5BN_kLtv9gCcallIF-JeRVYl9k23uSIlxrHRvcFMy5mtPUPGDpWZhHX`;
	const lastDetectedErrors = [];
	window.addEventListener("error", async (e) => {
	    console.error(e.filename);
	    if (!e.filename.toLowerCase().includes("abcl"))
	        return;
	    const detectedError = `${e.message} at ${e.filename} ${e.lineno}`;
	    if (lastDetectedErrors.includes(detectedError))
	        return;
	    lastDetectedErrors.push(detectedError);
	    const body = {
	        username: `${Player.Name} ${Player.Nickname === "" ? "" : `aka ${Player.Nickname}`} (${Player.MemberNumber})`,
	        thread_name: `${ModIdentifier} ${ModVersion} Error ${e.message}`.slice(0, 100),
	        content: `
    error: ${detectedError}
\`\`\`
${e.error.stack}
\`\`\`
mods: ${t$1
            .getModsInfo()
            .map(m => m.name)
            .join(", ")}`,
	    };
	    await fetch(reportWebhookURL, {
	        method: "POST",
	        headers: {
	            "Content-Type": "application/json",
	        },
	        body: JSON.stringify(body),
	    });
	});

	const initScreens = (screens) => {
	    bcModSDK.hookFunction("TextLoad", 5, (args, next) => {
	        if (screens.some((screen) => screen.module === CurrentModule && screen.id === CurrentScreen)) {
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

	const htmlSettingPage = document.createElement("div");
	htmlSettingPage.classList.add(`${"ABCL"}SettingPage`, `${"ABCL"}Hidden`);
	const initSettingsScreen = async () => {
	    htmlSettingPage.innerHTML = `<sl-tab-group>
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="remote">Remote</sl-tab>
  <sl-tab-panel name="general">
    <sl-radio-group class="${"ABCL"}PeeMetabolismSelect" label="Select Pee Metabolism" name="pee-metabolism" value="${abclPlayer.settings.PeeMetabolism}">
    <sl-radio-button value="Disabled">Disabled</sl-radio-button>
    <sl-radio-button value="Slow">Slow</sl-radio-button>
    <sl-radio-button value="Normal">Normal</sl-radio-button>
    <sl-radio-button value="Fast">Fast</sl-radio-button>
    <sl-radio-button value="Faster">Faster</sl-radio-button>
    <sl-radio-button value="Fastest">Fastest</sl-radio-button>
    </sl-radio-group>

    <sl-radio-group class="${"ABCL"}PoopMetabolismSelect" label="Select Poop Metabolism" name="poop-metabolism" value="${abclPlayer.settings.PoopMetabolism}">
    <sl-radio-button value="Disabled">Disabled</sl-radio-button>
    <sl-radio-button value="Slow">Slow</sl-radio-button>
    <sl-radio-button value="Normal">Normal</sl-radio-button>
    <sl-radio-button value="Fast">Fast</sl-radio-button>
    <sl-radio-button value="Faster">Faster</sl-radio-button>
    <sl-radio-button value="Fastest">Fastest</sl-radio-button>
    </sl-radio-group>

    <sl-radio-group class="${"ABCL"}OnDiaperChangeSelect" label="Select On Diaper Change" name="on-diaper-change" value="${abclPlayer.settings.OnDiaperChange}">
    <sl-radio-button value="Deny">Deny</sl-radio-button>
    <sl-radio-button value="Ask">Ask</sl-radio-button>
    <sl-radio-button value="Allow">Allow</sl-radio-button>
    </sl-radio-group>
  
  <h1 class="${"ABCL"}MessageVisibility"> Message visibility for others: </h1>
  <div style="margin-left: 1em;"> 
    <sl-checkbox class="${"ABCL"}ChangeDiaperVisibility" name="change-diaper-visibility" checked="${abclPlayer.settings.getPublicMessage("changeDiaper")}">Change Diaper</sl-checkbox>
    <sl-checkbox class="${"ABCL"}CheckDiaperVisibility" name="check-diaper-visibility" checked="${abclPlayer.settings.getPublicMessage("checkDiaper")}">Check Diaper</sl-checkbox>
    <sl-checkbox class="${"ABCL"}LickPuddleVisibility" name="lick-puddle-visibility" checked="${abclPlayer.settings.getPublicMessage("lickPuddle")}">Lick Puddle</sl-checkbox>
    <sl-checkbox class="${"ABCL"}WetDiaperVisibility" name="wet-diaper-visibility" checked="${abclPlayer.settings.getPublicMessage("wetDiaper")}">Wet Diaper</sl-checkbox>
    <sl-checkbox class="${"ABCL"}WetClothingVisibility" name="wet-clothing-visibility" checked="${abclPlayer.settings.getPublicMessage("wetClothing")}">Wet Clothing</sl-checkbox>
    <sl-checkbox class="${"ABCL"}SoilDiaperVisibility" name="soil-diaper-visibility" checked="${abclPlayer.settings.getPublicMessage("soilDiaper")}">Soil Diaper</sl-checkbox>
    <sl-checkbox class="${"ABCL"}SoilClothingVisibility" name="soil-clothing-visibility" checked="${abclPlayer.settings.getPublicMessage("soilClothing")}">Soil Clothing</sl-checkbox>
    <sl-checkbox class="${"ABCL"}UsePottyVisibility" name="use-potty-visibility" checked="${abclPlayer.settings.getPublicMessage("usePotty")}">Use Potty</sl-checkbox>
    <sl-checkbox class="${"ABCL"}UseToiletVisibility" name="use-toilet-visibility" checked="${abclPlayer.settings.getPublicMessage("useToilet")}">Use Toilet</sl-checkbox>
    <sl-checkbox class="${"ABCL"}WipePuddleVisibility" name="wipe-puddle-visibility" checked="${abclPlayer.settings.getPublicMessage("wipePuddle")}">Wipe Puddle</sl-checkbox>
  </div>
  </sl-tab-panel>

  <sl-tab-panel name="remote">
    ${
    /* <sl-select class="${"ABCL"}RemotePlayerSelect" label="Select Player" name="player" value="">
  </sl-select>
  <sl-button class="${"ABCL"}RefreshRemotes">Refresh Remotes</sl-button>
  <sl-tab-group>
    <sl-tooltip content="Attempts to update the selected player's settings" placement="right-start">
      <sl-button class="${"ABCL"}RemotePushSettings">Push Settings</sl-button>
    </sl-tooltip>
    <sl-tab slot="nav" panel="general">General</sl-tab>
    
    <sl-tab-panel name="general">
      <sl-radio-group class="${"ABCL"}RemotePeeMetabolismSelect" label="Select Pee Metabolism" name="pee-metabolism" value="${abclPlayer.settings.PeeMetabolism}">
      <sl-radio-button value="Disabled">Disabled</sl-radio-button>
      <sl-radio-button value="Slow">Slow</sl-radio-button>
      <sl-radio-button value="Normal">Normal</sl-radio-button>
      <sl-radio-button value="Fast">Fast</sl-radio-button>
      <sl-radio-button value="Faster">Faster</sl-radio-button>
      <sl-radio-button value="Fastest">Fastest</sl-radio-button>
      </sl-radio-group>

      <sl-radio-group class="${"ABCL"}RemotePoopMetabolismSelect" label="Select Poop Metabolism" name="poop-metabolism" value="${abclPlayer.settings.PoopMetabolism}">
      <sl-radio-button value="Disabled">Disabled</sl-radio-button>
      <sl-radio-button value="Slow">Slow</sl-radio-button>
      <sl-radio-button value="Normal">Normal</sl-radio-button>
      <sl-radio-button value="Fast">Fast</sl-radio-button>
      <sl-radio-button value="Faster">Faster</sl-radio-button>
      <sl-radio-button value="Fastest">Fastest</sl-radio-button>
      </sl-radio-group>
      <sl-radio-group class="${"ABCL"}RemoteOnDiaperChangeSelect" label="Select On Diaper Change" name="on-diaper-change" value="${abclPlayer.settings.OnDiaperChange}">
      <sl-radio-button value="Deny">Deny</sl-radio-button>
      <sl-radio-button value="Ask">Ask</sl-radio-button>
      <sl-radio-button value="Allow">Allow</sl-radio-button>
      </sl-radio-group> */ "In development"}
      </sl-tab-panel>
    </sl-tab-group>
  </sl-tab-panel>
</sl-tab-group>
  `;
	    // remote
	    /*  const remotePlayerSelect: HTMLSelectElement | null = htmlSettingPage.querySelector(`.${"ABCL"}RemotePlayerSelect`);
	    const refreshRemotes: HTMLButtonElement | null = htmlSettingPage.querySelector(`.${"ABCL"}RefreshRemotes`);
	    const remotePushSettings: HTMLButtonElement | null = htmlSettingPage.querySelector(`.${"ABCL"}RemotePushSettings`);
	   */
	    // remote general
	    /*   const remotePeeMetabolismSelect: HTMLSelectElement | null = htmlSettingPage.querySelector(`.${"ABCL"}RemotePeeMetabolismSelect`);
	    const remotePoopMetabolismSelect: HTMLSelectElement | null = htmlSettingPage.querySelector(`.${"ABCL"}RemotePoopMetabolismSelect`);
	    const remoteOnDiaperChangeSelect: HTMLSelectElement | null = htmlSettingPage.querySelector(`.${"ABCL"}RemoteOnDiaperChangeSelect`);
	   */
	    // general
	    const peeMetabolismSelect = getElement(htmlSettingPage, `.${"ABCL"}PeeMetabolismSelect`);
	    const poopMetabolismSelect = getElement(htmlSettingPage, `.${"ABCL"}PoopMetabolismSelect`);
	    const onDiaperChangeSelect = getElement(htmlSettingPage, `.${"ABCL"}OnDiaperChangeSelect`);
	    const visibilityElements = {
	        useToilet: getElement(htmlSettingPage, `.${"ABCL"}UseToiletVisibility`),
	        wipePuddle: getElement(htmlSettingPage, `.${"ABCL"}WipePuddleVisibility`),
	        changeDiaper: getElement(htmlSettingPage, `.${"ABCL"}ChangeDiaperVisibility`),
	        checkDiaper: getElement(htmlSettingPage, `.${"ABCL"}CheckDiaperVisibility`),
	        lickPuddle: getElement(htmlSettingPage, `.${"ABCL"}LickPuddleVisibility`),
	        wetDiaper: getElement(htmlSettingPage, `.${"ABCL"}WetDiaperVisibility`),
	        wetClothing: getElement(htmlSettingPage, `.${"ABCL"}WetClothingVisibility`),
	        soilDiaper: getElement(htmlSettingPage, `.${"ABCL"}SoilDiaperVisibility`),
	        soilClothing: getElement(htmlSettingPage, `.${"ABCL"}SoilClothingVisibility`),
	        usePotty: getElement(htmlSettingPage, `.${"ABCL"}UsePottyVisibility`),
	    };
	    // general
	    peeMetabolismSelect.addEventListener("sl-change", (e) => {
	        abclPlayer.settings.PeeMetabolism = e.target.value;
	    });
	    poopMetabolismSelect.addEventListener("sl-change", (e) => {
	        abclPlayer.settings.PoopMetabolism = e.target.value;
	    });
	    onDiaperChangeSelect.addEventListener("sl-change", (e) => {
	        abclPlayer.settings.OnDiaperChange = e.target.value;
	    });
	    for (const key of Object.keys(visibilityElements)) {
	        if (visibilityElements.hasOwnProperty(key)) {
	            visibilityElements[key].addEventListener("sl-change", (e) => {
	                abclPlayer.settings.setPublicMessage(key, e.target.checked);
	            });
	        }
	    }
	    /*   remotePushSettings.addEventListener("click", () => {
	      const memberNumber = parseInt(remotePlayerSelect.value, 10);
	      if (!isNaN(memberNumber)) {
	        //pushSettings(memberNumber);
	      }
	    }); */
	    /*  remotePlayerSelect.addEventListener("sl-change", (e: any) => {
	      updateSelectedRemotePlayer(parseInt(e.target.value, 10));
	    });
	    refreshRemotes.addEventListener("click", () => {
	      updateRemoteList(remotePlayerSelect);
	    }); */
	    overlay.appendChild(htmlSettingPage);
	    PreferenceRegisterExtensionSetting({
	        Identifier: "ABCL",
	        ButtonText: `${ModName} Settings`,
	        Image: `${"http://localhost:3042/assets"}/abcl.png`,
	        run: () => {
	            DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
	        },
	        click: () => {
	            if (MouseIn(1815, 75, 90, 90))
	                PreferenceSubscreenExtensionsExit();
	        },
	        exit: () => {
	            htmlSettingPage.classList.add(`${"ABCL"}Hidden`);
	            syncData();
	            return true;
	        },
	        load: () => {
	            htmlSettingPage.classList.remove(`${"ABCL"}Hidden`);
	            /*    let selectedCharacter: Character | undefined = getCharacter(remotePlayerSelect.value);
	            if (!selectedCharacter || !selectedCharacter?.ABCL) {
	              selectedCharacter = Player;
	            }
	      
	            updateRemoteList(remotePlayerSelect);
	            // fill select ChatRoomCharacter */
	            peeMetabolismSelect.setAttribute("value", abclPlayer.settings.PeeMetabolism);
	            poopMetabolismSelect.setAttribute("value", abclPlayer.settings.PoopMetabolism);
	            onDiaperChangeSelect.setAttribute("value", abclPlayer.settings.OnDiaperChange);
	        },
	    });
	};

	// from LSCG - https://github.com/littlesera/LSCG/blob/8072c4d636a66bf12473823722afbc82fda8f98e/src/MiniGames/minigames.ts#L3C1-L3C87
	// for minigame text loading
	bcModSDK.hookFunction("TextLoad", 5, (args, next) => {
	    if (CurrentScreen === "WetMinigame" || CurrentScreen === "MessMinigame")
	        return;
	    else
	        return next(args);
	});
	const initMinigames = () => {
	    registerMiniGame(new MessMinigame());
	    registerMiniGame(new WetMinigame());
	};
	function registerMiniGame(miniGame) {
	    var name = miniGame.name;
	    console.log("Registering minigame: " + name);
	    window[name + "Run"] = () => miniGame.Run();
	    window[name + "Click"] = () => miniGame.Click();
	    window[name + "Load"] = () => miniGame.Load();
	    window[name + "Unload"] = () => miniGame.Unload();
	    window[name + "Resize"] = () => miniGame.Resize();
	    window[name + "KeyDown"] = () => miniGame.KeyDown();
	    window[name + "Exit"] = () => miniGame.Exit();
	    window[name + "End"] = (victory) => miniGame.End(victory);
	}
	class BaseMiniGame {
	    constructor() {
	        this.name = "";
	    }
	    Load() { }
	    Unload() { }
	    Resize() { }
	    KeyDown() { }
	    Exit() { }
	    End(victory) { }
	}
	class AccidentMiniGame extends BaseMiniGame {
	    constructor() {
	        super(...arguments);
	        this.startText = "";
	        this.hintText = "";
	        this.failText = "";
	        this.successText = "";
	        this.tintColor = [{ r: 0, g: 0, b: 0, a: 0 }];
	        this.GameStartTime = 0;
	        this.GameEndTime = 0;
	        this.StartDelay = 4000;
	        this.AccidentVelocity = 0;
	        this.AccidentPosition = 0;
	        this.AccidentAcceleration = 0;
	        this.AccidentMaxPosition = 100;
	        this.AccidentGameDuration = 5000;
	        this.AccidentNextTick = 0;
	        this.AccidentText = "";
	        this.AccidentChallenge = 0;
	        this.BaseGameLength = 6000;
	    }
	    End(Victory) {
	        CommonSetScreen("Online", "ChatRoom");
	        MiniGameVictory = Victory;
	        MiniGameEnded = true;
	        MiniGameTimer = CommonTime();
	        this.GameEndTime = MiniGameTimer;
	    }
	    get IsStartDelay() {
	        return CommonTime() < this.GameStartTime;
	    }
	    Load() {
	        DrawFlashScreen("#000000", 750, 1000);
	        this.GameStartTime = CommonTime() + this.StartDelay;
	        this.AccidentVelocity = 0;
	        this.AccidentAcceleration = 0;
	        if (typeof MiniGameDifficulty != "number") {
	            MiniGameTimer = CommonTime() + this.BaseGameLength; // 5 seconds base
	            this.AccidentChallenge = 5;
	        }
	        else {
	            var difficultyTimeAdd = (MiniGameDifficulty - 8) * 0.25;
	            this.AccidentGameDuration = this.BaseGameLength + 1000 * difficultyTimeAdd;
	            MiniGameTimer = this.GameStartTime + this.AccidentGameDuration; // One extra second per challenge level, minus a third of a second per willpower.
	            this.AccidentChallenge = MiniGameDifficulty;
	        }
	        this.AccidentMaxPosition = 400;
	        this.AccidentPosition = this.AccidentMaxPosition;
	        console.info("Accident minigame started: difficulty - " + this.AccidentChallenge + " time - " + this.AccidentGameDuration);
	    }
	    get IsGameActive() {
	        return CommonTime() < MiniGameTimer && !MiniGameEnded && !this.GameFailed;
	    }
	    get IsGameTimeout() {
	        return CommonTime() >= MiniGameTimer && !MiniGameEnded;
	    }
	    get IsEndGameReport() {
	        return CommonTime() < this.GameEndTime + 5000;
	    }
	    get GameFailed() {
	        return this.AccidentPosition <= 0;
	    }
	    RunGame(delta) {
	        var timeElapsed = (this.AccidentGameDuration + CommonTime() - MiniGameTimer) / 1000;
	        // Adjust acceleration every .4s ticks
	        if (CommonTime() > this.AccidentNextTick) {
	            this.AccidentNextTick = CommonTime() + 400;
	            this.AccidentAcceleration = -(this.AccidentChallenge * 1.25) - timeElapsed * Math.random();
	        }
	        this.AccidentVelocity = Math.min(this.AccidentVelocity, this.AccidentVelocity + this.AccidentAcceleration * 0.25);
	        if (this.AccidentPosition >= this.AccidentMaxPosition)
	            this.AccidentVelocity = Math.min(0, this.AccidentVelocity);
	        if (this.AccidentPosition > 0) {
	            this.AccidentPosition += (this.AccidentVelocity / 1000) * delta * 3.5;
	        }
	        this.AccidentPosition = Math.max(0, Math.min(this.AccidentPosition, this.AccidentMaxPosition));
	        DrawProgressBar(500 - this.AccidentMaxPosition, 800, 2 * this.AccidentMaxPosition, 50, 100 * (this.AccidentPosition / this.AccidentMaxPosition));
	        DrawText(this.hintText, 500, 875, "white", "black");
	        // var debugStr = "Chal: " + this.AccidentChallenge + " Pos: " + this.AccidentPosition + " Vel: " + this.AccidentVelocity + " Acc: " + this.AccidentAcceleration;
	        // var prev = MainCanvas.textAlign;
	        // MainCanvas.textAlign = "left";
	        // DrawText(debugStr, 0, 100, "White", "Black");
	        // MainCanvas.textAlign = prev;
	        // console.info(debugStr);
	    }
	    Run() {
	        ChatRoomRun(CommonTime());
	        if (this.IsStartDelay) {
	            DrawText(this.startText, 500, 500, "white", "black");
	        }
	        else if (this.IsGameActive) {
	            this.RunGame(TimerRunInterval);
	        }
	        else if ((this.IsGameTimeout || this.GameFailed) && !MiniGameEnded) {
	            this.End(this.AccidentPosition > 0);
	            MiniGameEnd();
	        }
	    }
	    Click() {
	        //CommonIsMobile
	        if (this.IsGameActive)
	            this.AccidentVelocity = Math.max(this.AccidentVelocity + (getRandomInt(11) + 5), 20);
	    }
	}
	function getRandomInt(max) {
	    return Math.floor(Math.random() * max);
	}
	class MessMinigame extends AccidentMiniGame {
	    constructor() {
	        super(...arguments);
	        this.startText = "A sudden pressure builds within you...";
	        this.hintText = "Click to maintain control. Keep it together!";
	        this.failText = "Oops! You've had an accident!";
	        this.successText = "Crisis averted! You stayed composed!";
	        this.name = "MessMinigame";
	    }
	    End(victory) {
	        super.End(victory);
	        if (victory) {
	            abclPlayer.stats.Incontinence -= incontinenceOnAccident() / 2;
	            sendChatLocal("You managed to keep it together!");
	            return;
	        }
	        abclPlayer.soil();
	        abclPlayer.onAccident();
	    }
	}
	class WetMinigame extends AccidentMiniGame {
	    constructor() {
	        super(...arguments);
	        this.startText = "You feel a trickle starting...";
	        this.hintText = "Click to squeeze tight. Don't let it get away!";
	        this.failText = "Oh no! You lost control!";
	        this.successText = "You held it in! Phew!";
	        this.name = "WetMinigame";
	    }
	    End(victory) {
	        super.End(victory);
	        if (victory) {
	            abclPlayer.stats.Incontinence -= incontinenceOnAccident() / 2;
	            sendChatLocal("You managed to hold it in!");
	            return;
	        }
	        abclPlayer.wet();
	        abclPlayer.onAccident();
	    }
	}

	window.clearData = clearData;
	window.saveData = syncData;
	window.mutateData = updateData;
	window.noOp = () => { };
	window.sendChatLocal = sendChatLocal;
	window.averageColor = averageColor;
	console.log(averageColor("#ffffff", "#928f67", 0.99));

	function initApi() {
	    window[`${"ABCL"}`] = {
	        inModSubscreen: () => Boolean(overlay.querySelector(`.${"ABCL"}SettingPage`)?.classList.contains(`${"ABCL"}Hidden`)),
	        isABCLPlayer,
	        sendDataToAction,
	        sendUpdateMyData,
	        sendRequestOtherDataPacket,
	        //
	    };
	}

	let o$1 = class o{constructor(t){this.hookMng=t,this.workList=[];}run(t,o){let n,i=!1;for(const s of this.workList)if("inject"===s.value)s.work(t,o);else if("next"===s.value)n=o(t),i=!0;else if("override"===s.value)n=s.work(t,o),i=!0;else if("flag"===s.value){if(!s.flag)break;s.once&&(s.flag=!1);}else if("check"===s.value&&!s.work(t,o))break;return i?n:o(t)}next(){return this.workList.push({value:"next"}),this}inject(t){return this.workList.push({value:"inject",work:t}),this}inside(t,{once:o=!1,priority:n=1}={}){const i={value:"flag",flag:!1,once:o};return this.hookMng.hookFunction(t,n,((t,o)=>{i.flag=!0;const n=o(t);return i.flag=!1,n})),this.workList.push(i),this}when(t){return this.workList.push({value:"check",work:t}),this}override(t){return this.workList.push({value:"override",work:t}),this}};let n$1;let i$1 = class i{static info(t){n$1?.info(t);}static warn(t){n$1?.warn(t);}static error(t){n$1?.error(t);}};let s$1 = class s{constructor(t=!1){this.done=t,this.list=[];}run(){for(this.done=!0;this.list.length>0;)this.list.shift()();}push(t){this.done?t():this.list.push(t);}};const r$1=new s$1,e=new s$1,h$1=new s$1,l$1=new s$1;function u$1(){return null!=globalThis.Player&&"number"==typeof globalThis.Player.MemberNumber}let a$1;const c$1=new class{get mod(){return a$1}push(t,o){t.push(o);}init(o){a$1=t$1.registerMod(o),l$1.run(),e.run();const n=()=>h$1.run();u$1()?n():this.mod.hookFunction("LoginResponse",0,((t,o)=>{o(t),u$1()&&n();})),r$1.run();}initWithMod(t){a$1=t,l$1.run(),e.run();const o=()=>h$1.run();u$1()?o():this.mod.hookFunction("LoginResponse",0,((t,n)=>{n(t),u$1()&&o();}));}afterInit(t){this.push(r$1,t);}afterPlayerLogin(t){this.push(h$1,t);}patchFunction(t,o){this.push(l$1,(()=>this.mod.patchFunction(t,o)));}invokeOriginal(t,...o){return this.mod?this.mod.callOriginal(t,o):globalThis[t]?.(...o)}hookFunction(t,o,n){this.push(e,(()=>this.mod.hookFunction(t,o,n)));}progressiveHook(t,n=1){const i=new o$1(this);return this.hookFunction(t,n,((t,o)=>i.run(t,o))),i}hookPlayerFunction(t,o,n){var i;i=()=>this.mod.hookFunction(t,o,n),u$1()?h$1.push(i):i();}globalFunction(t,o){"function"!=typeof o&&i$1.warn("globalFunction: param is not a function"),null==globalThis[t]?globalThis[t]=o:globalThis[t]!=o&&i$1.warn(`globalFunction: ${t} is already defined`);}randomGlobalFunction(t,o){const n=t=>t+Math.random().toString(16).substring(2);let i=n(t);for(;null!=globalThis[i];)i=n(t);return globalThis[i]=o,i}setLogger(t){!function(t){n$1=t;}(t);}};

	const t=new Set(["ItemTorso","ItemTorso2"]),n={ItemTorso:t,ItemTorso2:t},s={},o={};function a(e){return (n[e]&&Array.from(n[e])||[e]).map((e=>r(e)))}function r(e){return {name:e,group:AssetGroupGet("Female3DCG",e)}}function i(e){return s[e]}class c{static add(e){for(const[t,n]of Object.entries(e))for(const[e,s]of Object.entries(n))a(t).forEach((({name:t})=>{AssetFemale3DCGExtended[t]||(AssetFemale3DCGExtended[t]={}),AssetFemale3DCGExtended[t][e]||(AssetFemale3DCGExtended[t][e]=s);}));}static get value(){return AssetFemale3DCGExtended}}const m={};class u{static add(e,t){return 0===Object.keys(m).length&&AssetFemale3DCG.forEach((e=>{m[e.Group]||(m[e.Group]={});for(const t of e.Asset){const n=l(t);m[e.Group][n.Name]=n;}})),m[e]||(m[e]={}),m[e][t.Name]=t,m}static get value(){return m}}function l(e){return "string"==typeof e?{Name:e}:e}const f={},p={},d=(e,t)=>p[e]?.[t];function g(){return p}function A(){let t=!1;c$1.progressiveHook("DialogInventoryBuild").inject((e=>{e[2]||(t=!0);})),c$1.progressiveHook("DialogInventoryAdd").next().inject((e=>{if(!t)return;t=!1;const n=e[1].Asset.Group.Name,s=new Set(DialogInventory.map((e=>e.Asset.Name)));p[n]&&Object.entries(p[n]).filter((([e,t])=>!t.NotVisibleOnScreen?.includes("LuziScreen")&&!s.has(e))).forEach((([t,n])=>DialogInventoryAdd(e[0],{Asset:n},!1)));}));const n=(...[e,t])=>{const[n,s,o]=e;return !!d(o,s)||t(e)};c$1.progressiveHook("InventoryAvailable").inside("CharacterAppearanceValidate").override(n),c$1.progressiveHook("InventoryAvailable").inside("CraftingItemListBuild").override(n),c$1.progressiveHook("InventoryAvailable").inside("WardrobeFastLoad").override(n),c$1.progressiveHook("CraftingValidate").inject((e=>{const t=e[0]?.Item;if(!t)return;const n=CraftingAssets[t]?.[0];n&&function(e,t){const n=d(e,t);return !!n&&!n.NotVisibleOnScreen?.includes("LuziScreen")}(n.Group.Name,n.Name)&&(e[3]=!1);}));const s=c$1.randomGlobalFunction("CraftingInventory",(()=>[...Player.Inventory,...Object.values(p).map((e=>Object.values(e))).flat().map((e=>({Asset:e})))]));c$1.patchFunction("CraftingRun",{"for (let Item of Player.Inventory) {":`for (let Item of ${s}()) {`});}function h(e){return !!(e&&e.Asset&&d(e.Asset.Group.Name,e.Asset.Name))}function N(e,t){const n="TW"!==TranslationLanguage?TranslationLanguage:"CN";let s=e(n);return void 0!==s?s:(s="CN"===n?e("CN"):e("EN")||e("CN"),void 0!==s?s:t)}function v(e,t,n){return N((n=>e[n]?.[t]),n)}function G(e){return t=e,N((e=>t[e]),e.CN);var t;}function I(e,t){return e?e.CN?e:{...e,CN:t}:{CN:t}}function C(e,t,n){const s={};for(const[o,a]of Object.entries(n))a[e]?.[t]&&(s[o]=a[e][t]);return s}const y={},D={};class ${static setAsset(e,t,n){Object.entries(n).forEach((([n,s])=>{const o=n;y[o]||(y[o]={}),y[o][e]||(y[o][e]={}),y[o][e][t]=s;}));}static setGroup(e,t){Object.entries(t).forEach((([t,n])=>{const s=t;D[s]||(D[s]={}),D[s][e]=n;}));}}function b(e,t){return n=y,s=e,o=t,N((e=>n[e]?.[s]?.[o]),t.replace(/_.*?Luzi$/,""));var n,s,o;}function F(e,t){e.Description=t;}function w(){Object.values(f).forEach((e=>F(e,function(e){return v(D,e,e.replace(/_.*?Luzi$/,""))}(e.Name)))),Object.values(g()).map((e=>Object.values(e))).flat().forEach((e=>F(e,b(e.Group.Name,e.Name)))),Object.entries(g()).map((([e,t])=>({group:i(e),asset:t}))).filter((({group:e})=>!!e)).map((({group:e,asset:t})=>Object.entries(t).map((([t,n])=>({asset:n,fromAsset:AssetGet("Female3DCG",e,t)}))))).flat().filter((({fromAsset:e})=>!!e)).forEach((({asset:e,fromAsset:t})=>F(e,t.Description)));const e=TextAllScreenCache.get(AssetStringsPath),t=e=>{const t=o,n=new Set,s=AssetGroup.map((e=>e.Name)).sort(((e,t)=>t.length-e.length));Object.entries(e.cache).forEach((([o,a])=>{if(n.has(o))return;const r=s.find((e=>o.startsWith(e)));if(!r)return;n.add(o);const i=t[r];if(!i)return;const c=o.slice(r.length);i.forEach((t=>{const n=t+c;e.cache[n]||(e.cache[n]=a);}));}));};e&&(e.loaded?t(e):e.rebuildListeners.push((e=>e&&t(e))));}let E=!1;const L=new Map;let j;function O(e,t,n,s=!1){if(j?.()?.cache){const o=TranslationLanguage;if(j().cache[e]&&s)return;j().cache[e]=t[o]||t.CN||n;}else {if(s&&L.has(e))return;L.set(e,{desc:t,fallback:n,noOverride:s});}}const S=e=>t=>Object.entries(e||{CN:{[t]:t}}).map((([e,n])=>[e,n[t]||e])).reduce(((e,[t,n])=>(e[t]=n,e)),{});function T(e,t,{entries:n,noOverride:s}={}){const o=S(n);t.Layer?.forEach((({Name:n})=>{n?O(`${e}${t.Name}${n}`,o(n),n,!!s):O(`${e}${t.Name}`,{CN:t.Name.replace(/_.*?Luzi$/,"")},t.Name,!!s);}));}let x;class P{static info(e){x?.info(e);}static warn(e){x?.warn(e);}static error(e){x?.error(e);}}let _=!1;const k=[];function M(e){_?e():k.push(e);}const B={};const R={};function H(e,t){const n=AssetGroupGet("Female3DCG",e);_&&n?t(n):(R[e]||(R[e]=[]),R[e].push(t));}let W=!1;const z=[];function U(e){W?e():z.push(e);}const V=new Set;function X(t={start:"Start loading",end:"Loading completed, time usage: "}){const n=()=>{P.info(t.start);const e=Date.now();for(!function(){for(;k.length>0;)k.shift()();}(),_=!0,AssetGroup.forEach((e=>function(e){if(B[e.Name])for(;B[e.Name].length>0;)B[e.Name].shift()(e);}(e))),AssetGroup.forEach((e=>function(e){if(R[e.Name])for(;R[e.Name].length>0;)R[e.Name].shift()(e);}(e))),CraftingAssets=CraftingAssetsPopulate(),W=!0;z.length>0;)z.shift()();const n=Date.now();P.info(`${t.end} ${n-e}ms`);};AssetGroup.length>50?n():c$1.progressiveHook("AssetLoadAll",1).next().inject((()=>n()));}function Z(t,n,{extendedConfig:s,description:o,dynamicName:i,preimage:m,noMirror:f}={}){!function(e,t){const n=AssetGroupGet("Female3DCG",e);_&&n?t(n):(B[e]||(B[e]=[]),B[e].push(t));}(t,(e=>{u.add(e.Name,n),s&&c.add(s);}));const d=t;!function(e,t,n){const s=n=>{const o=t?[r(e)]:a(e),i=o.find((({group:e})=>!e));if(i)return V.has(i.name)?void console.error(`[AssetManager] Required group "${i.name}" not found`):(V.add(i.name),void H(i.name,(()=>s(n))));o.forEach((({group:e})=>n(e)));};_?s(n):H(e,(()=>s(n)));}(t,!!f,(t=>{const s=t.Name,a=l(n),r=AssetResolveCopyConfig.AssetDefinition(a,s,u.value);if(!r)return;const f=I(o,r.Name.replace(/_.*?Luzi$/,""));void 0!==g()[s]?.[a.Name]&&console.warn(`[AssetManager] Asset {${s}:${a.Name}} already existed!`),function(...[t,n,s]){c$1.invokeOriginal("AssetAdd",t,n,s);const o=t.Name,a=n.Name;p[o]||(p[o]={});const r=AssetGet("Female3DCG",o,a);return r?(p[o][a]=r,Promise.resolve(r)):Promise.reject(`Asset ${o}:${a} not found`)}(t,r,c.value).then((e=>{if(e.DynamicGroupName===e.Group.Name&&(e.DynamicGroupName=i||d),m){const t=AssetGet("Female3DCG",m.Name,r.Name);t&&(e.Description=t.Description,e.DynamicGroupName=t.DynamicGroupName,["ScriptDraw","BeforeDraw","AfterDraw"].filter((e=>t[`Dynamic${e}`])).forEach((e=>function(e,t,n,s){const o=`Assets${t}${n.Name}${s}`,a=`Assets${e}${n.Name}${s}`;globalThis[o]&&(globalThis[a]=globalThis[o]);}(s,m.Name,r,e))));}else e.Description=G(f),T(e.DynamicGroupName,r,{noOverride:!0});})),$.setAsset(s,r.Name,f);}));}const J={};function Q(t,{description:n,dynamicName:s,preimage:o}={}){M((()=>{const a=I(n,t.Group.replace(/_.*?Luzi$/,""));((function(...[t,n]){const s=c$1.invokeOriginal("AssetGroupAdd",t,n);return f[s.Name]=s,Promise.resolve(s)}))("Female3DCG",t).then((e=>{e.Description=G(a),s&&(e.DynamicGroupName=s),t.Asset.forEach((e=>{Z(t.Group,l(e),{dynamicName:s,preimage:o});}));})),$.setGroup(t.Group,a);}));}const q=new Set;function K(e,t,a){const r=()=>{const i=AssetFemale3DCG.find((e=>e.Group===t)),c=AssetGroupGet("Female3DCG",t),m=AssetFemale3DCGExtended[t];if(!i||!c)return q.has(t)?void console.error(`[AssetManager] Group ${t} not found`):(q.add(t),void M(r));var u,l;l=e,n[u=t]||(n[u]=new Set([u])),n[u].add(l),o[u]||(o[u]=new Set),o[u].add(l),s[l]=u;const f=I(a,e.replace(/_.*?Luzi$/,""));Q({...i,Group:e,Default:!1,Random:!1},{description:f,dynamicName:i.DynamicGroupName||i.Group,preimage:c}),AssetFemale3DCGExtended[e]=m;};M(r);}const Y={};let ee,te=!1;let ne=!1;function se(t){ee=t,ne||(ne=!0,c$1.hookFunction("ValidationResolveRemoveDiff",1,((e,t)=>{const[n,s]=e;return !s.fromModUser&&d(n.Asset.Group.Name,n.Asset.Name)?{item:n,valid:!1}:t(e)})),c$1.hookFunction("ValidationResolveSwapDiff",1,((e,t)=>{const[n,s,o]=e;return !o.fromModUser&&d(n.Asset.Group.Name,n.Asset.Name)?{item:n,valid:!1}:t(e)})),c$1.hookFunction("ValidationResolveAppearanceDiff",1,((e,t)=>(ee&&(e[3].fromModUser=ee(e[3])),t(e)))));}function oe(e){return globalThis[e]}class ae{static _initStorage(){var e,t;oe(this._namespace)||(e=this._namespace,t={},globalThis[e]=t);}static get(e,t){this._initStorage();const n=oe(this._namespace);return e in n||(n[e]=t()),n[e]}static getMayOverride(e,t){this._initStorage();const n=oe(this._namespace);return n[e]=t(n[e]),n[e]}static set(e,t){this._initStorage(),oe(this._namespace)[e]=t;}static has(e){return this._initStorage(),e in oe(this._namespace)}static delete(e){this._initStorage();const t=oe(this._namespace);return e in t&&delete t[e]}static setImplementation(e){const t=["get","set","has","delete"];for(const n of t){if("function"!=typeof e[n])throw new Error(`Implementation must provide a '${n}' function`);ae[n]=e[n];}}static createNamespace(e){return {get:(t,n)=>ae.get(`${e}.${t}`,n),set:(t,n)=>ae.set(`${e}.${t}`,n),has:t=>ae.has(`${e}.${t}`),delete:t=>ae.delete(`${e}.${t}`)}}}function re(e){return new Promise((t=>setTimeout(t,e)))}ae._namespace="__BC_LUZI_GLOBALS__",ae.createNamespace("OnceFlag");class ie{static get emptyImage(){return "data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA\nG3RFWHRTb2Z0d2FyZQBDZWxzeXMgU3R1ZGlvIFRvb2zBp+F8AAAADUlEQVQI12P4//8/AwAI/AL+\nXJ/P2gAAAABJRU5ErkJggg=="}static assetPreviewIconPath(e){const t="Asset"in e?e.Asset:e;return `${AssetGetPreviewPath(t)}/${t.Name}.png`}static activityPreviewIconPath(e){return `Assets/Female3DCG/Activity/${("Activity"in e?e.Activity:e).Name}.png`}}const ce=new class{constructor(){this.basic={},this.custom={};}addImgMapping(e){this.custom={...this.custom,...e};}setBasicImgMapping(e){this.basic={...e,...this.basic};}mapImgSrc(e){if("string"!=typeof e)return e;if(!e.endsWith(".png"))return e;if(e.startsWith("data:image"))return e;if(e.startsWith("http"))return e;const t=e.startsWith("./")?e.slice(2):e;let n=t;return this.custom[n]&&(n=this.custom[n]),this.basic[n]&&(n=this.basic[n]),n!==t?n:e}mapImg(e,t){let n=e;n.startsWith("data:image")||n.startsWith("http")||(this.custom[n]&&(n=this.custom[n]),this.basic[n]&&(n=this.basic[n]),n!==e&&t(n));}};class ue{constructor(){c$1.patchFunction("GLDrawLoadImage",{"Img.src = url;":'Img.crossOrigin = "Anonymous";\n\t\tImg.src = url;'}),["DrawImageEx","DrawImageResize","GLDrawImage","DrawGetImage"].forEach((t=>{c$1.hookFunction(t,0,((e,t)=>(e[0]=ce.mapImgSrc(e[0]),t(e))));})),(async()=>{await function(e,t=100){return (async()=>{for(;!e();)await re(t);})()}((()=>void 0!==globalThis.ElementButton)),c$1.hookFunction("ElementButton.CreateForAsset",0,((e,t)=>(ce.mapImg(ie.assetPreviewIconPath(e[1]),(t=>{e[4]={...e[4],image:t};})),t(e)))),c$1.hookFunction("ElementButton.CreateForActivity",0,((e,t)=>{const n=e[1],s=n.Item?ie.assetPreviewIconPath(n.Item.Asset):`Assets/Female3DCG/Activity/${n.Activity.Name}.png`;return ce.mapImg(s,(t=>{e[4]={...e[4],image:t};})),t(e)}));const t=c$1.randomGlobalFunction("mapImage",(e=>ce.mapImgSrc(e)));c$1.patchFunction("ElementButton._ParseIcons",{"src = `./Assets/Female3DCG/ItemMisc/Preview/${icon}.png`":`src = ${t}(\`./Assets/Female3DCG/ItemMisc/Preview/\${icon}.png\`)`});})();}addImgMapping(e){ce.addImgMapping(e);}setBasicImgMapping(e){ce.setBasicImgMapping(e);}}const le=ae.get("ImageMapping",(()=>new ue));const fe=new class{addAsset(e,t,n,s,o=!1){Z(e,t,{extendedConfig:n&&{[e]:{[t.Name]:n}},description:s,noMirror:o});}addGroupedAssets(e,t,n){for(const[s,o]of Object.entries(e))for(const e of o){const o=s,a=t&&C(o,e.Name,t);Z(o,e,{extendedConfig:n&&n[o]?.[e.Name]&&{[o]:{[e.Name]:n[o][e.Name]}},description:a});}}addGroupedConfig(e){!function(e){e&&c.add(e);}(e);}modifyAsset(e,t,n){!function(e,t,n){const s=o=>{const a=AssetGet("Female3DCG",o.Name,t);if(a)n(o,a);else {if(J[e]||(J[e]=new Set),J[e].has(t))return void console.error(`[AssetManager] Asset ${e}:${t} not found`);J[e].add(t),H(e,s);}};H(e,s);}(e,t,n);}modifyAssetLayers(e,t){!function(e,t){U((()=>{Asset.filter(e).forEach((e=>{e.Layer.forEach((n=>t(e,n)));}));}));}(e,t);}modifyGroup(e,t){!function(e,t){H(e,(e=>t(e)));}(e,t);}addCustomDialog(e){!function(e){for(const[t,n]of Object.entries(e)){Y[t]||(Y[t]={});for(const[e,s]of Object.entries(n))Y[t][e]=s,e.includes("ItemTorso2")?Y[t][e.replace("ItemTorso2","ItemTorso")]=s:e.includes("ItemTorso")&&(Y[t][e.replace("ItemTorso","ItemTorso2")]=s);}}(e);}addImageMapping(e){le.addImgMapping(e);}get imageMapping(){return le}addGroup(e,t){Q(e,{description:t});}addCopyGroup(e,t,n){K(e,t,n);}addLayerNames(e,t,n){T(e,t,{entries:n});}addLayerNamesByEntry(e,t,n){!function(e,t,n,s=!0){const o=S(n);new Set(Object.entries(n).map((([e,t])=>Object.keys(t))).flat()).forEach((n=>{O(`${e}${t}${n}`,o(n),n,!!s);}));}(e,t,n);}assetIsCustomed(e){return void 0!==g()[e.Group.Name]?.[e.Name]}afterLoad(e){U(e);}init(t){!function(){if(te)return;te=!0;const t=e=>v(Y,e);c$1.progressiveHook("AssetTextGet").override(((e,n)=>t(e[0])||n(e))),c$1.progressiveHook("ChatRoomPublishCustomAction").inject((e=>{const[n,s,o]=e,a=t(n);a&&o.push({Tag:`MISSING TEXT IN "Interface.csv": ${n}`,Text:a});})).next();}(),function(){if(E)return;E=!0;const t=TextAllScreenCache.get(AssetStringsPath);t&&t.loaded&&("EN"===TranslationLanguage||"Bloated"!==t.get("Bloated"))?w():(c$1.progressiveHook("AssetBuildDescription").next().inject(w),c$1.progressiveHook("TranslationAssetProcess").next().inject(w));const n=c$1.randomGlobalFunction("CustomDialogInject",((e,t,n,s,o)=>{for(const[t,n]of [["PrevAsset",s],["NextAsset",o]])h(n)&&e.text(t,n.Asset.Description);}));c$1.patchFunction("ChatRoomPublishAction",{"ChatRoomCharacterItemUpdate(C);":`${n}(dictionary, C, Action, PrevItem, NextItem);\nChatRoomCharacterItemUpdate(C);`});}(),function(){const t=c$1.randomGlobalFunction("LayerNameInject",(e=>{j=e;}));c$1.patchFunction("ItemColorLoad",{"ItemColorLayerNames = new TextCache":`${t}(()=>ItemColorLayerNames);\nItemColorLayerNames = new TextCache`}),c$1.progressiveHook("ItemColorLoad",1).next().inject((()=>{const e=j?.()?.cache;e&&L.forEach(((e,t)=>{O(t,e.desc,e.fallback,e.noOverride);}));}));}(),A(),t(),X();}enableValidation(e){se(e);}setLogger(e){!function(e){x=e;}(e);}typeBodyGroupNames(){return this}};

	const pampsAssetDefintion = {
	    // Asset name, must be unique in the body group
	    Name: "Untrainers_Pamp",
	    // item appearing on random character
	    Random: false,
	    //  player canvas size is 500x1000
	    Left: 174,
	    Top: 434,
	    // the drawing order of the item, higher number means drawn later, and on top of other items
	    Priority: 20,
	    DefaultColor: ["#FFFFFF"],
	    // @ts-expect-error
	    ParentGroup: {},
	    // Asset layers, picture resource names
	    Layer: [
	        //Assets/[BodyGroup]/[AssetName]_[LayerName].png
	        {
	            // resouce located at "Assets/ItemMisc/SimpleExample_Base.png"
	            Name: "Base",
	            AllowColorize: true,
	        },
	        {
	            Name: "Patch",
	            AllowColorize: true,
	        },
	        {
	            Name: "Detail_2",
	            AllowColorize: true,
	        },
	        {
	            Name: "Detail_1",
	            AllowColorize: true,
	        },
	        {
	            Name: "Detail_3",
	            AllowColorize: true,
	        },
	        {
	            Name: "Tint",
	            AllowColorize: true,
	            EditOpacity: true,
	        },
	        {
	            Name: "Indicator",
	            AllowColorize: true,
	            EditOpacity: true,
	        },
	        {
	            Name: "Tabs",
	            AllowColorize: true,
	        },
	    ],
	};
	const translations$1 = {
	    CN: "Pampers尿布",
	    EN: "Pampers Diaper",
	    RU: "Памперсовые диаперы",
	};
	function pamps () {
	    fe.addImageMapping({
	        "Assets/Female3DCG/ItemPelvis/Untrainers_Pamp_Base.png": `${"http://localhost:3042/assets"}/items/diapers/Untrainer_Pamp/Untrainers_Pamp_Base.png`,
	        "Assets/Female3DCG/ItemPelvis/Untrainers_Pamp_Patch.png": `${"http://localhost:3042/assets"}/items/diapers/Untrainer_Pamp/Untrainers_Pamp_Patch.png`,
	        "Assets/Female3DCG/ItemPelvis/Untrainers_Pamp_Detail_1.png": `${"http://localhost:3042/assets"}/items/diapers/Untrainer_Pamp/Untrainers_Pamp_Detail_1.png`,
	        "Assets/Female3DCG/ItemPelvis/Untrainers_Pamp_Detail_2.png": `${"http://localhost:3042/assets"}/items/diapers/Untrainer_Pamp/Untrainers_Pamp_Detail_2.png`,
	        "Assets/Female3DCG/ItemPelvis/Untrainers_Pamp_Detail_3.png": `${"http://localhost:3042/assets"}/items/diapers/Untrainer_Pamp/Untrainers_Pamp_Detail_3.png`,
	        "Assets/Female3DCG/ItemPelvis/Untrainers_Pamp_Indicator.png": `${"http://localhost:3042/assets"}/items/diapers/Untrainer_Pamp/Untrainers_Pamp_Indicator.png`,
	        "Assets/Female3DCG/ItemPelvis/Untrainers_Pamp_Tabs.png": `${"http://localhost:3042/assets"}/items/diapers/Untrainer_Pamp/Untrainers_Pamp_Tabs.png`,
	        "Assets/Female3DCG/ItemPelvis/Preview/Untrainers_Pamp.png": `${"http://localhost:3042/assets"}/items/diapers/Untrainer_Pamp/Untrainers_Pamp_Preview.png`,
	    });
	    fe.addAsset("ItemPelvis", pampsAssetDefintion, undefined, translations$1);
	}

	const assetDefintion = {
	    // Asset name, must be unique in the body group
	    Name: "Temp_Pamp",
	    // item appearing on random character
	    Random: false,
	    EditOpacity: true,
	    //  player canvas size is 500x1000
	    Left: 160,
	    Top: 411,
	    // the drawing order of the item, higher number means drawn later, and on top of other items
	    Priority: 20,
	    DefaultColor: ["#d6efff", "#7B7B7B", "#8197A7", "#4880B9", "#B5A95B", "#AAA44E"],
	    // @ts-expect-error
	    ParentGroup: {},
	    // Asset layers, picture resource names
	    Layer: [
	        {
	            Name: "Back",
	            AllowColorize: true,
	            Priority: -1,
	        },
	        {
	            Name: "Base",
	            AllowColorize: true,
	        },
	        {
	            Name: "Middle",
	            AllowColorize: true,
	        },
	        {
	            Name: "Tabs",
	            AllowColorize: true,
	        },
	        {
	            Name: "Wet",
	            AllowColorize: true,
	        },
	        {
	            Name: "Indicator",
	            AllowColorize: true,
	        },
	    ],
	};
	const translations = {
	    EN: "Cutest Diaper",
	    RU: "Самый лучший диапер",
	    CN: "最好的尿布",
	};
	function tempPamp () {
	    fe.addImageMapping({
	        "Assets/Female3DCG/ItemPelvis/Temp_Pamp_Base.png": `${"http://localhost:3042/assets"}/items/diapers/Temp/Base.png`,
	        "Assets/Female3DCG/ItemPelvis/Temp_Pamp_Middle.png": `${"http://localhost:3042/assets"}/items/diapers/Temp/Middle.png`,
	        "Assets/Female3DCG/ItemPelvis/Temp_Pamp_Tabs.png": `${"http://localhost:3042/assets"}/items/diapers/Temp/Tabs.png`,
	        "Assets/Female3DCG/ItemPelvis/Temp_Pamp_Indicator.png": `${"http://localhost:3042/assets"}/items/diapers/Temp/Indicator.png`,
	        "Assets/Female3DCG/ItemPelvis/Temp_Pamp_Wet.png": `${"http://localhost:3042/assets"}/items/diapers/Temp/Wet.png`,
	        "Assets/Female3DCG/ItemPelvis/Temp_Pamp_Back.png": `${"http://localhost:3042/assets"}/items/diapers/Temp/Back.png`,
	        "Assets/Female3DCG/ItemPelvis/Preview/Temp_Pamp.png": `${"http://localhost:3042/assets"}/items/diapers/Temp/Preview.png`,
	    });
	    fe.addImageMapping({
	        "Assets/Female3DCG/Panties/Temp_Pamp_Base.png": `${"http://localhost:3042/assets"}/items/diapers/Temp/Base.png`,
	        "Assets/Female3DCG/Panties/Temp_Pamp_Middle.png": `${"http://localhost:3042/assets"}/items/diapers/Temp/Middle.png`,
	        "Assets/Female3DCG/Panties/Temp_Pamp_Tabs.png": `${"http://localhost:3042/assets"}/items/diapers/Temp/Tabs.png`,
	        "Assets/Female3DCG/Panties/Temp_Pamp_Indicator.png": `${"http://localhost:3042/assets"}/items/diapers/Temp/Indicator.png`,
	        "Assets/Female3DCG/Panties/Temp_Pamp_Wet.png": `${"http://localhost:3042/assets"}/items/diapers/Temp/Wet.png`,
	        "Assets/Female3DCG/Panties/Temp_Pamp_Back.png": `${"http://localhost:3042/assets"}/items/diapers/Temp/Back.png`,
	        "Assets/Female3DCG/Panties/Preview/Temp_Pamp.png": `${"http://localhost:3042/assets"}/items/diapers/Temp/Preview.png`,
	    });
	    fe.addAsset("ItemPelvis", assetDefintion, undefined, translations);
	    fe.addAsset("Panties", assetDefintion, undefined, translations);
	}

	const initCustomItems = () => {
	    c$1.initWithMod(bcModSDK);
	    fe.init(() => {
	        pamps();
	        tempPamp();
	    });
	};

	initCustomItems();
	const loop = () => {
	    if (CurrentScreen !== "ChatRoom") {
	        return;
	    }
	    abclPlayer.update();
	};
	const init = async () => {
	    //  ServerPlayerSync();
	    loadOrGenerateData();
	    initSettingsScreen();
	    initActions();
	    initScreens([]);
	    initHooks();
	    initMinigames();
	    initOverlay();
	    initApi();
	    setInterval(loop, loopInterval);
	    logger.info(`Ready.`);
	};
	if (CurrentScreen == null || CurrentScreen === "Login") {
	    bcModSDK.hookFunction("LoginResponse", HookPriority.OBSERVE, (args, next) => {
	        next(args);
	        const response = args[0];
	        if (response === "InvalidNamePassword")
	            return;
	        const { Name, AccountName } = response;
	        if (typeof Name === "string" && typeof AccountName === "string")
	            init();
	    });
	}
	else
	    init();

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJjbC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzL2JvbmRhZ2UtY2x1Yi1tb2Qtc2RrL2Rpc3QvYmNtb2RzZGsuanMiLCIuLi8uLi8uLi9zcmMvY29yZS9sb2dnZXIudHMiLCIuLi8uLi8uLi9zcmMvY29uc3RhbnRzLnRzIiwiLi4vLi4vLi4vc3JjL3R5cGVzL2RlZmluaXRpb25zLnRzIiwiLi4vLi4vLi4vc3JjL3R5cGVzL3R5cGVzLnRzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0TGlrZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNTeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL190cmltbWVkRW5kSW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlVHJpbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3RvTnVtYmVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pZGVudGl0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNGdW5jdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvcmVKc0RhdGEuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc01hc2tlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3RvU291cmNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzTmF0aXZlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0VmFsdWUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXROYXRpdmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlQ3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXBwbHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jb3B5QXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zaG9ydE91dC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvY29uc3RhbnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19kZWZpbmVQcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VTZXRUb1N0cmluZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NldFRvU3RyaW5nLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNJbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VBc3NpZ25WYWx1ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZXEuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hc3NpZ25WYWx1ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvcHlPYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vdmVyUmVzdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VSZXN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0xlbmd0aC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNBcnJheUxpa2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0l0ZXJhdGVlQ2FsbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUFzc2lnbmVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNQcm90b3R5cGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlVGltZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNBcmd1bWVudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJndW1lbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9zdHViRmFsc2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQnVmZmVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzVHlwZWRBcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VVbmFyeS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25vZGVVdGlsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1R5cGVkQXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheUxpa2VLZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25hdGl2ZUtleXNJbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VLZXlzSW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2tleXNJbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25hdGl2ZUNyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc2hDbGVhci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc2hEZWxldGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoR2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaEhhcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc2hTZXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19IYXNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbGlzdENhY2hlQ2xlYXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hc3NvY0luZGV4T2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVEZWxldGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVHZXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVIYXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVTZXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19MaXN0Q2FjaGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19NYXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBDYWNoZUNsZWFyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNLZXlhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0TWFwRGF0YS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlRGVsZXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwQ2FjaGVHZXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBDYWNoZUhhcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlU2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fTWFwQ2FjaGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRQcm90b3R5cGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja0NsZWFyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RhY2tEZWxldGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja0dldC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrSGFzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RhY2tTZXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TdGFjay5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Nsb25lQnVmZmVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fVWludDhBcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Nsb25lQXJyYXlCdWZmZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jbG9uZVR5cGVkQXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pbml0Q2xvbmVPYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jcmVhdGVCYXNlRm9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUZvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvbm93LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9kZWJvdW5jZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Fzc2lnbk1lcmdlVmFsdWUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXlMaWtlT2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2FmZUdldC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdG9QbGFpbk9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VNZXJnZURlZXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWVyZ2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL21lcmdlLmpzIiwiLi4vLi4vLi4vc3JjL2NvcmUvc2V0dGluZ3MudHMiLCIuLi8uLi8uLi9zcmMvY29yZS91dGlscy50cyIsIi4uLy4uLy4uL3NyYy9zY3JlZW5zL3N0eWxlcy9jc3MudHMiLCIuLi8uLi8uLi9zcmMvY29yZS9wbGF5ZXIvcGxheWVyVXRpbHMudHMiLCIuLi8uLi8uLi9zcmMvY29yZS9wbGF5ZXIvdWkudHMiLCIuLi8uLi8uLi9zcmMvY29yZS9wbGF5ZXIvcGxheWVyLnRzIiwiLi4vLi4vLi4vc3JjL2NvcmUvcGxheWVyL2RpYXBlci50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2FjdGlvbnMvY2hhbmdlRGlhcGVyLnRzIiwiLi4vLi4vLi4vc3JjL2NvcmUvYWN0aW9ucy9jaGVja0RpYXBlci50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2FjdGlvbnMvbGlja1B1ZGRsZS50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2FjdGlvbnMvb25BQkNMTWVzc2FnZS50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2FjdGlvbnMvc3luYy50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2FjdGlvbnMvdG9QZWUudHMiLCIuLi8uLi8uLi9zcmMvY29yZS9hY3Rpb25zL3RvUG9vcC50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2FjdGlvbnMvdXNlUG90dHkudHMiLCIuLi8uLi8uLi9zcmMvY29yZS9hY3Rpb25zL3VzZVRvaWxldC50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2FjdGlvbnMvd2lwZVB1ZGRsZS50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2FjdGlvbkxvYWRlci50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2hvb2tzLnRzIiwiLi4vLi4vLi4vc3JjL3NjcmVlbnMvaW5kZXgudHMiLCIuLi8uLi8uLi9zcmMvc2NyZWVucy9TZXR0aW5ncy9pbmRleC50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL21pbmlnYW1lcy50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2dsb2JhbC50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2FwaS50cyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ac3VnYXJjaC9iYy1tb2QtaG9vay1tYW5hZ2VyL2Rpc3QvaW5kZXgubWpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BzdWdhcmNoL2JjLWFzc2V0LW1hbmFnZXIvZGlzdC9pbmRleC5tanMiLCIuLi8uLi8uLi9zcmMvY29yZS9pdGVtcy91bnRyYWluZXJQYW1wcy50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2l0ZW1zL3RlbXBQYW1wLnRzIiwiLi4vLi4vLi4vc3JjL2NvcmUvY3VzdG9tSXRlbXMudHMiLCIuLi8uLi8uLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBCb25kYWdlIENsdWIgTW9kIERldmVsb3BtZW50IEtpdCAoMS4yLjApXG4vLyBGb3IgbW9yZSBpbmZvIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL0pvbXNoaXI5OC9ib25kYWdlLWNsdWItbW9kLXNka1xuLyoqIEB0eXBlIHtNb2RTREtHbG9iYWxBUEl9ICovXG52YXIgYmNNb2RTZGs9ZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtjb25zdCBvPVwiMS4yLjBcIjtmdW5jdGlvbiBlKG8pe2FsZXJ0KFwiTW9kIEVSUk9SOlxcblwiK28pO2NvbnN0IGU9bmV3IEVycm9yKG8pO3Rocm93IGNvbnNvbGUuZXJyb3IoZSksZX1jb25zdCB0PW5ldyBUZXh0RW5jb2RlcjtmdW5jdGlvbiBuKG8pe3JldHVybiEhbyYmXCJvYmplY3RcIj09dHlwZW9mIG8mJiFBcnJheS5pc0FycmF5KG8pfWZ1bmN0aW9uIHIobyl7Y29uc3QgZT1uZXcgU2V0O3JldHVybiBvLmZpbHRlcigobz0+IWUuaGFzKG8pJiZlLmFkZChvKSkpfWNvbnN0IGk9bmV3IE1hcCxhPW5ldyBTZXQ7ZnVuY3Rpb24gYyhvKXthLmhhcyhvKXx8KGEuYWRkKG8pLGNvbnNvbGUud2FybihvKSl9ZnVuY3Rpb24gcyhvKXtjb25zdCBlPVtdLHQ9bmV3IE1hcCxuPW5ldyBTZXQ7Zm9yKGNvbnN0IHIgb2YgZi52YWx1ZXMoKSl7Y29uc3QgaT1yLnBhdGNoaW5nLmdldChvLm5hbWUpO2lmKGkpe2UucHVzaCguLi5pLmhvb2tzKTtmb3IoY29uc3RbZSxhXW9mIGkucGF0Y2hlcy5lbnRyaWVzKCkpdC5oYXMoZSkmJnQuZ2V0KGUpIT09YSYmYyhgTW9kU0RLOiBNb2QgJyR7ci5uYW1lfScgaXMgcGF0Y2hpbmcgZnVuY3Rpb24gJHtvLm5hbWV9IHdpdGggc2FtZSBwYXR0ZXJuIHRoYXQgaXMgYWxyZWFkeSBhcHBsaWVkIGJ5IGRpZmZlcmVudCBtb2QsIGJ1dCB3aXRoIGRpZmZlcmVudCBwYXR0ZXJuOlxcblBhdHRlcm46XFxuJHtlfVxcblBhdGNoMTpcXG4ke3QuZ2V0KGUpfHxcIlwifVxcblBhdGNoMjpcXG4ke2F9YCksdC5zZXQoZSxhKSxuLmFkZChyLm5hbWUpfX1lLnNvcnQoKChvLGUpPT5lLnByaW9yaXR5LW8ucHJpb3JpdHkpKTtjb25zdCByPWZ1bmN0aW9uKG8sZSl7aWYoMD09PWUuc2l6ZSlyZXR1cm4gbztsZXQgdD1vLnRvU3RyaW5nKCkucmVwbGFjZUFsbChcIlxcclxcblwiLFwiXFxuXCIpO2Zvcihjb25zdFtuLHJdb2YgZS5lbnRyaWVzKCkpdC5pbmNsdWRlcyhuKXx8YyhgTW9kU0RLOiBQYXRjaGluZyAke28ubmFtZX06IFBhdGNoICR7bn0gbm90IGFwcGxpZWRgKSx0PXQucmVwbGFjZUFsbChuLHIpO3JldHVybigwLGV2YWwpKGAoJHt0fSlgKX0oby5vcmlnaW5hbCx0KTtsZXQgaT1mdW5jdGlvbihlKXt2YXIgdCxpO2NvbnN0IGE9bnVsbD09PShpPSh0PW0uZXJyb3JSZXBvcnRlckhvb2tzKS5ob29rQ2hhaW5FeGl0KXx8dm9pZCAwPT09aT92b2lkIDA6aS5jYWxsKHQsby5uYW1lLG4pLGM9ci5hcHBseSh0aGlzLGUpO3JldHVybiBudWxsPT1hfHxhKCksY307Zm9yKGxldCB0PWUubGVuZ3RoLTE7dD49MDt0LS0pe2NvbnN0IG49ZVt0XSxyPWk7aT1mdW5jdGlvbihlKXt2YXIgdCxpO2NvbnN0IGE9bnVsbD09PShpPSh0PW0uZXJyb3JSZXBvcnRlckhvb2tzKS5ob29rRW50ZXIpfHx2b2lkIDA9PT1pP3ZvaWQgMDppLmNhbGwodCxvLm5hbWUsbi5tb2QpLGM9bi5ob29rLmFwcGx5KHRoaXMsW2Usbz0+e2lmKDEhPT1hcmd1bWVudHMubGVuZ3RofHwhQXJyYXkuaXNBcnJheShlKSl0aHJvdyBuZXcgRXJyb3IoYE1vZCAke24ubW9kfSBmYWlsZWQgdG8gY2FsbCBuZXh0IGhvb2s6IEV4cGVjdGVkIGFyZ3MgdG8gYmUgYXJyYXksIGdvdCAke3R5cGVvZiBvfWApO3JldHVybiByLmNhbGwodGhpcyxvKX1dKTtyZXR1cm4gbnVsbD09YXx8YSgpLGN9fXJldHVybntob29rczplLHBhdGNoZXM6dCxwYXRjaGVzU291cmNlczpuLGVudGVyOmksZmluYWw6cn19ZnVuY3Rpb24gbChvLGU9ITEpe2xldCByPWkuZ2V0KG8pO2lmKHIpZSYmKHIucHJlY29tcHV0ZWQ9cyhyKSk7ZWxzZXtsZXQgZT13aW5kb3c7Y29uc3QgYT1vLnNwbGl0KFwiLlwiKTtmb3IobGV0IHQ9MDt0PGEubGVuZ3RoLTE7dCsrKWlmKGU9ZVthW3RdXSwhbihlKSl0aHJvdyBuZXcgRXJyb3IoYE1vZFNESzogRnVuY3Rpb24gJHtvfSB0byBiZSBwYXRjaGVkIG5vdCBmb3VuZDsgJHthLnNsaWNlKDAsdCsxKS5qb2luKFwiLlwiKX0gaXMgbm90IG9iamVjdGApO2NvbnN0IGM9ZVthW2EubGVuZ3RoLTFdXTtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBjKXRocm93IG5ldyBFcnJvcihgTW9kU0RLOiBGdW5jdGlvbiAke299IHRvIGJlIHBhdGNoZWQgbm90IGZvdW5kYCk7Y29uc3QgbD1mdW5jdGlvbihvKXtsZXQgZT0tMTtmb3IoY29uc3QgbiBvZiB0LmVuY29kZShvKSl7bGV0IG89MjU1JihlXm4pO2ZvcihsZXQgZT0wO2U8ODtlKyspbz0xJm8/LTMwNjY3NDkxMl5vPj4+MTpvPj4+MTtlPWU+Pj44Xm99cmV0dXJuKCgtMV5lKT4+PjApLnRvU3RyaW5nKDE2KS5wYWRTdGFydCg4LFwiMFwiKS50b1VwcGVyQ2FzZSgpfShjLnRvU3RyaW5nKCkucmVwbGFjZUFsbChcIlxcclxcblwiLFwiXFxuXCIpKSxkPXtuYW1lOm8sb3JpZ2luYWw6YyxvcmlnaW5hbEhhc2g6bH07cj1PYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sZCkse3ByZWNvbXB1dGVkOnMoZCkscm91dGVyOigpPT57fSxjb250ZXh0OmUsY29udGV4dFByb3BlcnR5OmFbYS5sZW5ndGgtMV19KSxyLnJvdXRlcj1mdW5jdGlvbihvKXtyZXR1cm4gZnVuY3Rpb24oLi4uZSl7cmV0dXJuIG8ucHJlY29tcHV0ZWQuZW50ZXIuYXBwbHkodGhpcyxbZV0pfX0ociksaS5zZXQobyxyKSxlW3IuY29udGV4dFByb3BlcnR5XT1yLnJvdXRlcn1yZXR1cm4gcn1mdW5jdGlvbiBkKCl7Zm9yKGNvbnN0IG8gb2YgaS52YWx1ZXMoKSlvLnByZWNvbXB1dGVkPXMobyl9ZnVuY3Rpb24gcCgpe2NvbnN0IG89bmV3IE1hcDtmb3IoY29uc3RbZSx0XW9mIGkpby5zZXQoZSx7bmFtZTplLG9yaWdpbmFsOnQub3JpZ2luYWwsb3JpZ2luYWxIYXNoOnQub3JpZ2luYWxIYXNoLHNka0VudHJ5cG9pbnQ6dC5yb3V0ZXIsY3VycmVudEVudHJ5cG9pbnQ6dC5jb250ZXh0W3QuY29udGV4dFByb3BlcnR5XSxob29rZWRCeU1vZHM6cih0LnByZWNvbXB1dGVkLmhvb2tzLm1hcCgobz0+by5tb2QpKSkscGF0Y2hlZEJ5TW9kczpBcnJheS5mcm9tKHQucHJlY29tcHV0ZWQucGF0Y2hlc1NvdXJjZXMpfSk7cmV0dXJuIG99Y29uc3QgZj1uZXcgTWFwO2Z1bmN0aW9uIHUobyl7Zi5nZXQoby5uYW1lKSE9PW8mJmUoYEZhaWxlZCB0byB1bmxvYWQgbW9kICcke28ubmFtZX0nOiBOb3QgcmVnaXN0ZXJlZGApLGYuZGVsZXRlKG8ubmFtZSksby5sb2FkZWQ9ITEsZCgpfWZ1bmN0aW9uIGcobyx0KXtvJiZcIm9iamVjdFwiPT10eXBlb2Ygb3x8ZShcIkZhaWxlZCB0byByZWdpc3RlciBtb2Q6IEV4cGVjdGVkIGluZm8gb2JqZWN0LCBnb3QgXCIrdHlwZW9mIG8pLFwic3RyaW5nXCI9PXR5cGVvZiBvLm5hbWUmJm8ubmFtZXx8ZShcIkZhaWxlZCB0byByZWdpc3RlciBtb2Q6IEV4cGVjdGVkIG5hbWUgdG8gYmUgbm9uLWVtcHR5IHN0cmluZywgZ290IFwiK3R5cGVvZiBvLm5hbWUpO2xldCByPWAnJHtvLm5hbWV9J2A7XCJzdHJpbmdcIj09dHlwZW9mIG8uZnVsbE5hbWUmJm8uZnVsbE5hbWV8fGUoYEZhaWxlZCB0byByZWdpc3RlciBtb2QgJHtyfTogRXhwZWN0ZWQgZnVsbE5hbWUgdG8gYmUgbm9uLWVtcHR5IHN0cmluZywgZ290ICR7dHlwZW9mIG8uZnVsbE5hbWV9YCkscj1gJyR7by5mdWxsTmFtZX0gKCR7by5uYW1lfSknYCxcInN0cmluZ1wiIT10eXBlb2Ygby52ZXJzaW9uJiZlKGBGYWlsZWQgdG8gcmVnaXN0ZXIgbW9kICR7cn06IEV4cGVjdGVkIHZlcnNpb24gdG8gYmUgc3RyaW5nLCBnb3QgJHt0eXBlb2Ygby52ZXJzaW9ufWApLG8ucmVwb3NpdG9yeXx8KG8ucmVwb3NpdG9yeT12b2lkIDApLHZvaWQgMCE9PW8ucmVwb3NpdG9yeSYmXCJzdHJpbmdcIiE9dHlwZW9mIG8ucmVwb3NpdG9yeSYmZShgRmFpbGVkIHRvIHJlZ2lzdGVyIG1vZCAke3J9OiBFeHBlY3RlZCByZXBvc2l0b3J5IHRvIGJlIHVuZGVmaW5lZCBvciBzdHJpbmcsIGdvdCAke3R5cGVvZiBvLnZlcnNpb259YCksbnVsbD09dCYmKHQ9e30pLHQmJlwib2JqZWN0XCI9PXR5cGVvZiB0fHxlKGBGYWlsZWQgdG8gcmVnaXN0ZXIgbW9kICR7cn06IEV4cGVjdGVkIG9wdGlvbnMgdG8gYmUgdW5kZWZpbmVkIG9yIG9iamVjdCwgZ290ICR7dHlwZW9mIHR9YCk7Y29uc3QgaT0hMD09PXQuYWxsb3dSZXBsYWNlLGE9Zi5nZXQoby5uYW1lKTthJiYoYS5hbGxvd1JlcGxhY2UmJml8fGUoYFJlZnVzaW5nIHRvIGxvYWQgbW9kICR7cn06IGl0IGlzIGFscmVhZHkgbG9hZGVkIGFuZCBkb2Vzbid0IGFsbG93IGJlaW5nIHJlcGxhY2VkLlxcbldhcyB0aGUgbW9kIGxvYWRlZCBtdWx0aXBsZSB0aW1lcz9gKSx1KGEpKTtjb25zdCBjPW89PntsZXQgZT1nLnBhdGNoaW5nLmdldChvLm5hbWUpO3JldHVybiBlfHwoZT17aG9va3M6W10scGF0Y2hlczpuZXcgTWFwfSxnLnBhdGNoaW5nLnNldChvLm5hbWUsZSkpLGV9LHM9KG8sdCk9PiguLi5uKT0+e3ZhciBpLGE7Y29uc3QgYz1udWxsPT09KGE9KGk9bS5lcnJvclJlcG9ydGVySG9va3MpLmFwaUVuZHBvaW50RW50ZXIpfHx2b2lkIDA9PT1hP3ZvaWQgMDphLmNhbGwoaSxvLGcubmFtZSk7Zy5sb2FkZWR8fGUoYE1vZCAke3J9IGF0dGVtcHRlZCB0byBjYWxsIFNESyBmdW5jdGlvbiBhZnRlciBiZWluZyB1bmxvYWRlZGApO2NvbnN0IHM9dCguLi5uKTtyZXR1cm4gbnVsbD09Y3x8YygpLHN9LHA9e3VubG9hZDpzKFwidW5sb2FkXCIsKCgpPT51KGcpKSksaG9va0Z1bmN0aW9uOnMoXCJob29rRnVuY3Rpb25cIiwoKG8sdCxuKT0+e1wic3RyaW5nXCI9PXR5cGVvZiBvJiZvfHxlKGBNb2QgJHtyfSBmYWlsZWQgdG8gcGF0Y2ggYSBmdW5jdGlvbjogRXhwZWN0ZWQgZnVuY3Rpb24gbmFtZSBzdHJpbmcsIGdvdCAke3R5cGVvZiBvfWApO2NvbnN0IGk9bChvKSxhPWMoaSk7XCJudW1iZXJcIiE9dHlwZW9mIHQmJmUoYE1vZCAke3J9IGZhaWxlZCB0byBob29rIGZ1bmN0aW9uICcke299JzogRXhwZWN0ZWQgcHJpb3JpdHkgbnVtYmVyLCBnb3QgJHt0eXBlb2YgdH1gKSxcImZ1bmN0aW9uXCIhPXR5cGVvZiBuJiZlKGBNb2QgJHtyfSBmYWlsZWQgdG8gaG9vayBmdW5jdGlvbiAnJHtvfSc6IEV4cGVjdGVkIGhvb2sgZnVuY3Rpb24sIGdvdCAke3R5cGVvZiBufWApO2NvbnN0IHM9e21vZDpnLm5hbWUscHJpb3JpdHk6dCxob29rOm59O3JldHVybiBhLmhvb2tzLnB1c2gocyksZCgpLCgpPT57Y29uc3Qgbz1hLmhvb2tzLmluZGV4T2Yocyk7bz49MCYmKGEuaG9va3Muc3BsaWNlKG8sMSksZCgpKX19KSkscGF0Y2hGdW5jdGlvbjpzKFwicGF0Y2hGdW5jdGlvblwiLCgobyx0KT0+e1wic3RyaW5nXCI9PXR5cGVvZiBvJiZvfHxlKGBNb2QgJHtyfSBmYWlsZWQgdG8gcGF0Y2ggYSBmdW5jdGlvbjogRXhwZWN0ZWQgZnVuY3Rpb24gbmFtZSBzdHJpbmcsIGdvdCAke3R5cGVvZiBvfWApO2NvbnN0IGk9bChvKSxhPWMoaSk7bih0KXx8ZShgTW9kICR7cn0gZmFpbGVkIHRvIHBhdGNoIGZ1bmN0aW9uICcke299JzogRXhwZWN0ZWQgcGF0Y2hlcyBvYmplY3QsIGdvdCAke3R5cGVvZiB0fWApO2Zvcihjb25zdFtuLGldb2YgT2JqZWN0LmVudHJpZXModCkpXCJzdHJpbmdcIj09dHlwZW9mIGk/YS5wYXRjaGVzLnNldChuLGkpOm51bGw9PT1pP2EucGF0Y2hlcy5kZWxldGUobik6ZShgTW9kICR7cn0gZmFpbGVkIHRvIHBhdGNoIGZ1bmN0aW9uICcke299JzogSW52YWxpZCBmb3JtYXQgb2YgcGF0Y2ggJyR7bn0nYCk7ZCgpfSkpLHJlbW92ZVBhdGNoZXM6cyhcInJlbW92ZVBhdGNoZXNcIiwobz0+e1wic3RyaW5nXCI9PXR5cGVvZiBvJiZvfHxlKGBNb2QgJHtyfSBmYWlsZWQgdG8gcGF0Y2ggYSBmdW5jdGlvbjogRXhwZWN0ZWQgZnVuY3Rpb24gbmFtZSBzdHJpbmcsIGdvdCAke3R5cGVvZiBvfWApO2NvbnN0IHQ9bChvKTtjKHQpLnBhdGNoZXMuY2xlYXIoKSxkKCl9KSksY2FsbE9yaWdpbmFsOnMoXCJjYWxsT3JpZ2luYWxcIiwoKG8sdCxuKT0+e1wic3RyaW5nXCI9PXR5cGVvZiBvJiZvfHxlKGBNb2QgJHtyfSBmYWlsZWQgdG8gY2FsbCBhIGZ1bmN0aW9uOiBFeHBlY3RlZCBmdW5jdGlvbiBuYW1lIHN0cmluZywgZ290ICR7dHlwZW9mIG99YCk7Y29uc3QgaT1sKG8pO3JldHVybiBBcnJheS5pc0FycmF5KHQpfHxlKGBNb2QgJHtyfSBmYWlsZWQgdG8gY2FsbCBhIGZ1bmN0aW9uOiBFeHBlY3RlZCBhcmdzIGFycmF5LCBnb3QgJHt0eXBlb2YgdH1gKSxpLm9yaWdpbmFsLmFwcGx5KG51bGwhPW4/bjpnbG9iYWxUaGlzLHQpfSkpLGdldE9yaWdpbmFsSGFzaDpzKFwiZ2V0T3JpZ2luYWxIYXNoXCIsKG89PntcInN0cmluZ1wiPT10eXBlb2YgbyYmb3x8ZShgTW9kICR7cn0gZmFpbGVkIHRvIGdldCBoYXNoOiBFeHBlY3RlZCBmdW5jdGlvbiBuYW1lIHN0cmluZywgZ290ICR7dHlwZW9mIG99YCk7cmV0dXJuIGwobykub3JpZ2luYWxIYXNofSkpfSxnPXtuYW1lOm8ubmFtZSxmdWxsTmFtZTpvLmZ1bGxOYW1lLHZlcnNpb246by52ZXJzaW9uLHJlcG9zaXRvcnk6by5yZXBvc2l0b3J5LGFsbG93UmVwbGFjZTppLGFwaTpwLGxvYWRlZDohMCxwYXRjaGluZzpuZXcgTWFwfTtyZXR1cm4gZi5zZXQoby5uYW1lLGcpLE9iamVjdC5mcmVlemUocCl9ZnVuY3Rpb24gaCgpe2NvbnN0IG89W107Zm9yKGNvbnN0IGUgb2YgZi52YWx1ZXMoKSlvLnB1c2goe25hbWU6ZS5uYW1lLGZ1bGxOYW1lOmUuZnVsbE5hbWUsdmVyc2lvbjplLnZlcnNpb24scmVwb3NpdG9yeTplLnJlcG9zaXRvcnl9KTtyZXR1cm4gb31sZXQgbTtjb25zdCB5PXZvaWQgMD09PXdpbmRvdy5iY01vZFNkaz93aW5kb3cuYmNNb2RTZGs9ZnVuY3Rpb24oKXtjb25zdCBlPXt2ZXJzaW9uOm8sYXBpVmVyc2lvbjoxLHJlZ2lzdGVyTW9kOmcsZ2V0TW9kc0luZm86aCxnZXRQYXRjaGluZ0luZm86cCxlcnJvclJlcG9ydGVySG9va3M6T2JqZWN0LnNlYWwoe2FwaUVuZHBvaW50RW50ZXI6bnVsbCxob29rRW50ZXI6bnVsbCxob29rQ2hhaW5FeGl0Om51bGx9KX07cmV0dXJuIG09ZSxPYmplY3QuZnJlZXplKGUpfSgpOihuKHdpbmRvdy5iY01vZFNkayl8fGUoXCJGYWlsZWQgdG8gaW5pdCBNb2QgU0RLOiBOYW1lIGFscmVhZHkgaW4gdXNlXCIpLDEhPT13aW5kb3cuYmNNb2RTZGsuYXBpVmVyc2lvbiYmZShgRmFpbGVkIHRvIGluaXQgTW9kIFNESzogRGlmZmVyZW50IHZlcnNpb24gYWxyZWFkeSBsb2FkZWQgKCcxLjIuMCcgdnMgJyR7d2luZG93LmJjTW9kU2RrLnZlcnNpb259JylgKSx3aW5kb3cuYmNNb2RTZGsudmVyc2lvbiE9PW8mJmFsZXJ0KGBNb2QgU0RLIHdhcm5pbmc6IExvYWRpbmcgZGlmZmVyZW50IGJ1dCBjb21wYXRpYmxlIHZlcnNpb25zICgnMS4yLjAnIHZzICcke3dpbmRvdy5iY01vZFNkay52ZXJzaW9ufScpXFxuT25lIG9mIG1vZHMgeW91IGFyZSB1c2luZyBpcyB1c2luZyBhbiBvbGQgdmVyc2lvbiBvZiBTREsuIEl0IHdpbGwgd29yayBmb3Igbm93IGJ1dCBwbGVhc2UgaW5mb3JtIGF1dGhvciB0byB1cGRhdGVgKSx3aW5kb3cuYmNNb2RTZGspO3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzJiYoT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZXhwb3J0cy5kZWZhdWx0PXkpLHl9KCk7XG4iLCJjbGFzcyBMb2dnZXIge1xyXG4gIHByaXZhdGUgbG9nc0FycmF5OiBBcnJheTx7XHJcbiAgICBsZXZlbDogc3RyaW5nO1xyXG4gICAgdGltZXN0YW1wOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBhbnk7XHJcbiAgfT4gPSBbXTtcclxuICBwcml2YXRlIG1heExvZ1NpemU6IG51bWJlciA9IDEwMDtcclxuXHJcbiAgcHJpdmF0ZSBsb2cobGV2ZWw6IHN0cmluZywgbWVzc2FnZTogYW55LCBsb2dGdW5jdGlvbjogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICBjb25zdCBsb2dFbnRyeSA9IHtcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgbGV2ZWwsXHJcbiAgICAgIHZlcnNpb246IG1vZFZlcnNpb24sXHJcbiAgICAgIHRpbWVzdGFtcCxcclxuICAgIH07XHJcblxyXG4gICAgbG9nRnVuY3Rpb24oYCVjJHttb2RJZGVudGlmaWVyfTpgLCBgZm9udC13ZWlnaHQ6IGJvbGQ7IGNvbG9yOiAjZjZjYmRlO2AsIGxvZ0VudHJ5KTtcclxuXHJcbiAgICB0aGlzLmxvZ3NBcnJheS5wdXNoKGxvZ0VudHJ5KTtcclxuXHJcbiAgICBpZiAodGhpcy5sb2dzQXJyYXkubGVuZ3RoID4gdGhpcy5tYXhMb2dTaXplKSB7XHJcbiAgICAgIHRoaXMubG9nc0FycmF5LnNoaWZ0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbmZvKG1lc3NhZ2U6IGFueSkge1xyXG4gICAgdGhpcy5sb2coXCJJTkZPXCIsIG1lc3NhZ2UsIGNvbnNvbGUubG9nKTtcclxuICB9XHJcblxyXG4gIGRlYnVnKG1lc3NhZ2U6IGFueSkge1xyXG4gICAgdGhpcy5sb2coXCJERUJVR1wiLCBtZXNzYWdlLCBjb25zb2xlLmRlYnVnKTtcclxuICB9XHJcblxyXG4gIHdhcm4obWVzc2FnZTogYW55KSB7XHJcbiAgICB0aGlzLmxvZyhcIldBUk5cIiwgbWVzc2FnZSwgY29uc29sZS53YXJuKTtcclxuICB9XHJcblxyXG4gIGVycm9yKG1lc3NhZ2U6IGFueSkge1xyXG4gICAgdGhpcy5sb2coXCJFUlJPUlwiLCBtZXNzYWdlLCBjb25zb2xlLmVycm9yKTtcclxuICB9XHJcblxyXG4gIGdldExvZ3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sb2dzQXJyYXk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xyXG4iLCJpbXBvcnQgYWJjbERhdGEgZnJvbSBcIi4vYXNzZXRzL2RpY3Rpb25hcnkuanNvblwiIGFzc2VydCB7IHR5cGU6IFwianNvblwiIH07XHJcbmV4cG9ydCBjb25zdCBBQkNMZGF0YSA9IGFiY2xEYXRhO1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvb3BJbnRlcnZhbCA9IDYwICogMTAwMDtcclxuIiwiZXhwb3J0IGNvbnN0IE1vZFZlcnNpb24gPSBtb2RWZXJzaW9uO1xyXG5leHBvcnQgY29uc3QgTW9kTmFtZSA9IG1vZE5hbWU7XHJcbmV4cG9ydCBjb25zdCBNb2RSZXBvID0gbW9kUmVwbztcclxuZXhwb3J0IGNvbnN0IE1vZElkZW50aWZpZXIgPSBtb2RJZGVudGlmaWVyO1xyXG5leHBvcnQgY29uc3QgUHVibGljVVJMID0gcHVibGljVVJMO1xyXG4iLCJpbXBvcnQgeyBjaGFuZ2VEaWFwZXIsIGNoYW5nZURpYXBlckxpc3RlbmVycyB9IGZyb20gXCIuLi9jb3JlL2FjdGlvbnMvY2hhbmdlRGlhcGVyXCI7XHJcbmltcG9ydCB7IGNoZWNrRGlhcGVyIH0gZnJvbSBcIi4uL2NvcmUvYWN0aW9ucy9jaGVja0RpYXBlclwiO1xyXG5pbXBvcnQgeyBsaWNrUHVkZGxlTGlzdGVuZXJzIH0gZnJvbSBcIi4uL2NvcmUvYWN0aW9ucy9saWNrUHVkZGxlXCI7XHJcbmltcG9ydCB7IG9uQUJDTE1lc3NhZ2VMaXN0ZW5lcnMgfSBmcm9tIFwiLi4vY29yZS9hY3Rpb25zL29uQUJDTE1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgc3luYywgc3luY0xpc3RlbmVycyB9IGZyb20gXCIuLi9jb3JlL2FjdGlvbnMvc3luY1wiO1xyXG5pbXBvcnQgeyB0b1BlZSB9IGZyb20gXCIuLi9jb3JlL2FjdGlvbnMvdG9QZWVcIjtcclxuaW1wb3J0IHsgdG9Qb29wIH0gZnJvbSBcIi4uL2NvcmUvYWN0aW9ucy90b1Bvb3BcIjtcclxuaW1wb3J0IHsgdXNlUG90dHkgfSBmcm9tIFwiLi4vY29yZS9hY3Rpb25zL3VzZVBvdHR5XCI7XHJcbmltcG9ydCB7IHVzZVRvaWxldCB9IGZyb20gXCIuLi9jb3JlL2FjdGlvbnMvdXNlVG9pbGV0XCI7XHJcbmltcG9ydCB7IHdpcGVQdWRkbGVMaXN0ZW5lcnMgfSBmcm9tIFwiLi4vY29yZS9hY3Rpb25zL3dpcGVQdWRkbGVcIjtcclxuaW1wb3J0IHsgTW9kVmVyc2lvbiB9IGZyb20gXCIuL2RlZmluaXRpb25zXCI7XHJcblxyXG5leHBvcnQgdHlwZSBQYXJ0aWFsRGVlcDxUPiA9IHtcclxuICBbUCBpbiBrZXlvZiBUXT86IFBhcnRpYWxEZWVwPFRbUF0+O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IE1ldGFib2xpc21TZXR0aW5nczogUmVjb3JkPE1ldGFib2xpc21TZXR0aW5nLCBNZXRhYm9saXNtU2V0dGluZz4gPSB7XHJcbiAgRGlzYWJsZWQ6IFwiRGlzYWJsZWRcIixcclxuICBOb3JtYWw6IFwiTm9ybWFsXCIsXHJcbiAgU2xvdzogXCJTbG93XCIsXHJcbiAgRmFzdDogXCJGYXN0XCIsXHJcbiAgRmFzdGVyOiBcIkZhc3RlclwiLFxyXG4gIEZhc3Rlc3Q6IFwiRmFzdGVzdFwiLFxyXG59IGFzIGNvbnN0O1xyXG5cclxuZXhwb3J0IGNvbnN0IERpYXBlclNldHRpbmdWYWx1ZXM6IFJlY29yZDxEaWFwZXJDaGFuZ2VQcm9tcHRTZXR0aW5nLCBEaWFwZXJDaGFuZ2VQcm9tcHRTZXR0aW5nPiA9IHtcclxuICBEZW55OiBcIkRlbnlcIixcclxuICBBc2s6IFwiQXNrXCIsXHJcbiAgQWxsb3c6IFwiQWxsb3dcIixcclxufSBhcyBjb25zdDtcclxuZXhwb3J0IGNvbnN0IE1ldGFib2xpc21TZXR0aW5nVmFsdWVzOiBSZWNvcmQ8TWV0YWJvbGlzbVNldHRpbmcsIG51bWJlcj4gPSB7XHJcbiAgRGlzYWJsZWQ6IDAsXHJcbiAgU2xvdzogMC41LFxyXG4gIE5vcm1hbDogMSxcclxuICBGYXN0OiAxLjUsXHJcbiAgRmFzdGVyOiAyLFxyXG4gIEZhc3Rlc3Q6IDMsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG4vLyBlbnRyaWVzXHJcbmV4cG9ydCB0eXBlIE5ld1NldHRpbmdzRW50cnkgPSB7XHJcbiAgdHlwZTogXCJuZXdTZXR0aW5nc1wiO1xyXG4gIHNldHRpbmdzOiBQYXJ0aWFsPE1vZFNldHRpbmdzPjtcclxuICB2ZXJzaW9uOiB0eXBlb2YgTW9kVmVyc2lvbjtcclxufTtcclxuZXhwb3J0IHR5cGUgU3luY0VudHJ5ID0ge1xyXG4gIHR5cGU6IFwic3luY1wiO1xyXG4gIHNldHRpbmdzOiBNb2RTZXR0aW5ncztcclxuICBzdGF0czogTW9kU3RhdHM7XHJcbiAgdmVyc2lvbjogdHlwZW9mIE1vZFZlcnNpb247XHJcbiAgdGFyZ2V0PzogbnVtYmVyO1xyXG59O1xyXG5leHBvcnQgdHlwZSBJbml0RW50cnkgPSB7XHJcbiAgdHlwZTogXCJpbml0XCI7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBMaWNrUHVkZGxlRW50cnkgPSB7XHJcbiAgdHlwZTogXCJsaWNrUHVkZGxlXCI7XHJcbn07XHJcbmV4cG9ydCB0eXBlIFdpcGVQdWRkbGVFbnRyeSA9IHtcclxuICB0eXBlOiBcIndpcGVQdWRkbGVcIjtcclxufTtcclxuZXhwb3J0IHR5cGUgTWVzc2FnZUVudHJ5ID0gU3luY0VudHJ5IHwgSW5pdEVudHJ5IHwgTmV3U2V0dGluZ3NFbnRyeSB8IExpY2tQdWRkbGVFbnRyeSB8IFdpcGVQdWRkbGVFbnRyeTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGx1Z2luU2VydmVyQ2hhdFJvb21NZXNzYWdlIGV4dGVuZHMgU2VydmVyQ2hhdFJvb21NZXNzYWdlQmFzZSB7XHJcbiAgLyoqIFRoZSBjaGFyYWN0ZXIgdG8gdGFyZ2V0IHRoZSBtZXNzYWdlIGF0LiBudWxsIG1lYW5zIGl0J3MgYnJvYWRjYXN0IHRvIHRoZSByb29tLiAqL1xyXG4gIFRhcmdldD86IG51bWJlcjtcclxuICBDb250ZW50OiBTZXJ2ZXJDaGF0Um9vbU1lc3NhZ2VDb250ZW50VHlwZTtcclxuICBUeXBlOiBTZXJ2ZXJDaGF0Um9vbU1lc3NhZ2VUeXBlO1xyXG4gIERpY3Rpb25hcnk/OiB7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBkYXRhPzogYW55O1xyXG4gIH1bXTtcclxuICBUaW1lb3V0PzogbnVtYmVyO1xyXG59XHJcbmV4cG9ydCB0eXBlIFByZWZlcmVuY2VBY3Rpdml0eSA9IHtcclxuICBzZWxmOiBudW1iZXI7XHJcbiAgb3RoZXI6IG51bWJlcjtcclxuICBpc1NlbGZFeGNsdXNpdmU6IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBNb2RTY3JlZW4gPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBtb2R1bGU6IHN0cmluZztcclxuICBmdW5jdGlvbnM6IFNjcmVlbkZ1bmN0aW9ucztcclxufTtcclxuXHJcbmV4cG9ydCBlbnVtIFBlcm1pc3Npb25MZXZlbHMge1xyXG4gIEFueW9uZSA9IDAsXHJcbiAgSXRlbVBlcm1pc3Npb24gPSAxLFxyXG4gIEZyaWVuZHMgPSAyLFxyXG4gIExvdmVycyA9IDMsXHJcbiAgLy8gVE9ETzogTWlzdHJlc3MgPSA0IFBlcmhhcHMgY291bnRzIG1pc3RyZXNzIGFzIEJDWCBNaXN0cmVzc2VzLCBCQ0MgQ2FyZXRha2VycywgZXRjXHJcbiAgT3duZXIgPSA1LCAvLyBUT0RPOiBDb25zaWRlciBCQ1ggb3duZXJzLCBCQ0MgTW9tbWllcywgZXRjXHJcbiAgU2VsZiA9IDYsXHJcbn1cclxuZXhwb3J0IHR5cGUgQUJDTEFjdGl2aXR5ID0ge1xyXG4gIElEOiBzdHJpbmc7XHJcbiAgTmFtZTogc3RyaW5nO1xyXG4gIEltYWdlOiBzdHJpbmc7XHJcbiAgT25DbGljaz86IChwbGF5ZXI6IENoYXJhY3RlciwgZ3JvdXA6IEFzc2V0R3JvdXBJdGVtTmFtZSkgPT4gdm9pZDtcclxuICBUYXJnZXQ/OiBBc3NldEdyb3VwSXRlbU5hbWVbXTtcclxuICBUYXJnZXRTZWxmPzogQXNzZXRHcm91cEl0ZW1OYW1lW107XHJcbiAgQ3JpdGVyaWE/OiAocGxheWVyOiBDaGFyYWN0ZXIpID0+IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBIb29rTGlzdGVuZXI8VD4gPSAocmF3OiBQbHVnaW5TZXJ2ZXJDaGF0Um9vbU1lc3NhZ2UsIGRhdGE6IFQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIExpc3RlbmVyVHlwZU1hcCA9IHN5bmNMaXN0ZW5lcnMgJiB3aXBlUHVkZGxlTGlzdGVuZXJzICYgbGlja1B1ZGRsZUxpc3RlbmVycyAmIGNoYW5nZURpYXBlckxpc3RlbmVycyAmIG9uQUJDTE1lc3NhZ2VMaXN0ZW5lcnM7XHJcblxyXG5leHBvcnQgdHlwZSBDb21iaW5lZEFjdGlvbiA9IHtcclxuICBhY3Rpdml0eT86IEFCQ0xBY3Rpdml0eTtcclxuICBjb21tYW5kPzogSUNvbW1hbmQ7XHJcbiAgbGlzdGVuZXJzPzogUGFydGlhbDx7XHJcbiAgICBbSyBpbiBrZXlvZiBMaXN0ZW5lclR5cGVNYXBdOiBIb29rTGlzdGVuZXI8TGlzdGVuZXJUeXBlTWFwW0tdPjtcclxuICB9PjtcclxufTtcclxuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuZXhwb3J0IGRlZmF1bHQgZnJlZUdsb2JhbDtcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3Q7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0VG9TdHJpbmc7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5pbXBvcnQgZ2V0UmF3VGFnIGZyb20gJy4vX2dldFJhd1RhZy5qcyc7XG5pbXBvcnQgb2JqZWN0VG9TdHJpbmcgZnJvbSAnLi9fb2JqZWN0VG9TdHJpbmcuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldFRhZztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdExpa2U7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzU3ltYm9sO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJyYXk7XG4iLCIvKiogVXNlZCB0byBtYXRjaCBhIHNpbmdsZSB3aGl0ZXNwYWNlIGNoYXJhY3Rlci4gKi9cbnZhciByZVdoaXRlc3BhY2UgPSAvXFxzLztcblxuLyoqXG4gKiBVc2VkIGJ5IGBfLnRyaW1gIGFuZCBgXy50cmltRW5kYCB0byBnZXQgdGhlIGluZGV4IG9mIHRoZSBsYXN0IG5vbi13aGl0ZXNwYWNlXG4gKiBjaGFyYWN0ZXIgb2YgYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGxhc3Qgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyLlxuICovXG5mdW5jdGlvbiB0cmltbWVkRW5kSW5kZXgoc3RyaW5nKSB7XG4gIHZhciBpbmRleCA9IHN0cmluZy5sZW5ndGg7XG5cbiAgd2hpbGUgKGluZGV4LS0gJiYgcmVXaGl0ZXNwYWNlLnRlc3Qoc3RyaW5nLmNoYXJBdChpbmRleCkpKSB7fVxuICByZXR1cm4gaW5kZXg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyaW1tZWRFbmRJbmRleDtcbiIsImltcG9ydCB0cmltbWVkRW5kSW5kZXggZnJvbSAnLi9fdHJpbW1lZEVuZEluZGV4LmpzJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbVN0YXJ0ID0gL15cXHMrLztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50cmltYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIHRyaW0uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSB0cmltbWVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRyaW0oc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmdcbiAgICA/IHN0cmluZy5zbGljZSgwLCB0cmltbWVkRW5kSW5kZXgoc3RyaW5nKSArIDEpLnJlcGxhY2UocmVUcmltU3RhcnQsICcnKVxuICAgIDogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlVHJpbTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdDtcbiIsImltcG9ydCBiYXNlVHJpbSBmcm9tICcuL19iYXNlVHJpbS5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgaXNTeW1ib2wgZnJvbSAnLi9pc1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSBiYXNlVHJpbSh2YWx1ZSk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b051bWJlcjtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlkZW50aXR5O1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhc3luY1RhZyA9ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5cyBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBhc3luY1RhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzRnVuY3Rpb247XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuZXhwb3J0IGRlZmF1bHQgY29yZUpzRGF0YTtcbiIsImltcG9ydCBjb3JlSnNEYXRhIGZyb20gJy4vX2NvcmVKc0RhdGEuanMnO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc01hc2tlZDtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9Tb3VyY2U7XG4iLCJpbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuL2lzRnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzTWFza2VkIGZyb20gJy4vX2lzTWFza2VkLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCB0b1NvdXJjZSBmcm9tICcuL190b1NvdXJjZS5qcyc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gaXNGdW5jdGlvbih2YWx1ZSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc05hdGl2ZTtcbiIsIi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRWYWx1ZTtcbiIsImltcG9ydCBiYXNlSXNOYXRpdmUgZnJvbSAnLi9fYmFzZUlzTmF0aXZlLmpzJztcbmltcG9ydCBnZXRWYWx1ZSBmcm9tICcuL19nZXRWYWx1ZS5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldE5hdGl2ZTtcbiIsImltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0Q3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jcmVhdGVgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXNzaWduaW5nXG4gKiBwcm9wZXJ0aWVzIHRvIHRoZSBjcmVhdGVkIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xudmFyIGJhc2VDcmVhdGUgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIG9iamVjdCgpIHt9XG4gIHJldHVybiBmdW5jdGlvbihwcm90bykge1xuICAgIGlmICghaXNPYmplY3QocHJvdG8pKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGlmIChvYmplY3RDcmVhdGUpIHtcbiAgICAgIHJldHVybiBvYmplY3RDcmVhdGUocHJvdG8pO1xuICAgIH1cbiAgICBvYmplY3QucHJvdG90eXBlID0gcHJvdG87XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBvYmplY3Q7XG4gICAgb2JqZWN0LnByb3RvdHlwZSA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgYmFzZUNyZWF0ZTtcbiIsIi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwbHk7XG4iLCIvKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29weUFycmF5O1xuIiwiLyoqIFVzZWQgdG8gZGV0ZWN0IGhvdCBmdW5jdGlvbnMgYnkgbnVtYmVyIG9mIGNhbGxzIHdpdGhpbiBhIHNwYW4gb2YgbWlsbGlzZWNvbmRzLiAqL1xudmFyIEhPVF9DT1VOVCA9IDgwMCxcbiAgICBIT1RfU1BBTiA9IDE2O1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTm93ID0gRGF0ZS5ub3c7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQnbGwgc2hvcnQgb3V0IGFuZCBpbnZva2UgYGlkZW50aXR5YCBpbnN0ZWFkXG4gKiBvZiBgZnVuY2Agd2hlbiBpdCdzIGNhbGxlZCBgSE9UX0NPVU5UYCBvciBtb3JlIHRpbWVzIGluIGBIT1RfU1BBTmBcbiAqIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzaG9ydGFibGUgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHNob3J0T3V0KGZ1bmMpIHtcbiAgdmFyIGNvdW50ID0gMCxcbiAgICAgIGxhc3RDYWxsZWQgPSAwO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhbXAgPSBuYXRpdmVOb3coKSxcbiAgICAgICAgcmVtYWluaW5nID0gSE9UX1NQQU4gLSAoc3RhbXAgLSBsYXN0Q2FsbGVkKTtcblxuICAgIGxhc3RDYWxsZWQgPSBzdGFtcDtcbiAgICBpZiAocmVtYWluaW5nID4gMCkge1xuICAgICAgaWYgKCsrY291bnQgPj0gSE9UX0NPVU5UKSB7XG4gICAgICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaG9ydE91dDtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBgdmFsdWVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXR1cm4gZnJvbSB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY29uc3RhbnQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gXy50aW1lcygyLCBfLmNvbnN0YW50KHsgJ2EnOiAxIH0pKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhvYmplY3RzKTtcbiAqIC8vID0+IFt7ICdhJzogMSB9LCB7ICdhJzogMSB9XVxuICpcbiAqIGNvbnNvbGUubG9nKG9iamVjdHNbMF0gPT09IG9iamVjdHNbMV0pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25zdGFudDtcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcblxudmFyIGRlZmluZVByb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHZhciBmdW5jID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2RlZmluZVByb3BlcnR5Jyk7XG4gICAgZnVuYyh7fSwgJycsIHt9KTtcbiAgICByZXR1cm4gZnVuYztcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZVByb3BlcnR5O1xuIiwiaW1wb3J0IGNvbnN0YW50IGZyb20gJy4vY29uc3RhbnQuanMnO1xuaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy4vX2RlZmluZVByb3BlcnR5LmpzJztcbmltcG9ydCBpZGVudGl0eSBmcm9tICcuL2lkZW50aXR5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgc2V0VG9TdHJpbmdgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaG90IGxvb3Agc2hvcnRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZyBUaGUgYHRvU3RyaW5nYCByZXN1bHQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgYmFzZVNldFRvU3RyaW5nID0gIWRlZmluZVByb3BlcnR5ID8gaWRlbnRpdHkgOiBmdW5jdGlvbihmdW5jLCBzdHJpbmcpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGZ1bmMsICd0b1N0cmluZycsIHtcbiAgICAnY29uZmlndXJhYmxlJzogdHJ1ZSxcbiAgICAnZW51bWVyYWJsZSc6IGZhbHNlLFxuICAgICd2YWx1ZSc6IGNvbnN0YW50KHN0cmluZyksXG4gICAgJ3dyaXRhYmxlJzogdHJ1ZVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VTZXRUb1N0cmluZztcbiIsImltcG9ydCBiYXNlU2V0VG9TdHJpbmcgZnJvbSAnLi9fYmFzZVNldFRvU3RyaW5nLmpzJztcbmltcG9ydCBzaG9ydE91dCBmcm9tICcuL19zaG9ydE91dC5qcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgYHRvU3RyaW5nYCBtZXRob2Qgb2YgYGZ1bmNgIHRvIHJldHVybiBgc3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBzZXRUb1N0cmluZyA9IHNob3J0T3V0KGJhc2VTZXRUb1N0cmluZyk7XG5cbmV4cG9ydCBkZWZhdWx0IHNldFRvU3RyaW5nO1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG5cbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGUgPT0gJ251bWJlcicgfHxcbiAgICAgICh0eXBlICE9ICdzeW1ib2wnICYmIHJlSXNVaW50LnRlc3QodmFsdWUpKSkgJiZcbiAgICAgICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0luZGV4O1xuIiwiaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy4vX2RlZmluZVByb3BlcnR5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYXNzaWduVmFsdWVgIGFuZCBgYXNzaWduTWVyZ2VWYWx1ZWAgd2l0aG91dFxuICogdmFsdWUgY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSA9PSAnX19wcm90b19fJyAmJiBkZWZpbmVQcm9wZXJ0eSkge1xuICAgIGRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG4gICAgICAnY29uZmlndXJhYmxlJzogdHJ1ZSxcbiAgICAgICdlbnVtZXJhYmxlJzogdHJ1ZSxcbiAgICAgICd2YWx1ZSc6IHZhbHVlLFxuICAgICAgJ3dyaXRhYmxlJzogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUFzc2lnblZhbHVlO1xuIiwiLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVxO1xuIiwiaW1wb3J0IGJhc2VBc3NpZ25WYWx1ZSBmcm9tICcuL19iYXNlQXNzaWduVmFsdWUuanMnO1xuaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ25WYWx1ZTtcbiIsImltcG9ydCBhc3NpZ25WYWx1ZSBmcm9tICcuL19hc3NpZ25WYWx1ZS5qcyc7XG5pbXBvcnQgYmFzZUFzc2lnblZhbHVlIGZyb20gJy4vX2Jhc2VBc3NpZ25WYWx1ZS5qcyc7XG5cbi8qKlxuICogQ29waWVzIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBjb3B5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29waWVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlPYmplY3Qoc291cmNlLCBwcm9wcywgb2JqZWN0LCBjdXN0b21pemVyKSB7XG4gIHZhciBpc05ldyA9ICFvYmplY3Q7XG4gIG9iamVjdCB8fCAob2JqZWN0ID0ge30pO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcblxuICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgID8gY3VzdG9taXplcihvYmplY3Rba2V5XSwgc291cmNlW2tleV0sIGtleSwgb2JqZWN0LCBzb3VyY2UpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNOZXcpIHtcbiAgICAgIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3B5T2JqZWN0O1xuIiwiaW1wb3J0IGFwcGx5IGZyb20gJy4vX2FwcGx5LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVJlc3RgIHdoaWNoIHRyYW5zZm9ybXMgdGhlIHJlc3QgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIHJlc3QgYXJyYXkgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJSZXN0KGZ1bmMsIHN0YXJ0LCB0cmFuc2Zvcm0pIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gdHJhbnNmb3JtKGFycmF5KTtcbiAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3ZlclJlc3Q7XG4iLCJpbXBvcnQgaWRlbnRpdHkgZnJvbSAnLi9pZGVudGl0eS5qcyc7XG5pbXBvcnQgb3ZlclJlc3QgZnJvbSAnLi9fb3ZlclJlc3QuanMnO1xuaW1wb3J0IHNldFRvU3RyaW5nIGZyb20gJy4vX3NldFRvU3RyaW5nLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgcmV0dXJuIHNldFRvU3RyaW5nKG92ZXJSZXN0KGZ1bmMsIHN0YXJ0LCBpZGVudGl0eSksIGZ1bmMgKyAnJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VSZXN0O1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0xlbmd0aDtcbiIsImltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4vaXNGdW5jdGlvbi5qcyc7XG5pbXBvcnQgaXNMZW5ndGggZnJvbSAnLi9pc0xlbmd0aC5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0FycmF5TGlrZTtcbiIsImltcG9ydCBlcSBmcm9tICcuL2VxLmpzJztcbmltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcbmltcG9ydCBpc0luZGV4IGZyb20gJy4vX2lzSW5kZXguanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICAgID8gKGlzQXJyYXlMaWtlKG9iamVjdCkgJiYgaXNJbmRleChpbmRleCwgb2JqZWN0Lmxlbmd0aCkpXG4gICAgICAgIDogKHR5cGUgPT0gJ3N0cmluZycgJiYgaW5kZXggaW4gb2JqZWN0KVxuICAgICAgKSB7XG4gICAgcmV0dXJuIGVxKG9iamVjdFtpbmRleF0sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzSXRlcmF0ZWVDYWxsO1xuIiwiaW1wb3J0IGJhc2VSZXN0IGZyb20gJy4vX2Jhc2VSZXN0LmpzJztcbmltcG9ydCBpc0l0ZXJhdGVlQ2FsbCBmcm9tICcuL19pc0l0ZXJhdGVlQ2FsbC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uYXNzaWduYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkO1xuXG4gICAgY3VzdG9taXplciA9IChhc3NpZ25lci5sZW5ndGggPiAzICYmIHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpXG4gICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUFzc2lnbmVyO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1Byb3RvdHlwZTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VUaW1lcztcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNBcmd1bWVudHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqL1xuZnVuY3Rpb24gYmFzZUlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc0FyZ3VtZW50cztcbiIsImltcG9ydCBiYXNlSXNBcmd1bWVudHMgZnJvbSAnLi9fYmFzZUlzQXJndW1lbnRzLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcmd1bWVudHMgPSBiYXNlSXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPyBiYXNlSXNBcmd1bWVudHMgOiBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0dWJGYWxzZTtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuaW1wb3J0IHN0dWJGYWxzZSBmcm9tICcuL3N0dWJGYWxzZS5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNCdWZmZXIgPSBCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjMuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgQnVmZmVyKDIpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBVaW50OEFycmF5KDIpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0J1ZmZlciA9IG5hdGl2ZUlzQnVmZmVyIHx8IHN0dWJGYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQgaXNCdWZmZXI7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc0xlbmd0aCBmcm9tICcuL2lzTGVuZ3RoLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tiYXNlR2V0VGFnKHZhbHVlKV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc1R5cGVkQXJyYXk7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VVbmFyeTtcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIC8vIFVzZSBgdXRpbC50eXBlc2AgZm9yIE5vZGUuanMgMTArLlxuICAgIHZhciB0eXBlcyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5yZXF1aXJlICYmIGZyZWVNb2R1bGUucmVxdWlyZSgndXRpbCcpLnR5cGVzO1xuXG4gICAgaWYgKHR5cGVzKSB7XG4gICAgICByZXR1cm4gdHlwZXM7XG4gICAgfVxuXG4gICAgLy8gTGVnYWN5IGBwcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKWAgZm9yIE5vZGUuanMgPCAxMC5cbiAgICByZXR1cm4gZnJlZVByb2Nlc3MgJiYgZnJlZVByb2Nlc3MuYmluZGluZyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBub2RlVXRpbDtcbiIsImltcG9ydCBiYXNlSXNUeXBlZEFycmF5IGZyb20gJy4vX2Jhc2VJc1R5cGVkQXJyYXkuanMnO1xuaW1wb3J0IGJhc2VVbmFyeSBmcm9tICcuL19iYXNlVW5hcnkuanMnO1xuaW1wb3J0IG5vZGVVdGlsIGZyb20gJy4vX25vZGVVdGlsLmpzJztcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbmV4cG9ydCBkZWZhdWx0IGlzVHlwZWRBcnJheTtcbiIsImltcG9ydCBiYXNlVGltZXMgZnJvbSAnLi9fYmFzZVRpbWVzLmpzJztcbmltcG9ydCBpc0FyZ3VtZW50cyBmcm9tICcuL2lzQXJndW1lbnRzLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNCdWZmZXIgZnJvbSAnLi9pc0J1ZmZlci5qcyc7XG5pbXBvcnQgaXNJbmRleCBmcm9tICcuL19pc0luZGV4LmpzJztcbmltcG9ydCBpc1R5cGVkQXJyYXkgZnJvbSAnLi9pc1R5cGVkQXJyYXkuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgdmFyIGlzQXJyID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICBpc0FyZyA9ICFpc0FyciAmJiBpc0FyZ3VtZW50cyh2YWx1ZSksXG4gICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgIWlzQXJnICYmIGlzQnVmZmVyKHZhbHVlKSxcbiAgICAgIGlzVHlwZSA9ICFpc0FyciAmJiAhaXNBcmcgJiYgIWlzQnVmZiAmJiBpc1R5cGVkQXJyYXkodmFsdWUpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBpc0FyciB8fCBpc0FyZyB8fCBpc0J1ZmYgfHwgaXNUeXBlLFxuICAgICAgcmVzdWx0ID0gc2tpcEluZGV4ZXMgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpIDogW10sXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKFxuICAgICAgICAgICAvLyBTYWZhcmkgOSBoYXMgZW51bWVyYWJsZSBgYXJndW1lbnRzLmxlbmd0aGAgaW4gc3RyaWN0IG1vZGUuXG4gICAgICAgICAgIGtleSA9PSAnbGVuZ3RoJyB8fFxuICAgICAgICAgICAvLyBOb2RlLmpzIDAuMTAgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gYnVmZmVycy5cbiAgICAgICAgICAgKGlzQnVmZiAmJiAoa2V5ID09ICdvZmZzZXQnIHx8IGtleSA9PSAncGFyZW50JykpIHx8XG4gICAgICAgICAgIC8vIFBoYW50b21KUyAyIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIHR5cGVkIGFycmF5cy5cbiAgICAgICAgICAgKGlzVHlwZSAmJiAoa2V5ID09ICdidWZmZXInIHx8IGtleSA9PSAnYnl0ZUxlbmd0aCcgfHwga2V5ID09ICdieXRlT2Zmc2V0JykpIHx8XG4gICAgICAgICAgIC8vIFNraXAgaW5kZXggcHJvcGVydGllcy5cbiAgICAgICAgICAgaXNJbmRleChrZXksIGxlbmd0aClcbiAgICAgICAgKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5TGlrZUtleXM7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3ZlckFyZztcbiIsIi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlXG4gKiBbYE9iamVjdC5rZXlzYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBleGNlcHQgdGhhdCBpdCBpbmNsdWRlcyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBuYXRpdmVLZXlzSW4ob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKG9iamVjdCAhPSBudWxsKSB7XG4gICAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBuYXRpdmVLZXlzSW47XG4iLCJpbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgaXNQcm90b3R5cGUgZnJvbSAnLi9faXNQcm90b3R5cGUuanMnO1xuaW1wb3J0IG5hdGl2ZUtleXNJbiBmcm9tICcuL19uYXRpdmVLZXlzSW4uanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNJbmAgd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5c0luKG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5c0luKG9iamVjdCk7XG4gIH1cbiAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlS2V5c0luO1xuIiwiaW1wb3J0IGFycmF5TGlrZUtleXMgZnJvbSAnLi9fYXJyYXlMaWtlS2V5cy5qcyc7XG5pbXBvcnQgYmFzZUtleXNJbiBmcm9tICcuL19iYXNlS2V5c0luLmpzJztcbmltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCwgdHJ1ZSkgOiBiYXNlS2V5c0luKG9iamVjdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGtleXNJbjtcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuZXhwb3J0IGRlZmF1bHQgbmF0aXZlQ3JlYXRlO1xuIiwiaW1wb3J0IG5hdGl2ZUNyZWF0ZSBmcm9tICcuL19uYXRpdmVDcmVhdGUuanMnO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzaENsZWFyO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzaERlbGV0ZTtcbiIsImltcG9ydCBuYXRpdmVDcmVhdGUgZnJvbSAnLi9fbmF0aXZlQ3JlYXRlLmpzJztcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoR2V0O1xuIiwiaW1wb3J0IG5hdGl2ZUNyZWF0ZSBmcm9tICcuL19uYXRpdmVDcmVhdGUuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IChkYXRhW2tleV0gIT09IHVuZGVmaW5lZCkgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hIYXM7XG4iLCJpbXBvcnQgbmF0aXZlQ3JlYXRlIGZyb20gJy4vX25hdGl2ZUNyZWF0ZS5qcyc7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgdGhpcy5zaXplICs9IHRoaXMuaGFzKGtleSkgPyAwIDogMTtcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoU2V0O1xuIiwiaW1wb3J0IGhhc2hDbGVhciBmcm9tICcuL19oYXNoQ2xlYXIuanMnO1xuaW1wb3J0IGhhc2hEZWxldGUgZnJvbSAnLi9faGFzaERlbGV0ZS5qcyc7XG5pbXBvcnQgaGFzaEdldCBmcm9tICcuL19oYXNoR2V0LmpzJztcbmltcG9ydCBoYXNoSGFzIGZyb20gJy4vX2hhc2hIYXMuanMnO1xuaW1wb3J0IGhhc2hTZXQgZnJvbSAnLi9faGFzaFNldC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBIYXNoO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVDbGVhcjtcbiIsImltcG9ydCBlcSBmcm9tICcuL2VxLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXNzb2NJbmRleE9mO1xuIiwiaW1wb3J0IGFzc29jSW5kZXhPZiBmcm9tICcuL19hc3NvY0luZGV4T2YuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICAtLXRoaXMuc2l6ZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RDYWNoZURlbGV0ZTtcbiIsImltcG9ydCBhc3NvY0luZGV4T2YgZnJvbSAnLi9fYXNzb2NJbmRleE9mLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlR2V0O1xuIiwiaW1wb3J0IGFzc29jSW5kZXhPZiBmcm9tICcuL19hc3NvY0luZGV4T2YuanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlSGFzO1xuIiwiaW1wb3J0IGFzc29jSW5kZXhPZiBmcm9tICcuL19hc3NvY0luZGV4T2YuanMnO1xuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgICsrdGhpcy5zaXplO1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RDYWNoZVNldDtcbiIsImltcG9ydCBsaXN0Q2FjaGVDbGVhciBmcm9tICcuL19saXN0Q2FjaGVDbGVhci5qcyc7XG5pbXBvcnQgbGlzdENhY2hlRGVsZXRlIGZyb20gJy4vX2xpc3RDYWNoZURlbGV0ZS5qcyc7XG5pbXBvcnQgbGlzdENhY2hlR2V0IGZyb20gJy4vX2xpc3RDYWNoZUdldC5qcyc7XG5pbXBvcnQgbGlzdENhY2hlSGFzIGZyb20gJy4vX2xpc3RDYWNoZUhhcy5qcyc7XG5pbXBvcnQgbGlzdENhY2hlU2V0IGZyb20gJy4vX2xpc3RDYWNoZVNldC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdENhY2hlO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpO1xuXG5leHBvcnQgZGVmYXVsdCBNYXA7XG4iLCJpbXBvcnQgSGFzaCBmcm9tICcuL19IYXNoLmpzJztcbmltcG9ydCBMaXN0Q2FjaGUgZnJvbSAnLi9fTGlzdENhY2hlLmpzJztcbmltcG9ydCBNYXAgZnJvbSAnLi9fTWFwLmpzJztcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5zaXplID0gMDtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZUNsZWFyO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0tleWFibGU7XG4iLCJpbXBvcnQgaXNLZXlhYmxlIGZyb20gJy4vX2lzS2V5YWJsZS5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0TWFwRGF0YTtcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwQ2FjaGVEZWxldGU7XG4iLCJpbXBvcnQgZ2V0TWFwRGF0YSBmcm9tICcuL19nZXRNYXBEYXRhLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZUdldDtcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZUhhcztcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSksXG4gICAgICBzaXplID0gZGF0YS5zaXplO1xuXG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgKz0gZGF0YS5zaXplID09IHNpemUgPyAwIDogMTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlU2V0O1xuIiwiaW1wb3J0IG1hcENhY2hlQ2xlYXIgZnJvbSAnLi9fbWFwQ2FjaGVDbGVhci5qcyc7XG5pbXBvcnQgbWFwQ2FjaGVEZWxldGUgZnJvbSAnLi9fbWFwQ2FjaGVEZWxldGUuanMnO1xuaW1wb3J0IG1hcENhY2hlR2V0IGZyb20gJy4vX21hcENhY2hlR2V0LmpzJztcbmltcG9ydCBtYXBDYWNoZUhhcyBmcm9tICcuL19tYXBDYWNoZUhhcy5qcyc7XG5pbXBvcnQgbWFwQ2FjaGVTZXQgZnJvbSAnLi9fbWFwQ2FjaGVTZXQuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuZXhwb3J0IGRlZmF1bHQgTWFwQ2FjaGU7XG4iLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldFByb3RvdHlwZTtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGdldFByb3RvdHlwZSBmcm9tICcuL19nZXRQcm90b3R5cGUuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHwgYmFzZUdldFRhZyh2YWx1ZSkgIT0gb2JqZWN0VGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmXG4gICAgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNQbGFpbk9iamVjdDtcbiIsImltcG9ydCBMaXN0Q2FjaGUgZnJvbSAnLi9fTGlzdENhY2hlLmpzJztcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBTdGFja1xuICovXG5mdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhY2tDbGVhcjtcbiIsIi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICByZXN1bHQgPSBkYXRhWydkZWxldGUnXShrZXkpO1xuXG4gIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhY2tEZWxldGU7XG4iLCIvKipcbiAqIEdldHMgdGhlIHN0YWNrIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzdGFja0dldChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uZ2V0KGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrR2V0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhY2tIYXM7XG4iLCJpbXBvcnQgTGlzdENhY2hlIGZyb20gJy4vX0xpc3RDYWNoZS5qcyc7XG5pbXBvcnQgTWFwIGZyb20gJy4vX01hcC5qcyc7XG5pbXBvcnQgTWFwQ2FjaGUgZnJvbSAnLi9fTWFwQ2FjaGUuanMnO1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKipcbiAqIFNldHMgdGhlIHN0YWNrIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHN0YWNrIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzdGFja1NldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBkYXRhLl9fZGF0YV9fO1xuICAgIGlmICghTWFwIHx8IChwYWlycy5sZW5ndGggPCBMQVJHRV9BUlJBWV9TSVpFIC0gMSkpIHtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgIHRoaXMuc2l6ZSA9ICsrZGF0YS5zaXplO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhY2tTZXQ7XG4iLCJpbXBvcnQgTGlzdENhY2hlIGZyb20gJy4vX0xpc3RDYWNoZS5qcyc7XG5pbXBvcnQgc3RhY2tDbGVhciBmcm9tICcuL19zdGFja0NsZWFyLmpzJztcbmltcG9ydCBzdGFja0RlbGV0ZSBmcm9tICcuL19zdGFja0RlbGV0ZS5qcyc7XG5pbXBvcnQgc3RhY2tHZXQgZnJvbSAnLi9fc3RhY2tHZXQuanMnO1xuaW1wb3J0IHN0YWNrSGFzIGZyb20gJy4vX3N0YWNrSGFzLmpzJztcbmltcG9ydCBzdGFja1NldCBmcm9tICcuL19zdGFja1NldC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxuZXhwb3J0IGRlZmF1bHQgU3RhY2s7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgYWxsb2NVbnNhZmUgPSBCdWZmZXIgPyBCdWZmZXIuYWxsb2NVbnNhZmUgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mICBgYnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBUaGUgYnVmZmVyIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQnVmZmVyKGJ1ZmZlciwgaXNEZWVwKSB7XG4gIGlmIChpc0RlZXApIHtcbiAgICByZXR1cm4gYnVmZmVyLnNsaWNlKCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBhbGxvY1Vuc2FmZSA/IGFsbG9jVW5zYWZlKGxlbmd0aCkgOiBuZXcgYnVmZmVyLmNvbnN0cnVjdG9yKGxlbmd0aCk7XG5cbiAgYnVmZmVyLmNvcHkocmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xvbmVCdWZmZXI7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgVWludDhBcnJheSA9IHJvb3QuVWludDhBcnJheTtcblxuZXhwb3J0IGRlZmF1bHQgVWludDhBcnJheTtcbiIsImltcG9ydCBVaW50OEFycmF5IGZyb20gJy4vX1VpbnQ4QXJyYXkuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgYXJyYXlCdWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBhcnJheUJ1ZmZlciBUaGUgYXJyYXkgYnVmZmVyIHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYXJyYXkgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUFycmF5QnVmZmVyKGFycmF5QnVmZmVyKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgYXJyYXlCdWZmZXIuY29uc3RydWN0b3IoYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG4gIG5ldyBVaW50OEFycmF5KHJlc3VsdCkuc2V0KG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsb25lQXJyYXlCdWZmZXI7XG4iLCJpbXBvcnQgY2xvbmVBcnJheUJ1ZmZlciBmcm9tICcuL19jbG9uZUFycmF5QnVmZmVyLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHR5cGVkQXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdHlwZWRBcnJheSBUaGUgdHlwZWQgYXJyYXkgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHR5cGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBjbG9uZVR5cGVkQXJyYXkodHlwZWRBcnJheSwgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKHR5cGVkQXJyYXkuYnVmZmVyKSA6IHR5cGVkQXJyYXkuYnVmZmVyO1xuICByZXR1cm4gbmV3IHR5cGVkQXJyYXkuY29uc3RydWN0b3IoYnVmZmVyLCB0eXBlZEFycmF5LmJ5dGVPZmZzZXQsIHR5cGVkQXJyYXkubGVuZ3RoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xvbmVUeXBlZEFycmF5O1xuIiwiaW1wb3J0IGJhc2VDcmVhdGUgZnJvbSAnLi9fYmFzZUNyZWF0ZS5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNQcm90b3R5cGUgZnJvbSAnLi9faXNQcm90b3R5cGUuanMnO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgIWlzUHJvdG90eXBlKG9iamVjdCkpXG4gICAgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKVxuICAgIDoge307XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRDbG9uZU9iamVjdDtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIGJhc2UgZnVuY3Rpb24gZm9yIG1ldGhvZHMgbGlrZSBgXy5mb3JJbmAgYW5kIGBfLmZvck93bmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUZvcihmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNGdW5jKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gT2JqZWN0KG9iamVjdCksXG4gICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcHNbZnJvbVJpZ2h0ID8gbGVuZ3RoIDogKytpbmRleF07XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCYXNlRm9yO1xuIiwiaW1wb3J0IGNyZWF0ZUJhc2VGb3IgZnJvbSAnLi9fY3JlYXRlQmFzZUZvci5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzIG92ZXIgYG9iamVjdGBcbiAqIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIHByb3BlcnR5LlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG52YXIgYmFzZUZvciA9IGNyZWF0ZUJhc2VGb3IoKTtcblxuZXhwb3J0IGRlZmF1bHQgYmFzZUZvcjtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3c7XG4iLCJpbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgbm93IGZyb20gJy4vbm93LmpzJztcbmltcG9ydCB0b051bWJlciBmcm9tICcuL3RvTnVtYmVyLmpzJztcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHRpbWVXYWl0aW5nID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZ1xuICAgICAgPyBuYXRpdmVNaW4odGltZVdhaXRpbmcsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKVxuICAgICAgOiB0aW1lV2FpdGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlYm91bmNlO1xuIiwiaW1wb3J0IGJhc2VBc3NpZ25WYWx1ZSBmcm9tICcuL19iYXNlQXNzaWduVmFsdWUuanMnO1xuaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXNzaWduVmFsdWVgIGV4Y2VwdCB0aGF0IGl0IGRvZXNuJ3QgYXNzaWduXG4gKiBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICFlcShvYmplY3Rba2V5XSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ25NZXJnZVZhbHVlO1xuIiwiaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNBcnJheUxpa2VPYmplY3Q7XG4iLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgLCB1bmxlc3MgYGtleWAgaXMgXCJfX3Byb3RvX19cIiBvciBcImNvbnN0cnVjdG9yXCIuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzYWZlR2V0KG9iamVjdCwga2V5KSB7XG4gIGlmIChrZXkgPT09ICdjb25zdHJ1Y3RvcicgJiYgdHlwZW9mIG9iamVjdFtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGtleSA9PSAnX19wcm90b19fJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJldHVybiBvYmplY3Rba2V5XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2FmZUdldDtcbiIsImltcG9ydCBjb3B5T2JqZWN0IGZyb20gJy4vX2NvcHlPYmplY3QuanMnO1xuaW1wb3J0IGtleXNJbiBmcm9tICcuL2tleXNJbi5qcyc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZ1xuICoga2V5ZWQgcHJvcGVydGllcyBvZiBgdmFsdWVgIHRvIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBwbGFpbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjb3B5T2JqZWN0KHZhbHVlLCBrZXlzSW4odmFsdWUpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9QbGFpbk9iamVjdDtcbiIsImltcG9ydCBhc3NpZ25NZXJnZVZhbHVlIGZyb20gJy4vX2Fzc2lnbk1lcmdlVmFsdWUuanMnO1xuaW1wb3J0IGNsb25lQnVmZmVyIGZyb20gJy4vX2Nsb25lQnVmZmVyLmpzJztcbmltcG9ydCBjbG9uZVR5cGVkQXJyYXkgZnJvbSAnLi9fY2xvbmVUeXBlZEFycmF5LmpzJztcbmltcG9ydCBjb3B5QXJyYXkgZnJvbSAnLi9fY29weUFycmF5LmpzJztcbmltcG9ydCBpbml0Q2xvbmVPYmplY3QgZnJvbSAnLi9faW5pdENsb25lT2JqZWN0LmpzJztcbmltcG9ydCBpc0FyZ3VtZW50cyBmcm9tICcuL2lzQXJndW1lbnRzLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNBcnJheUxpa2VPYmplY3QgZnJvbSAnLi9pc0FycmF5TGlrZU9iamVjdC5qcyc7XG5pbXBvcnQgaXNCdWZmZXIgZnJvbSAnLi9pc0J1ZmZlci5qcyc7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuL2lzRnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnLi9pc1BsYWluT2JqZWN0LmpzJztcbmltcG9ydCBpc1R5cGVkQXJyYXkgZnJvbSAnLi9pc1R5cGVkQXJyYXkuanMnO1xuaW1wb3J0IHNhZmVHZXQgZnJvbSAnLi9fc2FmZUdldC5qcyc7XG5pbXBvcnQgdG9QbGFpbk9iamVjdCBmcm9tICcuL3RvUGxhaW5PYmplY3QuanMnO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZU1lcmdlYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIG1lcmdlcyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBtZXJnZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIG1lcmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1lcmdlRnVuYyBUaGUgZnVuY3Rpb24gdG8gbWVyZ2UgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIG1lcmdlRnVuYywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgdmFyIG9ialZhbHVlID0gc2FmZUdldChvYmplY3QsIGtleSksXG4gICAgICBzcmNWYWx1ZSA9IHNhZmVHZXQoc291cmNlLCBrZXkpLFxuICAgICAgc3RhY2tlZCA9IHN0YWNrLmdldChzcmNWYWx1ZSk7XG5cbiAgaWYgKHN0YWNrZWQpIHtcbiAgICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBzdGFja2VkKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgID8gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIChrZXkgKyAnJyksIG9iamVjdCwgc291cmNlLCBzdGFjaylcbiAgICA6IHVuZGVmaW5lZDtcblxuICB2YXIgaXNDb21tb24gPSBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIHZhciBpc0FyciA9IGlzQXJyYXkoc3JjVmFsdWUpLFxuICAgICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgaXNCdWZmZXIoc3JjVmFsdWUpLFxuICAgICAgICBpc1R5cGVkID0gIWlzQXJyICYmICFpc0J1ZmYgJiYgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKTtcblxuICAgIG5ld1ZhbHVlID0gc3JjVmFsdWU7XG4gICAgaWYgKGlzQXJyIHx8IGlzQnVmZiB8fCBpc1R5cGVkKSB7XG4gICAgICBpZiAoaXNBcnJheShvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBvYmpWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzQXJyYXlMaWtlT2JqZWN0KG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IGNvcHlBcnJheShvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0J1ZmYpIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBjbG9uZUJ1ZmZlcihzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc1R5cGVkKSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gY2xvbmVUeXBlZEFycmF5KHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZSA9IFtdO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHNyY1ZhbHVlKSB8fCBpc0FyZ3VtZW50cyhzcmNWYWx1ZSkpIHtcbiAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICBpZiAoaXNBcmd1bWVudHMob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdG9QbGFpbk9iamVjdChvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghaXNPYmplY3Qob2JqVmFsdWUpIHx8IGlzRnVuY3Rpb24ob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gaW5pdENsb25lT2JqZWN0KHNyY1ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoaXNDb21tb24pIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBzdGFjay5zZXQoc3JjVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICBtZXJnZUZ1bmMobmV3VmFsdWUsIHNyY1ZhbHVlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIHN0YWNrWydkZWxldGUnXShzcmNWYWx1ZSk7XG4gIH1cbiAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlTWVyZ2VEZWVwO1xuIiwiaW1wb3J0IFN0YWNrIGZyb20gJy4vX1N0YWNrLmpzJztcbmltcG9ydCBhc3NpZ25NZXJnZVZhbHVlIGZyb20gJy4vX2Fzc2lnbk1lcmdlVmFsdWUuanMnO1xuaW1wb3J0IGJhc2VGb3IgZnJvbSAnLi9fYmFzZUZvci5qcyc7XG5pbXBvcnQgYmFzZU1lcmdlRGVlcCBmcm9tICcuL19iYXNlTWVyZ2VEZWVwLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCBrZXlzSW4gZnJvbSAnLi9rZXlzSW4uanMnO1xuaW1wb3J0IHNhZmVHZXQgZnJvbSAnLi9fc2FmZUdldC5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIGlmIChvYmplY3QgPT09IHNvdXJjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBiYXNlRm9yKHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSkge1xuICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgaWYgKGlzT2JqZWN0KHNyY1ZhbHVlKSkge1xuICAgICAgYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgICA/IGN1c3RvbWl6ZXIoc2FmZUdldChvYmplY3QsIGtleSksIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfSwga2V5c0luKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU1lcmdlO1xuIiwiaW1wb3J0IGJhc2VNZXJnZSBmcm9tICcuL19iYXNlTWVyZ2UuanMnO1xuaW1wb3J0IGNyZWF0ZUFzc2lnbmVyIGZyb20gJy4vX2NyZWF0ZUFzc2lnbmVyLmpzJztcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmFzc2lnbmAgZXhjZXB0IHRoYXQgaXQgcmVjdXJzaXZlbHkgbWVyZ2VzIG93biBhbmRcbiAqIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3RzIGludG8gdGhlXG4gKiBkZXN0aW5hdGlvbiBvYmplY3QuIFNvdXJjZSBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYCBhcmVcbiAqIHNraXBwZWQgaWYgYSBkZXN0aW5hdGlvbiB2YWx1ZSBleGlzdHMuIEFycmF5IGFuZCBwbGFpbiBvYmplY3QgcHJvcGVydGllc1xuICogYXJlIG1lcmdlZCByZWN1cnNpdmVseS4gT3RoZXIgb2JqZWN0cyBhbmQgdmFsdWUgdHlwZXMgYXJlIG92ZXJyaWRkZW4gYnlcbiAqIGFzc2lnbm1lbnQuIFNvdXJjZSBvYmplY3RzIGFyZSBhcHBsaWVkIGZyb20gbGVmdCB0byByaWdodC4gU3Vic2VxdWVudFxuICogc291cmNlcyBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuNS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7XG4gKiAgICdhJzogW3sgJ2InOiAyIH0sIHsgJ2QnOiA0IH1dXG4gKiB9O1xuICpcbiAqIHZhciBvdGhlciA9IHtcbiAqICAgJ2EnOiBbeyAnYyc6IDMgfSwgeyAnZSc6IDUgfV1cbiAqIH07XG4gKlxuICogXy5tZXJnZShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IHsgJ2EnOiBbeyAnYic6IDIsICdjJzogMyB9LCB7ICdkJzogNCwgJ2UnOiA1IH1dIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KSB7XG4gIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1lcmdlO1xuIiwiaW1wb3J0IHsgbWVyZ2UsIGRlYm91bmNlIH0gZnJvbSBcImxvZGFzaC1lc1wiO1xyXG5pbXBvcnQgeyBEaWFwZXJTZXR0aW5nVmFsdWVzLCBNZXRhYm9saXNtU2V0dGluZ3MsIFBhcnRpYWxEZWVwIH0gZnJvbSBcIi4uL3R5cGVzL3R5cGVzXCI7XHJcbmltcG9ydCB7IHNlbmRVcGRhdGVNeURhdGEgYXMgc2VuZFVwZGF0ZU15RGF0YSB9IGZyb20gXCIuL2hvb2tzXCI7XHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuL2xvZ2dlclwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTZXR0aW5nczogTW9kU2V0dGluZ3MgPSB7XHJcbiAgUGVlTWV0YWJvbGlzbTogTWV0YWJvbGlzbVNldHRpbmdzLk5vcm1hbCxcclxuICBQb29wTWV0YWJvbGlzbTogTWV0YWJvbGlzbVNldHRpbmdzLk5vcm1hbCxcclxuICBPcGVuUmVtb3RlU2V0dGluZ3M6IGZhbHNlLFxyXG4gIExvY2tlZE91dE9mU2V0dGluZ3M6IGZhbHNlLFxyXG4gIERpc2FibGVXZXR0aW5nTGVha3M6IGZhbHNlLFxyXG4gIERpc2FibGVTb2lsaW5nTGVha3M6IHRydWUsXHJcbiAgT25EaWFwZXJDaGFuZ2U6IERpYXBlclNldHRpbmdWYWx1ZXMuQXNrLFxyXG4gIHZpc2libGVNZXNzYWdlczoge1xyXG4gICAgY2hhbmdlRGlhcGVyOiB0cnVlLFxyXG4gICAgY2hlY2tEaWFwZXI6IHRydWUsXHJcbiAgICBsaWNrUHVkZGxlOiB0cnVlLFxyXG4gICAgd2V0RGlhcGVyOiB0cnVlLFxyXG4gICAgd2V0Q2xvdGhpbmc6IHRydWUsXHJcbiAgICBzb2lsRGlhcGVyOiB0cnVlLFxyXG4gICAgc29pbENsb3RoaW5nOiB0cnVlLFxyXG4gICAgdXNlUG90dHk6IHRydWUsXHJcbiAgICB1c2VUb2lsZXQ6IHRydWUsXHJcbiAgICB3aXBlUHVkZGxlOiB0cnVlLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVmYXVsdFN0YXRzOiBNb2RTdGF0cyA9IHtcclxuICBQdWRkbGVTaXplOiB7XHJcbiAgICB2YWx1ZTogMCxcclxuICB9LFxyXG4gIEJsYWRkZXI6IHtcclxuICAgIHZhbHVlOiAwLCAvLyBpbiBtbFxyXG4gICAgc2l6ZTogMzAwLCAvLyBpbiBtbCwgcXVpdGUgYXJiaXRyYXJ5XHJcbiAgfSxcclxuICBCb3dlbDoge1xyXG4gICAgdmFsdWU6IDAsIC8vIGluIG1sXHJcbiAgICBzaXplOiAyMDAsIC8vIGluIG1sXHJcbiAgfSxcclxuICBTb2lsaW5lc3M6IHtcclxuICAgIHZhbHVlOiAwLCAvLyBpbiBtbFxyXG4gIH0sXHJcbiAgV2V0bmVzczoge1xyXG4gICAgdmFsdWU6IDAsIC8vIGluIG1sXHJcbiAgfSxcclxuICBXYXRlckludGFrZToge1xyXG4gICAgdmFsdWU6IDMwMCAvIDIwLCAvLyBhY2NpZGVudCBldmVyeSAyMCBtaW51dGVzXHJcbiAgfSxcclxuICBGb29kSW50YWtlOiB7XHJcbiAgICB2YWx1ZTogMjAwIC8gNjAsXHJcbiAgfSxcclxuICBJbmNvbnRpbmVuY2U6IHtcclxuICAgIHZhbHVlOiAwLFxyXG4gIH0sXHJcbiAgTWVudGFsUmVncmVzc2lvbjoge1xyXG4gICAgdmFsdWU6IDAsXHJcbiAgfSxcclxufTtcclxuY29uc3QgZGVmYXVsdERhdGE6IE1vZFN0b3JhZ2VNb2RlbCA9IHtcclxuICBTZXR0aW5nczogZGVmYXVsdFNldHRpbmdzLFxyXG4gIFN0YXRzOiBkZWZhdWx0U3RhdHMsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlRGF0YSA9IChuZXdEYXRhOiBQYXJ0aWFsRGVlcDxNb2RTdG9yYWdlTW9kZWw+KSA9PiB7XHJcbiAgUGxheWVyW21vZElkZW50aWZpZXJdID0gbWVyZ2UoUGxheWVyW21vZElkZW50aWZpZXJdIHx8IGRlZmF1bHREYXRhLCBuZXdEYXRhKTtcclxuICBzeW5jRGF0YSgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHN5bmNEYXRhID0gZGVib3VuY2UoKCkgPT4ge1xyXG4gIGNvbnN0IGNvbXByZXNzZWQgPSBMWlN0cmluZy5jb21wcmVzc1RvQmFzZTY0KEpTT04uc3RyaW5naWZ5KFBsYXllclttb2RJZGVudGlmaWVyXSkpO1xyXG4gIFBsYXllci5FeHRlbnNpb25TZXR0aW5nc1ttb2RJZGVudGlmaWVyXSA9IGNvbXByZXNzZWQ7XHJcbiAgU2VydmVyUGxheWVyRXh0ZW5zaW9uU2V0dGluZ3NTeW5jKG1vZElkZW50aWZpZXIpO1xyXG4gIHNlbmRVcGRhdGVNeURhdGEoKTtcclxufSwgMTAwMCk7XHJcblxyXG4vL2NvbnN0IGRldk1vZGUgPSBmYWxzZTsgdXNlIGNsZWFyRGF0YSgpIC8vIE1hbnVhbGx5IHRvZ2dsZSBkdXJpbmcgbG9jYWwgZGV2ZWxvcG1lbnQgaWYgbmVlZGVkIHRvIGNsZWFyIHNldHRpbmdzXHJcbmV4cG9ydCBjb25zdCBsb2FkT3JHZW5lcmF0ZURhdGEgPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgZGF0YVN0cmluZyA9IExaU3RyaW5nLmRlY29tcHJlc3NGcm9tQmFzZTY0KFBsYXllci5FeHRlbnNpb25TZXR0aW5nc1ttb2RJZGVudGlmaWVyXSk7XHJcbiAgY29uc3QgZGF0YSA9IGRhdGFTdHJpbmdcclxuICAgID8gSlNPTi5wYXJzZShkYXRhU3RyaW5nKVxyXG4gICAgOiB7XHJcbiAgICAgICAgU2V0dGluZ3M6IHt9LFxyXG4gICAgICAgIFN0YXRzOiB7fSxcclxuICAgICAgfTtcclxuXHJcbiAgLy8gbWlncmF0aW9uc1xyXG4gIGlmIChkYXRhLk1vZFZlcnNpb24gPT09IFwiMi4wLjBcIikge1xyXG4gICAgY29uc3QgbWV0YWJvbGlzbVZhbHVlID0gZGF0YS5TZXR0aW5ncy5NZXRhYm9saXNtO1xyXG4gICAgY29uc3QgZGlzYWJsZVdldHRpbmcgPSBkYXRhLlNldHRpbmdzLkRpc2FibGVXZXR0aW5nO1xyXG4gICAgZGF0YS5TZXR0aW5ncyA9IHtcclxuICAgICAgLi4uT2JqZWN0LmZyb21FbnRyaWVzKFxyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGEuU2V0dGluZ3MgYXMgUmVjb3JkPHN0cmluZywgeyB2YWx1ZTogYW55IH0+KVxyXG4gICAgICAgICAgLmZpbHRlcigoW2tleV0pID0+ICFbXCJEaXNhYmxlV2V0dGluZ1wiLCBcIkRpc2FibGVTb2lsaW5nXCIsIFwiTWV0YWJvbGlzbVwiLCBcIkNhcmVnaXZlcklEc1wiXS5pbmNsdWRlcyhrZXkpKVxyXG4gICAgICAgICAgLm1hcCgoW2tleSwgeyB2YWx1ZSB9XSkgPT4gW2tleSwgdmFsdWVdKSxcclxuICAgICAgKSxcclxuICAgICAgUGVlTWV0YWJvbGlzbTogZGlzYWJsZVdldHRpbmcgPyBcIkRpc2FibGVkXCIgOiBtZXRhYm9saXNtVmFsdWUsXHJcbiAgICAgIFBvb3BNZXRhYm9saXNtOiBkaXNhYmxlV2V0dGluZyA/IFwiRGlzYWJsZWRcIiA6IG1ldGFib2xpc21WYWx1ZSxcclxuICAgIH07XHJcbiAgICBkYXRhLk1vZFZlcnNpb24gPSB1bmRlZmluZWQ7XHJcbiAgICBkYXRhLlZlcnNpb24gPSBcIjIuMC4xXCI7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtb2RTdG9yYWdlT2JqZWN0ID0gbWVyZ2UoXHJcbiAgICB7XHJcbiAgICAgIFNldHRpbmdzOiBkZWZhdWx0U2V0dGluZ3MsXHJcbiAgICAgIFN0YXRzOiBkZWZhdWx0U3RhdHMsXHJcbiAgICAgIFZlcnNpb246IG1vZFZlcnNpb24sXHJcbiAgICB9LFxyXG4gICAgZGF0YSxcclxuICApO1xyXG4gIGxvZ2dlci5kZWJ1Zyh7IG1lc3NhZ2U6IFwiTWVyZ2VkIHNldHRpbmdzIG9iamVjdFwiLCBtb2RTdG9yYWdlT2JqZWN0IH0pO1xyXG4gIFBsYXllclttb2RJZGVudGlmaWVyXSA9IG1vZFN0b3JhZ2VPYmplY3Q7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY2xlYXJEYXRhID0gKCkgPT4ge1xyXG4gIFBsYXllci5FeHRlbnNpb25TZXR0aW5nc1ttb2RJZGVudGlmaWVyXSA9IFwiTjRYeUE9PT1cIjsgLy8gRW1wdHkgb2JqZWN0IGNvbXByZXNzZWRcclxuICBTZXJ2ZXJQbGF5ZXJFeHRlbnNpb25TZXR0aW5nc1N5bmMobW9kSWRlbnRpZmllcik7XHJcbiAgbG9nZ2VyLndhcm4oXCJjbGVhcmVkIGRhdGFcIik7XHJcbn07XHJcbiIsImltcG9ydCBiY01vZFNka1JlZiBmcm9tIFwiYm9uZGFnZS1jbHViLW1vZC1zZGtcIjtcclxuaW1wb3J0IHsgTW9kTmFtZSwgTW9kUmVwbywgTW9kVmVyc2lvbiB9IGZyb20gXCIuLi90eXBlcy9kZWZpbml0aW9uc1wiO1xyXG5pbXBvcnQgeyBQZXJtaXNzaW9uTGV2ZWxzIH0gZnJvbSBcIi4uL3R5cGVzL3R5cGVzXCI7XHJcbmltcG9ydCB7IHN5bmNEYXRhIH0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgYmNNb2RTREsgPSBiY01vZFNka1JlZi5yZWdpc3Rlck1vZCh7XHJcbiAgbmFtZTogTW9kTmFtZSxcclxuICBmdWxsTmFtZTogTW9kTmFtZSxcclxuICB2ZXJzaW9uOiBNb2RWZXJzaW9uLFxyXG4gIHJlcG9zaXRvcnk6IE1vZFJlcG8sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGVudW0gSG9va1ByaW9yaXR5IHtcclxuICBPQlNFUlZFID0gMCxcclxuICBBRERfQkVIQVZJT1IgPSAxLFxyXG4gIE1PRElGWV9CRUhBVklPUiA9IDUsXHJcbiAgT1ZFUlJJREVfQkVIQVZJT1IgPSAxMCxcclxuICBUT1AgPSAxMDAsXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KG9iajogdW5rbm93bik6IG9iaiBpcyBSZWNvcmQ8c3RyaW5nLCBhbnk+IHtcclxuICByZXR1cm4gISFvYmogJiYgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheShvYmopO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd2FpdEZvcihmdW5jOiB7ICgpOiBhbnk7ICgpOiBib29sZWFuOyAoKTogYW55IH0sIGNhbmNlbEZ1bmMgPSAoKSA9PiBmYWxzZSkge1xyXG4gIHdoaWxlICghZnVuYygpKSB7XHJcbiAgICBpZiAoY2FuY2VsRnVuYygpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTApKTtcclxuICB9XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kQ2hhdExvY2FsID0gKG1lc3NhZ2U6IHN0cmluZywgY2xhc3Nlczogc3RyaW5nW10gPSBbXSwgc3R5bGU/OiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICBpZiAoIVNlcnZlclBsYXllcklzSW5DaGF0Um9vbSgpKSByZXR1cm47XHJcbiAgY29uc3QgbXNnRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgbXNnRWxlbWVudC5pbm5lckhUTUwgPSBtZXNzYWdlXHJcbiAgICAuc3BsaXQoXCJcXG5cIilcclxuICAgIC5tYXAobGluZSA9PiBsaW5lLnRyaW0oKSlcclxuICAgIC5qb2luKFwiPGJyLz5cIik7XHJcbiAgbXNnRWxlbWVudC5jbGFzc0xpc3QuYWRkKGAke21vZElkZW50aWZpZXJ9TG9jYWxNZXNzYWdlYCwgXCJDaGF0TWVzc2FnZVwiLCAuLi5jbGFzc2VzKTtcclxuICBpZiAoc3R5bGUpIHtcclxuICAgIG1zZ0VsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHN0eWxlO1xyXG4gIH1cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1RleHRBcmVhQ2hhdExvZ1wiKT8uYXBwZW5kQ2hpbGQobXNnRWxlbWVudCk7XHJcbiAgRWxlbWVudFNjcm9sbFRvRW5kKFwiVGV4dEFyZWFDaGF0TG9nXCIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE15TWF4UGVybWlzc2lvbkxldmVsID0gKHRhcmdldDogQ2hhcmFjdGVyKSA9PiB7XHJcbiAgaWYgKHRhcmdldC5NZW1iZXJOdW1iZXIgPT09IFBsYXllci5NZW1iZXJOdW1iZXIpIHJldHVybiBQZXJtaXNzaW9uTGV2ZWxzLlNlbGY7XHJcbiAgaWYgKHRhcmdldC5Jc093bmVkQnlQbGF5ZXIoKSkgcmV0dXJuIFBlcm1pc3Npb25MZXZlbHMuT3duZXI7XHJcbiAgaWYgKHRhcmdldC5Jc0xvdmVyT2ZQbGF5ZXIoKSkgcmV0dXJuIFBlcm1pc3Npb25MZXZlbHMuTG92ZXJzO1xyXG5cclxuICBpZiAodGFyZ2V0Lk1lbWJlck51bWJlciAmJiBQbGF5ZXIuRnJpZW5kTGlzdD8uaW5jbHVkZXModGFyZ2V0Lk1lbWJlck51bWJlcikpIHJldHVybiBQZXJtaXNzaW9uTGV2ZWxzLkZyaWVuZHM7XHJcblxyXG4gIGlmIChTZXJ2ZXJDaGF0Um9vbUdldEFsbG93SXRlbShQbGF5ZXIsIHRhcmdldCkpIHJldHVybiBQZXJtaXNzaW9uTGV2ZWxzLkl0ZW1QZXJtaXNzaW9uO1xyXG5cclxuICByZXR1cm4gUGVybWlzc2lvbkxldmVscy5BbnlvbmU7XHJcbn07XHJcblxyXG4vLyBtaWdodCBiZSB1c2VmdWxcclxuZXhwb3J0IGNsYXNzIFNhdmVyIHtcclxuICBwcml2YXRlIGxhc3RTYXZlVGltZTogbnVtYmVyID0gMDtcclxuICBwcml2YXRlIGFsbG93ZWRTYXZlSW50ZXJ2YWw6IG51bWJlcjtcclxuICBjb25zdHJ1Y3RvcihhbGxvd2VkU2F2ZUludGVydmFsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuYWxsb3dlZFNhdmVJbnRlcnZhbCA9IGFsbG93ZWRTYXZlSW50ZXJ2YWw7XHJcbiAgfVxyXG4gIHNhdmUoKSB7XHJcbiAgICBpZiAoRGF0ZS5ub3coKSAtIHRoaXMubGFzdFNhdmVUaW1lID4gdGhpcy5hbGxvd2VkU2F2ZUludGVydmFsKSB7XHJcbiAgICAgIHN5bmNEYXRhKCk7XHJcbiAgICAgIHRoaXMubGFzdFNhdmVUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB3YWl0Rm9yRWxlbWVudCA9IGFzeW5jIChzZWxlY3Rvcjogc3RyaW5nLCBvcHRpb25zOiB7IGNoaWxkQ2hlY2s/OiBib29sZWFuOyB0aW1lb3V0PzogbnVtYmVyIH0gPSB7fSk6IFByb21pc2U8RWxlbWVudD4gPT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICByZXNvbHZlKGVsZW1lbnQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICBpZiAodGFyZ2V0ICYmICghb3B0aW9ucy5jaGlsZENoZWNrIHx8IHRhcmdldC5jaGlsZEVsZW1lbnRDb3VudCA+IDApKSB7XHJcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xyXG4gICAgICAgIHJlc29sdmUodGFyZ2V0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcclxuXHJcbiAgICBjb25zdCB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICBjb25zb2xlLndhcm4oYEVsZW1lbnQgd2l0aCBzZWxlY3RvciBcIiR7c2VsZWN0b3J9XCIgbm90IGZvdW5kIHdpdGhpbiB0aW1lb3V0YCk7XHJcbiAgICB9LCBvcHRpb25zLnRpbWVvdXQgfHwgMTAwMDApO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVVbmlxdWVJRCA9IChpZGVudGlmaWVyPzogc3RyaW5nKSA9PiB7XHJcbiAgaWRlbnRpZmllciA9IGlkZW50aWZpZXIgfHwgbW9kSWRlbnRpZmllcjtcclxuICByZXR1cm4gYCR7aWRlbnRpZmllcn1fJHtEYXRlLm5vdygpfV8ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KX1gO1xyXG59O1xyXG4vLyBzaW1pbGFyIHRvIHNhdmVyIGJ1dCBsaW1pdHMgaG93IG9mdGVuIGEgZnVuY3Rpb24gY2FuIGJlIGNhbGxlZFxyXG5leHBvcnQgY2xhc3MgRGVib3VuY2VyIHtcclxuICBwcml2YXRlIGxhc3RDYWxsVGltZTogbnVtYmVyID0gMDtcclxuICBwcml2YXRlIGFsbG93ZWRDYWxsSW50ZXJ2YWw6IG51bWJlcjtcclxuICBjb25zdHJ1Y3RvcihhbGxvd2VkQ2FsbEludGVydmFsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuYWxsb3dlZENhbGxJbnRlcnZhbCA9IGFsbG93ZWRDYWxsSW50ZXJ2YWw7XHJcbiAgfVxyXG4gIGNoZWNrKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKERhdGUubm93KCkgLSB0aGlzLmxhc3RDYWxsVGltZSA+IHRoaXMuYWxsb3dlZENhbGxJbnRlcnZhbCkge1xyXG4gICAgICB0aGlzLmxhc3RDYWxsVGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMubGFzdENhbGxUaW1lID0gMDtcclxuICB9XHJcbiAgaXNSZWFkeSgpIHtcclxuICAgIHJldHVybiBEYXRlLm5vdygpIC0gdGhpcy5sYXN0Q2FsbFRpbWUgPiB0aGlzLmFsbG93ZWRDYWxsSW50ZXJ2YWw7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBpbnB1dCBjYW4gYmUgXCJkZWZhdWx0XCIsIG51bGwsIGhleCBjb2RlLCBhbiBhcnJheSBvZiBoZXhlcywgYW4gYXJyYXkgb2YgZGVmYXVsdFxyXG4vLyBleHBlY3QgdG8gYmUgZ2l2ZW4gdGhlIGFzc2V0LCBpbiBhc3NldCB0aGVyZSdzIGEgZGVmYXVsdCBjb2xvclxyXG4vLyByZXR1cm4gYSBoZXggY29sb3JcclxuZXhwb3J0IGNvbnN0IGlzQ29sb3JhYmxlID0gKGNvbG9yOiBzdHJpbmcpID0+IGNvbG9yICE9PSBcIkRlZmF1bHRcIiAmJiB0eXBlb2YgY29sb3IgPT09IFwic3RyaW5nXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0Q29sb3IgPSAoY29sb3I6IEl0ZW1Db2xvciB8IG51bGwgfCBcIkRlZmF1bHRcIiB8IHN0cmluZ1tdIHwgSXRlbUNvbG9yLCBhc3NldDogQXNzZXQpOiBzdHJpbmdbXSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb2xvciA9PT0gXCJzdHJpbmdcIiAmJiBjb2xvciAhPT0gXCJEZWZhdWx0XCIpIGxvZ2dlci53YXJuKGBVbmtub3duIGNvbG9yOiAke2NvbG9yfWApO1xyXG4gIGlmICghY29sb3IgfHwgY29sb3IgPT09IFwiRGVmYXVsdFwiKSByZXR1cm4gWy4uLmFzc2V0LkRlZmF1bHRDb2xvci5tYXAoY29sb3IgPT4gKGNvbG9yID09PSBcIkRlZmF1bHRcIiA/IFwiI0ZGRkZGRlwiIDogY29sb3IpKV07XHJcblxyXG4gIGlmIChBcnJheS5pc0FycmF5KGNvbG9yKSkge1xyXG4gICAgcmV0dXJuIGNvbG9yLm1hcChtYXBwZWRDb2xvciA9PiB7XHJcbiAgICAgIGlmIChtYXBwZWRDb2xvciA9PT0gXCJEZWZhdWx0XCIpIHtcclxuICAgICAgICByZXR1cm4gXCIjRkZGRkZGXCI7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG1hcHBlZENvbG9yO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gW2NvbG9yXTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEVsZW1lbnQgPSAocGFyZW50OiBIVE1MRWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZyk6IEVsZW1lbnQgPT4ge1xyXG4gIGNvbnN0IGVsZW1lbnQgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgaWYgKGVsZW1lbnQpIHJldHVybiBlbGVtZW50O1xyXG4gIHRocm93IG5ldyBFcnJvcihgRWxlbWVudCB3aXRoIHNlbGVjdG9yIFwiJHtzZWxlY3Rvcn1cIiBub3QgZm91bmRgKTtcclxufTtcclxuIiwiZnVuY3Rpb24gZ2V0Q29tcHV0ZWRDb2xvcih2YXJpYWJsZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcclxuICBsZXQgY29sb3IgPSBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHZhcmlhYmxlKS50cmltKCk7XHJcblxyXG4gIGlmICghY29sb3IpIHJldHVybiBcIlwiO1xyXG5cclxuICAvLyBDb252ZXJ0IEhFWCB0byBIU0xcclxuICBpZiAoY29sb3Iuc3RhcnRzV2l0aChcIiNcIikpIHtcclxuICAgIHJldHVybiBoZXhUb0hzbChjb2xvcik7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZ2JNYXRjaCA9IGNvbG9yLm1hdGNoKC9yZ2JcXCgoXFxkKyksXFxzKihcXGQrKSxcXHMqKFxcZCspXFwpLyk7XHJcbiAgaWYgKHJnYk1hdGNoKSB7XHJcbiAgICBjb25zdCBbciwgZywgYl0gPSByZ2JNYXRjaC5zbGljZSgxLCA0KS5tYXAoTnVtYmVyKTtcclxuICAgIHJldHVybiByZ2JUb0hzbChyLCBnLCBiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGhzbE1hdGNoID0gY29sb3IubWF0Y2goL2hzbFxcKChcXGQrKSxcXHMqKFxcZCspJT8sXFxzKihcXGQrKSU/XFwpLyk7XHJcbiAgaWYgKGhzbE1hdGNoKSByZXR1cm4gY29sb3I7XHJcblxyXG4gIHJldHVybiBcIlwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoZXhUb0hzbChoZXg6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgbGV0IHIgPSAwLFxyXG4gICAgZyA9IDAsXHJcbiAgICBiID0gMDtcclxuICBpZiAoaGV4Lmxlbmd0aCA9PT0gNykge1xyXG4gICAgciA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMSwgMyksIDE2KTtcclxuICAgIGcgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDMsIDUpLCAxNik7XHJcbiAgICBiID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZyg1LCA3KSwgMTYpO1xyXG4gIH1cclxuICByZXR1cm4gcmdiVG9Ic2wociwgZywgYik7XHJcbn1cclxuZnVuY3Rpb24gcmdiVG9Ic2wocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgKHIgLz0gMjU1KSwgKGcgLz0gMjU1KSwgKGIgLz0gMjU1KTtcclxuICBsZXQgbWF4ID0gTWF0aC5tYXgociwgZywgYiksXHJcbiAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcclxuICBsZXQgaDogbnVtYmVyID0gMCxcclxuICAgIHM6IG51bWJlcixcclxuICAgIGwgPSAobWF4ICsgbWluKSAvIDI7XHJcblxyXG4gIGlmIChtYXggPT09IG1pbikge1xyXG4gICAgaCA9IHMgPSAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgZCA9IG1heCAtIG1pbjtcclxuICAgIHMgPSBsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKTtcclxuICAgIHN3aXRjaCAobWF4KSB7XHJcbiAgICAgIGNhc2UgcjpcclxuICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgZzpcclxuICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIGI6XHJcbiAgICAgICAgaCA9IChyIC0gZykgLyBkICsgNDtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGggKj0gNjA7XHJcbiAgfVxyXG4gIHJldHVybiBgaHNsKCR7TWF0aC5yb3VuZChoKX0sICR7TWF0aC5yb3VuZChzICogMTAwKX0lLCAke01hdGgucm91bmQobCAqIDEwMCl9JSlgO1xyXG59XHJcbmZ1bmN0aW9uIGFkanVzdExpZ2h0bmVzcyhiYXNlQ29sb3I6IHN0cmluZywgYWRqdXN0bWVudDogbnVtYmVyKTogc3RyaW5nIHtcclxuICBjb25zdCBoc2xNYXRjaCA9IGJhc2VDb2xvci5tYXRjaCgvaHNsXFwoKFxcZCspLFxccyooXFxkKyklPyxcXHMqKFxcZCspJT9cXCkvKTtcclxuICBpZiAoIWhzbE1hdGNoKSByZXR1cm4gYmFzZUNvbG9yO1xyXG5cclxuICBsZXQgaCA9IHBhcnNlSW50KGhzbE1hdGNoWzFdLCAxMCk7XHJcbiAgbGV0IHMgPSBwYXJzZUludChoc2xNYXRjaFsyXSwgMTApO1xyXG4gIGxldCBsID0gcGFyc2VJbnQoaHNsTWF0Y2hbM10sIDEwKTtcclxuXHJcbiAgbCA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoMCwgbCArIGFkanVzdG1lbnQpKTtcclxuICByZXR1cm4gYGhzbCgke2h9LCAke3N9JSwgJHtsfSUpYDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVEeW5hbWljQ1NTVmFyaWFibGVzKHByb3BlcnR5OiBzdHJpbmcsIHNvdXJjZVZhcmlhYmxlOiBzdHJpbmcsIGZhbGxiYWNrQ29sb3I6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgbGV0IGJhc2VDb2xvciA9IGdldENvbXB1dGVkQ29sb3Ioc291cmNlVmFyaWFibGUpO1xyXG4gIGlmICghYmFzZUNvbG9yKSBiYXNlQ29sb3IgPSBmYWxsYmFja0NvbG9yO1xyXG5cclxuICBjb25zdCBsaWdodG5lc3NBZGp1c3RtZW50czogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHtcclxuICAgIDUwOiA1MCxcclxuICAgIDEwMDogNDAsXHJcbiAgICAyMDA6IDMwLFxyXG4gICAgMzAwOiAyMCxcclxuICAgIDQwMDogMTAsXHJcbiAgICA1MDA6IDUsXHJcbiAgICA2MDA6IDAsXHJcbiAgICA3MDA6IC0xMCxcclxuICAgIDgwMDogLTIwLFxyXG4gICAgOTAwOiAtMzAsXHJcbiAgICA5NTA6IC00MCxcclxuICB9O1xyXG5cclxuICByZXR1cm4gT2JqZWN0LmVudHJpZXMobGlnaHRuZXNzQWRqdXN0bWVudHMpXHJcbiAgICAubWFwKChbc3RyZW5ndGgsIGFkanVzdG1lbnRdKSA9PiBgICAtLXNsLSR7cHJvcGVydHl9LSR7c3RyZW5ndGh9OiAke2FkanVzdExpZ2h0bmVzcyhiYXNlQ29sb3IsIGFkanVzdG1lbnQpfTtgKVxyXG4gICAgLmpvaW4oXCJcXG5cIik7XHJcbn1cclxuXHJcbmAtLXRtZC1tYWluOiAjMjAyMDIwO1xyXG4gIC0tdG1kLWVsZW1lbnQ6ICMyNjI2MjY7XHJcbiAgLS10bWQtZWxlbWVudC1ob3ZlcjogIzJFMkUyRTtcclxuICAtLXRtZC1lbGVtZW50LWRpc2FibGVkOiAjMUUxRTFFO1xyXG4gIC0tdG1kLWVsZW1lbnQtaGludDogIzJFMkUyRTtcclxuICAtLXRtZC10ZXh0OiAjQ0NDQ0NDO1xyXG4gIC0tdG1kLXRleHQtc2hhZG93OiAjMDAwMDAwO1xyXG4gIC0tdG1kLWFjY2VudDogIzQ0MDE3MTtcclxuICAtLXRtZC1hY2NlbnQtaG92ZXI6ICM1MjAxODg7XHJcbiAgLS10bWQtYWNjZW50LWRpc2FibGVkOiAjMzYwMTVBO1xyXG4gIC0tdG1kLWVxdWlwcGVkOiAjMzU3NUI1O1xyXG4gIC0tdG1kLWVxdWlwcGVkLWhvdmVyOiAjNEU4Q0NCO1xyXG4gIC0tdG1kLWNyYWZ0ZWQ6ICNBQUEyMzU7XHJcbiAgLS10bWQtY3JhZnRlZC1ob3ZlcjogI0M1QkQ0NjtcclxuICAtLXRtZC1ibG9ja2VkOiAjODcwQzBDO1xyXG4gIC0tdG1kLWJsb2NrZWQtaG92ZXI6ICNBMjBFMEU7XHJcbiAgLS10bWQtbGltaXRlZDogIzlENjYwMDtcclxuICAtLXRtZC1saW1pdGVkLWhvdmVyOiAjQkM3QTAwO1xyXG4gIC0tdG1kLWFsbG93ZWQ6ICMwMDg4MDA7XHJcbiAgLS10bWQtYWxsb3dlZC1ob3ZlcjogIzAwQTMwMDtcclxuICAtLXRtZC1yb29tLWZyaWVuZDogIzAwODgwMDtcclxuICAtLXRtZC1yb29tLWZyaWVuZC1ob3ZlcjogIzAwQTMwMDtcclxuICAtLXRtZC1yb29tLWJsb2NrZWQ6ICM4NzBDMEM7XHJcbiAgLS10bWQtcm9vbS1ibG9ja2VkLWhvdmVyOiAjQTIwRTBFO1xyXG4gIC0tdG1kLXJvb20tZ2FtZTogIzM1NzVCNTtcclxuICAtLXRtZC1yb29tLWdhbWUtaG92ZXI6ICM0RThDQ0I7YDtcclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNTUyA9ICgpID0+IHtcclxuICBjb25zdCBzaG9lbGFjZU92ZXJpZGVzID1cclxuICAgIGdlbmVyYXRlRHluYW1pY0NTU1ZhcmlhYmxlcyhcImNvbG9yLXByaW1hcnlcIiwgXCItLXRtZC1hY2NlbnRcIiwgaGV4VG9Ic2woXCIjMDI4NGM3XCIpKSArXHJcbiAgICBnZW5lcmF0ZUR5bmFtaWNDU1NWYXJpYWJsZXMoXCJjb2xvci1uZXV0cmFsXCIsIFwiLS10bWQtZWxlbWVudFwiLCBoZXhUb0hzbChcIiM1MjUyNWJcIikpO1xyXG4gIGNvbnN0IGZvbnRDb2xvciA9IFwidmFyKC0tdG1kLXRleHQsIC0tc2wtY29sb3ItbmV1dHJhbC03MDApXCI7XHJcbiAgY29uc3Qgc2xpZGVycyA9IFtcclxuICAgIHtcclxuICAgICAgY2xhc3NOYW1lOiBcIlNvaWxpbmVzc1BlcmNlbnRhZ2VcIixcclxuICAgICAgcHJpbWFyeTogXCIjZDFhYTk4ZmZcIixcclxuICAgICAgc2Vjb25kYXJ5OiBcIiNhYjY3NGFmZlwiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgY2xhc3NOYW1lOiBcIldldG5lc3NQZXJjZW50YWdlXCIsXHJcbiAgICAgIHByaW1hcnk6IFwiI2YzZTFhZWZmXCIsXHJcbiAgICAgIHNlY29uZGFyeTogXCIjZTdjNDYzZmZcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGNsYXNzTmFtZTogXCJCb3dlbEZ1bGxuZXNzXCIsXHJcbiAgICAgIHByaW1hcnk6IFwiI2I3Nzk1Y2ZmXCIsXHJcbiAgICAgIHNlY29uZGFyeTogXCIjN2M0YzM2ZmZcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGNsYXNzTmFtZTogXCJCbGFkZGVyRnVsbG5lc3NcIixcclxuICAgICAgcHJpbWFyeTogXCIjZWFjZDczZmZcIixcclxuICAgICAgc2Vjb25kYXJ5OiBcIiNjYmEwMWVmZlwiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgY2xhc3NOYW1lOiBcIkluY29udGluZW5jZVwiLFxyXG4gICAgICBwcmltYXJ5OiBcIiNlZWFjYWNmZlwiLFxyXG4gICAgICBzZWNvbmRhcnk6IFwiI2NiNWI1YmZmXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBjbGFzc05hbWU6IFwiTWVudGFsUmVncmVzc2lvblwiLFxyXG4gICAgICBwcmltYXJ5OiBcIiNlNmJmZjFmZlwiLFxyXG4gICAgICBzZWNvbmRhcnk6IFwiI2FkNzRiZWZmXCIsXHJcbiAgICB9LFxyXG4gIF07XHJcbiAgbGV0IGNzc1NsaWRlcnMgPSBcIlwiO1xyXG4gIGZvciAoY29uc3Qgc2xpZGVyIG9mIHNsaWRlcnMpIHtcclxuICAgIGNzc1NsaWRlcnMgKz0gYFxyXG4gIC4ke21vZElkZW50aWZpZXJ9JHtzbGlkZXIuY2xhc3NOYW1lfSB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogM3B4O1xyXG4gIH1cclxuXHQuJHttb2RJZGVudGlmaWVyfSR7c2xpZGVyLmNsYXNzTmFtZX06OnBhcnQoYmFzZSkge1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogJHtzbGlkZXIucHJpbWFyeX07XHJcblx0fVxyXG4gIC4ke21vZElkZW50aWZpZXJ9JHtzbGlkZXIuY2xhc3NOYW1lfTo6cGFydChpbmRpY2F0b3IpIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7c2xpZGVyLnNlY29uZGFyeX07XHJcbiAgfWA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYFxyXG4jQUJDTEN1cnJlbnRQbGF5ZXJTZWxlY3Qge1xyXG4gIG1hcmdpbi1ib3R0b206IDVweDtcclxufVxyXG5cclxuLkFCQ0xPdmVybGF5IHtcclxuXHRhc3BlY3QtcmF0aW86IDIvMTtcclxuXHRtYXgtd2lkdGg6IDEwMCU7XHJcblx0bWF4LWhlaWdodDogMTAwJTtcclxuXHRtYXJnaW46IGF1dG87XHJcblx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuXHR0b3A6IDUwJTtcclxuXHRwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICBmb250LWZhbWlseTogYXJpYWw7XHJcbiAgY29sb3I6ICR7Zm9udENvbG9yfTtcclxuICBvcmRlcjogMTAwO1xyXG4gIHotaW5kZXg6IDEwMDAwO1xyXG59XHJcbi5BQkNMV2luZG93SGVhZGVyVGl0bGUge1xyXG4gIG1hcmdpbjogNXB4O1xyXG4gIGZvbnQtc2l6ZTogMzJweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLkFCQ0xPcGVuU3RhdHNCdXR0b24ge1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICBib3R0b206IDEwcHg7XHJcbiAgcmlnaHQ6IDEwcHg7XHJcbiAgei1pbmRleDogMTAwMDtcclxuICBhc3BlY3QtcmF0aW86IDEvMTtcclxuICB3aWR0aDogNCU7XHJcbiAgd2hpdGUtc3BhY2U6IGNvbGxhcHNlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgYmFja2dyb3VuZDogI2ZmZmZmZmE2O1xyXG4gIGJvcmRlcjogI2UzZTNlMyAxcHggc29saWQ7XHJcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDRweCk7XHJcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcclxuICBmb250LXNpemU6IGNsYW1wKDlweCwgMS4zdncsIDQzcHgpO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4uQUJDTE9wZW5TdGF0c0J1dHRvbjpob3ZlciB7XHJcbiAgYmFja2dyb3VuZDogI2ZmZmZmZmQxO1xyXG59XHJcbi5BQkNMV2luZG93Q2xvc2Uge1xyXG4gIGFzcGVjdC1yYXRpbzogMS8xO1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIGhlaWdodDogMjlweDtcclxuICBib3JkZXItcmFkaXVzOiAwcHggNHB4IDAgMDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgcmlnaHQ6IDBweDtcclxuICB0b3A6IDBweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYm9yZGVyLWxlZnQ6IDFweCAjMDAwMDAwM2Qgc29saWQ7XHJcbn1cclxuLkFCQ0xXaW5kb3dNaW5pbWl6ZSB7XHJcbiAgYXNwZWN0LXJhdGlvOiAxLzE7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgaGVpZ2h0OiAyOXB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMCAwO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICByaWdodDogMzBweDtcclxuICB0b3A6IDBweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYm9yZGVyLWxlZnQ6IDFweCAjMDAwMDAwM2Qgc29saWQ7XHJcbn1cclxuLkFCQ0xXaW5kb3dIZWFkZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMjlweCAyNHB4O1xyXG4gIG1hcmdpbjogLTZweDtcclxuICBwYWRkaW5nOiA1cHg7XHJcbiAgYm9yZGVyOiAxcHggIzAwMDAwMDNkIHNvbGlkO1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweCA2cHggMCAwO1xyXG59XHJcbi5BQkNMTm90aWZpY2F0aW9uIHtcclxuXHRiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuXHR3aWR0aDogZml0LWNvbnRlbnQ7XHJcblx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdG1hcmdpbjogYXV0bztcclxuXHR6LWluZGV4OiAxMDAwMDtcclxuXHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0Ym90dG9tOiAzMHB4O1xyXG5cdGxlZnQ6IDI1JTtcclxuXHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XHJcblx0Ym9yZGVyOiAxcHggc29saWQgYmxhY2s7XHJcblx0ZGlzcGxheTogZ3JpZDtcclxuXHRncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHggMWZyO1xyXG5cdHBhZGRpbmc6IDVweDtcclxuXHRwb2ludGVyLWV2ZW50czogYWxsO1xyXG59XHJcblxyXG4uQUJDTFByb21wdCB7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xyXG4gIHBhZGRpbmc6IDZweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogNTAlO1xyXG4gIGxlZnQ6IDI1JTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuXHRwb2ludGVyLWV2ZW50czogYWxsO1xyXG59XHJcbi5BQkNMQnV0dG9uIHtcclxuICBib3JkZXI6IDFweCAjMDIwMjAyIHNvbGlkO1xyXG4gIHBhZGRpbmc6IDNweDtcclxuICBtYXJnaW46IDRweDtcclxuICBhc3BlY3QtcmF0aW86IDMvMjtcclxuICB3aWR0aDogMzhweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLkFCQ0xQcm9tcHRZZXMge1xyXG4gIGJhY2tncm91bmQ6ICM1YWU4NWE7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG59XHJcbi5BQkNMUHJvbXB0Tm8ge1xyXG4gIGJhY2tncm91bmQ6ICNmZjRiNGI7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uQUJDTENsb3NlOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kOiAjZmY0YjRiO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5BQkNMU3RhdHNXaW5kb3cge1xyXG4gIHdpZHRoOiAyMDBweDtcclxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xyXG4gIHBhZGRpbmc6IDVweDtcclxuICBiYWNrZ3JvdW5kOiAjZmZmZmZmYTY7XHJcbiAgYm9yZGVyOiAjZTNlM2UzIDFweCBzb2xpZDtcclxuICBwb2ludGVyLWV2ZW50czogYWxsO1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNHB4KTtcclxuICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggNXB4IDFweCAjMDAwMDAwMTQ7XHJcbn1cclxuXHJcbi5BQkNMU2V0dGluZ1BhZ2Uge1xyXG4gIHdpZHRoOiA4MSU7XHJcbiAgbWFyZ2luOiA2JSBhdXRvO1xyXG4gIHBvaW50ZXItZXZlbnRzOiBhbGw7XHJcbn1cclxuLkFCQ0xBZGRDYXJlZ2l2ZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB3aWR0aDogMjVyZW07XHJcbn1cclxuLkFCQ0xBZGRDYXJlZ2l2ZXJCdXR0b24ge1xyXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbn1cclxuLkFCQ0xBZGRDYXJlZ2l2ZXJJbnB1dCB7XHJcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgZmxleDogMTtcclxufVxyXG4uQUJDTENhcmVnaXZlckxhYmVsIHtcclxuICBtYXJnaW4tdG9wOiAxZW07XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuLkFCQ0xDYXJlZ2l2ZXJMaXN0IHtcclxuICBsaXN0LXN0eWxlOiBub25lO1xyXG4gIGJvcmRlcjogc29saWQgdmFyKC0tc2wtaW5wdXQtYm9yZGVyLXdpZHRoKSB2YXIoLS1zbC1pbnB1dC1ib3JkZXItY29sb3IpO1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXNsLWlucHV0LWJvcmRlci1yYWRpdXMtbWVkaXVtKTtcclxuICBwYWRkaW5nOiAwcmVtIDByZW07XHJcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xyXG4gIG1pbi13aWR0aDogMTdlbTtcclxuICBtYXgtaGVpZ2h0OiAxNWVtO1xyXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuICBmb250LXNpemU6IHZhcigtLXNsLWJ1dHRvbi1mb250LXNpemUtbWVkaXVtKTtcclxuICBsaW5lLWhlaWdodDogY2FsYyh2YXIoLS1zbC1pbnB1dC1oZWlnaHQtbWVkaXVtKSAtIHZhcigtLXNsLWlucHV0LWJvcmRlci13aWR0aCkgKiAyKTtcclxufVxyXG4uQUJDTENhcmVnaXZlciB7XHJcbiAgcGFkZGluZzogMC4zcmVtO1xyXG4gIGJvcmRlcjogc29saWQgdmFyKC0tc2wtaW5wdXQtYm9yZGVyLXdpZHRoKSB2YXIoLS1zbC1pbnB1dC1ib3JkZXItY29sb3IpO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbn1cclxuLkFCQ0xSZW1vdmVDYXJlZ2l2ZXIge1xyXG4gIGFzcGVjdC1yYXRpbzogMTtcclxuICB3aWR0aDogZml0LWNvbnRlbnQ7XHJcbiAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xyXG59XHJcbi5BQkNMQ2FyZWdpdmVyTmFtZSB7XHJcbiAgZmxleDogMTtcclxufVxyXG4uQUJDTFJlbW92ZUNhcmVnaXZlcjo6cGFydChiYXNlKSB7XHJcbiAgYmFja2dyb3VuZDogI2ZmN2I3YjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuLkFCQ0xTZXR0aW5nUGFnZSBzbC1jaGVja2JveCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgbWFyZ2luOiAxcmVtIDA7XHJcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xyXG59XHJcbi5zbC10aGVtZS1saWdodCwgLnNsLXRoZW1lLWRhcmsge1xyXG4gIC0tc2wtdG9nZ2xlLXNpemUtc21hbGw6IDAuODc1cmVtO1xyXG4gIC0tc2wtdG9nZ2xlLXNpemUtbWVkaXVtOiAxLjEyNXJlbTtcclxuICAtLXNsLXRvZ2dsZS1zaXplLWxhcmdlOiAxLjM3NXJlbTtcclxuXHJcbiAgLS1zbC1pbnB1dC1oZWlnaHQtc21hbGw6IDEuODc1ZW07XHJcbiAgLS1zbC1pbnB1dC1oZWlnaHQtbWVkaXVtOiAyLjVlbTtcclxuICAtLXNsLWlucHV0LWhlaWdodC1sYXJnZTogMy4xMjVlbTtcclxuXHJcbiAgLS1zbC1sZXR0ZXItc3BhY2luZy1sb29zZTogMC4wNzVlbTtcclxuICAtLXNsLWxldHRlci1zcGFjaW5nLWxvb3NlcjogMC4xNWVtO1xyXG5cclxuICAtLXNsLWZvbnQtc2l6ZS1sYXJnZTogMS4yNWVtO1xyXG4gIC0tc2wtZm9udC1zaXplLXgtbGFyZ2U6IDEuNWVtO1xyXG4gIC0tc2wtZm9udC1zaXplLTJ4LWxhcmdlOiAyLjI1ZW07XHJcbiAgLS1zbC1mb250LXNpemUtM3gtbGFyZ2U6IDNlbTtcclxuICAtLXNsLWZvbnQtc2l6ZS00eC1sYXJnZTogNC41ZW07XHJcbiAgXHJcbiAgLS1zbC1zcGFjaW5nLTN4LXNtYWxsOiAwLjEyNWVtO1xyXG4gIC0tc2wtc3BhY2luZy0yeC1zbWFsbDogMC4yNWVtO1xyXG4gIC0tc2wtc3BhY2luZy14LXNtYWxsOiAwLjVlbTtcclxuICAtLXNsLXNwYWNpbmctc21hbGw6IDAuNzVlbTtcclxuICAtLXNsLXNwYWNpbmctbWVkaXVtOiAxZW07XHJcbiAgLS1zbC1zcGFjaW5nLWxhcmdlOiAxLjI1ZW07XHJcbiAgLS1zbC1zcGFjaW5nLXgtbGFyZ2U6IDEuNzVlbTtcclxuICAtLXNsLXNwYWNpbmctMngtbGFyZ2U6IDIuMjVlbTtcclxuICAtLXNsLXNwYWNpbmctM3gtbGFyZ2U6IDNlbTtcclxuICAtLXNsLXNwYWNpbmctNHgtbGFyZ2U6IDQuNWVtO1xyXG5cclxuICAtLXNsLWJvcmRlci1yYWRpdXMtc21hbGw6IDAuMTg3NWVtO1xyXG4gIC0tc2wtYm9yZGVyLXJhZGl1cy1tZWRpdW06IDAuMjVlbTtcclxuICAtLXNsLWJvcmRlci1yYWRpdXMtbGFyZ2U6IDAuNWVtO1xyXG4gIC0tc2wtYm9yZGVyLXJhZGl1cy14LWxhcmdlOiAxZW07XHJcblxyXG4gIC0tc2wtZm9udC1zaXplLTJ4LXNtYWxsOiAxLjJ2bWluO1xyXG4gIC0tc2wtZm9udC1zaXplLXgtc21hbGw6IDEuNHZtaW47XHJcbiAgLS1zbC1mb250LXNpemUtc21hbGw6IDEuNnZtaW47XHJcbiAgLS1zbC1mb250LXNpemUtbWVkaXVtOiAxLjZ2bWluO1xyXG4gIC0tc2wtZm9udC1zaXplLWxhcmdlOiAyLjV2bWluO1xyXG4gIC0tc2wtZm9udC1zaXplLXgtbGFyZ2U6IDN2bWluO1xyXG4gIC0tc2wtZm9udC1zaXplLTJ4LWxhcmdlOiA0LjV2bWluO1xyXG4gIC0tc2wtZm9udC1zaXplLTN4LWxhcmdlOiA2dm1pbjtcclxuICAtLXNsLWZvbnQtc2l6ZS00eC1sYXJnZTogOXZtaW47XHJcbn1cclxuLkFCQ0xvdmVybGF5IHNsLXRhYiwuQUJDTG92ZXJsYXkgc2wtcmFkaW8tYnV0dG9uLC5BQkNMb3ZlcmxheSBzbC1jaGVja2JveCB7XHJcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcclxufVxyXG5cclxuXHJcblxyXG4uQUJDTE1lc3NhZ2VWaXNpYmlsaXR5IHtcclxuICBtYXJnaW4tdG9wOiAxZW1cclxufVxyXG5cclxuJHtjc3NTbGlkZXJzfVxyXG5cclxuLkFCQ0xIaWRkZW4ge1xyXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcclxufVxyXG46cm9vdCwgOmhvc3QsIC5zbC10aGVtZS1saWdodCwgLnNsLXRoZW1lLWRhcmsge1xyXG4ke3Nob2VsYWNlT3ZlcmlkZXN9XHJcbn1cclxuXHJcbi5BQkNMb3ZlcmxheSBzbC1yYWRpby1idXR0b246OnBhcnQoYnV0dG9uKSxcclxuICAuQUJDTG92ZXJsYXkgc2wtdGFiOjpwYXJ0KGJhc2UpLCBcclxuICAuQUJDTG92ZXJsYXkgc2wtdGFiOjpwYXJ0KGJhc2UpLnRhYiB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG1kLWVsZW1lbnQsICB2YXIoLS1zbC1jb2xvci1uZXV0cmFsLTApKTtcclxuICBjb2xvcjogdmFyKC0tdG1kLXRleHQsICB2YXIoLS1zbC1jb2xvci1uZXV0cmFsLTcwMCkpO1xyXG59XHJcbi5BQkNMb3ZlcmxheSBzbC1yYWRpby1idXR0b246OnBhcnQobGFiZWwpIHtcclxuICBjb2xvcjogdmFyKC0tdG1kLXRleHQsICB2YXIoLS1zbC1jb2xvci1uZXV0cmFsLTcwMCkpO1xyXG59XHJcbi5BQkNMb3ZlcmxheSBzbC10YWI6OnBhcnQoYmFzZSkge1xyXG4gIGNvbG9yOiB2YXIoLS10bWQtdGV4dCwgLS1zbC1jb2xvci1uZXV0cmFsLTcwMCk7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG1kLWVsZW1lbnQtaG92ZXIsICB2YXIoLS1zbC1jb2xvci1uZXV0cmFsLTApKTtcclxufVxyXG4uQUJDTG92ZXJsYXkgc2wtdGFiOjpwYXJ0KGJhc2UpOmhvdmVyIHtcclxuICBjb2xvcjogdmFyKC0tdG1kLXRleHQsIC0tc2wtY29sb3ItbmV1dHJhbC0wKTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10bWQtZWxlbWVudC1ob3ZlciwgIHZhcigtLXNsLWNvbG9yLXByaW1hcnktNjAwKSk7XHJcbn1cclxuXHJcbnNsLXJhZGlvLWJ1dHRvbjo6cGFydChidXR0b24pLCBzbC10YWI6OnBhcnQoYmFzZSkge1xyXG4gIGNvbG9yOiB2YXIoLS10bWQtdGV4dCwgLS1zbC1jb2xvci1uZXV0cmFsLTcwMCk7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG1kLWVsZW1lbnQsICB2YXIoLS1zbC1jb2xvci1uZXV0cmFsLTApKTtcclxuICBcclxufVxyXG5zbC10YWI6OnBhcnQoYmFzZSkge1xyXG4gIGJvcmRlci1yYWRpdXM6IDA7XHJcbn1cclxuc2wtcmFkaW8tYnV0dG9uOjpwYXJ0KGJ1dHRvbikge1xyXG4gICAgYm9yZGVyOiB2YXIoLS10bWQtZWxlbWVudCwgIHZhcigtLXNsLWNvbG9yLW5ldXRyYWwtMjAwKSkgMXB4IHNvbGlkO1xyXG59XHJcblxyXG5zbC1yYWRpby1idXR0b246OnBhcnQoYnV0dG9uKTpob3Zlciwgc2wtdGFiOjpwYXJ0KGJhc2UpOmhvdmVyIHtcclxuICBjb2xvcjogdmFyKC0tdG1kLXRleHQsIC0tc2wtY29sb3ItbmV1dHJhbC0wKTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10bWQtZWxlbWVudC1ob3ZlciwgIHZhcigtLXNsLWNvbG9yLXByaW1hcnktNjAwKSk7XHJcbn1cclxuc2wtcmFkaW8tYnV0dG9uOjpwYXJ0KGJ1dHRvbik6aG92ZXIge1xyXG4gIGJvcmRlcjogdmFyKC0tdG1kLWVsZW1lbnQtaG92ZXIsICB2YXIoLS1zbC1jb2xvci1wcmltYXJ5LTYwMCkpIDFweCBzb2xpZDtcclxufVxyXG5cclxuc2wtcmFkaW8tYnV0dG9uOjpwYXJ0KGJ1dHRvbi0tY2hlY2tlZCksIHNsLXRhYlthcmlhLXNlbGVjdGVkPVwidHJ1ZVwiXTo6cGFydChiYXNlKSB7XHJcbiAgY29sb3I6IHZhcigtLXRtZC10ZXh0LCAtLXNsLWNvbG9yLW5ldXRyYWwtMCk7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG1kLWFjY2VudCwgIHZhcigtLXNsLWNvbG9yLXByaW1hcnktNjAwKSk7XHJcbn1cclxuc2wtcmFkaW8tYnV0dG9uOjpwYXJ0KGJ1dHRvbi0tY2hlY2tlZCk6aG92ZXIgLHNsLXRhYlthcmlhLXNlbGVjdGVkPVwidHJ1ZVwiXTo6cGFydChiYXNlKTpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG1kLWFjY2VudC1ob3Zlcik7XHJcbn1cclxuXHJcbnNsLWJ1dHRvbjo6cGFydChiYXNlKSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG1kLWVsZW1lbnQsICB2YXIoLS1zbC1jb2xvci1uZXV0cmFsLTApKTtcclxuICBib3JkZXItY29sb3I6IHZhcigtLXRtZC1hY2NlbnQsICB2YXIoLS1zbC1jb2xvci1wcmltYXJ5LTYwMCkpO1xyXG59XHJcbnNsLWJ1dHRvbjo6cGFydChiYXNlKTpob3ZlciB7XHJcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRtZC1lbGVtZW50LWhvdmVyLCAgdmFyKC0tc2wtY29sb3ItcHJpbWFyeS02MDApKTtcclxuICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10bWQtYWNjZW50LWhvdmVyLCAgdmFyKC0tc2wtY29sb3ItcHJpbWFyeS02MDApKTtcclxufVxyXG5zbC1idXR0b246OnBhcnQoYmFzZSk6YWN0aXZlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10bWQtYWNjZW50LWhvdmVyLCAgdmFyKC0tc2wtY29sb3ItcHJpbWFyeS03MDApKTtcclxuICBib3JkZXItY29sb3I6IHZhcigtLXRtZC1hY2NlbnQtaG92ZXIsICB2YXIoLS1zbC1jb2xvci1wcmltYXJ5LTcwMCkpO1xyXG59XHJcbnNsLWJ1dHRvbjo6cGFydChsYWJlbCkge1xyXG4gIGNvbG9yOiB2YXIoLS10bWQtdGV4dCwgIHZhcigtLXNsLWNvbG9yLW5ldXRyYWwtNzAwKSk7XHJcbn1cclxuc2wtYnV0dG9uOjpwYXJ0KGxhYmVsKSB7XHJcbiAgY29sb3I6IHZhcigtLXRtZC10ZXh0LCAgdmFyKC0tc2wtY29sb3ItbmV1dHJhbC03MDApKTtcclxufVxyXG5zbC1idXR0b24ge1xyXG4gICAgbWFyZ2luOiAwLjVlbSAwO1xyXG59XHJcbnNsLWRyYXdlcjo6cGFydChwYW5lbCkge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRtZC1lbGVtZW50LCAgdmFyKC0tc2wtY29sb3ItbmV1dHJhbC0wKSk7XHJcbn1cclxuc2wtY2hlY2tib3g6OnBhcnQoY29udHJvbC0tY2hlY2tlZCkge1xyXG4gIGJvcmRlci1jb2xvcjogdmFyKC0tdG1kLWFjY2VudC1ob3ZlciwgIHZhcigtLXNsLWNvbG9yLXByaW1hcnktNjAwKSk7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG1kLWFjY2VudCwgIHZhcigtLXNsLWNvbG9yLXByaW1hcnktNjAwKSlcclxufVxyXG5cclxuLyogc29ycnkgZnVzYW0gKi9cclxuI2Z1c2FtLWFkZG9uLW1hbmFnZXItY29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG59XHJcbmA7XHJcbn07XHJcbiIsImltcG9ydCB7IHNlbmREYXRhVG9BY3Rpb24gfSBmcm9tIFwiLi4vaG9va3NcIjtcclxuaW1wb3J0IHsgc2VuZENoYXRMb2NhbCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBhYmNsUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XHJcblxyXG4vLyBsdXYgeW91IHpvaSA8M1xyXG5leHBvcnQgY29uc3QgZ2V0Q2hhcmFjdGVyID0gKGlkZW50aWZpZXI6IHN0cmluZyB8IG51bWJlciB8IENoYXJhY3Rlcik6IENoYXJhY3RlciB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgaWYgKCFpZGVudGlmaWVyKSByZXR1cm47XHJcbiAgaWYgKHR5cGVvZiBpZGVudGlmaWVyID09PSBcIm9iamVjdFwiKSByZXR1cm4gaWRlbnRpZmllcjtcclxuXHJcbiAgY29uc3QgY2hhcmFjdGVycyA9IENoYXRSb29tQ2hhcmFjdGVyLmZpbHRlcihDaGFyYWN0ZXIgPT4ge1xyXG4gICAgY29uc3QgbmFtZSA9IENoYXJhY3Rlci5OYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjb25zdCBuaWNrbmFtZSA9IENoYXJhY3Rlci5OaWNrbmFtZT8udG9Mb3dlckNhc2UoKTtcclxuICAgIGNvbnN0IGlkZW50aWZpZXJTdHJpbmcgPSBgJHtpZGVudGlmaWVyfWAudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBDaGFyYWN0ZXIuTWVtYmVyTnVtYmVyID09IGlkZW50aWZpZXIgfHxcclxuICAgICAgbmFtZSA9PT0gaWRlbnRpZmllclN0cmluZyB8fFxyXG4gICAgICBuaWNrbmFtZSA9PT0gaWRlbnRpZmllclN0cmluZyB8fFxyXG4gICAgICBuYW1lLnN0YXJ0c1dpdGgoaWRlbnRpZmllclN0cmluZykgfHxcclxuICAgICAgbmlja25hbWU/LnN0YXJ0c1dpdGgoaWRlbnRpZmllclN0cmluZylcclxuICAgICk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBjaGFyYWN0ZXJzWzBdO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHRhcmdldElucHV0RXh0cmFjdG9yID0gKHBhcnNlZDogc3RyaW5nW10pOiBDaGFyYWN0ZXIgfCB1bmRlZmluZWQgPT4ge1xyXG4gIGNvbnN0IG5hbWUgPSBwYXJzZWQuam9pbihcIiBcIik7XHJcbiAgY29uc3QgY2hhcmFjdGVyID0gZ2V0Q2hhcmFjdGVyKG5hbWUpO1xyXG4gIGlmICghY2hhcmFjdGVyKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY2hhcmFjdGVyO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzQUJDTFBsYXllciA9IChjaGFyYWN0ZXI6IENoYXJhY3Rlciwgc3RyaWN0PzogYm9vbGVhbiwgdmVyc2lvbiA9IFBsYXllci5BQkNMLlZlcnNpb24pOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gQm9vbGVhbihjaGFyYWN0ZXI/LkFCQ0wgJiYgKCFzdHJpY3QgfHwgY2hhcmFjdGVyLkFCQ0wuVmVyc2lvbiA9PT0gdmVyc2lvbikpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYXJhY3Rlck5hbWUobWVtYmVyTnVtYmVyOiBudW1iZXIgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xyXG4gIGlmICghbWVtYmVyTnVtYmVyKSB7XHJcbiAgICByZXR1cm4gXCJVbmtub3duXCI7XHJcbiAgfVxyXG4gIGNvbnN0IGNoYXJhY3RlciA9IGdldENoYXJhY3RlcihtZW1iZXJOdW1iZXIpO1xyXG5cclxuICBpZiAoIWNoYXJhY3Rlcikge1xyXG4gICAgcmV0dXJuIFwiVW5rbm93blwiO1xyXG4gIH1cclxuICByZXR1cm4gY2hhcmFjdGVyLk5pY2tuYW1lID8gY2hhcmFjdGVyLk5pY2tuYW1lIDogY2hhcmFjdGVyLk5hbWU7XHJcbn1cclxuXHJcbi8vIGx1diB5b3Ugc2VyYSA8M1xyXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZV90ZW1wbGF0ZSh0ZXh0OiBzdHJpbmcsIHNvdXJjZTogQ2hhcmFjdGVyIHwgbnVsbCA9IG51bGwsIGZhbGxiYWNrU291cmNlTmFtZTogc3RyaW5nID0gXCJcIikge1xyXG4gIGxldCByZXN1bHQgPSB0ZXh0O1xyXG5cclxuICBsZXQgcHJvbm91bkl0ZW0gPSBDaGFyYWN0ZXJQcm9ub3VuRGVzY3JpcHRpb24oUGxheWVyKTtcclxuICBsZXQgaXNQbGF5ZXJNYWxlID0gcHJvbm91bkl0ZW0gPT09IFwiSGUvSGltXCI7XHJcblxyXG4gIGxldCBwb3NzZXNzaXZlID0gaXNQbGF5ZXJNYWxlID8gXCJIaXNcIiA6IFwiSGVyXCI7XHJcbiAgbGV0IGludGVuc2l2ZSA9IGlzUGxheWVyTWFsZSA/IFwiSGltXCIgOiBcIkhlclwiO1xyXG4gIGxldCBwcm9ub3VuID0gaXNQbGF5ZXJNYWxlID8gXCJIZVwiIDogXCJTaGVcIjtcclxuXHJcbiAgbGV0IG9wcF9wcm9ub3VuSXRlbSA9ICFzb3VyY2UgPyBcIlRoZXkvVGhlbVwiIDogQ2hhcmFjdGVyUHJvbm91bkRlc2NyaXB0aW9uKHNvdXJjZSk7XHJcbiAgbGV0IGlzT3BwTWFsZSA9IG9wcF9wcm9ub3VuSXRlbSA9PT0gXCJIZS9IaW1cIjtcclxuXHJcbiAgbGV0IG9wcE5hbWUgPSBzb3VyY2U/LklzUGxheWVyKCkgPyAoaXNPcHBNYWxlID8gXCJoaW1zZWxmXCIgOiBcImhlcnNlbGZcIikgOiAhIXNvdXJjZSA/IENoYXJhY3Rlck5pY2tuYW1lKHNvdXJjZSkgOiBmYWxsYmFja1NvdXJjZU5hbWU7XHJcbiAgbGV0IG9wcFBvc3Nlc3NpdmUgPSBpc09wcE1hbGUgPyBcIkhpc1wiIDogXCJIZXJcIjtcclxuICBsZXQgb3BwSW50ZW5zaXZlID0gc291cmNlID09IFBsYXllciA/IChpc09wcE1hbGUgPyBcIkhpbXNlbGZcIiA6IFwiSGVyc2VsZlwiKSA6IGlzT3BwTWFsZSA/IFwiSGltXCIgOiBcIkhlclwiO1xyXG4gIGxldCBvcHBQcm9ub3VuID0gaXNPcHBNYWxlID8gXCJIZVwiIDogXCJTaGVcIjtcclxuXHJcbiAgcmV0dXJuIHJlc3VsdFxyXG4gICAgLnJlcGxhY2VBbGwoXCIlTkFNRSVcIiwgQ2hhcmFjdGVyTmlja25hbWUoUGxheWVyKSlcclxuICAgIC5yZXBsYWNlQWxsKFwiJVBPU1NFU1NJVkUlXCIsIHBvc3Nlc3NpdmUudG9Mb2NhbGVMb3dlckNhc2UoKSlcclxuICAgIC5yZXBsYWNlQWxsKFwiJVBST05PVU4lXCIsIHByb25vdW4udG9Mb2NhbGVMb3dlckNhc2UoKSlcclxuICAgIC5yZXBsYWNlQWxsKFwiJUlOVEVOU0lWRSVcIiwgaW50ZW5zaXZlLnRvTG9jYWxlTG93ZXJDYXNlKCkpXHJcbiAgICAucmVwbGFjZUFsbChcIiVDQVBfUE9TU0VTU0lWRSVcIiwgcG9zc2Vzc2l2ZSlcclxuICAgIC5yZXBsYWNlQWxsKFwiJUNBUF9QUk9OT1VOJVwiLCBwcm9ub3VuKVxyXG4gICAgLnJlcGxhY2VBbGwoXCIlQ0FQX0lOVEVOU0lWRSVcIiwgaW50ZW5zaXZlKVxyXG5cclxuICAgIC5yZXBsYWNlQWxsKFwiJU9QUF9OQU1FJVwiLCBvcHBOYW1lKVxyXG4gICAgLnJlcGxhY2VBbGwoXCIlT1BQX1BST05PVU4lXCIsIG9wcFByb25vdW4udG9Mb2NhbGVMb3dlckNhc2UoKSlcclxuICAgIC5yZXBsYWNlQWxsKFwiJU9QUF9QT1NTRVNTSVZFJVwiLCBvcHBQb3NzZXNzaXZlLnRvTG9jYWxlTG93ZXJDYXNlKCkpXHJcbiAgICAucmVwbGFjZUFsbChcIiVPUFBfSU5URU5TSVZFJVwiLCBvcHBJbnRlbnNpdmUudG9Mb2NhbGVMb3dlckNhc2UoKSlcclxuICAgIC5yZXBsYWNlQWxsKFwiJUNBUF9PUFBfUFJPTk9VTiVcIiwgb3BwUHJvbm91bilcclxuICAgIC5yZXBsYWNlQWxsKFwiJUNBUF9PUFBfUE9TU0VTU0lWRSVcIiwgb3BwUG9zc2Vzc2l2ZSlcclxuICAgIC5yZXBsYWNlQWxsKFwiJUNBUF9PUFBfSU5URU5TSVZFJVwiLCBvcHBJbnRlbnNpdmUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gU2VuZEFjdGlvbihhY3Rpb246IHN0cmluZywgc2VuZGVyOiBDaGFyYWN0ZXIgfCBudWxsID0gbnVsbCwgbWVzc2FnZVR5cGU6IGtleW9mIE1vZFNldHRpbmdzW1widmlzaWJsZU1lc3NhZ2VzXCJdLCB0YXJnZXQ/OiBDaGFyYWN0ZXIpIHtcclxuICBsZXQgbXNnID0gcmVwbGFjZV90ZW1wbGF0ZShhY3Rpb24sIHNlbmRlcik7XHJcbiAgaWYgKCFtZXNzYWdlVHlwZSkge1xyXG4gICAgU2VydmVyU2VuZChcIkNoYXRSb29tQ2hhdFwiLCB7XHJcbiAgICAgIENvbnRlbnQ6IFwiQmVlcFwiLFxyXG4gICAgICBUeXBlOiBcIkFjdGlvblwiLFxyXG4gICAgICBEaWN0aW9uYXJ5OiBbXHJcbiAgICAgICAgLy8gRU5cclxuICAgICAgICB7IFRhZzogXCJCZWVwXCIsIFRleHQ6IFwibXNnXCIgfSxcclxuICAgICAgICAvLyBDTlxyXG4gICAgICAgIHsgVGFnOiBcIuWPkemAgeengeiBilwiLCBUZXh0OiBcIm1zZ1wiIH0sXHJcbiAgICAgICAgLy8gREVcclxuICAgICAgICB7IFRhZzogXCJCaWVwXCIsIFRleHQ6IFwibXNnXCIgfSxcclxuICAgICAgICAvLyBGUlxyXG4gICAgICAgIHsgVGFnOiBcIlNvbm5lclwiLCBUZXh0OiBcIm1zZ1wiIH0sXHJcbiAgICAgICAgLy8gTWVzc2FnZSBpdHNlbGZcclxuICAgICAgICB7IFRhZzogXCJtc2dcIiwgVGV4dDogbXNnIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgc2VuZENoYXRMb2NhbChtc2csIFtcIkNoYXRNZXNzYWdlQWN0aW9uXCIsIFwiQ2hhdE1lc3NhZ2VOb25EaWFsb2d1ZVwiXSwgXCItLWxhYmVsLWNvbG9yOiNmZjQ5NDlcIik7XHJcblxyXG4gIGlmIChhYmNsUGxheWVyLnNldHRpbmdzLmdldFB1YmxpY01lc3NhZ2UobWVzc2FnZVR5cGUpKSB7XHJcbiAgICBzZW5kRGF0YVRvQWN0aW9uKFwib25BQkNMTWVzc2FnZVwiLCBtc2cpO1xyXG4gIH0gZWxzZSBpZiAodGFyZ2V0ICYmIHRhcmdldC5NZW1iZXJOdW1iZXIgIT09IFBsYXllci5NZW1iZXJOdW1iZXIpIHtcclxuICAgIHNlbmREYXRhVG9BY3Rpb24oXCJvbkFCQ0xNZXNzYWdlXCIsIG1zZywgdGFyZ2V0Lk1lbWJlck51bWJlcik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZUNTUyB9IGZyb20gXCIuLi8uLi9zY3JlZW5zL3N0eWxlcy9jc3NcIjtcclxuaW1wb3J0IHsgZ2VuZXJhdGVVbmlxdWVJRCwgd2FpdEZvckVsZW1lbnQgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgZ2V0UGxheWVyRGlhcGVyU2l6ZSwgaGFzRGlhcGVyIH0gZnJvbSBcIi4vZGlhcGVyXCI7XHJcbmltcG9ydCB7IGdldENoYXJhY3RlciwgZ2V0Q2hhcmFjdGVyTmFtZSB9IGZyb20gXCIuL3BsYXllclV0aWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQUJDTFN0YXRzV2luZG93IHtcclxuICBzdGF0c0RyYXdlcjogSFRNTEVsZW1lbnQ7XHJcbiAgZm9sZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnN0YXRzRHJhd2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNsLWRyYXdlclwiKTtcclxuICAgIHRoaXMuc3RhdHNEcmF3ZXIuaW5uZXJIVE1MID0gYFxyXG4gICAgPHAgY2xhc3M9XCIke21vZElkZW50aWZpZXJ9V2luZG93SGVhZGVyVGl0bGVcIj5TdGF0czwvcD5cclxuICAgIDxzbC1zZWxlY3QgaWQ9XCIke21vZElkZW50aWZpZXJ9Q3VycmVudFBsYXllclNlbGVjdFwiIHZhbHVlPVwiJHtQbGF5ZXIuTWVtYmVyTnVtYmVyfVwiPlxyXG4gICAgPC9zbC1zZWxlY3Q+XHJcblxyXG4gIFxyXG5cdFx0PGRpdiBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1TdGF0c1dpbmRvd0NvbnRlbnRcIj5cclxuICAgICAgPGxhYmVsIGlkPVwiU29pbGluZXNzUGVyY2VudGFnZVwiPlNvaWxpbmVzczwvbGFiZWw+XHJcbiAgICAgIDxzbC1wcm9ncmVzcy1iYXIgbGFiZWw9XCJTb2lsaW5lc3NcIiBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1Tb2lsaW5lc3NQZXJjZW50YWdlXCI+PC9zbC1wcm9ncmVzcy1iYXI+XHJcbiAgICAgIDxsYWJlbCBpZD1cIldldG5lc3NQZXJjZW50YWdlXCI+V2V0bmVzczwvbGFiZWw+XHJcbiAgICAgIDxzbC1wcm9ncmVzcy1iYXIgbGFiZWw9XCJXZXRuZXNzXCIgY2xhc3M9XCIke21vZElkZW50aWZpZXJ9V2V0bmVzc1BlcmNlbnRhZ2VcIj48L3NsLXByb2dyZXNzLWJhcj5cclxuICAgICAgPGxhYmVsIGlkPVwiQm93ZWxGdWxsbmVzc1wiPkJvd2VsPC9sYWJlbD5cclxuICAgICAgPHNsLXByb2dyZXNzLWJhciBsYWJlbD1cIkJvd2VsIEZ1bGxuZXNzXCIgY2xhc3M9XCIke21vZElkZW50aWZpZXJ9Qm93ZWxGdWxsbmVzc1wiPjwvc2wtcHJvZ3Jlc3MtYmFyPlxyXG4gICAgICA8bGFiZWwgaWQ9XCJCbGFkZGVyRnVsbG5lc3NcIj5CbGFkZGVyPC9sYWJlbD5cclxuICAgICAgPHNsLXByb2dyZXNzLWJhciBsYWJlbD1cIkJsYWRkZXIgRnVsbG5lc3NcIiBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1CbGFkZGVyRnVsbG5lc3NcIj48L3NsLXByb2dyZXNzLWJhcj5cclxuICAgICAgPGxhYmVsIGlkPVwiSW5jb250aW5lbmNlXCI+SW5jb250aW5lbmNlPC9sYWJlbD5cclxuICAgICAgPHNsLXByb2dyZXNzLWJhciBsYWJlbD1cIkluY29udGluZW5jZVwiIGNsYXNzPVwiJHttb2RJZGVudGlmaWVyfUluY29udGluZW5jZVwiPjwvc2wtcHJvZ3Jlc3MtYmFyPlxyXG4gICAgICA8bGFiZWwgaWQ9XCJNZW50YWxSZWdyZXNzaW9uXCI+TWVudGFsIFJlZ3Jlc3Npb248L2xhYmVsPlxyXG4gICAgICA8c2wtcHJvZ3Jlc3MtYmFyIGxhYmVsPVwiTWVudGFsIFJlZ3Jlc3Npb25cIiBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1NZW50YWxSZWdyZXNzaW9uXCI+PC9zbC1wcm9ncmVzcy1iYXI+XHJcblx0XHQ8L2Rpdj5cclxuICAgPHNsLWJ1dHRvbiBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1SZWZyZXNoQnV0dG9uXCI+UmVmcmVzaDwvc2wtYnV0dG9uPlxyXG5cdGA7XHJcblxyXG4gICAgb3ZlcmxheS5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzRHJhd2VyKTtcclxuICAgIHRoaXMuc3RhdHNEcmF3ZXIucXVlcnlTZWxlY3RvcihgIyR7bW9kSWRlbnRpZmllcn1DdXJyZW50UGxheWVyU2VsZWN0YCk/LmFkZEV2ZW50TGlzdGVuZXIoXCJzbC1jaGFuZ2VcIiwgKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB0aGlzLnN0YXRzRHJhd2VyLnF1ZXJ5U2VsZWN0b3IoYC4ke21vZElkZW50aWZpZXJ9UmVmcmVzaEJ1dHRvbmApPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy51cGRhdGUoKSk7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH1cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMuc3RhdHNEcmF3ZXIucmVtb3ZlQXR0cmlidXRlKFwib3BlblwiKTtcclxuICB9XHJcbiAgb3BlbihzZWxlY3RlZFBsYXllcklkPzogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnN0YXRzRHJhd2VyLnNldEF0dHJpYnV0ZShcIm9wZW5cIiwgXCJ0cnVlXCIpO1xyXG4gICAgaWYgKHNlbGVjdGVkUGxheWVySWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCBjdXJyZW50UGxheWVyU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGwgPSB0aGlzLnN0YXRzRHJhd2VyLnF1ZXJ5U2VsZWN0b3IoYCMke21vZElkZW50aWZpZXJ9Q3VycmVudFBsYXllclNlbGVjdGApO1xyXG4gICAgICBpZiAoY3VycmVudFBsYXllclNlbGVjdCkge1xyXG4gICAgICAgIGN1cnJlbnRQbGF5ZXJTZWxlY3QudmFsdWUgPSBzZWxlY3RlZFBsYXllcklkLnRvU3RyaW5nKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG4gIGFzeW5jIHVwZGF0ZSgpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRQbGF5ZXJTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbCA9IHRoaXMuc3RhdHNEcmF3ZXIucXVlcnlTZWxlY3RvcihgIyR7bW9kSWRlbnRpZmllcn1DdXJyZW50UGxheWVyU2VsZWN0YCk7XHJcbiAgICBpZiAoIWN1cnJlbnRQbGF5ZXJTZWxlY3QpIHJldHVybjtcclxuXHJcbiAgICBsZXQgc2VsZWN0ZWRDaGFyYWN0ZXI6IENoYXJhY3RlciB8IHVuZGVmaW5lZCA9IGdldENoYXJhY3RlcihjdXJyZW50UGxheWVyU2VsZWN0LnZhbHVlKTtcclxuICAgIGlmICghc2VsZWN0ZWRDaGFyYWN0ZXIgfHwgIXNlbGVjdGVkQ2hhcmFjdGVyPy5BQkNMKSB7XHJcbiAgICAgIHNlbGVjdGVkQ2hhcmFjdGVyID0gUGxheWVyO1xyXG4gICAgfVxyXG4gICAgLy8gZmlsbCBzZWxlY3QgQ2hhdFJvb21DaGFyYWN0ZXJcclxuICAgIGN1cnJlbnRQbGF5ZXJTZWxlY3QuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGZvciAobGV0IGNoYXJhY3RlciBvZiBDaGF0Um9vbUNoYXJhY3Rlcikge1xyXG4gICAgICBpZiAoIWNoYXJhY3Rlci5BQkNMKSBjb250aW51ZTtcclxuICAgICAgY3VycmVudFBsYXllclNlbGVjdC5pbm5lckhUTUwgKz0gYDxzbC1vcHRpb24gdmFsdWU9XCIke2NoYXJhY3Rlci5NZW1iZXJOdW1iZXJ9XCI+JHtnZXRDaGFyYWN0ZXJOYW1lKGNoYXJhY3Rlci5NZW1iZXJOdW1iZXIpfTwvc2wtb3B0aW9uPmA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXBkYXRlSW5wdXQgPSAoY2xhc3NOYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpID0+IHtcclxuICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlKTtcclxuICAgICAgY29uc3QgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsID0gdGhpcy5zdGF0c0RyYXdlci5xdWVyeVNlbGVjdG9yKGAuJHttb2RJZGVudGlmaWVyfSR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICBjb25zdCBsYWJlbDogSFRNTExhYmVsRWxlbWVudCB8IG51bGwgPSB0aGlzLnN0YXRzRHJhd2VyLnF1ZXJ5U2VsZWN0b3IoYCMke2NsYXNzTmFtZX1gKTtcclxuICAgICAgaWYgKCFpbnB1dCB8fCAhbGFiZWwpIHJldHVybjtcclxuICAgICAgY29uc3QgdmFsdWVSb3VuZGVkID0gTWF0aC5yb3VuZCgodmFsdWUgKyBOdW1iZXIuRVBTSUxPTikgKiAxMCkgLyAxMDtcclxuICAgICAgaWYgKHZhbHVlID4gMTAwKSB7XHJcbiAgICAgICAgaW5wdXQudmFsdWUgPSBcIjEwMFwiO1xyXG4gICAgICAgIGlucHV0LmlubmVyVGV4dCA9IGBvdmVyZmxvd2luZyAke01hdGgucm91bmQoKHZhbHVlIC0gMTAwKSAvICh2YWx1ZSAvIDEwMCkpfSVgO1xyXG4gICAgICAgIGxhYmVsLmlubmVyVGV4dCA9IGAke2xhYmVsLmlubmVyVGV4dC5zcGxpdChcIjpcIilbMF19OiBvdmVyZmxvd2luZyAke3ZhbHVlUm91bmRlZCAtIDEwMH0lYDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpbnB1dC52YWx1ZSA9IHZhbHVlUm91bmRlZC50b1N0cmluZygpO1xyXG4gICAgICAgIGlucHV0LmlubmVyVGV4dCA9IHZhbHVlUm91bmRlZC50b1N0cmluZygpICsgXCIlXCI7XHJcbiAgICAgICAgbGFiZWwuaW5uZXJUZXh0ID0gbGFiZWwuaW5uZXJUZXh0LnNwbGl0KFwiOlwiKVswXSArIFwiOiBcIiArIHZhbHVlUm91bmRlZC50b1N0cmluZygpICsgXCIlXCI7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBpZiAoIXNlbGVjdGVkQ2hhcmFjdGVyLkFCQ0wpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGhhc0RpYXBlcihzZWxlY3RlZENoYXJhY3RlcikpIHtcclxuICAgICAgdXBkYXRlSW5wdXQoXCJTb2lsaW5lc3NQZXJjZW50YWdlXCIsIChzZWxlY3RlZENoYXJhY3Rlci5BQkNMLlN0YXRzLlNvaWxpbmVzcy52YWx1ZSAvIGdldFBsYXllckRpYXBlclNpemUoc2VsZWN0ZWRDaGFyYWN0ZXIpKSAqIDEwMCk7XHJcbiAgICAgIHVwZGF0ZUlucHV0KFwiV2V0bmVzc1BlcmNlbnRhZ2VcIiwgKHNlbGVjdGVkQ2hhcmFjdGVyLkFCQ0wuU3RhdHMuV2V0bmVzcy52YWx1ZSAvIGdldFBsYXllckRpYXBlclNpemUoc2VsZWN0ZWRDaGFyYWN0ZXIpKSAqIDEwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB1cGRhdGVJbnB1dChcIlNvaWxpbmVzc1BlcmNlbnRhZ2VcIiwgMCk7XHJcbiAgICAgIHVwZGF0ZUlucHV0KFwiV2V0bmVzc1BlcmNlbnRhZ2VcIiwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSW5wdXQoXCJCb3dlbEZ1bGxuZXNzXCIsIChzZWxlY3RlZENoYXJhY3Rlci5BQkNMLlN0YXRzLkJvd2VsLnZhbHVlIC8gc2VsZWN0ZWRDaGFyYWN0ZXIuQUJDTC5TdGF0cy5Cb3dlbC5zaXplKSAqIDEwMCk7XHJcbiAgICB1cGRhdGVJbnB1dChcIkJsYWRkZXJGdWxsbmVzc1wiLCAoc2VsZWN0ZWRDaGFyYWN0ZXIuQUJDTC5TdGF0cy5CbGFkZGVyLnZhbHVlIC8gc2VsZWN0ZWRDaGFyYWN0ZXIuQUJDTC5TdGF0cy5CbGFkZGVyLnNpemUpICogMTAwKTtcclxuICAgIHVwZGF0ZUlucHV0KFwiSW5jb250aW5lbmNlXCIsIHNlbGVjdGVkQ2hhcmFjdGVyLkFCQ0wuU3RhdHMuSW5jb250aW5lbmNlLnZhbHVlICogMTAwKTtcclxuICAgIHVwZGF0ZUlucHV0KFwiTWVudGFsUmVncmVzc2lvblwiLCBzZWxlY3RlZENoYXJhY3Rlci5BQkNMLlN0YXRzLk1lbnRhbFJlZ3Jlc3Npb24udmFsdWUgKiAxMDApO1xyXG4gIH1cclxufVxyXG5jbGFzcyBNb3ZhYmxlRWxlbWVudCB7XHJcbiAgbmV3WDogbnVtYmVyID0gMDtcclxuICBuZXdZOiBudW1iZXIgPSAwO1xyXG4gIG9sZFg6IG51bWJlciA9IDA7XHJcbiAgb2xkWTogbnVtYmVyID0gMDtcclxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICBpc0RyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgaXNSZXNpemluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHJlc2l6ZURpcmVjdGlvbjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcbiAgZWRnZVRocmVzaG9sZDogbnVtYmVyID0gMTA7IC8vIERpc3RhbmNlIGZyb20gdGhlIGVkZ2UgdG8gdHJpZ2dlciByZXNpemluZ1xyXG4gIHJlc2l6YWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCByZXNpemFibGU6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgIHRoaXMucmVzaXphYmxlID0gcmVzaXphYmxlO1xyXG4gICAgLy8gQmluZCBtZXRob2RzIHRvIHRoZSBpbnN0YW5jZVxyXG4gICAgdGhpcy5vbk1vdXNlRG93biA9IHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Nb3VzZU1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uTW91c2VVcCA9IHRoaXMub25Nb3VzZVVwLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uTW91c2VFbnRlciA9IHRoaXMub25Nb3VzZUVudGVyLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uTW91c2VMZWF2ZSA9IHRoaXMub25Nb3VzZUxlYXZlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uTW91c2VNb3ZlRm9yQ3Vyc29yID0gdGhpcy5vbk1vdXNlTW92ZUZvckN1cnNvci5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMub25Nb3VzZURvd24pO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMub25Nb3VzZU1vdmVGb3JDdXJzb3IpO1xyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG5cclxuICAgIGlmICghdGhpcy5yZXNpemFibGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLnJlc2l6ZSA9IFwibm9uZVwiO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHRoaXMub25Nb3VzZUVudGVyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0aGlzLm9uTW91c2VMZWF2ZSk7XHJcbiAgfVxyXG5cclxuICBvbk1vdXNlRW50ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIC8vIEFkZCBtb3VzZW1vdmUgbGlzdGVuZXIgZm9yIGN1cnNvciB1cGRhdGVzXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm9uTW91c2VNb3ZlRm9yQ3Vyc29yKTtcclxuICB9XHJcblxyXG4gIG9uTW91c2VMZWF2ZShldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgLy8gUmVtb3ZlIG1vdXNlbW92ZSBsaXN0ZW5lciBhbmQgcmVzZXQgY3Vyc29yXHJcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm9uTW91c2VNb3ZlRm9yQ3Vyc29yKTtcclxuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcclxuICB9XHJcblxyXG4gIG9uTW91c2VNb3ZlRm9yQ3Vyc29yKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAvLyBVcGRhdGUgY3Vyc29yIGJhc2VkIG9uIG1vdXNlIHBvc2l0aW9uXHJcbiAgICBjb25zdCB7IG9mZnNldFgsIG9mZnNldFkgfSA9IGV2ZW50O1xyXG4gICAgY29uc3QgeyBvZmZzZXRXaWR0aCwgb2Zmc2V0SGVpZ2h0IH0gPSB0aGlzLmVsZW1lbnQ7XHJcbiAgICBpZiAoIXRoaXMucmVzaXphYmxlKSByZXR1cm47XHJcbiAgICBpZiAob2Zmc2V0WCA8IHRoaXMuZWRnZVRocmVzaG9sZCkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJldy1yZXNpemVcIjsgLy8gTGVmdCBlZGdlXHJcbiAgICB9IGVsc2UgaWYgKG9mZnNldFggPiBvZmZzZXRXaWR0aCAtIHRoaXMuZWRnZVRocmVzaG9sZCkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJldy1yZXNpemVcIjsgLy8gUmlnaHQgZWRnZVxyXG4gICAgfSBlbHNlIGlmIChvZmZzZXRZIDwgdGhpcy5lZGdlVGhyZXNob2xkKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcIm5zLXJlc2l6ZVwiOyAvLyBUb3AgZWRnZVxyXG4gICAgfSBlbHNlIGlmIChvZmZzZXRZID4gb2Zmc2V0SGVpZ2h0IC0gdGhpcy5lZGdlVGhyZXNob2xkKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcIm5zLXJlc2l6ZVwiOyAvLyBCb3R0b20gZWRnZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGNvbnN0IHsgb2Zmc2V0WCwgb2Zmc2V0WSB9ID0gZXZlbnQ7XHJcbiAgICBjb25zdCB7IG9mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHQgfSA9IHRoaXMuZWxlbWVudDtcclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgaWYgcmVzaXppbmcgb3IgZHJhZ2dpbmdcclxuICAgIGlmICh0aGlzLnJlc2l6YWJsZSkge1xyXG4gICAgICBpZiAob2Zmc2V0WCA8IHRoaXMuZWRnZVRocmVzaG9sZCkge1xyXG4gICAgICAgIHRoaXMuaXNSZXNpemluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXNpemVEaXJlY3Rpb24gPSBcImxlZnRcIjtcclxuICAgICAgfSBlbHNlIGlmIChvZmZzZXRYID4gb2Zmc2V0V2lkdGggLSB0aGlzLmVkZ2VUaHJlc2hvbGQpIHtcclxuICAgICAgICB0aGlzLmlzUmVzaXppbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVzaXplRGlyZWN0aW9uID0gXCJyaWdodFwiO1xyXG4gICAgICB9IGVsc2UgaWYgKG9mZnNldFkgPCB0aGlzLmVkZ2VUaHJlc2hvbGQpIHtcclxuICAgICAgICB0aGlzLmlzUmVzaXppbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVzaXplRGlyZWN0aW9uID0gXCJ0b3BcIjtcclxuICAgICAgfSBlbHNlIGlmIChvZmZzZXRZID4gb2Zmc2V0SGVpZ2h0IC0gdGhpcy5lZGdlVGhyZXNob2xkKSB7XHJcbiAgICAgICAgdGhpcy5pc1Jlc2l6aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlc2l6ZURpcmVjdGlvbiA9IFwiYm90dG9tXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc0RyYWdnaW5nIHx8IHRoaXMuaXNSZXNpemluZykge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLm9sZFggPSBldmVudC5jbGllbnRYO1xyXG4gICAgICB0aGlzLm9sZFkgPSBldmVudC5jbGllbnRZO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLm9uTW91c2VVcCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1vdXNlTW92ZShldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgaWYgKHRoaXMuaXNEcmFnZ2luZykge1xyXG4gICAgICAvLyBEcmFnZ2luZyBsb2dpY1xyXG4gICAgICB0aGlzLm5ld1ggPSB0aGlzLm9sZFggLSBldmVudC5jbGllbnRYO1xyXG4gICAgICB0aGlzLm5ld1kgPSB0aGlzLm9sZFkgLSBldmVudC5jbGllbnRZO1xyXG5cclxuICAgICAgdGhpcy5vbGRYID0gZXZlbnQuY2xpZW50WDtcclxuICAgICAgdGhpcy5vbGRZID0gZXZlbnQuY2xpZW50WTtcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSBgJHt0aGlzLmVsZW1lbnQub2Zmc2V0VG9wIC0gdGhpcy5uZXdZfXB4YDtcclxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSBgJHt0aGlzLmVsZW1lbnQub2Zmc2V0TGVmdCAtIHRoaXMubmV3WH1weGA7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNSZXNpemluZykge1xyXG4gICAgICAvLyBSZXNpemluZyBsb2dpY1xyXG4gICAgICBjb25zdCBkZWx0YVggPSBldmVudC5jbGllbnRYIC0gdGhpcy5vbGRYO1xyXG4gICAgICBjb25zdCBkZWx0YVkgPSBldmVudC5jbGllbnRZIC0gdGhpcy5vbGRZO1xyXG5cclxuICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgIGNvbnN0IGxlZnQgPSBwYXJzZUludChzdHlsZS5sZWZ0LCAxMCk7XHJcbiAgICAgIGNvbnN0IHRvcCA9IHBhcnNlSW50KHN0eWxlLnRvcCwgMTApO1xyXG4gICAgICBjb25zdCB3aWR0aCA9IHBhcnNlSW50KHN0eWxlLndpZHRoLCAxMCk7XHJcbiAgICAgIGNvbnN0IGhlaWdodCA9IHBhcnNlSW50KHN0eWxlLmhlaWdodCwgMTApO1xyXG5cclxuICAgICAgc3dpdGNoICh0aGlzLnJlc2l6ZURpcmVjdGlvbikge1xyXG4gICAgICAgIGNhc2UgXCJsZWZ0XCI6XHJcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHt3aWR0aCAtIGRlbHRhWH1weGA7XHJcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9IGAke2xlZnQgKyBkZWx0YVggLyAyfXB4YDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJyaWdodFwiOlxyXG4gICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gYCR7d2lkdGggKyBkZWx0YVh9cHhgO1xyXG4gICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtsZWZ0ICsgZGVsdGFYIC8gMn1weGA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwidG9wXCI6XHJcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0IC0gZGVsdGFZfXB4YDtcclxuICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSBgJHt0b3AgKyBkZWx0YVkgLyAyfXB4YDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJib3R0b21cIjpcclxuICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHQgKyBkZWx0YVl9cHhgO1xyXG4gICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9IGAke3RvcCArIGRlbHRhWSAvIDJ9cHhgO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMub2xkWCA9IGV2ZW50LmNsaWVudFg7XHJcbiAgICAgIHRoaXMub2xkWSA9IGV2ZW50LmNsaWVudFk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1vdXNlVXAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAvLyBDbGVhbiB1cFxyXG4gICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzUmVzaXppbmcgPSBmYWxzZTtcclxuICAgIHRoaXMucmVzaXplRGlyZWN0aW9uID0gbnVsbDtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5vbk1vdXNlTW92ZSk7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLm9uTW91c2VVcCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQUJDTFllc05vUHJvbXB0IHtcclxuICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgb25BY2NlcHQ6ICguLi5hcmdzOiBhbnkpID0+IHZvaWQ7XHJcbiAgb25EZW55OiAoLi4uYXJnczogYW55KSA9PiB2b2lkO1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgcHJvbXB0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBvbkFjY2VwdDogKCkgPT4gdm9pZCwgb25EZW55OiAoKSA9PiB2b2lkLCB0aW1lb3V0OiBudW1iZXIgPSAtMSkge1xyXG4gICAgbmV3IE1vdmFibGVFbGVtZW50KHRoaXMucHJvbXB0KTtcclxuICAgIHRoaXMuaWQgPSBnZW5lcmF0ZVVuaXF1ZUlEKCk7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgdGhpcy5vbkFjY2VwdCA9IG9uQWNjZXB0O1xyXG4gICAgdGhpcy5vbkRlbnkgPSBvbkRlbnk7XHJcbiAgICB0aGlzLnNob3coKTtcclxuICAgIGlmICh0aW1lb3V0ID09PSAtMSkgcmV0dXJuO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMucHJvbXB0LnJlbW92ZSgpO1xyXG4gICAgfSwgdGltZW91dCk7XHJcbiAgfVxyXG5cclxuICBzaG93KCkge1xyXG4gICAgdGhpcy5wcm9tcHQuY2xhc3NMaXN0LmFkZChgJHttb2RJZGVudGlmaWVyfVByb21wdGApO1xyXG4gICAgdGhpcy5wcm9tcHQuaWQgPSB0aGlzLmlkO1xyXG4gICAgdGhpcy5wcm9tcHQuaW5uZXJIVE1MID0gYDxwPiR7dGhpcy5tZXNzYWdlfTwvcD48YnV0dG9uIGNsYXNzPVwiJHttb2RJZGVudGlmaWVyfVByb21wdE5vICR7bW9kSWRlbnRpZmllcn1CdXR0b25cIj5EZW55PC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1Qcm9tcHRZZXMgJHttb2RJZGVudGlmaWVyfUJ1dHRvblwiPkFjY2VwdDwvYnV0dG9uPmA7XHJcbiAgICBvdmVybGF5LmFwcGVuZENoaWxkKHRoaXMucHJvbXB0KTtcclxuICAgIHRoaXMucHJvbXB0LnF1ZXJ5U2VsZWN0b3IoYCMke3RoaXMuaWR9IC4ke21vZElkZW50aWZpZXJ9UHJvbXB0WWVzYCk/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMub25BY2NlcHQoKTtcclxuICAgICAgdGhpcy5wcm9tcHQucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucHJvbXB0LnF1ZXJ5U2VsZWN0b3IoYCMke3RoaXMuaWR9IC4ke21vZElkZW50aWZpZXJ9UHJvbXB0Tm9gKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgdGhpcy5vbkRlbnkoKTtcclxuICAgICAgdGhpcy5wcm9tcHQucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbmV4cG9ydCBsZXQgYWJjbFN0YXRzV2luZG93OiBBQkNMU3RhdHNXaW5kb3c7XHJcbm92ZXJsYXkuY2xhc3NMaXN0LmFkZChgJHttb2RJZGVudGlmaWVyfU92ZXJsYXlgKTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbml0T3ZlcmxheSA9ICgpID0+IHtcclxuICBjb25zdCBzaG9lbGFjZUNTU0xpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcbiAgc2hvZWxhY2VDU1NMaWdodC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuICBzaG9lbGFjZUNTU0xpZ2h0LmhyZWYgPSBcImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vQHNob2VsYWNlLXN0eWxlL3Nob2VsYWNlQDIuMjAuMC9jZG4vdGhlbWVzL2xpZ2h0LmNzc1wiO1xyXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2hvZWxhY2VDU1NMaWdodCk7XHJcblxyXG4gIGNvbnN0IHNob2VsYWNlQ1NTRGFyayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG4gIHNob2VsYWNlQ1NTRGFyay5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuICBzaG9lbGFjZUNTU0RhcmsuaHJlZiA9IFwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9Ac2hvZWxhY2Utc3R5bGUvc2hvZWxhY2VAMi4yMC4wL2Nkbi90aGVtZXMvZGFyay5jc3NcIjtcclxuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNob2VsYWNlQ1NTRGFyayk7XHJcblxyXG4gIGNvbnN0IHNob2VsYWNlU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICBzaG9lbGFjZVNjcmlwdC5zcmMgPSBcImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vQHNob2VsYWNlLXN0eWxlL3Nob2VsYWNlQDIuMjAuMC9jZG4vc2hvZWxhY2UtYXV0b2xvYWRlci5qc1wiO1xyXG4gIHNob2VsYWNlU2NyaXB0LnR5cGUgPSBcIm1vZHVsZVwiO1xyXG4gIHNob2VsYWNlU2NyaXB0LmFzeW5jID0gdHJ1ZTtcclxuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNob2VsYWNlU2NyaXB0KTtcclxuXHJcbiAgY29uc3QgaW5qZWN0ZWRTdHlsZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcbiAgaW5qZWN0ZWRTdHlsZXMuaW5uZXJIVE1MID0gY3JlYXRlQ1NTKCk7XHJcblxyXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoaW5qZWN0ZWRTdHlsZXMpO1xyXG4gIGFiY2xTdGF0c1dpbmRvdyA9IG5ldyBBQkNMU3RhdHNXaW5kb3coKTtcclxuICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoKFBsYXllci5DaGF0U2V0dGluZ3M/LkNvbG9yVGhlbWUgPz8gXCJMaWdodFwiKS5zdGFydHNXaXRoKFwiTGlnaHRcIikgPyBcInNsLXRoZW1lLWxpZ2h0XCIgOiBcInNsLXRoZW1lLWRhcmtcIik7XHJcbiAgb3ZlcmxheS5zdHlsZS5jb2xvciA9IChQbGF5ZXIuQ2hhdFNldHRpbmdzPy5Db2xvclRoZW1lID8/IFwiTGlnaHRcIikuc3RhcnRzV2l0aChcIkxpZ2h0XCIpID8gXCJ2YXIoLS10bWQtdGV4dCxibGFjaylcIiA6IFwidmFyKC0tdG1kLXRleHQsd2hpdGUpXCI7XHJcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KTtcclxuXHJcbiAgd2FpdEZvckVsZW1lbnQoXCIjY2hhdC1yb29tLWRpdlwiLCB7IGNoaWxkQ2hlY2s6IHRydWUsIHRpbWVvdXQ6IDk5OTk5OTk5OTk5OTk5OTk5OTk5OTkgfSkudGhlbigoKSA9PiB7XHJcbiAgICB3YWl0Rm9yRWxlbWVudChgLiR7bW9kSWRlbnRpZmllcn1PdmVybGF5YCwgeyB0aW1lb3V0OiA5OTk5OTk5OTk5OTk5OTk5OTk5OTk5IH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVDaGlsZChvdmVybGF5KTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcbiIsImltcG9ydCB7IGlzQ29sb3JhYmxlLCBEZWJvdW5jZXIsIGdldENvbG9yLCBTYXZlciwgc2VuZENoYXRMb2NhbCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQge1xyXG4gIGluY29udGluZW5jZUNoYW5jZUZvcm11bGEsXHJcbiAgZ2V0UGxheWVyRGlhcGVyU2l6ZSxcclxuICBtZW50YWxSZWdyZXNzaW9uT25BY2NpZGVudCxcclxuICBtZW50YWxSZWdyZXNzaW9uT3ZlcnRpbWUsXHJcbiAgdXBkYXRlRGlhcGVyQ29sb3IsXHJcbiAgaW5jb250aW5lbmNlTGltaXRGb3JtdWxhLFxyXG4gIGhhc0RpYXBlcixcclxuICBhdmVyYWdlQ29sb3IsXHJcbn0gZnJvbSBcIi4vZGlhcGVyXCI7XHJcbmltcG9ydCB7IGFiY2xTdGF0c1dpbmRvdyB9IGZyb20gXCIuL3VpXCI7XHJcbmltcG9ydCB7IEFCQ0xkYXRhIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBNZXRhYm9saXNtU2V0dGluZ1ZhbHVlcyB9IGZyb20gXCIuLi8uLi90eXBlcy90eXBlc1wiO1xyXG5pbXBvcnQgeyBTZW5kQWN0aW9uIH0gZnJvbSBcIi4vcGxheWVyVXRpbHNcIjtcclxuaW1wb3J0IHsgc2VuZFVwZGF0ZU15RGF0YSB9IGZyb20gXCIuLi9ob29rc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVBsYXllckNsb3RoZXMgPSAoKSA9PiB7XHJcbiAgQ2hhcmFjdGVyUmVmcmVzaChQbGF5ZXIsIHRydWUpO1xyXG4gIENoYXRSb29tQ2hhcmFjdGVyVXBkYXRlKFBsYXllcik7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYWJjbFBsYXllciA9IHtcclxuICBvbkFjY2lkZW50OiAoKSA9PiB7XHJcbiAgICBhYmNsUGxheWVyLnN0YXRzLk1lbnRhbFJlZ3Jlc3Npb24gKz0gbWVudGFsUmVncmVzc2lvbk9uQWNjaWRlbnQoKTtcclxuICB9LFxyXG4gIHVwZGF0ZTogKCkgPT4ge1xyXG4gICAgLy8gb25jZSBwZXIgbWludXRlXHJcbiAgICBhYmNsUGxheWVyLnN0YXRzLk1lbnRhbFJlZ3Jlc3Npb24gKz0gbWVudGFsUmVncmVzc2lvbk92ZXJ0aW1lKCk7XHJcbiAgICBhYmNsUGxheWVyLnN0YXRzLkJsYWRkZXJWYWx1ZSArPSBhYmNsUGxheWVyLnN0YXRzLldhdGVySW50YWtlICogTWV0YWJvbGlzbVNldHRpbmdWYWx1ZXNbYWJjbFBsYXllci5zZXR0aW5ncy5QZWVNZXRhYm9saXNtXTtcclxuICAgIGFiY2xQbGF5ZXIuc3RhdHMuQm93ZWxWYWx1ZSArPSBhYmNsUGxheWVyLnN0YXRzLkZvb2RJbnRha2UgKiBNZXRhYm9saXNtU2V0dGluZ1ZhbHVlc1thYmNsUGxheWVyLnNldHRpbmdzLlBvb3BNZXRhYm9saXNtXTtcclxuXHJcbiAgICBhYmNsUGxheWVyLnNldHRpbmdzLlBlZU1ldGFib2xpc20gIT09IFwiRGlzYWJsZWRcIiAmJiBhYmNsUGxheWVyLmF0dGVtcHRXZXR0aW5nKCk7XHJcbiAgICBhYmNsUGxheWVyLnNldHRpbmdzLlBvb3BNZXRhYm9saXNtICE9PSBcIkRpc2FibGVkXCIgJiYgYWJjbFBsYXllci5hdHRlbXB0U29pbGluZygpO1xyXG4gICAgcGxheWVyU2F2ZXIuc2F2ZSgpO1xyXG4gIH0sXHJcbiAgd2V0Q2xvdGhpbmc6ICgpID0+IHtcclxuICAgIC8vIHBhbnRpZXMgLT4gcGFudHMgLT4gZmxvb3JcclxuICAgIHNlbmRDaGF0TG9jYWwoXCJZb3UndmUgaGFkIGEgd2V0IGFjY2lkZW50IGluIHlvdXIgY2xvdGhlcyFcIik7XHJcbiAgICBhYmNsUGxheWVyLnN0YXRzLlB1ZGRsZVNpemUgKz0gYWJjbFBsYXllci5zdGF0cy5CbGFkZGVyVmFsdWU7XHJcbiAgICBhYmNsUGxheWVyLnN0YXRzLkJsYWRkZXJWYWx1ZSA9IDA7XHJcbiAgICBjb25zdCB3ZXRDb2xvciA9IFwiIzk2OTM2Q1wiO1xyXG5cclxuICAgIGNvbnN0IHBhbnRpZXMgPSBJbnZlbnRvcnlHZXQoUGxheWVyLCBcIlBhbnRpZXNcIik7XHJcbiAgICBpZiAocGFudGllcykge1xyXG4gICAgICBjb25zdCBwYW50aWVzQ29sb3JzID0gZ2V0Q29sb3IocGFudGllcy5Db2xvciB8fCAocGFudGllcy5Bc3NldC5EZWZhdWx0Q29sb3IgYXMgSXRlbUNvbG9yKSwgcGFudGllcy5Bc3NldCk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFudGllc0NvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghaXNDb2xvcmFibGUocGFudGllc0NvbG9yc1tpXSkpIGNvbnRpbnVlO1xyXG4gICAgICAgIHBhbnRpZXNDb2xvcnNbaV0gPSBhdmVyYWdlQ29sb3IocGFudGllc0NvbG9yc1tpXSwgd2V0Q29sb3IsIDAuMyk7XHJcbiAgICAgIH1cclxuICAgICAgcGFudGllcy5Db2xvciA9IHBhbnRpZXNDb2xvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIFBsYXllci5BcHBlYXJhbmNlKSB7XHJcbiAgICAgIGlmIChBQkNMZGF0YS5JdGVtRGVmaW5pdGlvbnMuUGFudHMuc29tZShwYW50cyA9PiBwYW50cyA9PT0gaXRlbS5Bc3NldC5EZXNjcmlwdGlvbikpIHtcclxuICAgICAgICBjb25zdCBjb2xvcnMgPSBnZXRDb2xvcihpdGVtLkNvbG9yIHx8IChpdGVtLkFzc2V0LkRlZmF1bHRDb2xvciBhcyBJdGVtQ29sb3IpLCBpdGVtLkFzc2V0KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKCFpc0NvbG9yYWJsZShjb2xvcnNbaV0pKSBjb250aW51ZTtcclxuICAgICAgICAgIGNvbG9yc1tpXSA9IGF2ZXJhZ2VDb2xvcihjb2xvcnNbaV0sIHdldENvbG9yLCAwLjMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLkNvbG9yID0gY29sb3JzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBhYmNsUGxheWVyLnN0YXRzLlB1ZGRsZVNpemUgKz0gYWJjbFBsYXllci5zdGF0cy5CbGFkZGVyVmFsdWU7XHJcbiAgICBhYmNsUGxheWVyLnN0YXRzLkJsYWRkZXJGdWxsbmVzcyA9IDA7XHJcblxyXG4gICAgaWYgKGhhc0RpYXBlcigpKSB7XHJcbiAgICAgIFNlbmRBY3Rpb24oXCIlTkFNRSUncyBkaWFwZXIgbGVha3MgYW5kIHdldCAlSU5URU5TSVZFJSBjbG90aGVzIGNhdXNpbmcgYSBwdWRkbGUgdG8gZm9ybS5cIiwgdW5kZWZpbmVkLCBcIndldENsb3RoaW5nXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgU2VuZEFjdGlvbihcIiVOQU1FJSdzIHdldHMgJUlOVEVOU0lWRSUgY2xvdGhlcyBsZWFrcyBvbnRvIHRoZSBmbG9vci5cIiwgdW5kZWZpbmVkLCBcIndldENsb3RoaW5nXCIpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUGxheWVyQ2xvdGhlcygpO1xyXG4gICAgc2VuZFVwZGF0ZU15RGF0YSgpO1xyXG4gIH0sXHJcbiAgc29pbENsb3RoaW5nOiAoKSA9PiB7XHJcbiAgICBhYmNsUGxheWVyLnN0YXRzLlB1ZGRsZVNpemUgKz0gYWJjbFBsYXllci5zdGF0cy5CbGFkZGVyVmFsdWU7XHJcbiAgICBhYmNsUGxheWVyLnN0YXRzLkJsYWRkZXJWYWx1ZSA9IDA7XHJcbiAgICBjb25zdCBtZXNzQ29sb3IgPSBcIiMyNjFhMTZcIjtcclxuXHJcbiAgICBjb25zdCBwYW50aWVzID0gSW52ZW50b3J5R2V0KFBsYXllciwgXCJQYW50aWVzXCIpO1xyXG4gICAgaWYgKHBhbnRpZXMpIHtcclxuICAgICAgY29uc3QgcGFudGllc0NvbG9ycyA9IGdldENvbG9yKHBhbnRpZXMuQ29sb3IgfHwgKHBhbnRpZXMuQXNzZXQuRGVmYXVsdENvbG9yIGFzIEl0ZW1Db2xvciksIHBhbnRpZXMuQXNzZXQpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhbnRpZXNDb2xvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoIWlzQ29sb3JhYmxlKHBhbnRpZXNDb2xvcnNbaV0pKSBjb250aW51ZTtcclxuICAgICAgICBwYW50aWVzQ29sb3JzW2ldID0gYXZlcmFnZUNvbG9yKHBhbnRpZXNDb2xvcnNbaV0sIG1lc3NDb2xvciwgMC4zKTtcclxuICAgICAgfVxyXG4gICAgICBwYW50aWVzLkNvbG9yID0gcGFudGllc0NvbG9ycztcclxuICAgIH1cclxuICAgIGlmIChoYXNEaWFwZXIoKSkge1xyXG4gICAgICBTZW5kQWN0aW9uKFwiJU5BTUUlJ3MgZGlhcGVyIGxlYWtzIGFuZCBzb2lscyAlSU5URU5TSVZFJSBjbG90aGVzIGFuZCB0aGUgZmxvb3IuXCIsIHVuZGVmaW5lZCwgXCJzb2lsQ2xvdGhpbmdcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBTZW5kQWN0aW9uKFwiJU5BTUUlIHNvaWxzICVJTlRFTlNJVkUlIGNsb3RoZXMgYW5kIHRoZSBmbG9vci5cIiwgdW5kZWZpbmVkLCBcInNvaWxDbG90aGluZ1wiKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVBsYXllckNsb3RoZXMoKTtcclxuICB9LFxyXG4gIHdldERpYXBlcjogKCkgPT4ge1xyXG4gICAgY29uc3QgZGlhcGVyU2l6ZSA9IGdldFBsYXllckRpYXBlclNpemUoKTtcclxuICAgIGNvbnN0IGFic29yYmVkVm9sdW1lID0gTWF0aC5taW4oYWJjbFBsYXllci5zdGF0cy5CbGFkZGVyVmFsdWUsIGRpYXBlclNpemUgLSBhYmNsUGxheWVyLnN0YXRzLldldG5lc3NWYWx1ZSk7XHJcbiAgICBTZW5kQWN0aW9uKFwiJU5BTUUlIHdldHMgJUlOVEVOU0lWRSUgZGlhcGVyLlwiLCB1bmRlZmluZWQsIFwid2V0RGlhcGVyXCIpO1xyXG5cclxuICAgIGFiY2xQbGF5ZXIuc3RhdHMuQmxhZGRlclZhbHVlIC09IGFic29yYmVkVm9sdW1lO1xyXG4gICAgYWJjbFBsYXllci5zdGF0cy5XZXRuZXNzVmFsdWUgKz0gYWJzb3JiZWRWb2x1bWU7XHJcblxyXG4gICAgaWYgKGFiY2xQbGF5ZXIuc3RhdHMuV2V0bmVzc1ZhbHVlID49IGRpYXBlclNpemUpIHtcclxuICAgICAgYWJjbFBsYXllci53ZXRDbG90aGluZygpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgc29pbERpYXBlcjogKCkgPT4ge1xyXG4gICAgY29uc3QgZGlhcGVyU2l6ZSA9IGdldFBsYXllckRpYXBlclNpemUoKTtcclxuICAgIGNvbnN0IGFic29yYmVkVm9sdW1lID0gTWF0aC5taW4oYWJjbFBsYXllci5zdGF0cy5Cb3dlbFZhbHVlLCBNYXRoLm1heCgwLCBkaWFwZXJTaXplIC0gYWJjbFBsYXllci5zdGF0cy5Tb2lsaW5lc3NWYWx1ZSkpO1xyXG4gICAgU2VuZEFjdGlvbihcIiVOQU1FJSBzb2lscyAlSU5URU5TSVZFJSBkaWFwZXIuXCIsIHVuZGVmaW5lZCwgXCJzb2lsRGlhcGVyXCIpO1xyXG4gICAgYWJjbFBsYXllci5zdGF0cy5Cb3dlbFZhbHVlIC09IGFic29yYmVkVm9sdW1lO1xyXG4gICAgYWJjbFBsYXllci5zdGF0cy5Tb2lsaW5lc3NWYWx1ZSArPSBhYnNvcmJlZFZvbHVtZTtcclxuXHJcbiAgICBpZiAoYWJjbFBsYXllci5zdGF0cy5Tb2lsaW5lc3NWYWx1ZSA+IDApIHtcclxuICAgICAgYWJjbFBsYXllci5zb2lsQ2xvdGhpbmcoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGF0dGVtcHRXZXR0aW5nOiAoKSA9PiB7XHJcbiAgICBjb25zdCBsaW1pdCA9IGluY29udGluZW5jZUxpbWl0Rm9ybXVsYShhYmNsUGxheWVyLnN0YXRzLkluY29udGluZW5jZSk7XHJcbiAgICBjb25zdCBjaGFuY2UgPSBpbmNvbnRpbmVuY2VDaGFuY2VGb3JtdWxhKGFiY2xQbGF5ZXIuc3RhdHMuSW5jb250aW5lbmNlLCBhYmNsUGxheWVyLnN0YXRzLkJsYWRkZXJGdWxsbmVzcyk7XHJcblxyXG4gICAgaWYgKCEoTWF0aC5yYW5kb20oKSA8IGNoYW5jZSB8fCBhYmNsUGxheWVyLnN0YXRzLkJsYWRkZXJGdWxsbmVzcyA+IGxpbWl0KSkgcmV0dXJuO1xyXG5cclxuICAgIGlmICghaW5jb250aW5lbmNlQ2hlY2suY2hlY2soKSkgcmV0dXJuO1xyXG5cclxuICAgIE1pbmlHYW1lU3RhcnQoXCJXZXRNaW5pZ2FtZVwiLCAzMCAqIGNoYW5jZSwgXCJub09wXCIpO1xyXG4gIH0sXHJcbiAgYXR0ZW1wdFNvaWxpbmc6ICgpID0+IHtcclxuICAgIGNvbnN0IGxpbWl0ID0gaW5jb250aW5lbmNlTGltaXRGb3JtdWxhKGFiY2xQbGF5ZXIuc3RhdHMuSW5jb250aW5lbmNlKTtcclxuICAgIGNvbnN0IGNoYW5jZSA9IGluY29udGluZW5jZUNoYW5jZUZvcm11bGEoYWJjbFBsYXllci5zdGF0cy5JbmNvbnRpbmVuY2UsIGFiY2xQbGF5ZXIuc3RhdHMuQm93ZWxGdWxsbmVzcyk7XHJcblxyXG4gICAgaWYgKCEoTWF0aC5yYW5kb20oKSA8IGNoYW5jZSB8fCBhYmNsUGxheWVyLnN0YXRzLkJvd2VsRnVsbG5lc3MgPiBsaW1pdCkpIHJldHVybjtcclxuXHJcbiAgICBpZiAoIWluY29udGluZW5jZUNoZWNrLmNoZWNrKCkpIHJldHVybjtcclxuXHJcbiAgICBNaW5pR2FtZVN0YXJ0KFwiTWVzc01pbmlnYW1lXCIsIDMwICogY2hhbmNlLCBcIm5vT3BcIik7XHJcbiAgfSxcclxuICB3ZXQ6IChpbnRlbnRpb25hbDogYm9vbGVhbiA9IGZhbHNlKSA9PiB7XHJcbiAgICBjb25zdCBpc1Rvb0Vhcmx5ID0gYWJjbFBsYXllci5zdGF0cy5CbGFkZGVyRnVsbG5lc3MgPCAwLjM7XHJcbiAgICBjb25zdCBpc1Bvc3NpYmxlID0gIWlzVG9vRWFybHk7XHJcbiAgICBjb25zdCBpc0dvb2QgPSBhYmNsUGxheWVyLnN0YXRzLkJsYWRkZXJGdWxsbmVzcyA+IDAuNjtcclxuICAgIGlmIChpc1Rvb0Vhcmx5KSB7XHJcbiAgICAgIHNlbmRDaGF0TG9jYWwoXCJZb3UgdHJ5IHRvIHBlZSwgYnV0IGl0IGRvZXNuJ3Qgc2VlbSB0byBiZSB3b3JraW5nLlwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzUG9zc2libGUpIHtcclxuICAgICAgaGFzRGlhcGVyKCkgPyBhYmNsUGxheWVyLndldERpYXBlcigpIDogYWJjbFBsYXllci53ZXRDbG90aGluZygpO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzR29vZCAmJiBpbnRlbnRpb25hbCkge1xyXG4gICAgICBhYmNsUGxheWVyLnN0YXRzLkluY29udGluZW5jZSAtPSAwLjAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWJjbFBsYXllci5zdGF0cy5JbmNvbnRpbmVuY2UgKz0gMC4wMjtcclxuICAgIH1cclxuICB9LFxyXG4gIHNvaWw6IChpbnRlbnRpb25hbDogYm9vbGVhbiA9IGZhbHNlKSA9PiB7XHJcbiAgICBjb25zdCBpc1Rvb0Vhcmx5ID0gYWJjbFBsYXllci5zdGF0cy5Cb3dlbEZ1bGxuZXNzIDwgMC4zO1xyXG4gICAgY29uc3QgaXNQb3NzaWJsZSA9ICFpc1Rvb0Vhcmx5O1xyXG4gICAgY29uc3QgaXNHb29kID0gYWJjbFBsYXllci5zdGF0cy5Cb3dlbEZ1bGxuZXNzID4gMC42O1xyXG4gICAgaWYgKGlzVG9vRWFybHkpIHtcclxuICAgICAgc2VuZENoYXRMb2NhbChcIllvdSB0cnkgdG8gbGV0IGdvLCBidXQgbm90aGluZyBzZWVtcyB0byBoYXBwZW4uXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoaXNQb3NzaWJsZSkge1xyXG4gICAgICBoYXNEaWFwZXIoKSA/IGFiY2xQbGF5ZXIuc29pbERpYXBlcigpIDogYWJjbFBsYXllci5zb2lsQ2xvdGhpbmcoKTtcclxuICAgIH1cclxuICAgIGlmIChpc0dvb2QgJiYgaW50ZW50aW9uYWwpIHtcclxuICAgICAgYWJjbFBsYXllci5zdGF0cy5JbmNvbnRpbmVuY2UgLT0gMC4wMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFiY2xQbGF5ZXIuc3RhdHMuSW5jb250aW5lbmNlICs9IDAuMDI7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzdGF0czoge1xyXG4gICAgc2V0IFB1ZGRsZVNpemUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDA7XHJcbiAgICAgIGlmICh2YWx1ZSA+IDI1MCkgdmFsdWUgPSAyNTA7XHJcbiAgICAgIFBsYXllclttb2RJZGVudGlmaWVyXS5TdGF0cy5QdWRkbGVTaXplLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9LFxyXG4gICAgZ2V0IFB1ZGRsZVNpemUoKSB7XHJcbiAgICAgIHJldHVybiBQbGF5ZXJbbW9kSWRlbnRpZmllcl0uU3RhdHMuUHVkZGxlU2l6ZS52YWx1ZTtcclxuICAgIH0sXHJcbiAgICBzZXQgTWVudGFsUmVncmVzc2lvbih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMDtcclxuICAgICAgaWYgKHZhbHVlID4gMSkgdmFsdWUgPSAxO1xyXG4gICAgICBQbGF5ZXJbbW9kSWRlbnRpZmllcl0uU3RhdHMuTWVudGFsUmVncmVzc2lvbi52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICBhYmNsU3RhdHNXaW5kb3cudXBkYXRlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IE1lbnRhbFJlZ3Jlc3Npb24oKSB7XHJcbiAgICAgIHJldHVybiBQbGF5ZXJbbW9kSWRlbnRpZmllcl0uU3RhdHMuTWVudGFsUmVncmVzc2lvbi52YWx1ZTtcclxuICAgIH0sXHJcbiAgICBzZXQgSW5jb250aW5lbmNlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAwO1xyXG4gICAgICBpZiAodmFsdWUgPiAxKSB2YWx1ZSA9IDE7XHJcbiAgICAgIFBsYXllclttb2RJZGVudGlmaWVyXS5TdGF0cy5JbmNvbnRpbmVuY2UudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgYWJjbFN0YXRzV2luZG93LnVwZGF0ZSgpO1xyXG4gICAgfSxcclxuICAgIGdldCBJbmNvbnRpbmVuY2UoKSB7XHJcbiAgICAgIHJldHVybiBQbGF5ZXJbbW9kSWRlbnRpZmllcl0uU3RhdHMuSW5jb250aW5lbmNlLnZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpbnRha2VcclxuICAgIHNldCBXYXRlckludGFrZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMDtcclxuICAgICAgUGxheWVyW21vZElkZW50aWZpZXJdLlN0YXRzLldhdGVySW50YWtlLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9LFxyXG4gICAgZ2V0IFdhdGVySW50YWtlKCkge1xyXG4gICAgICByZXR1cm4gUGxheWVyW21vZElkZW50aWZpZXJdLlN0YXRzLldhdGVySW50YWtlLnZhbHVlO1xyXG4gICAgfSxcclxuICAgIHNldCBGb29kSW50YWtlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAwO1xyXG4gICAgICBQbGF5ZXJbbW9kSWRlbnRpZmllcl0uU3RhdHMuRm9vZEludGFrZS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfSxcclxuICAgIGdldCBGb29kSW50YWtlKCkge1xyXG4gICAgICByZXR1cm4gUGxheWVyW21vZElkZW50aWZpZXJdLlN0YXRzLkZvb2RJbnRha2UudmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGJsYWRkZXJcclxuXHJcbiAgICBzZXQgQmxhZGRlclZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAwO1xyXG4gICAgICBQbGF5ZXJbbW9kSWRlbnRpZmllcl0uU3RhdHMuQmxhZGRlci52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICBhYmNsU3RhdHNXaW5kb3cudXBkYXRlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IEJsYWRkZXJWYWx1ZSgpIHtcclxuICAgICAgcmV0dXJuIFBsYXllclttb2RJZGVudGlmaWVyXS5TdGF0cy5CbGFkZGVyLnZhbHVlO1xyXG4gICAgfSxcclxuICAgIHNldCBCbGFkZGVyU2l6ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMDtcclxuICAgICAgUGxheWVyW21vZElkZW50aWZpZXJdLlN0YXRzLkJsYWRkZXIuc2l6ZSA9IHZhbHVlO1xyXG4gICAgICBhYmNsU3RhdHNXaW5kb3cudXBkYXRlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IEJsYWRkZXJTaXplKCk6IG51bWJlciB7XHJcbiAgICAgIHJldHVybiBQbGF5ZXJbbW9kSWRlbnRpZmllcl0uU3RhdHMuQmxhZGRlci5zaXplO1xyXG4gICAgfSxcclxuICAgIHNldCBXZXRuZXNzVmFsdWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDA7XHJcbiAgICAgIFBsYXllclttb2RJZGVudGlmaWVyXS5TdGF0cy5XZXRuZXNzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgIHVwZGF0ZURpYXBlckNvbG9yKCk7XHJcbiAgICAgIGFiY2xTdGF0c1dpbmRvdy51cGRhdGUoKTtcclxuICAgIH0sXHJcbiAgICBnZXQgV2V0bmVzc1ZhbHVlKCkge1xyXG4gICAgICByZXR1cm4gUGxheWVyW21vZElkZW50aWZpZXJdLlN0YXRzLldldG5lc3MudmFsdWU7XHJcbiAgICB9LFxyXG4gICAgLy8gY29tcHV0ZWRcclxuICAgIHNldCBCbGFkZGVyRnVsbG5lc3ModmFsdWU6IG51bWJlcikge1xyXG4gICAgICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDA7XHJcbiAgICAgIHRoaXMuQmxhZGRlclZhbHVlID0gdmFsdWUgKiB0aGlzLkJsYWRkZXJTaXplO1xyXG4gICAgICBhYmNsU3RhdHNXaW5kb3cudXBkYXRlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IEJsYWRkZXJGdWxsbmVzcygpOiBudW1iZXIge1xyXG4gICAgICByZXR1cm4gdGhpcy5CbGFkZGVyVmFsdWUgLyB0aGlzLkJsYWRkZXJTaXplO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBib3dlbFxyXG4gICAgc2V0IEJvd2VsVmFsdWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDA7XHJcbiAgICAgIFBsYXllclttb2RJZGVudGlmaWVyXS5TdGF0cy5Cb3dlbC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICBhYmNsU3RhdHNXaW5kb3cudXBkYXRlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IEJvd2VsVmFsdWUoKSB7XHJcbiAgICAgIHJldHVybiBQbGF5ZXJbbW9kSWRlbnRpZmllcl0uU3RhdHMuQm93ZWwudmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldCBCb3dlbFNpemUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDA7XHJcbiAgICAgIFBsYXllclttb2RJZGVudGlmaWVyXS5TdGF0cy5Cb3dlbC5zaXplID0gdmFsdWU7XHJcbiAgICAgIGFiY2xTdGF0c1dpbmRvdy51cGRhdGUoKTtcclxuICAgIH0sXHJcbiAgICBnZXQgQm93ZWxTaXplKCk6IG51bWJlciB7XHJcbiAgICAgIHJldHVybiBQbGF5ZXJbbW9kSWRlbnRpZmllcl0uU3RhdHMuQm93ZWwuc2l6ZTtcclxuICAgIH0sXHJcbiAgICBzZXQgU29pbGluZXNzVmFsdWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDA7XHJcbiAgICAgIFBsYXllclttb2RJZGVudGlmaWVyXS5TdGF0cy5Tb2lsaW5lc3MudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgdXBkYXRlRGlhcGVyQ29sb3IoKTtcclxuICAgICAgYWJjbFN0YXRzV2luZG93LnVwZGF0ZSgpO1xyXG4gICAgfSxcclxuICAgIGdldCBTb2lsaW5lc3NWYWx1ZSgpIHtcclxuICAgICAgcmV0dXJuIFBsYXllclttb2RJZGVudGlmaWVyXS5TdGF0cy5Tb2lsaW5lc3MudmFsdWU7XHJcbiAgICB9LFxyXG4gICAgLy8gY29tcHV0ZWRcclxuICAgIHNldCBCb3dlbEZ1bGxuZXNzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAwO1xyXG4gICAgICB0aGlzLkJvd2VsVmFsdWUgPSB2YWx1ZSAqIHRoaXMuQm93ZWxTaXplO1xyXG4gICAgICBhYmNsU3RhdHNXaW5kb3cudXBkYXRlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0IEJvd2VsRnVsbG5lc3MoKTogbnVtYmVyIHtcclxuICAgICAgcmV0dXJuIHRoaXMuQm93ZWxWYWx1ZSAvIHRoaXMuQm93ZWxTaXplO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXQgU29pbGluZXNzUGVyY2VudGFnZSgpOiBudW1iZXIge1xyXG4gICAgICBpZiAoZ2V0UGxheWVyRGlhcGVyU2l6ZSgpID09IDApIHJldHVybiAwO1xyXG4gICAgICByZXR1cm4gdGhpcy5Tb2lsaW5lc3NWYWx1ZSAvIGdldFBsYXllckRpYXBlclNpemUoKTtcclxuICAgIH0sXHJcbiAgICBzZXQgU29pbGluZXNzUGVyY2VudGFnZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMDtcclxuICAgICAgdGhpcy5Tb2lsaW5lc3NWYWx1ZSA9IHZhbHVlICogZ2V0UGxheWVyRGlhcGVyU2l6ZSgpO1xyXG4gICAgfSxcclxuICAgIGdldCBXZXRuZXNzUGVyY2VudGFnZSgpOiBudW1iZXIge1xyXG4gICAgICBpZiAoZ2V0UGxheWVyRGlhcGVyU2l6ZSgpID09IDApIHJldHVybiAwO1xyXG4gICAgICByZXR1cm4gdGhpcy5XZXRuZXNzVmFsdWUgLyBnZXRQbGF5ZXJEaWFwZXJTaXplKCk7XHJcbiAgICB9LFxyXG4gICAgc2V0IFdldG5lc3NQZXJjZW50YWdlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAwO1xyXG4gICAgICB0aGlzLldldG5lc3NWYWx1ZSA9IHZhbHVlICogZ2V0UGxheWVyRGlhcGVyU2l6ZSgpO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIHNldHRpbmdzOiB7XHJcbiAgICBwdWJsaWNNZXNzYWdlczoge1xyXG4gICAgICBjaGFuZ2VEaWFwZXI6IHRydWUsXHJcbiAgICAgIGNoZWNrRGlhcGVyOiB0cnVlLFxyXG4gICAgICBsaWNrUHVkZGxlOiB0cnVlLFxyXG4gICAgICB0b1BlZTogdHJ1ZSxcclxuICAgICAgdG9Qb29wOiB0cnVlLFxyXG4gICAgICB1c2VQb3R0eTogdHJ1ZSxcclxuICAgICAgdXNlVG9pbGV0OiB0cnVlLFxyXG4gICAgICB3aXBlUHVkZGxlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHNldFB1YmxpY01lc3NhZ2Uoa2V5OiBrZXlvZiBNb2RTZXR0aW5nc1tcInZpc2libGVNZXNzYWdlc1wiXSwgdmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgUGxheWVyW21vZElkZW50aWZpZXJdLlNldHRpbmdzLnZpc2libGVNZXNzYWdlc1trZXldID0gdmFsdWU7XHJcbiAgICB9LFxyXG4gICAgZ2V0UHVibGljTWVzc2FnZShrZXk6IGtleW9mIE1vZFNldHRpbmdzW1widmlzaWJsZU1lc3NhZ2VzXCJdKTogYm9vbGVhbiB7XHJcbiAgICAgIHJldHVybiBQbGF5ZXJbbW9kSWRlbnRpZmllcl0uU2V0dGluZ3MudmlzaWJsZU1lc3NhZ2VzW2tleV07XHJcbiAgICB9LFxyXG4gICAgc2V0IFBlZU1ldGFib2xpc20odmFsdWU6IE1ldGFib2xpc21TZXR0aW5nKSB7XHJcbiAgICAgIFBsYXllclttb2RJZGVudGlmaWVyXS5TZXR0aW5ncy5QZWVNZXRhYm9saXNtID0gdmFsdWU7XHJcbiAgICB9LFxyXG4gICAgc2V0IFBvb3BNZXRhYm9saXNtKHZhbHVlOiBNZXRhYm9saXNtU2V0dGluZykge1xyXG4gICAgICBQbGF5ZXJbbW9kSWRlbnRpZmllcl0uU2V0dGluZ3MuUG9vcE1ldGFib2xpc20gPSB2YWx1ZTtcclxuICAgIH0sXHJcbiAgICBnZXQgUGVlTWV0YWJvbGlzbSgpOiBNZXRhYm9saXNtU2V0dGluZyB7XHJcbiAgICAgIHJldHVybiBQbGF5ZXJbbW9kSWRlbnRpZmllcl0uU2V0dGluZ3MuUGVlTWV0YWJvbGlzbTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0IFBvb3BNZXRhYm9saXNtKCk6IE1ldGFib2xpc21TZXR0aW5nIHtcclxuICAgICAgcmV0dXJuIFBsYXllclttb2RJZGVudGlmaWVyXS5TZXR0aW5ncy5Qb29wTWV0YWJvbGlzbTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0IE9uRGlhcGVyQ2hhbmdlKCk6IERpYXBlckNoYW5nZVByb21wdFNldHRpbmcge1xyXG4gICAgICByZXR1cm4gUGxheWVyW21vZElkZW50aWZpZXJdLlNldHRpbmdzLk9uRGlhcGVyQ2hhbmdlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQgT25EaWFwZXJDaGFuZ2UodmFsdWU6IERpYXBlckNoYW5nZVByb21wdFNldHRpbmcpIHtcclxuICAgICAgUGxheWVyW21vZElkZW50aWZpZXJdLlNldHRpbmdzLk9uRGlhcGVyQ2hhbmdlID0gdmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldCBPcGVuUmVtb3RlU2V0dGluZ3ModmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgUGxheWVyW21vZElkZW50aWZpZXJdLlNldHRpbmdzLk9wZW5SZW1vdGVTZXR0aW5ncyA9IHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXQgT3BlblJlbW90ZVNldHRpbmdzKCk6IGJvb2xlYW4ge1xyXG4gICAgICByZXR1cm4gUGxheWVyW21vZElkZW50aWZpZXJdLlNldHRpbmdzLk9wZW5SZW1vdGVTZXR0aW5ncztcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuXHJcbmNvbnN0IHBsYXllclNhdmVyID0gbmV3IFNhdmVyKDIgKiA2MCAqIDEwMDApO1xyXG5cclxuY29uc3QgaW5jb250aW5lbmNlQ2hlY2sgPSBuZXcgRGVib3VuY2VyKDIgKiA2MCAqIDEwMDApO1xyXG5cclxuKHdpbmRvdyBhcyBhbnkpLmFiY2xQbGF5ZXIgPSBhYmNsUGxheWVyO1xyXG4iLCJpbXBvcnQgeyBBQkNMZGF0YSB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgYWJjbFBsYXllciwgdXBkYXRlUGxheWVyQ2xvdGhlcyB9IGZyb20gXCIuL3BsYXllclwiO1xyXG5pbXBvcnQgeyBTZW5kQWN0aW9uIH0gZnJvbSBcIi4vcGxheWVyVXRpbHNcIjtcclxuXHJcbi8vIElzL0hhc1xyXG5leHBvcnQgY29uc3QgaXNMZWFraW5nID0gKHR5cGU6IFwicGVlXCIgfCBcInBvb3BcIiB8IFwiYW55XCIgPSBcImFueVwiKSA9PiB7XHJcbiAgY29uc3QgZGlhcGVyU2l6ZSA9IGdldFBsYXllckRpYXBlclNpemUoKTtcclxuICBpZiAodHlwZSA9PT0gXCJwZWVcIikge1xyXG4gICAgcmV0dXJuIGFiY2xQbGF5ZXIuc3RhdHMuUHVkZGxlU2l6ZSA+IDA7XHJcbiAgfVxyXG4gIGlmICh0eXBlID09PSBcInBvb3BcIikge1xyXG4gICAgcmV0dXJuIGFiY2xQbGF5ZXIuc3RhdHMuU29pbGluZXNzVmFsdWUgPj0gZGlhcGVyU2l6ZTtcclxuICB9XHJcbiAgcmV0dXJuIGFiY2xQbGF5ZXIuc3RhdHMuU29pbGluZXNzVmFsdWUgPj0gZGlhcGVyU2l6ZSB8fCBhYmNsUGxheWVyLnN0YXRzLldldG5lc3NWYWx1ZSA+PSBkaWFwZXJTaXplO1xyXG59O1xyXG5leHBvcnQgY29uc3QgaXNEaWFwZXJEaXJ0eSA9ICgpID0+IHtcclxuICBjb25zdCBkaWFwZXJTaXplID0gZ2V0UGxheWVyRGlhcGVyU2l6ZSgpO1xyXG4gIHJldHVybiBhYmNsUGxheWVyLnN0YXRzLlNvaWxpbmVzc1ZhbHVlICsgYWJjbFBsYXllci5zdGF0cy5XZXRuZXNzVmFsdWUgPj0gZGlhcGVyU2l6ZSAvIDI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc0RpYXBlciA9IChpdGVtOiBJdGVtKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIGl0ZW0uQXNzZXQuRGVzY3JpcHRpb24udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImRpYXBlclwiKSAmJiBpdGVtLkFzc2V0LkRlc2NyaXB0aW9uIGluIEFCQ0xkYXRhLkRpYXBlcnM7XHJcbn07XHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNEaWFwZXIocGxheWVyOiBDaGFyYWN0ZXIgPSBQbGF5ZXIpOiBib29sZWFuIHtcclxuICBpZiAoIXBsYXllcikgcmV0dXJuIGZhbHNlO1xyXG4gIGNvbnN0IHBlbHZpc0l0ZW0gPSBJbnZlbnRvcnlHZXQocGxheWVyLCBcIkl0ZW1QZWx2aXNcIik7XHJcbiAgY29uc3QgcGFudGllcyA9IEludmVudG9yeUdldChwbGF5ZXIsIFwiUGFudGllc1wiKTtcclxuICByZXR1cm4gQm9vbGVhbigocGVsdmlzSXRlbSAmJiBpc0RpYXBlcihwZWx2aXNJdGVtKSkgfHwgKHBhbnRpZXMgJiYgaXNEaWFwZXIocGFudGllcykpKTtcclxufVxyXG5leHBvcnQgY29uc3QgaXNXZWFyaW5nQmFieUNsb3RoZXMgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIFBsYXllci5BcHBlYXJhbmNlLnNvbWUoKGNsb3RoaW5nKSA9PiB7XHJcbiAgICByZXR1cm4gQUJDTGRhdGEuSXRlbURlZmluaXRpb25zLkJhYnlJdGVtcy5pbmNsdWRlcyhjbG90aGluZy5Bc3NldC5EZXNjcmlwdGlvbik7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBDb2xvclxyXG5leHBvcnQgZnVuY3Rpb24gYXZlcmFnZUNvbG9yKGNvbG9yXzE6IEhleENvbG9yLCBjb2xvcl8yOiBIZXhDb2xvciwgcmF0aW86IG51bWJlciA9IDAuNSk6IEhleENvbG9yIHtcclxuICBsZXQgcmdiXzEgPSBEcmF3SGV4VG9SR0IoY29sb3JfMSk7XHJcbiAgbGV0IHJnYl8yID0gRHJhd0hleFRvUkdCKGNvbG9yXzIpO1xyXG4gIGxldCBhdmdSZ2I6IFJHQkNvbG9yID0ge1xyXG4gICAgcjogTWF0aC5yb3VuZChyZ2JfMS5yICogcmF0aW8gKyByZ2JfMi5yICogKDEgLSByYXRpbykpLFxyXG4gICAgZzogTWF0aC5yb3VuZChyZ2JfMS5nICogcmF0aW8gKyByZ2JfMi5nICogKDEgLSByYXRpbykpLFxyXG4gICAgYjogTWF0aC5yb3VuZChyZ2JfMS5iICogcmF0aW8gKyByZ2JfMi5iICogKDEgLSByYXRpbykpLFxyXG4gIH07XHJcbiAgcmV0dXJuIERyYXdSR0JUb0hleChbYXZnUmdiLnIsIGF2Z1JnYi5nLCBhdmdSZ2IuYl0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtaXhMZXZlbHMobGV2ZWw6IG51bWJlciwgaGlnaExldmVsOiBzdHJpbmcsIG1pZExldmVsOiBzdHJpbmcsIGxvd0xldmVsOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGlmIChsZXZlbCA+IDAuNzUpIHtcclxuICAgIHJldHVybiBsZXZlbCA+IDAuOSA/IGhpZ2hMZXZlbCA6IGF2ZXJhZ2VDb2xvcihoaWdoTGV2ZWwsIG1pZExldmVsLCBsZXZlbCAtIDAuNzUpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gYXZlcmFnZUNvbG9yKG1pZExldmVsLCBsb3dMZXZlbCwgbGV2ZWwpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNldERpYXBlckNvbG9yID0gKHNsb3Q6IEFzc2V0R3JvdXBOYW1lLCBwcmltYXJ5Q29sb3I6IHN0cmluZywgc2Vjb25kYXJ5Q29sb3I6IHN0cmluZywgcGxheWVyOiBDaGFyYWN0ZXIgPSBQbGF5ZXIpID0+IHtcclxuICBjb25zdCBpdGVtID0gSW52ZW50b3J5R2V0KHBsYXllciwgc2xvdCk7XHJcbiAgaWYgKGl0ZW0gJiYgaXNEaWFwZXIoaXRlbSkpIHtcclxuICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgaXRlbS5Bc3NldC5EZWZhdWx0Q29sb3I7XHJcbiAgICBjb25zdCBkaWFwZXIgPSBBQkNMZGF0YS5EaWFwZXJzW2l0ZW0uQXNzZXQuRGVzY3JpcHRpb24gYXMga2V5b2YgdHlwZW9mIEFCQ0xkYXRhLkRpYXBlcnNdO1xyXG5cclxuICAgIGlmICh0eXBlICE9PSB0eXBlb2YgaXRlbS5Db2xvcikge1xyXG4gICAgICBpdGVtLkNvbG9yID0gaXRlbS5Bc3NldC5EZWZhdWx0Q29sb3IgYXMgSXRlbUNvbG9yO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIgJiYgSlNPTi5zdHJpbmdpZnkoaXRlbS5Db2xvcikuaW5jbHVkZXMoJ1wiRGVmYXVsdFwiJykpIHtcclxuICAgICAgaXRlbS5Db2xvciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaXRlbS5Db2xvcikucmVwbGFjZUFsbCgvXCJEZWZhdWx0XCIvZywgJ1wiI0ZGRkZGRlwiJykpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29sb3I6IHN0cmluZ1tdID0gKGl0ZW0uQ29sb3IgPz8gaXRlbS5Bc3NldC5EZWZhdWx0Q29sb3IpIGFzIHN0cmluZ1tdO1xyXG4gICAgaWYgKFwicHJpbWFyeUNvbG9yXCIgaW4gZGlhcGVyKSB7XHJcbiAgICAgIGNvbG9yW2RpYXBlci5wcmltYXJ5Q29sb3JdID0gcHJpbWFyeUNvbG9yO1xyXG4gICAgfVxyXG4gICAgaWYgKFwic2Vjb25kYXJ5Q29sb3JcIiBpbiBkaWFwZXIpIHtcclxuICAgICAgY29sb3JbZGlhcGVyLnNlY29uZGFyeUNvbG9yXSA9IHNlY29uZGFyeUNvbG9yO1xyXG4gICAgfVxyXG4gICAgaXRlbS5Db2xvciA9IGNvbG9yO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IHVwZGF0ZURpYXBlckNvbG9yID0gKCkgPT4ge1xyXG4gIGNvbnN0IG1lc3NMZXZlbCA9IGFiY2xQbGF5ZXIuc3RhdHMuU29pbGluZXNzVmFsdWUgLyBnZXRQbGF5ZXJEaWFwZXJTaXplKCk7XHJcbiAgY29uc3Qgd2V0TGV2ZWwgPSBhYmNsUGxheWVyLnN0YXRzLldldG5lc3NWYWx1ZSAvIGdldFBsYXllckRpYXBlclNpemUoKTtcclxuXHJcbiAgY29uc3QgbWVzc0NvbG9yID0gbWl4TGV2ZWxzKG1lc3NMZXZlbCwgQUJDTGRhdGEuRGlhcGVyQ29sb3JzW1wibWF4aW11bW1lc3NcIl0sIEFCQ0xkYXRhLkRpYXBlckNvbG9yc1tcIm1pZGRsZW1lc3NcIl0sIEFCQ0xkYXRhLkRpYXBlckNvbG9yc1tcImNsZWFuXCJdKTtcclxuICBjb25zdCB3ZXRDb2xvciA9IG1peExldmVscyh3ZXRMZXZlbCwgQUJDTGRhdGEuRGlhcGVyQ29sb3JzW1wibWF4aW11bXdldFwiXSwgQUJDTGRhdGEuRGlhcGVyQ29sb3JzW1wibWlkZGxld2V0XCJdLCBBQkNMZGF0YS5EaWFwZXJDb2xvcnNbXCJjbGVhblwiXSk7XHJcblxyXG4gIGNvbnN0IHByaW1hcnlDb2xvciA9IGF2ZXJhZ2VDb2xvcihtZXNzQ29sb3IsIHdldENvbG9yLCAwLjcpO1xyXG4gIGNvbnN0IHNlY29uZGFyeUNvbG9yID0gYXZlcmFnZUNvbG9yKG1lc3NDb2xvciwgd2V0Q29sb3IsIDAuOSk7XHJcblxyXG4gIHNldERpYXBlckNvbG9yKFwiSXRlbVBlbHZpc1wiLCBwcmltYXJ5Q29sb3IsIHNlY29uZGFyeUNvbG9yLCBQbGF5ZXIpO1xyXG4gIHNldERpYXBlckNvbG9yKFwiUGFudGllc1wiLCBwcmltYXJ5Q29sb3IsIHNlY29uZGFyeUNvbG9yLCBQbGF5ZXIpO1xyXG4gIHVwZGF0ZVBsYXllckNsb3RoZXMoKTtcclxufTtcclxuXHJcbi8vIFNpemVcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBsYXllckRpYXBlclNpemUocGxheWVyOiBDaGFyYWN0ZXIgPSBQbGF5ZXIpOiBudW1iZXIge1xyXG4gIGNvbnN0IHBlbHZpc0l0ZW0gPSBJbnZlbnRvcnlHZXQocGxheWVyLCBcIkl0ZW1QZWx2aXNcIik7XHJcbiAgY29uc3QgcGFudGllcyA9IEludmVudG9yeUdldChwbGF5ZXIsIFwiUGFudGllc1wiKTtcclxuICBsZXQgc2l6ZSA9IDA7XHJcbiAgaWYgKHBlbHZpc0l0ZW0gJiYgaXNEaWFwZXIocGVsdmlzSXRlbSkpIHtcclxuICAgIHNpemUgKz0gZ2V0RGlhcGVyU2l6ZShwZWx2aXNJdGVtKTtcclxuICB9XHJcbiAgaWYgKHBhbnRpZXMgJiYgaXNEaWFwZXIocGFudGllcykpIHtcclxuICAgIHNpemUgKz0gZ2V0RGlhcGVyU2l6ZShwYW50aWVzKTtcclxuICB9XHJcbiAgcmV0dXJuIHNpemU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERpYXBlclNpemUoZGlhcGVyOiBJdGVtKTogbnVtYmVyIHtcclxuICBpZiAoZGlhcGVyLkFzc2V0LkRlc2NyaXB0aW9uID09PSBcIlBvb2Z5IENoYXN0aXR5IERpYXBlclwiICYmIGRpYXBlci5Qcm9wZXJ0eT8uVHlwZVJlY29yZD8udHlwZWQgPT09IDEpIHtcclxuICAgIHJldHVybiBBQkNMZGF0YS5EaWFwZXJTaXplU2NhbGUuaGVhdnlfYWR1bHQ7XHJcbiAgfVxyXG4gIHJldHVybiBBQkNMZGF0YS5EaWFwZXJTaXplU2NhbGVbQUJDTGRhdGEuRGlhcGVyc1tkaWFwZXIuQXNzZXQuRGVzY3JpcHRpb24gYXMga2V5b2YgdHlwZW9mIEFCQ0xkYXRhLkRpYXBlcnNdLnNpemUgYXMga2V5b2YgdHlwZW9mIEFCQ0xkYXRhLkRpYXBlclNpemVTY2FsZV07XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQbGF5ZXJEaWFwZXIgPSAoKToge1xyXG4gIEl0ZW1QZWx2aXM6IEl0ZW0gfCBudWxsO1xyXG4gIFBhbnRpZXM6IEl0ZW0gfCBudWxsO1xyXG59ID0+IHtcclxuICBjb25zdCBwZWx2aXNJdGVtID0gSW52ZW50b3J5R2V0KFBsYXllciwgXCJJdGVtUGVsdmlzXCIpO1xyXG4gIGNvbnN0IHBhbnRpZXMgPSBJbnZlbnRvcnlHZXQoUGxheWVyLCBcIlBhbnRpZXNcIik7XHJcbiAgbGV0IGRpYXBlcnM6IHsgSXRlbVBlbHZpczogSXRlbSB8IG51bGw7IFBhbnRpZXM6IEl0ZW0gfCBudWxsIH0gPSB7XHJcbiAgICBJdGVtUGVsdmlzOiBudWxsLFxyXG4gICAgUGFudGllczogbnVsbCxcclxuICB9O1xyXG4gIGlmIChwZWx2aXNJdGVtICYmIGlzRGlhcGVyKHBlbHZpc0l0ZW0pKSB7XHJcbiAgICBkaWFwZXJzW1wiSXRlbVBlbHZpc1wiXSA9IHBlbHZpc0l0ZW07XHJcbiAgfVxyXG4gIGlmIChwYW50aWVzICYmIGlzRGlhcGVyKHBhbnRpZXMpKSB7XHJcbiAgICBkaWFwZXJzW1wiUGFudGllc1wiXSA9IHBhbnRpZXM7XHJcbiAgfVxyXG4gIHJldHVybiBkaWFwZXJzO1xyXG59O1xyXG5cclxuLy8gaW5jb250aW5lbmNlXHJcbmV4cG9ydCBjb25zdCBpbmNvbnRpbmVuY2VMaW1pdEZvcm11bGEgPSAoaW5jb250aW5lbmNlOiBudW1iZXIpID0+IHtcclxuICByZXR1cm4gMC45IC0gaW5jb250aW5lbmNlICogMC41O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluY29udGluZW5jZUNoYW5jZUZvcm11bGEoaW5jb250aW5lbmNlOiBudW1iZXIsIGZ1bGxuZXNzOiBudW1iZXIpOiBudW1iZXIge1xyXG4gIGNvbnN0IGluY29udGluZW5jZVdlaWdodCA9IDAuNjtcclxuICBjb25zdCBmdWxsbmVzc1dlaWdodCA9IDAuODtcclxuICBjb25zdCB0aHJlc2hvbGQgPSBpbmNvbnRpbmVuY2VXZWlnaHQgKiBNYXRoLnBvdyhpbmNvbnRpbmVuY2UsIDIpICsgZnVsbG5lc3NXZWlnaHQgKiBNYXRoLnBvdyhmdWxsbmVzcywgMyk7XHJcblxyXG4gIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh0aHJlc2hvbGQsIDApLCAxKTtcclxufVxyXG5cclxuLy8gbWVudGFsIHJlZ3Jlc3Npb25cclxuZXhwb3J0IGNvbnN0IG1lbnRhbFJlZ3Jlc3Npb25Cb251cyA9ICgpID0+IHtcclxuICBjb25zdCBhc3NldERlc2NyaXB0aW9ucyA9IFBsYXllci5BcHBlYXJhbmNlLm1hcCgoY2xvdGhpbmcpID0+IGNsb3RoaW5nLkFzc2V0LkRlc2NyaXB0aW9uKTtcclxuICBjb25zdCBtYXRjaGVzID0gQUJDTGRhdGEuSXRlbURlZmluaXRpb25zLkJhYnlJdGVtcy5jb25jYXQoW1wibWlsa1wiLCBcInBhY2lmaWVyXCIsIFwiYmliXCJdKS5maWx0ZXIoKGRlc2NyaXB0aW9uKSA9PlxyXG4gICAgYXNzZXREZXNjcmlwdGlvbnMuc29tZSgoYXNzZXREZXNjcmlwdGlvbikgPT4gYXNzZXREZXNjcmlwdGlvbi50b0xvY2FsZUxvd2VyQ2FzZSgpLmluY2x1ZGVzKGRlc2NyaXB0aW9uKSlcclxuICApO1xyXG4gIHJldHVybiBNYXRoLm1pbihtYXRjaGVzLmxlbmd0aCAqIDAuMjUsIDEpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgbWVudGFsUmVncmVzc2lvbk92ZXJ0aW1lID0gKCkgPT4ge1xyXG4gIC8vIGlmIHdlYXJpbmcgYmFieSBjbG90aGVzLCBtZW50YWwgcmVncmVzc2lvbiBnb2VzIHVwXHJcbiAgLy8gaWYgd2V0IGRpYXBlciwgbWVudGFsIHJlZ3Jlc3Npb24gZ29lcyB1cFxyXG4gIC8vIGlmIGxlYWtpbmcsIG1lbnRhbCByZWdyZXNzaW9uIGdvZXMgdXAgYSBsb3RcclxuICBsZXQgbW9kaWZpZXIgPSAwICsgbWVudGFsUmVncmVzc2lvbkJvbnVzKCk7XHJcbiAgaWYgKGlzV2VhcmluZ0JhYnlDbG90aGVzKCkpIG1vZGlmaWVyICs9IDE7XHJcbiAgaWYgKGlzRGlhcGVyRGlydHkoKSkgbW9kaWZpZXIgKz0gMC4yNTtcclxuICBpZiAoaXNMZWFraW5nKCkpIG1vZGlmaWVyICs9IDAuNTtcclxuICByZXR1cm4gbW9kaWZpZXIgLyAoMTUwICogNjApOyAvLyAxNTAgaG91cnMgdGlsbCAxMDAlXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5jb250aW5lbmNlT25BY2NpZGVudCgpIHtcclxuICBjb25zdCBzdGFnZXMgPSBbXHJcbiAgICB7IHRvdGFsQWNjaWRlbnRzOiA2MCwgc3RhcnQ6IDAsIGVuZDogMC4yNSB9LFxyXG4gICAgeyB0b3RhbEFjY2lkZW50czogMTIwLCBzdGFydDogMC4yNSwgZW5kOiAwLjUgfSxcclxuICAgIHsgdG90YWxBY2NpZGVudHM6IDI0MCwgc3RhcnQ6IDAuNSwgZW5kOiAwLjc1IH0sXHJcbiAgICB7IHRvdGFsQWNjaWRlbnRzOiA0ODAsIHN0YXJ0OiAwLjc1LCBlbmQ6IDEgfSxcclxuICBdO1xyXG4gIGZvciAoY29uc3QgeyB0b3RhbEFjY2lkZW50cywgc3RhcnQsIGVuZCB9IG9mIHN0YWdlcykge1xyXG4gICAgaWYgKGFiY2xQbGF5ZXIuc3RhdHMuSW5jb250aW5lbmNlID49IHN0YXJ0ICYmIGFiY2xQbGF5ZXIuc3RhdHMuSW5jb250aW5lbmNlIDwgZW5kKSB7XHJcbiAgICAgIHJldHVybiAwLjI1IC8gdG90YWxBY2NpZGVudHM7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiAwO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbWVudGFsUmVncmVzc2lvbk9uQWNjaWRlbnQgPSAoKSA9PiB7XHJcbiAgY29uc3QgbW9kaWZpZXIgPSAxICsgbWVudGFsUmVncmVzc2lvbkJvbnVzKCk7XHJcbiAgaWYgKGFiY2xQbGF5ZXIuc3RhdHMuTWVudGFsUmVncmVzc2lvbiA8IDAuMjUpIHJldHVybiBtb2RpZmllciAvIDUwMDtcclxuICBpZiAoMC4yNSA+IGFiY2xQbGF5ZXIuc3RhdHMuTWVudGFsUmVncmVzc2lvbiAmJiBhYmNsUGxheWVyLnN0YXRzLk1lbnRhbFJlZ3Jlc3Npb24gPCAwLjUgJiYgaXNEaWFwZXJEaXJ0eSgpKSByZXR1cm4gbW9kaWZpZXIgLyA1MDA7XHJcbiAgaWYgKDAuNSA+IGFiY2xQbGF5ZXIuc3RhdHMuTWVudGFsUmVncmVzc2lvbiAmJiBhYmNsUGxheWVyLnN0YXRzLk1lbnRhbFJlZ3Jlc3Npb24gPCAwLjc1ICYmIGlzTGVha2luZygpKSByZXR1cm4gbW9kaWZpZXIgLyAxMDAwO1xyXG4gIGlmICgwLjc1ID4gYWJjbFBsYXllci5zdGF0cy5NZW50YWxSZWdyZXNzaW9uICYmIGFiY2xQbGF5ZXIuc3RhdHMuTWVudGFsUmVncmVzc2lvbiA8IDEgJiYgaXNMZWFraW5nKCkpIHJldHVybiBtb2RpZmllciAvIDE1MDA7XHJcbiAgcmV0dXJuIDA7XHJcbn07XHJcbiIsImltcG9ydCB7IENvbWJpbmVkQWN0aW9uLCBEaWFwZXJTZXR0aW5nVmFsdWVzIH0gZnJvbSBcIi4uLy4uL3R5cGVzL3R5cGVzXCI7XHJcbmltcG9ydCB7IHNlbmREYXRhVG9BY3Rpb24gfSBmcm9tIFwiLi4vaG9va3NcIjtcclxuaW1wb3J0IHsgaGFzRGlhcGVyLCB1cGRhdGVEaWFwZXJDb2xvciB9IGZyb20gXCIuLi9wbGF5ZXIvZGlhcGVyXCI7XHJcbmltcG9ydCB7IGFiY2xQbGF5ZXIgfSBmcm9tIFwiLi4vcGxheWVyL3BsYXllclwiO1xyXG5pbXBvcnQgeyBnZXRDaGFyYWN0ZXIsIGdldENoYXJhY3Rlck5hbWUsIGlzQUJDTFBsYXllciwgcmVwbGFjZV90ZW1wbGF0ZSwgU2VuZEFjdGlvbiwgdGFyZ2V0SW5wdXRFeHRyYWN0b3IgfSBmcm9tIFwiLi4vcGxheWVyL3BsYXllclV0aWxzXCI7XHJcbmltcG9ydCB7IEFCQ0xZZXNOb1Byb21wdCB9IGZyb20gXCIuLi9wbGF5ZXIvdWlcIjtcclxuaW1wb3J0IHsgc2VuZENoYXRMb2NhbCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuY29uc3QgY2hhbmdlRGlhcGVyUmVxdWVzdCA9IChwbGF5ZXI6IENoYXJhY3RlcikgPT4ge1xyXG4gIGlmIChwbGF5ZXIuTWVtYmVyTnVtYmVyICE9PSBQbGF5ZXIuTWVtYmVyTnVtYmVyKSByZXR1cm4gc2VuZERhdGFUb0FjdGlvbihcImNoYW5nZURpYXBlci1wZW5kaW5nXCIsIHVuZGVmaW5lZCwgcGxheWVyLk1lbWJlck51bWJlcik7XHJcblxyXG4gIGNoYW5nZURpYXBlckZ1bmN0aW9uKHBsYXllcik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBjaGFuZ2VEaWFwZXJGdW5jdGlvbiA9IChwbGF5ZXI6IENoYXJhY3RlcikgPT4ge1xyXG4gIGNvbnN0IGlzU2VsZiA9IHBsYXllci5NZW1iZXJOdW1iZXIgPT09IFBsYXllci5NZW1iZXJOdW1iZXI7XHJcbiAgY29uc3Qgc2VsZk1lc3NhZ2UgPSBcIiVOQU1FJSBjaGFuZ2VzICVJTlRFTlNJVkUlIGRpYXBlci5cIjtcclxuICBjb25zdCBvdGhlck1lc3NhZ2UgPSBcIiVOQU1FJSBjaGFuZ2VzICVPUFBfTkFNRSUncyBkaWFwZXIuXCI7XHJcbiAgU2VuZEFjdGlvbihyZXBsYWNlX3RlbXBsYXRlKGlzU2VsZiA/IHNlbGZNZXNzYWdlIDogb3RoZXJNZXNzYWdlLCBwbGF5ZXIpLCB1bmRlZmluZWQsIFwiY2hhbmdlRGlhcGVyXCIsIHBsYXllcik7XHJcblxyXG4gIHVwZGF0ZURpYXBlckNvbG9yKCk7XHJcbiAgYWJjbFBsYXllci5zdGF0cy5XZXRuZXNzVmFsdWUgPSAwO1xyXG4gIGFiY2xQbGF5ZXIuc3RhdHMuU29pbGluZXNzVmFsdWUgPSAwO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgY2hhbmdlRGlhcGVyTGlzdGVuZXJzID0ge1xyXG4gIFwiY2hhbmdlRGlhcGVyLWFjY2VwdGVkXCI6IHVuZGVmaW5lZDtcclxuICBcImNoYW5nZURpYXBlci1yZWplY3RlZFwiOiB1bmRlZmluZWQ7XHJcbiAgXCJjaGFuZ2VEaWFwZXItcGVuZGluZ1wiOiB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY2hhbmdlRGlhcGVyOiBDb21iaW5lZEFjdGlvbiA9IHtcclxuICBhY3Rpdml0eToge1xyXG4gICAgSUQ6IFwiZGlhcGVyLWNoYW5nZVwiLFxyXG4gICAgTmFtZTogXCJDaGFuZ2UgRGlhcGVyXCIsXHJcbiAgICBJbWFnZTogYCR7cHVibGljVVJMfS9hY3Rpdml0eS9jaGFuZ2VEaWFwZXIuc3ZnYCxcclxuICAgIFRhcmdldDogW1wiSXRlbVBlbHZpc1wiXSxcclxuICAgIE9uQ2xpY2s6IChwbGF5ZXI6IENoYXJhY3RlciwgZ3JvdXA6IEFzc2V0R3JvdXBJdGVtTmFtZSkgPT4gY2hhbmdlRGlhcGVyUmVxdWVzdChwbGF5ZXIpLFxyXG4gICAgQ3JpdGVyaWE6IChwbGF5ZXI6IENoYXJhY3RlcikgPT4gaGFzRGlhcGVyKHBsYXllcikgJiYgaXNBQkNMUGxheWVyKHBsYXllciksXHJcbiAgfSxcclxuICBjb21tYW5kOiB7XHJcbiAgICBUYWc6IFwiZGlhcGVyLWNoYW5nZVwiLFxyXG4gICAgQWN0aW9uOiAoYXJncywgbXNnLCBwYXJzZWQpID0+IHtcclxuICAgICAgY29uc3QgY2hhcmFjdGVyID0gdGFyZ2V0SW5wdXRFeHRyYWN0b3IocGFyc2VkKSA/PyBQbGF5ZXI7XHJcbiAgICAgIGlmICghY2hhbmdlRGlhcGVyLmFjdGl2aXR5IS5Dcml0ZXJpYSEoY2hhcmFjdGVyKSkgcmV0dXJuIHNlbmRDaGF0TG9jYWwoXCJJcyBlaXRoZXIgbm90IGRpYXBlcmVkIG9yIG5vdCBhbiBBQkNMIHBsYXllci5cIik7XHJcblxyXG4gICAgICBjaGFuZ2VEaWFwZXJSZXF1ZXN0KGNoYXJhY3Rlcik7XHJcbiAgICB9LFxyXG4gICAgRGVzY3JpcHRpb246IGAgW01lbWJlck51bWJlcnxOYW1lfE5pY2tuYW1lXTogQ2hhbmdlcyBzb21lb25lJ3MgZGlhcGVyLmAsXHJcbiAgfSxcclxuICBsaXN0ZW5lcnM6IHtcclxuICAgIFwiY2hhbmdlRGlhcGVyLWFjY2VwdGVkXCI6ICh7IFNlbmRlciB9KSA9PiBzZW5kQ2hhdExvY2FsKGAke2dldENoYXJhY3Rlck5hbWUoU2VuZGVyKX0gYWNjZXB0ZWQgeW91ciBjaGFuZ2UgZGlhcGVyIHJlcXVlc3QuYCksXHJcbiAgICBcImNoYW5nZURpYXBlci1yZWplY3RlZFwiOiAoeyBTZW5kZXIgfSkgPT4gc2VuZENoYXRMb2NhbChgJHtnZXRDaGFyYWN0ZXJOYW1lKFNlbmRlcil9IHJlamVjdGVkIHlvdXIgY2hhbmdlIGRpYXBlciByZXF1ZXN0LmApLFxyXG4gICAgXCJjaGFuZ2VEaWFwZXItcGVuZGluZ1wiOiAoeyBTZW5kZXIgfSkgPT4ge1xyXG4gICAgICBzd2l0Y2ggKGFiY2xQbGF5ZXIuc2V0dGluZ3MuT25EaWFwZXJDaGFuZ2UpIHtcclxuICAgICAgICBjYXNlIERpYXBlclNldHRpbmdWYWx1ZXMuQXNrOlxyXG4gICAgICAgICAgbmV3IEFCQ0xZZXNOb1Byb21wdChcclxuICAgICAgICAgICAgYCR7Z2V0Q2hhcmFjdGVyTmFtZShTZW5kZXIpfSB3YW50cyB0byBjaGFuZ2UgeW91ciBkaWFwZXIuYCxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNoYW5nZURpYXBlckZ1bmN0aW9uKGdldENoYXJhY3RlcihTZW5kZXIhKSA/PyBQbGF5ZXIpO1xyXG4gICAgICAgICAgICAgIHNlbmREYXRhVG9BY3Rpb24oXCJjaGFuZ2VEaWFwZXItYWNjZXB0ZWRcIiwgdW5kZWZpbmVkLCBTZW5kZXIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoKSA9PiBzZW5kRGF0YVRvQWN0aW9uKFwiY2hhbmdlRGlhcGVyLXJlamVjdGVkXCIsIHVuZGVmaW5lZCwgU2VuZGVyKSxcclxuICAgICAgICAgICAgMTAgKiAxMDAwLFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRGlhcGVyU2V0dGluZ1ZhbHVlcy5BbGxvdzpcclxuICAgICAgICAgIGNoYW5nZURpYXBlckZ1bmN0aW9uKGdldENoYXJhY3RlcihTZW5kZXIhKSA/PyBQbGF5ZXIpO1xyXG4gICAgICAgICAgc2VuZERhdGFUb0FjdGlvbihcImNoYW5nZURpYXBlci1hY2NlcHRlZFwiLCB1bmRlZmluZWQsIFNlbmRlcik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIERpYXBlclNldHRpbmdWYWx1ZXMuRGVueTpcclxuICAgICAgICAgIHNlbmREYXRhVG9BY3Rpb24oXCJjaGFuZ2VEaWFwZXItcmVqZWN0ZWRcIiwgdW5kZWZpbmVkLCBTZW5kZXIpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuIiwiaW1wb3J0IHsgQ29tYmluZWRBY3Rpb24gfSBmcm9tIFwiLi4vLi4vdHlwZXMvdHlwZXNcIjtcclxuaW1wb3J0IHsgaGFzRGlhcGVyIH0gZnJvbSBcIi4uL3BsYXllci9kaWFwZXJcIjtcclxuaW1wb3J0IHsgaXNBQkNMUGxheWVyLCByZXBsYWNlX3RlbXBsYXRlLCBTZW5kQWN0aW9uLCB0YXJnZXRJbnB1dEV4dHJhY3RvciB9IGZyb20gXCIuLi9wbGF5ZXIvcGxheWVyVXRpbHNcIjtcclxuaW1wb3J0IHsgYWJjbFN0YXRzV2luZG93IH0gZnJvbSBcIi4uL3BsYXllci91aVwiO1xyXG5pbXBvcnQgeyBzZW5kQ2hhdExvY2FsIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG5jb25zdCBkaWFwZXJDaGVja0Z1bmN0aW9uID0gKHBsYXllcjogQ2hhcmFjdGVyKSA9PiB7XHJcbiAgY29uc3QgaXNTZWxmID0gcGxheWVyLk1lbWJlck51bWJlciA9PT0gUGxheWVyLk1lbWJlck51bWJlcjtcclxuICBjb25zdCBzZWxmRGlhcGVyTWVzc2FnZSA9IFwiJU5BTUUlIGNoZWNrcyAlSU5URU5TSVZFJSBkaWFwZXIuXCI7XHJcbiAgY29uc3Qgb3RoZXJEaWFwZXJNZXNzYWdlID0gXCIlTkFNRSUgY2hlY2tzICVPUFBfTkFNRSUncyBkaWFwZXIuXCI7XHJcbiAgY29uc3Qgc2VsZkNsb3RoZXNNZXNzYWdlID0gXCIlTkFNRSUgY2hlY2tzICVJTlRFTlNJVkUlIGNsb3RoZXMgZm9yIGFueSBhY2NpZGVudHMuXCI7XHJcbiAgY29uc3Qgb3RoZXJDbG90aGVzTWVzc2FnZSA9IFwiJU5BTUUlIGNoZWNrcyAlT1BQX05BTUUlJ3MgY2xvdGhlcyBmb3IgYW55IGFjY2lkZW50cy5cIjtcclxuXHJcbiAgYWJjbFN0YXRzV2luZG93Lm9wZW4ocGxheWVyLk1lbWJlck51bWJlcik7XHJcbiAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjc1KSByZXR1cm47XHJcblxyXG4gIGlmIChoYXNEaWFwZXIocGxheWVyKSkgcmV0dXJuIFNlbmRBY3Rpb24ocmVwbGFjZV90ZW1wbGF0ZShpc1NlbGYgPyBzZWxmRGlhcGVyTWVzc2FnZSA6IG90aGVyRGlhcGVyTWVzc2FnZSwgcGxheWVyKSwgdW5kZWZpbmVkLCBcImNoZWNrRGlhcGVyXCIsIHBsYXllcik7XHJcbiAgcmV0dXJuIFNlbmRBY3Rpb24ocmVwbGFjZV90ZW1wbGF0ZShpc1NlbGYgPyBzZWxmQ2xvdGhlc01lc3NhZ2UgOiBvdGhlckNsb3RoZXNNZXNzYWdlLCBwbGF5ZXIpLCB1bmRlZmluZWQsIFwiY2hlY2tEaWFwZXJcIiwgcGxheWVyKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjaGVja0RpYXBlcjogQ29tYmluZWRBY3Rpb24gPSB7XHJcbiAgYWN0aXZpdHk6IHtcclxuICAgIElEOiBcImNoZWNrLWRpYXBlclwiLFxyXG4gICAgTmFtZTogXCJDaGVjayBEaWFwZXJcIixcclxuICAgIEltYWdlOiBgJHtwdWJsaWNVUkx9L2FjdGl2aXR5L2RpYXBlckNoZWNrLnBuZ2AsXHJcbiAgICBPbkNsaWNrOiAocGxheWVyOiBDaGFyYWN0ZXIsIGdyb3VwOiBBc3NldEdyb3VwSXRlbU5hbWUpID0+IGRpYXBlckNoZWNrRnVuY3Rpb24ocGxheWVyKSxcclxuICAgIFRhcmdldDogW1wiSXRlbVBlbHZpc1wiXSxcclxuICAgIENyaXRlcmlhOiAocGxheWVyOiBDaGFyYWN0ZXIpID0+IGlzQUJDTFBsYXllcihwbGF5ZXIpLFxyXG4gIH0sXHJcbiAgY29tbWFuZDoge1xyXG4gICAgVGFnOiBcImNoZWNrLWRpYXBlclwiLFxyXG4gICAgRGVzY3JpcHRpb246IGAgW01lbWJlck51bWJlcnxOYW1lfE5pY2tuYW1lXTogQ2hlY2tzIHNvbWVvbmUncyBkaWFwZXIuYCxcclxuICAgIEFjdGlvbjogKGFyZ3MsIG1zZywgcGFyc2VkKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNoYXJhY3RlciA9IHRhcmdldElucHV0RXh0cmFjdG9yKHBhcnNlZCkgPz8gUGxheWVyO1xyXG4gICAgICBpZiAoIWNoZWNrRGlhcGVyLmFjdGl2aXR5IS5Dcml0ZXJpYSEoY2hhcmFjdGVyKSkgc2VuZENoYXRMb2NhbChcIklzIG5vdCBhbiBBQkNMIHBsYXllci5cIik7XHJcblxyXG4gICAgICBkaWFwZXJDaGVja0Z1bmN0aW9uKGNoYXJhY3Rlcik7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbiIsImltcG9ydCB7IENvbWJpbmVkQWN0aW9uIH0gZnJvbSBcIi4uLy4uL3R5cGVzL3R5cGVzXCI7XHJcbmltcG9ydCB7IHNlbmREYXRhVG9BY3Rpb24sIHNlbmRVcGRhdGVNeURhdGEgfSBmcm9tIFwiLi4vaG9va3NcIjtcclxuaW1wb3J0IHsgYWJjbFBsYXllciwgdXBkYXRlUGxheWVyQ2xvdGhlcyB9IGZyb20gXCIuLi9wbGF5ZXIvcGxheWVyXCI7XHJcbmltcG9ydCB7IGdldENoYXJhY3RlciwgaXNBQkNMUGxheWVyLCByZXBsYWNlX3RlbXBsYXRlLCBTZW5kQWN0aW9uLCB0YXJnZXRJbnB1dEV4dHJhY3RvciB9IGZyb20gXCIuLi9wbGF5ZXIvcGxheWVyVXRpbHNcIjtcclxuaW1wb3J0IHsgc2VuZENoYXRMb2NhbCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuY29uc3QgbGlja1B1ZGRsZVJlcXVlc3QgPSAocGxheWVyOiBDaGFyYWN0ZXIpID0+IHtcclxuICBjb25zdCBpc1NlbGYgPSBwbGF5ZXIuTWVtYmVyTnVtYmVyID09PSBQbGF5ZXIuTWVtYmVyTnVtYmVyO1xyXG4gIGlmICghaXNTZWxmKSByZXR1cm4gc2VuZERhdGFUb0FjdGlvbihcImxpY2stcHVkZGxlXCIsIHVuZGVmaW5lZCwgcGxheWVyLk1lbWJlck51bWJlcik7XHJcbiAgTGlja1B1ZGRsZUZ1bmN0aW9uKFBsYXllcik7XHJcbn07XHJcbmNvbnN0IExpY2tQdWRkbGVGdW5jdGlvbiA9IChwbGF5ZXI6IENoYXJhY3RlcikgPT4ge1xyXG4gIGNvbnN0IGlzU2VsZiA9IHBsYXllci5NZW1iZXJOdW1iZXIgPT09IFBsYXllci5NZW1iZXJOdW1iZXI7XHJcbiAgY29uc3Qgc2VsZk1lc3NhZ2UgPSBcIiVOQU1FJSBsaWNrcyAlSU5URU5TSVZFJSBwdWRkbGUgb2YgcGVlLlwiO1xyXG4gIGNvbnN0IG90aGVyTWVzc2FnZSA9IFwiJU9QUF9OQU1FJSBsaWNrcyAlTkFNRSUncyBwdWRkbGUgb2YgcGVlLlwiO1xyXG4gIFNlbmRBY3Rpb24ocmVwbGFjZV90ZW1wbGF0ZShpc1NlbGYgPyBzZWxmTWVzc2FnZSA6IG90aGVyTWVzc2FnZSwgcGxheWVyKSwgdW5kZWZpbmVkLCBcImxpY2tQdWRkbGVcIiwgcGxheWVyKTtcclxuXHJcbiAgc2VuZFVwZGF0ZU15RGF0YSgpO1xyXG4gIHVwZGF0ZVBsYXllckNsb3RoZXMoKTtcclxuICBhYmNsUGxheWVyLnN0YXRzLlB1ZGRsZVNpemUgLT0gNTA7XHJcbn07XHJcbmV4cG9ydCB0eXBlIGxpY2tQdWRkbGVMaXN0ZW5lcnMgPSB7XHJcbiAgXCJsaWNrLXB1ZGRsZVwiOiB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbGlja1B1ZGRsZTogQ29tYmluZWRBY3Rpb24gPSB7XHJcbiAgYWN0aXZpdHk6IHtcclxuICAgIElEOiBcImxpY2stcHVkZGxlXCIsXHJcbiAgICBOYW1lOiBcIkxpY2sgUHVkZGxlXCIsXHJcbiAgICBJbWFnZTogYCR7cHVibGljVVJMfS9hY3Rpdml0eS9saWNrUHVkZGxlLnBuZ2AsXHJcbiAgICBUYXJnZXQ6IFtcIkl0ZW1Cb290c1wiXSxcclxuICAgIE9uQ2xpY2s6IChwbGF5ZXI6IENoYXJhY3RlciwgZ3JvdXA6IEFzc2V0R3JvdXBJdGVtTmFtZSkgPT4gbGlja1B1ZGRsZVJlcXVlc3QocGxheWVyKSxcclxuICAgIENyaXRlcmlhOiAocGxheWVyOiBDaGFyYWN0ZXIpID0+IGlzQUJDTFBsYXllcihwbGF5ZXIpICYmIHBsYXllci5BQkNMIS5TdGF0cy5QdWRkbGVTaXplLnZhbHVlID4gMCxcclxuICB9LFxyXG4gIGNvbW1hbmQ6IHtcclxuICAgIFRhZzogXCJsaWNrLXB1ZGRsZVwiLFxyXG4gICAgQWN0aW9uOiAoYXJncywgbXNnLCBwYXJzZWQpID0+IHtcclxuICAgICAgY29uc3QgY2hhcmFjdGVyID0gdGFyZ2V0SW5wdXRFeHRyYWN0b3IocGFyc2VkKSA/PyBQbGF5ZXI7XHJcbiAgICAgIGlmICghbGlja1B1ZGRsZS5hY3Rpdml0eSEuQ3JpdGVyaWEhKGNoYXJhY3RlcikpIHJldHVybiBzZW5kQ2hhdExvY2FsKFwiSXMgZWl0aGVyIG5vdCBhbiBBQkNMIHBsYXllciBvciBoYXMgbm8gcHVkZGxlLlwiKTtcclxuICAgICAgbGlja1B1ZGRsZVJlcXVlc3QoY2hhcmFjdGVyKTtcclxuICAgIH0sXHJcbiAgICBEZXNjcmlwdGlvbjogYCBbTWVtYmVyTnVtYmVyfE5hbWV8Tmlja25hbWVdOiBMaWNrcyBhIHB1ZGRsZSBvZiBwZWUuYCxcclxuICB9LFxyXG4gIGxpc3RlbmVyczoge1xyXG4gICAgXCJsaWNrLXB1ZGRsZVwiOiAoeyBTZW5kZXIgfSkgPT4gTGlja1B1ZGRsZUZ1bmN0aW9uKGdldENoYXJhY3RlcihTZW5kZXIhKSA/PyBQbGF5ZXIpLFxyXG4gIH0sXHJcbn07XHJcbiIsImltcG9ydCB7IENvbWJpbmVkQWN0aW9uIH0gZnJvbSBcIi4uLy4uL3R5cGVzL3R5cGVzXCI7XHJcbmltcG9ydCB7IHNlbmRDaGF0TG9jYWwgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIG9uQUJDTE1lc3NhZ2VMaXN0ZW5lcnMgPSB7XHJcbiAgb25BQkNMTWVzc2FnZTogc3RyaW5nO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgb25BQkNMTWVzc2FnZTogQ29tYmluZWRBY3Rpb24gPSB7XHJcbiAgbGlzdGVuZXJzOiB7XHJcbiAgICBvbkFCQ0xNZXNzYWdlOiAoeyBTZW5kZXIgfSwgbWVzc2FnZSkgPT4ge1xyXG4gICAgICBzZW5kQ2hhdExvY2FsKG1lc3NhZ2UsIHVuZGVmaW5lZCwgXCJiYWNrZ3JvdW5kOiAjRkZBOUE5M0JcIik7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbiIsImltcG9ydCB7IENvbWJpbmVkQWN0aW9uIH0gZnJvbSBcIi4uLy4uL3R5cGVzL3R5cGVzXCI7XHJcbmltcG9ydCB7IHNlbmRVcGRhdGVNeURhdGEgfSBmcm9tIFwiLi4vaG9va3NcIjtcclxuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uL2xvZ2dlclwiO1xyXG5pbXBvcnQgeyBnZXRDaGFyYWN0ZXIgfSBmcm9tIFwiLi4vcGxheWVyL3BsYXllclV0aWxzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBzeW5jTGlzdGVuZXJzID0ge1xyXG4gIGluaXQ6IG5ldmVyO1xyXG4gIHN5bmM6IHsgc2V0dGluZ3M6IE1vZFNldHRpbmdzOyBzdGF0czogTW9kU3RhdHM7IHZlcnNpb246IHR5cGVvZiBtb2RWZXJzaW9uOyB0YXJnZXQ/OiBudW1iZXIgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzeW5jOiBDb21iaW5lZEFjdGlvbiA9IHtcclxuICBsaXN0ZW5lcnM6IHtcclxuICAgIHN5bmM6ICh7IFNlbmRlciB9LCBkYXRhKSA9PiB7XHJcbiAgICAgIGlmICghU2VuZGVyKSByZXR1cm47XHJcbiAgICAgIGNvbnNvbGUubG9nKFwic3luYzpcIiArIG1vZElkZW50aWZpZXIpO1xyXG5cclxuICAgICAgbG9nZ2VyLmRlYnVnKHtcclxuICAgICAgICBtZXNzYWdlOiBgUmVjZWl2ZWQgdXBkYXRlZCBkYXRhYCxcclxuICAgICAgICBkYXRhLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG90aGVyQ2hhcmFjdGVyID0gZ2V0Q2hhcmFjdGVyKFNlbmRlcik7XHJcbiAgICAgIGlmICghb3RoZXJDaGFyYWN0ZXIpIHJldHVybjtcclxuXHJcbiAgICAgIG90aGVyQ2hhcmFjdGVyW21vZElkZW50aWZpZXJdID0ge1xyXG4gICAgICAgIFN0YXRzOiBkYXRhLnN0YXRzLFxyXG4gICAgICAgIFZlcnNpb246IGRhdGEudmVyc2lvbixcclxuICAgICAgICBTZXR0aW5nczogZGF0YS5zZXR0aW5ncyxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBpbml0OiAoeyBTZW5kZXIgfSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImluaXRcIik7XHJcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgUmVjZWl2ZWQgcmVxdWVzdCBmb3IgZGF0YWApO1xyXG4gICAgICBzZW5kVXBkYXRlTXlEYXRhKFNlbmRlcik7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbiIsImltcG9ydCB7IENvbWJpbmVkQWN0aW9uIH0gZnJvbSBcIi4uLy4uL3R5cGVzL3R5cGVzXCI7XHJcbmltcG9ydCB7IGFiY2xQbGF5ZXIgfSBmcm9tIFwiLi4vcGxheWVyL3BsYXllclwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvUGVlOiBDb21iaW5lZEFjdGlvbiA9IHtcclxuICBhY3Rpdml0eToge1xyXG4gICAgSUQ6IFwicGVlXCIsXHJcbiAgICBOYW1lOiBcIlBlZVwiLFxyXG4gICAgSW1hZ2U6IGAke3B1YmxpY1VSTH0vYWN0aXZpdHkvd2V0RGlhcGVyLnN2Z2AsXHJcbiAgICBPbkNsaWNrOiAocGxheWVyOiBDaGFyYWN0ZXIsIGdyb3VwOiBBc3NldEdyb3VwSXRlbU5hbWUpID0+IGFiY2xQbGF5ZXIud2V0KCksXHJcbiAgICBUYXJnZXRTZWxmOiBbXCJJdGVtUGVsdmlzXCJdLFxyXG4gIH0sXHJcbiAgY29tbWFuZDoge1xyXG4gICAgVGFnOiBcInBlZVwiLFxyXG4gICAgQWN0aW9uOiAoYXJncywgbXNnLCBwYXJzZWQpID0+IGFiY2xQbGF5ZXIud2V0KCksXHJcbiAgICBEZXNjcmlwdGlvbjogYCBMZXRzIGdvIG9mIHlvdXIgYmxhZGRlci5gLFxyXG4gIH0sXHJcbn07XHJcbiIsImltcG9ydCB7IENvbWJpbmVkQWN0aW9uIH0gZnJvbSBcIi4uLy4uL3R5cGVzL3R5cGVzXCI7XHJcbmltcG9ydCB7IGFiY2xQbGF5ZXIgfSBmcm9tIFwiLi4vcGxheWVyL3BsYXllclwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvUG9vcDogQ29tYmluZWRBY3Rpb24gPSB7XHJcbiAgYWN0aXZpdHk6IHtcclxuICAgIElEOiBcInBvb3BcIixcclxuICAgIE5hbWU6IFwiUG9vcFwiLFxyXG4gICAgSW1hZ2U6IGAke3B1YmxpY1VSTH0vYWN0aXZpdHkvc29pbERpYXBlci5zdmdgLFxyXG4gICAgT25DbGljazogKHBsYXllcjogQ2hhcmFjdGVyLCBncm91cCkgPT4gYWJjbFBsYXllci5zb2lsKCksXHJcbiAgICBUYXJnZXRTZWxmOiBbXCJJdGVtUGVsdmlzXCJdLFxyXG4gIH0sXHJcbiAgY29tbWFuZDoge1xyXG4gICAgVGFnOiBcInBvb3BcIixcclxuICAgIEFjdGlvbjogKCkgPT4gYWJjbFBsYXllci5zb2lsKCksXHJcbiAgICBEZXNjcmlwdGlvbjogYCBSZWxheGVzIHlvdXIgYm93ZWxzLmAsXHJcbiAgfSxcclxufTtcclxuIiwiaW1wb3J0IHsgQ29tYmluZWRBY3Rpb24gfSBmcm9tIFwiLi4vLi4vdHlwZXMvdHlwZXNcIjtcclxuaW1wb3J0IHsgYWJjbFBsYXllciB9IGZyb20gXCIuLi9wbGF5ZXIvcGxheWVyXCI7XHJcbmltcG9ydCB7IFNlbmRBY3Rpb24gfSBmcm9tIFwiLi4vcGxheWVyL3BsYXllclV0aWxzXCI7XHJcblxyXG5jb25zdCB1c2VQb3R0eUZ1bmN0aW9uID0gKCkgPT4ge1xyXG4gIGNvbnN0IGlzR29vZCA9IGFiY2xQbGF5ZXIuc3RhdHMuQmxhZGRlckZ1bGxuZXNzID4gMC42IHx8IGFiY2xQbGF5ZXIuc3RhdHMuQm93ZWxGdWxsbmVzcyA+IDAuNjtcclxuICBjb25zdCBpc1Rvb0Vhcmx5ID0gYWJjbFBsYXllci5zdGF0cy5CbGFkZGVyRnVsbG5lc3MgPCAwLjMgJiYgYWJjbFBsYXllci5zdGF0cy5Cb3dlbEZ1bGxuZXNzIDwgMC4zO1xyXG4gIGNvbnN0IGlzVG9vRmFyR29uZSA9IGFiY2xQbGF5ZXIuc3RhdHMuTWVudGFsUmVncmVzc2lvbiA+IDAuOTtcclxuICBjb25zdCBpc0VtYmFycmFzc2VkID0gYWJjbFBsYXllci5zdGF0cy5NZW50YWxSZWdyZXNzaW9uIDwgMC4zO1xyXG4gIGlmIChpc1Rvb0Vhcmx5KSB7XHJcbiAgICBTZW5kQWN0aW9uKFwiJU5BTUUlIHRyaWVzIHRvIHVzZSB0aGUgcG90dHkgYnV0IGNhbid0IHNlZW0gdG8gZ2V0IGFueXRoaW5nIG91dC5cIiwgdW5kZWZpbmVkLCBcInVzZVBvdHR5XCIpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBhYmNsUGxheWVyLnN0YXRzLkJvd2VsRnVsbG5lc3MgPSAwO1xyXG4gIGFiY2xQbGF5ZXIuc3RhdHMuQmxhZGRlckZ1bGxuZXNzID0gMDtcclxuICBsZXQgYWRkaXRpb25hbFRleHQgPSBcIlwiO1xyXG4gIGlmIChpc0VtYmFycmFzc2VkKSB7XHJcbiAgICBhZGRpdGlvbmFsVGV4dCA9IFwiYW5kIGZlZWxzIGVtYmFycmFzZWRcIjtcclxuICAgIGFiY2xQbGF5ZXIuc3RhdHMuTWVudGFsUmVncmVzc2lvbiArPSAwLjA0O1xyXG4gIH1cclxuICBpZiAoaXNHb29kICYmICFpc1Rvb0ZhckdvbmUpIHtcclxuICAgIGFkZGl0aW9uYWxUZXh0ICs9IGlzRW1iYXJyYXNzZWQgPyBcIiBidXQgaXMgcmVsZWF2ZWRcIiA6IFwiYW5kIGZlZWxzIHJlbGVhdmVkXCI7XHJcblxyXG4gICAgYWJjbFBsYXllci5zdGF0cy5JbmNvbnRpbmVuY2UgLT0gMC4wMjtcclxuICAgIGFiY2xQbGF5ZXIuc3RhdHMuTWVudGFsUmVncmVzc2lvbiAtPSAwLjAyO1xyXG4gIH1cclxuICBTZW5kQWN0aW9uKFwiJU5BTUUlIHNpdHMgZG93biB1c2VzIHRoZSBwb3R0eSBcIiArIGFkZGl0aW9uYWxUZXh0ICsgXCIuXCIsIHVuZGVmaW5lZCwgXCJ1c2VQb3R0eVwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VQb3R0eTogQ29tYmluZWRBY3Rpb24gPSB7XHJcbiAgYWN0aXZpdHk6IHtcclxuICAgIElEOiBcInBvdHR5XCIsXHJcbiAgICBOYW1lOiBcIlNpdCBhbmQgVXNlIFBvdHR5XCIsXHJcbiAgICBJbWFnZTogYCR7cHVibGljVVJMfS9hY3Rpdml0eS9wb3R0eS10ZW1wLnBuZ2AsXHJcbiAgICBPbkNsaWNrOiAocGxheWVyOiBDaGFyYWN0ZXIpID0+IHVzZVBvdHR5RnVuY3Rpb24oKSxcclxuICAgIFRhcmdldFNlbGY6IFtcIkl0ZW1CdXR0XCJdLFxyXG4gIH0sXHJcbiAgY29tbWFuZDoge1xyXG4gICAgVGFnOiBcInVzZS1wb3R0eVwiLFxyXG4gICAgQWN0aW9uOiAoYXJncywgbXNnLCBwYXJzZWQpID0+IHVzZVBvdHR5RnVuY3Rpb24oKSxcclxuICAgIERlc2NyaXB0aW9uOiBgIFNpdCBkb3duIGFuZCB1c2UgdGhlIHBvdHR5LmAsXHJcbiAgfSxcclxufTtcclxuIiwiaW1wb3J0IHsgQ29tYmluZWRBY3Rpb24gfSBmcm9tIFwiLi4vLi4vdHlwZXMvdHlwZXNcIjtcclxuaW1wb3J0IHsgYWJjbFBsYXllciB9IGZyb20gXCIuLi9wbGF5ZXIvcGxheWVyXCI7XHJcbmltcG9ydCB7IFNlbmRBY3Rpb24gfSBmcm9tIFwiLi4vcGxheWVyL3BsYXllclV0aWxzXCI7XHJcbmltcG9ydCB7IHNlbmRDaGF0TG9jYWwgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmNvbnN0IHVzZVRvaWxldEZ1bmN0aW9uID0gKCkgPT4ge1xyXG4gIGNvbnN0IGlzVG9vRWFybHkgPSBhYmNsUGxheWVyLnN0YXRzLkJsYWRkZXJGdWxsbmVzcyA8IDAuMyAmJiBhYmNsUGxheWVyLnN0YXRzLkJvd2VsRnVsbG5lc3MgPCAwLjM7XHJcbiAgY29uc3QgaXNHb29kID0gYWJjbFBsYXllci5zdGF0cy5CbGFkZGVyRnVsbG5lc3MgPiAwLjYgfHwgYWJjbFBsYXllci5zdGF0cy5Cb3dlbEZ1bGxuZXNzID4gMC42O1xyXG4gIGlmIChpc1Rvb0Vhcmx5KSByZXR1cm4gc2VuZENoYXRMb2NhbChcIllvdSB0cnkgdG8gdXNlIHRoZSB0b2lsZXQgYnV0IHlvdSBjYW4ndCBzZWVtIHRvIGdldCBhbnl0aGluZyBvdXQuXCIpO1xyXG4gIGxldCBhZGRpdGlvbmFsVGV4dCA9IFwiXCI7XHJcbiAgaWYgKGlzR29vZCkge1xyXG4gICAgYWRkaXRpb25hbFRleHQgPSBcImFuZCBmZWVscyByZWxlYXZlZFwiO1xyXG4gICAgYWJjbFBsYXllci5zdGF0cy5NZW50YWxSZWdyZXNzaW9uIC09IDAuMDI7XHJcbiAgICBhYmNsUGxheWVyLnN0YXRzLkluY29udGluZW5jZSAtPSAwLjAyO1xyXG4gIH1cclxuICBhYmNsUGxheWVyLnN0YXRzLkJsYWRkZXJGdWxsbmVzcyA9IDA7XHJcbiAgYWJjbFBsYXllci5zdGF0cy5Cb3dlbEZ1bGxuZXNzID0gMDtcclxuICBTZW5kQWN0aW9uKFwiJU5BTUUlIGdvZXMgdG8gdGhlIGJhdGhyb29tIHVzZXMgdGhlIHRvaWxldCBcIiArIGFkZGl0aW9uYWxUZXh0ICsgXCIuXCIsIHVuZGVmaW5lZCwgXCJ1c2VUb2lsZXRcIik7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXNlVG9pbGV0OiBDb21iaW5lZEFjdGlvbiA9IHtcclxuICBhY3Rpdml0eToge1xyXG4gICAgSUQ6IFwidG9pbGV0XCIsXHJcbiAgICBOYW1lOiBcIlNpdCBhbmQgVXNlIFRvaWxldFwiLFxyXG4gICAgSW1hZ2U6IGAke3B1YmxpY1VSTH0vYWN0aXZpdHkvdG9pbGV0LXRlbXAucG5nYCxcclxuICAgIE9uQ2xpY2s6IChwbGF5ZXI6IENoYXJhY3RlcikgPT4gdXNlVG9pbGV0RnVuY3Rpb24oKSxcclxuICAgIENyaXRlcmlhOiAocGxheWVyOiBDaGFyYWN0ZXIpID0+IGFiY2xQbGF5ZXIuc3RhdHMuTWVudGFsUmVncmVzc2lvbiA8IDAuMyxcclxuICAgIFRhcmdldFNlbGY6IFtcIkl0ZW1CdXR0XCJdLFxyXG4gIH0sXHJcbiAgY29tbWFuZDoge1xyXG4gICAgVGFnOiBcInVzZS10b2lsZXRcIixcclxuICAgIEFjdGlvbjogKCkgPT4ge1xyXG4gICAgICBpZiAoIXVzZVRvaWxldC5hY3Rpdml0eSEuQ3JpdGVyaWEhKFBsYXllcikpXHJcbiAgICAgICAgcmV0dXJuIHNlbmRDaGF0TG9jYWwoXCJZb3UgZmVlbCB1bmNvbWZvcnRhYmxlLCB0aGUgdG9pbGV0IGlzIGNvbGQgYW5kIGhhcmQgYWxtb3N0IGxpa2UgaWNlLiBZb3UgY2FuJ3QgdXNlIGl0LlwiKTtcclxuICAgICAgdXNlVG9pbGV0RnVuY3Rpb24oKTtcclxuICAgIH0sXHJcbiAgICBEZXNjcmlwdGlvbjogYCBTaXQgZG93biBhbmQgdXNlIHRoZSB0b2lsZXQuYCxcclxuICB9LFxyXG59O1xyXG4iLCJpbXBvcnQgeyBDb21iaW5lZEFjdGlvbiB9IGZyb20gXCIuLi8uLi90eXBlcy90eXBlc1wiO1xyXG5pbXBvcnQgeyBzZW5kRGF0YVRvQWN0aW9uLCBzZW5kVXBkYXRlTXlEYXRhIH0gZnJvbSBcIi4uL2hvb2tzXCI7XHJcbmltcG9ydCB7IGFiY2xQbGF5ZXIsIHVwZGF0ZVBsYXllckNsb3RoZXMgfSBmcm9tIFwiLi4vcGxheWVyL3BsYXllclwiO1xyXG5pbXBvcnQgeyBnZXRDaGFyYWN0ZXIsIGlzQUJDTFBsYXllciwgcmVwbGFjZV90ZW1wbGF0ZSwgU2VuZEFjdGlvbiB9IGZyb20gXCIuLi9wbGF5ZXIvcGxheWVyVXRpbHNcIjtcclxuaW1wb3J0IHsgc2VuZENoYXRMb2NhbCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBBc3NldE1hbmFnZXIgfSBmcm9tIFwiQHN1Z2FyY2gvYmMtYXNzZXQtbWFuYWdlclwiO1xyXG5jb25zdCBXaXBlUHVkZGxlUmVxdWVzdCA9IChwbGF5ZXI6IENoYXJhY3RlcikgPT4ge1xyXG4gIGlmIChwbGF5ZXIuTWVtYmVyTnVtYmVyICE9PSBQbGF5ZXIuTWVtYmVyTnVtYmVyKSByZXR1cm4gc2VuZERhdGFUb0FjdGlvbihcIndpcGUtcHVkZGxlXCIsIHVuZGVmaW5lZCwgcGxheWVyLk1lbWJlck51bWJlcik7XHJcbiAgV2lwZVB1ZGRsZUZ1bmN0aW9uKFBsYXllcik7XHJcbn07XHJcbmNvbnN0IFdpcGVQdWRkbGVGdW5jdGlvbiA9IChwbGF5ZXI6IENoYXJhY3RlcikgPT4ge1xyXG4gIGFiY2xQbGF5ZXIuc3RhdHMuUHVkZGxlU2l6ZSA9IDA7XHJcbiAgc2VuZFVwZGF0ZU15RGF0YSgpO1xyXG4gIHVwZGF0ZVBsYXllckNsb3RoZXMoKTtcclxuICBpZiAocGxheWVyLk1lbWJlck51bWJlciAhPT0gUGxheWVyLk1lbWJlck51bWJlcilcclxuICAgIHJldHVybiBTZW5kQWN0aW9uKHJlcGxhY2VfdGVtcGxhdGUoXCIlT1BQX05BTUUlIHdpcGVzICVOQU1FJSdzIHB1ZGRsZSBvZiBwZWUuXCIsIHBsYXllciksIHVuZGVmaW5lZCwgXCJ3aXBlUHVkZGxlXCIsIHBsYXllcik7XHJcblxyXG4gIFNlbmRBY3Rpb24ocmVwbGFjZV90ZW1wbGF0ZShcIiVOQU1FJSB3aXBlcyAlSU5URU5TSVZFJSBwdWRkbGUgb2YgcGVlLlwiLCBwbGF5ZXIpLCB1bmRlZmluZWQsIFwid2lwZVB1ZGRsZVwiLCBwbGF5ZXIpO1xyXG59O1xyXG5leHBvcnQgdHlwZSB3aXBlUHVkZGxlTGlzdGVuZXJzID0ge1xyXG4gIFwid2lwZS1wdWRkbGVcIjogdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHdpcGVQdWRkbGU6IENvbWJpbmVkQWN0aW9uID0ge1xyXG4gIGFjdGl2aXR5OiB7XHJcbiAgICBJRDogXCJ3aXBlLXB1ZGRsZVwiLFxyXG4gICAgTmFtZTogXCJXaXBlIFB1ZGRsZVwiLFxyXG4gICAgSW1hZ2U6IGAuL0Fzc2V0cy9GZW1hbGUzRENHL0l0ZW1IYW5kaGVsZC9QcmV2aWV3L1Rvd2VsLnBuZ2AsXHJcbiAgICBUYXJnZXQ6IFtcIkl0ZW1Cb290c1wiXSxcclxuICAgIE9uQ2xpY2s6IChwbGF5ZXI6IENoYXJhY3RlciwgZ3JvdXA6IEFzc2V0R3JvdXBJdGVtTmFtZSkgPT4gV2lwZVB1ZGRsZVJlcXVlc3QocGxheWVyKSxcclxuICAgIENyaXRlcmlhOiAocGxheWVyOiBDaGFyYWN0ZXIpID0+IGlzQUJDTFBsYXllcihwbGF5ZXIpICYmIHBsYXllci5BQkNMIS5TdGF0cy5QdWRkbGVTaXplLnZhbHVlID4gMCxcclxuICB9LFxyXG4gIGNvbW1hbmQ6IHtcclxuICAgIFRhZzogXCJ3aXBlLXB1ZGRsZVwiLFxyXG4gICAgQWN0aW9uOiAoYXJncywgbXNnLCBwYXJzZWQpID0+IHtcclxuICAgICAgY29uc3QgY2hhcmFjdGVyID0gZ2V0Q2hhcmFjdGVyKHBhcnNlZFswXSkgPz8gUGxheWVyO1xyXG4gICAgICBpZiAoIXdpcGVQdWRkbGUuYWN0aXZpdHkhLkNyaXRlcmlhIShjaGFyYWN0ZXIpKSByZXR1cm4gc2VuZENoYXRMb2NhbChcIklzIGVpdGhlciBub3QgYW4gQUJDTCBwbGF5ZXIgb3IgaGFzIG5vIHB1ZGRsZS5cIik7XHJcbiAgICAgIFdpcGVQdWRkbGVSZXF1ZXN0KGNoYXJhY3Rlcik7XHJcbiAgICB9LFxyXG4gICAgRGVzY3JpcHRpb246IGAgW01lbWJlck51bWJlcnxOYW1lfE5pY2tuYW1lXTogV2lwZXMgYSBwdWRkbGUgb2YgcGVlLmAsXHJcbiAgfSxcclxuICBsaXN0ZW5lcnM6IHtcclxuICAgIFwid2lwZS1wdWRkbGVcIjogKHsgU2VuZGVyIH0pID0+IHtcclxuICAgICAgV2lwZVB1ZGRsZUZ1bmN0aW9uKGdldENoYXJhY3RlcihTZW5kZXIhKSA/PyBQbGF5ZXIpO1xyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG4iLCJpbXBvcnQgeyBBQkNMQWN0aXZpdHksIENvbWJpbmVkQWN0aW9uLCBIb29rTGlzdGVuZXIgfSBmcm9tIFwiLi4vdHlwZXMvdHlwZXNcIjtcclxuaW1wb3J0IHsgY2hhbmdlRGlhcGVyIH0gZnJvbSBcIi4vYWN0aW9ucy9jaGFuZ2VEaWFwZXJcIjtcclxuaW1wb3J0IHsgY2hlY2tEaWFwZXIgfSBmcm9tIFwiLi9hY3Rpb25zL2NoZWNrRGlhcGVyXCI7XHJcbmltcG9ydCB7IGxpY2tQdWRkbGUgfSBmcm9tIFwiLi9hY3Rpb25zL2xpY2tQdWRkbGVcIjtcclxuaW1wb3J0IHsgb25BQkNMTWVzc2FnZSB9IGZyb20gXCIuL2FjdGlvbnMvb25BQkNMTWVzc2FnZVwiO1xyXG5pbXBvcnQgeyBzeW5jLCBzeW5jTGlzdGVuZXJzIH0gZnJvbSBcIi4vYWN0aW9ucy9zeW5jXCI7XHJcbmltcG9ydCB7IHRvUGVlIH0gZnJvbSBcIi4vYWN0aW9ucy90b1BlZVwiO1xyXG5pbXBvcnQgeyB0b1Bvb3AgfSBmcm9tIFwiLi9hY3Rpb25zL3RvUG9vcFwiO1xyXG5pbXBvcnQgeyB1c2VQb3R0eSB9IGZyb20gXCIuL2FjdGlvbnMvdXNlUG90dHlcIjtcclxuaW1wb3J0IHsgdXNlVG9pbGV0IH0gZnJvbSBcIi4vYWN0aW9ucy91c2VUb2lsZXRcIjtcclxuaW1wb3J0IHsgd2lwZVB1ZGRsZSB9IGZyb20gXCIuL2FjdGlvbnMvd2lwZVB1ZGRsZVwiO1xyXG5pbXBvcnQgeyBiY01vZFNESywgd2FpdEZvckVsZW1lbnQgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5cclxuY2xhc3MgQWN0aXZpdHkge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGlkOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nLFxyXG4gICAgcHVibGljIGltYWdlOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgb25DbGljaz86IChwbGF5ZXI6IENoYXJhY3RlciwgZ3JvdXA6IEFzc2V0R3JvdXBJdGVtTmFtZSkgPT4gdm9pZCxcclxuICAgIHByaXZhdGUgdGFyZ2V0PzogQXNzZXRHcm91cEl0ZW1OYW1lW10sXHJcbiAgICBwcml2YXRlIHRhcmdldFNlbGY/OiBBc3NldEdyb3VwSXRlbU5hbWVbXSxcclxuICAgIHByaXZhdGUgY3JpdGVyaWE/OiAocGxheWVyOiBDaGFyYWN0ZXIpID0+IGJvb2xlYW4sXHJcbiAgKSB7fVxyXG5cclxuICBmaXRzQ3JpdGVyaWEocGxheWVyOiBDaGFyYWN0ZXIsIGZvY3VzR3JvdXA6IEFzc2V0R3JvdXBJdGVtTmFtZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIEJvb2xlYW4oXHJcbiAgICAgICghdGhpcy5jcml0ZXJpYSB8fCB0aGlzLmNyaXRlcmlhKHBsYXllcikpICYmXHJcbiAgICAgICAgKHRoaXMudGFyZ2V0Py5pbmNsdWRlcyhmb2N1c0dyb3VwKSB8fCAodGhpcy50YXJnZXRTZWxmPy5pbmNsdWRlcyhmb2N1c0dyb3VwKSAmJiBQbGF5ZXIuTWVtYmVyTnVtYmVyID09PSBwbGF5ZXI/Lk1lbWJlck51bWJlcikpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUJ1dHRvbigpOiBIVE1MQnV0dG9uRWxlbWVudCB7XHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgYnV0dG9uLmlkID0gdGhpcy5pZDtcclxuICAgIGJ1dHRvbi5uYW1lID0gYCR7bW9kSWRlbnRpZmllcn1fJHt0aGlzLm5hbWV9YDtcclxuICAgIGJ1dHRvbi5kYXRhc2V0Lmdyb3VwID0gXCJJdGVtQXJtc1wiO1xyXG4gICAgYnV0dG9uLmNsYXNzTmFtZSA9IGBibGFuay1idXR0b24gYnV0dG9uIGJ1dHRvbi1zdHlsaW5nIEhpZGVPblBvcHVwIGRpYWxvZy1ncmlkLWJ1dHRvbmA7XHJcbiAgICBidXR0b24uaW5uZXJIVE1MID0gYDxpbWcgZGVjb2Rpbmc9XCJhc3luY1wiIGxvYWRpbmc9XCJsYXp5XCIgc3JjPVwiJHt0aGlzLmltYWdlfVwiIGNsYXNzPVwiYnV0dG9uLWltYWdlXCI+PHNwYW4gY2xhc3M9XCJidXR0b24tbGFiZWwgYnV0dG9uLWxhYmVsLWJvdHRvbVwiPiR7dGhpcy5uYW1lfTwvc3Bhbj5gO1xyXG5cclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XHJcbiAgICAgIGNvbnN0IHBsYXllciA9IEN1cnJlbnRDaGFyYWN0ZXI/LkZvY3VzR3JvdXAgPyBDdXJyZW50Q2hhcmFjdGVyIDogUGxheWVyO1xyXG4gICAgICBjb25zdCBmb2N1c0dyb3VwID0gcGxheWVyPy5Gb2N1c0dyb3VwPy5OYW1lO1xyXG4gICAgICBpZiAoIXRoaXMub25DbGljayB8fCAhZm9jdXNHcm91cCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLm9uQ2xpY2socGxheWVyLCBmb2N1c0dyb3VwKTtcclxuICAgICAgRGlhbG9nTGVhdmUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBidXR0b247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNJbnNlcnRlZChpZDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gQm9vbGVhbihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRBY3Rpb25zID0gKCk6IHZvaWQgPT4ge1xyXG4gIGJjTW9kU0RLLmhvb2tGdW5jdGlvbihcIkRpYWxvZ01lbnVNYXBwaW5nLmFjdGl2aXRpZXMuR2V0Q2xpY2tTdGF0dXNcIiwgMSwgKGFyZ3MsIG5leHQpID0+IHtcclxuICAgIGNvbnN0IFtfQywgX2NsaWNrZWRPYmosIF9lcXVpcHBlZEl0ZW1dID0gYXJncztcclxuICAgIGlmICghX2NsaWNrZWRPYmopIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIG5leHQoYXJncyk7XHJcbiAgfSk7XHJcblxyXG4gIGJjTW9kU0RLLmhvb2tGdW5jdGlvbihcIkRpYWxvZ0NoYW5nZU1vZGVcIiwgMSwgYXN5bmMgKGFyZ3MsIG5leHQpID0+IHtcclxuICAgIGNvbnN0IFtfbW9kZV0gPSBhcmdzO1xyXG4gICAgbmV4dChhcmdzKTtcclxuICAgIGlmIChfbW9kZSAhPT0gXCJhY3Rpdml0aWVzXCIpIHJldHVybjtcclxuICAgIGNvbnN0IHBsYXllciA9IEN1cnJlbnRDaGFyYWN0ZXI/LkZvY3VzR3JvdXAgPyBDdXJyZW50Q2hhcmFjdGVyIDogUGxheWVyO1xyXG4gICAgY29uc3QgYWN0aXZpdHlHcmlkID0gYXdhaXQgd2FpdEZvckVsZW1lbnQoXCIjZGlhbG9nLWFjdGl2aXR5LWdyaWRcIik7XHJcbiAgICBjb25zdCBmb2N1c0dyb3VwID0gcGxheWVyLkZvY3VzR3JvdXA/Lk5hbWU7XHJcbiAgICBpZiAoIWZvY3VzR3JvdXApIHJldHVybjtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHsgYWN0aXZpdHkgfSBvZiBhY3Rpb25zKSB7XHJcbiAgICAgIGlmICghYWN0aXZpdHkpIGNvbnRpbnVlO1xyXG4gICAgICBjb25zdCBhY3Rpdml0eUluc3RhbmNlID0gbmV3IEFjdGl2aXR5KFxyXG4gICAgICAgIGFjdGl2aXR5LklELFxyXG4gICAgICAgIGFjdGl2aXR5Lk5hbWUsXHJcbiAgICAgICAgYWN0aXZpdHkuSW1hZ2UsXHJcbiAgICAgICAgYWN0aXZpdHkuT25DbGljayxcclxuICAgICAgICBhY3Rpdml0eS5UYXJnZXQsXHJcbiAgICAgICAgYWN0aXZpdHkuVGFyZ2V0U2VsZixcclxuICAgICAgICBhY3Rpdml0eS5Dcml0ZXJpYSxcclxuICAgICAgKTtcclxuICAgICAgaWYgKGFjdGl2aXR5SW5zdGFuY2UuZml0c0NyaXRlcmlhKHBsYXllciwgZm9jdXNHcm91cCkpIHtcclxuICAgICAgICBpZiAoIUFjdGl2aXR5LmlzSW5zZXJ0ZWQoYWN0aXZpdHkuSUQpKSB7XHJcbiAgICAgICAgICBhY3Rpdml0eUdyaWQuYXBwZW5kQ2hpbGQoYWN0aXZpdHlJbnN0YW5jZS5jcmVhdGVCdXR0b24oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgQ29tbWFuZENvbWJpbmUoY29tbWFuZHMpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgYWN0aW9uczogQ29tYmluZWRBY3Rpb25bXSA9IFtjaGFuZ2VEaWFwZXIsIGNoZWNrRGlhcGVyLCB0b1BlZSwgdG9Qb29wLCB1c2VQb3R0eSwgdXNlVG9pbGV0LCBzeW5jLCBsaWNrUHVkZGxlLCB3aXBlUHVkZGxlLCBvbkFCQ0xNZXNzYWdlXTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb21tYW5kcyA9IGFjdGlvbnMucmVkdWNlKChjb21tYW5kcywgeyBjb21tYW5kIH0pID0+IChjb21tYW5kID8gWy4uLmNvbW1hbmRzLCBjb21tYW5kXSA6IGNvbW1hbmRzKSwgW10gYXMgSUNvbW1hbmRbXSk7XHJcbmV4cG9ydCBjb25zdCBhY3Rpdml0ZXMgPSBhY3Rpb25zLnJlZHVjZSgoYWN0aXZpdGVzLCB7IGFjdGl2aXR5IH0pID0+IChhY3Rpdml0eSA/IFsuLi5hY3Rpdml0ZXMsIGFjdGl2aXR5XSA6IGFjdGl2aXRlcyksIFtdIGFzIEFCQ0xBY3Rpdml0eVtdKTtcclxuIiwiaW1wb3J0IGJjTW9kU2RrIGZyb20gXCJib25kYWdlLWNsdWItbW9kLXNka1wiO1xyXG5pbXBvcnQgeyBQbHVnaW5TZXJ2ZXJDaGF0Um9vbU1lc3NhZ2UsIExpc3RlbmVyVHlwZU1hcCwgSG9va0xpc3RlbmVyIH0gZnJvbSBcIi4uL3R5cGVzL3R5cGVzXCI7XHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuL2xvZ2dlclwiO1xyXG5pbXBvcnQgeyBpc0RpYXBlciwgdXBkYXRlRGlhcGVyQ29sb3IgfSBmcm9tIFwiLi9wbGF5ZXIvZGlhcGVyXCI7XHJcbmltcG9ydCB7IGlzQUJDTFBsYXllciB9IGZyb20gXCIuL3BsYXllci9wbGF5ZXJVdGlsc1wiO1xyXG5pbXBvcnQgeyBiY01vZFNESywgd2FpdEZvciB9IGZyb20gXCIuL3V0aWxzXCI7XHJcbmltcG9ydCB7IG92ZXJsYXkgfSBmcm9tIFwiLi9wbGF5ZXIvdWlcIjtcclxuaW1wb3J0IHsgTW9kSWRlbnRpZmllciwgTW9kVmVyc2lvbiB9IGZyb20gXCIuLi90eXBlcy9kZWZpbml0aW9uc1wiO1xyXG5pbXBvcnQgeyBhY3Rpb25zIH0gZnJvbSBcIi4vYWN0aW9uTG9hZGVyXCI7XHJcbmV4cG9ydCBjb25zdCBzZW5kRGF0YVRvQWN0aW9uID0gKHR5cGU6IHN0cmluZywgZGF0YT86IGFueSwgdGFyZ2V0PzogbnVtYmVyKSA9PiB7XHJcbiAgY29uc3QgQ2hhdFJvb21NZXNzYWdlOiBQbHVnaW5TZXJ2ZXJDaGF0Um9vbU1lc3NhZ2UgPSB7XHJcbiAgICBUeXBlOiBcIkhpZGRlblwiLFxyXG4gICAgQ29udGVudDogYCR7TW9kSWRlbnRpZmllcn1Nc2dgLFxyXG4gICAgU2VuZGVyOiBQbGF5ZXIuTWVtYmVyTnVtYmVyLFxyXG4gICAgVGFyZ2V0OiB0YXJnZXQsXHJcbiAgICBEaWN0aW9uYXJ5OiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH07XHJcbiAgU2VydmVyU2VuZChcIkNoYXRSb29tQ2hhdFwiLCBDaGF0Um9vbU1lc3NhZ2UgYXMgU2VydmVyQ2hhdFJvb21NZXNzYWdlKTtcclxuICBjb25zb2xlLmxvZyhcInNlbmREYXRhVG9BY3Rpb25cIiwgdHlwZSwgZGF0YSwgdGFyZ2V0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZW5kcyBhbiB1cGRhdGUgb2YgdGhlIHBsYXllcidzIHNldHRpbmdzIHRvIHRoZSBzcGVjaWZpZWQgdGFyZ2V0IG9yIHRvIGV2ZXJ5b25lIGluIHRoZSBjaGF0IHJvb20uXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbdGFyZ2V0XSAtIFRoZSBNZW1iZXJOdW1iZXIgb2YgdGhlIHRhcmdldCBwbGF5ZXIuIElmIG5vdCBzcGVjaWZpZWQsIHRoZSB1cGRhdGUgaXMgc2VudCB0byBhbGwgcGxheWVycy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBzZW5kVXBkYXRlTXlEYXRhID0gKHRhcmdldD86IG51bWJlcikgPT4ge1xyXG4gIGNvbnNvbGUubG9nKFwic2VuZFVwZGF0ZU15RGF0YSB0YXJnZXRcIiwgdGFyZ2V0KTtcclxuICBzZW5kRGF0YVRvQWN0aW9uKFxyXG4gICAgXCJzeW5jXCIsXHJcbiAgICB7XHJcbiAgICAgIHNldHRpbmdzOiBQbGF5ZXJbTW9kSWRlbnRpZmllcl0uU2V0dGluZ3MsXHJcbiAgICAgIHN0YXRzOiBQbGF5ZXJbTW9kSWRlbnRpZmllcl0uU3RhdHMsXHJcbiAgICAgIHZlcnNpb246IE1vZFZlcnNpb24sXHJcbiAgICB9LFxyXG4gICAgdGFyZ2V0LFxyXG4gICk7XHJcbiAgbG9nZ2VyLmRlYnVnKHtcclxuICAgIG1lc3NhZ2U6IGBTZW5kaW5nIHVwZGF0ZWQgZGF0YSB0byAke3RhcmdldCA/PyBcImV2ZXJ5b25lXCJ9YCxcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZW5kcyBhIHJlcXVlc3QgcGFja2V0IHRvIG90aGVyIHBsYXllcnMgaW4gdGhlIGNoYXQgcm9vbSB0byByZXRyaWV2ZSB0aGVpciBkYXRhLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNlbmRSZXF1ZXN0T3RoZXJEYXRhUGFja2V0ID0gKCkgPT4ge1xyXG4gIHNlbmREYXRhVG9BY3Rpb24oXCJpbml0XCIsIDEpO1xyXG5cclxuICBsb2dnZXIuZGVidWcoYFJlcXVlc3RpbmcgZGF0YSBmcm9tIG90aGVycy5gKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzZXMgaW5jb21pbmcgcGFja2V0cyBhbmQgZGVsZWdhdGVzIHRoZW0gdG8gdGhlIGFwcHJvcHJpYXRlIGhhbmRsZXIgYmFzZWQgb24gdGhlaXIgdHlwZS5cclxuICpcclxuICogQHBhcmFtIHtQbHVnaW5TZXJ2ZXJDaGF0Um9vbU1lc3NhZ2V9IHJlY2VpdmVkTWVzc2FnZSAtIFRoZSBtZXNzYWdlIGRhdGEgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyLlxyXG4gKi9cclxuXHJcbmNvbnN0IHJlY2VpdmVQYWNrZXQgPSAocmVjZWl2ZWRNZXNzYWdlOiBQbHVnaW5TZXJ2ZXJDaGF0Um9vbU1lc3NhZ2UpID0+IHtcclxuICBpZiAocmVjZWl2ZWRNZXNzYWdlPy5Db250ZW50ICE9PSBgJHttb2RJZGVudGlmaWVyfU1zZ2ApIHJldHVybjtcclxuICBpZiAoIXJlY2VpdmVkTWVzc2FnZS5TZW5kZXIgfHwgIXJlY2VpdmVkTWVzc2FnZS5EaWN0aW9uYXJ5KSByZXR1cm47XHJcbiAgaWYgKHJlY2VpdmVkTWVzc2FnZS5TZW5kZXIgPT09IFBsYXllci5NZW1iZXJOdW1iZXIpIHJldHVybjtcclxuICBpZiAocmVjZWl2ZWRNZXNzYWdlLlR5cGUgIT09IFwiSGlkZGVuXCIpIHJldHVybjtcclxuICBpZiAoIXJlY2VpdmVkTWVzc2FnZS5EaWN0aW9uYXJ5WzBdPy50eXBlKSByZXR1cm47XHJcblxyXG4gIGNvbnN0IHR5cGUgPSByZWNlaXZlZE1lc3NhZ2UuRGljdGlvbmFyeVswXT8udHlwZSBhcyBrZXlvZiBMaXN0ZW5lclR5cGVNYXA7XHJcbiAgY29uc3QgZGF0YSA9IHJlY2VpdmVkTWVzc2FnZS5EaWN0aW9uYXJ5WzBdPy5kYXRhIGFzIExpc3RlbmVyVHlwZU1hcFt0eXBlb2YgdHlwZV07XHJcbiAgZm9yIChjb25zdCBhY3Rpb24gb2YgYWN0aW9ucykge1xyXG4gICAgY29uc3QgbGlzdGVuZXIgPSBhY3Rpb24ubGlzdGVuZXJzPy5bdHlwZV07XHJcblxyXG4gICAgaWYgKGxpc3RlbmVyKSB7XHJcbiAgICAgIChsaXN0ZW5lciBhcyBIb29rTGlzdGVuZXI8TGlzdGVuZXJUeXBlTWFwW3R5cGVvZiB0eXBlXT4pKHJlY2VpdmVkTWVzc2FnZSwgZGF0YSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKFwicmVjZWl2ZVBhY2tldFwiLCB0eXBlLCBkYXRhLCByZWNlaXZlZE1lc3NhZ2UuU2VuZGVyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBJbml0aWFsaXplcyBob29rcyBmb3IgaW50ZXJjZXB0aW5nIGNoYXQgcm9vbSBtZXNzYWdlcyBhbmQgc3luY2hyb25pemluZyBwbGF5ZXIgZGF0YS5cclxuICogVGhpcyBmdW5jdGlvbiB3YWl0cyB1bnRpbCB0aGUgc2VydmVyIGlzIGNvbm5lY3RlZCBiZWZvcmUgc2V0dGluZyB1cCBob29rcy5cclxuICovXHJcblxyXG5jb25zdCBpbml0SG9va3MgPSBhc3luYyAoKSA9PiB7XHJcbiAgYXdhaXQgd2FpdEZvcigoKSA9PiBTZXJ2ZXJTb2NrZXQgJiYgU2VydmVySXNDb25uZWN0ZWQpO1xyXG4gIGJjTW9kU0RLLmhvb2tGdW5jdGlvbihcIkRyYXdDaGFyYWN0ZXJcIiwgMSwgKGFyZ3MsIG5leHQpID0+IHtcclxuICAgIGNvbnN0IFtDLCBDaGFyWCwgQ2hhclksIFpvb21dID0gYXJncztcclxuXHJcbiAgICBpZiAoaXNBQkNMUGxheWVyKEMpICYmIEMuQUJDTCEuU3RhdHMuUHVkZGxlU2l6ZS52YWx1ZSA+IDApIHtcclxuICAgICAgY29uc3QgcHVkZGxlU2l6ZUZhY3RvciA9IEMuQUJDTCEuU3RhdHMuUHVkZGxlU2l6ZS52YWx1ZSAvIDMwMDtcclxuXHJcbiAgICAgIGNvbnN0IHdpZHRoID0gNTEyICogcHVkZGxlU2l6ZUZhY3RvcjtcclxuICAgICAgY29uc3QgaGVpZ2h0ID0gMjM1ICogcHVkZGxlU2l6ZUZhY3RvcjtcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyZWQgcG9zaXRpb25cclxuICAgICAgY29uc3QgeCA9IENoYXJYICsgKDI1MCAqIFpvb20gLSB3aWR0aCAvIDIpO1xyXG4gICAgICBjb25zdCB5ID0gQ2hhclkgKyAoOTQwICogWm9vbSAtIGhlaWdodCAvIDIpO1xyXG5cclxuICAgICAgRHJhd0ltYWdlUmVzaXplKGAke3B1YmxpY1VSTH0vcHVkZGxlLnBuZ2AsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXh0KGFyZ3MpO1xyXG4gIH0pO1xyXG4gIGJjTW9kU0RLLmhvb2tGdW5jdGlvbihcIkNoYXRSb29tU3luY1wiLCAxLCAoYXJncywgbmV4dCkgPT4ge1xyXG4gICAgc2VuZFVwZGF0ZU15RGF0YSgpOyAvLyBUZWxsIGV2ZXJ5b25lIGVsc2UgdG8gdXBkYXRlIHRoZWlyIGNvcHkgb2Ygb3VyIGRhdGEsIHdoZW4gd2Ugam9pbiBhIHJvb20uXHJcbiAgICByZXR1cm4gbmV4dChhcmdzKTtcclxuICB9KTtcclxuXHJcbiAgYmNNb2RTREsuaG9va0Z1bmN0aW9uKFwiQ2hhdFJvb21NZXNzYWdlXCIsIDEsIChhcmdzLCBuZXh0KSA9PiB7XHJcbiAgICBpZiAoYXJnc1swXS5Db250ZW50ID09PSBcIlNlcnZlckVudGVyXCIgJiYgYXJnc1swXS5TZW5kZXIgPT09IFBsYXllci5NZW1iZXJOdW1iZXIpIHtcclxuICAgICAgLy8gQW5ub3VuY2UgKHZpYSBhbiBpbml0IHBhY2tldCkgdGhhdCB3ZSdyZSByZWFkeSB0byByZWNlaXZlIGRhdGEgbW9kZWxzLlxyXG4gICAgICBzZW5kUmVxdWVzdE90aGVyRGF0YVBhY2tldCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVjZWl2ZVBhY2tldChhcmdzWzBdIGFzIFBsdWdpblNlcnZlckNoYXRSb29tTWVzc2FnZSk7XHJcbiAgICByZXR1cm4gbmV4dChhcmdzKTtcclxuICB9KTtcclxuICBiY01vZFNESy5ob29rRnVuY3Rpb24oXCJDaGFyYWN0ZXJBcHBlYXJhbmNlU2V0SXRlbVwiLCAxLCAoYXJncywgbmV4dCkgPT4ge1xyXG4gICAgbGV0IFtfY2hhcmFjdGVyLCBfc2xvdCwgX2Fzc2V0XSA9IGFyZ3M7XHJcbiAgICBjb25zdCBfcmVzdWx0ID0gbmV4dChhcmdzKTtcclxuICAgIGlmIChfc2xvdCA9PT0gXCJJdGVtUGVsdmlzXCIgJiYgX2Fzc2V0KSB7XHJcbiAgICAgIGlmIChpc0RpYXBlcih7IEFzc2V0OiBfYXNzZXQgfSkpIHVwZGF0ZURpYXBlckNvbG9yKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3Jlc3VsdDtcclxuICB9KTtcclxuXHJcbiAgYmNNb2RTREsuaG9va0Z1bmN0aW9uKFwiUHJlZmVyZW5jZVN1YnNjcmVlbkNoYXRDbGlja1wiLCAxLCAoYXJncywgbmV4dCkgPT4ge1xyXG4gICAgaWYgKE1vdXNlSW4oMTgxNSwgNzUsIDkwLCA5MCkpIHtcclxuICAgICAgY29uc3QgdGhlbWUgPSBQbGF5ZXIuQ2hhdFNldHRpbmdzPy5Db2xvclRoZW1lID8/IFwiTGlnaHRcIjtcclxuICAgICAgaWYgKHRoZW1lLnN0YXJ0c1dpdGgoXCJMaWdodFwiKSAmJiAhIW92ZXJsYXkgJiYgIW92ZXJsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2wtdGhlbWUtbGlnaHRcIikpIHtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJzbC10aGVtZS1kYXJrXCIpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZChcInNsLXRoZW1lLWxpZ2h0XCIpO1xyXG4gICAgICAgIG92ZXJsYXkuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgbG9nZ2VyLmluZm8oYFNMIHRoZW1lIHN3aXRjaGluZzogTGlnaHRgKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhlbWUuc3RhcnRzV2l0aChcIkRhcmtcIikgJiYgISFvdmVybGF5ICYmICFvdmVybGF5LmNsYXNzTGlzdC5jb250YWlucyhcInNsLXRoZW1lLWRhcmtcIikpIHtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJzbC10aGVtZS1saWdodFwiKTtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJzbC10aGVtZS1kYXJrXCIpO1xyXG4gICAgICAgIG92ZXJsYXkuc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgbG9nZ2VyLmluZm8oYFNMIHRoZW1lIHN3aXRjaGluZzogRGFya2ApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dChhcmdzKTtcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluaXRIb29rcztcclxuXHJcbmNvbnN0IHJlcG9ydFdlYmhvb2tVUkwgPSBgaHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTM0MDAwMDQxNDUwNjAyOTE2Mi9hcXQ3cXJ1Rm56RE1NNUJOX2tMdHY5Z0NjYWxsSUYtSmVSVllsOWsyM3VTSWx4ckhSdmNGTXk1bXRQVVBHRHBXWmhIWGA7XHJcbmNvbnN0IGxhc3REZXRlY3RlZEVycm9yczogc3RyaW5nW10gPSBbXTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgYXN5bmMgZSA9PiB7XHJcbiAgY29uc29sZS5lcnJvcihlLmZpbGVuYW1lKTtcclxuICBpZiAoIWUuZmlsZW5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImFiY2xcIikpIHJldHVybjtcclxuICBjb25zdCBkZXRlY3RlZEVycm9yID0gYCR7ZS5tZXNzYWdlfSBhdCAke2UuZmlsZW5hbWV9ICR7ZS5saW5lbm99YDtcclxuICBpZiAobGFzdERldGVjdGVkRXJyb3JzLmluY2x1ZGVzKGRldGVjdGVkRXJyb3IpKSByZXR1cm47XHJcbiAgbGFzdERldGVjdGVkRXJyb3JzLnB1c2goZGV0ZWN0ZWRFcnJvcik7XHJcbiAgY29uc3QgYm9keSA9IHtcclxuICAgIHVzZXJuYW1lOiBgJHtQbGF5ZXIuTmFtZX0gJHtQbGF5ZXIuTmlja25hbWUgPT09IFwiXCIgPyBcIlwiIDogYGFrYSAke1BsYXllci5OaWNrbmFtZX1gfSAoJHtQbGF5ZXIuTWVtYmVyTnVtYmVyfSlgLFxyXG4gICAgdGhyZWFkX25hbWU6IGAke01vZElkZW50aWZpZXJ9ICR7TW9kVmVyc2lvbn0gRXJyb3IgJHtlLm1lc3NhZ2V9YC5zbGljZSgwLCAxMDApLFxyXG4gICAgY29udGVudDogYFxyXG4gICAgZXJyb3I6ICR7ZGV0ZWN0ZWRFcnJvcn1cclxuXFxgXFxgXFxgXHJcbiR7ZS5lcnJvci5zdGFja31cclxuXFxgXFxgXFxgXHJcbm1vZHM6ICR7YmNNb2RTZGtcclxuICAgICAgLmdldE1vZHNJbmZvKClcclxuICAgICAgLm1hcChtID0+IG0ubmFtZSlcclxuICAgICAgLmpvaW4oXCIsIFwiKX1gLFxyXG4gIH07XHJcbiAgYXdhaXQgZmV0Y2gocmVwb3J0V2ViaG9va1VSTCwge1xyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICB9LFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXHJcbiAgfSk7XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBiY01vZFNESyB9IGZyb20gXCIuLi9jb3JlL3V0aWxzXCI7XHJcbmltcG9ydCB7IE1vZFNjcmVlbiB9IGZyb20gXCIuLi90eXBlcy90eXBlc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRTY3JlZW5zID0gKHNjcmVlbnM6IE1vZFNjcmVlbltdKSA9PiB7XHJcbiAgYmNNb2RTREsuaG9va0Z1bmN0aW9uKFwiVGV4dExvYWRcIiwgNSwgKGFyZ3MsIG5leHQpID0+IHtcclxuICAgIGlmIChzY3JlZW5zLnNvbWUoKHNjcmVlbikgPT4gc2NyZWVuLm1vZHVsZSA9PT0gQ3VycmVudE1vZHVsZSAmJiBzY3JlZW4uaWQgPT09IEN1cnJlbnRTY3JlZW4pKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV4dChhcmdzKTtcclxuICB9KTtcclxuXHJcbiAgc2NyZWVucy5mb3JFYWNoKChzY3JlZW4pID0+IHtcclxuICAgICg8YW55PndpbmRvdylbYCR7c2NyZWVuLmlkfUJhY2tncm91bmRgXSA9IFwiU2hlZXRcIjtcclxuXHJcbiAgICBjb25zdCB7IEtleVVwLCBDbGljaywgLi4ucmVzdCB9ID0gc2NyZWVuLmZ1bmN0aW9ucztcclxuXHJcbiAgICBjb25zdCBpbmplY3RlZFNjcmVlbkZ1bmN0aW9ucyA9IHtcclxuICAgICAgLi4ucmVzdCxcclxuICAgICAgS2V5VXA6IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgICAgICg8YW55PndpbmRvdylbYCR7c2NyZWVuLmlkfUV4aXRgXSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgS2V5VXA/LihldmVudCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIENsaWNrOiAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoTW91c2VJbigxODE1LCA3NSwgOTAsIDkwKSkge1xyXG4gICAgICAgICAgKDxhbnk+d2luZG93KVtgJHtzY3JlZW4uaWR9RXhpdGBdKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENsaWNrPy4oZXZlbnQpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICAoPGFueT53aW5kb3cpW2Ake3NjcmVlbi5pZH1TY3JlZW5GdW5jdGlvbnNgXSA9IGluamVjdGVkU2NyZWVuRnVuY3Rpb25zO1xyXG5cclxuICAgIE9iamVjdC5lbnRyaWVzKGluamVjdGVkU2NyZWVuRnVuY3Rpb25zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgKDxhbnk+d2luZG93KVtgJHtzY3JlZW4uaWR9JHtrZXl9YF0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBhYmNsUGxheWVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvcGxheWVyL3BsYXllclwiO1xyXG5pbXBvcnQgeyBnZXRDaGFyYWN0ZXIsIGdldENoYXJhY3Rlck5hbWUgfSBmcm9tIFwiLi4vLi4vY29yZS9wbGF5ZXIvcGxheWVyVXRpbHNcIjtcclxuaW1wb3J0IHsgb3ZlcmxheSB9IGZyb20gXCIuLi8uLi9jb3JlL3BsYXllci91aVwiO1xyXG5pbXBvcnQgeyBzeW5jRGF0YSB9IGZyb20gXCIuLi8uLi9jb3JlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IGdldEVsZW1lbnQgfSBmcm9tIFwiLi4vLi4vY29yZS91dGlsc1wiO1xyXG5pbXBvcnQgeyBNb2ROYW1lIH0gZnJvbSBcIi4uLy4uL3R5cGVzL2RlZmluaXRpb25zXCI7XHJcblxyXG5jb25zdCBodG1sU2V0dGluZ1BhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5odG1sU2V0dGluZ1BhZ2UuY2xhc3NMaXN0LmFkZChgJHttb2RJZGVudGlmaWVyfVNldHRpbmdQYWdlYCwgYCR7bW9kSWRlbnRpZmllcn1IaWRkZW5gKTtcclxuXHJcbmNvbnN0IHVwZGF0ZVJlbW90ZUxpc3QgPSAobGlzdDogSFRNTEVsZW1lbnQpID0+IHtcclxuICBpZiAoISg8YW55PndpbmRvdyk/LkxJVFRMSVNIX0NMVUIpIHJldHVybjtcclxuICBjb25zdCBjYXJlZ2l2ZXJzID0gd2luZG93LkxJVFRMSVNIX0NMVUIuZ2V0Q2FyZWdpdmVyc09mKFBsYXllcik7XHJcbiAgbGlzdC5pbm5lckhUTUwgPSBDaGF0Um9vbUNoYXJhY3Rlci5maWx0ZXIoXHJcbiAgICBjaGFyYWN0ZXIgPT4gY2hhcmFjdGVyLkFCQ0wgJiYgY2hhcmFjdGVyLk1lbWJlck51bWJlciAhPT0gUGxheWVyLk1lbWJlck51bWJlciAmJiBjYXJlZ2l2ZXJzLmluY2x1ZGVzKFBsYXllci5NZW1iZXJOdW1iZXIhKSxcclxuICApXHJcbiAgICAubWFwKGNoYXJhY3RlciA9PiBgPHNsLW9wdGlvbiB2YWx1ZT1cIiR7Y2hhcmFjdGVyLk1lbWJlck51bWJlcn1cIj4ke2dldENoYXJhY3Rlck5hbWUoY2hhcmFjdGVyLk1lbWJlck51bWJlcil9PC9zbC1vcHRpb24+YClcclxuICAgIC5qb2luKFwiXCIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRTZXR0aW5nc1NjcmVlbiA9IGFzeW5jICgpID0+IHtcclxuICBodG1sU2V0dGluZ1BhZ2UuaW5uZXJIVE1MID0gYDxzbC10YWItZ3JvdXA+XHJcbiAgPHNsLXRhYiBzbG90PVwibmF2XCIgcGFuZWw9XCJnZW5lcmFsXCI+R2VuZXJhbDwvc2wtdGFiPlxyXG4gIDxzbC10YWIgc2xvdD1cIm5hdlwiIHBhbmVsPVwicmVtb3RlXCI+UmVtb3RlPC9zbC10YWI+XHJcbiAgPHNsLXRhYi1wYW5lbCBuYW1lPVwiZ2VuZXJhbFwiPlxyXG4gICAgPHNsLXJhZGlvLWdyb3VwIGNsYXNzPVwiJHttb2RJZGVudGlmaWVyfVBlZU1ldGFib2xpc21TZWxlY3RcIiBsYWJlbD1cIlNlbGVjdCBQZWUgTWV0YWJvbGlzbVwiIG5hbWU9XCJwZWUtbWV0YWJvbGlzbVwiIHZhbHVlPVwiJHtcclxuICAgIGFiY2xQbGF5ZXIuc2V0dGluZ3MuUGVlTWV0YWJvbGlzbVxyXG4gIH1cIj5cclxuICAgIDxzbC1yYWRpby1idXR0b24gdmFsdWU9XCJEaXNhYmxlZFwiPkRpc2FibGVkPC9zbC1yYWRpby1idXR0b24+XHJcbiAgICA8c2wtcmFkaW8tYnV0dG9uIHZhbHVlPVwiU2xvd1wiPlNsb3c8L3NsLXJhZGlvLWJ1dHRvbj5cclxuICAgIDxzbC1yYWRpby1idXR0b24gdmFsdWU9XCJOb3JtYWxcIj5Ob3JtYWw8L3NsLXJhZGlvLWJ1dHRvbj5cclxuICAgIDxzbC1yYWRpby1idXR0b24gdmFsdWU9XCJGYXN0XCI+RmFzdDwvc2wtcmFkaW8tYnV0dG9uPlxyXG4gICAgPHNsLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIkZhc3RlclwiPkZhc3Rlcjwvc2wtcmFkaW8tYnV0dG9uPlxyXG4gICAgPHNsLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIkZhc3Rlc3RcIj5GYXN0ZXN0PC9zbC1yYWRpby1idXR0b24+XHJcbiAgICA8L3NsLXJhZGlvLWdyb3VwPlxyXG5cclxuICAgIDxzbC1yYWRpby1ncm91cCBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1Qb29wTWV0YWJvbGlzbVNlbGVjdFwiIGxhYmVsPVwiU2VsZWN0IFBvb3AgTWV0YWJvbGlzbVwiIG5hbWU9XCJwb29wLW1ldGFib2xpc21cIiB2YWx1ZT1cIiR7XHJcbiAgICBhYmNsUGxheWVyLnNldHRpbmdzLlBvb3BNZXRhYm9saXNtXHJcbiAgfVwiPlxyXG4gICAgPHNsLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIkRpc2FibGVkXCI+RGlzYWJsZWQ8L3NsLXJhZGlvLWJ1dHRvbj5cclxuICAgIDxzbC1yYWRpby1idXR0b24gdmFsdWU9XCJTbG93XCI+U2xvdzwvc2wtcmFkaW8tYnV0dG9uPlxyXG4gICAgPHNsLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIk5vcm1hbFwiPk5vcm1hbDwvc2wtcmFkaW8tYnV0dG9uPlxyXG4gICAgPHNsLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIkZhc3RcIj5GYXN0PC9zbC1yYWRpby1idXR0b24+XHJcbiAgICA8c2wtcmFkaW8tYnV0dG9uIHZhbHVlPVwiRmFzdGVyXCI+RmFzdGVyPC9zbC1yYWRpby1idXR0b24+XHJcbiAgICA8c2wtcmFkaW8tYnV0dG9uIHZhbHVlPVwiRmFzdGVzdFwiPkZhc3Rlc3Q8L3NsLXJhZGlvLWJ1dHRvbj5cclxuICAgIDwvc2wtcmFkaW8tZ3JvdXA+XHJcblxyXG4gICAgPHNsLXJhZGlvLWdyb3VwIGNsYXNzPVwiJHttb2RJZGVudGlmaWVyfU9uRGlhcGVyQ2hhbmdlU2VsZWN0XCIgbGFiZWw9XCJTZWxlY3QgT24gRGlhcGVyIENoYW5nZVwiIG5hbWU9XCJvbi1kaWFwZXItY2hhbmdlXCIgdmFsdWU9XCIke1xyXG4gICAgYWJjbFBsYXllci5zZXR0aW5ncy5PbkRpYXBlckNoYW5nZVxyXG4gIH1cIj5cclxuICAgIDxzbC1yYWRpby1idXR0b24gdmFsdWU9XCJEZW55XCI+RGVueTwvc2wtcmFkaW8tYnV0dG9uPlxyXG4gICAgPHNsLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIkFza1wiPkFzazwvc2wtcmFkaW8tYnV0dG9uPlxyXG4gICAgPHNsLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIkFsbG93XCI+QWxsb3c8L3NsLXJhZGlvLWJ1dHRvbj5cclxuICAgIDwvc2wtcmFkaW8tZ3JvdXA+XHJcbiAgXHJcbiAgPGgxIGNsYXNzPVwiJHttb2RJZGVudGlmaWVyfU1lc3NhZ2VWaXNpYmlsaXR5XCI+IE1lc3NhZ2UgdmlzaWJpbGl0eSBmb3Igb3RoZXJzOiA8L2gxPlxyXG4gIDxkaXYgc3R5bGU9XCJtYXJnaW4tbGVmdDogMWVtO1wiPiBcclxuICAgIDxzbC1jaGVja2JveCBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1DaGFuZ2VEaWFwZXJWaXNpYmlsaXR5XCIgbmFtZT1cImNoYW5nZS1kaWFwZXItdmlzaWJpbGl0eVwiIGNoZWNrZWQ9XCIke2FiY2xQbGF5ZXIuc2V0dGluZ3MuZ2V0UHVibGljTWVzc2FnZShcclxuICAgIFwiY2hhbmdlRGlhcGVyXCIsXHJcbiAgKX1cIj5DaGFuZ2UgRGlhcGVyPC9zbC1jaGVja2JveD5cclxuICAgIDxzbC1jaGVja2JveCBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1DaGVja0RpYXBlclZpc2liaWxpdHlcIiBuYW1lPVwiY2hlY2stZGlhcGVyLXZpc2liaWxpdHlcIiBjaGVja2VkPVwiJHthYmNsUGxheWVyLnNldHRpbmdzLmdldFB1YmxpY01lc3NhZ2UoXHJcbiAgICBcImNoZWNrRGlhcGVyXCIsXHJcbiAgKX1cIj5DaGVjayBEaWFwZXI8L3NsLWNoZWNrYm94PlxyXG4gICAgPHNsLWNoZWNrYm94IGNsYXNzPVwiJHttb2RJZGVudGlmaWVyfUxpY2tQdWRkbGVWaXNpYmlsaXR5XCIgbmFtZT1cImxpY2stcHVkZGxlLXZpc2liaWxpdHlcIiBjaGVja2VkPVwiJHthYmNsUGxheWVyLnNldHRpbmdzLmdldFB1YmxpY01lc3NhZ2UoXHJcbiAgICBcImxpY2tQdWRkbGVcIixcclxuICApfVwiPkxpY2sgUHVkZGxlPC9zbC1jaGVja2JveD5cclxuICAgIDxzbC1jaGVja2JveCBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1XZXREaWFwZXJWaXNpYmlsaXR5XCIgbmFtZT1cIndldC1kaWFwZXItdmlzaWJpbGl0eVwiIGNoZWNrZWQ9XCIke2FiY2xQbGF5ZXIuc2V0dGluZ3MuZ2V0UHVibGljTWVzc2FnZShcclxuICAgIFwid2V0RGlhcGVyXCIsXHJcbiAgKX1cIj5XZXQgRGlhcGVyPC9zbC1jaGVja2JveD5cclxuICAgIDxzbC1jaGVja2JveCBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1XZXRDbG90aGluZ1Zpc2liaWxpdHlcIiBuYW1lPVwid2V0LWNsb3RoaW5nLXZpc2liaWxpdHlcIiBjaGVja2VkPVwiJHthYmNsUGxheWVyLnNldHRpbmdzLmdldFB1YmxpY01lc3NhZ2UoXHJcbiAgICBcIndldENsb3RoaW5nXCIsXHJcbiAgKX1cIj5XZXQgQ2xvdGhpbmc8L3NsLWNoZWNrYm94PlxyXG4gICAgPHNsLWNoZWNrYm94IGNsYXNzPVwiJHttb2RJZGVudGlmaWVyfVNvaWxEaWFwZXJWaXNpYmlsaXR5XCIgbmFtZT1cInNvaWwtZGlhcGVyLXZpc2liaWxpdHlcIiBjaGVja2VkPVwiJHthYmNsUGxheWVyLnNldHRpbmdzLmdldFB1YmxpY01lc3NhZ2UoXHJcbiAgICBcInNvaWxEaWFwZXJcIixcclxuICApfVwiPlNvaWwgRGlhcGVyPC9zbC1jaGVja2JveD5cclxuICAgIDxzbC1jaGVja2JveCBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1Tb2lsQ2xvdGhpbmdWaXNpYmlsaXR5XCIgbmFtZT1cInNvaWwtY2xvdGhpbmctdmlzaWJpbGl0eVwiIGNoZWNrZWQ9XCIke2FiY2xQbGF5ZXIuc2V0dGluZ3MuZ2V0UHVibGljTWVzc2FnZShcclxuICAgIFwic29pbENsb3RoaW5nXCIsXHJcbiAgKX1cIj5Tb2lsIENsb3RoaW5nPC9zbC1jaGVja2JveD5cclxuICAgIDxzbC1jaGVja2JveCBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1Vc2VQb3R0eVZpc2liaWxpdHlcIiBuYW1lPVwidXNlLXBvdHR5LXZpc2liaWxpdHlcIiBjaGVja2VkPVwiJHthYmNsUGxheWVyLnNldHRpbmdzLmdldFB1YmxpY01lc3NhZ2UoXHJcbiAgICBcInVzZVBvdHR5XCIsXHJcbiAgKX1cIj5Vc2UgUG90dHk8L3NsLWNoZWNrYm94PlxyXG4gICAgPHNsLWNoZWNrYm94IGNsYXNzPVwiJHttb2RJZGVudGlmaWVyfVVzZVRvaWxldFZpc2liaWxpdHlcIiBuYW1lPVwidXNlLXRvaWxldC12aXNpYmlsaXR5XCIgY2hlY2tlZD1cIiR7YWJjbFBsYXllci5zZXR0aW5ncy5nZXRQdWJsaWNNZXNzYWdlKFxyXG4gICAgXCJ1c2VUb2lsZXRcIixcclxuICApfVwiPlVzZSBUb2lsZXQ8L3NsLWNoZWNrYm94PlxyXG4gICAgPHNsLWNoZWNrYm94IGNsYXNzPVwiJHttb2RJZGVudGlmaWVyfVdpcGVQdWRkbGVWaXNpYmlsaXR5XCIgbmFtZT1cIndpcGUtcHVkZGxlLXZpc2liaWxpdHlcIiBjaGVja2VkPVwiJHthYmNsUGxheWVyLnNldHRpbmdzLmdldFB1YmxpY01lc3NhZ2UoXHJcbiAgICBcIndpcGVQdWRkbGVcIixcclxuICApfVwiPldpcGUgUHVkZGxlPC9zbC1jaGVja2JveD5cclxuICA8L2Rpdj5cclxuICA8L3NsLXRhYi1wYW5lbD5cclxuXHJcbiAgPHNsLXRhYi1wYW5lbCBuYW1lPVwicmVtb3RlXCI+XHJcbiAgICAke1xyXG4gICAgICAvKiA8c2wtc2VsZWN0IGNsYXNzPVwiJHttb2RJZGVudGlmaWVyfVJlbW90ZVBsYXllclNlbGVjdFwiIGxhYmVsPVwiU2VsZWN0IFBsYXllclwiIG5hbWU9XCJwbGF5ZXJcIiB2YWx1ZT1cIlwiPlxyXG4gICAgPC9zbC1zZWxlY3Q+XHJcbiAgICA8c2wtYnV0dG9uIGNsYXNzPVwiJHttb2RJZGVudGlmaWVyfVJlZnJlc2hSZW1vdGVzXCI+UmVmcmVzaCBSZW1vdGVzPC9zbC1idXR0b24+XHJcbiAgICA8c2wtdGFiLWdyb3VwPlxyXG4gICAgICA8c2wtdG9vbHRpcCBjb250ZW50PVwiQXR0ZW1wdHMgdG8gdXBkYXRlIHRoZSBzZWxlY3RlZCBwbGF5ZXIncyBzZXR0aW5nc1wiIHBsYWNlbWVudD1cInJpZ2h0LXN0YXJ0XCI+XHJcbiAgICAgICAgPHNsLWJ1dHRvbiBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1SZW1vdGVQdXNoU2V0dGluZ3NcIj5QdXNoIFNldHRpbmdzPC9zbC1idXR0b24+XHJcbiAgICAgIDwvc2wtdG9vbHRpcD5cclxuICAgICAgPHNsLXRhYiBzbG90PVwibmF2XCIgcGFuZWw9XCJnZW5lcmFsXCI+R2VuZXJhbDwvc2wtdGFiPlxyXG4gICAgICBcclxuICAgICAgPHNsLXRhYi1wYW5lbCBuYW1lPVwiZ2VuZXJhbFwiPlxyXG4gICAgICAgIDxzbC1yYWRpby1ncm91cCBjbGFzcz1cIiR7bW9kSWRlbnRpZmllcn1SZW1vdGVQZWVNZXRhYm9saXNtU2VsZWN0XCIgbGFiZWw9XCJTZWxlY3QgUGVlIE1ldGFib2xpc21cIiBuYW1lPVwicGVlLW1ldGFib2xpc21cIiB2YWx1ZT1cIiR7YWJjbFBsYXllci5zZXR0aW5ncy5QZWVNZXRhYm9saXNtfVwiPlxyXG4gICAgICAgIDxzbC1yYWRpby1idXR0b24gdmFsdWU9XCJEaXNhYmxlZFwiPkRpc2FibGVkPC9zbC1yYWRpby1idXR0b24+XHJcbiAgICAgICAgPHNsLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIlNsb3dcIj5TbG93PC9zbC1yYWRpby1idXR0b24+XHJcbiAgICAgICAgPHNsLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIk5vcm1hbFwiPk5vcm1hbDwvc2wtcmFkaW8tYnV0dG9uPlxyXG4gICAgICAgIDxzbC1yYWRpby1idXR0b24gdmFsdWU9XCJGYXN0XCI+RmFzdDwvc2wtcmFkaW8tYnV0dG9uPlxyXG4gICAgICAgIDxzbC1yYWRpby1idXR0b24gdmFsdWU9XCJGYXN0ZXJcIj5GYXN0ZXI8L3NsLXJhZGlvLWJ1dHRvbj5cclxuICAgICAgICA8c2wtcmFkaW8tYnV0dG9uIHZhbHVlPVwiRmFzdGVzdFwiPkZhc3Rlc3Q8L3NsLXJhZGlvLWJ1dHRvbj5cclxuICAgICAgICA8L3NsLXJhZGlvLWdyb3VwPlxyXG5cclxuICAgICAgICA8c2wtcmFkaW8tZ3JvdXAgY2xhc3M9XCIke21vZElkZW50aWZpZXJ9UmVtb3RlUG9vcE1ldGFib2xpc21TZWxlY3RcIiBsYWJlbD1cIlNlbGVjdCBQb29wIE1ldGFib2xpc21cIiBuYW1lPVwicG9vcC1tZXRhYm9saXNtXCIgdmFsdWU9XCIke2FiY2xQbGF5ZXIuc2V0dGluZ3MuUG9vcE1ldGFib2xpc219XCI+XHJcbiAgICAgICAgPHNsLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIkRpc2FibGVkXCI+RGlzYWJsZWQ8L3NsLXJhZGlvLWJ1dHRvbj5cclxuICAgICAgICA8c2wtcmFkaW8tYnV0dG9uIHZhbHVlPVwiU2xvd1wiPlNsb3c8L3NsLXJhZGlvLWJ1dHRvbj5cclxuICAgICAgICA8c2wtcmFkaW8tYnV0dG9uIHZhbHVlPVwiTm9ybWFsXCI+Tm9ybWFsPC9zbC1yYWRpby1idXR0b24+XHJcbiAgICAgICAgPHNsLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIkZhc3RcIj5GYXN0PC9zbC1yYWRpby1idXR0b24+XHJcbiAgICAgICAgPHNsLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIkZhc3RlclwiPkZhc3Rlcjwvc2wtcmFkaW8tYnV0dG9uPlxyXG4gICAgICAgIDxzbC1yYWRpby1idXR0b24gdmFsdWU9XCJGYXN0ZXN0XCI+RmFzdGVzdDwvc2wtcmFkaW8tYnV0dG9uPlxyXG4gICAgICAgIDwvc2wtcmFkaW8tZ3JvdXA+XHJcbiAgICAgICAgPHNsLXJhZGlvLWdyb3VwIGNsYXNzPVwiJHttb2RJZGVudGlmaWVyfVJlbW90ZU9uRGlhcGVyQ2hhbmdlU2VsZWN0XCIgbGFiZWw9XCJTZWxlY3QgT24gRGlhcGVyIENoYW5nZVwiIG5hbWU9XCJvbi1kaWFwZXItY2hhbmdlXCIgdmFsdWU9XCIke2FiY2xQbGF5ZXIuc2V0dGluZ3MuT25EaWFwZXJDaGFuZ2V9XCI+XHJcbiAgICAgICAgPHNsLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIkRlbnlcIj5EZW55PC9zbC1yYWRpby1idXR0b24+XHJcbiAgICAgICAgPHNsLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIkFza1wiPkFzazwvc2wtcmFkaW8tYnV0dG9uPlxyXG4gICAgICAgIDxzbC1yYWRpby1idXR0b24gdmFsdWU9XCJBbGxvd1wiPkFsbG93PC9zbC1yYWRpby1idXR0b24+XHJcbiAgICAgICAgPC9zbC1yYWRpby1ncm91cD4gKi8gXCJJbiBkZXZlbG9wbWVudFwiXHJcbiAgICB9XHJcbiAgICAgIDwvc2wtdGFiLXBhbmVsPlxyXG4gICAgPC9zbC10YWItZ3JvdXA+XHJcbiAgPC9zbC10YWItcGFuZWw+XHJcbjwvc2wtdGFiLWdyb3VwPlxyXG4gIGA7XHJcblxyXG4gIC8vIHJlbW90ZVxyXG4gIC8qICBjb25zdCByZW1vdGVQbGF5ZXJTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbCA9IGh0bWxTZXR0aW5nUGFnZS5xdWVyeVNlbGVjdG9yKGAuJHttb2RJZGVudGlmaWVyfVJlbW90ZVBsYXllclNlbGVjdGApO1xyXG4gIGNvbnN0IHJlZnJlc2hSZW1vdGVzOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGwgPSBodG1sU2V0dGluZ1BhZ2UucXVlcnlTZWxlY3RvcihgLiR7bW9kSWRlbnRpZmllcn1SZWZyZXNoUmVtb3Rlc2ApO1xyXG4gIGNvbnN0IHJlbW90ZVB1c2hTZXR0aW5nczogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsID0gaHRtbFNldHRpbmdQYWdlLnF1ZXJ5U2VsZWN0b3IoYC4ke21vZElkZW50aWZpZXJ9UmVtb3RlUHVzaFNldHRpbmdzYCk7XHJcbiAqL1xyXG4gIC8vIHJlbW90ZSBnZW5lcmFsXHJcbiAgLyogICBjb25zdCByZW1vdGVQZWVNZXRhYm9saXNtU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGwgPSBodG1sU2V0dGluZ1BhZ2UucXVlcnlTZWxlY3RvcihgLiR7bW9kSWRlbnRpZmllcn1SZW1vdGVQZWVNZXRhYm9saXNtU2VsZWN0YCk7XHJcbiAgY29uc3QgcmVtb3RlUG9vcE1ldGFib2xpc21TZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbCA9IGh0bWxTZXR0aW5nUGFnZS5xdWVyeVNlbGVjdG9yKGAuJHttb2RJZGVudGlmaWVyfVJlbW90ZVBvb3BNZXRhYm9saXNtU2VsZWN0YCk7XHJcbiAgY29uc3QgcmVtb3RlT25EaWFwZXJDaGFuZ2VTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbCA9IGh0bWxTZXR0aW5nUGFnZS5xdWVyeVNlbGVjdG9yKGAuJHttb2RJZGVudGlmaWVyfVJlbW90ZU9uRGlhcGVyQ2hhbmdlU2VsZWN0YCk7XHJcbiAqL1xyXG4gIC8vIGdlbmVyYWxcclxuICBjb25zdCBwZWVNZXRhYm9saXNtU2VsZWN0ID0gZ2V0RWxlbWVudChodG1sU2V0dGluZ1BhZ2UsIGAuJHttb2RJZGVudGlmaWVyfVBlZU1ldGFib2xpc21TZWxlY3RgKTtcclxuICBjb25zdCBwb29wTWV0YWJvbGlzbVNlbGVjdCA9IGdldEVsZW1lbnQoaHRtbFNldHRpbmdQYWdlLCBgLiR7bW9kSWRlbnRpZmllcn1Qb29wTWV0YWJvbGlzbVNlbGVjdGApO1xyXG4gIGNvbnN0IG9uRGlhcGVyQ2hhbmdlU2VsZWN0ID0gZ2V0RWxlbWVudChodG1sU2V0dGluZ1BhZ2UsIGAuJHttb2RJZGVudGlmaWVyfU9uRGlhcGVyQ2hhbmdlU2VsZWN0YCk7XHJcblxyXG4gIGNvbnN0IHZpc2liaWxpdHlFbGVtZW50czogUmVjb3JkPGtleW9mIE1vZFNldHRpbmdzW1widmlzaWJsZU1lc3NhZ2VzXCJdLCBFbGVtZW50PiA9IHtcclxuICAgIHVzZVRvaWxldDogZ2V0RWxlbWVudChodG1sU2V0dGluZ1BhZ2UsIGAuJHttb2RJZGVudGlmaWVyfVVzZVRvaWxldFZpc2liaWxpdHlgKSxcclxuICAgIHdpcGVQdWRkbGU6IGdldEVsZW1lbnQoaHRtbFNldHRpbmdQYWdlLCBgLiR7bW9kSWRlbnRpZmllcn1XaXBlUHVkZGxlVmlzaWJpbGl0eWApLFxyXG4gICAgY2hhbmdlRGlhcGVyOiBnZXRFbGVtZW50KGh0bWxTZXR0aW5nUGFnZSwgYC4ke21vZElkZW50aWZpZXJ9Q2hhbmdlRGlhcGVyVmlzaWJpbGl0eWApLFxyXG4gICAgY2hlY2tEaWFwZXI6IGdldEVsZW1lbnQoaHRtbFNldHRpbmdQYWdlLCBgLiR7bW9kSWRlbnRpZmllcn1DaGVja0RpYXBlclZpc2liaWxpdHlgKSxcclxuICAgIGxpY2tQdWRkbGU6IGdldEVsZW1lbnQoaHRtbFNldHRpbmdQYWdlLCBgLiR7bW9kSWRlbnRpZmllcn1MaWNrUHVkZGxlVmlzaWJpbGl0eWApLFxyXG4gICAgd2V0RGlhcGVyOiBnZXRFbGVtZW50KGh0bWxTZXR0aW5nUGFnZSwgYC4ke21vZElkZW50aWZpZXJ9V2V0RGlhcGVyVmlzaWJpbGl0eWApLFxyXG4gICAgd2V0Q2xvdGhpbmc6IGdldEVsZW1lbnQoaHRtbFNldHRpbmdQYWdlLCBgLiR7bW9kSWRlbnRpZmllcn1XZXRDbG90aGluZ1Zpc2liaWxpdHlgKSxcclxuICAgIHNvaWxEaWFwZXI6IGdldEVsZW1lbnQoaHRtbFNldHRpbmdQYWdlLCBgLiR7bW9kSWRlbnRpZmllcn1Tb2lsRGlhcGVyVmlzaWJpbGl0eWApLFxyXG4gICAgc29pbENsb3RoaW5nOiBnZXRFbGVtZW50KGh0bWxTZXR0aW5nUGFnZSwgYC4ke21vZElkZW50aWZpZXJ9U29pbENsb3RoaW5nVmlzaWJpbGl0eWApLFxyXG4gICAgdXNlUG90dHk6IGdldEVsZW1lbnQoaHRtbFNldHRpbmdQYWdlLCBgLiR7bW9kSWRlbnRpZmllcn1Vc2VQb3R0eVZpc2liaWxpdHlgKSxcclxuICB9O1xyXG5cclxuICAvLyBnZW5lcmFsXHJcbiAgcGVlTWV0YWJvbGlzbVNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwic2wtY2hhbmdlXCIsIChlOiBhbnkpID0+IHtcclxuICAgIGFiY2xQbGF5ZXIuc2V0dGluZ3MuUGVlTWV0YWJvbGlzbSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gIH0pO1xyXG4gIHBvb3BNZXRhYm9saXNtU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJzbC1jaGFuZ2VcIiwgKGU6IGFueSkgPT4ge1xyXG4gICAgYWJjbFBsYXllci5zZXR0aW5ncy5Qb29wTWV0YWJvbGlzbSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gIH0pO1xyXG4gIG9uRGlhcGVyQ2hhbmdlU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJzbC1jaGFuZ2VcIiwgKGU6IGFueSkgPT4ge1xyXG4gICAgYWJjbFBsYXllci5zZXR0aW5ncy5PbkRpYXBlckNoYW5nZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gIH0pO1xyXG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHZpc2liaWxpdHlFbGVtZW50cykgYXMgKGtleW9mIE1vZFNldHRpbmdzW1widmlzaWJsZU1lc3NhZ2VzXCJdKVtdKSB7XHJcbiAgICBpZiAodmlzaWJpbGl0eUVsZW1lbnRzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgdmlzaWJpbGl0eUVsZW1lbnRzW2tleV0uYWRkRXZlbnRMaXN0ZW5lcihcInNsLWNoYW5nZVwiLCAoZTogYW55KSA9PiB7XHJcbiAgICAgICAgYWJjbFBsYXllci5zZXR0aW5ncy5zZXRQdWJsaWNNZXNzYWdlKGtleSwgZS50YXJnZXQuY2hlY2tlZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gcmVtb3RlXHJcbiAgY29uc3QgdXBkYXRlU2VsZWN0ZWRSZW1vdGVQbGF5ZXIgPSAobWVtYmVyTnVtYmVyOiBNZW1iZXJOdW1iZXIpID0+IHtcclxuICAgIGNvbnN0IGNoYXJhY3RlcjogQ2hhcmFjdGVyIHwgdW5kZWZpbmVkID0gZ2V0Q2hhcmFjdGVyKG1lbWJlck51bWJlcik7XHJcbiAgICBpZiAoIWNoYXJhY3RlciB8fCAhY2hhcmFjdGVyLkFCQ0wpIHJldHVybjtcclxuXHJcbiAgICAvLyByZW1vdGVQZWVNZXRhYm9saXNtU2VsZWN0LnZhbHVlID0gY2hhcmFjdGVyLkFCQ0wuU2V0dGluZ3MuUGVlTWV0YWJvbGlzbTtcclxuICAgIC8vcmVtb3RlUG9vcE1ldGFib2xpc21TZWxlY3QudmFsdWUgPSBjaGFyYWN0ZXIuQUJDTC5TZXR0aW5ncy5Qb29wTWV0YWJvbGlzbTtcclxuICAgIC8vcmVtb3RlT25EaWFwZXJDaGFuZ2VTZWxlY3QudmFsdWUgPSBjaGFyYWN0ZXIuQUJDTC5TZXR0aW5ncy5PbkRpYXBlckNoYW5nZTtcclxuICB9O1xyXG4gIGNvbnN0IHB1c2hTZXR0aW5ncyA9IChtZW1iZXJOdW1iZXI6IE1lbWJlck51bWJlcikgPT4ge307XHJcblxyXG4gIC8qICAgcmVtb3RlUHVzaFNldHRpbmdzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBtZW1iZXJOdW1iZXIgPSBwYXJzZUludChyZW1vdGVQbGF5ZXJTZWxlY3QudmFsdWUsIDEwKTtcclxuICAgIGlmICghaXNOYU4obWVtYmVyTnVtYmVyKSkge1xyXG4gICAgICAvL3B1c2hTZXR0aW5ncyhtZW1iZXJOdW1iZXIpO1xyXG4gICAgfVxyXG4gIH0pOyAqL1xyXG4gIC8qICByZW1vdGVQbGF5ZXJTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcInNsLWNoYW5nZVwiLCAoZTogYW55KSA9PiB7XHJcbiAgICB1cGRhdGVTZWxlY3RlZFJlbW90ZVBsYXllcihwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApKTtcclxuICB9KTtcclxuICByZWZyZXNoUmVtb3Rlcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgdXBkYXRlUmVtb3RlTGlzdChyZW1vdGVQbGF5ZXJTZWxlY3QpO1xyXG4gIH0pOyAqL1xyXG5cclxuICBvdmVybGF5LmFwcGVuZENoaWxkKGh0bWxTZXR0aW5nUGFnZSk7XHJcbiAgUHJlZmVyZW5jZVJlZ2lzdGVyRXh0ZW5zaW9uU2V0dGluZyh7XHJcbiAgICBJZGVudGlmaWVyOiBtb2RJZGVudGlmaWVyLFxyXG4gICAgQnV0dG9uVGV4dDogYCR7TW9kTmFtZX0gU2V0dGluZ3NgLFxyXG4gICAgSW1hZ2U6IGAke3B1YmxpY1VSTH0vYWJjbC5wbmdgLFxyXG4gICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgIERyYXdCdXR0b24oMTgxNSwgNzUsIDkwLCA5MCwgXCJcIiwgXCJXaGl0ZVwiLCBcIkljb25zL0V4aXQucG5nXCIpO1xyXG4gICAgfSxcclxuICAgIGNsaWNrOiAoKSA9PiB7XHJcbiAgICAgIGlmIChNb3VzZUluKDE4MTUsIDc1LCA5MCwgOTApKSBQcmVmZXJlbmNlU3Vic2NyZWVuRXh0ZW5zaW9uc0V4aXQoKTtcclxuICAgIH0sXHJcbiAgICBleGl0OiAoKSA9PiB7XHJcbiAgICAgIGh0bWxTZXR0aW5nUGFnZS5jbGFzc0xpc3QuYWRkKGAke21vZElkZW50aWZpZXJ9SGlkZGVuYCk7XHJcbiAgICAgIHN5bmNEYXRhKCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIGxvYWQ6ICgpID0+IHtcclxuICAgICAgaHRtbFNldHRpbmdQYWdlLmNsYXNzTGlzdC5yZW1vdmUoYCR7bW9kSWRlbnRpZmllcn1IaWRkZW5gKTtcclxuXHJcbiAgICAgIC8qICAgIGxldCBzZWxlY3RlZENoYXJhY3RlcjogQ2hhcmFjdGVyIHwgdW5kZWZpbmVkID0gZ2V0Q2hhcmFjdGVyKHJlbW90ZVBsYXllclNlbGVjdC52YWx1ZSk7XHJcbiAgICAgIGlmICghc2VsZWN0ZWRDaGFyYWN0ZXIgfHwgIXNlbGVjdGVkQ2hhcmFjdGVyPy5BQkNMKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRDaGFyYWN0ZXIgPSBQbGF5ZXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVwZGF0ZVJlbW90ZUxpc3QocmVtb3RlUGxheWVyU2VsZWN0KTtcclxuICAgICAgLy8gZmlsbCBzZWxlY3QgQ2hhdFJvb21DaGFyYWN0ZXIgKi9cclxuXHJcbiAgICAgIHBlZU1ldGFib2xpc21TZWxlY3Quc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgYWJjbFBsYXllci5zZXR0aW5ncy5QZWVNZXRhYm9saXNtKTtcclxuICAgICAgcG9vcE1ldGFib2xpc21TZWxlY3Quc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgYWJjbFBsYXllci5zZXR0aW5ncy5Qb29wTWV0YWJvbGlzbSk7XHJcbiAgICAgIG9uRGlhcGVyQ2hhbmdlU2VsZWN0LnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGFiY2xQbGF5ZXIuc2V0dGluZ3MuT25EaWFwZXJDaGFuZ2UpO1xyXG4gICAgfSxcclxuICB9KTtcclxufTtcclxuIiwiLy8gZnJvbSBMU0NHIC0gaHR0cHM6Ly9naXRodWIuY29tL2xpdHRsZXNlcmEvTFNDRy9ibG9iLzgwNzJjNGQ2MzZhNjZiZjEyNDczODIzNzIyYWZiYzgyZmRhOGY5OGUvc3JjL01pbmlHYW1lcy9taW5pZ2FtZXMudHMjTDNDMS1MM0M4N1xyXG5cclxuaW1wb3J0IHsgaW5jb250aW5lbmNlT25BY2NpZGVudCB9IGZyb20gXCIuL3BsYXllci9kaWFwZXJcIjtcclxuaW1wb3J0IHsgYWJjbFBsYXllciB9IGZyb20gXCIuL3BsYXllci9wbGF5ZXJcIjtcclxuaW1wb3J0IHsgYmNNb2RTREssIHNlbmRDaGF0TG9jYWwgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5cclxuLy8gZm9yIG1pbmlnYW1lIHRleHQgbG9hZGluZ1xyXG5iY01vZFNESy5ob29rRnVuY3Rpb24oXCJUZXh0TG9hZFwiLCA1LCAoYXJncywgbmV4dCkgPT4ge1xyXG4gIGlmIChDdXJyZW50U2NyZWVuID09PSBcIldldE1pbmlnYW1lXCIgfHwgQ3VycmVudFNjcmVlbiA9PT0gXCJNZXNzTWluaWdhbWVcIikgcmV0dXJuO1xyXG4gIGVsc2UgcmV0dXJuIG5leHQoYXJncyk7XHJcbn0pO1xyXG5leHBvcnQgY29uc3QgaW5pdE1pbmlnYW1lcyA9ICgpID0+IHtcclxuICByZWdpc3Rlck1pbmlHYW1lKG5ldyBNZXNzTWluaWdhbWUoKSk7XHJcbiAgcmVnaXN0ZXJNaW5pR2FtZShuZXcgV2V0TWluaWdhbWUoKSk7XHJcbn07XHJcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1pbmlHYW1lPFQgZXh0ZW5kcyBCYXNlTWluaUdhbWU+KG1pbmlHYW1lOiBUKSB7XHJcbiAgdmFyIG5hbWUgPSBtaW5pR2FtZS5uYW1lO1xyXG4gIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJpbmcgbWluaWdhbWU6IFwiICsgbmFtZSk7XHJcbiAgKDxhbnk+d2luZG93KVtuYW1lICsgXCJSdW5cIl0gPSAoKSA9PiBtaW5pR2FtZS5SdW4oKTtcclxuICAoPGFueT53aW5kb3cpW25hbWUgKyBcIkNsaWNrXCJdID0gKCkgPT4gbWluaUdhbWUuQ2xpY2soKTtcclxuICAoPGFueT53aW5kb3cpW25hbWUgKyBcIkxvYWRcIl0gPSAoKSA9PiBtaW5pR2FtZS5Mb2FkKCk7XHJcbiAgKDxhbnk+d2luZG93KVtuYW1lICsgXCJVbmxvYWRcIl0gPSAoKSA9PiBtaW5pR2FtZS5VbmxvYWQoKTtcclxuICAoPGFueT53aW5kb3cpW25hbWUgKyBcIlJlc2l6ZVwiXSA9ICgpID0+IG1pbmlHYW1lLlJlc2l6ZSgpO1xyXG4gICg8YW55PndpbmRvdylbbmFtZSArIFwiS2V5RG93blwiXSA9ICgpID0+IG1pbmlHYW1lLktleURvd24oKTtcclxuICAoPGFueT53aW5kb3cpW25hbWUgKyBcIkV4aXRcIl0gPSAoKSA9PiBtaW5pR2FtZS5FeGl0KCk7XHJcbiAgKDxhbnk+d2luZG93KVtuYW1lICsgXCJFbmRcIl0gPSAodmljdG9yeTogYm9vbGVhbikgPT4gbWluaUdhbWUuRW5kKHZpY3RvcnkpO1xyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZU1pbmlHYW1lIHtcclxuICBuYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICBhYnN0cmFjdCBSdW4oKTogdm9pZDtcclxuICBhYnN0cmFjdCBDbGljaygpOiB2b2lkO1xyXG4gIExvYWQoKSB7fVxyXG4gIFVubG9hZCgpIHt9XHJcbiAgUmVzaXplKCkge31cclxuICBLZXlEb3duKCkge31cclxuICBFeGl0KCkge31cclxuICBFbmQodmljdG9yeTogYm9vbGVhbikge31cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFjY2lkZW50TWluaUdhbWUgZXh0ZW5kcyBCYXNlTWluaUdhbWUge1xyXG4gIHN0YXJ0VGV4dDogc3RyaW5nID0gXCJcIjtcclxuICBoaW50VGV4dDogc3RyaW5nID0gXCJcIjtcclxuICBmYWlsVGV4dDogc3RyaW5nID0gXCJcIjtcclxuICBzdWNjZXNzVGV4dDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgdGludENvbG9yID0gW3sgcjogMCwgZzogMCwgYjogMCwgYTogMCB9XTtcclxuXHJcbiAgR2FtZVN0YXJ0VGltZTogbnVtYmVyID0gMDtcclxuICBHYW1lRW5kVGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgU3RhcnREZWxheTogbnVtYmVyID0gNDAwMDtcclxuICBBY2NpZGVudFZlbG9jaXR5ID0gMDtcclxuICBBY2NpZGVudFBvc2l0aW9uID0gMDtcclxuICBBY2NpZGVudEFjY2VsZXJhdGlvbiA9IDA7XHJcbiAgQWNjaWRlbnRNYXhQb3NpdGlvbiA9IDEwMDtcclxuICBBY2NpZGVudEdhbWVEdXJhdGlvbiA9IDUwMDA7XHJcbiAgQWNjaWRlbnROZXh0VGljayA9IDA7XHJcbiAgQWNjaWRlbnRUZXh0ID0gXCJcIjtcclxuICBBY2NpZGVudENoYWxsZW5nZSA9IDA7XHJcblxyXG4gIEJhc2VHYW1lTGVuZ3RoOiBudW1iZXIgPSA2MDAwO1xyXG5cclxuICBFbmQoVmljdG9yeTogYm9vbGVhbikge1xyXG4gICAgQ29tbW9uU2V0U2NyZWVuKFwiT25saW5lXCIsIFwiQ2hhdFJvb21cIik7XHJcbiAgICBNaW5pR2FtZVZpY3RvcnkgPSBWaWN0b3J5O1xyXG4gICAgTWluaUdhbWVFbmRlZCA9IHRydWU7XHJcbiAgICBNaW5pR2FtZVRpbWVyID0gQ29tbW9uVGltZSgpO1xyXG4gICAgdGhpcy5HYW1lRW5kVGltZSA9IE1pbmlHYW1lVGltZXI7XHJcbiAgfVxyXG4gIGdldCBJc1N0YXJ0RGVsYXkoKSB7XHJcbiAgICByZXR1cm4gQ29tbW9uVGltZSgpIDwgdGhpcy5HYW1lU3RhcnRUaW1lO1xyXG4gIH1cclxuICBMb2FkKCk6IHZvaWQge1xyXG4gICAgRHJhd0ZsYXNoU2NyZWVuKFwiIzAwMDAwMFwiLCA3NTAsIDEwMDApO1xyXG5cclxuICAgIHRoaXMuR2FtZVN0YXJ0VGltZSA9IENvbW1vblRpbWUoKSArIHRoaXMuU3RhcnREZWxheTtcclxuICAgIHRoaXMuQWNjaWRlbnRWZWxvY2l0eSA9IDA7XHJcbiAgICB0aGlzLkFjY2lkZW50QWNjZWxlcmF0aW9uID0gMDtcclxuICAgIGlmICh0eXBlb2YgTWluaUdhbWVEaWZmaWN1bHR5ICE9IFwibnVtYmVyXCIpIHtcclxuICAgICAgTWluaUdhbWVUaW1lciA9IENvbW1vblRpbWUoKSArIHRoaXMuQmFzZUdhbWVMZW5ndGg7IC8vIDUgc2Vjb25kcyBiYXNlXHJcbiAgICAgIHRoaXMuQWNjaWRlbnRDaGFsbGVuZ2UgPSA1O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGRpZmZpY3VsdHlUaW1lQWRkID0gKE1pbmlHYW1lRGlmZmljdWx0eSAtIDgpICogMC4yNTtcclxuICAgICAgdGhpcy5BY2NpZGVudEdhbWVEdXJhdGlvbiA9IHRoaXMuQmFzZUdhbWVMZW5ndGggKyAxMDAwICogZGlmZmljdWx0eVRpbWVBZGQ7XHJcbiAgICAgIE1pbmlHYW1lVGltZXIgPSB0aGlzLkdhbWVTdGFydFRpbWUgKyB0aGlzLkFjY2lkZW50R2FtZUR1cmF0aW9uOyAvLyBPbmUgZXh0cmEgc2Vjb25kIHBlciBjaGFsbGVuZ2UgbGV2ZWwsIG1pbnVzIGEgdGhpcmQgb2YgYSBzZWNvbmQgcGVyIHdpbGxwb3dlci5cclxuICAgICAgdGhpcy5BY2NpZGVudENoYWxsZW5nZSA9IE1pbmlHYW1lRGlmZmljdWx0eTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLkFjY2lkZW50TWF4UG9zaXRpb24gPSA0MDA7XHJcbiAgICB0aGlzLkFjY2lkZW50UG9zaXRpb24gPSB0aGlzLkFjY2lkZW50TWF4UG9zaXRpb247XHJcblxyXG4gICAgY29uc29sZS5pbmZvKFwiQWNjaWRlbnQgbWluaWdhbWUgc3RhcnRlZDogZGlmZmljdWx0eSAtIFwiICsgdGhpcy5BY2NpZGVudENoYWxsZW5nZSArIFwiIHRpbWUgLSBcIiArIHRoaXMuQWNjaWRlbnRHYW1lRHVyYXRpb24pO1xyXG4gIH1cclxuICBnZXQgSXNHYW1lQWN0aXZlKCkge1xyXG4gICAgcmV0dXJuIENvbW1vblRpbWUoKSA8IE1pbmlHYW1lVGltZXIgJiYgIU1pbmlHYW1lRW5kZWQgJiYgIXRoaXMuR2FtZUZhaWxlZDtcclxuICB9XHJcblxyXG4gIGdldCBJc0dhbWVUaW1lb3V0KCkge1xyXG4gICAgcmV0dXJuIENvbW1vblRpbWUoKSA+PSBNaW5pR2FtZVRpbWVyICYmICFNaW5pR2FtZUVuZGVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IElzRW5kR2FtZVJlcG9ydCgpIHtcclxuICAgIHJldHVybiBDb21tb25UaW1lKCkgPCB0aGlzLkdhbWVFbmRUaW1lICsgNTAwMDtcclxuICB9XHJcblxyXG4gIGdldCBHYW1lRmFpbGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuQWNjaWRlbnRQb3NpdGlvbiA8PSAwO1xyXG4gIH1cclxuXHJcbiAgUnVuR2FtZShkZWx0YTogbnVtYmVyKSB7XHJcbiAgICB2YXIgdGltZUVsYXBzZWQgPSAodGhpcy5BY2NpZGVudEdhbWVEdXJhdGlvbiArIENvbW1vblRpbWUoKSAtIE1pbmlHYW1lVGltZXIpIC8gMTAwMDtcclxuXHJcbiAgICAvLyBBZGp1c3QgYWNjZWxlcmF0aW9uIGV2ZXJ5IC40cyB0aWNrc1xyXG4gICAgaWYgKENvbW1vblRpbWUoKSA+IHRoaXMuQWNjaWRlbnROZXh0VGljaykge1xyXG4gICAgICB0aGlzLkFjY2lkZW50TmV4dFRpY2sgPSBDb21tb25UaW1lKCkgKyA0MDA7XHJcbiAgICAgIHRoaXMuQWNjaWRlbnRBY2NlbGVyYXRpb24gPSAtKHRoaXMuQWNjaWRlbnRDaGFsbGVuZ2UgKiAxLjI1KSAtIHRpbWVFbGFwc2VkICogTWF0aC5yYW5kb20oKTtcclxuICAgIH1cclxuICAgIHRoaXMuQWNjaWRlbnRWZWxvY2l0eSA9IE1hdGgubWluKHRoaXMuQWNjaWRlbnRWZWxvY2l0eSwgdGhpcy5BY2NpZGVudFZlbG9jaXR5ICsgdGhpcy5BY2NpZGVudEFjY2VsZXJhdGlvbiAqIDAuMjUpO1xyXG4gICAgaWYgKHRoaXMuQWNjaWRlbnRQb3NpdGlvbiA+PSB0aGlzLkFjY2lkZW50TWF4UG9zaXRpb24pIHRoaXMuQWNjaWRlbnRWZWxvY2l0eSA9IE1hdGgubWluKDAsIHRoaXMuQWNjaWRlbnRWZWxvY2l0eSk7XHJcblxyXG4gICAgaWYgKHRoaXMuQWNjaWRlbnRQb3NpdGlvbiA+IDApIHtcclxuICAgICAgdGhpcy5BY2NpZGVudFBvc2l0aW9uICs9ICh0aGlzLkFjY2lkZW50VmVsb2NpdHkgLyAxMDAwKSAqIGRlbHRhICogMy41O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuQWNjaWRlbnRQb3NpdGlvbiA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuQWNjaWRlbnRQb3NpdGlvbiwgdGhpcy5BY2NpZGVudE1heFBvc2l0aW9uKSk7XHJcblxyXG4gICAgRHJhd1Byb2dyZXNzQmFyKDUwMCAtIHRoaXMuQWNjaWRlbnRNYXhQb3NpdGlvbiwgODAwLCAyICogdGhpcy5BY2NpZGVudE1heFBvc2l0aW9uLCA1MCwgMTAwICogKHRoaXMuQWNjaWRlbnRQb3NpdGlvbiAvIHRoaXMuQWNjaWRlbnRNYXhQb3NpdGlvbikpO1xyXG4gICAgRHJhd1RleHQodGhpcy5oaW50VGV4dCwgNTAwLCA4NzUsIFwid2hpdGVcIiwgXCJibGFja1wiKTtcclxuXHJcbiAgICAvLyB2YXIgZGVidWdTdHIgPSBcIkNoYWw6IFwiICsgdGhpcy5BY2NpZGVudENoYWxsZW5nZSArIFwiIFBvczogXCIgKyB0aGlzLkFjY2lkZW50UG9zaXRpb24gKyBcIiBWZWw6IFwiICsgdGhpcy5BY2NpZGVudFZlbG9jaXR5ICsgXCIgQWNjOiBcIiArIHRoaXMuQWNjaWRlbnRBY2NlbGVyYXRpb247XHJcbiAgICAvLyB2YXIgcHJldiA9IE1haW5DYW52YXMudGV4dEFsaWduO1xyXG4gICAgLy8gTWFpbkNhbnZhcy50ZXh0QWxpZ24gPSBcImxlZnRcIjtcclxuICAgIC8vIERyYXdUZXh0KGRlYnVnU3RyLCAwLCAxMDAsIFwiV2hpdGVcIiwgXCJCbGFja1wiKTtcclxuICAgIC8vIE1haW5DYW52YXMudGV4dEFsaWduID0gcHJldjtcclxuICAgIC8vIGNvbnNvbGUuaW5mbyhkZWJ1Z1N0cik7XHJcbiAgfVxyXG5cclxuICBSdW4oKSB7XHJcbiAgICBDaGF0Um9vbVJ1bihDb21tb25UaW1lKCkpO1xyXG5cclxuICAgIGlmICh0aGlzLklzU3RhcnREZWxheSkge1xyXG4gICAgICBEcmF3VGV4dCh0aGlzLnN0YXJ0VGV4dCwgNTAwLCA1MDAsIFwid2hpdGVcIiwgXCJibGFja1wiKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5Jc0dhbWVBY3RpdmUpIHtcclxuICAgICAgdGhpcy5SdW5HYW1lKFRpbWVyUnVuSW50ZXJ2YWwpO1xyXG4gICAgfSBlbHNlIGlmICgodGhpcy5Jc0dhbWVUaW1lb3V0IHx8IHRoaXMuR2FtZUZhaWxlZCkgJiYgIU1pbmlHYW1lRW5kZWQpIHtcclxuICAgICAgdGhpcy5FbmQodGhpcy5BY2NpZGVudFBvc2l0aW9uID4gMCk7XHJcbiAgICAgIE1pbmlHYW1lRW5kKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBDbGljaygpIHtcclxuICAgIC8vQ29tbW9uSXNNb2JpbGVcclxuICAgIGlmICh0aGlzLklzR2FtZUFjdGl2ZSkgdGhpcy5BY2NpZGVudFZlbG9jaXR5ID0gTWF0aC5tYXgodGhpcy5BY2NpZGVudFZlbG9jaXR5ICsgKGdldFJhbmRvbUludCgxMSkgKyA1KSwgMjApO1xyXG4gIH1cclxufVxyXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWF4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc01pbmlnYW1lIGV4dGVuZHMgQWNjaWRlbnRNaW5pR2FtZSB7XHJcbiAgc3RhcnRUZXh0OiBzdHJpbmcgPSBcIkEgc3VkZGVuIHByZXNzdXJlIGJ1aWxkcyB3aXRoaW4geW91Li4uXCI7XHJcbiAgaGludFRleHQ6IHN0cmluZyA9IFwiQ2xpY2sgdG8gbWFpbnRhaW4gY29udHJvbC4gS2VlcCBpdCB0b2dldGhlciFcIjtcclxuICBmYWlsVGV4dDogc3RyaW5nID0gXCJPb3BzISBZb3UndmUgaGFkIGFuIGFjY2lkZW50IVwiO1xyXG4gIHN1Y2Nlc3NUZXh0OiBzdHJpbmcgPSBcIkNyaXNpcyBhdmVydGVkISBZb3Ugc3RheWVkIGNvbXBvc2VkIVwiO1xyXG4gIG5hbWUgPSBcIk1lc3NNaW5pZ2FtZVwiO1xyXG4gIEVuZCh2aWN0b3J5OiBib29sZWFuKSB7XHJcbiAgICBzdXBlci5FbmQodmljdG9yeSk7XHJcbiAgICBpZiAodmljdG9yeSkge1xyXG4gICAgICBhYmNsUGxheWVyLnN0YXRzLkluY29udGluZW5jZSAtPSBpbmNvbnRpbmVuY2VPbkFjY2lkZW50KCkgLyAyO1xyXG4gICAgICBzZW5kQ2hhdExvY2FsKFwiWW91IG1hbmFnZWQgdG8ga2VlcCBpdCB0b2dldGhlciFcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBhYmNsUGxheWVyLnNvaWwoKTtcclxuICAgIGFiY2xQbGF5ZXIub25BY2NpZGVudCgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdldE1pbmlnYW1lIGV4dGVuZHMgQWNjaWRlbnRNaW5pR2FtZSB7XHJcbiAgc3RhcnRUZXh0OiBzdHJpbmcgPSBcIllvdSBmZWVsIGEgdHJpY2tsZSBzdGFydGluZy4uLlwiO1xyXG4gIGhpbnRUZXh0OiBzdHJpbmcgPSBcIkNsaWNrIHRvIHNxdWVlemUgdGlnaHQuIERvbid0IGxldCBpdCBnZXQgYXdheSFcIjtcclxuICBmYWlsVGV4dDogc3RyaW5nID0gXCJPaCBubyEgWW91IGxvc3QgY29udHJvbCFcIjtcclxuICBzdWNjZXNzVGV4dDogc3RyaW5nID0gXCJZb3UgaGVsZCBpdCBpbiEgUGhldyFcIjtcclxuICBuYW1lID0gXCJXZXRNaW5pZ2FtZVwiO1xyXG4gIEVuZCh2aWN0b3J5OiBib29sZWFuKSB7XHJcbiAgICBzdXBlci5FbmQodmljdG9yeSk7XHJcbiAgICBpZiAodmljdG9yeSkge1xyXG4gICAgICBhYmNsUGxheWVyLnN0YXRzLkluY29udGluZW5jZSAtPSBpbmNvbnRpbmVuY2VPbkFjY2lkZW50KCkgLyAyO1xyXG4gICAgICBzZW5kQ2hhdExvY2FsKFwiWW91IG1hbmFnZWQgdG8gaG9sZCBpdCBpbiFcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBhYmNsUGxheWVyLndldCgpO1xyXG4gICAgYWJjbFBsYXllci5vbkFjY2lkZW50KCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IGF2ZXJhZ2VDb2xvciB9IGZyb20gXCIuL3BsYXllci9kaWFwZXJcIjtcclxuaW1wb3J0IHsgY2xlYXJEYXRhLCB1cGRhdGVEYXRhLCBzeW5jRGF0YSB9IGZyb20gXCIuL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IHNlbmRDaGF0TG9jYWwgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG4oPGFueT53aW5kb3cpLmNsZWFyRGF0YSA9IGNsZWFyRGF0YTtcclxuKDxhbnk+d2luZG93KS5zYXZlRGF0YSA9IHN5bmNEYXRhO1xyXG4oPGFueT53aW5kb3cpLm11dGF0ZURhdGEgPSB1cGRhdGVEYXRhO1xyXG5cclxuKDxhbnk+d2luZG93KS5ub09wID0gKCkgPT4ge307XHJcbig8YW55PndpbmRvdykuc2VuZENoYXRMb2NhbCA9IHNlbmRDaGF0TG9jYWw7XHJcbig8YW55PndpbmRvdykuYXZlcmFnZUNvbG9yID0gYXZlcmFnZUNvbG9yO1xyXG5jb25zb2xlLmxvZyhhdmVyYWdlQ29sb3IoXCIjZmZmZmZmXCIsIFwiIzkyOGY2N1wiLCAwLjk5KSk7XHJcbiIsImltcG9ydCB7IHNlbmREYXRhVG9BY3Rpb24sIHNlbmRSZXF1ZXN0T3RoZXJEYXRhUGFja2V0LCBzZW5kVXBkYXRlTXlEYXRhIH0gZnJvbSBcIi4vaG9va3NcIjtcclxuaW1wb3J0IHsgaXNBQkNMUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyL3BsYXllclV0aWxzXCI7XHJcbmltcG9ydCB7IG92ZXJsYXkgfSBmcm9tIFwiLi9wbGF5ZXIvdWlcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0QXBpKCk6IHZvaWQge1xyXG4gICg8YW55PndpbmRvdylbYCR7bW9kSWRlbnRpZmllcn1gXSA9IHtcclxuICAgIGluTW9kU3Vic2NyZWVuOiAoKSA9PiBCb29sZWFuKG92ZXJsYXkucXVlcnlTZWxlY3RvcihgLiR7bW9kSWRlbnRpZmllcn1TZXR0aW5nUGFnZWApPy5jbGFzc0xpc3QuY29udGFpbnMoYCR7bW9kSWRlbnRpZmllcn1IaWRkZW5gKSksXHJcbiAgICBpc0FCQ0xQbGF5ZXIsXHJcbiAgICBzZW5kRGF0YVRvQWN0aW9uLFxyXG4gICAgc2VuZFVwZGF0ZU15RGF0YSxcclxuICAgIHNlbmRSZXF1ZXN0T3RoZXJEYXRhUGFja2V0LFxyXG5cclxuICAgIC8vXHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgdCBmcm9tXCJib25kYWdlLWNsdWItbW9kLXNka1wiO2NsYXNzIG97Y29uc3RydWN0b3IodCl7dGhpcy5ob29rTW5nPXQsdGhpcy53b3JrTGlzdD1bXX1ydW4odCxvKXtsZXQgbixpPSExO2Zvcihjb25zdCBzIG9mIHRoaXMud29ya0xpc3QpaWYoXCJpbmplY3RcIj09PXMudmFsdWUpcy53b3JrKHQsbyk7ZWxzZSBpZihcIm5leHRcIj09PXMudmFsdWUpbj1vKHQpLGk9ITA7ZWxzZSBpZihcIm92ZXJyaWRlXCI9PT1zLnZhbHVlKW49cy53b3JrKHQsbyksaT0hMDtlbHNlIGlmKFwiZmxhZ1wiPT09cy52YWx1ZSl7aWYoIXMuZmxhZylicmVhaztzLm9uY2UmJihzLmZsYWc9ITEpfWVsc2UgaWYoXCJjaGVja1wiPT09cy52YWx1ZSYmIXMud29yayh0LG8pKWJyZWFrO3JldHVybiBpP246byh0KX1uZXh0KCl7cmV0dXJuIHRoaXMud29ya0xpc3QucHVzaCh7dmFsdWU6XCJuZXh0XCJ9KSx0aGlzfWluamVjdCh0KXtyZXR1cm4gdGhpcy53b3JrTGlzdC5wdXNoKHt2YWx1ZTpcImluamVjdFwiLHdvcms6dH0pLHRoaXN9aW5zaWRlKHQse29uY2U6bz0hMSxwcmlvcml0eTpuPTF9PXt9KXtjb25zdCBpPXt2YWx1ZTpcImZsYWdcIixmbGFnOiExLG9uY2U6b307cmV0dXJuIHRoaXMuaG9va01uZy5ob29rRnVuY3Rpb24odCxuLCgodCxvKT0+e2kuZmxhZz0hMDtjb25zdCBuPW8odCk7cmV0dXJuIGkuZmxhZz0hMSxufSkpLHRoaXMud29ya0xpc3QucHVzaChpKSx0aGlzfXdoZW4odCl7cmV0dXJuIHRoaXMud29ya0xpc3QucHVzaCh7dmFsdWU6XCJjaGVja1wiLHdvcms6dH0pLHRoaXN9b3ZlcnJpZGUodCl7cmV0dXJuIHRoaXMud29ya0xpc3QucHVzaCh7dmFsdWU6XCJvdmVycmlkZVwiLHdvcms6dH0pLHRoaXN9fWxldCBuO2NsYXNzIGl7c3RhdGljIGluZm8odCl7bj8uaW5mbyh0KX1zdGF0aWMgd2Fybih0KXtuPy53YXJuKHQpfXN0YXRpYyBlcnJvcih0KXtuPy5lcnJvcih0KX19Y2xhc3Mgc3tjb25zdHJ1Y3Rvcih0PSExKXt0aGlzLmRvbmU9dCx0aGlzLmxpc3Q9W119cnVuKCl7Zm9yKHRoaXMuZG9uZT0hMDt0aGlzLmxpc3QubGVuZ3RoPjA7KXRoaXMubGlzdC5zaGlmdCgpKCl9cHVzaCh0KXt0aGlzLmRvbmU/dCgpOnRoaXMubGlzdC5wdXNoKHQpfX1jb25zdCByPW5ldyBzLGU9bmV3IHMsaD1uZXcgcyxsPW5ldyBzO2Z1bmN0aW9uIHUoKXtyZXR1cm4gbnVsbCE9Z2xvYmFsVGhpcy5QbGF5ZXImJlwibnVtYmVyXCI9PXR5cGVvZiBnbG9iYWxUaGlzLlBsYXllci5NZW1iZXJOdW1iZXJ9bGV0IGE7Y29uc3QgYz1uZXcgY2xhc3N7Z2V0IG1vZCgpe3JldHVybiBhfXB1c2godCxvKXt0LnB1c2gobyl9aW5pdChvKXthPXQucmVnaXN0ZXJNb2QobyksbC5ydW4oKSxlLnJ1bigpO2NvbnN0IG49KCk9PmgucnVuKCk7dSgpP24oKTp0aGlzLm1vZC5ob29rRnVuY3Rpb24oXCJMb2dpblJlc3BvbnNlXCIsMCwoKHQsbyk9PntvKHQpLHUoKSYmbigpfSkpLHIucnVuKCl9aW5pdFdpdGhNb2QodCl7YT10LGwucnVuKCksZS5ydW4oKTtjb25zdCBvPSgpPT5oLnJ1bigpO3UoKT9vKCk6dGhpcy5tb2QuaG9va0Z1bmN0aW9uKFwiTG9naW5SZXNwb25zZVwiLDAsKCh0LG4pPT57bih0KSx1KCkmJm8oKX0pKX1hZnRlckluaXQodCl7dGhpcy5wdXNoKHIsdCl9YWZ0ZXJQbGF5ZXJMb2dpbih0KXt0aGlzLnB1c2goaCx0KX1wYXRjaEZ1bmN0aW9uKHQsbyl7dGhpcy5wdXNoKGwsKCgpPT50aGlzLm1vZC5wYXRjaEZ1bmN0aW9uKHQsbykpKX1pbnZva2VPcmlnaW5hbCh0LC4uLm8pe3JldHVybiB0aGlzLm1vZD90aGlzLm1vZC5jYWxsT3JpZ2luYWwodCxvKTpnbG9iYWxUaGlzW3RdPy4oLi4ubyl9aG9va0Z1bmN0aW9uKHQsbyxuKXt0aGlzLnB1c2goZSwoKCk9PnRoaXMubW9kLmhvb2tGdW5jdGlvbih0LG8sbikpKX1wcm9ncmVzc2l2ZUhvb2sodCxuPTEpe2NvbnN0IGk9bmV3IG8odGhpcyk7cmV0dXJuIHRoaXMuaG9va0Z1bmN0aW9uKHQsbiwoKHQsbyk9PmkucnVuKHQsbykpKSxpfWhvb2tQbGF5ZXJGdW5jdGlvbih0LG8sbil7dmFyIGk7aT0oKT0+dGhpcy5tb2QuaG9va0Z1bmN0aW9uKHQsbyxuKSx1KCk/aC5wdXNoKGkpOmkoKX1nbG9iYWxGdW5jdGlvbih0LG8pe1wiZnVuY3Rpb25cIiE9dHlwZW9mIG8mJmkud2FybihcImdsb2JhbEZ1bmN0aW9uOiBwYXJhbSBpcyBub3QgYSBmdW5jdGlvblwiKSxudWxsPT1nbG9iYWxUaGlzW3RdP2dsb2JhbFRoaXNbdF09bzpnbG9iYWxUaGlzW3RdIT1vJiZpLndhcm4oYGdsb2JhbEZ1bmN0aW9uOiAke3R9IGlzIGFscmVhZHkgZGVmaW5lZGApfXJhbmRvbUdsb2JhbEZ1bmN0aW9uKHQsbyl7Y29uc3Qgbj10PT50K01hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygyKTtsZXQgaT1uKHQpO2Zvcig7bnVsbCE9Z2xvYmFsVGhpc1tpXTspaT1uKHQpO3JldHVybiBnbG9iYWxUaGlzW2ldPW8saX1zZXRMb2dnZXIodCl7IWZ1bmN0aW9uKHQpe249dH0odCl9fTtleHBvcnR7YyBhcyBIb29rTWFuYWdlcn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJpbXBvcnR7SG9va01hbmFnZXIgYXMgZX1mcm9tXCJAc3VnYXJjaC9iYy1tb2QtaG9vay1tYW5hZ2VyXCI7Y29uc3QgdD1uZXcgU2V0KFtcIkl0ZW1Ub3Jzb1wiLFwiSXRlbVRvcnNvMlwiXSksbj17SXRlbVRvcnNvOnQsSXRlbVRvcnNvMjp0fSxzPXt9LG89e307ZnVuY3Rpb24gYShlKXtyZXR1cm4obltlXSYmQXJyYXkuZnJvbShuW2VdKXx8W2VdKS5tYXAoKGU9PnIoZSkpKX1mdW5jdGlvbiByKGUpe3JldHVybntuYW1lOmUsZ3JvdXA6QXNzZXRHcm91cEdldChcIkZlbWFsZTNEQ0dcIixlKX19ZnVuY3Rpb24gaShlKXtyZXR1cm4gc1tlXX1jbGFzcyBje3N0YXRpYyBhZGQoZSl7Zm9yKGNvbnN0W3Qsbl1vZiBPYmplY3QuZW50cmllcyhlKSlmb3IoY29uc3RbZSxzXW9mIE9iamVjdC5lbnRyaWVzKG4pKWEodCkuZm9yRWFjaCgoKHtuYW1lOnR9KT0+e0Fzc2V0RmVtYWxlM0RDR0V4dGVuZGVkW3RdfHwoQXNzZXRGZW1hbGUzRENHRXh0ZW5kZWRbdF09e30pLEFzc2V0RmVtYWxlM0RDR0V4dGVuZGVkW3RdW2VdfHwoQXNzZXRGZW1hbGUzRENHRXh0ZW5kZWRbdF1bZV09cyl9KSl9c3RhdGljIGdldCB2YWx1ZSgpe3JldHVybiBBc3NldEZlbWFsZTNEQ0dFeHRlbmRlZH19Y29uc3QgbT17fTtjbGFzcyB1e3N0YXRpYyBhZGQoZSx0KXtyZXR1cm4gMD09PU9iamVjdC5rZXlzKG0pLmxlbmd0aCYmQXNzZXRGZW1hbGUzRENHLmZvckVhY2goKGU9PnttW2UuR3JvdXBdfHwobVtlLkdyb3VwXT17fSk7Zm9yKGNvbnN0IHQgb2YgZS5Bc3NldCl7Y29uc3Qgbj1sKHQpO21bZS5Hcm91cF1bbi5OYW1lXT1ufX0pKSxtW2VdfHwobVtlXT17fSksbVtlXVt0Lk5hbWVdPXQsbX1zdGF0aWMgZ2V0IHZhbHVlKCl7cmV0dXJuIG19fWZ1bmN0aW9uIGwoZSl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGU/e05hbWU6ZX06ZX1jb25zdCBmPXt9LHA9e30sZD0oZSx0KT0+cFtlXT8uW3RdO2Z1bmN0aW9uIGcoKXtyZXR1cm4gcH1mdW5jdGlvbiBBKCl7bGV0IHQ9ITE7ZS5wcm9ncmVzc2l2ZUhvb2soXCJEaWFsb2dJbnZlbnRvcnlCdWlsZFwiKS5pbmplY3QoKGU9PntlWzJdfHwodD0hMCl9KSksZS5wcm9ncmVzc2l2ZUhvb2soXCJEaWFsb2dJbnZlbnRvcnlBZGRcIikubmV4dCgpLmluamVjdCgoZT0+e2lmKCF0KXJldHVybjt0PSExO2NvbnN0IG49ZVsxXS5Bc3NldC5Hcm91cC5OYW1lLHM9bmV3IFNldChEaWFsb2dJbnZlbnRvcnkubWFwKChlPT5lLkFzc2V0Lk5hbWUpKSk7cFtuXSYmT2JqZWN0LmVudHJpZXMocFtuXSkuZmlsdGVyKCgoW2UsdF0pPT4hdC5Ob3RWaXNpYmxlT25TY3JlZW4/LmluY2x1ZGVzKFwiTHV6aVNjcmVlblwiKSYmIXMuaGFzKGUpKSkuZm9yRWFjaCgoKFt0LG5dKT0+RGlhbG9nSW52ZW50b3J5QWRkKGVbMF0se0Fzc2V0Om59LCExKSkpfSkpO2NvbnN0IG49KC4uLltlLHRdKT0+e2NvbnN0W24scyxvXT1lO3JldHVybiEhZChvLHMpfHx0KGUpfTtlLnByb2dyZXNzaXZlSG9vayhcIkludmVudG9yeUF2YWlsYWJsZVwiKS5pbnNpZGUoXCJDaGFyYWN0ZXJBcHBlYXJhbmNlVmFsaWRhdGVcIikub3ZlcnJpZGUobiksZS5wcm9ncmVzc2l2ZUhvb2soXCJJbnZlbnRvcnlBdmFpbGFibGVcIikuaW5zaWRlKFwiQ3JhZnRpbmdJdGVtTGlzdEJ1aWxkXCIpLm92ZXJyaWRlKG4pLGUucHJvZ3Jlc3NpdmVIb29rKFwiSW52ZW50b3J5QXZhaWxhYmxlXCIpLmluc2lkZShcIldhcmRyb2JlRmFzdExvYWRcIikub3ZlcnJpZGUobiksZS5wcm9ncmVzc2l2ZUhvb2soXCJDcmFmdGluZ1ZhbGlkYXRlXCIpLmluamVjdCgoZT0+e2NvbnN0IHQ9ZVswXT8uSXRlbTtpZighdClyZXR1cm47Y29uc3Qgbj1DcmFmdGluZ0Fzc2V0c1t0XT8uWzBdO24mJmZ1bmN0aW9uKGUsdCl7Y29uc3Qgbj1kKGUsdCk7cmV0dXJuISFuJiYhbi5Ob3RWaXNpYmxlT25TY3JlZW4/LmluY2x1ZGVzKFwiTHV6aVNjcmVlblwiKX0obi5Hcm91cC5OYW1lLG4uTmFtZSkmJihlWzNdPSExKX0pKTtjb25zdCBzPWUucmFuZG9tR2xvYmFsRnVuY3Rpb24oXCJDcmFmdGluZ0ludmVudG9yeVwiLCgoKT0+Wy4uLlBsYXllci5JbnZlbnRvcnksLi4uT2JqZWN0LnZhbHVlcyhwKS5tYXAoKGU9Pk9iamVjdC52YWx1ZXMoZSkpKS5mbGF0KCkubWFwKChlPT4oe0Fzc2V0OmV9KSkpXSkpO2UucGF0Y2hGdW5jdGlvbihcIkNyYWZ0aW5nUnVuXCIse1wiZm9yIChsZXQgSXRlbSBvZiBQbGF5ZXIuSW52ZW50b3J5KSB7XCI6YGZvciAobGV0IEl0ZW0gb2YgJHtzfSgpKSB7YH0pfWZ1bmN0aW9uIGgoZSl7cmV0dXJuISEoZSYmZS5Bc3NldCYmZChlLkFzc2V0Lkdyb3VwLk5hbWUsZS5Bc3NldC5OYW1lKSl9ZnVuY3Rpb24gTihlLHQpe2NvbnN0IG49XCJUV1wiIT09VHJhbnNsYXRpb25MYW5ndWFnZT9UcmFuc2xhdGlvbkxhbmd1YWdlOlwiQ05cIjtsZXQgcz1lKG4pO3JldHVybiB2b2lkIDAhPT1zP3M6KHM9XCJDTlwiPT09bj9lKFwiQ05cIik6ZShcIkVOXCIpfHxlKFwiQ05cIiksdm9pZCAwIT09cz9zOnQpfWZ1bmN0aW9uIHYoZSx0LG4pe3JldHVybiBOKChuPT5lW25dPy5bdF0pLG4pfWZ1bmN0aW9uIEcoZSl7cmV0dXJuIHQ9ZSxOKChlPT50W2VdKSxlLkNOKTt2YXIgdH1mdW5jdGlvbiBJKGUsdCl7cmV0dXJuIGU/ZS5DTj9lOnsuLi5lLENOOnR9OntDTjp0fX1mdW5jdGlvbiBDKGUsdCxuKXtjb25zdCBzPXt9O2Zvcihjb25zdFtvLGFdb2YgT2JqZWN0LmVudHJpZXMobikpYVtlXT8uW3RdJiYoc1tvXT1hW2VdW3RdKTtyZXR1cm4gc31jb25zdCB5PXt9LEQ9e307Y2xhc3MgJHtzdGF0aWMgc2V0QXNzZXQoZSx0LG4pe09iamVjdC5lbnRyaWVzKG4pLmZvckVhY2goKChbbixzXSk9Pntjb25zdCBvPW47eVtvXXx8KHlbb109e30pLHlbb11bZV18fCh5W29dW2VdPXt9KSx5W29dW2VdW3RdPXN9KSl9c3RhdGljIHNldEdyb3VwKGUsdCl7T2JqZWN0LmVudHJpZXModCkuZm9yRWFjaCgoKFt0LG5dKT0+e2NvbnN0IHM9dDtEW3NdfHwoRFtzXT17fSksRFtzXVtlXT1ufSkpfX1mdW5jdGlvbiBiKGUsdCl7cmV0dXJuIG49eSxzPWUsbz10LE4oKGU9Pm5bZV0/LltzXT8uW29dKSx0LnJlcGxhY2UoL18uKj9MdXppJC8sXCJcIikpO3ZhciBuLHMsb31mdW5jdGlvbiBGKGUsdCl7ZS5EZXNjcmlwdGlvbj10fWZ1bmN0aW9uIHcoKXtPYmplY3QudmFsdWVzKGYpLmZvckVhY2goKGU9PkYoZSxmdW5jdGlvbihlKXtyZXR1cm4gdihELGUsZS5yZXBsYWNlKC9fLio/THV6aSQvLFwiXCIpKX0oZS5OYW1lKSkpKSxPYmplY3QudmFsdWVzKGcoKSkubWFwKChlPT5PYmplY3QudmFsdWVzKGUpKSkuZmxhdCgpLmZvckVhY2goKGU9PkYoZSxiKGUuR3JvdXAuTmFtZSxlLk5hbWUpKSkpLE9iamVjdC5lbnRyaWVzKGcoKSkubWFwKCgoW2UsdF0pPT4oe2dyb3VwOmkoZSksYXNzZXQ6dH0pKSkuZmlsdGVyKCgoe2dyb3VwOmV9KT0+ISFlKSkubWFwKCgoe2dyb3VwOmUsYXNzZXQ6dH0pPT5PYmplY3QuZW50cmllcyh0KS5tYXAoKChbdCxuXSk9Pih7YXNzZXQ6bixmcm9tQXNzZXQ6QXNzZXRHZXQoXCJGZW1hbGUzRENHXCIsZSx0KX0pKSkpKS5mbGF0KCkuZmlsdGVyKCgoe2Zyb21Bc3NldDplfSk9PiEhZSkpLmZvckVhY2goKCh7YXNzZXQ6ZSxmcm9tQXNzZXQ6dH0pPT5GKGUsdC5EZXNjcmlwdGlvbikpKTtjb25zdCBlPVRleHRBbGxTY3JlZW5DYWNoZS5nZXQoQXNzZXRTdHJpbmdzUGF0aCksdD1lPT57Y29uc3QgdD1vLG49bmV3IFNldCxzPUFzc2V0R3JvdXAubWFwKChlPT5lLk5hbWUpKS5zb3J0KCgoZSx0KT0+dC5sZW5ndGgtZS5sZW5ndGgpKTtPYmplY3QuZW50cmllcyhlLmNhY2hlKS5mb3JFYWNoKCgoW28sYV0pPT57aWYobi5oYXMobykpcmV0dXJuO2NvbnN0IHI9cy5maW5kKChlPT5vLnN0YXJ0c1dpdGgoZSkpKTtpZighcilyZXR1cm47bi5hZGQobyk7Y29uc3QgaT10W3JdO2lmKCFpKXJldHVybjtjb25zdCBjPW8uc2xpY2Uoci5sZW5ndGgpO2kuZm9yRWFjaCgodD0+e2NvbnN0IG49dCtjO2UuY2FjaGVbbl18fChlLmNhY2hlW25dPWEpfSkpfSkpfTtlJiYoZS5sb2FkZWQ/dChlKTplLnJlYnVpbGRMaXN0ZW5lcnMucHVzaCgoZT0+ZSYmdChlKSkpKX1sZXQgRT0hMTtjb25zdCBMPW5ldyBNYXA7bGV0IGo7ZnVuY3Rpb24gTyhlLHQsbixzPSExKXtpZihqPy4oKT8uY2FjaGUpe2NvbnN0IG89VHJhbnNsYXRpb25MYW5ndWFnZTtpZihqKCkuY2FjaGVbZV0mJnMpcmV0dXJuO2ooKS5jYWNoZVtlXT10W29dfHx0LkNOfHxufWVsc2V7aWYocyYmTC5oYXMoZSkpcmV0dXJuO0wuc2V0KGUse2Rlc2M6dCxmYWxsYmFjazpuLG5vT3ZlcnJpZGU6c30pfX1jb25zdCBTPWU9PnQ9Pk9iamVjdC5lbnRyaWVzKGV8fHtDTjp7W3RdOnR9fSkubWFwKCgoW2Usbl0pPT5bZSxuW3RdfHxlXSkpLnJlZHVjZSgoKGUsW3Qsbl0pPT4oZVt0XT1uLGUpKSx7fSk7ZnVuY3Rpb24gVChlLHQse2VudHJpZXM6bixub092ZXJyaWRlOnN9PXt9KXtjb25zdCBvPVMobik7dC5MYXllcj8uZm9yRWFjaCgoKHtOYW1lOm59KT0+e24/TyhgJHtlfSR7dC5OYW1lfSR7bn1gLG8obiksbiwhIXMpOk8oYCR7ZX0ke3QuTmFtZX1gLHtDTjp0Lk5hbWUucmVwbGFjZSgvXy4qP0x1emkkLyxcIlwiKX0sdC5OYW1lLCEhcyl9KSl9bGV0IHg7Y2xhc3MgUHtzdGF0aWMgaW5mbyhlKXt4Py5pbmZvKGUpfXN0YXRpYyB3YXJuKGUpe3g/Lndhcm4oZSl9c3RhdGljIGVycm9yKGUpe3g/LmVycm9yKGUpfX1sZXQgXz0hMTtjb25zdCBrPVtdO2Z1bmN0aW9uIE0oZSl7Xz9lKCk6ay5wdXNoKGUpfWNvbnN0IEI9e307Y29uc3QgUj17fTtmdW5jdGlvbiBIKGUsdCl7Y29uc3Qgbj1Bc3NldEdyb3VwR2V0KFwiRmVtYWxlM0RDR1wiLGUpO18mJm4/dChuKTooUltlXXx8KFJbZV09W10pLFJbZV0ucHVzaCh0KSl9bGV0IFc9ITE7Y29uc3Qgej1bXTtmdW5jdGlvbiBVKGUpe1c/ZSgpOnoucHVzaChlKX1jb25zdCBWPW5ldyBTZXQ7ZnVuY3Rpb24gWCh0PXtzdGFydDpcIlN0YXJ0IGxvYWRpbmdcIixlbmQ6XCJMb2FkaW5nIGNvbXBsZXRlZCwgdGltZSB1c2FnZTogXCJ9KXtjb25zdCBuPSgpPT57UC5pbmZvKHQuc3RhcnQpO2NvbnN0IGU9RGF0ZS5ub3coKTtmb3IoIWZ1bmN0aW9uKCl7Zm9yKDtrLmxlbmd0aD4wOylrLnNoaWZ0KCkoKX0oKSxfPSEwLEFzc2V0R3JvdXAuZm9yRWFjaCgoZT0+ZnVuY3Rpb24oZSl7aWYoQltlLk5hbWVdKWZvcig7QltlLk5hbWVdLmxlbmd0aD4wOylCW2UuTmFtZV0uc2hpZnQoKShlKX0oZSkpKSxBc3NldEdyb3VwLmZvckVhY2goKGU9PmZ1bmN0aW9uKGUpe2lmKFJbZS5OYW1lXSlmb3IoO1JbZS5OYW1lXS5sZW5ndGg+MDspUltlLk5hbWVdLnNoaWZ0KCkoZSl9KGUpKSksQ3JhZnRpbmdBc3NldHM9Q3JhZnRpbmdBc3NldHNQb3B1bGF0ZSgpLFc9ITA7ei5sZW5ndGg+MDspei5zaGlmdCgpKCk7Y29uc3Qgbj1EYXRlLm5vdygpO1AuaW5mbyhgJHt0LmVuZH0gJHtuLWV9bXNgKX07QXNzZXRHcm91cC5sZW5ndGg+NTA/bigpOmUucHJvZ3Jlc3NpdmVIb29rKFwiQXNzZXRMb2FkQWxsXCIsMSkubmV4dCgpLmluamVjdCgoKCk9Pm4oKSkpfWZ1bmN0aW9uIFoodCxuLHtleHRlbmRlZENvbmZpZzpzLGRlc2NyaXB0aW9uOm8sZHluYW1pY05hbWU6aSxwcmVpbWFnZTptLG5vTWlycm9yOmZ9PXt9KXshZnVuY3Rpb24oZSx0KXtjb25zdCBuPUFzc2V0R3JvdXBHZXQoXCJGZW1hbGUzRENHXCIsZSk7XyYmbj90KG4pOihCW2VdfHwoQltlXT1bXSksQltlXS5wdXNoKHQpKX0odCwoZT0+e3UuYWRkKGUuTmFtZSxuKSxzJiZjLmFkZChzKX0pKTtjb25zdCBkPXQ7IWZ1bmN0aW9uKGUsdCxuKXtjb25zdCBzPW49Pntjb25zdCBvPXQ/W3IoZSldOmEoZSksaT1vLmZpbmQoKCh7Z3JvdXA6ZX0pPT4hZSkpO2lmKGkpcmV0dXJuIFYuaGFzKGkubmFtZSk/dm9pZCBjb25zb2xlLmVycm9yKGBbQXNzZXRNYW5hZ2VyXSBSZXF1aXJlZCBncm91cCBcIiR7aS5uYW1lfVwiIG5vdCBmb3VuZGApOihWLmFkZChpLm5hbWUpLHZvaWQgSChpLm5hbWUsKCgpPT5zKG4pKSkpO28uZm9yRWFjaCgoKHtncm91cDplfSk9Pm4oZSkpKX07Xz9zKG4pOkgoZSwoKCk9PnMobikpKX0odCwhIWYsKHQ9Pntjb25zdCBzPXQuTmFtZSxhPWwobikscj1Bc3NldFJlc29sdmVDb3B5Q29uZmlnLkFzc2V0RGVmaW5pdGlvbihhLHMsdS52YWx1ZSk7aWYoIXIpcmV0dXJuO2NvbnN0IGY9SShvLHIuTmFtZS5yZXBsYWNlKC9fLio/THV6aSQvLFwiXCIpKTt2b2lkIDAhPT1nKClbc10/LlthLk5hbWVdJiZjb25zb2xlLndhcm4oYFtBc3NldE1hbmFnZXJdIEFzc2V0IHske3N9OiR7YS5OYW1lfX0gYWxyZWFkeSBleGlzdGVkIWApLGZ1bmN0aW9uKC4uLlt0LG4sc10pe2UuaW52b2tlT3JpZ2luYWwoXCJBc3NldEFkZFwiLHQsbixzKTtjb25zdCBvPXQuTmFtZSxhPW4uTmFtZTtwW29dfHwocFtvXT17fSk7Y29uc3Qgcj1Bc3NldEdldChcIkZlbWFsZTNEQ0dcIixvLGEpO3JldHVybiByPyhwW29dW2FdPXIsUHJvbWlzZS5yZXNvbHZlKHIpKTpQcm9taXNlLnJlamVjdChgQXNzZXQgJHtvfToke2F9IG5vdCBmb3VuZGApfSh0LHIsYy52YWx1ZSkudGhlbigoZT0+e2lmKGUuRHluYW1pY0dyb3VwTmFtZT09PWUuR3JvdXAuTmFtZSYmKGUuRHluYW1pY0dyb3VwTmFtZT1pfHxkKSxtKXtjb25zdCB0PUFzc2V0R2V0KFwiRmVtYWxlM0RDR1wiLG0uTmFtZSxyLk5hbWUpO3QmJihlLkRlc2NyaXB0aW9uPXQuRGVzY3JpcHRpb24sZS5EeW5hbWljR3JvdXBOYW1lPXQuRHluYW1pY0dyb3VwTmFtZSxbXCJTY3JpcHREcmF3XCIsXCJCZWZvcmVEcmF3XCIsXCJBZnRlckRyYXdcIl0uZmlsdGVyKChlPT50W2BEeW5hbWljJHtlfWBdKSkuZm9yRWFjaCgoZT0+ZnVuY3Rpb24oZSx0LG4scyl7Y29uc3Qgbz1gQXNzZXRzJHt0fSR7bi5OYW1lfSR7c31gLGE9YEFzc2V0cyR7ZX0ke24uTmFtZX0ke3N9YDtnbG9iYWxUaGlzW29dJiYoZ2xvYmFsVGhpc1thXT1nbG9iYWxUaGlzW29dKX0ocyxtLk5hbWUscixlKSkpKX1lbHNlIGUuRGVzY3JpcHRpb249RyhmKSxUKGUuRHluYW1pY0dyb3VwTmFtZSxyLHtub092ZXJyaWRlOiEwfSl9KSksJC5zZXRBc3NldChzLHIuTmFtZSxmKX0pKX1jb25zdCBKPXt9O2Z1bmN0aW9uIFEodCx7ZGVzY3JpcHRpb246bixkeW5hbWljTmFtZTpzLHByZWltYWdlOm99PXt9KXtNKCgoKT0+e2NvbnN0IGE9SShuLHQuR3JvdXAucmVwbGFjZSgvXy4qP0x1emkkLyxcIlwiKSk7KGZ1bmN0aW9uKC4uLlt0LG5dKXtjb25zdCBzPWUuaW52b2tlT3JpZ2luYWwoXCJBc3NldEdyb3VwQWRkXCIsdCxuKTtyZXR1cm4gZltzLk5hbWVdPXMsUHJvbWlzZS5yZXNvbHZlKHMpfSkoXCJGZW1hbGUzRENHXCIsdCkudGhlbigoZT0+e2UuRGVzY3JpcHRpb249RyhhKSxzJiYoZS5EeW5hbWljR3JvdXBOYW1lPXMpLHQuQXNzZXQuZm9yRWFjaCgoZT0+e1oodC5Hcm91cCxsKGUpLHtkeW5hbWljTmFtZTpzLHByZWltYWdlOm99KX0pKX0pKSwkLnNldEdyb3VwKHQuR3JvdXAsYSl9KSl9Y29uc3QgcT1uZXcgU2V0O2Z1bmN0aW9uIEsoZSx0LGEpe2NvbnN0IHI9KCk9Pntjb25zdCBpPUFzc2V0RmVtYWxlM0RDRy5maW5kKChlPT5lLkdyb3VwPT09dCkpLGM9QXNzZXRHcm91cEdldChcIkZlbWFsZTNEQ0dcIix0KSxtPUFzc2V0RmVtYWxlM0RDR0V4dGVuZGVkW3RdO2lmKCFpfHwhYylyZXR1cm4gcS5oYXModCk/dm9pZCBjb25zb2xlLmVycm9yKGBbQXNzZXRNYW5hZ2VyXSBHcm91cCAke3R9IG5vdCBmb3VuZGApOihxLmFkZCh0KSx2b2lkIE0ocikpO3ZhciB1LGw7bD1lLG5bdT10XXx8KG5bdV09bmV3IFNldChbdV0pKSxuW3VdLmFkZChsKSxvW3VdfHwob1t1XT1uZXcgU2V0KSxvW3VdLmFkZChsKSxzW2xdPXU7Y29uc3QgZj1JKGEsZS5yZXBsYWNlKC9fLio/THV6aSQvLFwiXCIpKTtRKHsuLi5pLEdyb3VwOmUsRGVmYXVsdDohMSxSYW5kb206ITF9LHtkZXNjcmlwdGlvbjpmLGR5bmFtaWNOYW1lOmkuRHluYW1pY0dyb3VwTmFtZXx8aS5Hcm91cCxwcmVpbWFnZTpjfSksQXNzZXRGZW1hbGUzRENHRXh0ZW5kZWRbZV09bX07TShyKX1jb25zdCBZPXt9O2xldCBlZSx0ZT0hMTtsZXQgbmU9ITE7ZnVuY3Rpb24gc2UodCl7ZWU9dCxuZXx8KG5lPSEwLGUuaG9va0Z1bmN0aW9uKFwiVmFsaWRhdGlvblJlc29sdmVSZW1vdmVEaWZmXCIsMSwoKGUsdCk9Pntjb25zdFtuLHNdPWU7cmV0dXJuIXMuZnJvbU1vZFVzZXImJmQobi5Bc3NldC5Hcm91cC5OYW1lLG4uQXNzZXQuTmFtZSk/e2l0ZW06bix2YWxpZDohMX06dChlKX0pKSxlLmhvb2tGdW5jdGlvbihcIlZhbGlkYXRpb25SZXNvbHZlU3dhcERpZmZcIiwxLCgoZSx0KT0+e2NvbnN0W24scyxvXT1lO3JldHVybiFvLmZyb21Nb2RVc2VyJiZkKG4uQXNzZXQuR3JvdXAuTmFtZSxuLkFzc2V0Lk5hbWUpP3tpdGVtOm4sdmFsaWQ6ITF9OnQoZSl9KSksZS5ob29rRnVuY3Rpb24oXCJWYWxpZGF0aW9uUmVzb2x2ZUFwcGVhcmFuY2VEaWZmXCIsMSwoKGUsdCk9PihlZSYmKGVbM10uZnJvbU1vZFVzZXI9ZWUoZVszXSkpLHQoZSkpKSkpfWZ1bmN0aW9uIG9lKGUpe3JldHVybiBnbG9iYWxUaGlzW2VdfWNsYXNzIGFle3N0YXRpYyBfaW5pdFN0b3JhZ2UoKXt2YXIgZSx0O29lKHRoaXMuX25hbWVzcGFjZSl8fChlPXRoaXMuX25hbWVzcGFjZSx0PXt9LGdsb2JhbFRoaXNbZV09dCl9c3RhdGljIGdldChlLHQpe3RoaXMuX2luaXRTdG9yYWdlKCk7Y29uc3Qgbj1vZSh0aGlzLl9uYW1lc3BhY2UpO3JldHVybiBlIGluIG58fChuW2VdPXQoKSksbltlXX1zdGF0aWMgZ2V0TWF5T3ZlcnJpZGUoZSx0KXt0aGlzLl9pbml0U3RvcmFnZSgpO2NvbnN0IG49b2UodGhpcy5fbmFtZXNwYWNlKTtyZXR1cm4gbltlXT10KG5bZV0pLG5bZV19c3RhdGljIHNldChlLHQpe3RoaXMuX2luaXRTdG9yYWdlKCksb2UodGhpcy5fbmFtZXNwYWNlKVtlXT10fXN0YXRpYyBoYXMoZSl7cmV0dXJuIHRoaXMuX2luaXRTdG9yYWdlKCksZSBpbiBvZSh0aGlzLl9uYW1lc3BhY2UpfXN0YXRpYyBkZWxldGUoZSl7dGhpcy5faW5pdFN0b3JhZ2UoKTtjb25zdCB0PW9lKHRoaXMuX25hbWVzcGFjZSk7cmV0dXJuIGUgaW4gdCYmZGVsZXRlIHRbZV19c3RhdGljIHNldEltcGxlbWVudGF0aW9uKGUpe2NvbnN0IHQ9W1wiZ2V0XCIsXCJzZXRcIixcImhhc1wiLFwiZGVsZXRlXCJdO2Zvcihjb25zdCBuIG9mIHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGVbbl0pdGhyb3cgbmV3IEVycm9yKGBJbXBsZW1lbnRhdGlvbiBtdXN0IHByb3ZpZGUgYSAnJHtufScgZnVuY3Rpb25gKTthZVtuXT1lW25dfX1zdGF0aWMgY3JlYXRlTmFtZXNwYWNlKGUpe3JldHVybntnZXQ6KHQsbik9PmFlLmdldChgJHtlfS4ke3R9YCxuKSxzZXQ6KHQsbik9PmFlLnNldChgJHtlfS4ke3R9YCxuKSxoYXM6dD0+YWUuaGFzKGAke2V9LiR7dH1gKSxkZWxldGU6dD0+YWUuZGVsZXRlKGAke2V9LiR7dH1gKX19fWZ1bmN0aW9uIHJlKGUpe3JldHVybiBuZXcgUHJvbWlzZSgodD0+c2V0VGltZW91dCh0LGUpKSl9YWUuX25hbWVzcGFjZT1cIl9fQkNfTFVaSV9HTE9CQUxTX19cIixhZS5jcmVhdGVOYW1lc3BhY2UoXCJPbmNlRmxhZ1wiKTtjbGFzcyBpZXtzdGF0aWMgZ2V0IGVtcHR5SW1hZ2UoKXtyZXR1cm5cImRhdGE6aW1nL2pwZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVlBQUFBZkZjU0pBQUFBQ1hCSVdYTUFBQzRqQUFBdUl3RjRwVDkyQUFBQVxcbkczUkZXSFJUYjJaMGQyRnlaUUJEWld4emVYTWdVM1IxWkdsdklGUnZiMnpCcCtGOEFBQUFEVWxFUVZRSTEyUDQvLzgvQXdBSS9BTCtcXG5YSi9QMmdBQUFBQkpSVTVFcmtKZ2dnPT1cIn1zdGF0aWMgYXNzZXRQcmV2aWV3SWNvblBhdGgoZSl7Y29uc3QgdD1cIkFzc2V0XCJpbiBlP2UuQXNzZXQ6ZTtyZXR1cm5gJHtBc3NldEdldFByZXZpZXdQYXRoKHQpfS8ke3QuTmFtZX0ucG5nYH1zdGF0aWMgYWN0aXZpdHlQcmV2aWV3SWNvblBhdGgoZSl7cmV0dXJuYEFzc2V0cy9GZW1hbGUzRENHL0FjdGl2aXR5LyR7KFwiQWN0aXZpdHlcImluIGU/ZS5BY3Rpdml0eTplKS5OYW1lfS5wbmdgfX1jb25zdCBjZT1uZXcgY2xhc3N7Y29uc3RydWN0b3IoKXt0aGlzLmJhc2ljPXt9LHRoaXMuY3VzdG9tPXt9fWFkZEltZ01hcHBpbmcoZSl7dGhpcy5jdXN0b209ey4uLnRoaXMuY3VzdG9tLC4uLmV9fXNldEJhc2ljSW1nTWFwcGluZyhlKXt0aGlzLmJhc2ljPXsuLi5lLC4uLnRoaXMuYmFzaWN9fW1hcEltZ1NyYyhlKXtpZihcInN0cmluZ1wiIT10eXBlb2YgZSlyZXR1cm4gZTtpZighZS5lbmRzV2l0aChcIi5wbmdcIikpcmV0dXJuIGU7aWYoZS5zdGFydHNXaXRoKFwiZGF0YTppbWFnZVwiKSlyZXR1cm4gZTtpZihlLnN0YXJ0c1dpdGgoXCJodHRwXCIpKXJldHVybiBlO2NvbnN0IHQ9ZS5zdGFydHNXaXRoKFwiLi9cIik/ZS5zbGljZSgyKTplO2xldCBuPXQ7cmV0dXJuIHRoaXMuY3VzdG9tW25dJiYobj10aGlzLmN1c3RvbVtuXSksdGhpcy5iYXNpY1tuXSYmKG49dGhpcy5iYXNpY1tuXSksbiE9PXQ/bjplfW1hcEltZyhlLHQpe2xldCBuPWU7bi5zdGFydHNXaXRoKFwiZGF0YTppbWFnZVwiKXx8bi5zdGFydHNXaXRoKFwiaHR0cFwiKXx8KHRoaXMuY3VzdG9tW25dJiYobj10aGlzLmN1c3RvbVtuXSksdGhpcy5iYXNpY1tuXSYmKG49dGhpcy5iYXNpY1tuXSksbiE9PWUmJnQobikpfX07YXN5bmMgZnVuY3Rpb24gbWUoZSx0KXtjb25zdCBuPXt9LHM9W3tjb250YWluZXI6dCxwYXRoOlwiXCJ9XTtmb3IoO3MubGVuZ3RoPjA7KXtjb25zdCB0PXMucG9wKCk7T2JqZWN0LmVudHJpZXModC5jb250YWluZXIpLmZvckVhY2goKChbbyxhXSk9Pntjb25zdCByPWAke3QucGF0aH0ke299YDtcIm9iamVjdFwiIT10eXBlb2YgYT9uW3JdPWAke2V9JHtyfT92PSR7YX1gOnMucHVzaCh7Y29udGFpbmVyOmEscGF0aDpgJHtyfS9gfSl9KSl9cmV0dXJuIG59Y2xhc3MgdWV7Y29uc3RydWN0b3IoKXtlLnBhdGNoRnVuY3Rpb24oXCJHTERyYXdMb2FkSW1hZ2VcIix7XCJJbWcuc3JjID0gdXJsO1wiOidJbWcuY3Jvc3NPcmlnaW4gPSBcIkFub255bW91c1wiO1xcblxcdFxcdEltZy5zcmMgPSB1cmw7J30pLFtcIkRyYXdJbWFnZUV4XCIsXCJEcmF3SW1hZ2VSZXNpemVcIixcIkdMRHJhd0ltYWdlXCIsXCJEcmF3R2V0SW1hZ2VcIl0uZm9yRWFjaCgodD0+e2UuaG9va0Z1bmN0aW9uKHQsMCwoKGUsdCk9PihlWzBdPWNlLm1hcEltZ1NyYyhlWzBdKSx0KGUpKSkpfSkpLChhc3luYygpPT57YXdhaXQgZnVuY3Rpb24oZSx0PTEwMCl7cmV0dXJuKGFzeW5jKCk9Pntmb3IoOyFlKCk7KWF3YWl0IHJlKHQpfSkoKX0oKCgpPT52b2lkIDAhPT1nbG9iYWxUaGlzLkVsZW1lbnRCdXR0b24pKSxlLmhvb2tGdW5jdGlvbihcIkVsZW1lbnRCdXR0b24uQ3JlYXRlRm9yQXNzZXRcIiwwLCgoZSx0KT0+KGNlLm1hcEltZyhpZS5hc3NldFByZXZpZXdJY29uUGF0aChlWzFdKSwodD0+e2VbNF09ey4uLmVbNF0saW1hZ2U6dH19KSksdChlKSkpKSxlLmhvb2tGdW5jdGlvbihcIkVsZW1lbnRCdXR0b24uQ3JlYXRlRm9yQWN0aXZpdHlcIiwwLCgoZSx0KT0+e2NvbnN0IG49ZVsxXSxzPW4uSXRlbT9pZS5hc3NldFByZXZpZXdJY29uUGF0aChuLkl0ZW0uQXNzZXQpOmBBc3NldHMvRmVtYWxlM0RDRy9BY3Rpdml0eS8ke24uQWN0aXZpdHkuTmFtZX0ucG5nYDtyZXR1cm4gY2UubWFwSW1nKHMsKHQ9PntlWzRdPXsuLi5lWzRdLGltYWdlOnR9fSkpLHQoZSl9KSk7Y29uc3QgdD1lLnJhbmRvbUdsb2JhbEZ1bmN0aW9uKFwibWFwSW1hZ2VcIiwoZT0+Y2UubWFwSW1nU3JjKGUpKSk7ZS5wYXRjaEZ1bmN0aW9uKFwiRWxlbWVudEJ1dHRvbi5fUGFyc2VJY29uc1wiLHtcInNyYyA9IGAuL0Fzc2V0cy9GZW1hbGUzRENHL0l0ZW1NaXNjL1ByZXZpZXcvJHtpY29ufS5wbmdgXCI6YHNyYyA9ICR7dH0oXFxgLi9Bc3NldHMvRmVtYWxlM0RDRy9JdGVtTWlzYy9QcmV2aWV3L1xcJHtpY29ufS5wbmdcXGApYH0pfSkoKX1hZGRJbWdNYXBwaW5nKGUpe2NlLmFkZEltZ01hcHBpbmcoZSl9c2V0QmFzaWNJbWdNYXBwaW5nKGUpe2NlLnNldEJhc2ljSW1nTWFwcGluZyhlKX19Y29uc3QgbGU9YWUuZ2V0KFwiSW1hZ2VNYXBwaW5nXCIsKCgpPT5uZXcgdWUpKTtjb25zdCBmZT1uZXcgY2xhc3N7YWRkQXNzZXQoZSx0LG4scyxvPSExKXtaKGUsdCx7ZXh0ZW5kZWRDb25maWc6biYme1tlXTp7W3QuTmFtZV06bn19LGRlc2NyaXB0aW9uOnMsbm9NaXJyb3I6b30pfWFkZEdyb3VwZWRBc3NldHMoZSx0LG4pe2Zvcihjb25zdFtzLG9db2YgT2JqZWN0LmVudHJpZXMoZSkpZm9yKGNvbnN0IGUgb2Ygbyl7Y29uc3Qgbz1zLGE9dCYmQyhvLGUuTmFtZSx0KTtaKG8sZSx7ZXh0ZW5kZWRDb25maWc6biYmbltvXT8uW2UuTmFtZV0mJntbb106e1tlLk5hbWVdOm5bb11bZS5OYW1lXX19LGRlc2NyaXB0aW9uOmF9KX19YWRkR3JvdXBlZENvbmZpZyhlKXshZnVuY3Rpb24oZSl7ZSYmYy5hZGQoZSl9KGUpfW1vZGlmeUFzc2V0KGUsdCxuKXshZnVuY3Rpb24oZSx0LG4pe2NvbnN0IHM9bz0+e2NvbnN0IGE9QXNzZXRHZXQoXCJGZW1hbGUzRENHXCIsby5OYW1lLHQpO2lmKGEpbihvLGEpO2Vsc2V7aWYoSltlXXx8KEpbZV09bmV3IFNldCksSltlXS5oYXModCkpcmV0dXJuIHZvaWQgY29uc29sZS5lcnJvcihgW0Fzc2V0TWFuYWdlcl0gQXNzZXQgJHtlfToke3R9IG5vdCBmb3VuZGApO0pbZV0uYWRkKHQpLEgoZSxzKX19O0goZSxzKX0oZSx0LG4pfW1vZGlmeUFzc2V0TGF5ZXJzKGUsdCl7IWZ1bmN0aW9uKGUsdCl7VSgoKCk9PntBc3NldC5maWx0ZXIoZSkuZm9yRWFjaCgoZT0+e2UuTGF5ZXIuZm9yRWFjaCgobj0+dChlLG4pKSl9KSl9KSl9KGUsdCl9bW9kaWZ5R3JvdXAoZSx0KXshZnVuY3Rpb24oZSx0KXtIKGUsKGU9PnQoZSkpKX0oZSx0KX1hZGRDdXN0b21EaWFsb2coZSl7IWZ1bmN0aW9uKGUpe2Zvcihjb25zdFt0LG5db2YgT2JqZWN0LmVudHJpZXMoZSkpe1lbdF18fChZW3RdPXt9KTtmb3IoY29uc3RbZSxzXW9mIE9iamVjdC5lbnRyaWVzKG4pKVlbdF1bZV09cyxlLmluY2x1ZGVzKFwiSXRlbVRvcnNvMlwiKT9ZW3RdW2UucmVwbGFjZShcIkl0ZW1Ub3JzbzJcIixcIkl0ZW1Ub3Jzb1wiKV09czplLmluY2x1ZGVzKFwiSXRlbVRvcnNvXCIpJiYoWVt0XVtlLnJlcGxhY2UoXCJJdGVtVG9yc29cIixcIkl0ZW1Ub3JzbzJcIildPXMpfX0oZSl9YWRkSW1hZ2VNYXBwaW5nKGUpe2xlLmFkZEltZ01hcHBpbmcoZSl9Z2V0IGltYWdlTWFwcGluZygpe3JldHVybiBsZX1hZGRHcm91cChlLHQpe1EoZSx7ZGVzY3JpcHRpb246dH0pfWFkZENvcHlHcm91cChlLHQsbil7SyhlLHQsbil9YWRkTGF5ZXJOYW1lcyhlLHQsbil7VChlLHQse2VudHJpZXM6bn0pfWFkZExheWVyTmFtZXNCeUVudHJ5KGUsdCxuKXshZnVuY3Rpb24oZSx0LG4scz0hMCl7Y29uc3Qgbz1TKG4pO25ldyBTZXQoT2JqZWN0LmVudHJpZXMobikubWFwKCgoW2UsdF0pPT5PYmplY3Qua2V5cyh0KSkpLmZsYXQoKSkuZm9yRWFjaCgobj0+e08oYCR7ZX0ke3R9JHtufWAsbyhuKSxuLCEhcyl9KSl9KGUsdCxuKX1hc3NldElzQ3VzdG9tZWQoZSl7cmV0dXJuIHZvaWQgMCE9PWcoKVtlLkdyb3VwLk5hbWVdPy5bZS5OYW1lXX1hZnRlckxvYWQoZSl7VShlKX1pbml0KHQpeyFmdW5jdGlvbigpe2lmKHRlKXJldHVybjt0ZT0hMDtjb25zdCB0PWU9PnYoWSxlKTtlLnByb2dyZXNzaXZlSG9vayhcIkFzc2V0VGV4dEdldFwiKS5vdmVycmlkZSgoKGUsbik9PnQoZVswXSl8fG4oZSkpKSxlLnByb2dyZXNzaXZlSG9vayhcIkNoYXRSb29tUHVibGlzaEN1c3RvbUFjdGlvblwiKS5pbmplY3QoKGU9Pntjb25zdFtuLHMsb109ZSxhPXQobik7YSYmby5wdXNoKHtUYWc6YE1JU1NJTkcgVEVYVCBJTiBcIkludGVyZmFjZS5jc3ZcIjogJHtufWAsVGV4dDphfSl9KSkubmV4dCgpfSgpLGZ1bmN0aW9uKCl7aWYoRSlyZXR1cm47RT0hMDtjb25zdCB0PVRleHRBbGxTY3JlZW5DYWNoZS5nZXQoQXNzZXRTdHJpbmdzUGF0aCk7dCYmdC5sb2FkZWQmJihcIkVOXCI9PT1UcmFuc2xhdGlvbkxhbmd1YWdlfHxcIkJsb2F0ZWRcIiE9PXQuZ2V0KFwiQmxvYXRlZFwiKSk/dygpOihlLnByb2dyZXNzaXZlSG9vayhcIkFzc2V0QnVpbGREZXNjcmlwdGlvblwiKS5uZXh0KCkuaW5qZWN0KHcpLGUucHJvZ3Jlc3NpdmVIb29rKFwiVHJhbnNsYXRpb25Bc3NldFByb2Nlc3NcIikubmV4dCgpLmluamVjdCh3KSk7Y29uc3Qgbj1lLnJhbmRvbUdsb2JhbEZ1bmN0aW9uKFwiQ3VzdG9tRGlhbG9nSW5qZWN0XCIsKChlLHQsbixzLG8pPT57Zm9yKGNvbnN0W3Qsbl1vZltbXCJQcmV2QXNzZXRcIixzXSxbXCJOZXh0QXNzZXRcIixvXV0paChuKSYmZS50ZXh0KHQsbi5Bc3NldC5EZXNjcmlwdGlvbil9KSk7ZS5wYXRjaEZ1bmN0aW9uKFwiQ2hhdFJvb21QdWJsaXNoQWN0aW9uXCIse1wiQ2hhdFJvb21DaGFyYWN0ZXJJdGVtVXBkYXRlKEMpO1wiOmAke259KGRpY3Rpb25hcnksIEMsIEFjdGlvbiwgUHJldkl0ZW0sIE5leHRJdGVtKTtcXG5DaGF0Um9vbUNoYXJhY3Rlckl0ZW1VcGRhdGUoQyk7YH0pfSgpLGZ1bmN0aW9uKCl7Y29uc3QgdD1lLnJhbmRvbUdsb2JhbEZ1bmN0aW9uKFwiTGF5ZXJOYW1lSW5qZWN0XCIsKGU9PntqPWV9KSk7ZS5wYXRjaEZ1bmN0aW9uKFwiSXRlbUNvbG9yTG9hZFwiLHtcIkl0ZW1Db2xvckxheWVyTmFtZXMgPSBuZXcgVGV4dENhY2hlXCI6YCR7dH0oKCk9Pkl0ZW1Db2xvckxheWVyTmFtZXMpO1xcbkl0ZW1Db2xvckxheWVyTmFtZXMgPSBuZXcgVGV4dENhY2hlYH0pLGUucHJvZ3Jlc3NpdmVIb29rKFwiSXRlbUNvbG9yTG9hZFwiLDEpLm5leHQoKS5pbmplY3QoKCgpPT57Y29uc3QgZT1qPy4oKT8uY2FjaGU7ZSYmTC5mb3JFYWNoKCgoZSx0KT0+e08odCxlLmRlc2MsZS5mYWxsYmFjayxlLm5vT3ZlcnJpZGUpfSkpfSkpfSgpLEEoKSx0KCksWCgpfWVuYWJsZVZhbGlkYXRpb24oZSl7c2UoZSl9c2V0TG9nZ2VyKGUpeyFmdW5jdGlvbihlKXt4PWV9KGUpfXR5cGVCb2R5R3JvdXBOYW1lcygpe3JldHVybiB0aGlzfX07ZXhwb3J0e2ZlIGFzIEFzc2V0TWFuYWdlcixtZSBhcyByZXNvbHZlQXNzZXRPdmVycmlkZXN9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiaW1wb3J0IHsgQXNzZXRNYW5hZ2VyLCBDdXN0b21Bc3NldERlZmluaXRpb24gfSBmcm9tIFwiQHN1Z2FyY2gvYmMtYXNzZXQtbWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHBhbXBzQXNzZXREZWZpbnRpb246IEN1c3RvbUFzc2V0RGVmaW5pdGlvbiA9IHtcclxuICAvLyBBc3NldCBuYW1lLCBtdXN0IGJlIHVuaXF1ZSBpbiB0aGUgYm9keSBncm91cFxyXG4gIE5hbWU6IFwiVW50cmFpbmVyc19QYW1wXCIsXHJcbiAgLy8gaXRlbSBhcHBlYXJpbmcgb24gcmFuZG9tIGNoYXJhY3RlclxyXG4gIFJhbmRvbTogZmFsc2UsXHJcbiAgLy8gIHBsYXllciBjYW52YXMgc2l6ZSBpcyA1MDB4MTAwMFxyXG4gIExlZnQ6IDE3NCxcclxuICBUb3A6IDQzNCxcclxuICAvLyB0aGUgZHJhd2luZyBvcmRlciBvZiB0aGUgaXRlbSwgaGlnaGVyIG51bWJlciBtZWFucyBkcmF3biBsYXRlciwgYW5kIG9uIHRvcCBvZiBvdGhlciBpdGVtc1xyXG4gIFByaW9yaXR5OiAyMCxcclxuICBEZWZhdWx0Q29sb3I6IFtcIiNGRkZGRkZcIl0sXHJcbiAgLy8gQHRzLWV4cGVjdC1lcnJvclxyXG4gIFBhcmVudEdyb3VwOiB7fSxcclxuICAvLyBBc3NldCBsYXllcnMsIHBpY3R1cmUgcmVzb3VyY2UgbmFtZXNcclxuICBMYXllcjogW1xyXG4gICAgLy9Bc3NldHMvW0JvZHlHcm91cF0vW0Fzc2V0TmFtZV1fW0xheWVyTmFtZV0ucG5nXHJcbiAgICB7XHJcbiAgICAgIC8vIHJlc291Y2UgbG9jYXRlZCBhdCBcIkFzc2V0cy9JdGVtTWlzYy9TaW1wbGVFeGFtcGxlX0Jhc2UucG5nXCJcclxuICAgICAgTmFtZTogXCJCYXNlXCIsXHJcbiAgICAgIEFsbG93Q29sb3JpemU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBOYW1lOiBcIlBhdGNoXCIsXHJcbiAgICAgIEFsbG93Q29sb3JpemU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBOYW1lOiBcIkRldGFpbF8yXCIsXHJcbiAgICAgIEFsbG93Q29sb3JpemU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBOYW1lOiBcIkRldGFpbF8xXCIsXHJcbiAgICAgIEFsbG93Q29sb3JpemU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBOYW1lOiBcIkRldGFpbF8zXCIsXHJcbiAgICAgIEFsbG93Q29sb3JpemU6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBOYW1lOiBcIlRpbnRcIixcclxuICAgICAgQWxsb3dDb2xvcml6ZTogdHJ1ZSxcclxuICAgICAgRWRpdE9wYWNpdHk6IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBOYW1lOiBcIkluZGljYXRvclwiLFxyXG4gICAgICBBbGxvd0NvbG9yaXplOiB0cnVlLFxyXG4gICAgICBFZGl0T3BhY2l0eTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIE5hbWU6IFwiVGFic1wiLFxyXG4gICAgICBBbGxvd0NvbG9yaXplOiB0cnVlLFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5jb25zdCB0cmFuc2xhdGlvbnMgPSB7XHJcbiAgQ046IFwiUGFtcGVyc+Wwv+W4g1wiLFxyXG4gIEVOOiBcIlBhbXBlcnMgRGlhcGVyXCIsXHJcbiAgUlU6IFwi0J/QsNC80L/QtdGA0YHQvtCy0YvQtSDQtNC40LDQv9C10YDRi1wiLFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XHJcbiAgQXNzZXRNYW5hZ2VyLmFkZEltYWdlTWFwcGluZyh7XHJcbiAgICBcIkFzc2V0cy9GZW1hbGUzRENHL0l0ZW1QZWx2aXMvVW50cmFpbmVyc19QYW1wX0Jhc2UucG5nXCI6IGAke3B1YmxpY1VSTH0vaXRlbXMvZGlhcGVycy9VbnRyYWluZXJfUGFtcC9VbnRyYWluZXJzX1BhbXBfQmFzZS5wbmdgLFxyXG4gICAgXCJBc3NldHMvRmVtYWxlM0RDRy9JdGVtUGVsdmlzL1VudHJhaW5lcnNfUGFtcF9QYXRjaC5wbmdcIjogYCR7cHVibGljVVJMfS9pdGVtcy9kaWFwZXJzL1VudHJhaW5lcl9QYW1wL1VudHJhaW5lcnNfUGFtcF9QYXRjaC5wbmdgLFxyXG4gICAgXCJBc3NldHMvRmVtYWxlM0RDRy9JdGVtUGVsdmlzL1VudHJhaW5lcnNfUGFtcF9EZXRhaWxfMS5wbmdcIjogYCR7cHVibGljVVJMfS9pdGVtcy9kaWFwZXJzL1VudHJhaW5lcl9QYW1wL1VudHJhaW5lcnNfUGFtcF9EZXRhaWxfMS5wbmdgLFxyXG4gICAgXCJBc3NldHMvRmVtYWxlM0RDRy9JdGVtUGVsdmlzL1VudHJhaW5lcnNfUGFtcF9EZXRhaWxfMi5wbmdcIjogYCR7cHVibGljVVJMfS9pdGVtcy9kaWFwZXJzL1VudHJhaW5lcl9QYW1wL1VudHJhaW5lcnNfUGFtcF9EZXRhaWxfMi5wbmdgLFxyXG4gICAgXCJBc3NldHMvRmVtYWxlM0RDRy9JdGVtUGVsdmlzL1VudHJhaW5lcnNfUGFtcF9EZXRhaWxfMy5wbmdcIjogYCR7cHVibGljVVJMfS9pdGVtcy9kaWFwZXJzL1VudHJhaW5lcl9QYW1wL1VudHJhaW5lcnNfUGFtcF9EZXRhaWxfMy5wbmdgLFxyXG4gICAgXCJBc3NldHMvRmVtYWxlM0RDRy9JdGVtUGVsdmlzL1VudHJhaW5lcnNfUGFtcF9JbmRpY2F0b3IucG5nXCI6IGAke3B1YmxpY1VSTH0vaXRlbXMvZGlhcGVycy9VbnRyYWluZXJfUGFtcC9VbnRyYWluZXJzX1BhbXBfSW5kaWNhdG9yLnBuZ2AsXHJcbiAgICBcIkFzc2V0cy9GZW1hbGUzRENHL0l0ZW1QZWx2aXMvVW50cmFpbmVyc19QYW1wX1RhYnMucG5nXCI6IGAke3B1YmxpY1VSTH0vaXRlbXMvZGlhcGVycy9VbnRyYWluZXJfUGFtcC9VbnRyYWluZXJzX1BhbXBfVGFicy5wbmdgLFxyXG4gICAgXCJBc3NldHMvRmVtYWxlM0RDRy9JdGVtUGVsdmlzL1ByZXZpZXcvVW50cmFpbmVyc19QYW1wLnBuZ1wiOiBgJHtwdWJsaWNVUkx9L2l0ZW1zL2RpYXBlcnMvVW50cmFpbmVyX1BhbXAvVW50cmFpbmVyc19QYW1wX1ByZXZpZXcucG5nYCxcclxuICB9KTtcclxuICBBc3NldE1hbmFnZXIuYWRkQXNzZXQoXCJJdGVtUGVsdmlzXCIsIHBhbXBzQXNzZXREZWZpbnRpb24sIHVuZGVmaW5lZCwgdHJhbnNsYXRpb25zKTtcclxufVxyXG4iLCJpbXBvcnQgeyBBc3NldE1hbmFnZXIsIEN1c3RvbUFzc2V0RGVmaW5pdGlvbiB9IGZyb20gXCJAc3VnYXJjaC9iYy1hc3NldC1tYW5hZ2VyXCI7XHJcblxyXG5jb25zdCBhc3NldERlZmludGlvbjogQ3VzdG9tQXNzZXREZWZpbml0aW9uID0ge1xyXG4gIC8vIEFzc2V0IG5hbWUsIG11c3QgYmUgdW5pcXVlIGluIHRoZSBib2R5IGdyb3VwXHJcbiAgTmFtZTogXCJUZW1wX1BhbXBcIixcclxuICAvLyBpdGVtIGFwcGVhcmluZyBvbiByYW5kb20gY2hhcmFjdGVyXHJcbiAgUmFuZG9tOiBmYWxzZSxcclxuICBFZGl0T3BhY2l0eTogdHJ1ZSxcclxuICAvLyAgcGxheWVyIGNhbnZhcyBzaXplIGlzIDUwMHgxMDAwXHJcbiAgTGVmdDogMTYwLFxyXG4gIFRvcDogNDExLFxyXG4gIC8vIHRoZSBkcmF3aW5nIG9yZGVyIG9mIHRoZSBpdGVtLCBoaWdoZXIgbnVtYmVyIG1lYW5zIGRyYXduIGxhdGVyLCBhbmQgb24gdG9wIG9mIG90aGVyIGl0ZW1zXHJcbiAgUHJpb3JpdHk6IDIwLFxyXG4gIERlZmF1bHRDb2xvcjogW1wiI2Q2ZWZmZlwiLCBcIiM3QjdCN0JcIiwgXCIjODE5N0E3XCIsIFwiIzQ4ODBCOVwiLCBcIiNCNUE5NUJcIiwgXCIjQUFBNDRFXCJdLFxyXG4gIC8vIEB0cy1leHBlY3QtZXJyb3JcclxuICBQYXJlbnRHcm91cDoge30sXHJcbiAgLy8gQXNzZXQgbGF5ZXJzLCBwaWN0dXJlIHJlc291cmNlIG5hbWVzXHJcbiAgTGF5ZXI6IFtcclxuICAgIHtcclxuICAgICAgTmFtZTogXCJCYWNrXCIsXHJcbiAgICAgIEFsbG93Q29sb3JpemU6IHRydWUsXHJcbiAgICAgIFByaW9yaXR5OiAtMSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIE5hbWU6IFwiQmFzZVwiLFxyXG4gICAgICBBbGxvd0NvbG9yaXplOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgTmFtZTogXCJNaWRkbGVcIixcclxuICAgICAgQWxsb3dDb2xvcml6ZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIE5hbWU6IFwiVGFic1wiLFxyXG4gICAgICBBbGxvd0NvbG9yaXplOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgTmFtZTogXCJXZXRcIixcclxuICAgICAgQWxsb3dDb2xvcml6ZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIE5hbWU6IFwiSW5kaWNhdG9yXCIsXHJcbiAgICAgIEFsbG93Q29sb3JpemU6IHRydWUsXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcbmNvbnN0IHRyYW5zbGF0aW9ucyA9IHtcclxuICBFTjogXCJDdXRlc3QgRGlhcGVyXCIsXHJcbiAgUlU6IFwi0KHQsNC80YvQuSDQu9GD0YfRiNC40Lkg0LTQuNCw0L/QtdGAXCIsXHJcbiAgQ046IFwi5pyA5aW955qE5bC/5biDXCIsXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICBBc3NldE1hbmFnZXIuYWRkSW1hZ2VNYXBwaW5nKHtcclxuICAgIFwiQXNzZXRzL0ZlbWFsZTNEQ0cvSXRlbVBlbHZpcy9UZW1wX1BhbXBfQmFzZS5wbmdcIjogYCR7cHVibGljVVJMfS9pdGVtcy9kaWFwZXJzL1RlbXAvQmFzZS5wbmdgLFxyXG4gICAgXCJBc3NldHMvRmVtYWxlM0RDRy9JdGVtUGVsdmlzL1RlbXBfUGFtcF9NaWRkbGUucG5nXCI6IGAke3B1YmxpY1VSTH0vaXRlbXMvZGlhcGVycy9UZW1wL01pZGRsZS5wbmdgLFxyXG4gICAgXCJBc3NldHMvRmVtYWxlM0RDRy9JdGVtUGVsdmlzL1RlbXBfUGFtcF9UYWJzLnBuZ1wiOiBgJHtwdWJsaWNVUkx9L2l0ZW1zL2RpYXBlcnMvVGVtcC9UYWJzLnBuZ2AsXHJcbiAgICBcIkFzc2V0cy9GZW1hbGUzRENHL0l0ZW1QZWx2aXMvVGVtcF9QYW1wX0luZGljYXRvci5wbmdcIjogYCR7cHVibGljVVJMfS9pdGVtcy9kaWFwZXJzL1RlbXAvSW5kaWNhdG9yLnBuZ2AsXHJcbiAgICBcIkFzc2V0cy9GZW1hbGUzRENHL0l0ZW1QZWx2aXMvVGVtcF9QYW1wX1dldC5wbmdcIjogYCR7cHVibGljVVJMfS9pdGVtcy9kaWFwZXJzL1RlbXAvV2V0LnBuZ2AsXHJcbiAgICBcIkFzc2V0cy9GZW1hbGUzRENHL0l0ZW1QZWx2aXMvVGVtcF9QYW1wX0JhY2sucG5nXCI6IGAke3B1YmxpY1VSTH0vaXRlbXMvZGlhcGVycy9UZW1wL0JhY2sucG5nYCxcclxuICAgIFwiQXNzZXRzL0ZlbWFsZTNEQ0cvSXRlbVBlbHZpcy9QcmV2aWV3L1RlbXBfUGFtcC5wbmdcIjogYCR7cHVibGljVVJMfS9pdGVtcy9kaWFwZXJzL1RlbXAvUHJldmlldy5wbmdgLFxyXG4gIH0pO1xyXG4gIEFzc2V0TWFuYWdlci5hZGRJbWFnZU1hcHBpbmcoe1xyXG4gICAgXCJBc3NldHMvRmVtYWxlM0RDRy9QYW50aWVzL1RlbXBfUGFtcF9CYXNlLnBuZ1wiOiBgJHtwdWJsaWNVUkx9L2l0ZW1zL2RpYXBlcnMvVGVtcC9CYXNlLnBuZ2AsXHJcbiAgICBcIkFzc2V0cy9GZW1hbGUzRENHL1BhbnRpZXMvVGVtcF9QYW1wX01pZGRsZS5wbmdcIjogYCR7cHVibGljVVJMfS9pdGVtcy9kaWFwZXJzL1RlbXAvTWlkZGxlLnBuZ2AsXHJcbiAgICBcIkFzc2V0cy9GZW1hbGUzRENHL1BhbnRpZXMvVGVtcF9QYW1wX1RhYnMucG5nXCI6IGAke3B1YmxpY1VSTH0vaXRlbXMvZGlhcGVycy9UZW1wL1RhYnMucG5nYCxcclxuICAgIFwiQXNzZXRzL0ZlbWFsZTNEQ0cvUGFudGllcy9UZW1wX1BhbXBfSW5kaWNhdG9yLnBuZ1wiOiBgJHtwdWJsaWNVUkx9L2l0ZW1zL2RpYXBlcnMvVGVtcC9JbmRpY2F0b3IucG5nYCxcclxuICAgIFwiQXNzZXRzL0ZlbWFsZTNEQ0cvUGFudGllcy9UZW1wX1BhbXBfV2V0LnBuZ1wiOiBgJHtwdWJsaWNVUkx9L2l0ZW1zL2RpYXBlcnMvVGVtcC9XZXQucG5nYCxcclxuICAgIFwiQXNzZXRzL0ZlbWFsZTNEQ0cvUGFudGllcy9UZW1wX1BhbXBfQmFjay5wbmdcIjogYCR7cHVibGljVVJMfS9pdGVtcy9kaWFwZXJzL1RlbXAvQmFjay5wbmdgLFxyXG4gICAgXCJBc3NldHMvRmVtYWxlM0RDRy9QYW50aWVzL1ByZXZpZXcvVGVtcF9QYW1wLnBuZ1wiOiBgJHtwdWJsaWNVUkx9L2l0ZW1zL2RpYXBlcnMvVGVtcC9QcmV2aWV3LnBuZ2AsXHJcbiAgfSk7XHJcbiAgQXNzZXRNYW5hZ2VyLmFkZEFzc2V0KFwiSXRlbVBlbHZpc1wiLCBhc3NldERlZmludGlvbiwgdW5kZWZpbmVkLCB0cmFuc2xhdGlvbnMpO1xyXG4gIEFzc2V0TWFuYWdlci5hZGRBc3NldChcIlBhbnRpZXNcIiwgYXNzZXREZWZpbnRpb24sIHVuZGVmaW5lZCwgdHJhbnNsYXRpb25zKTtcclxufVxyXG4iLCJpbXBvcnQgeyBBc3NldE1hbmFnZXIgfSBmcm9tIFwiQHN1Z2FyY2gvYmMtYXNzZXQtbWFuYWdlclwiO1xyXG5pbXBvcnQgcGFtcHMgZnJvbSBcIi4vaXRlbXMvdW50cmFpbmVyUGFtcHNcIjtcclxuaW1wb3J0IHsgYmNNb2RTREsgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBIb29rTWFuYWdlciB9IGZyb20gXCJAc3VnYXJjaC9iYy1tb2QtaG9vay1tYW5hZ2VyXCI7XHJcbmltcG9ydCB0ZW1wUGFtcCBmcm9tIFwiLi9pdGVtcy90ZW1wUGFtcFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRDdXN0b21JdGVtcyA9ICgpID0+IHtcclxuICBIb29rTWFuYWdlci5pbml0V2l0aE1vZChiY01vZFNESyk7XHJcbiAgQXNzZXRNYW5hZ2VyLmluaXQoKCkgPT4ge1xyXG4gICAgcGFtcHMoKTtcclxuICAgIHRlbXBQYW1wKCk7XHJcbiAgfSk7XHJcbn07XHJcbiIsImltcG9ydCBpbml0SG9va3MgZnJvbSBcIi4vY29yZS9ob29rc1wiO1xyXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi9jb3JlL2xvZ2dlclwiO1xyXG5pbXBvcnQgeyBsb2FkT3JHZW5lcmF0ZURhdGEgfSBmcm9tIFwiLi9jb3JlL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IGJjTW9kU0RLLCBIb29rUHJpb3JpdHkgfSBmcm9tIFwiLi9jb3JlL3V0aWxzXCI7XHJcbmltcG9ydCB7IGluaXRTY3JlZW5zIH0gZnJvbSBcIi4vc2NyZWVuc1wiO1xyXG5pbXBvcnQgeyBpbml0U2V0dGluZ3NTY3JlZW4gfSBmcm9tIFwiLi9zY3JlZW5zL1NldHRpbmdzXCI7XHJcbmltcG9ydCB7IGluaXRNaW5pZ2FtZXMgfSBmcm9tIFwiLi9jb3JlL21pbmlnYW1lc1wiO1xyXG5pbXBvcnQgeyBhYmNsUGxheWVyIH0gZnJvbSBcIi4vY29yZS9wbGF5ZXIvcGxheWVyXCI7XHJcbmltcG9ydCBcIi4vY29yZS9nbG9iYWxcIjtcclxuaW1wb3J0IHsgaW5pdE92ZXJsYXkgfSBmcm9tIFwiLi9jb3JlL3BsYXllci91aVwiO1xyXG5pbXBvcnQgeyBpbml0QWN0aW9ucyB9IGZyb20gXCIuL2NvcmUvYWN0aW9uTG9hZGVyXCI7XHJcbmltcG9ydCB7IGxvb3BJbnRlcnZhbCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBpbml0QXBpIH0gZnJvbSBcIi4vY29yZS9hcGlcIjtcclxuaW1wb3J0IHsgaW5pdEN1c3RvbUl0ZW1zIH0gZnJvbSBcIi4vY29yZS9jdXN0b21JdGVtc1wiO1xyXG5pbml0Q3VzdG9tSXRlbXMoKTtcclxuY29uc3QgbG9vcCA9ICgpID0+IHtcclxuICBpZiAoQ3VycmVudFNjcmVlbiAhPT0gXCJDaGF0Um9vbVwiKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGFiY2xQbGF5ZXIudXBkYXRlKCk7XHJcbn07XHJcblxyXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xyXG4gIC8vICBTZXJ2ZXJQbGF5ZXJTeW5jKCk7XHJcblxyXG4gIGxvYWRPckdlbmVyYXRlRGF0YSgpO1xyXG4gIGluaXRTZXR0aW5nc1NjcmVlbigpO1xyXG4gIGluaXRBY3Rpb25zKCk7XHJcbiAgaW5pdFNjcmVlbnMoW10pO1xyXG4gIGluaXRIb29rcygpO1xyXG4gIGluaXRNaW5pZ2FtZXMoKTtcclxuICBpbml0T3ZlcmxheSgpO1xyXG4gIGluaXRBcGkoKTtcclxuXHJcbiAgc2V0SW50ZXJ2YWwobG9vcCwgbG9vcEludGVydmFsKTtcclxuICBsb2dnZXIuaW5mbyhgUmVhZHkuYCk7XHJcbn07XHJcblxyXG5pZiAoQ3VycmVudFNjcmVlbiA9PSBudWxsIHx8IEN1cnJlbnRTY3JlZW4gPT09IFwiTG9naW5cIikge1xyXG4gIGJjTW9kU0RLLmhvb2tGdW5jdGlvbihcIkxvZ2luUmVzcG9uc2VcIiwgSG9va1ByaW9yaXR5Lk9CU0VSVkUsIChhcmdzLCBuZXh0KSA9PiB7XHJcbiAgICBuZXh0KGFyZ3MpO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhcmdzWzBdO1xyXG4gICAgaWYgKHJlc3BvbnNlID09PSBcIkludmFsaWROYW1lUGFzc3dvcmRcIikgcmV0dXJuO1xyXG4gICAgY29uc3QgeyBOYW1lLCBBY2NvdW50TmFtZSB9ID0gcmVzcG9uc2U7XHJcbiAgICBpZiAodHlwZW9mIE5hbWUgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIEFjY291bnROYW1lID09PSBcInN0cmluZ1wiKSBpbml0KCk7XHJcbiAgfSk7XHJcbn0gZWxzZSBpbml0KCk7XHJcbiJdLCJuYW1lcyI6WyJvYmplY3RQcm90byIsImhhc093blByb3BlcnR5IiwibmF0aXZlT2JqZWN0VG9TdHJpbmciLCJzeW1Ub1N0cmluZ1RhZyIsImZ1bmNUYWciLCJmdW5jUHJvdG8iLCJmdW5jVG9TdHJpbmciLCJiYXNlU2V0VG9TdHJpbmciLCJNQVhfU0FGRV9JTlRFR0VSIiwibmF0aXZlTWF4IiwiYXJnc1RhZyIsImZyZWVFeHBvcnRzIiwiZnJlZU1vZHVsZSIsIm1vZHVsZUV4cG9ydHMiLCJCdWZmZXIiLCJvYmplY3RUYWciLCJpc0FyZ3VtZW50cyIsIkhBU0hfVU5ERUZJTkVEIiwiTWFwIiwiYmNNb2RTZGtSZWYiLCJiY01vZFNkayIsIm4iLCJyIiwicyIsImgiLCJsIiwidSIsImEiLCJjIiwidCIsIm8iLCJpIiwiZSIsInRyYW5zbGF0aW9ucyIsIkFzc2V0TWFuYWdlciIsIkhvb2tNYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0NBR0EsRUFBYSxVQUFVLENBQWMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxvR0FBb0csRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxJQUFHLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxvREFBb0QsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsb0VBQW9FLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLGdEQUFnRCxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxxQ0FBcUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxxREFBcUQsRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsa0RBQWtELEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyw0RkFBNEYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxnRUFBZ0UsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMsaUNBQWlDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLCtCQUErQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsZ0VBQWdFLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDLGdDQUFnQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLDJCQUEyQixFQUFFLENBQUMsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLGdFQUFnRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLCtEQUErRCxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxxREFBcUQsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLHdEQUF3RCxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFD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QUU7Q0FDcEIsUUFBQSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ3RDLFFBQUEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUN0QyxRQUFBLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7TUFDdkM7S0FDRCxPQUFPLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQzNCLENBQUM7Q0FDRCxTQUFTLFFBQVEsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBQTtDQUMvQyxJQUFBLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztLQUNuQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3pCLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDMUIsSUFBQSxJQUFJLENBQUMsR0FBVyxDQUFDLEVBQ2YsQ0FBUyxFQUNULENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO0NBRXRCLElBQUEsSUFBSSxHQUFHLEtBQUssR0FBRyxFQUFFO0NBQ2YsUUFBQSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUNYO1VBQU07Q0FDTCxRQUFBLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7U0FDbEIsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxH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QyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsS0FBSyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSUMsR0FBQyxXQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLFlBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTUMsR0FBQyxDQUFDLElBQUlDLEdBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSUEsR0FBQyxDQUFDQyxHQUFDLENBQUMsSUFBSUQsR0FBQyxDQUFDRSxHQUFDLENBQUMsSUFBSUYsR0FBQyxDQUFDLFNBQVNHLEdBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSUMsR0FBQyxDQUFDLE1BQU1DLEdBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLE9BQU9ELEdBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLENBQUNFLEdBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNKLEdBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSUQsR0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDRSxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsR0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFDSixHQUFDLENBQUMsR0FBRyxHQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDSyxHQUFDLENBQUMsQ0FBQyxDQUFDRixHQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUlELEdBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQ0UsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsRUFBRSxFQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQ0osR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUNFLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUNDLEdBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUlLLEdBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDSixHQUFDLEVBQUUsQ0FBQ0YsR0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRU8sR0FBQyxDQUFDLElBQUksQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFQSxHQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEVBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDVixHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQzs7Q0NBL3hFLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFFLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxPQUFPLHVCQUF1QixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDVyxHQUFDLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUNBLEdBQUMsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDQSxHQUFDLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDQSxHQUFDLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLHNDQUFzQyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUUsQ0FBQyxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFDLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQ0EsR0FBQyxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQywrQkFBK0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDQSxHQUFDLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLENBQUMsWUFBWSxDQUFDLDZCQUE2QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUNBLEdBQUMsQ0FBQyxZQUFZLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUNBLEdBQUMsQ0FBQyxZQUFZLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsK0JBQStCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxVQUFVLEVBQUUsQ0FBQyxPQUFNLDBNQUEwTSxDQUFDLE9BQU8sb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQywyQkFBMkIsRUFBRSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBK1AsTUFBTSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUNBLEdBQUMsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQ0EsR0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFHLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQ0EsR0FBQyxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQ0EsR0FBQyxDQUFDLFlBQVksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUNBLEdBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQ0EsR0FBQyxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLDBEQUEwRCxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxHQUFFLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLEdBQUMsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUNBLEdBQUMsQ0FBQyxlQUFlLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxtQkFBbUIsRUFBRSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFQSxHQUFDLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDQSxHQUFDLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUNBLEdBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUUsQ0FBQ0EsR0FBQyxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsNkVBQTZFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQ0EsR0FBQyxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxD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QUUsQ0FBQztLQUNkLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNoQixJQUFBLFNBQVMsRUFBRSxDQUFDO0NBQ1osSUFBQSxhQUFhLEVBQUUsQ0FBQztDQUNoQixJQUFBLFdBQVcsRUFBRSxDQUFDO0NBQ2QsSUFBQSxPQUFPLEVBQUUsQ0FBQztDQUVWLElBQUEsV0FBVyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztDQUNoQyxJQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQSxNQUFBLENBQVEsQ0FBQyxDQUFDO0NBQ3hCLENBQUMsQ0FBQztDQUVGLElBQUksYUFBYSxJQUFJLElBQUksSUFBSSxhQUFhLEtBQUssT0FBTyxFQUFFO0NBQ3RELElBQUEsUUFBUSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEtBQUk7U0FDMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ1gsUUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekIsSUFBSSxRQUFRLEtBQUsscUJBQXFCO2FBQUUsT0FBTztDQUMvQyxRQUFBLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsUUFBUSxDQUFDO1NBQ3ZDLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVE7Q0FBRSxZQUFBLElBQUksRUFBRSxDQUFDO0NBQzFFLEtBQUMsQ0FBQyxDQUFDO0NBQ0wsQ0FBQzs7Q0FBTSxJQUFBLElBQUksRUFBRTs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNSwyNiwyNywyOCwyOSwzMCwzMSwzMiwzMywzNCwzNSwzNiwzNywzOCwzOSw0MCw0MSw0Miw0Myw0NCw0NSw0Niw0Nyw0OCw0OSw1MCw1MSw1Miw1Myw1NCw1NSw1Niw1Nyw1OCw1OSw2MCw2MSw2Miw2Myw2NCw2NSw2Niw2Nyw2OCw2OSw3MCw3MSw3Miw3Myw3NCw3NSw3Niw3Nyw3OCw3OSw4MCw4MSw4Miw4Myw4NCw4NSw4Niw4Nyw4OCw4OSw5MCw5MSw5Miw5Myw5NCw5NSw5Niw5Nyw5OCw5OSwxMDAsMTAxLDEwMiwxMDMsMTA0LDEwNSwxMDYsMTMxLDEzMl19
