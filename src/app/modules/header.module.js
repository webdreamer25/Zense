import { Zense } from '../../../zense';
import NavComponent from "../components/nav.component";

const HeaderModule = Object.create(Zense.Module);

HeaderModule.create({
  name: 'header-module',
  selector: '#header-region',

  components: [
    NavComponent
  ],

  template() {
    return /*html*/`<div class="m-zense-header row">
      <div class="col">Zense JS</div>
      <div id="nav-region" class="col-auto"></div>
    </div>`;
  }
})

export default HeaderModule;