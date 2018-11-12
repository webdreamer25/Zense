(function (root) {
  // Object.assign Polyfill!
  if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }
  
        var to = Object(target);
  
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
  
          if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }

  const Config = {
    env: 'dev'
  };

  const Internal = {
    errors: []
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
  }

  const Api = {
    response: null,
    methodType: 'GET',
    percentComplete: '',

    fetch: function (options) {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener('error', this.error.bind(this));
      xhr.addEventListener('abort', this.abort.bind(this));
      xhr.addEventListener('load', this.success.bind(this));
      xhr.addEventListener('progress', this.updateProgress.bind(this));

      xhr.open(options.method, options.url);
      xhr.send(options.data);
    },

    success: function (res) {
      if (this.response !== null) {
        this.response = null;
      } 

      console.log(res);

      this.response = res;

      this.complete(res);
    },

    error: function () {

    },

    abort: function () {

    },

    updateProgress: function (eventObj) {
      if (eventObj.lengthComputable) {
        this.percentComplete = eventObj.loaded / eventObj.total * 100;
      } else {
        Internal.errors.push({
          type: 'XHR.'.concat(this.methodType),
          description: 'Unable to update "' + this.methodType + '" xhr request progress.'
        });
      }
    },

    complete: function (res) {
      return null;
    }
  };

  const Renderer = {
    type: '',
    regions: [],
    selector: null,
    template: null,
    renderType: 'append',
    warningText: 'There is no data being passed in.',

    beforeRender: function () {
      return null;
    },

    render: function () {
      this.beforeRender();
      this.setDOMSelector();

      try {
        this.errorCheck();

        if (!this.selector.length) {
          let data = this.serializeData();
          
          this.determineRenderType({ element: this.selector, data: data });
        } else {
          for (let i = 0; i < this.selector.length; i++) {
            let el = this.selector[i];

            this.determineRenderType({ element: el, data: data })
          }
        }
      } catch (e) {
        Internal.errors.push(e);
      }

      this.afterRender();
    },

    afterRender: function () {
      return null;
    },

    destroy: function () {
      this.selector.remove();
    },

    determineRenderType: function (options) {
      if (this.renderType === 'append') {
        options.element.innerHTML += this.template(options.data);
      } else {
        options.element.innerHTML = this.template(options.data)
      }
    },

    serializeData: function (data) {
      if (this.api && (this.api.model || this.api.collection.length > 0)) {
        return {
          model: this.api.model,
          collection: this.api.collection
        }
      } else if (data) {
        return data;
      } else {
        // let newErrorArray = [];

        // // Adds a warning to config errors
        // for (let i = 0; i < Internal.errors.length; i++) {
        //   let error = Internal.errors[i];

        //   if (error.selector === this.selector) {
        //     error.warning = this.warningText;
            
        //     newErrorArray.push(error);
        //   } else {
        //     newErrorArray.push({
        //       selector: error.selector,
        //       component: error.component,
        //       warning: this.warningText
        //     });
        //   }
        // }

        // Internal.errors = newErrorArray;
      }
    },

    setDOMSelector: function () {
      switch (this.selector.charAt(0)) {
        case '#':
          this.selector = document.getElementById(this.selector.slice(1));
          break;
        default:
          this.selector = document.querySelectorAll(this.selector);
      }

      // We want to ensure that if no selector is specified the selector chosen is the parent modules selector
      // this is incase we have an instance of appending purely on the parent element vs a specific container.
      if (typeof this.selector === 'undefined' && this.selector === null) {
        this.selector = this.regions[0];
      }

      this.regions.push(this.selector);
    },

    errorCheck: function () {
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
  }

  // COMPONENT
  const Component = Object.create(Renderer);

  Component.type = 'component';
  
  Component.create = function (options) {
    Object.assign(this, options);

    this.initialize();
  };

  Component.initialize = function () {
    return null;
  };

  Component.setName = function (selector) {
    this.name = selector.slice(1) + '-' + this.type;
  };

  // MODULE
  const Module = Object.create(Renderer);

  Module.type = 'module';
  Module.components = [];
  Module.componentNameArray = [];
  Module.shouldRenderChildren = true;

  Module.create = function (options) {
    Object.assign(this, options);

    this.components = options.components;

    this.initialize();
  };

  Module.initialize = function () {
    return null;
  };

  Module.afterRender = function () {
    this.addComponents(this.components);
  };

  Module.addComponents = function (componentList) {
    // Do nothing if no child components exist
    if (!Array.isArray(componentList) && componentList.length === 0) {
      return null;
    }

    for (let i = 0; i < componentList.length; i++) {
      let component = componentList[i];

      this.checkUniqueName(component);

      // Needed to ensure we merge component under Module/this context.
      Object.assign(this, component);

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
      if (this.componentNameArray[i] !== component.name) {
        return null;
      } else {
        component.setName(component.selector);
      }
    }
  };

  // COMPOSITE
  const Composite = Object.create(Renderer);
  
  Composite.modules = [];

  Composite.create = function (options) {
    Object.assign(this, options);

    this.initialize();
    this.render();

    this.bootstrapModules();
  };

  Composite.initialize = function () {
    return null;
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