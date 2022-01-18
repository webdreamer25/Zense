import { Zense } from '../../../zense';

const ArchitectualModule = Object.create(Zense.Module);

ArchitectualModule.create({
  name: 'architectual-module',
  selector: '#architectual-region',
  shouldRender: false,

  init() {
    this.util.fetchJSONData('architecture', (json) => {
      this.shouldRender = true;

      this.render(json);
    }, this)
  },

  serializeData(architectureData) {
    return {
      architectureData
    }
  },

  template(model) {
    return /*html*/`<div class="m-zense-architectual">
      ${model.architectureData.map((obj) => {
        if (obj.linkedObjects) {
          obj.tpl = this.createLinkedObjects(obj);
        }

        return this.objectTemplate(obj);
      }).join('')}
    </div>`;
  },

  createLinkedObjects(options) {
    const { name, linkedObjects, serviceObjects = [] } = options;
    const linkedObjTpl = linkedObjects.map(this.objectTemplate.bind(this)).join('');
    const serviceObjTpl = serviceObjects.map(this.objectTemplate.bind(this)).join('');
    let overlay;

    if (name === 'app') {
      overlay = ' is--overlayed';
    } else {
      overlay = '';
    }

    return /*html*/`<div class="m-zense-architectual__elements${overlay}">
      ${linkedObjTpl}
      ${serviceObjTpl ? /*html*/`<div>${serviceObjTpl}</div>` : ''}
    </div>`;
  },

  objectTemplate(options) {
    let { name, type, align, tpl = '' } = options;
    let alignmentClass = ` is--${type}`;

    if (type === 'element' && align) {
      alignmentClass = ` is--${align}`;
    }

    return /*html*/`<div class="m-zense-architectual__object${alignmentClass}">
      <div>${name}</div>${tpl}
    </div>`;
  }
})

export default ArchitectualModule;