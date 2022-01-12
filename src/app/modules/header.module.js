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
    return /*html*/`<div class="container">
      <div class="row">
        <div class="col">Company Logo</div>
        <div id="nav-region" class="col"></div>
      </div>
    </div>`;
  }
})

export default HeaderModule;