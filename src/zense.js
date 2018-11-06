import _ from "underscore";

(function (root) {

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

  // const Events = {
  //   config: {
  //     bubbles: true,
  //     cancelable: true
  //   },

  //   separator: /(^|:)(\w)/gi,

  //   triggerMethod: function (options) {
  //     let methodName = 'on' + event.replace(separator, options.eventName);
  //     let method = this[methodName];
  //     let result = '';

  //     if (typeof method === 'function') {
  //       result = method.apply
  //     }
  //   },

  //   listenTo: function (options) {
  //     options.el.addEventListener(options.event, (e) => options.callback);
  //   }
  // };

  const Renderer = {
    callee: '',
    regions: [],
    selector: '',
    template: '',
    multiSelector: false,

    beforeRender: function () {
      this.setDOMSelector();
      this.addTemplate();
    },

    render: function () {
      this.beforeRender();

      if (!this.multiSelector) {
        this.selector.innerHTML += this.template;
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

    setTemplateData: function () {
      if (this.api.model || this.api.collection.length > 0) {
        return {
          model: this.api.model,
          collection: this.api.collection
        }
      } else {
        return {};
      }
    },

    addTemplate: function () {
      // We need to ensure that if the template turns out to be a function we pass in the data.
      if (typeof this.template === 'function') {
        let templateData = this.setTemplateData();

        this.template = this.template(templateData);
      }
    },

    setDOMSelector: function () {
      switch (this.selector.charAt(0)) {
        case '.':
          this.selector = document.getElementsByClassName(this.selector.slice(1));
          this.multiSelector = true;
          break;
        case '[':
          this.selector = document.querySelectorAll(this.selector);
          this.multiSelector = true;
          break;
        case '#':
          this.selector = document.getElementById(this.selector.slice(1));
          break;
        default:
          this.selector = document.getElementsByTagName(this.selector);
          this.multiSelector = true;
      }

      // We want to ensure that if no selector is specified the selector chosen is the parent modules selector
      // this is incase we have an instance of appending purely on the parent element vs a specific container.
      if (typeof this.selector === 'undefined' && this.selector === null) {
        this.selector = this.regions[0];
      }

      this.regions.push(this.selector);
    }
  };

  // ERROR HANDLER
  const ErrorHandler = Object.create(Renderer);

  ErrorHandler.initialize = function (options) {
    let defaults = {
      selector: 'body',
      ui: {
        container: '.dev-errors-container',
        target: '.js-dev-errors'
      }
    };

    _.extend(this, defaults, options);

    _.each(Config.errors, function (err, idx) {
      console.log(err);
      let div = document.querySelector(err.selector);

      div.style.borderWidth = '1px';
      div.style.borderColor = 'red';
      div.style.borderStyle = 'solid';

      this.selector = div;
    });
  };

  ErrorHandler.setTemplateData = function () {
    return Config.errors;
  };

  ErrorHandler.start = function () {
    if ((Config.errors === 0 || Config.env !== 'dev')) { return null; }

    console.log(Config);

    this.initialize();
    this.render();
  }

  // COMPONENT
  const Component = Object.create(Renderer);

  Component.name = '';
  Component.callee = 'component';
  Component.api = Object.create(Api);
  
  Component.create = function (options) {
    _.extend(this, options);

    this.initialize();
    this.setName();
  };

  Component.initialize = function () {
    return null;
  };

  Component.setName = function () {
    // We need to have a name for the component if none exist for error handling
    if (typeof this.name === '') {
      this.name = this.selector.slice(1) + '-component';
    } else {
      return null;
    }
  }

  // MODULE
  const Module = Object.create(Renderer);

  Module.callee = 'module';
  Module.components = [];
  Module.shouldRenderChildren = true;
  Module.api = Object.create(Api);

  Module.create = function (options) {
    _.extend(this, options);

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
      let componentName = component.name;

      // Needed to ensure we merge component under Module/this context.
      _.extend(this, component);

      // shouldRenderChildren property exists so you can decide where and/or when a component should render.
      if (this.shouldRenderChildren && this.component[componentName].template !== '') {
        this.component[componentName].render();
      } else {
        // console.log('Component: ' + componentName + ' Error: Nees a template!');
        Config.errors.push({
          selector: component.selector,
          component: componentName,
          description: 'This component needs a template!'
        })
      }
    }
  };

  Module.checkUniqueName = function (name) {
    this.componentNameArray = [];

    for (let i = 0; i < this.componentNameArray.length; i++) {
      if (this.componentNameArray[i] !== name) {
        this.componentNameArray.push(name);
      }
    }
  };

  // COMPOSITE
  const Composite = Object.create(Renderer);
  
  Composite.modules = [];

  Composite.create = function (options) {
    _.extend(this, options);

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