import Util from './core/util';

const Behavior = Object.create(Util);

Behavior.ui = {};
Behavior.strUI = {};
Behavior.delegates = {};
Behavior.behaviorName = '';
Behavior.customized = false;

Behavior.config = function (options) {
  Object.assign(this, options);

  try {
    if (this.behaviorName === '') {
      throw {
        type: 'Behavior',
        message: 'Behavior name has not been declared'
      }
    } else {
      if (this.behaviorName.indexOf('-behavior') === -1) {
        this.behaviorName += '-behavior';
      }
    }
  } catch (e) {
    console.error(e);
  }
};

// Behavior.setDelegateBehaviors = function (delegates) {
//   if (Array.isArray(delegates)) {
//     for (let i = 0; i < delegates.length; i++) {
//       let delegate = delegates[i];
//       let delegateName = delegate.behaviorName.split('-');

//       this[delegateName[0]] = delegate;

//       if (i === delegates.length) {
//         delegate = null;
//       }
//     }
//   }
// };

Behavior.bindUIElements = function () {
  if (!this.ui) { return null; }
  
  Object.keys(this.ui).forEach(key => {
    let uiElement = this.ui[key];

    // Neccessary for re-binding of events on later rendered elements referenced by this.ui object.
    if (typeof this.ui[key] === 'string' || (this.strUI !== null && this.ui[key] === this.strUI[key])) {
      this.strUI[key] = this.ui[key];
    }

    // Needed to ensure ui dom elements are rebound
    if (this.customized || typeof uiElement !== 'string') {
      uiElement = this.strUI[key];
    }

    this.ui[key] = this.dom(uiElement);
  });
};

Behavior.start = function () {
  return null;
};

export default Behavior;