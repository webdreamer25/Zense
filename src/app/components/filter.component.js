import { Component } from '../../zense/index';
import ModalBehavior from '../behaviors/modal.behavior';
import AccordionBehavior from '../behaviors/accordion.behavior';
import FilterBehavior from '../behaviors/filter.behavior';

const FilterComponent = Object.create(Component);

FilterComponent.create({
  name: 'filter',
  selector: '#filter-region',
  behaviors: [
    ModalBehavior,
    AccordionBehavior,
    FilterBehavior
  ],

  serializeData() {
    return ['ford', 'toyota', 'mazda', 'mitsubishi', 'honda', 'chevrolet', 'kia', 'honda']
  },

  template(data) {
    return `
      <div class="consultant-hub-filter row justify-content-center">
        <div class="col-auto">
          <button class="btn btn-primary btn-sm js-toggle" data-modal="#filter-modal">
            Filter Consultant List
          </button>
        </div>

        <div id="filter-modal" 
          class="modal modal--backdrop fade" 
          tabindex="-1" 
          role="dialog" 
          aria-hidden="true">

          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Filter by</h5>
                <button type="button" class="close js-modal-close-btn" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body">
                <ul class="accordion">
                  <li>
                    <button class="accordion-header js-accordion-toggle" data-collapsed="true">Search</button>
                    <div class="accordion-drawer collapse">
                      <div class="accordion-drawer-content">
                        <div class="from-group">
                          <label for="filter-search" class="visibility-hidden">Search</label>
                          <input id="filter-search" type="search" name="filterSearch" class="search form-control js-filter-search" />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <button class="accordion-header js-accordion-toggle" data-collapsed="true">Make</button>
                    <div class="accordion-drawer collapse">
                      <div class="accordion-drawer-content">
                        ${data.map(make => {
                          return `<div class="from-group form-check-inline">
                            <input type="checkbox" name="${make}" class="form-check-input js-filter-field" />
                            <label class="form-check-label">${make}</label>
                          </div>`
                        }).join('')}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary js-modal-close-btn" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary js-apply-filters-btn" disabled="true">Apply Filters</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }
});

export default FilterComponent;