import Controller from './core/controller';

const Composite = Object.create(Controller);

Composite.modules = [];

Composite.initialize = function () {
  this.render();

  this.bootstrapModules();
};

Composite.bootstrapModules = function () {
  for (let i = 0; i < this.modules.length; i++) {
    let mod = this.modules[i];

    mod.render();
  }
};

export default Composite;