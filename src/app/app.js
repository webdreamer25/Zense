
const LogoComponent = Object.create(zense.Component);

LogoComponent.create({
  name: 'header-logo-component',
  selector: '#header-logo',

  initialize: function () {
    this.api.model = { 
      companyName: 'Zense'
    };
  },

  
});
// template: function (data) {
  //   return `<div> ${data.model.companyName} </div>`;
  // }

const NavigationComponent = Object.create(zense.Component);

NavigationComponent.create({
  name: 'navigationComponent',
  selector: '#navigation',

  initialize: function () {
    this.api.model = {
      link1: 'home',
      link2: 'about',
      link3: 'contact'
    };
  },

  template: function (data) {
    let model = data.model;

    return `
      <ul>
        <li> ${model.link1} </li>
        <li> ${model.link2} </li>
        <li> ${model.link3} </li>
      </ul>
    `;
  }
});

const HeaderModule = Object.create(zense.Module);

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
  }
});

const FooterLogo = Object.create(LogoComponent);

FooterLogo.selector = '#footer-logo';

const FooterModule = Object.create(zense.Module);

FooterModule.create({
  selector: '#footer-region',
  components: [ FooterLogo ],
  
  template: function () {
    return '<div id="footer-logo"></div>';
  }
});

// Composite is a page view
const App = Object.create(zense.Composite);

App.create({
  selector: '#app',
  modules: [
    HeaderModule,
    FooterModule
  ],

  template: function () {
    return `
      <div id="header-region"></div>
      <div id="footer-region"></div>
    `;
  }
});

const AppErrorHandler = Object.create(zense.ErrorHandler);

AppErrorHandler.template = function (errors) {
  let listTemplate = '';

  for (let i = 0; i < errors.length; i++) {
    let error = errors[i];

    listTemplate = `
      <li>
        <div>Component Name: ${error.component}</div>
        <div>Description: ${error.description}</div>
      </li>
    `;
  };

  return `
    <div class="${this.ui.container.slice(1)}">
      <ul class="${this.ui.target.slice(1)}">
        ${listTemplate}
      </ul>
    </div>
  `;
};

AppErrorHandler.start();