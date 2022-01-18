import { Zense } from '../../../zense';
import ArchitectualModule from '../modules/architectual.module';
import HeaderModule from '../modules/header.module';
import SidepanelModule from '../modules/sidepanel.module';

const DevelopComposite = Object.create(Zense.Composite);

DevelopComposite.create({
  name: 'dashboard-composite',
  selector: '#app',
  renderType: 'html',

  modules: [
    HeaderModule,
    SidepanelModule,
    ArchitectualModule
  ],

  template() {
    return /*html*/`<div id="header-region" class="container"></div>
    <div class="container">
      <div class="row">
        <div id="sidepanel-region" class="col-auto"></div>
        <main class="col">
          <div id="architectual-region"></div>
        </main>
      </div>
    </div>`;
  }
});

export default DevelopComposite;