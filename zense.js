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
	g = g || Function("return this")() || (1, eval)("this");
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

/***/ "./src/behavior.js":
/*!*************************!*\
  !*** ./src/behavior.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/util */ "./src/core/util.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


var Behavior = Object.create(_core_util__WEBPACK_IMPORTED_MODULE_0__["default"]);
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
}; // This will gather the DOM elements specified in ui:{} object.


Behavior.bindUIElements = function () {
  var _this = this;

  if (!this.ui) {
    return false;
  }

  Object.keys(this.ui).forEach(function (key) {
    var uiElement = _this.ui[key]; // Neccessary for re-binding of events on later rendered elements referenced by this.ui object.

    if (typeof _this.ui[key] === 'string' && _this.ui[key] !== _this.strUI[key]) {
      _this.strUI[key] = _this.ui[key];
    } // Needed to ensure ui dom elements are rebound


    if (_this.customized || typeof uiElement !== 'string') {
      uiElement = _this.strUI[key];
    }

    _this.ui[key] = _this.dom(uiElement);
  });
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

Behavior.handlers = function () {
  return null;
};

Behavior.start = function () {
  return null;
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

Component.setBehaviors = function () {
  if (this.shouldSetBehaviors && this.behaviors.length > 0 && !this.hasRendered) {
    for (var i = 0; i < this.behaviors.length; i++) {
      var behavior = this.behaviors[i]; // This check is to ensure we are also handling extending the behavior.

      if (behavior.name) {
        behavior = this.behaviors[i].name; // Necessary if we want to have specific behavior changes on any given component/module

        if (this.behaviors[i].options) {
          behavior = this.customizeObject(behavior, this.behaviors[i].options);
        }
      } // We need to let the behavior who the parent and grandparent caller are.


      behavior.component = this;
      behavior.module = this.module;
      behavior.bindUIElements();
      behavior.start();
    } // Ensures that behaviors are only set one time.


    this.shouldSetBehaviors = false;
  }
};

Component.setName = function (selector) {
  selector = selector.toLowerCase();
  this.name = selector.slice(1) + '-' + this.type + '-' + this.id; // Increment id after name is set so no duplication occurs

  this.id++;
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
Composite.modules = [];
Composite.components = [];

Composite.internalPostHook = function () {
  if (this.modules.length > 0) {
    this.bootstraper(this.modules);
  }

  if (this.components.length > 0) {
    this.bootstraper(this.components);
  }

  return false;
};

Composite.bootstraper = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var strapee = arr[i];

    if (this.store) {
      strapee.store = this.store;
    }

    strapee.composite = this;
    strapee.render();
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
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


var Controller = Object.create(_renderer__WEBPACK_IMPORTED_MODULE_0__["default"]);
Controller.name = '';
Controller.strUI = {};
Controller.shouldRender = true;
Controller.shouldSetBehaviors = true;

Controller.create = function (options) {
  _extends(this, options);

  this.initialize();
};

Controller.initialize = function () {
  return null;
};

Controller.bindUIElements = function () {
  var _this = this;

  if (!this.ui) {
    return null;
  }

  Object.keys(this.ui).forEach(function (key) {
    var uiElement = _this.ui[key]; // Neccessary for re-binding of events on later rendered elements referenced by this.ui object.

    if (typeof _this.ui[key] === 'string' && _this.ui[key] !== _this.strUI[key]) {
      _this.strUI[key] = _this.ui[key];
    } // Needed to ensure ui dom elements are rebound


    if (_this.customized || typeof uiElement !== 'string') {
      uiElement = _this.strUI[key];
    }

    _this.ui[key] = _this.dom(uiElement);
  });
};

Controller.unbindBehaviorEvents = function () {
  if (this.behaviors.length === 0) {
    return false;
  }

  for (var i = 0; i < this.behaviors.length; i++) {
    if (this.behaviors[i].ui) {
      this.behaviors[i].unbindUIElements(); // This is incase of a re-render where we need to set and start the associated behaviors.

      this.shouldSetBehaviors = true;
    } else {
      this.shouldSetBehaviors = false;
    }
  }

  return this;
};

Controller.customizeObject = function (customObj, options) {
  var _this2 = this;

  if (typeof options !== 'function') {
    Object.keys(options).forEach(function (key) {
      // We only want to extend existing porperties under customObj
      if (customObj[key] === options[key]) {
        customObj[key] = _this2.extend({}, customObj[key], options[key]);
      } else {
        customObj[key] = options[key];
      }
    });
  } else {
    // Allow developers to figure out how they with overwite behaviors
    customObj = obj();
  }

  return customObj;
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

/***/ "./src/core/eventor.js":
/*!*****************************!*\
  !*** ./src/core/eventor.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Eventor = {
  events: {},
  publish: function publish(eventName) {
    var eventDetails = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var trigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var event; // If the event already exists do not create a duplicate.

    if (_typeof(this.events[eventName]) === undefined) {
      return null;
    }

    if (eventDetails === null) {
      event = new Event(eventName);
    } else {
      event = new CustomEvent(eventName, {
        detail: eventDetails
      });
    }

    this.events[eventName] = event;

    if (trigger) {
      this.trigger(eventName);
    }
  },
  subscribe: function subscribe(event, callback) {
    var bubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var elem = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document;
    elem.addEventListener(event, callback, bubble);
  },
  trigger: function trigger(event) {
    var elem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    elem.dispatchEvent(this.events[event]);
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/core/util.js");

var Renderer = Object.create(_util__WEBPACK_IMPORTED_MODULE_0__["default"]);
Renderer.regions = [];
Renderer.selector = null;
Renderer.template = null;
Renderer.hasRendered = false;
Renderer.renderType = 'append';

Renderer.beforeRender = function () {
  return null;
};

Renderer.render = function (model) {
  this.destroy();
  this.setDOMSelector();
  this.beforeRender();

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

  this.hasRendered = true;
};

Renderer.afterRender = function () {
  return null;
};

Renderer.destroy = function () {
  // We want to destroy only if it has rendered.
  if (!this.hasRendered || !this.hasRendered && this.shouldRender) {
    return null;
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
    this.selector = this.strSelector;
  }

  return this;
};

Renderer.setDOMSelector = function () {
  this.selector = this.dom(this.selector); // We want to ensure that if no selector is specified the selector chosen is the parent modules selector
  // this is incase we have an instance of appending purely on the parent element vs a specific container.

  if (typeof this.selector === 'undefined' && this.selector === null) {
    this.selector = this.regions[0];
  }

  this.regions.push(this.selector);
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

/***/ "./src/core/util.js":
/*!**************************!*\
  !*** ./src/core/util.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./xhr */ "./src/core/xhr.js");
/* harmony import */ var _eventor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventor */ "./src/core/eventor.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var SelectorMethods = {
  on: function on(event, callback) {
    var bubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (!this.length) {
      this.info = {
        event: event,
        callback: callback
      };
      this.addEventListener(event, callback, bubble);
      return this;
    } else {
      for (var i = 0; i < this.length; i++) {
        this[i].info = {
          event: event,
          callback: callback
        };
        this[i].addEventListener(event, callback, bubble);
      }

      return this;
    }
  },
  off: function off() {
    if (!this.length && this.info) {
      this.removeEventListener(this.info.event, this.info.callback, true);
      return this;
    } else {
      for (var i = 0; i < this.length; i++) {
        if (this[i].info) {
          this[i].removeEventListener(this[i].info.event, this[i].info.callback, true);
        }
      }

      return this;
    }
  },
  html: function html(_html) {
    if (!this.length) {
      this.innerHTML = _html;
    } else {
      for (var i = 0; i < this.length; i++) {
        if (this[i].innerHTML !== '') {
          this[i].innerHTML = '';
        }

        this[i].innerHTML = _html;
      }
    }
  },
  insertHTML: function insertHTML(position, html) {
    if (!this.length) {
      this.insertAdjacentHTML(position, html);
    } else {
      for (var i = 0; i < this.length; i++) {
        this[i].insertAdjacentHTML(position, html);
      }
    }

    return this;
  },
  attr: function attr(attribute, property) {
    for (var i = 0; i < this.length; i++) {
      if (typeof property !== 'undefined') {
        this[i].setAttribute(attribute, property);
      } else {
        return this[i].getAttribute(attribute);
      }
    }

    return this;
  },
  val: function val(value) {
    if (!this.length) {
      if (_typeof(value) !== undefined) {
        this.value = value;
      } else {
        return this.value;
      }
    } else {
      for (var i = 0; i < this.length; i++) {
        if (_typeof(value) !== undefined) {
          this[i].value = value;
        } else {
          return this[i].value;
        }
      }
    }

    return this;
  },
  prop: function prop(property, value) {
    if (!this.length) {
      this[property] = value;
    } else {
      for (var i = 0; i < this.length; i++) {
        this[i][property] = value;
      }
    }

    return this;
  },
  hasAttribute: function hasAttribute(attribute) {
    for (var i = 0; i < this.length; i++) {
      return this[i].hasAttribute(attribute);
    }
  },
  removeAttribute: function removeAttribute(attribute) {
    for (var i = 0; i < this.length; i++) {
      this[i].removeAttribute(attribute);
    }
  },
  each: function each(callback) {
    try {
      for (var i = 0; i < this.length; i++) {
        var el = this[i]; // Add selector chain methods to dom object.

        for (var key in this) {
          if (this.hasOwnProperty(key) && typeof this[key] === 'function') {
            el[key] = this[key];
          }
        }

        callback(el, i, this);
      }
    } catch (e) {
      console.error(e);
    }
  }
};
var Util = Object.create(_xhr__WEBPACK_IMPORTED_MODULE_0__["default"]);
Util.events = Object.create(_eventor__WEBPACK_IMPORTED_MODULE_1__["default"]);
Util.strSelector = null;

Util.dom = function (selector) {
  if (!selector) {
    return this;
  } // We do not want to get the dom if the selector is already and html node.


  if (typeof selector === 'string') {
    // We need to preserve a string copy of the selector to for reseting purposes.
    if (this.strSelector === null || this.strSelector !== selector) {
      this.strSelector = selector;
    }

    switch (selector.charAt(0)) {
      case '#':
        selector = document.getElementById(selector.slice(1));
        break;

      case '.':
        selector = document.querySelectorAll(selector);
        break;

      default:
        selector = document.querySelector(selector);
    }
  }

  if (selector === null || selector.length === 0 && selector !== (window || document)) {
    throw {
      message: 'Selector "' + this.strSelector + '" does not exist in the DOM.'
    };
  } // Add selector chain methods to dom object.


  for (var key in SelectorMethods) {
    if (SelectorMethods.hasOwnProperty(key)) {
      selector[key] = SelectorMethods[key];
    }
  }

  return selector;
};

Util.each = function (arr, callback) {
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

Util.isObject = function (val) {
  if (val === null) {
    return false;
  }

  return typeof val === 'function' || _typeof(val) === 'object';
};

Util.extend = function () {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        arguments[0][key] = arguments[i][key];
      }
    }
  }

  return arguments[0];
};

