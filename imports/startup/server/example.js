import { ExampleCollection } from '/imports/api/example/example.js';

const seeds = [
  { name: 'Basket', quantity: 3 },
  { name: 'Bicycle', quantity: 2 },
];

if (ExampleCollection.find().count() === 0) {
  seeds.forEach(e => ExampleCollection.insert(e));
}
