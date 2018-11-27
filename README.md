# Zense
A new application development library that will differ from others in that it will give you peace of mind, joy and it will make so much sense! - Zense

Zense uses OLOO (Object Linked to Other Objects) pattern to link objects to other objects and ridding the need to fix implicit/explicit 'this' and leveraging JavaScripts natural delegation pattern;

# Creating a Zense Component
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
