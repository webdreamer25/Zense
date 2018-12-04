import { Behavior } from '../../zense/index';

const FilterBehavior = Object.create(Behavior);

FilterBehavior.config({
  behaviorName: 'filter',
  searchTerm: null,
  selectedFilters: [],
  appliedFilters: [],
  hasChanged: false,
  ui: {
    search: '.js-filter-search',
    fields: '.js-filter-field',
    applyBtn: '.js-apply-filters-btn'
  },

  setHandlers() {
    this.ui.applyBtn.on('click', this.onApplyFilters.bind(this));
    this.ui.fields.on('change', this.onSelectFilters.bind(this));
    this.ui.search.on('keyup', this.onSearch.bind(this));
  },

  onApplyFilters(e) {
    if (this.searchTerm !== null) {
      this.selectedFilters.push(this.searchTerm);
    }

    this.appliedFilters = this.parent.store.filter(item => {
      return this.selectedFilters.indexOf(item.make) >= 0;
    });

    if (this.selectedFilters.length > 0 && this.appliedFilters.length === 0) {
      this.appliedFilters = 'not found';
    }

    let filtered = new CustomEvent('filtered', { detail: this.appliedFilters });

    this.ui.applyBtn.attr('disabled', true);

    document.querySelector('.js-modal-close-btn').click();
    document.dispatchEvent(filtered);

    // Ensures continued functionality of filtering.
    this.appliedFilters = [];
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

    this.enableApplyButton();
  },

  onSearch(e) {
    let search = e.currentTarget;

    this.searchTerm = search.value;
    this.selectedFilters = this.appliedFilters.filter((item) => item !== this.searchTerm);

    if (search.value === '') {
      this.searchTerm = null;
    }

    this.enableApplyButton();
  },

  enableApplyButton() {
    if (this.ui.applyBtn.hasAttribute('disabled')) {
      this.ui.applyBtn.removeAttribute('disabled');
    } 
  },

  start() {
    this.setHandlers();
  }
});

export default FilterBehavior;