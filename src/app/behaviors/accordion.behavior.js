import { Behavior } from '../../zense/index';

const AccordionBehavior = Object.create(Behavior);

AccordionBehavior.config({
  ui: {
    trigger: '.js-accordion-toggle',
    drawer: '.accordion-drawer'
  },

  setHandlers: function () {
    this.ui.trigger.on('click', this.toggleAccordion.bind(this));
  },

  toggleAccordion: function (e) {
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

  start: function () {
    this.setHandlers();
  }
});

export default AccordionBehavior;