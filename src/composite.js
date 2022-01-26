import Controller from './core/controller';

const Composite = Object.create(Controller);

Composite.type = 'composite';
Composite.selector = null;
Composite.renderType = 'html';
Composite.modules = [];
Composite.components = [];

Composite.render = async function (model = false) {
  this.destroy();
  this.setDOMSelector();
  this.beforeRender();
  
  if (!this.shouldRender) { return false; }
  
  try {
    const store = model ? model : this.store;
    let data;

    this.errorCheck();

    data = this.serializeData(store);

    this.addTemplateToDOM(data);
  } catch (e) {
    console.error(e);
  }

  this.internalPostHook();
  this.afterRender();
}

Composite.setDOMSelector = function () {
  // Ensures we have a way to re-find the selector in the DOM in cases where we are re-rendering entire composite or module.
  if (typeof this.selector !== 'string') {
    this.selector = this.selector.strName;
  }

  this.selector = this.dom(this.selector);

  if (!this.selector.exists) {
    throw new Error(`Selector ${this.selector.strName} defined in ${this.type} ${this.name} does not exist in the DOM.`);
  }
}

Composite.addTemplateToDOM = function (data) {
  if (this.shouldRender) {
    const tpl = this.template(data);

    if (this.renderType === 'append') {
      this.selector.insertHTML('beforeend', tpl);
    } else {
      this.selector.html(tpl);
    }
  } else {

    // Assumes that if shouldRender is being set to false manually we also dont want the container in the DOM.
    this.selector.remove();
    
  }
}

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