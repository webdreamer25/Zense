import { Component } from '../../zense/index';
import ModalBehavior from '../behaviors/modal.behavior';

const ModalComponent = Object.create(Component);

ModalComponent.create({
  name: 'modal',
  selector: 'body',
  behaviors: [
    ModalBehavior
  ],

  template() {
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

export default ModalComponent;