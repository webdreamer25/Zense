/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/lodash.clonedeep/index.js":
/*!************************************************!*\
  !*** ./node_modules/lodash.clonedeep/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
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

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
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
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, true, true);
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = cloneDeep;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/behavior.js":
/*!*************************!*\
  !*** ./src/behavior.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_traverse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/traverse */ "./src/core/traverse.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


var Behavior = Object.create(_core_traverse__WEBPACK_IMPORTED_MODULE_0__["default"]);
Behavior.id = '';
Behavior.ui = {};
Behavior.strUI = {};
Behavior.behaviorName = '';
Behavior.customized = false;
Behavior.setStringUIValues = true;

Behavior.config = function (options) {
  _extends(this, options); // Need to keep a string 


  if (this.setStringUIValues) {
    // We create a symbol to prevent Object.assign from overwritting this.strUI values assigned using this.ui
    var symbolUIKeyName = Symbol('stringUISelectors');
    this.strUI[symbolUIKeyName] = {};

    for (var key in this.ui) {
      if (this.ui.hasOwnProperty(key)) {
        this.strUI[symbolUIKeyName][key] = this.ui[key];
      }
    } // Alias reference directly onto the this.strUI prop


    this.strUI = this.strUI[symbolUIKeyName];
    this.setStringUIValues = false;
  }

  try {
    if (this.behaviorName === '') {
      throw {
        type: 'Behavior',
        message: 'Behavior name has not been declared'
      };
    } else {
      // Gives our behaviorName property a suffix.
      if (this.behaviorName.indexOf('-behavior') === -1) {
        this.behaviorName += '-behavior';
      }
    }
  } catch (e) {
    console.error(e);
  }
};

Behavior.setUniqueIdAndName = function (parentName) {
  var name = '';
  this.id = new Date().getTime();

  if (parentName) {
    // Ensures we dont attribute 2 different parents to the same behavior.
    if (this.behaviorName.indexOf('__') > -1) {
      this.behaviorName = this.behaviorName.split('__')[0];
    }

    name = '__' + parentName;
  }

  this.behaviorName = this.behaviorName + name;
};

Behavior.bindUIElements = function () {
  if (!this.ui) {
    return false;
  }

  for (var key in this.ui) {
    var uiElement = this.ui[key]; // Ensures that even if we pass the class as key we re-get the dom node.

    if (typeof this.ui[key] === 'string' || _typeof(this.ui[key]) === 'object' && key.indexOf('.') === -1) {
      // Neccessary for re-binding of events on later rendered elements referenced by this.ui object.
      if (typeof this.ui[key] === 'string' && this.ui[key] !== this.strUI[key]) {
        this.strUI[key] = this.ui[key];
      } // Needed to ensure ui dom elements are rebound


      if (this.customized || typeof uiElement !== 'string') {
        uiElement = this.strUI[key];
      }

      var selector = void 0;

      if (this.component || this.module) {
        if (this.component) {
          selector = this.component.selector;
        } else if (this.module) {
          selector = this.module.selector;
        } // Ensure we only do a find to single node returns from this.dom();


        if (!this.module.selector.length) {
          this.ui[key] = selector.find(uiElement);
        } else {
          this.ui[key] = selector;
        }
      } else {
        this.ui[key] = this.dom(uiElement);
      }
    } else {
      this.ui[key]['selector'] = this.bindEventListeners(key, this.ui[key], this);
    }
  }
};

Behavior.bindEventListeners = function (delegate, selectorObj, context) {
  var selector;

  try {
    if (this.component === undefined && this.module === undefined) {
      throw {
        type: this.behaviorName,
        message: 'Behavior has no parent declared since it was started on its own.'
      };
    } else {
      // Ensure we have a parent selector if none is specified
      if (!selectorObj.parent) {
        if (this.component) {
          selector = this.component.selector;
        } else if (this.module) {
          selector = this.module.selector;
        }
      } else {
        // Allows for functional returns of parent objects under the right context.
        if (typeof selectorObj.parent === 'function') {
          selector = this.dom(selectorObj.parent(this));
        } else {
          selector = this.dom(selectorObj.parent);
        }
      } // Ensure that we are not rebinding the same event on re-rendering of a component.


      selector.off(); // We pass in event, delegate, handler, context which is our behavior.

      selector.on(selectorObj.event, delegate, this[selectorObj.method], context);
    }

    return selector.find(delegate);
  } catch (err) {
    console.error(err);
  }
};

