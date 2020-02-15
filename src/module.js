import Controller from './core/controller';

const Module = Object.create(Controller);

Module.type = 'module';
Module.behaviors = [];
Module.components = [];
Module.componentNameArray = [];
Module.shouldRenderChildren = true;
Module.shouldSetBehaviors = true;

Module.handleAPIUse = function () {
  if (this.api) {
    this.ajax({ url: this.api }).then(this.addComponents.bind(this));
  } else {
    this.addComponents();
  }
};

Module.addComponents = function (res) {
  let componentsLen = this.components.length;

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

    // This check is to ensure we are also handling extending the component.
    if (component.name && component.options) {
      let customComponent = this.components[i].name;

      customComponent.store = this.api || res ? res : null;

      component = this.extend(customComponent, this.components[i].options);
    } else {
      component.store = this.api || res ? res : null;
    }

    // Let the component know whos their daddy.
    component.module = Object.create(this);

    // We need to ensure every component has a unique name set for debugging and error handling purposes.
    this.checkUniqueName(component);

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

  this.afterAddComponents();
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
        let customBehavior = behavior.name;

        try {
          // Necessary if we want to have specific behavior changes on any given component/module
          if (behavior.options) {
            customBehavior.setUniqueIdAndName(this.name);

            customBehavior = this.extend({}, customBehavior, behavior.options);

            behavior = customBehavior;
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
        behavior.setUniqueIdAndName(this.name);

        behavior = this.extend({}, behavior);
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
  if (!this.componentNameArray.includes(component.name)) {
    this.componentNameArray.push(component.name);
  }

  for (let i = 0, len = this.componentNameArray.length; i < len; i++) {
    if (this.componentNameArray[i] !== component.name && component.name !== '') {
      return null;
    } else {
      this.componentNameArray.push(component.setName(component.selector));
    }
  }
};

Module.getChildComponent = function (componentName) {
  for (let i = 0, len = this.components.length; i < len; i++) {
    if (this.components[i].name.indexOf(componentName) > -1) {
      return this.components[i];
    }
  }
};

export default Module;