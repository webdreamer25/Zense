import { Behavior } from '../../zense/index';

const ResultsBehavior = Object.create(Behavior);

ResultsBehavior.config({
  behaviorName: 'results',
  updateTemplate() {
    document.addEventListener('filtered', (e) => {
      console.log(e, this.store);
    });
  }
});

export default ResultsBehavior;