Behavior.unbindUIElements = function () {
  for (var key in this.ui) {
    // Needed to prevent type error not a function when no element doesnt have registered listener.
    if (this.ui.hasOwnProperty(key) && this.ui[key].info !== undefined) {
      this.ui[key].off();
      this.ui[key] = this.strUI[key];
    }
  }
};

Behavior.start = function () {
  this.bindUIElements();
};

/* harmony default export */ __webpack_exports__["default"] = (Behavior);

/***/ }),

/***/ "./src/component.js":
/*!**************************!*\
  !*** ./src/component.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/controller */ "./src/core/controller.js");

var Component = Object.create(_core_controller__WEBPACK_IMPORTED_MODULE_0__["default"]);
Component.id = 0;
Component.type = 'component';
Component.behaviors = [];
Component.preventBehaviorStart = false;

Component.setBehaviors = function () {
  var behaviorsLen = this.behaviors.length;

  if (this.shouldSetBehaviors && behaviorsLen > 0 && !this.hasRendered) {
    for (var i = 0; i < behaviorsLen; i++) {
      var behavior = this.behaviors[i]; // This check is to ensure we are also handling extending the behavior.

      if (behavior.name) {
        var customBehavior = behavior.name;

        try {
          // Necessary if we want to have specific behavior changes on any given component/module
          if (behavior.options) {
            customBehavior.setUniqueIdAndName(this.name);
            customBehavior = this.extend({}, customBehavior, behavior.options);
            behavior = customBehavior;
          } else {
            throw {
              type: "Customization ".concat(behavior.name.behavior),
              message: 'Customization options is either missing or mis-spelled.'
            };
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        behavior.setUniqueIdAndName(this.name);
        behavior = this.extend({}, behavior);
      }

      behavior.component = Object.create(this);

      if (this.module) {
        behavior.module = Object.create(this.module);
      }

      if (this.shouldPreventBehaviorFromStarting(behavior)) {
        continue;
      }

      behavior.start();
    } // Ensures that behaviors are only set one time.


    this.shouldSetBehaviors = false;
  }
};

Component.shouldPreventBehaviorFromStarting = function (behavior) {
  var result = false;

  if (this.preventBehaviorStart) {
    // Need access to behavior when extended under new context.
    if (behavior.name) {
      behavior = behavior.name;
    }

    if (Array.isArray(this.preventBehaviorStart)) {
      result = this.preventBehaviorStart.some(function (item) {
        return behavior.behaviorName.indexOf(item.behaviorName) > -1;
      });
    } else {
      result = behavior.behaviorName.indexOf(this.preventBehaviorStart) > -1;
    }
  }

  return result;
};

Component.setUniqueName = function () {
  var newName = this.name;

  if (newName.indexOf("-".concat(this.type)) === -1) {
    newName = "".concat(newName, "-").concat(this.type, "-").concat(this.id);
  } else {
    newName = "".concat(newName, "-").concat(this.id);
  }

  this.name = newName; // Increment id after name is set so no duplication occurs

  this.id++;
  return newName;
};

/* harmony default export */ __webpack_exports__["default"] = (Component);

/***/ }),

/***/ "./src/composite.js":
/*!**************************!*\
  !*** ./src/composite.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/controller */ "./src/core/controller.js");

var Composite = Object.create(_core_controller__WEBPACK_IMPORTED_MODULE_0__["default"]);
Composite.type = 'composite';
Composite.modules = [];
Composite.components = [];
Composite.children = [];

Composite.internalPostHook = function () {
  if (this.modules.length > 0) {
    this.children.push('modules');
    this.bootstraper(this.modules);
  }

  if (this.components.length > 0) {
    this.children.push('components');
    this.bootstraper(this.components);
  }

  return false;
};

Composite.bootstraper = function (arr) {
  for (var i = 0, len = arr.length; i < len; i++) {
    var strapee = arr[i];

    if (this.store) {
      strapee.store = this.store;
    }

    strapee.composite = this;
    strapee.init();
    strapee.render();
  }
};

Composite.destroyChildren = function () {
  var childrenLen = this.children.length;

  if (childrenLen === 0) {
    return false;
  }

  for (var c = 0; c < childrenLen; c++) {
    var child = this.children[c]; // Ensure if module or component was customized we always have the appropriate referencing context.

    child = child.name ? child.name : child;

    for (var i = 0, len = this[child].length; i < len; i++) {
      if (this[child][i].hasRendered) {
        this[child][i].destroy();
      }
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Composite);

/***/ }),

