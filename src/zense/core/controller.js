import Renderer from './renderer';

const Controller = Object.create(Renderer);

Controller.name = '';
Controller.behaviors = [];

Controller.create = function (options) {
  Object.assign(this, options);

  this.initialize();
};

Controller.initialize = function () {
  return null;
}; 

Controller.setBehaviors = function () {
  if (this.behaviors.length > 0) {
    for (let i = 0; i < this.behaviors.length; i++) {
      let behavior = this.behaviors[i];
      
      // This check is to ensure we are also handling extending the behavior.
      if (behavior.name) {
        behavior = this.behaviors[i].name;

        // Necessary if we want to have specific behavior on any given component/module
        if (this.behaviors[i].options) {
          if (typeof behavior.options !== 'function') {
            behavior = this.extend({}, behavior, this.behaviors[i].options);
          } else {
            // Allow developers to figure out how they with overwite behaviors
            behavior = this.behaviors[i].options();
          }
        }
      }

      // The parent will be the component/module that references the behavior
      behavior.parent = this;
      behavior.bindUIElements();
      behavior.start();
    }
  }
};

export default Controller;