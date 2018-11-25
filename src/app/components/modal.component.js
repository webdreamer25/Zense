define(function (require) {
  const ModalComponent = Object.create(Zense.Component);

  // const ModalBehavior = require('behaviors/modal.behavior');
  const ModalBehavior = Object.create(Zense.Behavior);

  ModalBehavior.config({
    trigger: '.js-toggle',

    open: function () {
      console.log('opening modal');
    },

    setHandlers: function () {
      let self = this;

      this.dom(this.trigger).on('click', function (e) {
        e.preventDefault();
        let modal = self.dom(this.dataset.modal);
        
        modal.style.display = 'block';
      });
    },

    start: function () {
      this.setHandlers();
    }
  });

  ModalComponent.create({
    name: 'modal',
    selector: 'body',
    behaviors: [
      ModalBehavior
    ],

    template: function () {
      return `
        <div id="testmodal" class="modal" style="display:none">
          <div class="modal-content">modal content</div>
        </div>
      `;
    }
  });

  return ModalComponent;
});