/***/ "./src/core/controller.js":
/*!********************************!*\
  !*** ./src/core/controller.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ "./src/core/renderer.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


var Controller = Object.create(_renderer__WEBPACK_IMPORTED_MODULE_0__["default"]);
Controller.name = '';
Controller.strUI = {};
Controller.shouldRender = true;
Controller.shouldSetBehaviors = true;

Controller.create = function (options) {
  var extender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _extends(this, options, extender);
};

Controller.init = function () {
  return null;
};

Controller.bindUIElements = function () {
  if (!this.ui) {
    return false;
  }

  for (var key in this.ui) {
    var uiElement = this.ui[key]; // Ensures that even if we pass the class as key we re-get the dom node.

    if (typeof this.ui[key] === 'string' || _typeof(this.ui[key]) === 'object' && key.indexOf('.') === -1) {
      // Neccessary for re-binding of events on later rendered elements referenced by this.ui object.
      if (typeof this.ui[key] === 'string' && this.ui[key] !== this.strUI[key]) {
        this.strUI[key] = this.ui[key];
      } // Needed to ensure ui dom elements are rebound


      if (this.customized || typeof uiElement !== 'string') {
        uiElement = this.strUI[key];
      }

      var selector = void 0;

      if (this.component || this.module) {
        if (this.component) {
          selector = this.component.selector;
        } else if (this.module) {
          selector = this.module.selector;
        } // Ensure we only do a find to single node returns from this.dom();


        if (!this.module.selector.length) {
          this.ui[key] = selector.find(uiElement);
        } else {
          this.ui[key] = selector;
        }
      } else {
        this.ui[key] = this.dom(uiElement);
      }
    } else {
      this.ui[key]['selector'] = this.bindEventListeners(key, this.ui[key], this);
    }
  }
};

Controller.bindEventListeners = function (delegate, selectorObj, context) {
  var selector; // Ensure we have a parent selector if none is specified

  if (!selectorObj.parent) {
    if (this.selector) {
      selector = this.selector;
    } else if (this.module) {
      selector = this.module.selector;
    }
  } else {
    // Allows for functional returns of parent objects under the right context.
    if (typeof selectorObj.parent === 'function') {
      selector = this.dom(selectorObj.parent.call(this));
    } else {
      selector = this.dom(selectorObj.parent);
    }
  } // Ensure that we are not rebinding the same event on re-rendering of a component.


  selector.off(); // We pass in event, delegate, handler, context which is our behavior.

  selector.on(selectorObj.event, delegate, this[selectorObj.method], context);
  return selector.find(delegate);
};

Controller.unbindBehaviorEvents = function () {
  if (this.behaviors.length === 0) {
    return false;
  }

  for (var i = 0; i < this.behaviors.length; i++) {
    var behavior = this.behaviors[i];
    behavior = behavior.name ? behavior.name : behavior;

    if (behavior.ui) {
      behavior.unbindUIElements(); // This is incase of a re-render where we need to set and start the associated behaviors.

      this.shouldSetBehaviors = true;
    } else {
      this.shouldSetBehaviors = false;
    }
  }

  return this;
};

Controller.getBehavior = function (behaviorName) {
  if (this.behaviors.length === 0) {
    return false;
  }

  var result = this.behaviors.filter(function (item) {
    // Ensures that if a behavior was extended we look for the behavior under the .name context
    if (item.name) {
      item = item.name;
    }

    return item.behaviorName === behaviorName;
  });
  return result[0];
};

/* harmony default export */ __webpack_exports__["default"] = (Controller);

/***/ }),

