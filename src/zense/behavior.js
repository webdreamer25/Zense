import Util from './core/util';

const Behavior = Object.create(Util);

Behavior.ui = {};

Behavior.config = function (options) {
  Object.assign(this, options);
};

Behavior.bindUIElements = function () {
  if (!this.ui) { return null; }
  
  for (let key in this.ui) {
    if (this.ui.hasOwnProperty(key)) {
      this.ui[key] = this.dom(this.ui[key]);
    }
  }
};

Behavior.start = function () {
  return null;
};

export default Behavior;