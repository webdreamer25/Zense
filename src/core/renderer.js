import App from './app';

const Renderer = Object.create(App);

Renderer.selector = null;
Renderer.template = null;
Renderer.hasRendered = false;
Renderer.renderType = 'append';
Renderer.renderMultiple = false;

Renderer.beforeRender = function () {
  return null;
}

Renderer.render = function (model = null, resetDOMSelector = false) {
  this.destroy();
  this.setDOMSelector(resetDOMSelector);
  this.beforeRender();
  
  if (!this.shouldRender) { return false; }
  
  try {
    this.errorCheck();

    let data = this.serializeData(model !== undefined && model !== null ? model : this.store);

    this.addTemplateToDOM(data);
  } catch (e) {
    console.error(e);
  }

  this.internalPostHook();
  this.afterRender();
}

Renderer.internalPostHook = function () {
  if (this.strap !== undefined) {
    this.strap();
  }

  if (this.startBehaviors !== undefined) {
    this.startBehaviors();
  }

  this.util.bindUIElements(this);
  
  this.hasRendered = true;
}

Renderer.afterRender = function () {
  return null;
}

Renderer.destroy = function () {
  let firstChildNode;

  // We want to destroy only if it has rendered.
  if (!this.hasRendered || this.renderMultiple || !this.hasRendered && this.shouldRender) { 
    return null; 
  }

  // Remove Children.
  if (this.destroyChildren !== undefined) {
    this.destroyChildren();
  }

  // Ensure we don't get a reference error.
  if (this.unbindBehaviorEvents !== undefined && typeof this.unbindBehaviorEvents === 'function') {
    this.unbindBehaviorEvents();
  }

  firstChildNode = this.selector.firstChild;

  while (firstChildNode) {
    this.selector.removeChild(firstChildNode);
    firstChildNode = this.selector.firstChild;
  }

  // Ensures we remove bindings that exists on container nodes.
  // Should not be a performance hit since container nodes do not hold much html.
  // This was added to fix an issue causing multiple bindings on re-render of parent container.
  // Using .removeEventListener method on said element was not working.
  this.selector.replaceWith(this.selector.cloneNode(true));

  if (this.selector instanceof Object) {
    this.selector = this.selector.strName ? this.selector.strName : `.${this.selector.classList[0]}`;
  }

  this.hasRendered = false;
}

Renderer.setDOMSelector = function (resetDOMSelector) {
  if (typeof this.selector !== 'string') {

    // Ensures we have a way to re-find the selector in the DOM in cases where we are re-rendering entire composite or module.
    if (resetDOMSelector) {
      this.selector = this.selector.strName;
    } else {
      return false;
    }
    
  }

  // Ensures that if we are rendering multiple we dont re-render on previous nodes.
  if (this.renderMultiple && this.super !== undefined) {
    const parentSelector = this.super.selector.strName;

    this.selector = this.dom(`${parentSelector} ${this.selector}`);
  } else {
    this.selector = this.dom(this.selector);
  }

  if (!this.selector.exists) {
    throw new Error(`Selector ${this.selector.strName} defined in ${this.type} ${this.name} does not exist in the DOM.`);
  }
}

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
}

Renderer.serializeData = function (data) {
  if (data) { 
    return data;
  } 
}

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
}

export default Renderer;