import { Component } from '../../zense/index';

const PaginatorComponent = Object.create(Component);

PaginatorComponent.create({
  name: 'paginator',
  renderType: 'html',
  selector: '#filter-paginator',

  ui: {
    pagiBtn: '.js-page-link',
    prevBtn: '.js-page-link-prev',
    nextBtn: '.js-page-link-next'
  },

  afterRender() {
    this.resultsComponent = this.module.getChildComponent('results');

    this.bindUIElements();

    this.ui.pagiBtn.on('click', (e) => {
      let btn = e.target;
      let currentPage = btn.dataset.pagiIdx;

      this.module.currentPage = parseInt(currentPage);

      this.render();
      this.resultsComponent.render();
    });

    this.ui.prevBtn.on('click', this.onPrev.bind(this));
    this.ui.nextBtn.on('click', this.onNext.bind(this));
  },

  setDefaultActive(idx) {
    if (this.module.currentPage === idx) {
      return 'active';
    }

    return '';
  },

  setDefaultDisable(prev) {
    let result = '';

    if (prev && this.module.currentPage === 0) {
      result = 'disabled';
    }

    if (!prev && this.module.currentPage === (this.module.pagiLength-1)) {
      result = 'disabled';
    }
    
    return result;
  },

  shouldHidePaginator() {
    if (this.module.pagiLength <= 1 || !this.module.showPaginator) {
      return 'visibility-hidden'
    }

    return '';
  },

  addPagiBtns() {
    let tpl = '';

    for (let i = 0; i < this.module.pagiLength; i++) {
      tpl += `
        <li class="page-item ${this.setDefaultActive(i)}">
          <button class="page-link js-page-link" data-pagi-idx="${i}">
            ${(i+1)}
          </button>
        </li>
      `;
    }

    return tpl;
  },

  onPrev() {
    this.module.currentPage--;

    this.render();
    this.resultsComponent.render();
  },

  onNext() {
    this.module.currentPage++;

    this.render();
    this.resultsComponent.render();
  },

  template() {
    return `
      <div class="paginator pt-3 row justify-content-center ${this.shouldHidePaginator()}">
        <nav class="col-auto">
          <ul class="pagination">
            <li class="page-item ${this.setDefaultDisable(true)}">
              <button class="page-link js-page-link-prev">
                <i class="fas fa-chevron-left"></i>
                Prev
              </button>
            </li>
            
            ${this.addPagiBtns()}

            <li class="page-item ${this.setDefaultDisable(false)}">
              <button class="page-link js-page-link-next">
                Next
                <i class="fas fa-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    `;
  }
});

export default PaginatorComponent;