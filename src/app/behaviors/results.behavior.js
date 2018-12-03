import { Behavior } from '../../zense/index';

const ResultsBehavior = Object.create(Behavior);

ResultsBehavior.config({
  behaviorName: 'results',
  filteredResults: [],

  updateTemplate() {
    document.addEventListener('filtered', (e) => {
      if (e.detail.length > 0) {
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