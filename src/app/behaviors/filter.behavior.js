import { Behavior } from '../../zense/index';

const FilterBehavior = Object.create(Behavior);

FilterBehavior.config({
  behaviorName: 'filter',
  searchTerm: '',
  selectedFilters: [],
  appliedFilters: {},
  hasChanged: false,
  ui: {
    search: '.js-filter-search',
    fields: '.js-filter-field',
    applyBtn: '.js-apply-filters-btn'
  },

  setHandlers() {
    this.ui.applyBtn.on('click', this.onApplyFilters.bind(this));
    this.ui.fields.on('change', this.onSelectFilters.bind(this));
  },

  onApplyFilters(e) {
    let btn = e.currentTarget;

    if ((this.selectedFilters.length > 0 || this.searchTerm !== '')) {
      this.appliedFilters.search = this.searchTerm;
      this.appliedFilters.filters = this.selectedFilters;

      // this.setFilterChanged();
      this.resetForm();

      document.querySelector('.js-modal-close-btn').click();
    }console.log(this.appliedFilters);
  },

  onSelectFilters(e) {
    let field = e.currentTarget;
    let arr = this.selectedFilters;

    if (field.checked && !arr.includes(field.name)) {
      arr.push(field.name);
    } else {
      // remove a checked filter
      if (arr.includes(field.name)) {
        this.selectedFilters = arr.filter((name) => name !== field.name);
      }
    }

    if ((this.selectedFilters.length > 0 || this.searchTerm !== '') && this.ui.applyBtn.hasAttribute('disabled')) {
      this.ui.applyBtn.removeAttribute('disabled');
    } else if (this.selectedFilters.length === 0 && this.searchTerm === '') {
      this.ui.applyBtn.attr('disabled', true);
    }
  },

  setFilterChanged() {
    // We need to ensure control whether or not new filters have been applied.
    for (let i = 0; this.selectedFilters.length; i++) {
      let filter = this.selectedFilters[i];

      if (this.appliedFilters.filters.includes(filter)) {
        this.hasChanged = false;
      } else {
        this.hasChanged = true;
      }
    }
  },

  resetForm() {
    this.searchTerm = '';
    this.selectedFilters = [];

    // if (this.selectedFilters.length < 1) {
    //   this.ui.fields.attr('checked', false);
    // }

    this.ui.applyBtn.attr('disabled', true);
  },

  start() {
    this.setHandlers();
  }
});

export default FilterBehavior;