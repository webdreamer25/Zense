import Traverse from './traverse';
import XHR from './xhr';
import Eventor from './eventor';
import { createUniqueId, bindUIElements } from './functions';

const App = Object.create(Traverse);

App.xhr = Object.create(XHR);
App.events = Object.create(Eventor);
App.customUtilities = null;
App.util = {
  createUniqueId,
  bindUIElements
};

App.create = function (options) {
  Object.assign(this, options);
};

App.setUtilityMethods = function (methodsObj) {
  try {
    if (typeof methodsObj !== 'object') {
      throw {
        type: 'type error',
        name: 'App.customUtilities',
        message: 'Property shhould be type OBJECT.'
      }
    }

    this.util = Object.assign(this.util, methodsObj);
  } catch (err) {
    console.error(err);
  }
};

App.afterStart = function () {
  return null;
};

App.start = function () {
  // Ensures we overwrite util object with our own utility methods.
  this.setUtilityMethods(this.customUtilities);
  
  this.initStorage();
  this.afterStart();
};

export default App;