define(function(require) {
  const ModalBehavior = Object.create(Zense.Behavior);

  ModalBehavior.config({
    modal: null,
    isOpen: false,
    ui: {
      trigger: '.js-toggle',
      closeBtn: '.js-modal-close-btn'
    },

    setHandlers: function () {
      this.ui.trigger.on('click', this.open.bind(this));
      this.ui.closeBtn.on('click', this.close.bind(this));
    },

    open: function (e) {
      e.preventDefault();
      let btn = e.currentTarget;
      this.modal = this.dom(btn.dataset.modal);

      if (!this.isOpen) {
        this.modal.classList.remove('modal--hidden');

        this.isOpen = true;
      }
    },

    close: function (e) {
      e.preventDefault();
      
      if (this.isOpen) {
        this.modal.classList.add('modal--hidden');

        this.isOpen = false;
        this.modal = null;
      }
    },

    start: function () {
      this.setHandlers();
    }
  });

  return ModalBehavior;
});