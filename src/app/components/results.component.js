import { Component } from '../../zense/index';
import ResultsBehavior from '../behaviors/results.behavior';

const ResultsComponent = Object.create(Component);

ResultsComponent.create({
  name: 'results',
  renderType: 'html',
  selector: '#filter-results',
  behaviors: [
    ResultsBehavior
  ],

  template(carList) {
    console.log(carList);
    let tplList = '';

    if (Array.isArray(carList)) {
      for (let i = 0; i < carList.length; i++) {
        tplList += '<div class="col-md-3"><div class="car-card">';
        tplList += '<span>Make: ' + carList[i].make + '</span><br />'
        tplList += '<span>Model: ' + carList[i].model + '</span>';
        tplList += '</div></div>';
      }
    } else {
      tplList += '<p>No results were found.</p>';
    }

    return tplList;
  }
});

export default ResultsComponent;