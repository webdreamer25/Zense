import Util from './core/util';

const Behavior = Object.create(Util);

Behavior.ui = {};
Behavior.strUI = {};
Behavior.customized = false;

Behavior.config = function (options) {
  Object.assign(this, options);
};

Behavior.bindUIElements = function () {
  if (!this.ui) { return null; }
  
  Object.keys(this.ui).forEach(function (key) {
    let uiElement = this.ui[key];

    // Neccessary for re-binding of events on later rendered elements referenced by this.ui object.
    if (typeof this.ui[key] === 'string' || (this.strUI !== null && this.ui[key] === this.strUI[key])) {
      this.strUI[key] = this.ui[key];
    }

    // Needed to ensure ui dom elements are rebound
    if (this.customized || typeof uiElement !== 'string') {
      uiElement = this.strUI[key];
    }

    this.ui[key] = this.dom(uiElement);
  }.bind(this));
};

Behavior.start = function () {
  return null;
};

export default Behavior;