import { Meteor } from 'meteor/meteor';
import { ExampleCollection } from '/imports/api/example/example.js';
import { publicationNames } from '/imports/api/helpers/both/publication-names.js';

const EXAMPLE_PUBLICATION_FUNCTION = function publication() {
  const pub = this;
  const { userId } = pub;
  return ExampleCollection.find({ userId });
};

Meteor.publish(publicationNames.EXAMPLE_PUBLICATION, EXAMPLE_PUBLICATION_FUNCTION);
