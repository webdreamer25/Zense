define(function (require) {
  const NavigationComponent = Object.create(Zense.Component);

  NavigationComponent.create({
    selector: '#navigation',
    api: {
      method: 'GET',
      url: '../../mocks/nav.json'
    },

    template: function (data) {
      return `
        <ul>
          <li> ${data.link1} </li>
          <li> ${data.link2} </li>
          <li> ${data.link3} </li>
        </ul>
      `;
    }
  });
  
  return NavigationComponent;
});