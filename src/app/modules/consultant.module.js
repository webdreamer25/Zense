import { Module } from '../../zense/index';
import FilterComponent from '../components/filter.component';
import ResultsComponent from '../components/results.component';

const ConsultantModule = Object.create(Module);

ConsultantModule.create({
  name: 'consultant-hub',
  selector: '#main-region',
  api: 'https://5bfafb95a6af660013f1a105.mockapi.io/api/v1/cars',
  components: [
    FilterComponent,
    ResultsComponent
  ],

  template() {
    return `
      <div class="consultant-hub container">
        <div id="filter-region">
        </div>
        <div id="filter-results" class="row">
        </div>
      </div>
    `;
  }
});

export default ConsultantModule;