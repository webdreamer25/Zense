import { Component } from '../../zense/index';

const LogoComponent = Object.create(Component);

LogoComponent.create({
  name: 'logo',
  selector: '#header-logo',

  serializeData(data) {
    return data.companyName;
  },

  template(companyName) {
    return `<div> ${companyName} </div>`;
  }
});

export default LogoComponent;