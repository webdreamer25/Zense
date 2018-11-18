class Renderer {
  _defaults = {
    regions: [],
    selector: '',
    template: '',
    warningText: 'There is no data being passed in.'
  };

  constructor (options) {
    this.opt = Object.assign({}, _defaults, options);
  }

  beforeRender() {
    return null;
  }

  afterRender() {
    return null;
  }

  render() {
    this.beforeRender();

    document.querySelector(this.opt.selector).innerHTML += this.template(this.serializeData());

    this.afterRender();
  }

  serializeData() {
    return {};
  }
}

export default Renderer;