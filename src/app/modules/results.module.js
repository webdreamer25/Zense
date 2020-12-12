import { Zense } from '../../../zense';
import ControlsComponent from '../components/controls.component';

const ResultsModule = Object.create(Zense.Module);

ResultsModule.create({
  name: 'results-module',

  selector: '#results-region',

  components: [
    ControlsComponent
  ],

  controlType: 'static',
  currPageNum: 1,
  resultsPerPage: 4,
  totalResults: 0,

  init() {
    this.collection = this.settings.store;
  },

  serializeData() {
    return this.collection;
  },

  template(results) {
    let resultsTpl = '';
    let start = 0;
    let limit = this.resultsPerPage;

    if (this.currPageNum > 1) {
      limit = (this.resultsPerPage * this.currPageNum);
      start = limit - this.resultsPerPage;
    }

    for (let i = start; i < limit; i++) {
      let result = results[i];

      if (result === undefined) {
        break;
      }

      resultsTpl += /*html*/`<div class="m-results__item col-md-6">
        <div class="m-results__inner">
          <figure class="m-results__img"></figure>
          <h2 class="m-results__heading">${result.make}</h2>
          <p class="m-results__description">${result.model} ${result.year}</p>
        </div>
      </div>`;
    }

    return /*html*/`<div class="m-results row" role="region" aria-label="test result">
      ${resultsTpl}
    </div>
    <div class="c-controls row"></div>`;
  }
});

export default ResultsModule;