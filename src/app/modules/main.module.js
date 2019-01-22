import { Module } from '../../zense/index';
import ModalComponent from '../components/modal.component';
import FormComponent from '../components/form.component';

const MainModule = Object.create(Module);

MainModule.create({
  name: 'main-module',
  selector: '#main-region',
  components: [
    ModalComponent
  ],

  afterRender() {
    this.dom('.js-render-modal').on('click', function (e) {
      FormComponent.render();
    });
  },

  template() {
    return `
      <div class="container">
        <button class="btn btn-primary js-toggle" data-modal="#testmodal1">
          open modal 1
        </button>

        <button class="js-render-modal">render modal</button>
        <div id="form-component"></div>
      </div>
    `;
  }
});

export default MainModule;