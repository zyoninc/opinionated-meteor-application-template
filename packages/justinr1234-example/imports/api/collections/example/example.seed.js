import { Meteor } from 'meteor/meteor';
import { logFactory } from 'meteor/justinr1234:lib';
import { ExampleCollection, pkgJson } from 'meteor/justinr1234:example';

const debug = logFactory(pkgJson.name, __filename);

if (ExampleCollection.find().count() === 0) {
  const userId = (Meteor.users.findOne({ username: Meteor.settings.defaultAccount.username }) || {})._id;

  if (!userId) {
    debug('Can\'t seed ExampleCollection because user doesn\'t exist from Meteor.settings.defaultAccount.username');
  } else {
    const seeds = [
      { name: 'Basket', quantity: 3, userId },
      { name: 'Bicycle', quantity: 2, userId },
    ];
    seeds.forEach(e => ExampleCollection.insert(e));
    debug('Successfully seeded ExampleCollection');
  }
} else {
  debug('Skipping ExampleCollection seeding because entries already exist');
}
