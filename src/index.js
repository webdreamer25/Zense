import App from './core/app';
import Storage from './core/storage';
import Behavior from './behavior';
import Composite from './composite';
import Component from './component';
import Module from './module';

const root = typeof self == 'object' && self.self === self && self ||
  typeof global == 'object' && global.global === global && global ||
  this ||
  {};

const Zense = {
  Storage,
  Behavior,
  Composite,
  Component,
  Module, 
  App
}

Zense.VERSION = '1.7.5';

// Export Zense object for **Node.js**, with
// backwards-compatibility for their old module API. 
if (typeof exports != 'undefined' && !exports.nodeType) {
  if (typeof module != 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = Zense;
  }

  exports.Zense = Zense;
} else {
  root.Zense = Zense;
}
