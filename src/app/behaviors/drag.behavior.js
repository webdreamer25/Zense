import { Zense } from "../../../zense";

const DragBehavior = Object.create(Zense.Behavior);

DragBehavior.config({
  behaviorName: 'drag-behavior',

  ui: {
    container: '.b-draggable',
    item: '.js-draggable-item'
  },

  modifiers: {
    grabbing: 'is--grabbing',
    insertPos: 'is--to-insert'
  },

  position: 'beforebegin',
  positionClass: null,
  currDraggedItem: null,

  handlers() {
    let container = this.dom(this.ui.container);

    if (container.exists) {
      container.on('dragstart', this.ui.item, this.onDragStart.bind(this));
      container.on('dragover', this.ui.item, this.onDragOver.bind(this));
      container.on('dragleave', this.ui.item, this.onDragLeave.bind(this));
      container.on('drop', this.ui.item, this.onDrop.bind(this));
    }
  },

  onDragStart(e) {
    let draggableItem = e.delegate;
    
    if (this.hasClass(draggableItem, this.modifiers.grabbing)) {
      return false;
    }

    // Target (this) element is the source node.
    if (this.currDraggedItem === null) {
      this.currDraggedItem = draggableItem;
    }

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', draggableItem.outerHTML);

    draggableItem.classList.add(this.modifiers.grabbing);
  },

  onDragOver(e) {
    let position = 'beforebegin';
    let referenceItem = e.delegate;
    let cursorYPos = e.clientY;
    let refItemPos = referenceItem.getBoundingClientRect();
    let refItemHeight = refItemPos.height / 2;

    if (e.preventDefault) {
      e.preventDefault();
    }

    // Ensures we drop item below the current item we are over.
    if (cursorYPos > refItemPos.bottom || cursorYPos > (refItemPos.bottom - refItemHeight)) {
      position = 'afterend';
    } else if (cursorYPos < refItemPos.top || cursorYPos < (refItemPos.top + refItemHeight)) {
      position = 'beforebegin';
    }

    if (!this.currDraggedItem.isSameNode(referenceItem) && this.position !== position) {
      let positionClass = `${this.modifiers.insertPos}-${position}`;

      if (this.positionClass !== null) {
        referenceItem.classList.remove(this.positionClass);
      }
      
      referenceItem.classList.add(positionClass);

      this.position = position;
      this.positionClass = positionClass;

      e.dataTransfer.dropEffect = 'move';
    }
  },

  onDragLeave(e) {
    let referenceItem = e.delegate;

    // Ensures we remove the over effect so long as we are still dragging still.
    if (this.hasClass(referenceItem, this.positionClass)) {
      referenceItem.classList.remove(this.positionClass);
    }
  },

  onDrop(e) {
    let dropHtml;
    let referenceItem = e.delegate;

    // Don't do anything if dropping the same column we're dragging.
    if (!this.currDraggedItem.isSameNode(referenceItem)) {
      referenceItem.parentNode.removeChild(this.currDraggedItem);

      dropHtml = e.dataTransfer.getData('text/html');

      referenceItem.insertAdjacentHTML(this.position, dropHtml);

      this.currDraggedItem = null;
    }

    if (this.hasClass(referenceItem, this.positionClass)) {
      referenceItem.classList.remove(this.positionClass);
    }

    referenceItem.classList.remove(this.modifiers.grabbing);

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
