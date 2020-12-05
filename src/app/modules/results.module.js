import { Zense } from '../../../zense';
import PaginationComponent from '../components/pagination.component';

const ResultsModule = Object.create(Zense.Module);

ResultsModule.create({
  name: 'results-module',

  selector: '#results-region',

  components: [
    PaginationComponent
  ],

  serializeData() {
    //this is a test girl i love you cici
    if (this.selector)
    return this.settings.store;
  },

  template(results) {
    let resultsTpl = '';
    let start = 0;
    let limit = this.settings.resultsPerPage;

    if (this.settings.currPageNum > 1) {
      limit = (this.settings.resultsPerPage * this.settings.currPageNum);
      start = limit - this.settings.resultsPerPage;
    }

    for (let i = start; i < limit; i++) {
      let result = results[i];

      if (result === undefined) {
        break;
      }

      resultsTpl += /*html*/`<div class="result">
        <div class="result__inner">
          <figure class="result__img"></figure>
          <h2 class="result__heading">${result.make}</h2>
          <p class="result__description">${result.model} ${result.year}</p>
        </div>
      </div>`;
    }

    return /*html*/`<div class="results" role="region" aria-label="test result">${resultsTpl}</div>
    <div class="pagination"></div>`;
  }
});

export default ResultsModule;