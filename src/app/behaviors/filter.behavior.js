import { Behavior } from '../../zense/index';

const FilterBehavior = Object.create(Behavior);

FilterBehavior.config({
  behaviorName: 'filter',
  selectedFilters: [],
  appliedFilters: [],
  ui: {
    fields: '.js-filter-field',
    applyBtn: '.js-apply-filters-btn'
  },

  setHandlers() {
    this.ui.applyBtn.on('click', this.applyFilters.bind(this));
    this.ui.fields.on('change', this.onFieldChange.bind(this));
  },

  applyFilters(e) {
    let btn = e.currentTarget;

    this.serializeFilterFields();

    
    if (this.selectedFilters.length > 0) {
      this.appliedFilters = this.selectedFilters;
      this.selectedFilters = [];

      this.ui.applyBtn.setAttribute('disabled', true);

      document.querySelector('.js-modal-close-btn').click();
    }
  },

  onFieldChange(e) {
    let field = e.currentTarget;

    if (field.value !== '' || field.checked === true) {
      this.ui.applyBtn.setAttribute('disabled', false);
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

    if (this.selectedFilters.length > 0) {
      this.selectedFilters = this.uniqueArray(this.selectedFilters);
    }
  },

  start() {
    this.setHandlers();
  }
});

export default FilterBehavior;