/***/ "./src/core/dom.js":
/*!*************************!*\
  !*** ./src/core/dom.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var DOM = function DOM(selector, context) {
  var selectorRegex = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;

  if (!context) {
    context = document;
  }

  var match;
  var strSelector; // We do not want to get the dom if the selector is already and html node.

  if (typeof selector === 'string') {
    strSelector = selector;
    match = selectorRegex.exec(selector);

    if (match !== null) {
      if (match[1]) {
        // Need a fallback if the context is already an ID and we are using context.find();
        if (context.getElementById) {
          selector = context.getElementById(match[1]);
        } else {
          selector = context.querySelector(match[0]);
        }
      } else if (match[2]) {
        selector = context.getElementsByTagName(match[2]);
      } else if (match[3]) {
        selector = context.getElementsByClassName(match[3]);
      }
    } else {
      selector = context.querySelectorAll(selector);
    } // We need to preserve a string copy of the selector to for reseting purposes.


    if (selector && (selector.strName === undefined || selector.strName && selector.strName !== strSelector)) {
      selector.strName = strSelector;
    }
  }

  if (selector === null || selector && selector.length === 0 && selector !== (window || document)) {
    selector = false;
  } else {
    selector.exists = true;
  }

  if (selector) {
    var len = selector.length;

    if (len) {
      var i = 0;

      do {
        // Add selector chain methods to dom object.
        for (var key in DOMSelectorMethods) {
          if (DOMSelectorMethods.hasOwnProperty(key) && typeof DOMSelectorMethods[key] === 'function') {
            // Set methods on dom object list returned.
            selector[key] = DOMSelectorMethods[key]; // Set methods to each dom object list item.

            selector[i][key] = DOMSelectorMethods[key];
          }
        }

        i++;
      } while (i < len);

      if (len === 1) {
        selector[0].exists = true;
        return selector[0];
      }
    } else {
      // Add selector chain methods to dom object.
      for (var _key in DOMSelectorMethods) {
        if (DOMSelectorMethods.hasOwnProperty(_key) && typeof DOMSelectorMethods[_key] === 'function') {
          selector[_key] = DOMSelectorMethods[_key];
        }
      }
    }
  } else {
    selector = {
      exists: false,
      strName: strSelector
    };
  }

  return selector;
};

var DOMListener = function DOMListener(args, context) {
  var event = args[0];
  var callback = args[1];
  var bubble = args[2] ? args[2] : true;

  if (typeof args[1] === 'function') {
    context.info = {
      event: event,
      callback: callback
    };
    context.addEventListener(event, callback, bubble);
  } else {
    var delegate = args[1];
    callback = args[2];
    bubble = true;
    context.info = {
      event: event,
      delegate: delegate,
      callback: callback
    };
    context.addEventListener(event, function (e) {
      for (var target = e.target; target && target != this; target = target.parentNode) {
        // loop parent nodes from the target to the delegation node
        if (target.matches(delegate)) {
          e.stopPropagation();
          e.delegate = target;
          callback.call(args[3], e, target);
          break;
        }
      }
    }, bubble);
  }

  return context;
};

var DOMSelectorMethods = {
  on: function on() {
    var selector;
    var len = this.length;

    if (!len) {
      selector = new DOMListener(arguments, this);
    } else {
      for (var i = 0; i < len; i++) {
        selector = new DOMListener(arguments, this[i]);
      }
    }

    return selector;
  },
  off: function off() {
    var len = this.length;

    if (!len && this.info) {
      this.removeEventListener(this.info.event, this.info.callback, true);
    } else {
      for (var i = 0; i < len; i++) {
        if (this[i].info) {
          this[i].removeEventListener(this[i].info.event, this[i].info.callback, true);
        }
      }
    }

    return this;
  },
  html: function html(_html) {
    var len = this.length;

    if (!len) {
      this.innerHTML = _html;
    } else {
      for (var i = 0; i < len; i++) {
        if (this[i].innerHTML !== '') {
          this[i].innerHTML = '';
        }

        this[i].innerHTML = _html;
      }
    }

    return this;
  },
  insertHTML: function insertHTML(position, html) {
    var len = this.length;

    if (!len) {
      this.insertAdjacentHTML(position, html);
    } else {
      for (var i = 0; i < len; i++) {
        this[i].insertAdjacentHTML(position, html);
      }
    }

    return this;
  },
  attr: function attr(attribute, property) {
    var len = this.length;

    if (len) {
      for (var i = 0; i < len; i++) {
        if (typeof property !== 'undefined') {
          this[i].setAttribute(attribute, property);
        } else {
          return this[i].getAttribute(attribute);
        }
      }
    } else if (!len && property !== undefined) {
      this.setAttribute(attribute, property);
    }

    return this.getAttribute(attribute);
  },
  val: function val(value) {
    var len = this.length;

    if (!len) {
      if (typeof value !== 'undefined') {
        this.value = value;
      } else {
        return this.value;
      }
    } else {
      for (var i = 0; i < len; i++) {
        if (typeof value !== 'undefined') {
          this[i].value = value;
        } else {
          return this[i].value;
        }
      }
    }

    return this;
  },
  prop: function prop(property, value) {
    var len = this.length;

    if (!len) {
      this[property] = value;
    } else {
      for (var i = 0; i < len; i++) {
        this[i][property] = value;
      }
    }

    return this;
  },
  each: function each(callback) {
    try {
      for (var i = 0, len = this.length; i < len; i++) {
        var el = this[i]; // Add selector chain methods to dom object.

        for (var key in DOMSelectorMethods) {
          if (DOMSelectorMethods.hasOwnProperty(key) && typeof DOMSelectorMethods[key] === 'function') {
            el[key] = DOMSelectorMethods[key];
          }
        }

        callback(el, i, this);
      }
    } catch (e) {
      console.error(e);
    }
  },
  find: function find(selector) {
    return new DOM(selector, this);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (DOM);

/***/ }),

