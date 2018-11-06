const LogoComponent = Object.create(zense.Component);

module.export = (function () {
  LogoComponent.create({
    name: 'header-logo-component',
    selector: '#header-logo',

    initialize: function () {
      this.api.model = { 
        companyName: 'Zense'
      };
    },

    template: function (data) {
      return `<div> ${data.model.companyName} </div>`;
    }
  });

  return LogoComponent;
})();