Util.uniqueArray = function (arr) {
  return Array.from(new Set(arr));
};

/* harmony default export */ __webpack_exports__["default"] = (Util);

/***/ }),

/***/ "./src/core/xhr.js":
/*!*************************!*\
  !*** ./src/core/xhr.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var XHR = {};
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
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _behavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./behavior */ "./src/behavior.js");
/* harmony import */ var _composite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./composite */ "./src/composite.js");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component */ "./src/component.js");
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./module */ "./src/module.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





var root = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self.self === self && self || (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global.global === global && global || undefined || {};
var Zense = {
  Behavior: _behavior__WEBPACK_IMPORTED_MODULE_0__["default"],
  Composite: _composite__WEBPACK_IMPORTED_MODULE_1__["default"],
  Component: _component__WEBPACK_IMPORTED_MODULE_2__["default"],
  Module: _module__WEBPACK_IMPORTED_MODULE_3__["default"]
};
Zense.VERSION = '1.1.2'; // Export Zense object for **Node.js**, with
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
  // Do nothing if no child components exist
  if (!Array.isArray(this.components) && this.components.length === 0) {
    return null;
  } // Don't render children if we have no DATA!


  if (res !== undefined && Object.keys(res).length === 0) {
    shouldRenderChildren = false;
  }

  for (var i = 0; i < this.components.length; i++) {
    var component = this.components[i]; // Let the component know whos their daddy.

    component.module = this;
    component.store = this.api || res ? res : null; // We need to ensure every component has a unique name set for debugging and error handling purposes.

    this.checkUniqueName(component); // shouldRenderChildren property exists so you can decide where and/or when a component should render.

    if ((component.shouldRender || this.shouldRenderChildren) && component.template !== '') {
      component.render();
    } else {// console.log('Component: ' + componentName + ' Error: Nees a template!');
      // Internal.errors.push({
      //   selector: component.selector,
      //   component: component.name,
      //   description: 'This component needs a template!'
      // });
    }
  }
};

Module.setBehaviors = function () {
  if (this.shouldSetBehaviors && this.behaviors.length > 0) {
    for (var i = 0; i < this.behaviors.length; i++) {
      var behavior = this.behaviors[i]; // This check is to ensure we are also handling extending the behavior.

      if (behavior.name) {
        behavior = this.behaviors[i].name; // Necessary if we want to have specific behavior changes on any given component/module

        if (this.behaviors[i].options) {
          behavior = this.customizeObject(behavior, this.behaviors[i].options);
        }
      } // We need to let the behavior who the parent caller is.


      behavior.module = this;
      behavior.bindUIElements();
      behavior.start();
    } // Ensures that behaviors are only set one time.


    this.shouldSetBehaviors = false;
  }
}; // Needed to ensure that if we have more than 1 of the same component we give it a unique name.


Module.checkUniqueName = function (component) {
  this.componentNameArray.push(component.name);

  for (var i = 0; i < this.componentNameArray.length; i++) {
    if (this.componentNameArray[i] !== component.name && component.name !== '') {
      return null;
    } else {
      component.setName(component.selector);
    }
  }
};

Module.getChildComponent = function (componentName) {
  for (var i = 0; i < this.components.length; i++) {
    if (this.components[i].name === componentName) {
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