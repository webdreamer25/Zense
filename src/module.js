import Controller from './core/controller';

const Module = Object.create(Controller);

Module.type = 'module';
Module.behaviors = [];
Module.components = [];
Module.componentNameArray = [];
Module.shouldRenderChildren = true;
Module.shouldSetBehaviors = true;

Module.strap = function () {
  let componentsLen = this.components.length;

  // Do nothing if no child components exist
  if (!Array.isArray(this.components) && componentsLen === 0) {
    return null;
  }

  this.beforeAddComponents();
  this.addComponents(componentsLen);
  this.afterAddComponents();
};

Module.addComponents = function (componentsLen) {

  // Do nothing if no child components exist
  if (!Array.isArray(this.components) && componentsLen === 0) {
    return null;
  }

  // Don't render children if we have no DATA!
  if (res !== undefined && Object.keys(res).length === 0) {
    shouldRenderChildren = false;
  }

  this.beforeAddComponents();

  for (let i = 0; i < componentsLen; i++) {
    let component = this.components[i];

    // Ensures we don't overwrite the original instance when customizing.
    if (component.name && component.options) {
      let newComponentInstance = Object.create(component.name);

      newComponentInstance = this.extend(newComponentInstance, component.options);

      component = newComponentInstance;
    } else {
      component = Object.create(component);
    }

    // Let the component know whos their daddy.
    component.module = Object.create(this);

    // We need to ensure every component has a unique name set for debugging and error handling purposes.
    this.checkUniqueName(component);

    component.init();

    if (!this.shouldRenderChildren) {
      continue;
    }

    // shouldRenderChildren property exists so you can decide where and/or when a component should render.
    if (component.shouldRender && component.template !== '') {
        component.render();
    } else {
      // console.log('Component: ' + componentName + ' Error: Nees a template!');
      // Internal.errors.push({
      //   selector: component.selector,
      //   component: component.name,
      //   description: 'This component needs a template!'
      // });
    }
  }
};

Module.beforeAddComponents = function () {
  return false;
};

Module.afterAddComponents = function () {
  return false;
};

Module.setBehaviors = function () {
  let behaviorsLen = this.behaviors.length;

  if (this.shouldSetBehaviors && behaviorsLen > 0) {
    for (let i = 0; i < behaviorsLen; i++) {
      let behavior = this.behaviors[i];
      
      // This check is to ensure we are also handling extending the behavior.
      if (behavior.name) {
        try {

          // Ensures we don't overwrite base behavior instance.
          if (behavior.options) {
            let newBehaviorInstance = Object.create(behavior.name);

            newBehaviorInstance.setUniqueIdAndName(this.name);
            newBehaviorInstance = this.extend({}, newBehaviorInstance, behavior.options);

            behavior = newBehaviorInstance;
          } else {
            throw {
              type: `Customization ${behavior.name.behavior}`,
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
      behavior.module = Object.create(this);

      behavior.start();
    }

    // Ensures that behaviors are only set one time.
    this.shouldSetBehaviors = false;
  }
};

Module.destroyChildren = function () {
  let componentsLen = this.components.length;

  if (componentsLen === 0) { 
    return false; 
  }

  let i = 0;
  let component = this.components[i];

  // Ensure if component was customized we always have the appropriate referencing context.
  component = component.name ? component.name : component;

  do {
    if (this.components[i].hasRendered) {
      this.components[i].destroy();
    }

    i++;
  } while (i < componentsLen);
};

// Needed to ensure that if we have more than 1 of the same component we give it a unique name.
Module.checkUniqueName = function (component) {
  let doesntExist = this.componentNameArray.includes((name) => {
    return name.indexOf(component.name) >= 0;
  });

  if (!doesntExist) {
    this.componentNameArray.push(component.name + '-1');

    return true;
  }

  component.setUniqueName(); 

  return false;
};

Module.getChildComponent = function (componentName) {
  for (let i = 0, len = this.components.length; i < len; i++) {
    if (this.components[i].name.indexOf(componentName) > -1) {
      return this.components[i];
    }
  }
};

export default Module;