import { Module } from '../../zense/index';
import FilterComponent from '../components/filter.component';

const ConsultantModule = Object.create(Module);

ConsultantModule.create({
  name: 'consultant-hub',
  selector: '#main-region',
  components: [
    FilterComponent
  ],

  template() {
    return `
      <div class="consultant-hub container">
        <div id="filter-region" class="row">
        </div>
        <div id="filter-results" class="row">
        </div>
      </div>
    `;
  }
});

export default ConsultantModule;