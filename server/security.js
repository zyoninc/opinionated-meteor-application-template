import { Security } from 'meteor/ongoworks:security';

import { ExampleCollection } from '/imports/api/example/example.js';

Security.defineMethod('ownsDocument', {
  fetch: [],
  allow: function allow(type, field, userId, doc) {
    return userId === doc[field || 'userId'];
  },
});

Security
  .permit('insert')
  .collections([
    ExampleCollection,
  ])
  .ifLoggedIn()
  .allowInClientCode();

Security
  .permit('update')
  .collections([
    ExampleCollection,
  ])
  .ifLoggedIn()
  .ownsDocument('userId')
  .allowInClientCode();
