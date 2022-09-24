import _ from 'lodash';
import { Product } from './product.model';
import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

declare var GLOBAL: string;

console.log('mayank');
console.log(_.shuffle([1, 2, 4, 5]));

console.log(GLOBAL);

const products = [
  { title: 'A Car', price: 24.34 },
  { title: 'A sa', price: 23 },
];
// json data from backend doesn't have metadata for js  to undersatnd so we cannot directly clg it so
// using proper js and describing data in map function
const loadedProducts = products.map((product) => {
  return new Product(product.title, product.price);
});
for (const product of loadedProducts) {
  console.log(product.getInformation());
}
// OR
const loadedProducts1 = plainToInstance(Product, products);
for (const product of loadedProducts1) {
  console.log(product.getInformation());
}

// validator
const newProd = new Product('', -23);
validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log(errors);
    console.log('Validation Error');
  } else {
    console.log(newProd.getInformation());
  }
});

const p1 = new Product('A', 12.34);

console.log(p1.getInformation());
