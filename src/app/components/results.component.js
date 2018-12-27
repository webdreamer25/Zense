import { Component } from '../../zense/index';
import ResultsBehavior from '../behaviors/results.behavior';
import StorageExtender from '../extenders/storage.extender';

import style from './results.component.css';

const ResultsComponent = Object.create(Component);

ResultsComponent.create({
  name: 'results',
  renderType: 'html',
  selector: '#filter-results',
  behaviors: [
    { 
      name: ResultsBehavior, 
      options: StorageExtender 
    }
  ],

  serializeData(data) {
    let filters = JSON.parse(sessionStorage.getItem('filters'));

    if (filters && filters.applied.length > 0) {
      data = filters.applied;
    } else {
      data = this.store;
    }

    this.module.pagiLength = Math.ceil(data.length / this.module.resultsMax);

    if (this.module.currentPage > 0) {
      let startIndex = this.module.resultsMax * this.module.currentPage;
      let endIndex = startIndex + this.module.resultsMax;

      data = data.slice(startIndex, endIndex);
    } else {
      data = data.slice(0, this.module.resultsMax);
    }

    return data;
  },

  handleResults(data) {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((car) => {
        return `<div class="col-md-3 pb-3">
          <div class="card">
            <img class="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1678c623622%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1678c623622%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.203125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
            <div class="card-body">
              <h5 class="card-title">${car.make} ${car.model}</h5>
              <p>${car.description}</p>
            </div>
          </div>
        </div>`;
      }).join('');
    } else {
      return `<p>No results were found.</p>`;
    }
  },

  template(data) {
    return `
      <div class="row text-center">
        <div class="col-sm-12">
          <div class="results-intro">
            <h4>Car List</h4>
            <p>Results Shown: 
              <span class="result-count">
                ${data.length}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="consultant-results row">
        ${this.handleResults(data)}
      </div>
    `;
  }
});

export default ResultsComponent;