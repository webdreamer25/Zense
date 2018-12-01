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
  
  Object.keys(this.ui).forEach(key => {
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
  });
};

Controller.setBehaviors = function () {
  if (this.behaviors.length > 0) {
    for (let i = 0; i < this.behaviors.length; i++) {
      let behavior = this.behaviors[i];
      
      // This check is to ensure we are also handling extending the behavior.
      if (behavior.name) {
        let customizedOptions = this.behaviors[i].options;

        behavior = this.behaviors[i].name;

        // Necessary if we want to have specific behavior changes on any given component/module
        if (customizedOptions) {
          if (typeof customizedOptions !== 'function') {
            Object.keys(customizedOptions).forEach(key => {
              behavior[key] = this.extend({}, behavior[key], customizedOptions[key]);
            });
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

Controller.getBehavior = function (behaviorName) {
  if (this.behaviors.length === 0) { return null; }
  
  let result = this.behaviors.filter(item => item.behaviorName === behaviorName);

  return result[0];
};

export default Controller;