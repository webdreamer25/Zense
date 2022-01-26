import { Zense } from '../../../zense';

const NavComponent = Object.create(Zense.Component);

NavComponent.create({
  name: 'nav-component',

  serializeData() {
    return [
      {
        label: 'home',
        route: '/home'
      },
      {
        label: 'develop',
        route: '/develop'
      },
      {
        label: 'results',
        route: '/results'
      }
    ]
  },

  template(links) {
    return /*html*/`<nav class="row">
      ${links.map(link => {
        return /*html*/`<div class="col-auto"><a href="#${link.route}">${link.label}</a></div>`;
      }).join('')}
    </nav>`;
  }
})

export default NavComponent;