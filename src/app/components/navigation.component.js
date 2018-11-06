const NavigationComponent = Object.create(zense.Component);

module.export = (function () {
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

  return NavigationComponent;
})();