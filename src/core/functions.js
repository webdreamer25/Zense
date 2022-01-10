export function bindUIElements(context) {
  const ui = context.ui;
  const hasUIElements = ui && Object.keys(ui).length > 0;

  if (!hasUIElements || context.bindUI !== undefined && !context.bindUI) { 
    return false; 
  }

  for (let key in ui) {
    let uiElement = ui[key];
    let isUIElementString = typeof uiElement === 'string';
    let isUIElementObject = typeof uiElement === 'object';

    // Ensures that even if we pass the class as key we re-get the dom node.
    if (isUIElementString || isUIElementObject && key.indexOf('.') === -1) {

      // Neccessary for re-binding of events on later rendered elements referenced by ui object.
      if (isUIElementString && uiElement !== context.strUI[key]) {
        context.strUI[key] = uiElement;
      }

      // Needed to ensure ui dom elements are rebound
      if ((context.customized || isUIElementString)) {
        uiElement = context.strUI[key];
      }

      if (context.super !== undefined) {
        const selector = context.super.selector;

        // Ensure we only do a find to single node returns from context.dom();
        if (selector !== undefined && uiElement !== undefined) {
          ui[key] = selector.find(uiElement);
        } else {
          ui[key] = selector;
        }
        
      } else {
        ui[key] = context.dom(uiElement);
      }
    } else {
      ui[key]['selector'] = bindEventListeners({ 
        delegate: key, uiSelectorObj: ui[key], context
      });
    }
  }

  return ui;
}

export function bindEventListeners(options) {
  const { delegate, uiSelectorObj, context } = options;
  
  try {
    let selector;

    if (context.super === undefined) {
      throw {
        type: context.name,
        message: 'Behavior has no parent declared since it was started on its own.'
      }
    } else {

      // Ensure we have a parent selector if none is specified
      if (!uiSelectorObj.parent) {
        selector = context.super.selector;
      } else {

        // Allows for functional returns of parent objects under the right context.
        if (typeof uiSelectorObj.parent === 'function') {
          selector = context.dom(uiSelectorObj.parent.call(context));
        } else {
          selector = context.dom(uiSelectorObj.parent);
        }

      }

      // Ensure that we are not rebinding the same event on re-rendering of a component.
      if (!selector.exists) {
        console.warn(`The defined parent selector ${selector.strName} in ${context.name} does not exist in the DOM.`);

        return selector;
      } else {
        selector.off();

        // We pass in event, delegate, handler, context which is our behavior.
        selector.on(uiSelectorObj.event, delegate, context[uiSelectorObj.method], context);
      }
    }

    return selector.find(delegate);
  } catch (err) {
    console.error(err);
  }
}

export function addSelectorInfo(selectorInfo, infoObj) {
  let updatedSelectorInfo;

  infoObj.uid = createUniqueId();

  // Ensures we support cases where the same selector has multiple events attached to it.
  if (selectorInfo !== undefined) {

    // Ensures we create the array only if that is not already the value type.
    if (!Array.isArray(selectorInfo)) {
      updatedSelectorInfo = [selectorInfo];
    } else {
      updatedSelectorInfo = selectorInfo;
    }
    
    // Ensures we are not repeating the same info 
    if (!updatedSelectorInfo.some(obj => obj.uid === infoObj.uid)) {
      updatedSelectorInfo.push(infoObj);
    }
  } else {
    updatedSelectorInfo = infoObj;
  }

  return updatedSelectorInfo;
}

export function removeSelectorInfoAndListener(context, selectorInfo) {
  if (selectorInfo === undefined) {
    return context;
  } else {
    if (Array.isArray(selectorInfo)) {
      for (let i = 0, len = selectorInfo.length; i < len; i++) {
        let info = context.info[i];

        context.removeEventListener(info.event, info.callback, true);
      }
    } else {
      context.removeEventListener(selectorInfo.event, selectorInfo.callback, true);
    }
  }

  context.info = undefined;
}

export function createUniqueId(num = 1) {
  const array = new Uint32Array(num);

  window.crypto.getRandomValues(array);

  return array.length === 1 ? array[0] : array;
}