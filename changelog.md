# Zense Change Log

## v 1.5.0 - 
  Added New "Storage" object. You will now be able to configure Storage to session or local storage and define what you want stored in client storage.

  ### Storage object & methods:

  ```js
  Storage.config({
    // Required.
    storeName: 'my-store', 

    // Optional: default is session. Additional option: local.
    storageType: 'session', 

    // Default false. Set to true to use storage
    storage: false,

    // Optional: define keys from default obj to store locally.
    keysToStore: [
      'sampleKey1'
    ]
  });

  // Use to set default settings.
  Storage.set({
    sampleKey1: {},
    sampleKey2: ''
  });

  // Use to initialize storage to populate default object.
  Storage.initStorage();

  // Use to set everything on default object or define what keys to store.
  Storage.saveToStorage([[ Object/Array: optional ]]);

  // Use to get entire store or specific specific key to retrieve from local/session storage.
  Storage.getFromStorage([[ String: optional]]);
  ```
  ### Changes:
  * Removed initialize method invocation from Controller object create method.
  * Added new init method to Controller object that will modules or composites will invoke when rendering their children. Init method fires before destroy, setDOMSelector & beforeRender methods located in renderer.js.
  * Added delegate flag to event object returned by Zense .on method.
  * Added logic to allow reseting of DOM selector for composites/modules/components if re-rendering them using their render method. render([[data, resetDOMSelector]])
  
  ### Bug Fixes:
  * Fixed an issues in Renderer.js that didn't set back string version of "selector" property if it was a class collection.
  * Fixed an issue that would cause duplication of components in the DOM when reusing a component that renders on the same page.
  * Fixed issues with checkUniqueName and setUniqueName methods that was not properly creating unique names for bootstrapped children set in modules.


