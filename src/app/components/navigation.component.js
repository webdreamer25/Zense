import Component from '../../zense/component';

const NavigationComponent = Object.create(Component);

NavigationComponent.create({
  selector: '#navigation',

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

export default NavigationComponent;