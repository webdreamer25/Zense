require(
  [
    'modules/header.module',
    'modules/footer.module',
    'underscore'
  ],
  function (HeaderModule, FooterModule) {
    HeaderModule.render();
    FooterModule.render();

    // const AppErrorHandler = Object.create(Zense.ErrorHandler);

    // AppErrorHandler.template = function (error) {
    //   let tplWarning = '';

    //   if (error.warning) {
    //     tplWarning = '<div>Warning: ${error.warning}</div>';
    //   }

    //   return `
    //     <div class="${this.ui.container.slice(1)}">
    //       <span class="${this.ui.tab} ${this.trigger}">Error</span>
    //       <ul class="${this.ui.target.slice(1)}">
    //       <li>
    //         <div>Component Name: ${error.component}</div>
    //         <div>Description: ${error.description}</div>
    //         ${tplWarning}
    //       </li>
    //       </ul>
    //     </div>
    //   `;
    // };

    // AppErrorHandler.start();
  });
  