import Xhr from './xhr';
import Eventor from './eventor';

const selectorRegex = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;

const SelectorMethods = {
  on(event, callback, bubble = true) {
    if (!this.length) {
      this.info = { event, callback };

      this.addEventListener(event, callback, bubble);
    } else {
      let i = 0;

      do {
        this[i].info = { event, callback };

        this[i].addEventListener(event, callback, bubble);

        i++
      } while (i < this.length);
    }

    return this;
  },

  off() {
    if (!this.length && this.info) {
      this.removeEventListener(this.info.event, this.info.callback, true);
    } else {
      for (let i = 0; i < this.length; i++) {
        if (this[i].info) {
          this[i].removeEventListener(this[i].info.event, this[i].info.callback, true);
        }
      }
    }

    return this;
  },

  html(html) {
    if (!this.length) {
      this.innerHTML = html;
    } else {
      let i = 0;

      do {
        if (this[i].innerHTML !== '') {
          this[i].innerHTML = '';
        }

        this[i].innerHTML = html;

        i++;
      } while (i < this.length);
    }

    return this;
  },

  insertHTML(position, html) {
    if (!this.length) {
      this.insertAdjacentHTML(position, html);
    } else {
      let i = 0;

      do {
        this[i].insertAdjacentHTML(position, html);

        i++;
      } while (i < this.length);
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
  },

  find(node) {
    let result;
    let selector = this;
    let match = selectorRegex.exec(node);

    // Return early from calls with invalid selector or context
    if (typeof node !== 'string') {
      return false;
    }

    if (match[1]) {
      result = selector.getElementById(match[1]);
    } else if (match[2]) {
      result = selector.getElementsByTagName(match[2]);
    } else if (match[3]) {
      result = selector.getElementsByClassName(match[3]);
    }

    if (result.length) {
      let i = 0;

      do {

        // Add selector chain methods to dom object.
        for (let key in SelectorMethods) {
          if (SelectorMethods.hasOwnProperty(key) && typeof SelectorMethods[key] === 'function') {

            // Set methods on dom object list returned.
            result[key] = SelectorMethods[key];

            // Set methods to each dom object list item.
            result[i][key] = SelectorMethods[key];
          }
        }

        i++;
      } while (i < result.length);

      if (result.length === 1) {
        return result[0];
      }
    } else {

      // Add selector chain methods to dom object.
      for (let key in SelectorMethods) {
        if (SelectorMethods.hasOwnProperty(key) && typeof SelectorMethods[key] === 'function') {
          result[key] = SelectorMethods[key];
        }
      }
  
    }

    return result;
  }
};

const Util = Object.create(Xhr);

Util.events = Object.create(Eventor);

Util.strSelector = null;

Util.dom = function (selector) {
  if (!selector) { return this; }

  // We do not want to get the dom if the selector is already and html node.
  if (typeof selector === 'string') {
    let match = selectorRegex.exec(selector);

    // We need to preserve a string copy of the selector to for reseting purposes.
    if (this.strSelector === null || this.strSelector !== selector) {
      this.strSelector = selector;
    }

    if (match[1]) {
      selector = document.getElementById(match[1]);
    } else if (match[2]) {
      selector = document.getElementsByTagName(match[2]);
    } else if (match[3]) {
      selector = document.getElementsByClassName(match[3]);
    }
  } 

  if (selector === null || selector.length === 0 && selector !== (window || document)) {
    throw { message: 'Selector "' + this.strSelector + '" does not exist in the DOM.' };
  }

  if (selector.length) {
    let i = 0;

    do {

      // Add selector chain methods to dom object.
      for (let key in SelectorMethods) {
        if (SelectorMethods.hasOwnProperty(key) && typeof SelectorMethods[key] === 'function') {
          
          // Set methods on dom object list returned.
          selector[key] = SelectorMethods[key];

          // Set methods to each dom object list item.
          selector[i][key] = SelectorMethods[key];
        }
      }

      i++;
    } while (i < selector.length);

    if (selector.length === 1) {
      return selector[0];
    }
  } else {

    // Add selector chain methods to dom object.
    for (let key in SelectorMethods) {
      if (SelectorMethods.hasOwnProperty(key) && typeof SelectorMethods[key] === 'function') {
        selector[key] = SelectorMethods[key];
      }
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
  try {
    for (let i = 1; i < arguments.length; i++) {
      if (typeof arguments[i] !== 'object') {
        throw new Error('One or more arguments is not an "Object".');
      }

      for (let key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) { 
          arguments[0][key] = arguments[i][key];
        }
      }
    }

    return arguments[0];
  } catch (e) {
    console.error(e);
  }
};

Util.uniqueArray = function (arr) {
  return Array.from(new Set(arr));
};

export default Util;