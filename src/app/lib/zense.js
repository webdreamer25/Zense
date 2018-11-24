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

  // CORE
  const Xhr = {
    percentComplete: 0,
    storage: null,

    ajax: function (options) {
      let defaults = {
        method: 'GET',
        data: null
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

      this.xhr.send(options.data);
    },

    error: function () {
      console.log('There was an error with your XHR request');
    },

    abort: function () {
      console.log('Aborted your XHR request.');
    },

    updateProgress: function (eventObj) {
      if (eventObj.lengthComputable) {
        this.percentComplete = eventObj.loaded / eventObj.total * 100;
      } else {
        Internal.warnings.push({
          type: 'XHR.' + this.methodType,
          description: 'Unable to update "' + this.methodType + '" xhr request progress.'
        });
      }
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

      if (!this.api) {
        let data = this.serializeData();

        this.addTemplateToDOM(data);
      } else {
        this.xhr.addEventListener('load', function (req) {
          this.addTemplateToDOM(JSON.parse(req.currentTarget.responseText));
        }.bind(this));
      }
    } catch (e) {
      Internal.errors.push(e);
    }

    // Needed for modules only
    if (this.addComponents) {
      this.addComponents();
    }

    this.afterRender();
  };

  Renderer.addTemplateToDOM = function (data) {
    if (!this.selector.length) {
      this.determineRenderType({ element: this.selector, data: data });
    } else {
      for (let i = 0; i < this.selector.length; i++) {
        let el = this.selector[i];

        this.determineRenderType({ element: el, data: data })
      }
    }
  };

  Renderer.afterRender = function () {
    return null;
  };

  Renderer.destroy = function () {
    this.selector.remove();
  };

  Renderer.determineRenderType = function (options) {
    let el = options.element;
    let tpl = this.template(options.data);

    if (this.renderType === 'append') {
      el.insertAdjacentHTML('beforeend', tpl);
    } else {
      el.innerHTML = tpl;
    }
  };

  Renderer.serializeData = function (data) {
    if (data) { 
      return data;
    } else {
      return null;
    }
  };

  Renderer.setDOMSelector = function () {
    if (typeof this.selector === 'string') {
      switch (this.selector.charAt(0)) {
        case '#':
          this.selector = document.getElementById(this.selector.slice(1));
          break;
        default:
          this.selector = document.querySelectorAll(this.selector);
      }
    }

    // We want to ensure that if no selector is specified the selector chosen is the parent modules selector
    // this is incase we have an instance of appending purely on the parent element vs a specific container.
    if (typeof this.selector === 'undefined' && this.selector === null) {
      this.selector = this.regions[0];
    }

    this.regions.push(this.selector);
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
  
  // CONTROLLER
  // Helps code dry with by keeping similar functionilty in one place
  const Controller = Object.create(Renderer);

  Controller.create = function (options) {
    Object.assign(this, options);

    if (this.api) {
      this.ajax(this.api);
    }

    this.initialize();
  };

  Controller.initialize = function () {
    return null;
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

  Module.addComponents = function () {
    // Do nothing if no child components exist
    if (!Array.isArray(this.components) && this.components.length === 0) {
      return null;
    }

    for (let i = 0; i < this.components.length; i++) {
      let component = this.components[i];

      // We need to ensure every component has a unique name set for debugging and error handling purposes.
      this.checkUniqueName(component);

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
      if (this.componentNameArray[i] !== component.name && typeof component.name !== 'undefined') {
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
    ErrorHandler,

    Version:  '1.0.0',
    Author: 'Edgar Olivares',
    Email: 'webdreamer25@gmail.com'
  };
  
})(window);