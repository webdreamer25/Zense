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
      <div id="testmodal1" 
        class="modal modal--backdrop fade" 
        tabindex="-1" 
        role="dialog" 
        aria-hidden="true">

        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close js-modal-close-btn" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              modal content 1
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
});

export default ModalComponent;