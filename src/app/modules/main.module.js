define(function (require) {
  const MainModule = Object.create(Zense.Module);

  MainModule.create({
    selector: '#main-region',

    template: function () {
      return `<button class="js-toggle">open modal</button>`;
    }
  });

  return MainModule;
});