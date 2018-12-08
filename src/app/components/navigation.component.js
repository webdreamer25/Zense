import { Component } from '../../zense/index';

const NavigationComponent = Object.create(Component);

NavigationComponent.create({
  name: 'navigation',
  selector: '#navigation',

  template(data) {
    return `
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <a href="#" class="nav-link active">
            ${data.link1}
          </a>
        </li>
        <li>
          <a href="#" class="nav-link">
            ${data.link2}
          </a>
        </li>
        <li>
          <a href="#" class="nav-link">
            ${data.link2}
          </a>
        </li>
      </ul>
    `;
  }
});

export default NavigationComponent;