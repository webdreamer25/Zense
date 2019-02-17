import Controller from './core/controller';

const Composite = Object.create(Controller);

Composite.modules = [];

Composite.internalPostHook = function () {
  this.bootstrapModules();
};
Composite.bootstrapModules = function () {
  for (let i = 0; i < this.modules.length; i++) {
    let mod = this.modules[i];

    if (this.store) {
      mod.store = this.store;
    }

    mod.render();
  }
};

export default Composite;