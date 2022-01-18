import App from './core/app';

const Behavior = Object.create(App);

Behavior.id = '';
Behavior.ui = {};
Behavior.name = '';
Behavior.strUI = {};
Behavior.type = 'behavior';
Behavior.bindUI = true;
Behavior.customized = false;
Behavior.shouldStart = true;
Behavior.setStringUIValues = true;

Behavior.config = function (options) {
  Object.assign(this, options);

  // Need to keep a string 
  if (this.setStringUIValues) {

    // We create a symbol to prevent Object.assign from overwritting this.strUI values assigned using this.ui
    let symbolUIKeyName = Symbol('stringUISelectors');

    this.strUI[symbolUIKeyName] = {};

    for (let key in this.ui) {
      if (this.ui.hasOwnProperty(key)) {
        this.strUI[symbolUIKeyName][key] = this.ui[key];
      }
    }

    // Alias reference directly onto the this.strUI prop
    this.strUI = this.strUI[symbolUIKeyName];

    this.setStringUIValues = false;
  }

  try {
    if (this.name === '') {
      throw {
        type: 'Behavior',
        message: 'Behavior name has not been declared'
      }
    } else {
      // Gives our name property a suffix.
      if (this.name.indexOf('-behavior') === -1) {
        this.name += '-behavior';
      }
    }
  } catch (e) {
    console.error(e);
  }
}

Behavior.setUniqueIdAndName = function (parentName) {
  let name = '';

  this.id = new Date().getTime();

  if (parentName) {

    // Ensures we dont attribute 2 different parents to the same behavior.
    if (this.name.indexOf('__') > -1) {
      this.name = this.name.split('__')[0];
    }

    name = '__' + parentName;
  }

  this.name = this.name + name;
}

Behavior.unbindUIElements = function () {
  for (let key in this.ui) {

    // Needed to prevent type error not a function when no element doesnt have registered listener.
    if (this.ui.hasOwnProperty(key) && this.ui[key].info !== undefined) {
      this.ui[key].off();
      this.ui[key] = this.strUI[key];
    }
    
  }
}

Behavior.start = function () {
  this.util.bindUIElements(this)
}

export default Behavior;