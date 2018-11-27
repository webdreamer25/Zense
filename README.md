# Zense
The library that not only give you peace of mind, but just makes more sense than the competition. Zense uses OLOO (Object Linked to Other Objects) pattern to link objects to other objects at its core. 

### Creating a Component
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
