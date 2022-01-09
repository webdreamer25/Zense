import { Zense } from '../../zense';
import DashboardComposite from './composites/dashboard.composite';

const AppStorage = Object.create(Zense.Storage);

AppStorage.config({
  storeName: 'test',
  storage: true,
  keysToStore: [
    'currPageNum'
  ]
})

AppStorage.set({
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
  afterStart() {
    DashboardComposite.render();
  }
})

App.start()
