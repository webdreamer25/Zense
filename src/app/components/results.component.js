import { Component } from '../../zense/index';
import ResultsBehavior from '../behaviors/results.behavior';

const ResultsComponent = Object.create(Component);

ResultsComponent.create({
  name: 'results',
  selector: '#filter-results',
  behaviors: [
    ResultsBehavior
  ],

  initialize() {
    // this.updateTemplate();
    console.log(this);
  },

  template(carList) {
    let tplList = '';

    for (let i = 0; i < carList.length; i++) {
      tplList += '<div class="col-md-3">' + carList[i] + '</div>';
    }

    return tplList;
  }
});

export default ResultsComponent;