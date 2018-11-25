define(function (require) {
  const LogoComponent = Object.create(Zense.Component);

  LogoComponent.create({
    name: 'logo',
    selector: '#header-logo',

    serializeData: function (data) {
      return data.companyName;
    },

    template: function (companyName) {
      return `<div> ${companyName} </div>`;
    }
  });

  return LogoComponent;
});