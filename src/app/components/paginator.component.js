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
    this.resultComponent = this.parent.getChildComponent('results');

    this.bindUIElements();

    this.ui.pagiBtn.on('click', (e) => {
      let btn = e.target;
      let currentPage = btn.dataset.pagiIdx;

      this.parent.currentPage = parseInt(currentPage);

      this.render();
      this.resultComponent.render();
    });

    this.ui.prevBtn.on('click', this.onPrev.bind(this));
    this.ui.nextBtn.on('click', this.onNext.bind(this));
  },

  setDefaultActive(idx) {
    if (this.parent.currentPage === idx) {
      return 'active';
    }

    return '';
  },

  setDefaultDisable(prev) {
    let result = '';

    if (prev && this.parent.currentPage === 0) {
      result = 'disabled';
    }

    if (!prev && this.parent.currentPage === (this.parent.pagiLength-1)) {
      result = 'disabled';
    }
    
    return result;
  },

  addPagiBtns() {
    let tpl = '';

    for (let i = 0; i < this.parent.pagiLength; i++) {
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
    this.parent.currentPage--;

    this.render();
    this.resultComponent.render();
  },

  onNext() {
    this.parent.currentPage++;

    this.render();
    this.resultComponent.render();
  },

  template() {
    return `
      <div class="paginator pt-3 row justify-content-center">
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