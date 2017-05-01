import { Meteor } from 'meteor/meteor';
import { ExampleCollection, publicationNames } from 'meteor/justinr1234:example';

const publication = function publication() {
  const pub = this;
  const { userId } = pub;
  return ExampleCollection.find({ userId });
};

Meteor.publish(publicationNames.EXAMPLE_PUBLICATION, publication);
