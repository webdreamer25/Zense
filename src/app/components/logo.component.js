import { Component } from '../../zense/index';

const LogoComponent = Object.create(Component);

LogoComponent.create({
  name: 'logo',
  selector: '#header-logo',

  serializeData(data) {
    return data.companyName;
  },

  template(companyName) {
    return `<div class="navbar-brand"> ${companyName} </div>`;
  }
});

export default LogoComponent;