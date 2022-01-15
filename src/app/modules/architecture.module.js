import { Zense } from '../../../zense';

const ArchitectualModule = Object.create(Zense.Module);

ArchitectualModule.create({
  name: 'architectual-module',
  selector: '#architectual-region',

  template() {
    return /*html*/`<div class="m-zense-architectual">
      <div class=""></div>
    </div>`;
  },

  objectTemplate() {
    return /*html*/`<div></div>`;
  }
})

export default ArchitectualModule;