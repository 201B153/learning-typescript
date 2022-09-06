function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
  //   throw new Error('incorrect type input');
  // } else {
  // return n1 + n2;
  // }
  let result = n1 + n2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}
//  can also be written as 
let num1: number; // this is a way to assign
num1 = 5;
// const num1 = '5';
// const num1 = 5;
console.log(typeof num1);
const num2 = 2.78; // what js does is it converts 2.78 to string to concatenate each other
// constant for const and variable for let
const printResult = true;
const resultPhrase = 'Result is: '

const result = add(num1, num2, printResult, resultPhrase);
// console.log(result);
