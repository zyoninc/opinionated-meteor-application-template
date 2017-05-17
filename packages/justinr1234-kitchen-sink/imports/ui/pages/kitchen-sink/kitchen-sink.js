import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

// ████████████████████████████████████
//
// Kitchen Sink onCreated()
//
// ====================================
const onCreated = function onCreated() {
  const instance = this;

  // -------------------------------------
  //
  // It's more likely the following hardcoded
  // data would be passed in from a child Template,
  // AJAX call, Collection, etc. This is just
  // to demonstrate passing the data object
  // through the json attribute.
  //
  // -------------------------------------
  instance.data.json = [
    // A
    {
      name: 'Json A',
      route: '/',
      items: [
      { name: 'A1' },
      { name: 'A2' },
      { name: 'A3' },
      { name: 'A4' },
      ],
    },

    // B
    {
      name: 'Json B',
      items: [
      { name: 'B1' },
      { name: 'B2' },
      { name: 'B3' },
      ],
    },

    // C
    { name: 'Json C' },

    // D
    {
      name: 'Json D',
      items: [
      { name: 'D1' },
      ],
    },

    // E
    { name: 'Json E' },
  ];
};

// ████████████████████████████████████
//
// Kitchen Sink Helpers
//
// ====================================
const helpers = {
  jsonData: () => {
    const instance = Template.instance();
    if (instance.data && instance.data.json) {
      return instance.data.json;
    }
    return null;
  },
};

// ████████████████████████████████████
//
// Kitchen Sink Events
//
// ====================================
const events = {
  // -----------------------------------------
  //  Toggles display of top fixed menu
  // -----------------------------------------
  'click #toggleHide'(event) {
    event.preventDefault();
    event.stopPropagation();
    const target = $('.demo-menu');
    target.toggle();
  },
};


Template.EXAMPLE_LIST.onCreated(onCreated);
Template.KITCHEN_SINK.events(events);
Template.KITCHEN_SINK.helpers(helpers);
