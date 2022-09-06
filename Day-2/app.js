function add(n1, n2, showResult, phrase) {
    // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    //   throw new Error('incorrect type input');
    // } else {
    // return n1 + n2;
    // }
    var result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return result;
    }
}
// const num1 = '5';
var num1 = 5;
console.log(typeof num1);
var num2 = 2.78; // what js does is it converts 2.78 to string to concatenate each other
// constant for const and variable for let
var printResult = true;
var resultPhrase = 'Result is: ';
var result = add(num1, num2, printResult, resultPhrase);
// console.log(result);
