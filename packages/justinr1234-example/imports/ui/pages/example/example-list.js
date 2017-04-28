import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ExampleCollection, publicationNames, pkgJson } from 'meteor/justinr1234:example';
import { subscriptionHandlers, subscriptionHandlersHelpers, Router, logFactory } from 'meteor/justinr1234:lib';

const debug = logFactory(pkgJson.name, __filename);

const onCreated = function onCreated() {
  const instance = this;
  const dataLoading = instance.dataLoading = new ReactiveVar(true);
  const dataLoadingErrors = instance.dataLoadingErrors = new ReactiveDict();
  const composedHandlers = subscriptionHandlers({ dataLoading, dataLoadingErrors, debug });

  instance.subscribe(publicationNames.EXAMPLE_PUBLICATION, composedHandlers);
};

const helpers = {
  list: () => ExampleCollection.find(),
  exampleEditPage: () => Router.routeMap.EXAMPLE_EDIT.name,
};

export const composedHelpers = { ...helpers, ...subscriptionHandlersHelpers() };

Template.EXAMPLE_LIST.onCreated(onCreated);
Template.EXAMPLE_LIST.helpers(composedHelpers);
