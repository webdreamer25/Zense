define(function (require) {
  const NavigationComponent = Object.create(Zense.Component);

  NavigationComponent.create({
    name: 'navigationComponent',
    selector: '#navigation',

    template: function (data) {
      return `
        <ul>
          <li> ${data.link1} </li>
          <li> ${data.link2} </li>
          <li> ${data.link3} </li>
        </ul>
      `;
    },

    serializeData: function () {
      return {
        link1: 'home',
        link2: 'about',
        link3: 'contact'
      }
    }
  });

  return NavigationComponent;
});