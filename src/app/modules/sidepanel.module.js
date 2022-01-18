import { Zense } from '../../../zense';

const SidepanelModule = Object.create(Zense.Module);

SidepanelModule.create({
  name: 'sidepanel-module',
  selector: '#sidepanel-region',
  shouldRender: false,

  init() {
    this.navigationData = null;

    this.util.fetchJSONData('developer', (json) => {
      this.navigationData = json;
      this.shouldRender = true;

      this.render();
    }, this);
  },

  afterRender() {
    this.shouldRender = false;
  },

  serializeData() {
    return this.navigationData;
  },

  template(collection) {
    return /*html*/`<div class="m-zense-sidepanel">
      ${collection.map(navBtn => {
        return /*html*/`<a href="#${navBtn.route}">${navBtn.label}</a>`;
      }).join('')}
    </div>`;
  }
})

export default SidepanelModule;