import { Zense } from '../../../zense';
import DragBehavior from '../behaviors/drag.behavior';

const LayoutModule = Object.create(Zense.Module);

LayoutModule.create({
  name: 'layout-module',

  selector: '#layout-region',

  behaviors: [
    DragBehavior
  ],

  serializeData() {
    return {
      items: [
        'item 1',
        'item 2',
        'item 3',
        'item 4'
      ]
    };
  },

  template(model) {
    return /*html*/`<div class="container">
      <div class="row">
        <div class="col">
          <div class="m-layout">
            <div class="m-layout__items b-draggable">
              ${model.items.map((item) => {
                return /*html*/`<div class="m-layout__item b-draggable__item js-draggable-item">${item}</div>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
});

export default LayoutModule;