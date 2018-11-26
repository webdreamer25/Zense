define(function (require) {
  const ModalComponent = Object.create(Zense.Component);

  const ModalBehavior = require('behaviors/modal.behavior');

  ModalComponent.create({
    name: 'modal',
    selector: 'body',
    behaviors: [
      ModalBehavior
    ],

    template: function () {
      return `
        <div id="testmodal1" class="modal modal--hidden">
          <div class="modal-content">
            <button class="js-modal-close-btn">x</button>
            modal content 1
          </div>
        </div>


        <div id="testmodal2" class="modal modal--hidden">
          <div class="modal-content">
            <button class="js-modal-close-btn">x</button>
            modal content 2
          </div>
        </div>
      `;
    }
  });

  return ModalComponent;
});