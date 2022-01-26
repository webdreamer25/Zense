import { Zense } from '../../../zense';
import NavComponent from "../components/nav.component";

import css from './header.css';

const HeaderModule = Object.create(Zense.Module);

HeaderModule.create({
  name: 'header-module',
  css,

  components: [
    NavComponent
  ],

  template() {
    return /*html*/`<div class="m-zense-header row">
      <div class="col">Zense JS</div>
      <nav-component class="col-auto"></nav-component>
    </div>`;
  }
})

export default HeaderModule;