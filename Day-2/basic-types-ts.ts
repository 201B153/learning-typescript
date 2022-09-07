// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string] // the role here is tuple now!!
// } = {
//   // This is better appraoch
//   name: 'mayank',
//   age: 21,
//   hobbies: ['writing', 'listening music'],
//   role: [2, 'author']
// };
// push() is a speacila case allowed in tuples. BUT
// person.role = [0, 'admin', 'user'] // is not allowed   
// person.role.push('admin') // we can do that due to it bieng multi type array
// person.role[1] = 10; // get error when using tuple

let singleStringArray: string;
let multipleStringArray: string[]; // any[] is for multiple types
singleStringArray = 'string', 'hello',
// multipleStringArray = 'string' // error bcz single string cannot be accesed
// it should be 
multipleStringArray = ['string', 'hello']


// const person: { // {} -> this is intandation for object in js
//   name: string;
//   age: number;
// } = {
//   name: 'mayank',
//   age: 21,
// };


const product = {
    id: 'abc', // type-> string
    price: 12, // type -> number
    tags: ['grt-off', 12], // here stype will be string[] and vaires from  (string | number)[]
    details: {
        title: 'red', // type-> string
        desc: 'A grt red', // type-> string
    },
};

// this can we done with enum but js approach will we initializing global variables like
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
// whereas using enum we can do it as
enum Role { ADMIN, READ_ONLY, AUTHOR }; // First letter capital always for enum
// Speacial nos can alsobe assigned to ADMIN etc and other will follow suite of the first one.
// OR can we written as { ADMIN = 'ADMINDT', READ_ONLY = 100 }
// We can also use any OR any[] type for ts behave as js.
const person = {
  // This is better appraoch
  name: 'mayank',
  age: 21,
  hobbies: ['writing', 'listening music'],
  role: Role.ADMIN
};

if (person.role === Role.ADMIN) {
    console.log('is admin user');
}
console.log(person.name);
// in js
// for (const hobby of person.hobbies) {
//     console.log(hobby);
// }
for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase()); // we can apply any functionalities that of string due to types
    // console.log(hobby.map()); // Here will we Error as map is avl only for array
}

