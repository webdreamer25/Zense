import { Renderer } from './cores';

class Component extends Renderer {
  name = '';

  constructor(options) {
    this.opt = Object.assign({}, options);
  }

  initialize() {
    return null; 
  }

  setName(selector) {
    this.name = selector.slice(1).concat('-component');
  }
}

export default Component;