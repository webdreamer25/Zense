import Renderer from './renderer';

const Controller = Object.create(Renderer);

Controller.name = '';
Controller.strUI = {};
Controller.shouldRender = true;
Controller.shouldSetBehaviors = true;

Controller.create = function (options, extender = {}) {
  Object.assign(this, options, extender);
  
  this.initialize();
};

Controller.initialize = function () {
  return null;
}; 

Controller.bindUIElements = function () {
  if (!this.ui) { return false; }

  for (let key in this.ui) {
    let uiElement = this.ui[key];

    // Ensures that even if we pass the class as key we re-get the dom node.
    if (typeof this.ui[key] === 'string' || typeof this.ui[key] === 'object' && key.indexOf('.') === -1) {

      // Neccessary for re-binding of events on later rendered elements referenced by this.ui object.
      if (typeof this.ui[key] === 'string' && this.ui[key] !== this.strUI[key]) {
        this.strUI[key] = this.ui[key];
      }

      // Needed to ensure ui dom elements are rebound
      if ((this.customized || typeof uiElement !== 'string')) {
        uiElement = this.strUI[key];
      }

      let selector;

      if (this.component || this.module) {
        if (this.component) {
          selector = this.component.selector;
        } else if (this.module) {
          selector = this.module.selector;
        } 

        // Ensure we only do a find to single node returns from this.dom();
        if (!this.module.selector.length) {
          this.ui[key] = selector.find(uiElement);
        } else {
          this.ui[key] = selector;
        }
        
      } else {
        this.ui[key] = this.dom(uiElement);
      }
    } else {
      this.ui[key]['selector'] = this.bindEventListeners(key, this.ui[key], this);
    }
  }
};

Controller.bindEventListeners = function (delegate, selectorObj, context) {
  let selector;
  
  // Ensure we have a parent selector if none is specified
  if (!selectorObj.parent) {
    if (this.selector) {
      selector = this.selector;
    } else if (this.module) {
      selector = this.module.selector;
    }
  } else {

    // Allows for functional returns of parent objects under the right context.
    if (typeof selectorObj.parent === 'function') {
      selector = this.dom(selectorObj.parent.call(this));
    } else {
      selector = this.dom(selectorObj.parent);
    }

  }

  // Ensure that we are not rebinding the same event on re-rendering of a component.
  selector.off();

  // We pass in event, delegate, handler, context which is our behavior.
  selector.on(selectorObj.event, delegate, this[selectorObj.method], context);

  return selector.find(delegate);
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