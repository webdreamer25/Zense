import Controller from './core/controller';

const Module = Object.create(Controller);

Module.type = 'module';
Module.components = [];
Module.componentNameArray = [];
Module.shouldSetBehaviors = true;

Module.strap = function () {
  const componentsLen = this.components.length;

  // Do nothing if no child components exist
  if (!Array.isArray(this.components) && componentsLen === 0) {
    return null;
  }

  this.beforeAddComponents();
  this.bootstrapChildren(this.components, componentsLen);
  this.afterAddComponents();
}

Module.beforeAddComponents = function () {
  return false;
}

Module.afterAddComponents = function () {
  return false;
}

Module.destroyChildren = function () {
  const componentsLen = this.components.length;

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
}

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
}

Module.getChildComponent = function (componentName) {
  for (let i = 0, len = this.components.length; i < len; i++) {
    if (this.components[i].name.indexOf(componentName) > -1) {
      return this.components[i];
    }
  }
}

export default Module;