/***/ "./src/core/eventor.js":
/*!*****************************!*\
  !*** ./src/core/eventor.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Eventor = {
  subscriptions: [],
  nativeEvents: ['focus', 'blur', 'click', 'keydown', 'keyup', 'change'],
  publish: function publish(eventName) {
    var eventDetails = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var trigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var event = this.createEvent(eventName, eventDetails);
    this.isPublishedEvent = true;

    if (trigger) {
      this.trigger(event);
    }
  },
  subscribe: function subscribe(event, callback) {
    var bubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var elem = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document;

    // Don't add listener if we already subscribed to the same event.
    if (this.subscriptions.includes(event)) {
      return false;
    }

    this.subscriptions.push(event);
    elem.addEventListener(event, callback, bubble);
  },
  trigger: function trigger(event) {
    var eventDetails = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var elem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

    if (!this.isPublishedEvent) {
      event = this.createEvent(event, eventDetails);
    }

    this.isPublishedEvent = false;
    elem.dispatchEvent(event);
  },
  createEvent: function createEvent(eventName, detail) {
    var event;

    if (this.nativeEvents.some(function (event) {
      return event === eventName;
    })) {
      event = new Event(eventName);
    } else {
      if (detail === null) {
        detail = {};
      }

      event = new CustomEvent(eventName, {
        detail: detail
      });
    }

    return event;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Eventor);

/***/ }),

/***/ "./src/core/renderer.js":
/*!******************************!*\
  !*** ./src/core/renderer.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _traverse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./traverse */ "./src/core/traverse.js");

var Renderer = Object.create(_traverse__WEBPACK_IMPORTED_MODULE_0__["default"]);
Renderer.selector = null;
Renderer.template = null;
Renderer.hasRendered = false;
Renderer.renderType = 'append';
Renderer.renderMultiple = false;

Renderer.beforeRender = function () {
  return null;
};

Renderer.render = function (model) {
  this.destroy();
  this.setDOMSelector();
  this.beforeRender();

  if (!this.shouldRender) {
    return false;
  }

  try {
    this.errorCheck();
    var data = this.serializeData(model ? model : this.store);
    this.addTemplateToDOM(data);
  } catch (e) {
    console.error(e);
  }

  this.internalPostHook();
  this.afterRender();
};

Renderer.internalPostHook = function () {
  if (this.handleAPIUse !== undefined) {
    this.handleAPIUse();
  }

  if (this.setBehaviors !== undefined) {
    this.setBehaviors();
  }

  if (this.ui !== undefined && Object.keys(this.ui).length > 0) {
    this.bindUIElements();
  }

  this.hasRendered = true;
};

Renderer.afterRender = function () {
  return null;
};

Renderer.destroy = function () {
  // We want to destroy only if it has rendered.
  if (!this.hasRendered || this.renderMultiple || !this.hasRendered && this.shouldRender) {
    return null;
  } // Remove Children.


  if (this.destroyChildren !== undefined) {
    this.destroyChildren();
  }

  var firstChildNode = this.selector.firstChild;

  while (firstChildNode) {
    this.selector.removeChild(firstChildNode);
    firstChildNode = this.selector.firstChild;
  } // Ensure we don't get a reference error.


  if (this.unbindBehaviorEvents !== undefined && typeof this.unbindBehaviorEvents === 'function') {
    this.unbindBehaviorEvents();
  }

  if (this.selector instanceof Object) {
    this.selector = this.selector.strName ? this.selector.strName : ".".concat(this.selector.classList[0]);
  }

  this.hasRendered = false;
};

Renderer.setDOMSelector = function () {
  if (typeof this.selector !== 'string') {
    return false;
  } // Ensures that if we are rendering multiple we dont re-render on previous nodes.


  if (this.renderMultiple && this.module !== undefined) {
    this.selector = this.dom("".concat(this.module.selector.strName, " ").concat(this.selector));
  } else {
    this.selector = this.dom(this.selector);
  }

  if (!this.selector.exists) {
    throw new Error("Selector ".concat(this.selector.strName, " defined in ").concat(this.type, " ").concat(this.name, " does not exist in the DOM."));
  }
};

