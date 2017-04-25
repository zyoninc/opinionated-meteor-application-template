import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ExampleCollection = new Mongo.Collection('Example');

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
      /* this.userId is not instantiated on test runs, therefore { userId }
       are passed into schema instances in tests 1/11/2017 */
      return this.userId || form.userId;
    },
    autoform: {
      type: 'hidden',
      label: false,
    },
  },
});

ExampleCollection.attachSchema(ExampleSchema);
