import Behavior from '../../zense/behavior';

const FormBehavior = Object.create(Behavior);

FormBehavior.config({
  ui: {
    submitBtn: '.js-submit-form-btn',
    fields: '.js-field'
  },

  serializeFormFields: function () {
    let fieldData = {};

    this.ui.fields.each(function (el) {
      fieldData[el.name] = el.value;
    });

    return fieldData;
  },

  submitForm: function (e) {
    e.preventDefault();
    let payload = this.serializeFormFields();

    this.handleFormSubmit(payload);
  },

  handleFormSubmit: function (payload) {
    console.log(payload);
    this.ajax({
      url: 'https://5bfafb95a6af660013f1a105.mockapi.io/api/v1/comments',
      method: 'POST',
      headers: [
        { 
          name: 'Content-Type',
          value: 'application/json'
        }
      ],
      data: JSON.stringify(payload),
      success: function(e, xhr)  {
        console.log(e, xhr);
      }
    })
  },

  setHandlers: function () {
    this.ui.submitBtn.on('click', this.submitForm.bind(this));
  },

  start: function () {
    this.setHandlers();
  }
});

export default FormBehavior;