import Traverse from './taverse';

const Renderer = Object.create(Traverse);

Renderer.selector = null;
Renderer.template = null;
Renderer.hasRendered = false;
Renderer.renderType = 'append';
Renderer.renderMultiple = false;

Renderer.beforeRender = function () {
  return null;
};

Renderer.render = function (model) {
  this.destroy();
  this.setDOMSelector();
  this.beforeRender();
  
  try {
    this.errorCheck();

    let data = this.serializeData(model ? model : this.store);

    this.addTemplateToDOM(data);
  } catch (e) {
    new Error(e);
  }

  this.internalPostHook();
  this.afterRender();
};

Renderer.internalPostHook = function () {
  if (this.handleAPIUse !== undefined) {
    this.handleAPIUse();
  }

  if (this.setBehaviors !== undefined) {
    this.setBehaviors();
  }

  if (this.ui !== undefined && Object.keys(this.ui).length > 0) {
    this.bindUIElements();
  }
  
  this.hasRendered = true;
};

Renderer.afterRender = function () {
  return null;
};

Renderer.destroy = function () {
  // We want to destroy only if it has rendered.
  if (!this.hasRendered || this.renderMultiple || !this.hasRendered && this.shouldRender) { 
    return null; 
  }

  // Remove Children (composites & modules only).
  if (this.destroyChildren !== undefined) {
    this.destroyChildren();
  }

  let firstChildNode = this.selector.firstChild;

  while (firstChildNode) {
    this.selector.removeChild(firstChildNode);
    firstChildNode = this.selector.firstChild;
  }

  // Ensure we don't get a reference error.
  if (this.unbindBehaviorEvents !== undefined && typeof this.unbindBehaviorEvents === 'function') {
    this.unbindBehaviorEvents();
  }

  if (this.selector instanceof Object) {
    this.selector = this.selector.strName;
  }

  this.hasRendered = false;
};

Renderer.setDOMSelector = function () {
  this.selector = this.dom(this.selector);

  if (!this.selector.exists) {
    let name = this.name ? ' ' + this.name : '';

    throw new Error('Selector ' + this.selector.strName + ' defined in ' + this.type + name + ' does not exist in the DOM.');
  }
};

Renderer.addTemplateToDOM = function (data) {
  if (this.shouldRender) {
    let tpl = this.template(data);

    if (this.renderType !== 'append') {
      this.selector.html(tpl);
    } else {
      this.selector.insertHTML('beforeend', tpl);
    }
  } else {
    // Assumes that if shouldRender is being set to false manually we also dont want the container in the DOM.
    this.selector.remove();
  }
};

Renderer.serializeData = function (data) {
  if (data) { 
    return data;
  } 
};

Renderer.errorCheck = function () {
  let errorObj = {
    type: this.type,
    name: this.name
  };
  
  if (this.type === 'component' && this.template === null) {
    errorObj.message = 'no template currently exists.';
  }

  if (this.selector === null) {
    errorObj.message = 'The necessary elements to render your components do not exist in the DOM.'
  }

  if (errorObj.message) {
    throw errorObj;
  }
};

export default Renderer;