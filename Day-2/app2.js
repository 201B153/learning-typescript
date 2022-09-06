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
var singleStringArray;
var multipleStringArray; // any[] is for multiple types
singleStringArray = 'string', 'hello',
    // multipleStringArray = 'string' // error bcz single string cannot be accesed
    // it should be 
    multipleStringArray = ['string', 'hello'];
// const person: { // {} -> this is intandation for object in js
//   name: string;
//   age: number;
// } = {
//   name: 'mayank',
//   age: 21,
// };
var product = {
    id: 'abc',
    price: 12,
    tags: ['grt-off', 12],
    details: {
        title: 'red',
        desc: 'A grt red'
    }
};
// this can we done with enum but js approach will we initializing global variables like
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
// whereas using enum we can do it as
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
; // First letter capital always for enum
var person = {
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
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase()); // we can apply any functionalities that of string due to types
    // console.log(hobby.map()); // Here will we Error as map is avl only for array
}
