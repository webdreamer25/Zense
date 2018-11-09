define(function (require) {
  const LogoComponent = Object.create(Zense.Component);

  LogoComponent.create({
    name: 'header-logo-component',
    selector: '#header-logo',

    template: function (data) {
      return `<div> ${data.companyName} </div>`;
    },

    serializeData: function () {
      let data = {
        companyName: 'Zense'
      };

      return data;
    }
  });

  return LogoComponent;
});