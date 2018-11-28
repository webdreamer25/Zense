import Xhr from './xhr';

const Util = Object.create(Xhr);

Util.dom = function (selector) {
  // We need to preserve a string version of selector for error handling later on.
  let selectorStr = '';

  if (typeof selector === 'string') {
    selectorStr = selector;

    switch (selector.charAt(0)) {
      case '#':
        selector = document.getElementById(selector.slice(1));

        break;
      default:
        selector = document.querySelectorAll(selector);         
    }
  }

  if (selector === null || selector.length === 0) {
    throw { message: 'Selector "' + selectorStr + '" does not exist in the DOM.' };
  }

  selector.on = function (event, callback, bubble = true) {
    if (!this.length) {
      this.addEventListener(event, callback, bubble);
    } else {
      for (let i = 0; i < selector.length; i++) {
        this[i].addEventListener(event, callback, bubble);
      }
    }
  };

  selector.html = function (html) {
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
  };

  selector.append = function (html) {
    if (!this.length) {
      this.insertAdjacentHTML('beforeend', html);
    } else {
      for (let i = 0; i < this.length; i++) {
        this[i].insertAdjacentHTML('beforeend', html);
      }
    }
  };

  selector.each = function (callback) {
    try {
      for (let i = 0; i < this.length; i++) {
        let el = this[i];

        callback(el, i, this);
      }
    } catch (e) {
      console.error(e);
    }
  };

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

export default Util;