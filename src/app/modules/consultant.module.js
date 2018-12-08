import { Module } from '../../zense/index';
import FilterComponent from '../components/filter.component';
import Modal2Component from '../components/modal2.component';
import ResultsComponent from '../components/results.component';

import style from './consultant.module.css';

const ConsultantModule = Object.create(Module);

ConsultantModule.create({
  name: 'consultant-hub',
  selector: '#main-region',
  api: 'https://5bfafb95a6af660013f1a105.mockapi.io/api/v1/cars',
  components: [
    Modal2Component,
    FilterComponent,
    ResultsComponent
  ],

  template() {
    return `
      <section class="consultant">
        <div id="filter-region" class="container">
        </div>
        <div id="filter-results" class="container">
        </div>
      </section>
    `;
  }
});

export default ConsultantModule;