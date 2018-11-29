import { Module } from '../../zense/index';
import LogoComponent from '../components/logo.component';
import NavigationComponent from '../components/navigation.component';

const HeaderModule = Object.create(Module);

HeaderModule.create({
  name: 'header-module',
  selector: '#header-region',
  api: 'mocks/test.json',
  components: [
    LogoComponent,
    NavigationComponent
  ],

  template() {
    return `
      <div id="header-logo"></div>
      <nav id="navigation"></nav>
    `;
  }
});

export default HeaderModule;