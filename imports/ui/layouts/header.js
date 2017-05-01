import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { Router } from 'meteor/justinr1234:lib';

const HEADER_HELPERS = {
  homePage: () => Router.routeMap.HOME_PAGE.path,
  exampleAddPage: () => Router.routeMap.EXAMPLE_ADD.path,
  exampleListPage: () => Router.routeMap.EXAMPLE_LIST.path,
  routes: () => _.map(Router.routeMap, route => route),
};

Template.Header.helpers(HEADER_HELPERS);
