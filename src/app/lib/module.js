import Renderer from './core/renderer.core';

const Module = {
  components: [],
  shouldRenderChildren: true,

  create: (options) => {
    Object.assign(this, Renderer, options);

    this.components = options.components;

    this.initialize();

    this.setDOMSelector();
    this.addTemplate();

    this.render();
    this.addComponents(this.components);
  },

  initialize: () => {},

  addComponents: (componentList) => {
    // Do nothing if no child components exist
    if (!Array.isArray(componentList) && componentList.length === 0) {
      return null;
    }

    for (let i = 0; i < componentList.length; i++) {
      let component = {};
      let componentName = '';

      // We use Object.create to create a link back to used components.
      if (typeof componentList[i].name !== 'undefined' && componentList[i].name !== null) {
        componentName = componentList[i].name;

        component[componentName] = componentList[i];
      } else {
        componentName = 'component' + i;

        component[componentName] = componentList[i];
      }

      // Needed to ensure we merge component under Module/this context.
      Object.assign(this, component);

      // shouldRenderChildren property exists so you can decide where and/or when a component should render.
      if (this.shouldRenderChildren && this[componentName].template !== '') {
        this[componentName].setDOMSelector();
        this[componentName].render();
      } else {
        console.log('Component: ' + componentName + ' Error: Nees a template!');
      }
    }
  }
};

export default Module;