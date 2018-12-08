import { Behavior } from '../../zense/index';

const ResultsBehavior = Object.create(Behavior);

ResultsBehavior.config({
  behaviorName: 'results',
  filteredResults: [],

  initialize() {
    let filters = this.getStoredData('filters');console.log(this);

    if (filters && filters.applied.length > 0) {
      this.parent.render(filters.applied);
    }
  },

  updateTemplate() {
    document.addEventListener('filtered', (e) => {
      if ((Array.isArray(e.detail) && e.detail.length > 0 || e.detail === 'not found')) {
        this.parent.render(e.detail);
      } else {
        this.parent.render();
      }
    });
  },

  start() {
    this.parent.fullStore = this.parent.store;
    this.initialize();
    this.updateTemplate();
  }
});

export default ResultsBehavior;