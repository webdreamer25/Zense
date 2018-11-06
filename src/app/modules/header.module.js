const LogoComponent = require('../components/logo.component');
const NavigationComponent = require('../components/navigation.component');

const HeaderModule = Object.create(zense.Module);

module.export = (function () {
  HeaderModule.create({
    selector: '#header-region',
    components: [
      LogoComponent,
      NavigationComponent
    ],

    template: function () {
      return `
        <div id="header-logo"></div>
        <nav id="navigation"></nav>
      `;
    },

    initialize: function () {
      this.api.model = {
        name: 'Thor'
      }
    }
  });

  return HeaderModule;
})();