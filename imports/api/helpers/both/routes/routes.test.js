// /* eslint-env mocha */
//
// import { FlowRouter } from 'meteor/kadira:flow-router';
// import { _ } from 'meteor/underscore';
// import { chai } from 'meteor/practicalmeteor:chai';
// import { routes, routeMap, routeGroups, routesByGroup, notFound } from '/imports/api/helpers/both/routes/routes.js';
//
// const { assert } = chai;
//
// describe('Routes', () => {
//   it('should export a route map', () => {
//     assert.ok(routeMap, 'Route map should exist');
//     assert.equal(Object.keys(routeMap).length, Object.keys(routes).length);
//   });
//   it('should export route groups', () => {
//     assert.ok(routeGroups, 'Route groups should exist');
//   });
//   it('should export routes by group', () => {
//     assert.ok(routesByGroup, 'Routes by group should exist');
//     const totalRoutes = _.reduce(routesByGroup, (t, g) => t + g.routes.length, 0);
//     assert.equal(totalRoutes, Object.keys(routes).length, 'Total routes incorrect');
//   });
//   it('should set FlowRouter not found', () => {
//     assert.equal(FlowRouter.notFound, notFound, 'FlowRouter notFound unexpected value');
//   });
//   it('should have dynamic property child routes listed last', () => {
//     // EXAMPLE: {
//     //   path: '/example/',
//     // },
//     // EXAMPLE_ADD: {
//     //   path: '/example/add',
//     // },
//     // EXAMPLE_LIST: {
//     //   path: '/example/list',
//     // },
//     // ********
//     // EXAMPLE_EDIT SHOULD BE LISTED LAST AS IT IS DYNAMIC CATCH-ALL
//     // ********
//     // EXAMPLE_EDIT: {
//     //   path: '/example/:_id',
//     // },
//     _.each(routesByGroup, g => {
//       const dynamicObject = _.find(g.routes, ({ path }) => path.includes(':'));
//       const dynamicIndex = _.indexOf(g.routes, dynamicObject);
//       if (dynamicIndex !== -1) {
//         assert.equal(dynamicIndex, g.routes.length - 1);
//       }
//     });
//   });
// });
