# Zense
A new application development library that will differ from others in that it will give you peace of mind, joy and it will make so much sense! - Zense

Zense uses OLOO (Object Linked to Other Objects) pattern to link objects to other objects and ridding the need to fix implicit/explicit 'this' and leveraging JavaScripts natural delegation pattern;

### Creating a Component
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
### Creating a Module
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
