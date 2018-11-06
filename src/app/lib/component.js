const _ = require('underscore');
const Renderer = require('./core/renderer.core');
// import Renderer from './core/renderer.core';


const Rend = Renderer;

const Component = {
  create: function (options) {
    _.extend(this, Rend, options);

    this.initialize();

    this.addTemplate();
  },

  initialize: () => { return null; }
};

module.export = Component;