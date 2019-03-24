import Util from './util';

const Renderer = Object.create(Util);

Renderer.regions = [];
Renderer.selector = null;
Renderer.template = null;
Renderer.hasRendered = false;
Renderer.renderType = 'append';

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
    console.error(e);
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
  
  this.hasRendered = true;
};

Renderer.afterRender = function () {
  return null;
};

Renderer.destroy = function () {
  // We want to destroy only if it has rendered.
  if (!this.hasRendered || !this.hasRendered && this.shouldRender) { 
    return null; 
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
    this.selector = this.strSelector;
  }

  return this;
};

Renderer.setDOMSelector = function () {
  this.selector = this.dom(this.selector);

  // We want to ensure that if no selector is specified the selector chosen is the parent modules selector
  // this is incase we have an instance of appending purely on the parent element vs a specific container.
  if (typeof this.selector === 'undefined' && this.selector === null) {
    this.selector = this.regions[0];
  }

  this.regions.push(this.selector);
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