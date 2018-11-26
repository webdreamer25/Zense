import Util from './core/util';

const Behavior = (function () {
  const behavior = Object.create(Util);

  behavior.ui = {};

  behavior.config = function (options) {
    Object.assign(this, options);
  };

  behavior.bindUIElements = function () {
    for (let key in this.ui) {
      if (this.ui.hasOwnProperty(key)) {
        this.ui[key] = this.dom(this.ui[key]);
      }
    }
  };

  behavior.start = function () {
    return null;
  };

  return behavior;
})();

export default Behavior;