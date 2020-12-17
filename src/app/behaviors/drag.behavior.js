import { Behavior } from "../../../zense";

const DragBehavior = Object.create(Behavior);

DragBehavior.config({
  behaviorName: 'drag-behavior',

  ui: {
    container: '.g-draggable',
    item: '.js-draggable-item',
    grip: '.js-item-grip'
  },

  modifiers: {
    grabbing: 'is--grabbing',
    overArea: 'is--over-area'
  },

  currDraggedItem: null,
  insertTxt: 'Drop element here.',

  handlers() {
    let container = this.dom(this.ui.container);

    if (container.exists) {
      container.on('dragstart', this.ui.item, this.onDragStart.bind(this));
      // container.on('dragenter', this.ui.item, this.onDragEnter.bind(this));
      container.on('dragover', this.ui.item, this.onDragOver.bind(this));
      container.on('dragleave', this.ui.item, this.onDragLeave.bind(this));
      container.on('dragend', this.ui.item, this.onDragEnd.bind(this));
      container.on('drop', this.ui.item, this.onDrop.bind(this));
    }
  },

  onDragStart(e, draggableItem) {
    let disabledBtn;
    
    if (this.hasClass(draggableItem, this.modifiers.grabbing)) {
      return false;
    }

    disabledBtn = this.dom('.js-edit-save-btn[disabled]');

    if (disabledBtn.exists) {
      let attr = disabledBtn.getAttributeNode('disabled');
      
      disabledBtn.removeAttributeNode(attr);
    }

    // Target (this) element is the source node.
    this.currDraggedItem = draggableItem;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', draggableItem.outerHTML);

    draggableItem.classList.add(this.modifiers.grabbing);
  },

  onDragEnter(e, draggableItem) {
    
  },

  onDragOver(e, draggableItem) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    if (!this.hasClass(draggableItem, this.modifiers.overArea)) {
      draggableItem.classList.add(this.modifiers.overArea);
  
      e.dataTransfer.dropEffect = 'move';
    }

    return false;
  },

  onDragLeave(e, draggableItem) {
    // this / e.target is previous target element.
    if (this.hasClass(draggableItem, this.modifiers.overArea)) {
      draggableItem.classList.remove(this.modifiers.overArea);
    }
  },

  onDragEnd(e, draggableItem) {
    // this/e.target is the source node.
    if (this.hasClass(draggableItem, this.modifiers.overArea)) {
      draggableItem.classList.remove(this.modifiers.overArea);
    }
  },

  onDrop(e, draggableItem) {
    let dropHtml;

    // Don't do anything if dropping the same column we're dragging.
    if (this.currDraggedItem !== draggableItem) {
      draggableItem.parentNode.removeChild(this.currDraggedItem);

      dropHtml = e.dataTransfer.getData('text/html');

      draggableItem.insertAdjacentHTML('beforebegin', dropHtml);

      this.currDraggedItem = null;
    }

    if (this.hasClass(draggableItem, this.modifiers.overArea)) {
      draggableItem.classList.remove(this.modifiers.overArea);
    }

    draggableItem.classList.remove(this.modifiers.grabbing);

    return false;
  },

  hasClass(node, classes) {
    let result;

    if (Array.isArray(classes)) {
      for (let i = 0; i < classes.length; i++) {
        result = node.classList.value.includes(classes[i]);
      }
    } else {
      result = node.classList.value.includes(classes);
    }

    return result;
  },

  start() {
    this.handlers();
  }
});

export default DragBehavior;
