import App from './app';

const Renderer = Object.create(App);

Renderer.template = null;
Renderer.hasRendered = false;
Renderer.css = false;

Renderer.beforeRender = function () {
  return null;
}

Renderer.render = async function (model = false) {
  this.destroy();
  this.beforeRender();
  
  if (!this.shouldRender) { return false; }
  
  try {
    const store = model ? model : this.store;
    let tagName = this.name;
    let customElement;
    let data;

    this.errorCheck();

    if (!/-/g.test(tagName)) {
      tagName = `${tagName}-${this.type}`
    }

    data = this.serializeData(store);
    customElement = await this.createCustomElement(tagName, data);

    customElements.define(tagName, customElement);
  } catch (e) {
    console.error(e);
  }

  this.internalPostHook();
  this.afterRender();
}

Renderer.createCustomElement = function (tagName, data) {
  const self = this;
  const CustomDOMElement = function () {
    return Reflect.construct(HTMLElement, [], CustomDOMElement);
  }

  CustomDOMElement.prototype = Object.create(HTMLElement.prototype);

  CustomDOMElement.prototype.connectedCallback = function () {
    const shadow = this.attachShadow({ mode: 'open' });
    const slot = document.createElement('slot');

    // Exposes shadow elements to be styled by outside css.
    shadow.appendChild(slot);

    data.tagName = tagName;

    this.classList.add(tagName);
    this.innerHTML = self.template(data);

    if (self.css) {
      const style = document.createElement('style');

      style.textContent = self.css;

      this.appendChild(style);
    }
  }

  return CustomDOMElement;
}

// Renderer.getStyleSheet = async function () {
//   const cssModule = await import(`./${this.css}`, {
//     assert: { type: 'css' }
//   });

//   return cssModule;
// }

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