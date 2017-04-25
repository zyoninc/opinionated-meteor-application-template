import { Template } from 'meteor/templating';
import { routeMap } from '/imports/api/helpers/both/routes/routes.js';

const HEADER_HELPERS = {
  homePage: () => routeMap.HOME_PAGE.path,
  exampleAddPage: () => routeMap.EXAMPLE_ADD.path,
  exampleListPage: () => routeMap.EXAMPLE_LIST.path,
};

Template.Header.helpers(HEADER_HELPERS);
