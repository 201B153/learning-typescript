// OR we can use custom or type aliases in place of using multiple union types
type CombinedUnionType = number | string; // Start with Capital letter and stores union types
type CombinedLiteralType = 'as-number' | 'as-text'; // stores combined literal types
// Can also store complex Object types
type User = { name: string; age: number };
const u1: User = { name: 'mayank', age: 21 }; // this will call User Object type we created.
type User1 = {name: string } | string;
let u2: User1 = {name: 'mayank'};
u2 = 'tomar'; 

function combine(
  index1: CombinedUnionType,
  index2: CombinedUnionType,
  //   resultConversion: string
  //   resultConversion: 'as-number' | 'as-text' // this is a literal type
  resultConversion: CombinedLiteralType
) {
  let result;
  if (
    (typeof index1 === 'number' && typeof index2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    result = +index1 + +index2;
  } else {
    result = index1.toString() + index2.toString();
  }
  return result;
  // in place of using all below code be can use || in above case
  //   if (resultConversion === 'as-number') {
  //     return +result;
  //   } else {
  //       return result.toString();
  //   }
}

const combineAges = combine(20, 26, 'as-number');
console.log(combineAges);

const combineStringAges = combine('20', '26', 'as-number');
console.log(combineStringAges);

const combinedNames = combine('may', 'ank', 'as-text'); // concatenantion will fail as types don't match BUT
// union of two is allowed fot both access.
console.log(combinedNames);

// Complex Object Alias Type help in fooling way:
// without alias type
function greet(user: { name: string; age: number }) {
  console.log('Hi I am' + user.name);
}

function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}

//with Alias type can we written as User
function greet2(user: User) {
  console.log('Hi I am ' + user.name);
}

function isOlder2(user: User, checkAge: number) {
  return checkAge > user.age;
}
// This wil throw error as User contains (number | string) type while u1 asks for (string | numberr)[] type
// type User = {name: string; age: number};
// const u1: User = ['Max', 29];