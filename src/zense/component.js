<<<<<<< HEAD
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
=======
import Controller from './core/controller';

const Component = Object.create(Controller);

Component.id = 0;
Component.type = 'component';
Component.shouldRender = true;

Component.setName = function (selector) {
  selector = selector.toLowerCase();

  this.name = selector.slice(1) + '-' + this.type + '-' + this.id;

  // Increment id after name is set so no duplication occurs
  this.id++
};

export default Component;
>>>>>>> dev
