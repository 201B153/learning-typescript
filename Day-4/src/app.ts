console.log('mayank');

const userName = 'mayank';
let age = 21;
// age can we reset many times as it is a variable while const is constant and cannot be reset

// var have global and function scope
// function in var
// var and let have same functionalities
// AND the diff is that let is a block statement based while var is not
// var result; // global scope
function add(a: number, b: number) {
  var result; // functional scope
  result = a + b;
  return result;
}

// Add function in arrow function
const add1 = (a: number, b: number) => {
  return a + b;
};
// OR for single statement write it as
const add2 = (a: number, b: number) => a + b;
// AND also single parameter function can be written as
const printOutput: (a: number | string) => void = (output) =>
  console.log(output);
// Or can write button code as
const button = document.querySelector('button');

if (button) {
  button.addEventListener('click', (event) => console.log(event));
}
// default argument should be assigned for last parameter like
// (a: number, b: number = 1) NOt like (a: number =1, b: number)