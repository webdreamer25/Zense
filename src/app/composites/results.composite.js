import { Zense } from '../../../zense';
import TopComponent from '../components/top.component';
import HeaderModule from '../modules/header.module';
import ResultsModule from '../modules/results.module';

const ResultsComposite = Object.create(Zense.Composite);

ResultsComposite.create({
  name: 'results-composite',
  selector: '#app',
  renderType: 'html',

  modules: [
    HeaderModule,
    ResultsModule
  ],

  components: [
    TopComponent
  ],
  
  beforeRender() {
    this.store.totalResults = this.store.cars.length;
  },

  template() {
    return /*html*/`<div id="header-region" class="container"></div>
    <div id="top-region" class="container"></div>
    <div id="results-region" class="container"></div>`;
  }
})

export default ResultsComposite;