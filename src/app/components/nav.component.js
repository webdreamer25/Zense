import { Zense } from '../../../zense';

const NavComponent = Object.create(Zense.Component);

NavComponent.create({
  name: 'nav-component',
  selector: '#nav-region',

  serializeData() {
    return [
      {
        label: 'Dashboard',
        route: '/dashboard'
      },
      {
        label: 'Results',
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