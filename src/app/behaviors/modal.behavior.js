import { Behavior } from '../../zense/index';

const ModalBehavior = Object.create(Behavior);

ModalBehavior.config({
  behaviorName: 'modal',
  modal: null,
  isOpen: false,
  ui: {
    trigger: '.js-toggle',
    closeBtn: '.js-modal-close-btn'
  },

  setHandlers() {
    this.ui.trigger.on('click', this.open.bind(this));
    this.ui.closeBtn.on('click', this.close.bind(this));
  },

  open(e) {
    e.preventDefault();
    let btn = e.currentTarget;
    this.modal = this.dom(btn.dataset.modal);

    if (!this.isOpen) {
      this.modal.classList.add('show');
      this.dom('#app').classList.add('no-scroll');

      this.isOpen = true;
    }
  },

  close(e) {
    e.preventDefault();
    
    if (this.isOpen) {
      this.modal.classList.remove('show');

      this.isOpen = false;
      this.modal = null;
    }
  },

  start() {
    this.setHandlers();
  }
});

export default ModalBehavior;