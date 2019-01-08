import { Behavior } from '../../zense/index';

const ResultsBehavior = Object.create(Behavior);

ResultsBehavior.config({
  behaviorName: 'results',
  filteredResults: [],

  initialize() {
    this.events.subscribe('filtered', this.updateTemplate.bind(this));
  },

  updateTemplate(e) {
    let paginatorComponent = this.module.getChildComponent('paginator');

    if (e.detail.length > 0) {
      this.component.render(e.detail);
    } else {
      this.component.render();
    }
    
    paginatorComponent.render();
  },

  start() {
    this.initialize();
  }
});

export default ResultsBehavior;