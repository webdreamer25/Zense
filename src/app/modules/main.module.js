define(function (require) {
  const MainModule = Object.create(Zense.Module);
  
  const ModalComponent = require('components/modal.component');

  MainModule.create({
    name: 'main-module',
    selector: '#main-region',
    components: [
      ModalComponent
    ],

    template: function () {
      return `
      <button class="js-toggle" data-modal="#testmodal1">open modal 1</button>
      <button class="js-toggle" data-modal="#testmodal2">open modal 2</button>
      `;
    }
  });

  return MainModule;
});