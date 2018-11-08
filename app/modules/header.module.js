define(function (require) {
  const HeaderModule = Object.create(Zense.Module);

  const LogoComponent = require('components/logo.component');
  const NavigationComponent = require('components/navigation.component');

  HeaderModule.create({
    name: 'header-module',
    selector: '#header-region',
    components: [
      LogoComponent,
      NavigationComponent
    ]

    // template: function () {
    //   return `
    //     <div id="header-logo"></div>
    //     <nav id="navigation"></nav>
    //   `;
    // }
  });

  return HeaderModule;
});