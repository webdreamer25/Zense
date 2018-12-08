import { Component } from '../../zense/index';
import ModalBehavior from '../behaviors/modal.behavior';
import AccordionBehavior from '../behaviors/accordion.behavior';
import FilterBehavior from '../behaviors/filter.behavior';

import StorageExtender from '../extenders/storage.extender';

const FilterComponent = Object.create(Component);

FilterComponent.create({
  name: 'filter',
  selector: '#filter-region',
  behaviors: [
    ModalBehavior,
    AccordionBehavior,
    { 
      name: FilterBehavior, 
      options: StorageExtender
    }
  ],

  serializeData() {
    return ['ford', 'toyota', 'mazda', 'mitsubishi', 'honda', 'chevrolet', 'kia']
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
          class="modal-2" 
          tabindex="-1" 
          role="dialog" 
          aria-hidden="true">

          <div class="container" role="document">
            <div class="model-2-top row justify-content-end">
              <div class="col-auto">
                <button type="button" class="close-btn js-modal-close-btn" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><i class="fas fa-times"></i></span>
                </button>
              </div>
            </div>
            <div class="modal-2-content row">
              <div class="modal-2-header col-auto">
                <h5 class="modal-2-title" id="exampleModalLongTitle">Filter by:</h5>
              </div>

              <div class="modal-2-body col-md-9">
                <ul class="accordion">
                  <li>
                    <button class="accordion-header js-accordion-toggle" data-collapsed="true">
                      <i class="fas fa-chevron-down"></i>
                      Search
                    </button>
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
                    <button class="accordion-header js-accordion-toggle" data-collapsed="true">
                      <i class="fas fa-chevron-down"></i>
                      Make
                    </button>
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

                <div class="modal-2-footer row justify-content-center">
                  <div class="col-auto">
                    <button type="button" class="btn btn-secondary js-clear-filters-btn" data-dismiss="modal">Clear Filters</button>
                    <button type="button" class="btn btn-primary js-apply-filters-btn" disabled="true">Apply Filters</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }
});

export default FilterComponent;