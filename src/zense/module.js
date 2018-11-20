import { Renderer } from './core/renderer.core';

class Module extends Renderer {
  type = 'module';
  components = [];
  componentNameArray = [];
  shouldRenderChildren = true;

  constructor (options) {
    this.opt = Object.assign({}, options);
  }

  initialize() {
    return null
  }

  afterRender() {
    this.addComponents(this.opt.components);
  }

  addComponents(componentList) {
    // Do nothing if no child components exist
    if (!Array.isArray(componentList) && componentList.length === 0) {
      return null;
    }

    for (let i = 0; i < componentList.length; i++) {
      let component = componentList[i];

      this.checkUniqueName(component);

      // Needed to ensure we merge component under Module/this context.
      Object.assign(this, component);

      // shouldRenderChildren property exists so you can decide where and/or when a component should render.
      if (this.shouldRenderChildren && component.template !== '') {
        component.render();
      } else {
        // console.log('Component: ' + componentName + ' Error: Nees a template!');
        Config.errors.push({
          selector: component.selector,
          component: component.name,
          description: 'This component needs a template!'
        });
      }
    }
  }

  checkUniqueName() {
    this.componentNameArray.push(component.name);

    for (let i = 0; i < this.componentNameArray.length; i++) {
      if (this.componentNameArray[i] !== component.name) {
        return null;
      } else {
        component.setName(component.selector);
      }
    }
  }
};

export default Module;