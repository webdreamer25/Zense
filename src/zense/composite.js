import Controller from './core/controller';

const Composite = (function () {
  const composite = Object.create(Controller);
  
  composite.modules = [];

  composite.initialize = function () {
    this.render();

    this.bootstrapModules();
  };

  composite.bootstrapModules = function () {
    for (let i = 0; i < this.modules.length; i++) {
      let mod = this.modules[i];

      mod.render();
    }
  };

  return composite;
})();