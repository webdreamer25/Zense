import { Zense } from '../../../zense';
import TopComponent from '../components/top.component';
import HeaderModule from '../modules/header.module';
import HeroModule from '../modules/hero.module';

const DashboardComposite = Object.create(Zense.Composite);

DashboardComposite.create({
  name: 'dashboard-composite',
  selector: '.main',
  renderType: 'html',

  modules: [
    HeaderModule,
    HeroModule,
    { 
      component: TopComponent, 
      options: {
        heading: 'Dashboard'
      }, 
      defaultOnly: true 
    }
  ],

  template() {
    return /*html*/`<div id="header-region"></div>
    <div id="hero-region"></div>
    <div id="top-region"></div>`;
  }
});

export default DashboardComposite;