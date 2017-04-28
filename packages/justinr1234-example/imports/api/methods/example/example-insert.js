// import { Meteor } from 'meteor/meteor';
// import { ValidatedMethod } from 'meteor/validated-method';
// import { ExampleCollection, ExampleCollectionSchema, ExampleCollectionName } from 'meteor/justinr1234:example';
// import { JustinSecurity } from 'meteor/justinr1234:lib';
//
// export const exampleInsert = new ValidatedMethod({
//   name: `${ExampleCollectionName}.insert`,
//   validate: ExampleCollectionSchema.validator(),
//   run(doc) {
//     const userId = Meteor.userId();
//     JustinSecurity.can(userId).insert(doc).for(ExampleCollection).throw();
//   },
// });
