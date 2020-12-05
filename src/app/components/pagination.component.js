import { Zense } from '../../../zense';

const PaginationComponent = Object.create(Zense.Component);

PaginationComponent.create({
  name: 'pagination-component',

  selector: '.pagination',

  ui: {
    '.js-pagi-btn': {
      event: 'click',
      method: 'onClickChangePage'
    }
  },

  onClickChangePage(e, btn) {
    e.preventDefault();
    let pageNum = btn.dataset.type;

    this.settings.currPageNum = parseInt(pageNum);

    this.saveSettings();

    this.module.render();
  },

  template() {
    let tpl = '';
    let page = this.settings.currPageNum;
    let limit = Math.ceil(this.settings.store.length / this.settings.resultsPerPage);

    if (page > 1 && page <= limit) {
      tpl += /*html*/`<li class="pagination__btn js-pagi-btn" data-type="${(page - 1)}">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </li>`;
    }

    for (let i = Math.max(1, page - 1); i <= Math.min(limit, page + 1); i++) {
      let isActive = i === this.settings.currPageNum ? 'is--active' : '';

      tpl += /*html*/`<li class="pagination__btn js-pagi-btn ${isActive}" data-type="${i}">
        ${(i)}
      </li>`;
    }

    if (limit !== 1 && page !== limit) {
      tpl += /*html*/`<li class="pagination__btn js-pagi-btn" data-type="${(page + 1)}">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </li>`;
    }

    return /*html*/`<ul class="pagination__list">${tpl}</ul>`;
  }
});

export default PaginationComponent;