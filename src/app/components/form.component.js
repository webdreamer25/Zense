import { Component } from '../../zense/index';
import FormBehavior from '../behaviors/form.behavior';

const FormComponent = Object.create(Component);

FormComponent.create({
  name: 'footer-form',
  selector: '#footer-region',
  behaviors: [
    { name: FormBehavior, overwrites: null }
  ],

  template() {
    return `
      <div>
        <label for="commentName">Name</label>
        <input id="commentName" type="text" name="name" class="js-field" />
        <button type="submit" class="js-submit-form-btn">Save</button>
      </div>
    `;
  }
});

export default FormComponent;