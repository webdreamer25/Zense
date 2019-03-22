# Zense
The library that not only gives you peace of mind, but just makes more sense than the competition. Zense uses OLOO (Object Linked to Other Objects) pattern to link objects to other objects at its core. This give development teams with minimal experience up to expert level JavaScript devs the ability to modify Zense to their own needs and desires and make more Zense out of Zense =).

- No jQuery
- No underscore
- No hassle!
- peace of mind!!!!!!!!!!!!!!

## The idea
My passion, My art, My true love... Just don't tell my wife.

I've worked in the application development sphere for many years. I've been a solo act doing everything as a one man army and I have also been in teams that have ranged from 5 to 20+ engineers. I have worked for smaller agencies and large fortune 500 companies. I've experienced everything from doing small remedial tasks like enhancing existing components and debugging to being responsible for re-writting entire applications and throughout my experience I have learned 2 big things that echoe in my infinite developing brain, **"KEEP IT SIMPLE STUPID!" & "LEARN WHATS UNDER THE HOOD!"**. 

**Complexity makes you look like you know what you are doing, not really...**

It might seem like a simple thing to do but all developers are guilty of overly complicating their code. It might be in the spirit of optimization or just because you want "clean code", but you have to remember, you wont always be around to change or answer the why, what or how that developers need to edit that code without introducing new bugs every sprint. This is why I felt the need, NAY! the desire NAY! the duty NAY! the call (pun intended) to create a development library for your everyday developer or development team that is readable and maintainable without the need of JS gurus.

**I love angular, vue and react they are so easy to understand, but... so is a car until you look under the hood.**

Zense at its core uses OLOO to achieve its magic, which means "this" is just "this" no matter where you use "this". No more lengthy mentoring sessions with your developers to try to explain how and why it works. I wrote Zense so even those teams who lack in JS Jedi Mastery (JSJM trying to make it a thing) can stop being the fat starwars kid and actually learn to use the force to guide them trhough the trials.

## Browser support
At its core Zense uses Native JS. ES6 infact transpiled using babel. what!!?!? Am I dreaming! no and your stupid for saying that... JK =P
Zense has been tried and tested on IE 11+ and do I really need to mention any other browsers? **#LETINTERNETEXPLORER10BELOWDIE** join the revolution!

## Usage
```bash
npm i --save-dev zense
```

## Creating a Component
Components are small pieces of the application that can be used to create larger pieces known in zense as modules.

```js
import { Zense } from 'zense';

const LogoComponent = Object.create(Zense.Component);

LogoComponent.create({
  // (OPTIONAL) By default your component will use 'selector' property to set the component name.
  // Giving the component a unique name is important and can be used for better error handling and debugging.
  name: '',

  // By default the renderType property is set to 'append'.
  // Set to 'html' if you wish to empty component region
  renderType: 'html'
  
  // Required: Tag, Class, Id
  // Any identifier passed into the selector property will get converted into a native DOM Object.
  selector: '', 

  // Use this to add logic and stop component rendering.
  // Setting this to false will remove the component from the DOM using the "selector" property
  shouldRender: true,
  
  // Optional: Pass in an array of values or objects
  behaviors: [], 
  
  // Use to hardcode data into the template or modify how it is passed into the template.
  // By default serializeData gets passed data that you set on component/module/composite via the "store" property.
  // It also gets passed whatever data you pass it via its "render" method.
  serializeData(data) {
    return data;
  },
  
  // Lifecycle hooks
  beforeRender() {},
  afterRender() {},

  // Required: Your component will need a template in order to work.
  // By default the template method gets passed in any data that comes for "api" or "store" via the serializeData method. 
  // Data can be accessed via the method parameter as seen below.
  template(data) {
    return `<div>${data.title}</div>`;
  }
});

// Optional: You may pass your data via the "render" method argument and the serializeData method will make it available on your template.
LogoComponent.render()
```

## Creating a Module

```js
import { Zense } from 'zense';
import LogoComponent from '../components/logo.component';

const HeaderModule = Object.create(Zense.Module);

HeaderModule.create({
  // When this property is set and given a url an ajax call is made to retrieve the data.
  // The data is then passed in automagically to all declared components in the "components" array.
  api: 'http://localhost:8000/mocks/test.json',

  // Optional: gives your model and components data.
  store: {},
  
  // Similar usage as components
  name: 'header-module',
  selector: '#header-region',
  renderType: 'append' // default
  
  // Passed in an array of values or objects.
  // Parent context is passed into the behaviors by default and can be accessed using "this.module" to reach its key & value pairs.
  behaviors: [], // optional
  
  // Set this property to false if you don't want child components to be rendered (default is true).
  shouldRenderChildren: true,
  
  // Pass in any child components as an array and they will auto-magically render.
  // Components automatically register their parent and can be accessed using "this.module" to reach its key & value pairs
  components: [
    LogoComponent,
    NavigationComponent
  ],
  
  // Optional: Overwrite method to modify how and when components are rendered on the page
  addComponents() {
    // Add components code
  },

  // Optional: Overwrite the way the render method adds the template to the DOM.
  // By default this method 
  addTemplateToDOM() {
    // rendering logic here
  },
  
  // Lifecycle hooks
  beforeRender() {},
  afterRender() {},

  template() {
    return `
      <div id="header-logo"></div>
      <nav id="navigation"></nav>
    `;
  }
});

HeaderModule.render();
```

