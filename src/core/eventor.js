const Eventor = {
  subscriptions: [],

  nativeEvents: [
    'focus',
    'blur',
    'click',
    'keydown',
    'keyup',
    'change'
  ],

  publish(eventName, eventDetails = null, trigger = false) {
    let event = this.createEvent(eventName, eventDetails);

    this.isPublishedEvent = true;

    if (trigger) {
      this.trigger(event);
    }
  },

  subscribe(event, callback, bubble = false, elem = document) {

    // Don't add listener if we already subscribed to the same event.
    if (this.subscriptions.includes(event)) { return false; }

    this.subscriptions.push(event);

    elem.addEventListener(event, callback, bubble);
  },

  trigger(event, eventDetails = null, elem = document) {
    if (!this.isPublishedEvent) {
      event = this.createEvent(event, eventDetails);
    }

    this.isPublishedEvent = false;

    elem.dispatchEvent(event);
  },

  createEvent(eventName, detail) {
    let event;

    if (this.nativeEvents.some((event) => event === eventName)) {
      event = new Event(eventName);
    } else {
      if (detail === null) {
        detail = {};
      }

      event = new CustomEvent(eventName, { detail });
    }

    return event;
  }
};

export default Eventor;