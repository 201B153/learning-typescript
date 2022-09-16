console.log('mayank');
const add = (a: number, b: number = 1) => a + b;

const printOutput: (a: number | string) => void = output => console.log(output);

const button = document.querySelector('button');
 
if (button) {
    button.addEventListener('click', event => console.log(event));
}

printOutput(add(5));// default argument for b which is 1 allows b to be fixed and passing value sto a
// We cannot assign default argument to a as default parameter is passed to first value.

// let's add array
const hobbies =['Sports', 'Cooking'];
const activeHobbies = ['Hikig', ...hobbies];// we can to conat as array bcz array is an object and we canpush to reference values

// activeHobbies.push(hobbies[0], hobbies[1]);  // we can push multiple aruments in array but it had to arranged in given form
// the above code is lumbersome and can be written as 
activeHobbies.push(...hobbies)// spear Operator does is that it place array values hereever it called with the array
// Spread Operator is really usefull in pulling out the elemnts of an array.

// For Example
const person = {
    name1: 'mayank',
    age: 30
};

const copiedPerson = person; // copiedperson works as a pointer to place on the person object
// this statement can also be written as 
const copiedPerson1 = { ...person } // all the key value pair will be called where ever the spread Operator is called

// Rest Functions
// That i.e ...numbers is REST paprameter
const add1 = (...numbers: number[]) => { //now spred function will comiben all the list elements into one and pass it to the add1 function
    return numbers.reduce((currentResult, curValue) => {
        return currentResult + curValue; // reduce combine the result and the current value together i.e works like for loop
    }, 0);
};
// Here we wish to pass multiple numbers to the add function and the nos can be flexible
// in place like this rest function are used
const addedNumbers = add1(4, 19, 12, 232, 4);
console.log(addedNumbers);

// Array And Object Destructuring
//Array destructing allows us to shorten the code when retring value from an array
const [hobby1, hobby2, ...remainingHobbies] = hobbies; //stores values in hobby1 and hobby2 for hobbies array
// array destructing do not change arrays 
console.log(hobbies, hobby1);

// Object destructuring
// Note that we are not assigning object type here i.e const: {}
const {name1: userName, age}  = person; // name1 will now store in userName
// In Array destructuring Order is fixed but it is not in object destructuring 
// therefore in object destructuring we have provide key to set order
console.log(userName, age, person);
// person object doesn' t change we just really take value copy

