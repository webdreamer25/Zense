define(function (require) {
  const FooterModule = Object.create(Zense.Module);

  FooterModule.create({
    name: 'footer',
    selector: '#app',
    
    template: function () {
      return '<footer>Test footer module</footer>'
    }
  });

  return FooterModule;
});