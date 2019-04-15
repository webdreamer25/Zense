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
  // Do nothing if no child components exist
  if (!Array.isArray(this.components) && this.components.length === 0) {
    return null;
  }

  // Don't render children if we have no DATA!
  if (res !== undefined && Object.keys(res).length === 0) {
    shouldRenderChildren = false;
  }

  for (let i = 0; i < this.components.length; i++) {
    let component = this.components[i];

    // This check is to ensure we are also handling extending the component.
    if (component.name) {
      component = this.components[i].name;

      // Necessary if we want to have specific component changes on any given component/module
      if (this.components[i].options) {
        component = this.customizeObject(component, this.components[i].options);
      }
    }

    // Let the component know whos their daddy.
    component.module = this;
    component.store = this.api || res ? res : null;

    // We need to ensure every component has a unique name set for debugging and error handling purposes.
    this.checkUniqueName(component);

    // shouldRenderChildren property exists so you can decide where and/or when a component should render.
    if ((component.shouldRender || this.shouldRenderChildren) && component.template !== '') {
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

Module.setBehaviors = function () {
  if (this.shouldSetBehaviors && this.behaviors.length > 0) {
    for (let i = 0; i < this.behaviors.length; i++) {
      let behavior = this.behaviors[i];
      
      // This check is to ensure we are also handling extending the behavior.
      if (behavior.name) {
        behavior = this.behaviors[i].name;

        // Necessary if we want to have specific behavior changes on any given component/module
        if (this.behaviors[i].options) {
          behavior = this.customizeObject(behavior, this.behaviors[i].options);
        }
      }

      // We need to let the behavior who the parent caller is.
      behavior.module = this;

      behavior.bindUIElements();
      behavior.start();
    }

    // Ensures that behaviors are only set one time.
    this.shouldSetBehaviors = false;
  }
};

// Needed to ensure that if we have more than 1 of the same component we give it a unique name.
Module.checkUniqueName = function (component) {
  this.componentNameArray.push(component.name);

  for (let i = 0; i < this.componentNameArray.length; i++) {
    if (this.componentNameArray[i] !== component.name && component.name !== '') {
      return null;
    } else {
      component.setName(component.selector);
    }
  }
};

Module.getChildComponent = function (componentName) {
  for (let i = 0; i < this.components.length; i++) {
    if (this.components[i].name === componentName) {
      return this.components[i];
    }
  }
};

export default Module;