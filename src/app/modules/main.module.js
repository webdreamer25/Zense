import { Module } from '../../zense/index';
import ModalComponent from '../components/modal.component';

const MainModule = Object.create(Module);

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

export default MainModule;