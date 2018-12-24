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
    applyBtn: '.js-apply-filters-btn',
    clearBtn: '.js-clear-filters-btn'
  },

  initialize() {
    let stored = this.getStoredData('filters');

    if (Array.isArray(stored.applied)) {
      this.searchTerm = stored.search;

      this.ui.search.val(this.searchTerm);

      for (let i = 0; i < stored.applied.length; i++) {
        this.dom('[name="' + stored.applied[i].make + '"]').prop('checked', true);
      }

      this.appliedFilters = stored.applied;
    }
  },

  setHandlers() {
    this.ui.applyBtn.on('click', this.onApplyFilters.bind(this));
    this.ui.clearBtn.on('click', this.onClearFilters.bind(this));
    this.ui.fields.on('change', this.onSelectFilters.bind(this));
    this.ui.search.on('keyup', this.onSearch.bind(this));
  },

  onApplyFilters(e) {
    this.module.currentPage = 0;

    if (this.searchTerm !== null) {
      this.selectedFilters.push(this.searchTerm);
    }

    if (this.selectedFilters.length > 0) {
      this.appliedFilters = this.component.store.filter(item => {
        return this.selectedFilters.indexOf(item.make) >= 0;
      });
    }

    if (this.selectedFilters.length > 0 && this.appliedFilters.length === 0) {
      // this.appliedFilters = 'not found';
      this.module.showPaginator = false;
      this.removeStoredItem('filters');
    } else {
      this.module.showPaginator = true;
      // Handle session Storage
      this.storeData('filters', { search: this.searchTerm, applied: this.appliedFilters });
    }

    this.triggerRenderUpdate();

    // Ensures continued functionality of filtering.
    this.appliedFilters = [];
  },

  onClearFilters(e) {
    this.ui.search.val('');
    this.ui.fields.prop('checked', false);

    this.searchTerm = null;
    this.selectedFilters = [];
    this.appliedFilters = [];

    this.ui.applyBtn.prop('disabled', false);
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

  triggerRenderUpdate() {
    this.enableApplyButton();

    document.querySelector('.js-modal-close-btn').click();
    this.events.publish('filtered', this.appliedFilters, true);
  },

  enableApplyButton() {
    if (this.ui.applyBtn.hasAttribute('disabled')) {
      this.ui.applyBtn.removeAttribute('disabled');
    } 
  },

  start() {
    this.initialize();
    this.setHandlers();
  }
});

export default FilterBehavior;