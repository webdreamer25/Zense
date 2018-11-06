const HeaderModule = require('./modules/header.module');
const FooterModule = require('./modules/footer.module');

const App = Object.create(zense.Composite);

// module.export = (function () {
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

//   return App;
// })();