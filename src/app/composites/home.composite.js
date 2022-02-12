import { Zense } from '../../../zense';
import HeaderModule from '../modules/header.module';
import HeroModule from '../modules/hero.module';

const HomeComposite = Object.create(Zense.Composite);

HomeComposite.create({
  name: 'home-page',
  selector: '#app',

  modules: [
    HeaderModule,
    HeroModule
  ],

  template() {
    return /*html*/`<header-module class="container"></header-module>
    <hero-module class="container"></hero-module>
    <div id="top-region" class="container"></div>`;
  }
})

export default HomeComposite;