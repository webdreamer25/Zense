import Renderer from './renderer';

const Controller = Object.create(Renderer);

/****************************************************************
 * @PROP name: Exists to more easily find composites, modules & component related coded for debugging.
 * @PROP strUI: Use to access string value of your node selector returned by this.dom() method.
 * @PROP bindUI: Use so that we do not run our bindUIElements in cases we just want to control bindings.
 * @PROP shoudlRender: Prevent composite, module or component from rendering.
 * @PROP shouldSetBehaviors: Use in cases when you want to control when behvaiors start.
****************************************************************/
Controller.name = '';
Controller.strUI = {};
Controller.behaviors = [];
Controller.bindUI = true;
Controller.shouldRender = true;
Controller.shouldSetBehaviors = true;
Controller.shouldRenderChildren = true;

Controller.create = function (options, extender = {}) {
  Object.assign(this, options, extender);
}

Controller.init = function () {
  return null;
}

// Async to ensure if some options are fetched we can resolve the promise.
Controller.bootstrapChildren = async function (strapees, childrenLen) {
  for (let i = 0; i < childrenLen; i++) {
    let strapee = strapees[i];
    let strapeeOptions = strapee.options;
    let type = strapeeOptions ? strapee.component.type : strapee.type;

    // Ensures we don't overwrite the original instance when customizing.
    if (strapee[type] && strapeeOptions) {
      let newStrapeeInstance = Object.create(strapee[type]);

      // Ensures we can insert data into the options and still need to keep our context intact.
      if (typeof strapeeOptions === 'function') {
        strapeeOptions = await strapeeOptions.call(this);
      }

      // Ensures that we only update default object if we have it instead of the entire object.
      if (strapee.defaultOnly) {
        newStrapeeInstance.default = Object.assign({}, newStrapeeInstance.default, strapeeOptions);
      } else {
        newStrapeeInstance = this.extend({}, newStrapeeInstance, strapeeOptions);
      }

      // Ensures we don't go through the same logic again since we have already customized our strapee.
      strapees.splice(i, 1, newStrapeeInstance);

      strapee = newStrapeeInstance;
    } else {
      const newStrapeeInstance = Object.create(strapee);

      strapee = newStrapeeInstance;
    }

    // Let the component know whos their daddy.
    strapee.super = Object.create(this);

    if (strapee.hasRendered) {
      strapee.destroy();
    }

    // We need to ensure every component has a unique name set for debugging and error handling purposes.
    if (this.checkUniqueName) {
      this.checkUniqueName(strapee);
    }

    strapee.init();

    if (!this.shouldRenderChildren) {
      continue;
    }

    // shouldRenderChildren property exists so you can decide where and/or when a component should render.
    if (strapee.shouldRender && strapee.template !== '') {
      strapee.render();
    }
  }
}

Controller.startBehaviors = function () {
  const behaviorsLen = this.behaviors.length;

  if (this.shouldSetBehaviors && behaviorsLen > 0) {
    for (let i = 0; i < behaviorsLen; i++) {
      let behavior = this.behaviors[i];
      let type = behavior.type;
      
      // This check is to ensure we are also handling extending the behavior.
      if (behavior[type]) {
        const originalBehavior = behavior[type];
        const newBehaviorInstance = Object.create(behavior[type]);

        try {

          // Necessary if we want to have specific behavior changes on any given component/module.
          if (behavior.options || behavior.ui) {
            if (behavior.ui) {
              newBehaviorInstance.ui = Object.assign({}, newBehaviorInstance.ui, behavior.ui);
            } else {
              newBehaviorInstance = this.extend({}, newBehaviorInstance, behavior.options);
            }

            newBehaviorInstance.setUniqueIdAndName(this.name);

            // Ensures we don't go through the same logic again since we have already customized our component.
            this.behaviors.splice(i, 1, newBehaviorInstance);

            behavior = newBehaviorInstance;
          } else {
            throw {
              type: `Customization ${originalBehavior.name}`,
              message: 'Customization options is either missing or mis-spelled.'
            }
          }
          
        } catch(err) {
          console.log(err);
        }
      } else {
        behavior = Object.create(behavior);
        behavior.setUniqueIdAndName(this.name);
      }

      // We need to let the behavior who the parent caller are.
      behavior.super = Object.create(this);

      // Ensures we don't start specific
      if (!behavior.shouldStart) {
        continue;
      }

      behavior.start();
    }

    // Ensures that behaviors are only set one time.
    this.shouldSetBehaviors = false;
  }
}

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

      if (this.super) {
        selector = this.super.selector;

        // Ensure we only do a find to single node returns from this.dom();
        if (!selector.length && uiElement !== undefined) {
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
}

Controller.bindEventListeners = function (delegate, selectorObj, context) {
  let selector;
  
  // Ensure we have a parent selector if none is specified
  if (!selectorObj.parent) {
    if (this.selector) {
      selector = this.selector;
    } else if (this.super) {
      selector = this.super.selector;
    }
  } else {

    // Allows for functional returns of parent objects under the right context.
    if (typeof selectorObj.parent === 'function') {
      selector = this.dom(selectorObj.parent.bind(this));
    } else {
      selector = this.dom(selectorObj.parent);
    }

  }

  // Ensure that we are not rebinding the same event on re-rendering of a component.
  selector.off();

  // We pass in event, delegate, handler, context which is our behavior.
  selector.on(selectorObj.event, delegate, this[selectorObj.method], context);

  return selector.find(delegate);
}

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
}

Controller.getBehavior = function (behaviorName) {
  if (this.behaviors.length === 0) { return false; }
  
  const result = this.behaviors.filter(item => {
    // Ensures that if a behavior was extended we look for the behavior under the .name context
    if (item.name) {
      item = item.name;
    }

    return item.behaviorName === behaviorName;
  });

  return result[0];
}

export default Controller;