import { Component } from '../../zense/index';
import ModalBehavior from '../behaviors/modal.behavior';

import style from './modal2.component.css';

const Modal2Component = Object.create(Component);

Modal2Component.create({
  name: 'modal2',
  selector: '#filter-region',
  behaviors: [
    ModalBehavior
  ],

  template() {
    return `
      <div class="row justify-content-center pb-4">
        <div class="col-md-12 text-center">
          <h2>Lorem Ipsum</h2>
          <p class="pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet condimentum faucibus.</p>
        </div>
        <div class="col-auto">
          <button class="btn btn-primary btn-sm js-toggle" data-modal="#filter-modal">
            Filter Consultant List
          </button>
        </div>
      </div>

      <div id="filter-modal" 
        class="modal-2" 
        tabindex="-1" 
        role="dialog" 
        aria-hidden="true">

        <div class="container" role="document">
          <div class="model-2-top row justify-content-end">
            <div class="col-auto">
              <button type="button" 
                class="close-btn js-modal-close-btn" 
                data-dismiss="modal" 
                aria-label="Close">
                <span aria-hidden="true"><i class="fas fa-times"></i></span>
              </button>
            </div>
          </div>
          <div id="modal-2-content-region" class="modal-2-content row"></div>
        </div>
      </div>
    `;
  }
});

export default Modal2Component;