import Util from './core/util';

const Behavior = Object.create(Util);

Behavior.ui = {};
Behavior.customized = false;

Behavior.config = function (options) {
  Object.assign(this, options);
};

Behavior.bindUIElements = function () {
  if (!this.ui) { return null; }
  
  for (let key in this.ui) {
    if (this.ui.hasOwnProperty(key)) {
      let uiElement = this.ui[key];

      // Needed to ensure ui dom elements are rebound
      if (this.customized && typeof uiElement !== 'string') {
        if (uiElement[0].className !== '') {
          uiElement = '.' + uiElement[0].className;
        } else {
          uiElement = '#' + uiElement[0].id;
        }
      }

      this.ui[key] = this.dom(uiElement);
    }
  }
};

Behavior.start = function () {
  return null;
};

export default Behavior;