import Xhr from './xhr';
import Eventor from './eventor';

const SelectorMethods = {
  on(event, callback, bubble = true) {
    if (!this.length) {
      this.info = { event, callback };

      this.addEventListener(event, callback, bubble);

      return this;
    } else {
      for (let i = 0; i < this.length; i++) {
        this[i].info = { event, callback };

        this[i].addEventListener(event, callback, bubble);
      }

      return this;
    }
  },

  off() {
    if (!this.length && this.info) {
      this.removeEventListener(this.info.event, this.info.callback, true);

      return this;
    } else {
      for (let i = 0; i < this.length; i++) {
        if (this[i].info) {
          this[i].removeEventListener(this[i].info.event, this[i].info.callback, true);
        }
      }

      return this;
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

  insertHTML(position, html) {
    if (!this.length) {
      this.insertAdjacentHTML(position, html);
    } else {
      for (let i = 0; i < this.length; i++) {
        this[i].insertAdjacentHTML(position, html);
      }
    }

    return this;
  },

  attr(attribute, property) {
    for (let i = 0; i < this.length; i++) {
      if (typeof property !== 'undefined') {
        this[i].setAttribute(attribute, property);    
      } else {
        return this[i].getAttribute(attribute);
      }
    }

    return this;
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

    return this;
  },

  prop(property, value) {
    if (!this.length) {
      this[property] = value;
    } else {
      for (let i = 0; i < this.length; i++) {
        this[i][property] = value;
      }
    }

    return this;
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
  },

  each(callback) {
    try {
      for (let i = 0; i < this.length; i++) {
        let el = this[i];

        // Add selector chain methods to dom object.
        for (let key in this) {
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

const Util = Object.create(Xhr);

Util.events = Object.create(Eventor);

Util.strSelector = null;

Util.dom = function (selector) {
  if (!selector) { return this; }

  // We do not want to get the dom if the selector is already and html node.
  if (typeof selector === 'string') {

    // We need to preserve a string copy of the selector to for reseting purposes.
    if (this.strSelector === null) {
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
    throw { message: 'Selector "' + this.strSelector + '" does not exist in the DOM.' };
  }

  // Add selector chain methods to dom object.
  for (let key in SelectorMethods) {
    if (SelectorMethods.hasOwnProperty(key)) {
      selector[key] = SelectorMethods[key];
    }
  }

  return selector;
};

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