Renderer.addTemplateToDOM = function (data) {
  if (this.shouldRender) {
    var tpl = this.template(data);

    if (this.renderType !== 'append') {
      this.selector.html(tpl);
    } else {
      this.selector.insertHTML('beforeend', tpl);
    }
  } else {
    // Assumes that if shouldRender is being set to false manually we also dont want the container in the DOM.
    this.selector.remove();
  }
};

Renderer.serializeData = function (data) {
  if (data) {
    return data;
  }
};

Renderer.errorCheck = function () {
  var errorObj = {
    type: this.type,
    name: this.name
  };

  if (this.type === 'component' && this.template === null) {
    errorObj.message = 'no template currently exists.';
  }

  if (this.selector === null) {
    errorObj.message = 'The necessary elements to render your components do not exist in the DOM.';
  }

  if (errorObj.message) {
    throw errorObj;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Renderer);

/***/ }),

/***/ "./src/core/storage.js":
/*!*****************************!*\
  !*** ./src/core/storage.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Storage = {
  default: {
    storeName: '',
    storageType: 'session',
    storage: false,
    keysToStore: []
  },
  settings: {},
  config: function config(options) {
    if (options && _typeof(options) === 'object') {
      var newObj = {};

      for (var key in options) {
        try {
          if (!options.storeName && options.storage) {
            throw new Error('storeName is required.');
          }

          if (key && options[key]) {
            switch (key) {
              case 'storeName':
              case 'storageType':
                if (typeof options[key] !== 'string') {
                  throw new Error("The Storage.config() method ".concat(key, " needs to be a string type."));
                }

                break;

              case 'storage':
                if (typeof options[key] !== 'boolean') {
                  throw new Error("The Storage.config() method ".concat(key, " needs to be a boolean."));
                }

                break;

              case 'keysToStore':
                if (!Array.isArray(options[key])) {
                  throw new Error("The Storage.config() method ".concat(key, " needs to be an array."));
                }

                break;

              default: //nothing.

            }

            newObj[key] = options[key];
          }
        } catch (err) {
          console.error(err);
        }
      }

      if (newObj.storeName && newObj.storeName === '' || !newObj.storeName && this.default.storeName === '') {
        var id = new Date().getMilliseconds();
        newObj.storeName = "store-".concat(id);
      }

      this.default = _extends(this.default, newObj);
    }
  },
  set: function set(options) {
    try {
      if (options !== undefined && _typeof(options) === 'object') {
        this.settings = _extends(this.settings, options);
      } else {
        throw new Error('Options must be passed in as an object.');
      }
    } catch (err) {
      console.error(err);
    }
  },
  initStorage: function initStorage() {
    var data = {};
    var newObj = {};

    if (this.default.storageType === 'local') {
      data = localStorage[this.default.storeName];
    } else {
      data = sessionStorage[this.default.storeName];
    }

    if (data && data !== null) {
      data = JSON.parse(data);
    } else {
      return false;
    }

    for (var key in data) {
      if (key && data[key]) {
        newObj[key] = data[key];
      }
    }

    _extends(this.settings, newObj);
  },
  saveSettings: function saveSettings(data) {
    var store = {};

    if (data) {
      store = _extends({}, this.settings, data);
    } else if (this.default.keysToStore.length > 0) {
      // Ensures we only save the specified keys.  
      for (var i = 0, len = this.default.keysToStore.length; i < len; i++) {
        var name = this.default.keysToStore[i];
        store[name] = this.settings[name];
      }
    } else {
      store = this.settings;
    }

    if (this.default.storageType === 'local') {
      localStorage[this.default.storeName] = JSON.stringify(store);
    } else {
      sessionStorage[this.default.storeName] = JSON.stringify(store);
    }
  },
  getSettings: function getSettings(keyName) {
    var stored = {};

    if (this.default.storageType === 'local') {
      stored = localStorage[this.default.storeName];
    } else {
      stored = sessionStorage[this.default.storeName];
    }

    if (stored && stored !== null) {
      stored = JSON.parse(stored);
    } else {
      return false;
    }

    return keyName && stored ? stored[keyName] : stored;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Storage);

/***/ }),

/***/ "./src/core/traverse.js":
/*!******************************!*\
  !*** ./src/core/traverse.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./xhr */ "./src/core/xhr.js");
