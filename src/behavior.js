import Traverse from './core/traverse';

const Behavior = Object.create(Traverse);

Behavior.id = '';
Behavior.ui = {};
Behavior.strUI = {};
Behavior.behaviorName = '';
Behavior.customized = false;
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
    if (this.behaviorName === '') {
      throw {
        type: 'Behavior',
        message: 'Behavior name has not been declared'
      }
    } else {
      // Gives our behaviorName property a suffix.
      if (this.behaviorName.indexOf('-behavior') === -1) {
        this.behaviorName += '-behavior';
      }
    }
  } catch (e) {
    console.error(e);
  }
};

Behavior.setUniqueIdAndName = function (parentName) {
  let name = '';

  this.id = new Date().getTime();

  if (parentName) {

    // Ensures we dont attribute 2 different parents to the same behavior.
    if (this.behaviorName.indexOf('__') > -1) {
      this.behaviorName = this.behaviorName.split('__')[0];
    }

    name = '__' + parentName;
  }

  this.behaviorName = this.behaviorName + name;
};

Behavior.bindUIElements = function () {
  if (!this.ui) { return false; }

  for (let key in this.ui) {
    let uiElement = this.ui[key];

    // Ensures that even if we pass the class as key we re-get the dom node.
    if (typeof this.ui[key] === 'string' || typeof this.ui[key] === 'object' && key.indexOf('.') === -1) {

      // Neccessary for re-binding of events on later rendered elements referenced by this.ui object.
      if (typeof this.ui[key] === 'string' && this.ui[key] !== this.strUI[key]) {
        this.strUI[key] = this.ui[key];
      }

      // Needed to ensure ui dom elements are rebound
      if ((this.customized || typeof uiElement !== 'string')) {
        uiElement = this.strUI[key];
      }

      let selector;

      if (this.component || this.module) {
        if (this.component) {
          selector = this.component.selector;
        } else if (this.module) {
          selector = this.module.selector;
        } 

        // Ensure we only do a find to single node returns from this.dom();
        if (!this.module.selector.length) {
          this.ui[key] = selector.find(uiElement);
        } else {
          this.ui[key] = selector;
        }
        
      } else {
        this.ui[key] = this.dom(uiElement);
      }
    } else {
      this.ui[key]['selector'] = this.bindEventListeners(key, this.ui[key], this);
    }
  }
};

Behavior.bindEventListeners = function (delegate, selectorObj, context) {
  let selector;
  
  try {
    if (this.component === undefined && this.module === undefined) {
      throw {
        type: this.behaviorName,
        message: 'Behavior has no parent declared since it was started on its own.'
      }
    } else {

      // Ensure we have a parent selector if none is specified
      if (!selectorObj.parent) {
        if (this.component) {
          selector = this.component.selector;
        } else if (this.module) {
          selector = this.module.selector;
        }
      } else {

        // Allows for functional returns of parent objects under the right context.
        if (typeof selectorObj.parent === 'function') {
          selector = this.dom(selectorObj.parent(this));
        } else {
          selector = this.dom(selectorObj.parent);
        }

      }

      // Ensure that we are not rebinding the same event on re-rendering of a component.
      selector.off();

      // We pass in event, delegate, handler, context which is our behavior.
      selector.on(selectorObj.event, delegate, this[selectorObj.method], context);

    }

    return selector.find(delegate);
  } catch (err) {
    console.error(err);
  }
};

Behavior.unbindUIElements = function () {
  for (let key in this.ui) {

    // Needed to prevent type error not a function when no element doesnt have registered listener.
    if (this.ui.hasOwnProperty(key) && this.ui[key].info !== undefined) {
      this.ui[key].off();
      this.ui[key] = this.strUI[key];
    }
    
  }
};

Behavior.start = function () {
  this.bindUIElements();
};

export default Behavior;