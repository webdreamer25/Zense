const InternalErrorHandler = (function () {
  // ERROR HANDLER
  const ErrorHandler = Object.create(Renderer);

  ErrorHandler.index = 0;

  ErrorHandler.initialize = function (options) {
    let defaults = {
      selector: 'body',
      trigger: '.js-errors-toggle',
      ui: {
        container: '.errors',
        target: '.errors-list',
        tab: '.errors-tab'
      }
    };

    Object.assign(this, defaults, options);

    for (let i = 0; i < Internal.errors.length; i++) {
      let error = Internal.errors[i];

      document.querySelector(error.selector).style.border = '1px solid red';

      this.index = i;
      this.selector = error.selector;

      this.render();

    };
  };

  ErrorHandler.serializeData = function () {
    return Internal.errors[this.index];
  };

  ErrorHandler.start = function () {
    if ((Internal.errors === 0 || Config.env !== 'dev')) { return null; }

    this.initialize();
  };

  return ErrorHandler;
})();

export default InternalErrorHandler;