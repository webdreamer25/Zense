require(
  [
    'modules/header.module',
    'modules/main.module',
    'modules/footer.module',
    'underscore'
  ],
  function (HeaderModule, MainModule, FooterModule) {
    HeaderModule.render();
    MainModule.render();
    FooterModule.render();
  });
  