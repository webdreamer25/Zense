import { Zense } from '../../zense';
import DevelopComposite from './composites/develop.composite';
import HomeComposite from './composites/home.composite';
import ResultsComposite from './composites/results.composite';
import Util from './util';

const AppStorage = Object.create(Zense.Storage);

AppStorage.config({
  storeName: 'test',
  storage: true,
  keysToStore: [
    'currPageNum'
  ]
})

AppStorage.set({
  baseJSONPath: '/json/',
  cars: [
    {
      make: 'mitsubishi',
      model: 'eclipse',
      year: '2013'
    },
    {
      make: 'mitsubishi',
      model: 'eclipse',
      year: '2014'
    },
    {
      make: 'honda',
      model: 'accord',
      year: '2020'
    },
    {
      make: 'mitsubishi',
      model: 'eclipse',
      year: '2016'
    },
    {
      make: 'mitsubishi',
      model: 'lancer',
      year: '2017'
    },
    {
      make: 'mitsubishi',
      model: 'galant',
      year: '2013'
    },
    {
      make: 'ford',
      model: 'f150',
      year: '2016'
    },
    {
      make: 'mitsubishi',
      model: 'evo',
      year: '2013'
    },
    {
      make: 'honda',
      model: 'civic',
      year: '2020'
    },
    {
      make: 'honda',
      model: 'civic',
      year: '2018'
    },
    {
      make: 'honda',
      model: 'accord',
      year: '2018'
    },
    {
      make: 'ford',
      model: 'focus',
      year: '2012'
    },
    {
      make: 'jeep',
      model: 'grand cherokee',
      year: '2020'
    }
  ]
})

const App = Object.create(Zense.App);

App.create({
  customUtilities: Util,
  
  afterStart() {
    this.route();

    window.addEventListener('hashchange', this.route.bind(this));
  },

  route() {
    let hash = window.location.hash;
    let module;

    hash = hash.replace(/#\//, '');

    switch(hash) {
      case 'develop':
        module = DevelopComposite;

        break;
      case 'results':
        module = ResultsComposite;

        break;
      default:
        module = HomeComposite;
    }

    module.render();
  }
})

App.start()
