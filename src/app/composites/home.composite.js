import { Zense } from '../../../zense';
import HeaderModule from '../modules/header.module';
import HeroModule from '../modules/hero.module';

const HomeComposite = Object.create(Zense.Composite);

HomeComposite.create({
  name: 'home-page',
  selector: '#app',
  renderType: 'html',

  modules: [
    HeaderModule,
    HeroModule
  ],

  template() {
    return /*html*/`<header id="header-region" class="container"></header>
    <div id="hero-region" class="container"></div>
    <div id="top-region" class="container"></div>`;
  }
})

export default HomeComposite;