import { Zense } from '../../../zense';

const ControlsComponent = Object.create(Zense.Component);

ControlsComponent.create({
  name: 'controls-component',

  selector: '.c-controls',

  ui: {
    jsBtn: '.js-control-btn'
  },

  afterRender() {
    this.ui.jsBtn.on('click', this.handleControls.bind(this));
  },

  handleControls(e) {
    let btn = e.currentTarget;
    let itemIdx = parseInt(btn.dataset.item);

    // Ensures we carousel back to first or last slide.
    if (itemIdx === 0) {
      itemIdx = this.module.collection.length - 2;
    } else if (itemIdx === this.module.collection.length - 1) {
      itemIdx = 1;
    }

    this.settings.currPageNum = itemIdx;

    this.module.update(itemIdx);

    // Ensures we update control to new state.
    this.render();
  },

  updateSlideIdx(type, currIdx, totalItems) {
    let updatedItemIdx;

    if (type === 'prev') {
      if (currIdx === 0) {
        updatedItemIdx = totalItems - 1;
      } else {
        updatedItemIdx = currIdx - 1;
      }
    } else if (type === 'next') {
      if (currIdx === totalItems) {
        updatedItemIdx = 0;
      } else {
        updatedItemIdx = currIdx + 1;
      }
    }

    return updatedItemIdx;
  },

  serializeData() {
    return {
      showIcons: true,
      showLabel: false,
      showNums: false,
      prevLabel: 'Previous',
      nextLabel: 'Next',
      isCarousel: this.module.type === 'carousel',
      typeClass:`is--${this.module.type}`,
      items: this.module.collection
    };
  },

  template(model) {
    let prevBtnTpl;
    let nextBtnTpl;
    let paginatorTpl = '';
    let page = this.settings.currPageNum;
    let totalItems = model.items.length;
    let limit = Math.ceil(totalItems / this.settings.resultsPerPage);

    if (page > 1 && page <= limit || model.isCarousel) {
      let prevIdx = this.updateSlideIdx('prev', page, totalItems);

      prevBtnTpl = /*html*/`<button class="c-controls__prev js-control-btn ${model.typeClass}" data-type="prev" data-item="${prevIdx}">
        ${model.showIcons ? /*html*/`<i class="fa fa-chevron-left"></i>` : ''}
        ${model.showLabel ? model.prevLabel : ''}
      </button>`;
    }

    if (model.isCarousel) {
      limit = totalItems - 1;

      for (let i = 1; i < limit; i++) {
        paginatorTpl += this.pagiTemplate(i, page);
      }
    } else {
      for (let i = Math.max(1, page - 1); i <= Math.min(limit, page + 1); i++) {
        paginatorTpl += this.pagiTemplate(i, page);
      }
    }

    if (limit !== 1 && page !== limit || model.isCarousel) {
      let nextIdx = this.updateSlideIdx('next', page, totalItems);

      nextBtnTpl = /*html*/`<button class="c-controls__next js-control-btn ${model.typeClass}" data-type="next" data-item="${nextIdx}">
        ${model.showIcons ? /*html*/`<i class="fa fa-chevron-right"></i>` : ''}
        ${model.showLabel ? model.nextLabel : ''}
      </button>`;
    }

    return /*html*/`${prevBtnTpl}<div class="c-controls__paginator">
      <ul class="c-controls__pagilist ${model.typeClass}">${paginatorTpl}</ul>
    </div>${nextBtnTpl}`;
  },

  pagiTemplate(i, page) {
    let isActive = i  === page ? 'is--active' : '';

    return /*html*/`<li class="c-controls__pagibtn js-control-btn ${isActive}" data-item="${i}">
      ${(i)}
    </li>`;
  }
});

export default ControlsComponent;