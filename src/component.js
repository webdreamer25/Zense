import Controller from './core/controller';

const Component = Object.create(Controller);

Component.id = 0;
Component.type = 'component';
Component.behaviors = [];
Component.preventBehaviorStart = false;

Component.setBehaviors = function () {
  let behaviorsLen = this.behaviors.length;

  if (this.shouldSetBehaviors && behaviorsLen > 0 && !this.hasRendered) {
    for (let i = 0; i < behaviorsLen; i++) {
      let behavior = this.behaviors[i];
      
      // This check is to ensure we are also handling extending the behavior.
      if (behavior.name) {
        try {

          // Ensures we don't overwrite base behavior instance.
          if (behavior.options) {
            let newBehaviorInstance = Object.create(behavior.name);

            newBehaviorInstance.setUniqueIdAndName(this.name);
            newBehaviorInstance = this.extend({}, newBehaviorInstance, behavior.options);

            behavior = newBehaviorInstance;
          } else {
            throw {
              type: `Customization ${behavior.name.behavior}`,
              message: 'Customization options is either missing or mis-spelled.'
            }
          }

        } catch(err) {
          console.error(err);
        }
      } else {
        behavior = Object.create(behavior);
        behavior.setUniqueIdAndName(this.name);
      }

      behavior.component = Object.create(this);

      if (this.module) {
        behavior.module = Object.create(this.module);
      }

      if (this.shouldPreventBehaviorFromStarting(behavior)) {
        continue;
      }

      behavior.start();
    }

    // Ensures that behaviors are only set one time.
    this.shouldSetBehaviors = false;
  }
};

Component.shouldPreventBehaviorFromStarting = function (behavior) {
  let result = false;

  if (this.preventBehaviorStart) {
    // Need access to behavior when extended under new context.
    if (behavior.name) {
      behavior = behavior.name;
    }

    if (Array.isArray(this.preventBehaviorStart)) {
      result = this.preventBehaviorStart.some((item) => {
        return behavior.behaviorName.indexOf(item.behaviorName) > -1;
      });
    } else {
      result = behavior.behaviorName.indexOf(this.preventBehaviorStart) > -1;
    }
  }

  return result;
};

Component.setUniqueName = function () {
  let newName = this.name;

  if (newName.indexOf(`-${this.type}`) === -1) {
    newName = `${newName}-${this.type}-${this.id}`;
  } else {
    newName = `${newName}-${this.id}`;
  }

  this.name = newName;

  // Increment id after name is set so no duplication occurs
  this.id++

  return newName;
};

export default Component;
