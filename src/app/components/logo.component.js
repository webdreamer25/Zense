define(function (require) {
  const LogoComponent = Object.create(Zense.Component);

  LogoComponent.create({
    name: 'header-logo-component',
    selector: '#header-logo',
    api: {
      method: 'GET',
      url: '../../mocks/test.json'
    },

    template: function (data) {
      return `<div> ${data.companyName} </div>`;
    }
  });

  return LogoComponent;
});