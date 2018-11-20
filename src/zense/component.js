(function (root) {
  const Component = function (options) {
    Zense.Renderer.call(this, options);
    this.initialize();
  };

  Component.prototype = new Zense.Renderer();

  Component.prototype.initialize = function () {
    return null;
  };

  Component.prototype.setName = function (selector) {
    this.opt.name = selector.slice(1).concat('-component');
  };

  root.Zense.Component = {
    create: function (options) {
      Object.assign(Component.prototype, options);

      let component = new Component(options);

      return component;
    }
  };
})(window);