## Composites
Sometimes you might want to have a way to render or bootstrap together a series of modules and/or components. Zense allows you to do this via the use of Composites.

```js
import { Zense } from 'zense';

const HomeComposite = Object.create(Zense.Composite);

HomeComposite.create({
  selector: '',
  renderType: 'append', // default

  // By default both the "modules" and "components" properties get access to the parent context via "this.composite".
  modules: [],

  // This allows you to pass in generic components with no module parent.
  components: [],
  
  // Lifecycle hooks
  beforeRender() {},
  afterRender() {},

  // Required for now but working on making this optional only for composites in late versions.
  template() {
    return ``;
  }
});

HomeComposite.render();
```

## Behaviors
Behaviors allow for developers to maintain DRY code in their JavaScript. Need accordions, filters, forms, submit or reset functionality? Write a Behavior and pass it into your component or module and the behavior(s) will automagically accept its parent and do its thing!

### Creating a behavior

```js
import { Zense } from 'zense';

const ModalBehavior = Object.create(Zense.Behavior);

ModalBehavior.config({
  // Arbitrary properties
  modal: null,
  isOpen: false,
  
  // Any class, id or tag will magically turn into a DOM selector
  ui: {
    trigger: '.js-toggle',
    closeBtn: '.js-modal-close-btn'
  },

  handlers() {
    // See Zense DOM manipulation section to under how the below code is achieved.
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

  // Can overwite to invoke more methods but by default handlers() method is invoked.
  start() {
    this.handlers();
  }
});
```

### Ways to behave
In the example above we create a modal behavior that can be passed into a generic Modal component like so:

```js
import { Zense } from 'zense';
import ModalBehavior from '../behaviors/form.behavior';

const ModalComponent = Object.create(Zense.Component);

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

```js
import { Zense } from 'zense';
import ModalBehavior from '../behaviors/form.behavior';

const ResultsModalComponent = Object.create(Zense.Component);

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
    // We pass in the object we want to use to extend into the 'options' property
    { name: ModalBehavior, options: extendBehavior }
  ],
  template(data) {
    // SOME MODAL TEMPLATE
  }
});
```

## DOM Traversal & Manipulation
jQuery, Sizzle and Other DOM T&M libraries were wonderful when first introduced especially when coding for multi browser compatability, but ECMA compatability has improved by leaps and bounds and those libraries come with alot that you may not even use. Below are a few methods that come with Zense to help you on your quest!

All defined methods are encapsulated within Zense objects and can be used on any Zense component, module, composite, etc...

### Use it to get elements from the DOM.
```js
// Supports single string css selector.
// '#someid', '.someclass', '[data-target]', 'div'.
this.dom('');
```

### Custom methods for chaining with "this.dom()".
```js
// This method sets "info" object on the selector.
// info = { event, callback };
.on(event, callback, bubble); 

// Accepts no arguments since it uses "info" object to remove listener form designated selector.
.off();

// Use to iterate through NODE lists.
// Callback provides element, index and list.
.each(callback);

// Uses innerHTML at its core
.html(value);

// Uses insertAdjacentHTML for more info [click here](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML)
// Positions: 'beforebegin', 'afterbegin', 'beforeend' and 'afterend'
.insertHTML(position, value);

// Use to set or get and attribute.
// Deprecated: use native setAttribute and getAttribute instead.
.attr(attribute, property);

// will set or return a value if no argument is passed in.
.val(value);

// Deprecated: use native .hasAttribute() instead.
// Will be removed in the next version.
.hasAttribute(attributeName);

// Deprecated: use native .removeAttribute() instead.
// Will be removed in the next version.
.removeAttribute();
```

### Custom standalone methods

```js
// If array is passed in params: value, index and list.
// If object is passed in params: value, key and obj.
this.each(array or object, callback);

// Checks if what is passed in is an Object.
// Returns true if it passes.
this.isObject(object);

// Pass in multiple objects.
// Simple extend unlike the jQuery extend.
this.extend(object1, object2, object3);

// Returns an array with no duplicates.
this.uniqueArray(array);
```

**Because the above method returns a DOM node you may use any JS method in the spec as well.**


