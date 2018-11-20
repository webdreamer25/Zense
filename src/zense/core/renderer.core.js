'use strict';

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

(function (root) {
  const Renderer = function (options) {
    let defaults = {
      regions: [],
      selector: null,
      template: null,
      renderType: 'append',
      warningText: 'There is no data being passed in.'
    };

    this.opt = Object.assign({}, defaults, options);
  };

  Renderer.prototype.beforeRender = function () {
    return null;
  };

  Renderer.prototype.render = function () {
    this.beforeRender();
    this.setDOMSelector(this.opt.selector);

    if (this.opt.selector) {
      if (!this.opt.selector.length) {
        this.determineRenderType(this.opt.selector);
      } else {
        for (let i = 0; i < this.opt.selector.length; i++) {
          let selector = this.opt.selector[i];

          this.determineRenderType(selector);
        }
      }
    }

    this.afterRender();
  };

  Renderer.prototype.afterRender = function () {
    return null;
  };

  Renderer.prototype.serializeData = function (data) {
    return {};
  };

  Renderer.prototype.determineRenderType = function (selector) {
    try {
      let template = this.opt.template(this.serializeData());

      if (this.opt.renderType.toLowerCase() !== 'append') {
        selector.innerHTML = template;
      } else {
        selector.innerHTML += template;
      }
    } catch (e) {
      throw e;
    }

    this.opt.template = null;
  };

  Renderer.prototype.setDOMSelector = function (selector) {
    if (typeof selector !== 'string' && selector !== null) { return null; }

    switch(selector.charAt(0)) {
      case '#':
        selector = document.getElementById(selector.slice(1));
        break;
      default:
        selector = document.querySelectorAll(selector);
    }

    this.opt.selector = selector;
  };

  root.Zense.Renderer = Renderer;
})(window);