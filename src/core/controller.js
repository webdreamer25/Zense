import Renderer from './renderer';

const Controller = Object.create(Renderer);

Controller.name = '';
Controller.strUI = {};
Controller.shouldRender = true;
Controller.shouldSetBehaviors = true;

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

Controller.unbindBehaviorEvents = function () {
  if (this.behaviors.length === 0) {
    return false;
  }

  for (let i = 0; i < this.behaviors.length; i++) {
    let behavior = this.behaviors[i];

    behavior = behavior.name ? behavior.name : behavior;

    if (behavior.ui) {
      behavior.unbindUIElements();

      // This is incase of a re-render where we need to set and start the associated behaviors.
      this.shouldSetBehaviors = true;
    } else {
      this.shouldSetBehaviors = false;
    }
  }

  return this;
};

Controller.customizeObject = function (customObj, options) {
  if (typeof options !== 'function') {
    Object.keys(options).forEach(key => {
      
      // We only want to extend existing porperties under customObj
      if (Object.keys(customObj).some((masterKey) => masterKey === key) && typeof options[key] !== 'string') {
        customObj[key] = this.extend({}, customObj[key], options[key]);
      } else {
        customObj[key] = options[key];
      }
      
    });
  } else {

    // Allow developers to figure out how they with overwite behaviors
    customObj = obj();
    
  }

  return customObj;
};

Controller.getBehavior = function (behaviorName) {
  if (this.behaviors.length === 0) { return false; }
  
  let result = this.behaviors.filter(item => {
    // Ensures that if a behavior was extended we look for the behavior under the .name context
    if (item.name) {
      item = item.name;
    }

    return item.behaviorName === behaviorName;
  });

  return result[0];
};

export default Controller;