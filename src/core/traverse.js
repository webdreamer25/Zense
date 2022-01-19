import Storage from './storage';
import DOM from './dom';
import cloneDeep from 'lodash.clonedeep';

const Traverse = Object.create(Storage);

Traverse.dom = function (selector) {
  return new DOM(selector);
}

Traverse.each = function (arr, callback) {
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
}

Traverse.isObject = function (val) {
  if (val === null) { return false; }
  return ((typeof val === 'function') || (typeof val === 'object'));
}

Traverse.extend = function () {
  for (let i = 1; i < arguments.length; i++) {
    let currentArgObj = arguments[i];

    for (let key in currentArgObj) {
      let value = currentArgObj[key];

      if (typeof value === 'object' && !Array.isArray(value)) {
        value = cloneDeep(currentArgObj[key]);
      }

      arguments[0][key] = value;
    }  
  }

  return arguments[0];
}

Traverse.uniqueArray = function (arr) {
  return Array.from(new Set(arr));
}

export default Traverse;