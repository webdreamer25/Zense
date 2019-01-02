import Controller from './core/controller';

const Component = Object.create(Controller);

Component.id = 0;
Component.type = 'component';
Component.behaviors = [];
Component.shouldRender = true;
Component.shouldSetBehaviors = true;

// Component.hasStore = function () {
//   // We want to ensure that if there is a store being passed into the component
//   // and but it holds no data we dont render the component and let the developer
//   // the state and why its not rendering.
//   if (typeof this.store !== 'undefined' && this.store !== null) {
//     if (Array.isArray(this.store) && this.store.length === 0 || 
//       typeof this.store === 'Object' && Object.keys(this.store).length === 0) {
//       this.shouldRender = false;
//       console.error({ message: 'Store seems to be '});
//     }
//   }
// };

Component.setBehaviors = function () {
  if (this.shouldSetBehaviors && this.behaviors.length > 0) {
    for (let i = 0; i < this.behaviors.length; i++) {
      let behavior = this.behaviors[i];
      
      // This check is to ensure we are also handling extending the behavior.
      if (behavior.name) {
        behavior = this.behaviors[i].name;

        // Necessary if we want to have specific behavior changes on any given component/module
        if (this.behaviors[i].options) {
          behavior = this.customizeObject(behavior, this.behaviors[i].options);
        }
      }

      // We need to let the behavior who the parent and grandparent caller are.
      behavior.component = this;
      behavior.module = this.module;

      behavior.bindUIElements();
      behavior.start();
    }

    // Ensures that behaviors are only set one time.
    this.shouldSetBehaviors = false;
  }
};

Component.setName = function (selector) {
  selector = selector.toLowerCase();

  this.name = selector.slice(1) + '-' + this.type + '-' + this.id;

  // Increment id after name is set so no duplication occurs
  this.id++
};

export default Component;
