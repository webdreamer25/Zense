import Behavior from './behavior';
import Composite from './composite';
import Component from './component';
import Module from './module';

const root = typeof self == 'object' && self.self === self && self ||
  typeof global == 'object' && global.global === global && global ||
  this ||
  {};

export {
  Behavior,
  Composite,
  Component,
  Module
};

// Zense.VERSION = '1.1.0';

// Export Zense object for **Node.js**, with
// backwards-compatibility for their old module API. If we're in
// the browser, add `_` as a global object.
// (`nodeType` is checked to ensure that `module`
// and `exports` are not HTML elements.)
// if (typeof exports != 'undefined' && !exports.nodeType) {
//   if (typeof module != 'undefined' && !module.nodeType && module.exports) {
//     exports = module.exports = Zense;
//   }

//   exports.Zense = Zense;
// } else {
//   root.Zense = Zense;
// }
