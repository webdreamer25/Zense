define(function (require) {
  const MainModule = Object.create(Zense.Module);
  const ModalBehavior = Object.create(Zense.Behavior);

  ModalBehavior.config({
    trigger: '.js-toggle'
  });

  MainModule.create({
    selector: '#main-region',
    behaviors: [
      ModalBehavior
    ],

    template: function () {
      return `<button class="js-toggle">open modal</button>`;
    }
  });

  return MainModule;
});