import Xhr from './xhr';

const SelectorMethods = {
  on(event, callback, bubble = true) {
    if (!this.length) {
      this.addEventListener(event, callback, bubble);
    } else {
      for (let i = 0; i < this.length; i++) {
        this[i].addEventListener(event, callback, bubble);
      }
    }
  },

  html(html) {
    if (!this.length) {
      this.innerHTML = html;
    } else {
      for (let i = 0; i < this.length; i++) {
        if (this[i].innerHTML !== '') {
          this[i].innerHTML = '';
        }

        this[i].innerHTML = html;
      }
    }
  },

  append(html) {
    if (!this.length) {
      this.insertAdjacentHTML('beforeend', html);
    } else {
      for (let i = 0; i < this.length; i++) {
        this[i].insertAdjacentHTML('beforeend', html);
      }
    }
  },

  each(callback) {
    try {
      for (let i = 0; i < this.length; i++) {
        let el = this[i];

        callback(el, i, this);
      }
    } catch (e) {
      console.error(e);
    }
  },

  attr(attribute, property) {
    for (let i = 0; i < this.length; i++) {
      if (typeof property !== 'undefined') {
        this[i].setAttribute(attribute, property);    
      } else {
        return this[i].getAttribute(attribute);
      }
    }
  },

  val(value) {
    if (!this.length) {
      if (typeof value !== undefined) {
        this.value = value;
      } else {
        return this.value;
      }
    } else {
      for (let i = 0; i < this.length; i++) {
        if (typeof value !== undefined) {
          this[i].value = value;
        } else {
          return this[i].value;
        }
      }
    }
  },

  prop(property, value) {
    if (!this.length) {
      this[property] = value;
    } else {
      for (let i = 0; i < this.length; i++) {
        this[i][property] = value;
      }
    }
  },

  hasAttribute(attribute) {
    for (let i = 0; i < this.length; i++) {
      return this[i].hasAttribute(attribute);
    }
  },

  removeAttribute(attribute) {
    for (let i = 0; i < this.length; i++) {
      this[i].removeAttribute(attribute);
    }
  }
};

const Util = Object.create(Xhr);

Util.dom = function (selector) {
  // We need to preserve a string version of selector for error handling later on.
  let selectorStr = '';

  // We do not want to get the dom if the selector is already and html node.
  if (typeof selector === 'string') {
    selectorStr = selector;

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

  if (selector === null || selector.length === 0) {
    throw { message: 'Selector "' + selectorStr + '" does not exist in the DOM.' };
  }

  // Add selector chain methods to dom object.
  for (let key in SelectorMethods) {
    if (SelectorMethods.hasOwnProperty(key)) {
      selector[key] = SelectorMethods[key];
    }
  }

  return selector;
};

// I did it for the children :-)
Util.each = function (arr, callback) {
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i], i, arr);
    }
  } else {
    let obj = arr;
    
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        callback(obj[key], key, obj);
      }
    }
  }
};

Util.isObject = function (val) {
  if (val === null) { return false; }
  return ((typeof val === 'function') || (typeof val === 'object'));
};

Util.extend = function () {
  for (let i = 1; i < arguments.length; i++) {
    for (let key in arguments[i]) {
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

export default Util;