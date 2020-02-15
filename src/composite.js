import Controller from './core/controller';

const Composite = Object.create(Controller);

Composite.type = 'composite';
Composite.modules = [];
Composite.components = [];
Composite.children = [];

Composite.internalPostHook = function () {
  if (this.modules.length > 0) {
    this.children.push('modules');

    this.bootstraper(this.modules);
  }

  if (this.components.length > 0) {
    this.children.push('components');
    
    this.bootstraper(this.components);
  }

  return false;
};

Composite.bootstraper = function (arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    let strapee = arr[i];

    if (this.store) {
      strapee.store = this.store;
    }

    strapee.composite = this;
    
    strapee.render();
  }
};

Composite.destroyChildren = function () {
  let childrenLen = this.children.length;

  if (childrenLen === 0) { 
    return false; 
  }

  for (let c = 0; c < childrenLen; c++) {
    let child = this.children[c];

    // Ensure if module or component was customized we always have the appropriate referencing context.
    child = child.name ? child.name : child;

    for (let i = 0, len = this[child].length; i < len; i++) {
      if (this[child][i].hasRendered) {
        this[child][i].destroy();
      }
    }
  }
};

export default Composite;