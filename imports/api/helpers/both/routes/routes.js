import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {
  APP_BODY,
  APP_NOT_FOUND,
  mergeTemplates,
  defaultTemplates,
  createRouteMap,
  routeGrouper,
  groupRoutesByGroup,
} from './util.js';

// Routes will inherit default properties for common fields that are omitted below
// Info:
//  a) Group paths begin and end with / (e.g. /example/)
//  b) Child paths begin with the group and end WITHOUT a / (e.g. /example/add)
//  c) Root pages work just like any other child as in (b) (e.b. /home)
export const routes = {
  ROOT: {
    path: '/',
    action: () => BlazeLayout.render(APP_BODY, mergeTemplates(defaultTemplates, { main: 'HOME_PAGE' })),
  },
  HOME_PAGE: {
    path: '/home',
  },
  APP_LOGIN: {
    path: '/login',
  },
  APP_REGISTER: {
    path: '/register',
  },
  EXAMPLE: {
    path: '/example/',
  },
  EXAMPLE_ADD: {
    path: '/example/add',
  },
  EXAMPLE_LIST: {
    path: '/example/list',
  },
  EXAMPLE_EDIT: {
    path: '/example/:_id',
  },
};

export const notFound = {
  action: () => BlazeLayout.render(APP_BODY, mergeTemplates(defaultTemplates, { main: APP_NOT_FOUND })),
};

FlowRouter.notFound = notFound;

export const routeMap = createRouteMap(routes) || [];
export const routeGroups = routeGrouper(routeMap);
export const routesByGroup = groupRoutesByGroup(routeGroups, routeMap);
