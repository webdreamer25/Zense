(function (root) {
  const Config = {
    env: 'dev'
  };

  const Internal = {
    errors: [],
    warnings: []
  };

  const Model = {
    uid: 1,
    model: {},
    hasChanged: false,

    get: function (keyName) {
      if (Object.keys(this.model).length > 0) {
        for (let key in this.model) {
          if (key === keyName) {
            return this.model[key];
          }
        }
      } else {
        console.log('Model: ' + this.uid + ' has no attributes.');
      }
    },

    set: function (keyName, data) {
      for (let key in this.model) {
        if (key === keyName) {
          delete this.model[key];
        } else {
          this.model[keyName] = data;
        }
      }

      this.hasChanged = true;
    }
  };

  const Collection = {
    get: function (keyName) {
      for (let i = 0; i < this.collection.length; i++) {
        let model = this.collection[i];

        for (let key in model) {
          if (key === keyName) {
            return model;
          }
        }
      }
    }
  };

  const Util = {};

  Util.dom = function (selector) {
    if (typeof selector === 'string') {
      switch (selector.charAt(0)) {
        case '#':
          selector = document.getElementById(selector.slice(1));

          break;
        default:
          selector = document.querySelectorAll(selector);         
      }
    }

    selector.on = function (event, callback, bubble) {
      if (typeof bubble === 'undefined') {
        bubble = true;
      }

      if (!this.length) {
        this.addEventListener(event, callback, bubble);
      } else {
        for (let i = 0; i < selector.length; i++) {
          this[i].addEventListener(event, callback, bubble);
        }
      }
    };

    selector.html = function (html) {
      if (!this.length) {
        this.innerHTML = html;
      } else {
        for (let i = 0; i < this.length; i++) {
          if (this[i].innerHTML !== '') {
            this[i].innerHTML = '';
          }

          this[i].innerHTML = html;
        }
      }
    };

    selector.append = function (html) {
      if (!this.length) {
        this.insertAdjacentHTML('beforeend', html);
      } else {
        for (let i = 0; i < this.length; i++) {
          this[i].insertAdjacentHTML('beforeend', html);
        }
      }
    };

    return selector;
  };

  // CORE
  const Xhr = Object.create(Util);
  
  Xhr.percentComplete = 0;
  Xhr.storage = null;

  Xhr.ajax = function (options) {
    let defaults = {
      method: 'GET',
      data: null,
      success: null
    };

    options = Object.assign({}, defaults, options);

    this.xhr = new XMLHttpRequest();

    if (options.method.toLowerCase() === 'post') {
      for (let i = 0; i < options.headers.length; i++) {
        let header = options.headers[i];

        this.xhr.setRequestHeader(header.name, header.value);
      }
    }

    this.xhr.addEventListener('error', this.error.bind(this));
    this.xhr.addEventListener('abort', this.abort.bind(this));
    // this.xhr.addEventListener('load', this.success.bind(this));
    // this.xhr.addEventListener('loadend', this.complete.bind(this));
    this.xhr.addEventListener('progress', this.updateProgress.bind(this));

    this.xhr.open(options.method, options.url);

    if (options.responseType) {
      this.xhr.responseType = options.responseType.toLowerCase();
    }

    if (options.withCredentials) {
      this.xhr.widthCredentials = true;
    }

    this.xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (options.success !== null) {
          options.success(JSON.parse(this.responseText));
        }
      }
    };

    this.xhr.send(options.data);
  };

  Xhr.error = function () {
    console.log('There was an error with your XHR request');
  };

  Xhr.abort = function () {
    console.log('Aborted your XHR request.');
  };

  Xhr.updateProgress = function (eventObj) {
    if (eventObj.lengthComputable) {
      this.percentComplete = eventObj.loaded / eventObj.total * 100;
    } else {
      Internal.warnings.push({
        type: 'XHR.' + this.methodType,
        description: 'Unable to update "' + this.methodType + '" xhr request progress.'
      });
    }
  };

  const Renderer = Object.create(Xhr);

  Renderer.regions = [];
  Renderer.selector = null;
  Renderer.template = null;
  Renderer.renderType = 'append';

  Renderer.beforeRender = function () {
    return null;
  };

  Renderer.render = function () {
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

  Renderer.afterRender = function () {
    return null;
  };

  Renderer.destroy = function () {
    this.selector.remove();
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

  Renderer.serializeData = function (data) {
    if (data) { 
      return data;
    } else {
      return null;
    }
  };

  Renderer.errorCheck = function () {
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
  
  // ERROR HANDLER
  const ErrorHandler = Object.create(Renderer);

  ErrorHandler.index = 0;

  ErrorHandler.initialize = function (options) {
    let defaults = {
      selector: 'body',
      trigger: '.js-errors-toggle',
      ui: {
        container: '.errors',
        target: '.errors-list',
        tab: '.errors-tab'
      }
    };

    Object.assign(this, defaults, options);

    for (let i = 0; i < Internal.errors.length; i++) {
      let error = Internal.errors[i];

      document.querySelector(error.selector).style.border = '1px solid red';

      this.index = i;
      this.selector = error.selector;

      this.render();

    };
  };

  ErrorHandler.serializeData = function () {
    return Internal.errors[this.index];
  };

  ErrorHandler.start = function () {
    if ((Internal.errors === 0 || Config.env !== 'dev')) { return null; }

    this.initialize();
  };

  // BEHAVIOR
  const Behavior = Object.create(Util);

  Behavior.trigger = '';

  Behavior.config = function (options) {
    Object.assign(this, options);
  };

  Behavior.start = function () {
    return null;
  };
  
  // CONTROLLER
  // Helps code dry with by keeping similar functionilty in one place
  const Controller = Object.create(Renderer);

  Controller.name = '';
  Controller.behaviors = [];

  Controller.create = function (options) {
    Object.assign(this, options);

    this.initialize();
  };

  Controller.initialize = function () {
    return null;
  }; 

  Controller.setBehaviors = function () {
    if (this.behaviors.length > 0) {
      for (let i = 0; i < this.behaviors.length; i++) {
        let behavior = this.behaviors[i];

        behavior.context = this;
        behavior.start();
      }
    }
  };

  // COMPONENT
  const Component = Object.create(Controller);

  Component.id = 0;
  Component.type = 'component';

  Component.setName = function (selector) {
    selector = selector.toLowerCase();

    this.name = selector.slice(1) + '-' + this.type + '-' + this.id;

    // Increment id after name is set so no duplication occurs
    this.id++
  };

  // MODULE
  const Module = Object.create(Controller);

  Module.type = 'module';
  Module.components = [];
  Module.componentNameArray = [];
  Module.shouldRenderChildren = true;

  Module.afterRender = function () {
    // Neccessary to ensure data is passed down to all child components if api exists
    if (!this.api) {
      this.addComponents();
    } else {
      this.ajax({
        url: this.api,
        success: this.addComponents.bind(this)
      });
    }
  };

  Module.addComponents = function (res) {
    // Do nothing if no child components exist
    if (!Array.isArray(this.components) && this.components.length === 0) {
      return null;
    }

    for (let i = 0; i < this.components.length; i++) {
      let component = this.components[i];

      // We need to ensure every component has a unique name set for debugging and error handling purposes.
      this.checkUniqueName(component);

      // Let the component know whos their daddy.
      component.parent = this;
      component.store = res;

      // shouldRenderChildren property exists so you can decide where and/or when a component should render.
      if (this.shouldRenderChildren && component.template !== '') {
        component.render();
      } else {
        // console.log('Component: ' + componentName + ' Error: Nees a template!');
        Internal.errors.push({
          selector: component.selector,
          component: component.name,
          description: 'This component needs a template!'
        });
      }
    }
  };

  Module.checkUniqueName = function (component) {
    this.componentNameArray.push(component.name);

    for (let i = 0; i < this.componentNameArray.length; i++) {
      if (this.componentNameArray[i] !== component.name && component.name !== '') {
        return null;
      } else {
        component.setName(component.selector);
      }
    }
  };

  // COMPOSITE
  const Composite = Object.create(Controller);
  
  Composite.modules = [];

  Composite.initialize = function () {
    this.render();

    this.bootstrapModules();
  };

  Composite.bootstrapModules = function () {
    for (let i = 0; i < this.modules.length; i++) {
      let mod = this.modules[i];

      mod.render();
    }
  };

  root.Zense = {
    Module,
    Composite,
    Component,
    Behavior,
    ErrorHandler,

    Version:  '1.0.0',
    Author: 'Edgar Olivares',
    Email: 'webdreamer25@gmail.com'
  };
  
})(window);