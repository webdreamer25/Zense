import { Component } from '../../zense/index';

const LogoComponent = Object.create(Component);

LogoComponent.create({
  name: 'logo',
  selector: '#header-logo',

  serializeData() {
    return 'Zense'
  },

  template(companyName) {
    return `<div class="navbar-brand"> ${companyName} </div>`;
  }
});

export default LogoComponent;