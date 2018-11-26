import Renderer from './renderer';

const Controller = (function () {
  const controller = Object.create(Renderer);

  controller.name = '';
  controller.behaviors = [];

  controller.create = function (options) {
    Object.assign(this, options);

    this.initialize();
  };

  controller.initialize = function () {
    return null;
  }; 

  controller.setBehaviors = function () {
    if (this.behaviors.length > 0) {
      for (let i = 0; i < this.behaviors.length; i++) {
        let behavior = this.behaviors[i];
        
        // This check is to ensure we are also handling overwrites to the behavior.
        if (behavior.name) {
          behavior = this.behaviors[i].name;

          // Necessary if we want to have specific behavior on any given component/module
          if (this.behaviors[i].overwrites) {
            if (typeof behavior.overwrites !== 'function') {
              behavior = this.extend({}, behavior, this.behaviors[i].overwrites);
            } else {
              // Allow developers to figure out how they with overwite behaviors
              behavior = this.behaviors[i].overwrites();
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

  return controller;
})();

export default Controller;