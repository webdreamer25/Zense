define(function (require) {
  const FormComponent = Object.create(Zense.Component);

  const FormBehavior = require('behaviors/form.behavior');

  FormComponent.create({
    name: 'footer-form',
    selector: '#footer-region',
    behaviors: [
      { name: FormBehavior, overwrites: null }
    ],

    template: function (data) {
      return `
        <div>
          <label for="commentName">Name</label>
          <input id="commentName" type="text" name="name" class="js-field" />
          <button type="submit" class="js-submit-form-btn">Save</button>
        </div>
      `;
    }
  });

  return FormComponent;
});