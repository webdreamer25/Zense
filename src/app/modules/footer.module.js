define(function (require) {
  const FooterModule = Object.create(Zense.Module);

  const FormComponent = require('components/form.component');

  FooterModule.create({
    name: 'footer',
    selector: '#app',
    components: [
      FormComponent
    ],
    
    template: function () {
      return '<footer id="footer-region">Test footer module</footer>'
    }
  });

  return FooterModule;
});