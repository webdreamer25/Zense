
const Composite = {
  modules: [],

  create: (options) => {
    Object.assign(this, Renderer, options);

    this.setDOMSelector();
    this.addTemplate();

    this.render();

    this.bootstrapModules();
  },

  bootstrapModules: () => {
    for (let i = 0; i < this.modules.length; i++) {
      let mod = this.modules[i];

      mod.render();
      mod.addComponents(mod.components);
    }
  }
};

