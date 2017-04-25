import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { ExampleCollection } from '/imports/api/example/example.js';
import { routeMap } from '/imports/api/helpers/both/routes/routes.js';

const EXAMPLE_ADD_HOOKS = {
  EXAMPLE_ADD_FORM: {
    onSuccess: () => FlowRouter.go(routeMap.EXAMPLE_LIST.path),
  },
};

AutoForm.hooks(EXAMPLE_ADD_HOOKS);

const EXAMPLE_ADD_HELPERS = {
  collection: () => ExampleCollection,
};

Template.EXAMPLE_ADD.helpers(EXAMPLE_ADD_HELPERS);
