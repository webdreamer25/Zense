import { Zense } from '../../../zense';

const ControlsComponent = Object.create(Zense.Component);

ControlsComponent.create({
  name: 'controls-component',

  selector: '.c-controls',

  ui: {
    jsBtn: '.js-control-btn'
  },

  renderType: 'html',
  renderMultiple: true,

  init() {
    let delegate = typeof this.ui.jsBtn === 'string' ? this.ui.jsBtn : this.ui.jsBtn.strName;

    this.module.selector.on('click', delegate, this.handleControls.bind(this));
  },

  handleControls(e) {
    let btn = e.delegate;
    let itemIdx = parseInt(btn.dataset.item);

    this.module.currPageNum = itemIdx;

    if (this.module.update) {
      this.module.update(itemIdx);
    } else {
      this.module.render();
    }

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
      isCarousel: this.module.controlType === 'carousel',
      typeClass:` is--${this.module.controlType}`,
      items: this.module.collection
    };
  },

  template(model) {
    let prevBtnTpl = '';
    let nextBtnTpl = '';
    let paginatorTpl = '';
    let page = this.module.currPageNum;
    let totalItems = model.items.length;
    let limit = Math.ceil(totalItems / this.module.resultsPerPage);

    if (page > 1 && page <= limit || model.isCarousel) {
      let prevIdx = this.updateSlideIdx('prev', page, totalItems);

      prevBtnTpl = /*html*/`<button class="c-controls__prev js-control-btn${model.typeClass}" data-type="prev" data-item="${prevIdx}">
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

      nextBtnTpl = /*html*/`<button class="c-controls__next js-control-btn${model.typeClass}" data-type="next" data-item="${nextIdx}">
        ${model.showIcons ? /*html*/`<i class="fa fa-chevron-right"></i>` : ''}
        ${model.showLabel ? model.nextLabel : ''}
      </button>`;
    }

    return /*html*/`<div class="c-controls__wrapper col">
      ${prevBtnTpl}<div class="c-controls__paginator${model.typeClass}">
        <ul class="c-controls__pagilist${model.typeClass}">${paginatorTpl}</ul>
      </div>${nextBtnTpl}
    </div>`;
  },

  pagiTemplate(i, page) {
    let isActive = i  === page ? ' is--active' : '';

    return /*html*/`<li class="c-controls__pagibtn js-control-btn${isActive}" role="button" data-item="${i}" tabindex="0">
      ${(i)}
    </li>`;
  }
});

export default ControlsComponent;