/* harmony import */ var _eventor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventor */ "./src/core/eventor.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/core/dom.js");
/* harmony import */ var lodash_clonedeep__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash.clonedeep */ "./node_modules/lodash.clonedeep/index.js");
/* harmony import */ var lodash_clonedeep__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_clonedeep__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





var Traverse = Object.create(_xhr__WEBPACK_IMPORTED_MODULE_0__["default"]);
Traverse.events = Object.create(_eventor__WEBPACK_IMPORTED_MODULE_1__["default"]);

Traverse.dom = function (selector) {
  return new _dom__WEBPACK_IMPORTED_MODULE_2__["default"](selector);
};

Traverse.each = function (arr, callback) {
  if (Array.isArray(arr)) {
    for (var i = 0; i < arr.length; i++) {
      callback(arr[i], i, arr);
    }
  } else {
    var obj = arr;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        callback(obj[key], key, obj);
      }
    }
  }
};

Traverse.isObject = function (val) {
  if (val === null) {
    return false;
  }

  return typeof val === 'function' || _typeof(val) === 'object';
};

Traverse.extend = function () {
  for (var i = 1; i < arguments.length; i++) {
    var currentArgObj = arguments[i];

    for (var key in currentArgObj) {
      var value = currentArgObj[key];

      if (_typeof(value) === 'object' && !Array.isArray(value)) {
        value = lodash_clonedeep__WEBPACK_IMPORTED_MODULE_3___default()(currentArgObj[key]);
      }

      arguments[0][key] = value;
    }
  }

  return arguments[0];
};

Traverse.uniqueArray = function (arr) {
  return Array.from(new Set(arr));
};

/* harmony default export */ __webpack_exports__["default"] = (Traverse);

/***/ }),

/***/ "./src/core/xhr.js":
/*!*************************!*\
  !*** ./src/core/xhr.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/core/storage.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


var XHR = Object.create(_storage__WEBPACK_IMPORTED_MODULE_0__["default"]);
XHR.percentComplete = 0;
XHR.storage = null;

XHR.ajax = function (_ref) {
  var options = _extends({}, _ref);

  var url = options.url,
      _options$method = options.method,
      method = _options$method === void 0 ? 'GET' : _options$method,
      _options$headers = options.headers,
      headers = _options$headers === void 0 ? false : _options$headers,
      _options$responseType = options.responseType,
      responseType = _options$responseType === void 0 ? 'json' : _options$responseType,
      _options$widthCredent = options.widthCredentials,
      widthCredentials = _options$widthCredent === void 0 ? false : _options$widthCredent,
      _options$data = options.data,
      data = _options$data === void 0 ? null : _options$data;
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (headers) {
      Object.keys(headers).forEach(function (key) {
        xhr.setRequestHeader(key, headers[key]);
      });
    }

    xhr.responseType = responseType.toLowerCase();
    xhr.widthCredentials = widthCredentials;

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };

    if (data && _typeof(data) === 'object') {
      data = Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      }).join('&');
    }

    xhr.send(data);
  });
};

XHR.error = function () {
  console.log('There was an error with your XHR request');
};

XHR.abort = function () {
  console.log('Aborted your XHR request.');
};

XHR.updateProgress = function (eventObj) {
  if (eventObj.lengthComputable) {
    this.percentComplete = eventObj.loaded / eventObj.total * 100;
  } else {
    Internal.warnings.push({
      type: 'XHR.' + this.methodType,
      description: 'Unable to update "' + this.methodType + '" xhr request progress.'
    });
  }
};

/* harmony default export */ __webpack_exports__["default"] = (XHR);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _core_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/storage */ "./src/core/storage.js");
/* harmony import */ var _behavior__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./behavior */ "./src/behavior.js");
/* harmony import */ var _composite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./composite */ "./src/composite.js");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component */ "./src/component.js");
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./module */ "./src/module.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }






