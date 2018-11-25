define(function(require) {
  const ModalBehavior = Object.create(Zense.Behavior);

  ModalBehavior.config({
    trigger: '.js-toggle',

    start: function () {
      console.log(this);
    }
  });

  return ModalBehavior;
});