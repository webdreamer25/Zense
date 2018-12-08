import { Module } from '../../zense/index';
import ModalComponent from '../components/modal.component';

const MainModule = Object.create(Module);

MainModule.create({
  name: 'main-module',
  selector: '#main-region',
  components: [
    ModalComponent
  ],

  template() {
    return `
      <div class="container">
        <button class="btn btn-primary js-toggle" data-modal="#testmodal1">
          open modal 1
        </button>
      </div>
    `;
  }
});

export default MainModule;