import { Module } from '../../zense/index';
import LogoComponent from '../components/logo.component';
import NavigationComponent from '../components/navigation.component';

const HeaderModule = Object.create(Module);

HeaderModule.create({
  name: 'header-module',
  selector: '#header-region',
  components: [
    LogoComponent,
    NavigationComponent
  ],

  template() {
    return `
      <div class="container">
        <div class="row">
          <div id="header-logo" class="col-sm-6"></div>
          <nav id="navigation" class="col-sm-6"></nav>
        </div>
      </div>
    `;
  }
});

export default HeaderModule;