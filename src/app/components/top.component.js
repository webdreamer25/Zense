import { Zense } from '../../../zense';

const TopComponent = Object.create(Zense.Component);

TopComponent.create({
  name: 'top-component',
  selector: '#top-region',

  default: {
    heading: 'Some heading'
  },

  serializeData() {
    return this.default;
  },

  template(model) {
    return /*html*/`<div class="container">
      <div class="row">
        <div class="col-auto">
          <h2>${model.heading}</h2>
        </div>
      </div>
    </div>`;
  }
})

export default TopComponent;