import { ExampleCollection } from 'meteor/justinr1234:example';
import { Meteor } from 'meteor/meteor';

if (ExampleCollection.find().count() === 0) {
  const userId = Meteor.users.findOne({ username: Meteor.settings.defaultAccount.username })._id;
  const seeds = [
    { name: 'Basket', quantity: 3, userId },
    { name: 'Bicycle', quantity: 2, userId },
  ];
  seeds.forEach(e => ExampleCollection.insert(e));
}
