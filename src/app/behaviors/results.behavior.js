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
  },

  updateTemplate() {
    let paginatorComponent = this.module.getChildComponent('paginator');

    document.addEventListener('filtered', (e) => {
      if ((Array.isArray(e.detail) && e.detail.length > 0 || e.detail === 'not found')) {
        this.component.render(e.detail);
        paginatorComponent.render();
      } else {
        this.component.render();
        paginatorComponent.render();
      }
    });
  },

  start() {
    this.component.fullStore = this.component.store;

    this.initialize();
    this.updateTemplate();
  }
});

export default ResultsBehavior;