import { Behavior } from '../../zense/index';

const FilterBehavior = Object.create(Behavior);

FilterBehavior.config({
  behaviorName: 'filter',
  ui: {
    fields: '.js-filter-field',
    applyBtn: '.js-apply-filters-btn'
  },

  selectedFilters: [],

  setHandlers() {
    this.ui.applyBtn.on('click', this.applyFilters.bind(this));
  },

  applyFilters(e) {
    let btn = e.currentTarget;
    let filters = this.serializeFilterFields();

    console.log(this.selectedFilters);
    if (this.selectedFilters.length > 0) {
      document.querySelector('.js-modal-close-btn').click();
    }
  },

  serializeFilterFields() {
    this.ui.fields.each((field) => {
      switch(field.type) {
        case 'search':
          if (field.value !== '') {
            this.selectedFilters.push(field.value);
          }

          break;
        default: 
          if (field.checked) {
            this.selectedFilters.push(field.name);
          }
      }
    });
  },

  start() {
    this.setHandlers();
  }
});

export default FilterBehavior;