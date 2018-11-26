import Util from './util';

const Renderer = (function() {
  const renderer = Object.create(Util);

  renderer.regions = [];
  renderer.selector = null;
  renderer.template = null;
  renderer.renderType = 'append';

  renderer.beforeRender = function () {
    return null;
  };

  renderer.render = function () {
    this.beforeRender();
    this.setDOMSelector();
    
    try {
      this.errorCheck();

      let data = this.serializeData(this.store);

      this.addTemplateToDOM(data);
    } catch (e) {
      Internal.errors.push(e);
    }


    this.setBehaviors();
    this.afterRender();
  };

  renderer.afterRender = function () {
    return null;
  };

  renderer.destroy = function () {
    this.selector.remove();
  };

  renderer.setDOMSelector = function () {
    this.selector = this.dom(this.selector);

    // We want to ensure that if no selector is specified the selector chosen is the parent modules selector
    // this is incase we have an instance of appending purely on the parent element vs a specific container.
    if (typeof this.selector === 'undefined' && this.selector === null) {
      this.selector = this.regions[0];
    }

    this.regions.push(this.selector);
  };

  renderer.addTemplateToDOM = function (data) {
    let tpl = this.template(data);

    if (this.renderType !== 'append') {
      this.selector.html(tpl);
    } else {
      this.selector.append(tpl);
    }
  };

  renderer.serializeData = function (data) {
    if (data) { 
      return data;
    } else {
      return null;
    }
  };

  renderer.errorCheck = function () {
    let errorObj = {
      type: this.type,
      name: this.name
    }
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

  return renderer;
})();

export default Renderer;