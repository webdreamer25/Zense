import App from './core/app';

const Behavior = Object.create(App);

Behavior.id = '';
Behavior.ui = {};
Behavior.name = '';
Behavior.strUI = {};
Behavior.type = 'behavior';
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

Behavior.bindUIElements = function () {
  if (!this.ui) { return false; }

  for (let key in this.ui) {
    let uiElement = this.ui[key];
    let isUIElementString = typeof uiElement === 'string';
    let isUIElementObject = typeof uiElement === 'object';

    // Ensures that even if we pass the class as key we re-get the dom node.
    if (isUIElementString || isUIElementObject && key.indexOf('.') === -1) {

      // Neccessary for re-binding of events on later rendered elements referenced by this.ui object.
      if (isUIElementString && uiElement !== this.strUI[key]) {
        this.strUI[key] = uiElement;
      }

      // Needed to ensure ui dom elements are rebound
      if ((this.customized || isUIElementString)) {
        uiElement = this.strUI[key];
      }

      if (this.super !== undefined) {
        const selector = this.super.selector;

        // Ensure we only do a find to single node returns from this.dom();
        if (selector !== undefined && uiElement !== undefined) {
          this.ui[key] = selector.find(uiElement);
        } else {
          this.ui[key] = selector;
        }
        
      } else {
        this.ui[key] = this.dom(uiElement);
      }
    } else {
      this.ui[key]['selector'] = this.bindEventListeners({ 
        delegate: key, uiSelectorObj: this.ui[key], context: this 
      });
    }
  }
}

Behavior.bindEventListeners = function (options) {
  const { delegate, uiSelectorObj, context } = options;
  
  try {
    let selector;

    if (this.super === undefined) {
      throw {
        type: this.name,
        message: 'Behavior has no parent declared since it was started on its own.'
      }
    } else {

      // Ensure we have a parent selector if none is specified
      if (!uiSelectorObj.parent) {
        selector = this.super.selector;
      } else {

        // Allows for functional returns of parent objects under the right context.
        if (typeof uiSelectorObj.parent === 'function') {
          selector = this.dom(uiSelectorObj.parent(this));
        } else {
          selector = this.dom(uiSelectorObj.parent);
        }

      }

      // Ensure that we are not rebinding the same event on re-rendering of a component.
      if (!selector.exists) {
        console.warn(`The defined parent selector ${selector.strName} in ${this.name} does not exist in the DOM.`);

        return selector;
      } else {
        selector.off();

        // We pass in event, delegate, handler, context which is our behavior.
        selector.on(uiSelectorObj.event, delegate, this[uiSelectorObj.method], context);
      }
    }

    return selector.find(delegate);
  } catch (err) {
    console.error(err);
  }
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
  this.bindUIElements();
}

export default Behavior;