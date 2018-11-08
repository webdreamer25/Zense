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
    env: 'dev',
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
    model: {},
    collection: {},

    fetch: function () {

    }
  };

  const Renderer = {
    callee: '',
    regions: [],
    selector: '',
    template: '',
    warningText: 'There is no data being passed in.',

    beforeRender: function () {
      return null;
    },

    render: function () {
      this.beforeRender();
      this.setDOMSelector();

      if (!this.selector.length) {
        this.selector.innerHTML += this.template(this.serializeData());
      } else {
        for (let i = 0; i < this.selector.length; i++) {
          let el = this.selector[i];

          el.innerHTML += this.template;
        }
      }

      this.afterRender();
    },

    afterRender: function () {
      return null;
    },

    destroy: function () {
      this.selector.remove();
    },

    serializeData: function (data) {
      if (this.api.model || this.api.collection.length > 0) {
        return {
          model: this.api.model,
          collection: this.api.collection
        }
      } else if (data) {
        return data;
      } else {
        let newErrorArray = [];

        // Adds a warning to config errors
        for (let i = 0; i < Config.errors.length; i++) {
          let error = Config.errors[i];

          if (error.selector === this.selector) {
            error.warning = this.warningText;
            
            newErrorArray.push(error);
          } else {
            newErrorArray.push({
              selector: error.selector,
              component: error.component,
              warning: this.warningText
            });
          }
        }

        Config.errors = newErrorArray;
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

    for (let i = 0; i < Config.errors.length; i++) {
      let error = Config.errors[i];

      document.querySelector(error.selector).style.border = '1px solid red';

      this.index = i;
      this.selector = error.selector;

      this.render();

    };
  };

  ErrorHandler.serializeData = function () {
    return Config.errors[this.index];
  };

  ErrorHandler.start = function () {
    if ((Config.errors === 0 || Config.env !== 'dev')) { return null; }

    this.initialize();
  }

  // COMPONENT
  const Component = Object.create(Renderer);

  Component.callee = 'component';
  Component.api = Object.create(Api);
  
  Component.create = function (options) {
    Object.assign(this, options);

    this.initialize();
  };

  Component.initialize = function () {
    return null;
  };

  Component.setName = function (selector) {
    this.name = selector.slice(1) + '-component';
  };

  // MODULE
  const Module = Object.create(Renderer);

  Module.callee = 'module';
  Module.components = [];
  Module.componentNameArray = [];
  Module.shouldRenderChildren = true;
  Module.api = Object.create(Api);

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
        Config.errors.push({
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

    this.api = Object.create(Api);

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

  root.zense = {
    Module,
    Composite,
    Component,
    ErrorHandler,

    Version:  '1.0.0',
    Author: 'Edgar Olivares',
    Email: 'webdreamer25@gmail.com'
  };
  
})(window);