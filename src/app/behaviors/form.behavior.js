define(function (require) {
  const FormBehavior = Object.create(Zense.Behavior);

  FormBehavior.config({
    trigger: '.js-submit-form-btn',
    fields: '.js-field',

    serializeFormFields: function () {
      let fieldData = {};

      this.dom(this.fields).each(function (el) {
        fieldData.name = el.name;
        fieldData.value = el.value;
      });

      return fieldData;
    },

    submitForm: function (e) {
      e.preventDefault();
      let payload = this.serializeFormFields();

      console.log(payload);
    },

    setHandlers: function () {
      this.dom(this.trigger).on('click', this.submitForm.bind(this));
    },

    start: function () {
      this.setHandlers();
    }
  });

  return FormBehavior;
})