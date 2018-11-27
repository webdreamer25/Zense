# Zense
The library that not only gives you peace of mind, but just makes more sense than the competition. Zense uses OLOO (Object Linked to Other Objects) pattern to link objects to other objects at its core. 

- No jQuery
- No underscore
- No hassle!
- peace of mind!!!!!!!!!!!!!!

## Creating a Component
Components are small pieces of the application that can be used to create larger pieces known in zense as modules.

```
import { Component } from '../../zense/index';

const LogoComponent = Object.create(Component);

LogoComponent.create({
  // (OPTIONAL) By default your component will use 'selector' property to set the component name.
  // Giving the component a unique name is important and can be used for more accurate error handling.
  name: '',
  
  // Tag, Class, Id
  selector: '', 
  
  // Passed in an array of values or objects
  behaviors: [], 
  
  // Use to hardcode data into the template or modify how it is passed into the template.
  serializeData() {
    return data;
  },
  template(data) {
    return `<div>${data.title}</div>`;
  }
});
```

## Creating a Module

```
import { Module } from '../../zense/index';
import LogoComponent from '../components/logo.component';

const HeaderModule = Object.create(Module);

HeaderModule.create({
  // When this property is set and given a url an ajax call is made to retrieve the data.
  // The data is then passed in automagically to all declared components in the components array.
  api: 'http://localhost:8000/mocks/test.json',
  
  // Similar usage as components
  name: 'header-module',
  selector: '#header-region',
  
  // Passed in an array of values or objects.
  behaviors: [], 
  
  // Set this property to false if you don't want child components to be rendered (default is true).
  shouldRenderChildren: true,
  
  // Pass in any child components as an array and they will auto-magically render.
  // Components automatically register their parent caller into a property called 'parent'.
  components: [
    LogoComponent,
    NavigationComponent
  ],
  
  // Overwrite method to modify how and when components are rendered on the page
  addComponents() {
    // Add components code
  },

  template() {
    return `
      <div id="header-logo"></div>
      <nav id="navigation"></nav>
    `;
  }
});
```

## Behaviors
Behaviors allow for developers to maintain DRY code in their JavaScript. Need accordions, filters, forms, submit or reset functionality? Write a Behavior and pass it into your component or module and the behavior(s) will automagically accept its parent and do its thing!

### Creating a behavior

```
import { Behavior } from '../../zense/index';

const ModalBehavior = Object.create(Behavior);

ModalBehavior.config({
  // Arbitrary properties
  modal: null,
  isOpen: false,
  
  // Any class, id or tag will magically turn into a DOM selector
  ui: {
    trigger: '.js-toggle',
    closeBtn: '.js-modal-close-btn'
  },

  setHandlers() {
    this.ui.trigger.on('click', this.open.bind(this));
    this.ui.closeBtn.on('click', this.close.bind(this));
  },

  open(e) {
    e.preventDefault();
    let btn = e.currentTarget;
    this.modal = this.dom(btn.dataset.modal);

    if (!this.isOpen) {
      this.modal.classList.remove('modal--hidden');

      this.isOpen = true;
    }
  },

  close(e) {
    e.preventDefault();
    
    if (this.isOpen) {
      this.modal.classList.add('modal--hidden');

      this.isOpen = false;
      this.modal = null;
    }
  },

  // Exists on the original behavior object and can be used to invoke all of your behavior's magic!
  start() {
    this.setHandlers();
  }
});
```

### Ways to behave
In the example above we create a modal behavior that can be passed into a generic Modal component like so:

```
import { Component } from '../../zense/index';
import ModalBehavior from '../behaviors/form.behavior';

const ModalComponent = Object.create('Component');

const ModalComponent.create({
  name: 'results-modal',
  selector: 'body',
  
  // Behavior is passed in
  behaviors: [
    ModalBehavior
  ],
  
 
  template(data) {
    // SOME MODAL TEMPLATE
  }
});
```

What if you want to extend a behavior and it's defined properties/values?

```
import { Component } from '../../zense/index';
import ModalBehavior from '../behaviors/form.behavior';

const ResultsModalComponent = Object.create('Component');

const extendBehavior = {
  ui: {
    trigger: '.js-results-modal-toggle'
  },
  open(e) {
    e.preventDefault();
    console.log('do something else');
  }
}

const ResultsModalComponent.create({
  name: 'results-modal',
  selector: 'body',
  behaviors: [
    // We pass in the object we want to use to extend into the 'overwrites' property
    { name: ModalBehavior, extend: extendBehavior }
  ],
  template(data) {
    // SOME MODAL TEMPLATE
  }
});
```

