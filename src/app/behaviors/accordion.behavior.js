import { Behavior } from '../../zense/index';

const AccordionBehavior = Object.create(Behavior);

AccordionBehavior.config({
  behaviorName: 'accordion',
  ui: {
    trigger: '.js-accordion-toggle',
    drawer: '.accordion-drawer'
  },

  setHandlers() {
    this.ui.trigger.on('click', this.toggleAccordion.bind(this));
  },

  toggleAccordion(e) {
    e.preventDefault();
    let btn = e.currentTarget;
    let drawer = e.currentTarget.nextElementSibling;
    let isCollapsed = btn.dataset.collapsed;

    if (isCollapsed === 'true') {
      drawer.classList.remove('collapse');
      btn.setAttribute('data-collapsed', false);
    } else {
      drawer.classList.add('collapse');
      btn.setAttribute('data-collapsed', true);
    }
  },

  start() {
    this.setHandlers();
  }
});

export default AccordionBehavior;