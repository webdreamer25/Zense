const DOM = function (selector, context) {
  const selectorRegex = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
  const lastClassRegex = /[^\s]+$/g;
  const spaceRegex = /\s/g;

  if (!context) { 
    context = document;
  }

  let match;
  let strSelector;

  // We do not want to get the dom if the selector is already and html node.
  if (typeof selector === 'string') {

    // Needed to ensure no duplication of parent selector occurs when rendering multiples of the same component.
    if (spaceRegex.test(selector)) {
      selector = selector.match(lastClassRegex)[0];
    }

    strSelector = selector;
    match = selectorRegex.exec(selector);

    if (match !== null) {
      if (match[1]) {
        
        // Need a fallback if the context is already an ID and we are using context.find();
        if (context.getElementById) {
          selector = context.getElementById(match[1]);
        } else {
          selector = context.querySelector(match[0]);
        }
        
      } else if (match[2]) {
        selector = context.getElementsByTagName(match[2]);
      } else if (match[3]) {
        selector = context.getElementsByClassName(match[3]);
      }
    } else {
      selector = context.querySelectorAll(selector);
    }

    // We need to preserve a string copy of the selector to for reseting purposes.
    if (selector && (selector.strName === undefined || selector.strName && selector.strName !== strSelector)) {
      selector.strName = strSelector;
    }
  } 

  if (selector === null || selector && selector.length === 0 && selector !== (window || document)) {
    selector = false;
  } else {
    selector.exists = true;
  }

  if (selector) {
    let len = selector.length;

    if (len) {
      let i = 0;
      do {

        // Add selector chain methods to dom object.
        for (let key in DOMSelectorMethods) {
          if (DOMSelectorMethods.hasOwnProperty(key) && typeof DOMSelectorMethods[key] === 'function') {
            
            // Set methods on dom object list returned.
            selector[key] = DOMSelectorMethods[key];

            // Set methods to each dom object list item.
            selector[i][key] = DOMSelectorMethods[key];
          }
        }

        i++;
      } while (i < len);

      if (len === 1) {
        selector[0].exists = true;
        
        return selector[0];
      }
    } else {

      // Add selector chain methods to dom object.
      for (let key in DOMSelectorMethods) {
        if (DOMSelectorMethods.hasOwnProperty(key) && typeof DOMSelectorMethods[key] === 'function') {
          selector[key] = DOMSelectorMethods[key];
        }
      }

    }
  } else {
    selector = {
      exists: false,
      strName: strSelector
    }
  }

  return selector;
};

const DOMListener = function (args, context) {
  let event = args[0];
  let callback = args[1];
  let bubble = args[2] ? args[2] : true;

  if (typeof args[1] === 'function') {
    context.info = { event, callback };

    context.addEventListener(event, callback, bubble);
  } else {
    let delegate = args[1];

    callback = args[2];
    bubble = true;

    context.info = { event, delegate, callback };

    context.addEventListener(event, function (e) {
      for (let target = e.target; target && target != this; target = target.parentNode) {

        // loop parent nodes from the target to the delegation node
        if (target.matches(delegate)) {
          e.stopPropagation();

          e.delegate = target;
          
          callback.call(args[3], e, target);
          break;
        }

      }
    }, bubble);
  }

  return context;
};

const DOMSelectorMethods = {
  on() {
    let selector;
    let len = this.length;

    if (!len) {
      selector = new DOMListener(arguments, this);
    } else {
      for (let i = 0; i < len; i++) {
        selector = new DOMListener(arguments, this[i]);
      }
    }

    return selector;
  },

  off() {
    let len = this.length;

    if (!len && this.info) {
      this.removeEventListener(this.info.event, this.info.callback, true);
    } else {
      for (let i = 0; i < len; i++) {
        if (this[i].info) {
          this[i].removeEventListener(this[i].info.event, this[i].info.callback, true);
        }
      }
    }

    return this;
  },

  html(html) {
    let len = this.length;

    if (!len) {
      this.innerHTML = html;
    } else {
      for (let i = 0; i < len; i++) {
        if (this[i].innerHTML !== '') {
          this[i].innerHTML = '';
        }

        this[i].innerHTML = html;
      }
    }

    return this;
  },

  insertHTML(position, html) {
    let len = this.length;

    if (!len) {
      this.insertAdjacentHTML(position, html);
    } else {
      for (let i = 0; i < len; i++) {
        this[i].insertAdjacentHTML(position, html);
      }
    }

    return this;
  },

  attr(attribute, property) {
    let len = this.length;

    if (len) {
      for (let i = 0; i < len; i++) {
        if (typeof property !== 'undefined') {
          this[i].setAttribute(attribute, property);    
        } else {
          return this[i].getAttribute(attribute);
        }
      }
    } else if (!len && property !== undefined) {
      this.setAttribute(attribute, property);
    }

    return this.getAttribute(attribute);
  },

  val(value) {
    let len = this.length;

    if (!len) {
      if (typeof value !== 'undefined') {
        this.value = value;
      } else {
        return this.value;
      }
    } else {
      for (let i = 0; i < len; i++) {
        if (typeof value !== 'undefined') {
          this[i].value = value;
        } else {
          return this[i].value;
        }
      }
    }

    return this;
  },

  prop(property, value) {
    let len = this.length;

    if (!len) {
      this[property] = value;
    } else {
      for (let i = 0; i < len; i++) {
        this[i][property] = value;
      }
    }

    return this;
  },

  each(callback) {
    try {
      for (let i = 0, len = this.length; i < len; i++) {
        let el = this[i];

        // Add selector chain methods to dom object.
        for (let key in DOMSelectorMethods) {
          if (DOMSelectorMethods.hasOwnProperty(key) && typeof DOMSelectorMethods[key] === 'function') {
            el[key] = DOMSelectorMethods[key];
          }
        }

        callback(el, i, this);
      }
    } catch (e) {
      console.error(e);
    }
  },

  find(selector) {
    return new DOM(selector, this);
  }
};

export default DOM;
