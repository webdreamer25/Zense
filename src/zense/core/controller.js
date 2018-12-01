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

Controller.bindUIElements = function () {
  if (!this.ui) { return null; }
  
  for (let key in this.ui) {
    if (this.ui.hasOwnProperty(key)) {
      this.ui[key] = this.dom(this.ui[key]);
    }
  }
};

Controller.setBehaviors = function () {
  if (this.behaviors.length > 0) {
    for (let i = 0; i < this.behaviors.length; i++) {
      let behavior = this.behaviors[i];
      
      // This check is to ensure we are also handling extending the behavior.
      if (behavior.name) {
        let customizedBehaviorOptions = this.behaviors[i].options;

        behavior = this.behaviors[i].name;

        // Necessary if we want to have specific behavior changes on any given component/module
        if (customizedBehaviorOptions) {
          if (typeof customizedBehaviorOptions !== 'function') {
            for (let key in customizedBehaviorOptions) {
              behavior[key] = this.extend({}, behavior[key], customizedBehaviorOptions[key]);
            }
          } else {
            // Allow developers to figure out how they with overwite behaviors
            behavior = this.behaviors[i].options();
          }

          // We need to let the current behavior there has been a change
          behavior.customized = true;
        } else {
          // This ensures the next invocation of a behavior has a reset customized state.
          behavior.customized = false;
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