var root = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self.self === self && self || (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global.global === global && global || undefined || {};
var Zense = {
  Storage: _core_storage__WEBPACK_IMPORTED_MODULE_0__["default"],
  Behavior: _behavior__WEBPACK_IMPORTED_MODULE_1__["default"],
  Composite: _composite__WEBPACK_IMPORTED_MODULE_2__["default"],
  Component: _component__WEBPACK_IMPORTED_MODULE_3__["default"],
  Module: _module__WEBPACK_IMPORTED_MODULE_4__["default"]
};
Zense.VERSION = '1.6.4'; // Export Zense object for **Node.js**, with
// backwards-compatibility for their old module API. 

if (typeof exports != 'undefined' && !exports.nodeType) {
  if ( true && !module.nodeType && module.exports) {
    exports = module.exports = Zense;
  }

  exports.Zense = Zense;
} else {
  root.Zense = Zense;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/module.js":
/*!***********************!*\
  !*** ./src/module.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/controller */ "./src/core/controller.js");

var Module = Object.create(_core_controller__WEBPACK_IMPORTED_MODULE_0__["default"]);
Module.type = 'module';
Module.behaviors = [];
Module.components = [];
Module.componentNameArray = [];
Module.shouldRenderChildren = true;
Module.shouldSetBehaviors = true;

Module.handleAPIUse = function () {
  if (this.api) {
    this.ajax({
      url: this.api
    }).then(this.addComponents.bind(this));
  } else {
    this.addComponents();
  }
};

Module.addComponents = function (res) {
  var componentsLen = this.components.length; // Do nothing if no child components exist

  if (!Array.isArray(this.components) && componentsLen === 0) {
    return null;
  } // Don't render children if we have no DATA!


  if (res !== undefined && Object.keys(res).length === 0) {
    shouldRenderChildren = false;
  }

  this.beforeAddComponents();

  for (var i = 0; i < componentsLen; i++) {
    var component = this.components[i]; // This check is to ensure we are also handling extending the component.

    if (component.name && component.options) {
      var customComponent = this.components[i].name;
      customComponent.store = this.api || res ? res : null;
      component = this.extend(customComponent, this.components[i].options);
    } else {
      component = Object.create(component);
      component.store = this.api || res ? res : null;
    } // Let the component know whos their daddy.


    component.module = Object.create(this); // We need to ensure every component has a unique name set for debugging and error handling purposes.

    this.checkUniqueName(component);
    component.init();

    if (!this.shouldRenderChildren) {
      continue;
    } // shouldRenderChildren property exists so you can decide where and/or when a component should render.


    if (component.shouldRender && component.template !== '') {
      component.render();
    } else {// console.log('Component: ' + componentName + ' Error: Nees a template!');
      // Internal.errors.push({
      //   selector: component.selector,
      //   component: component.name,
      //   description: 'This component needs a template!'
      // });
    }
  }

  this.afterAddComponents();
};

Module.beforeAddComponents = function () {
  return false;
};

Module.afterAddComponents = function () {
  return false;
};

Module.setBehaviors = function () {
  var behaviorsLen = this.behaviors.length;

  if (this.shouldSetBehaviors && behaviorsLen > 0) {
    for (var i = 0; i < behaviorsLen; i++) {
      var behavior = this.behaviors[i]; // This check is to ensure we are also handling extending the behavior.

      if (behavior.name) {
        var customBehavior = behavior.name;

        try {
          // Necessary if we want to have specific behavior changes on any given component/module
          if (behavior.options) {
            customBehavior.setUniqueIdAndName(this.name);
            customBehavior = this.extend({}, customBehavior, behavior.options);
            behavior = customBehavior;
          } else {
            throw {
              type: "Customization ".concat(behavior.name.behavior),
              message: 'Customization options is either missing or mis-spelled.'
            };
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        behavior.setUniqueIdAndName(this.name);
        behavior = this.extend({}, behavior);
      } // We need to let the behavior who the parent caller are.


      behavior.module = Object.create(this);
      behavior.start();
    } // Ensures that behaviors are only set one time.


    this.shouldSetBehaviors = false;
  }
};

Module.destroyChildren = function () {
  var componentsLen = this.components.length;

  if (componentsLen === 0) {
    return false;
  }

  var i = 0;
  var component = this.components[i]; // Ensure if component was customized we always have the appropriate referencing context.

  component = component.name ? component.name : component;

  do {
    if (this.components[i].hasRendered) {
      this.components[i].destroy();
    }

    i++;
  } while (i < componentsLen);
}; // Needed to ensure that if we have more than 1 of the same component we give it a unique name.


Module.checkUniqueName = function (component) {
  var doesntExist = this.componentNameArray.includes(function (name) {
    return name.indexOf(component.name) >= 0;
  });

  if (!doesntExist) {
    this.componentNameArray.push(component.name + '-1');
    return true;
  }

  component.setUniqueName();
  return false;
};

Module.getChildComponent = function (componentName) {
  for (var i = 0, len = this.components.length; i < len; i++) {
    if (this.components[i].name.indexOf(componentName) > -1) {
      return this.components[i];
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Module);

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });