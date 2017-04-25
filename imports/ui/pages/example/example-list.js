import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { default as logFactory } from 'debug';

import { ExampleCollection } from '/imports/api/example/example.js';
import { subscriptionHandlers, subscriptionHandlersHelpers } from '/client/lib/subscription-handlers.js';
import { routeMap } from '/imports/api/helpers/both/routes/routes.js';
import { publicationNames } from '/imports/api/helpers/both/publication-names.js';
import pkgJson from '/package.json';

const debug = logFactory(`@${pkgJson.name}${__filename}`);

const EXAMPLE_LIST_ON_CREATED = function onCreated() {
  const instance = this;
  const dataLoading = instance.dataLoading = new ReactiveVar(true);
  const dataLoadingErrors = instance.dataLoadingErrors = new ReactiveDict();
  const EXAMPLE_PUBLICATION_HANDLERS = subscriptionHandlers({ dataLoading, dataLoadingErrors, debug });

  instance.subscribe(publicationNames.EXAMPLE_PUBLICATION, EXAMPLE_PUBLICATION_HANDLERS);
};

const helpers = {
  list: () => ExampleCollection.find(),
  exampleEditPage: () => routeMap.EXAMPLE_EDIT.name,
};

export const EXAMPLE_LIST_HELPERS = { ...helpers, ...subscriptionHandlersHelpers() };

Template.EXAMPLE_LIST.onCreated(EXAMPLE_LIST_ON_CREATED);
Template.EXAMPLE_LIST.helpers(EXAMPLE_LIST_HELPERS);
