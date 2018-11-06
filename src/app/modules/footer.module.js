const FooterLogo = require('../components/logo.component');

const FooterModule = Object.create(zense.Module);

module.export = (function () {
  FooterModule.create({
    selector: '#footer',
    components: [ FooterLogo ],
    
    template: function () {
      return '<div id="footer-logo"></div>';
    }
  });

  return FooterModule;
})();