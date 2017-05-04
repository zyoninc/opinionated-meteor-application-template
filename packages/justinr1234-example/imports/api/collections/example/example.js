import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Security } from 'meteor/justinr1234:lib';

export const ExampleCollectionName = 'Example';

export const ExampleCollection = new Mongo.Collection(ExampleCollectionName);

export const ExampleSchema = new SimpleSchema({
  name: {
    label: 'Name',
    type: String,
    optional: false,
    max: 20,
    autoform: {
      group: 'Example',
      placeholder: 'Bicycle',
    },
  },
  quantity: {
    label: 'Quantity',
    type: Number,
    optional: false,
    autoform: {
      group: 'Example',
      placeholder: '3',
    },
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function autoValue(form) {
      // this.userId is not instantiated on test runs, therefore { userId }
      // are passed into schema instances in tests
      return this.userId || form.userId;
    },
    autoform: {
      type: 'hidden',
      label: false,
    },
  },
});

ExampleCollection.attachSchema(ExampleSchema);

if (Meteor.isServer) {
  Security
    .permit('insert')
    .collections([
      ExampleCollection,
    ])
    .ifLoggedIn()
    // TODO: Refactor to method - https://github.com/justinr1234/opinionated-meteor-application-template/issues/13
    .allowInClientCode();

  Security
    .permit('update')
    .collections([
      ExampleCollection,
    ])
    .ifLoggedIn()
    .ownsDocument('userId')
    // TODO: Refactor to method - https://github.com/justinr1234/opinionated-meteor-application-template/issues/13
    .allowInClientCode();

  Security
    .permit('remove')
    .collections([
      ExampleCollection,
    ])
    .ifLoggedIn()
    .ownsDocument('userId')
    // TODO: Refactor to method - https://github.com/justinr1234/opinionated-meteor-application-template/issues/13
    .allowInClientCode();
}
