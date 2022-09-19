console.log('mayank');
// Decorators
// well suited in using for other developers
// Add experimentaldecoraors in tsconfig.json

// function Logger(constructor: Function) {
// we can use lower also but it is good
//     console.log('Logging..');
// Decorators initiate when the class is defined
//     console.log(constructor);
// }
// Decorator Factory
function Logger(lohString: string) {
  return function (constructor: Function) {
    console.log('Logging..');
    console.log(lohString);
    console.log(constructor);
  };
}
// @ ts recognises as special symbol
// Now for factory we must execute decorator as function
// @Logger // for normal class decorator
@Logger('Logging-Person')
// Now we can addd additional value and pass values to decorators just like functin
class Person {
  name = 'mayank';

  constructor() {
    console.log('Creted a person');
  }
}

const person = new Person();

console.log(person);
