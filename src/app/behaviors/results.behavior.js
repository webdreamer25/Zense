import { Behavior } from '../../zense/index';

const ResultsBehavior = Object.create(Behavior);

ResultsBehavior.config({
  behaviorName: 'results',
  filteredResults: [],

  initialize() {
    let filters = this.getStoredData('filters');

    if (filters && filters.applied.length > 0) {
      this.component.render(filters.applied);
    }

    this.events.subscribe('filtered', this.updateTemplate.bind(this));
  },

  updateTemplate(e) {
    let paginatorComponent = this.module.getChildComponent('paginator');

      this.component.render(e.detail);
      paginatorComponent.render();
  },

  start() {
    this.initialize();
  }
});

export default ResultsBehavior;