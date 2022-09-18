"use strict";
console.log('mayank');
// We can use interface to type the example like
let user1;
user1 = {
    name: 'mayank',
    age: 21,
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    },
};
user1.greet('Hello!! I am ');
// We can implement multiple interfaces in a cleas that is where interfaces varies from inheritence
class Person1 {
    // We can also have option property for classlike
    // now is optional in contructor
    constructor(n) {
        // we can provide default value or make it optional
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
}
let user2;
user2 = {
    name: 'mayank',
    greet(phrase) {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        }
        else {
            console.log('hi no name');
        }
    },
};
let user3;
user3 = new Person1('amyank');
user3 = new Person1(); // now this wil we allowed as n is optional
console.log(user3);
user2.greet('Hello this interface implementation of class');
let add;
add = (n1, n2) => {
    return n1 + n2;
};
// we can asign optional properties in  Interface
// If we assign a optional property in class as optional than there wil we error
// JS doesn't have interface and no output for interface is genrated.
