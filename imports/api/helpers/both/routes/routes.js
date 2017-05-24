import { FlowRouter } from 'meteor/kadira:flow-router';
import { APP_NOT_FOUND, defaultBlazeRender, Router } from 'meteor/justinr1234:lib';

// Routes will inherit default properties for common fields that are omitted below
// Info:
//  a) Group paths begin and end with / (e.g. /example/)
//  b) Child paths begin with the group and end WITHOUT a / (e.g. /example/add)
//  c) Root pages work just like any other child as in (b) (e.b. /home)
export const routes = {
  ROOT: {
    path: '/',
    action: () => defaultBlazeRender('HOME_PAGE'),
  },
  HOME_PAGE: {
    path: '/home',
  },
};

export const notFound = {
  action: () => defaultBlazeRender(APP_NOT_FOUND),
};

FlowRouter.notFound = notFound;

const insertAtFront = true;
Router.addRoutes(routes, insertAtFront);
