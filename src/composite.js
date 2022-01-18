import Controller from './core/controller';

const Composite = Object.create(Controller);

Composite.type = 'composite';
Composite.modules = [];
Composite.components = [];

Composite.strap = function () {
  const modulesLen = this.modules.length;
  const componentsLen = this.components.length;

  if (modulesLen > 0) {
    this.bootstrapChildren(this.modules, modulesLen);
  }

  if (componentsLen > 0) {
    this.bootstrapChildren(this.components, componentsLen);
  }
}

Composite.destroyChildren = function () {
  const children = this.modules.concat(this.components);
  const childrenLen = children.length;

  if (childrenLen === 0) { 
    return false; 
  }

  for (let c = 0; c < childrenLen; c++) {
    let child = children[c];

    // Ensure if module or component was customized we always have the appropriate referencing context.
    child = child.name ? child.name : child;

    for (let i = 0, len = child.length; i < len; i++) {
      if (child[i].hasRendered) {
        child[i].destroy();
      }
    }
  }
}

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
}

export default Composite;