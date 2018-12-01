import Controller from './core/controller';

const Module = Object.create(Controller);

Module.type = 'module';
Module.components = [];
Module.componentNameArray = [];
Module.shouldRenderChildren = true;

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

  for (let i = 0; i < this.components.length; i++) {
    let component = this.components[i];

    // We need to ensure every component has a unique name set for debugging and error handling purposes.
    this.checkUniqueName(component);

    // Let the component know whos their daddy.
    component.parent = this;
    component.store = this.api ? res : null;

    // shouldRenderChildren property exists so you can decide where and/or when a component should render.
    if (this.shouldRenderChildren && component.template !== '') {
        component.render();
    } else {
      // console.log('Component: ' + componentName + ' Error: Nees a template!');
      Internal.errors.push({
        selector: component.selector,
        component: component.name,
        description: 'This component needs a template!'
      });
    }
  }
};

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

export default Module;