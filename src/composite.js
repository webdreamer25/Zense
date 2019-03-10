import Controller from './core/controller';

const Composite = Object.create(Controller);

Composite.modules = [];
Composite.components = [];

Composite.internalPostHook = function () {
  if (this.modules.length > 0) {
    this.bootstraper(this.modules);
  }

  if (this.components.length > 0) {
    this.bootstraper(this.components);
  }

  return false;
};

Composite.bootstraper = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    let strapee = arr[i];

    if (this.store) {
      strapee.store = this.store;
    }

    strapee.composite = this;
    strapee.render();
  }
};

export default Composite;