import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { default as logFactory } from 'debug';

import { ExampleCollection } from '/imports/api/example/example.js';
import { subscriptionHandlers, subscriptionHandlersHelpers } from '/client/lib/subscription-handlers.js';
import { routeMap } from '/imports/api/helpers/both/routes/routes.js';
import pkgJson from '/package.json';
import { publicationNames } from '/imports/api/helpers/both/publication-names.js';

const debug = logFactory(`@${pkgJson.name}${__filename}`);

const EXAMPLE_EDIT_ON_CREATED = function onCreated() {
  const instance = this;
  const dataLoading = instance.dataLoading = new ReactiveVar(true);
  const dataLoadingErrors = instance.dataLoadingErrors = new ReactiveDict();
  const EXAMPLE_PUBLICATION_HANDLERS = subscriptionHandlers({ dataLoading, dataLoadingErrors, debug });

  instance.subscribe(publicationNames.EXAMPLE_PUBLICATION, EXAMPLE_PUBLICATION_HANDLERS);
};

const EXAMPLE_EDIT_HOOKS = {
  EXAMPLE_EDIT_FORM: {
    onSuccess: () => FlowRouter.go(routeMap.EXAMPLE_LIST.path),
  },
};

AutoForm.hooks(EXAMPLE_EDIT_HOOKS);

const helpers = {
  getDoc: () => ExampleCollection.findOne(FlowRouter.getParam('_id')),
  collection: () => ExampleCollection,
};

export const EXAMPLE_EDIT_HELPERS = { ...helpers, ...subscriptionHandlersHelpers() };

Template.EXAMPLE_EDIT.onCreated(EXAMPLE_EDIT_ON_CREATED);
Template.EXAMPLE_EDIT.helpers(EXAMPLE_EDIT_HELPERS);

