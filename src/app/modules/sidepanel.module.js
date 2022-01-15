import { Zense } from '../../../zense';

const SidepanelModule = Object.create(Zense.Module);

SidepanelModule.create({
  name: 'sidepanel-module',
  selector: '#sidepanel-region',
  shouldRender: false,

  init() {
    this.navigationData = null;

    this.fetchJSONData();
  },

  async fetchJSONData() {
    try {
      const basePath = this.store.baseJSONPath;
      const response = await fetch(basePath + 'developer.json');
      const json = await response.json();

      this.navigationData = json;
      this.shouldRender = true;

      this.render();
    } catch (err) {
      console.error(err);
    }
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