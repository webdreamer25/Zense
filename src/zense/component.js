import Controller from './core/controller';

const Component = (function () {
  const component = Object.create(Controller);

  component.id = 0;
  component.type = 'component';

  component.setName = function (selector) {
    selector = selector.toLowerCase();

    this.name = selector.slice(1) + '-' + this.type + '-' + this.id;

    // Increment id after name is set so no duplication occurs
    this.id++
  };

  return component;
})();

export default Component;