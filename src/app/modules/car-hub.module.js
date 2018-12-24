import { Module } from '../../zense/index';
import FilterComponent from '../components/filter.component';
import Modal2Component from '../components/modal2.component';
import ResultsComponent from '../components/results.component';
import PaginatorComponent from '../components/paginator.component';

import style from './car-hub.module.css';

const CarHubModule = Object.create(Module);

CarHubModule.create({
  name: 'consultant-hub',
  selector: '#main-region',

  currentPage: 0,
  resultsMax: 8,
  showPaginator: true,

  api: 'https://5bfafb95a6af660013f1a105.mockapi.io/api/v1/cars',

  components: [
    Modal2Component,
    FilterComponent,
    ResultsComponent,
    PaginatorComponent
  ],

  template() {
    return `
      <section class="consultant">
        <div id="filter-region" class="container"></div>
        <div id="filter-results" class="container"></div>
        <div id="filter-paginator" class="container"></div>
      </section>
    `;
  }
});

export default CarHubModule;