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
      btn.children[0].classList.remove('fa-chevron-down');
      btn.children[0].classList.add('fa-chevron-up');
    } else {
      drawer.classList.add('collapse');
      btn.setAttribute('data-collapsed', true);
      btn.children[0].classList.remove('fa-chevron-up');
      btn.children[0].classList.add('fa-chevron-down');
    }
  },

  start() {
    this.setHandlers();
  }
});

export default AccordionBehavior;