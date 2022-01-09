import Traverse from './traverse';
import XHR from './xhr';
import Eventor from './eventor';
import { createUniqueId } from './dom';

const App = Object.create(Traverse);

App.xhr = Object.create(XHR);
App.events = Object.create(Eventor);
App.customUtilities = null;
App.util = {
  createUniqueId
};

App.create = function (options) {
  Object.assign(this, options);
};

App.setUtilityMethods = function (methodsObj) {
  this.util = Object.assign(this.util, methodsObj);
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