import { Zense } from '../../../zense';
import TopComponent from '../components/top.component';
import HeroModule from '../modules/hero.module';
import ResultsModule from '../modules/results.module';

const DashboardComposite = Object.create(Zense.Composite);

DashboardComposite.create({
  name: 'dashboard-composite',

  selector: '.main',

  modules: [
    HeroModule,
    { 
      component: TopComponent, 
      options: {
        heading: 'Car results'
      }, 
      defaultOnly: true 
    },
    ResultsModule
  ],

  beforeRender() {
    this.store.totalResults = this.store.cars.length;
  },

  template() {
    return /*html*/`<div id="hero-region"></div>
    <div id="top-region"></div>
    <div id="results-region" class="container"></div>`;
  }
});

export default DashboardComposite;