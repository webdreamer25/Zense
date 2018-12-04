import { Behavior } from '../../zense/index';

const ResultsBehavior = Object.create(Behavior);

ResultsBehavior.config({
  behaviorName: 'results',
  filteredResults: [],

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
    this.updateTemplate();
  }
});

export default ResultsBehavior;