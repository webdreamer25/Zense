import Controller from './core/controller';

const Composite = Object.create(Controller);

Composite.type = 'composite';
Composite.modules = [];
Composite.components = [];

Composite.strap = function (res) {
  if (this.modules.length > 0) {
    this.bootstraper(this.modules, res);
  }

  if (this.components.length > 0) {
    this.bootstraper(this.components, res);
  }
};

Composite.bootstraper = function (arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    let strapee = arr[i];

    // Ensures we don't modify our base Object instance.
    if (strapee.name && strapee.options) {
      let newStrapeeInstance = Object.create(strapee.name)

      newStrapeeInstance = this.extend(newStrapeeInstance, strapee.options);

      strapee = newStrapeeInstance;
    } else {
      strapee = Object.create(strapee);

      if (this.store) {
        strapee.store = this.store;
      }
    }
    
    strapee.composite = Object.create(this);
    
    if (strapee.init && typeof strapee.init === 'function') {
      strapee.init();
    }

    if (strapee.shouldRender) {
      strapee.render();
    }
  }
};

Composite.destroyChildren = function () {
  let children = this.modules.concat(this.components);
  let childrenLen = children.length;

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

Composite.getChild = function (name, childType = 'modules') {
  for (let i = 0, len = this[childType].length; i < len; i++) {
    let child = this[childType][i];
    let childName = child.name;

    // For customized children.
    if (child && typeof childName !== 'string') {
      childName = childName.name;
    }

    if (childName.indexOf(name) > -1) {
      return child;
    }
  }

  // TODO: delete or figure out how to use it.
  // throw new Error(`Could not find child ${name} in ${this.name}.`);
};

export default Composite;