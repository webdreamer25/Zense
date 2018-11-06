// import Api from './api.core';
const Api = require('./api.core');

module.export = (function() {
    const api = Api;

    const Renderer = {
        regions: [],
        selector: '',
        template: '',
        multiSelector: false,
        api: Object.create(api),

        beforeRender: () => {
            return null;
        },

        render: () => {
            this.beforeRender();

            if (!this.multiSelector) {
                this.selector.innerHTML += this.template;
            } else {
                for (let i = 0; i < this.selector.length; i++) {
                    let el = this.selector[i];

                    el.innerHTML += this.template;
                }
            }

            this.afterRender();
        },

        afterRender: () => {
            return null;
        },

        destroy: () => {
            this.selector.remove();
        },

        setTemplateData: () => {
            if (this.api.model || this.api.collection.length > 0) {
                return {
                    model: this.api.model,
                    collection: this.api.collection
                }
            } else {
                return {};
            }
        },

        addTemplate: () => {
            // We need to ensure that if the template turns out to be a function we pass in the data.
            if (typeof this.template === 'function') {
                let templateData = this.setTemplateData();

                this.template = this.template(templateData);
            }
        },

        setDOMSelector: () => {
            let selector = '';

            switch (this.selector.charAt(0)) {
                case '.':
                    selector = document.getElementsByClassName(this.selector.slice(1));
                    this.multiSelector = true;
                    break;
                case '[':
                    selector = document.querySelectorAll(this.selector);
                    this.multiSelector = true;
                    break;
                case '#':
                    selector = document.getElementById(this.selector.slice(1));
                    break;
                default:
                    selector = document.getElementsByTagName(this.selector);
                    this.multiSelector = true;
            }

            // We want to ensure that if no selector is specified the selector chosen is the parent modules selector
            // this is incase we have an instance of appending purely on the parent element vs a specific container.
            if (typeof this.selector === 'undefined' && this.selector === null) {
                this.selector = this.regions[0];
            } else {
                this.selector = selector;
            }

            this.regions.push(selector);
        }
    };

    return Renderer;
})();