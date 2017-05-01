import { ExampleCollection } from 'meteor/justinr1234:example';

const seeds = [
  { name: 'Basket', quantity: 3 },
  { name: 'Bicycle', quantity: 2 },
];

if (ExampleCollection.find().count() === 0) {
  seeds.forEach(e => ExampleCollection.insert(e));
}
