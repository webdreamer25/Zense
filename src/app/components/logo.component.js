import Component from '../../zense/component';

const LogoComponent = Object.create(Component);

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

export default LogoComponent;