import Util from './util';

const Renderer = Object.create(Util);

Renderer.regions = [];
Renderer.selector = null;
Renderer.template = null;
Renderer.renderType = 'append';

Renderer.beforeRender = function () {
  return null;
};

Renderer.render = function (model) {
  this.destroy();
  this.beforeRender();
  this.setDOMSelector();
  
  try {
    this.errorCheck();

    let data = this.serializeData(model ? model : this.store);

    this.addTemplateToDOM(data);
  } catch (e) {
    Internal.errors.push(e);
  }

  this.internalPostHook();
  this.afterRender();
};

Renderer.internalPostHook = function () {
  if (this.setBehaviors !== undefined) {
    this.setBehaviors();
  }

  if (this.handleAPIUse !== undefined) {
    this.handleAPIUse();
  }
};

Renderer.afterRender = function () {
  return null;
};

Renderer.destroy = function () {
  return null;
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
  let tpl = this.template(data);

  if (this.renderType !== 'append') {
    this.selector.html(tpl);
  } else {
    this.selector.append(tpl);
  }
};

Renderer.serializeData = function (data = false) {
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