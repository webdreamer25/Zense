import Util from './core/util';

const Behavior = Object.create(Util);

Behavior.ui = {};
Behavior.strUI = {};
Behavior.behaviorName = '';
Behavior.customized = false;
Behavior.setStringUIValues = true;

Behavior.config = function (options) {
  Object.assign(this, options);

  // Need to keep a string 
  if (this.setStringUIValues) {
    // We create a symbol to prevent Object.assign from overwritting this.strUI values assigned using this.ui
    let symbolUIKeyName = Symbol('stringUISelectors');

    this.strUI[symbolUIKeyName] = {};

    for (let key in this.ui) {
      if (this.ui.hasOwnProperty(key)) {
        this.strUI[symbolUIKeyName][key] = this.ui[key];
      }
    }

    // Alias reference directly onto the this.strUI prop
    this.strUI = this.strUI[symbolUIKeyName];

    this.setStringUIValues = false;
  }

  try {
    if (this.behaviorName === '') {
      throw {
        type: 'Behavior',
        message: 'Behavior name has not been declared'
      }
    } else {
      if (this.behaviorName.indexOf('-behavior') === -1) {
        this.behaviorName += '-behavior';
      }
    }
  } catch (e) {
    console.error(e);
  }
};

Behavior.bindUIElements = function () {
  if (!this.ui) { return null; }

  Object.keys(this.ui).forEach(key => {
    let uiElement = this.ui[key];

    // Neccessary for re-binding of events on later rendered elements referenced by this.ui object.
    if (typeof this.ui[key] === 'string' && this.ui[key] !== this.strUI[key]) {
      this.strUI[key] = this.ui[key];
    }

    // Needed to ensure ui dom elements are rebound
    if ((this.customized || typeof uiElement !== 'string')) {
      uiElement = this.strUI[key];
    }

    this.ui[key] = this.dom(uiElement);
  });
};

Behavior.unbindUIElements = function () {
  for (let key in this.ui) {
    if (this.ui.hasOwnProperty(key)) {
      this.ui[key].off();
      this.ui[key] = this.strUI[key];
    }
  }
};

Behavior.start = function () {
  return null;
};

export default Behavior;