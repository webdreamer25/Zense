import { Zense } from '../../../zense';
import HeroModule from '../modules/hero.module';
import ResultsModule from '../modules/results.module';

const DashboardComposite = Object.create(Zense.Composite);

DashboardComposite.create({
  name: 'dashboard-composite',

  selector: '.main',

  modules: [
    HeroModule,
    ResultsModule
  ],

  beforeRender() {
    this.settings.totalResults = this.settings.store.length;
  },

  template() {
    return /*html*/`<div id="hero-region"></div>
    <div id="results-region" class="container"></div>`;
  }
});

export default DashboardComposite;