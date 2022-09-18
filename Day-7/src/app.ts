console.log('mayank');
// Interfaces;
// an interface is used to describe the structure of the object
interface Person {
  // Here I will add field type or property
  name: string;
  age: number;
  // BUT interface cannot assign vlaue to fields etc.
  greet(phrase: string): void;
}
// We can use interface to type the example like
let user1: Person;
user1 = {
  name: 'mayank',
  age: 21,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  },
};

user1.greet('Hello!! I am ');
// We can replace interface with type Person = {} for getting the same output here
// BUT interfaces are different from type in
// Interface is only used to define objects
// u can implement interface with a class
// Interface differ from abstract classes in as abstract overrides the classes while interfaces have concrete implementation part
interface Named {
  readonly name?: string;
  outputName?: string; // this makes this property optional
  // we can also assign optional methods as
  // op tional! => myOptionalMethod?() {}
}
// interface Named inherited by Greeatable
interface Greeatable extends Named {
  greet(phrase: string): void;
}
// We can implement multiple interfaces in a cleas that is where interfaces varies from inheritence
class Person1 implements Greeatable, Named {
  name?: string;
  // We can also have option property for classlike
  // now is optional in contructor
  constructor(n?: string) {
    // we can provide default value or make it optional
    if (n) {
      this.name = n;
    }
  }
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}

let user2: Person1;
user2 = {
  name: 'mayank',
  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    } else {
      console.log('hi no name');
    }
  },
};
let user3: Greeatable;
user3 = new Person1('amyank');
user3 = new Person1(); // now this wil we allowed as n is optional
console.log(user3);
user2.greet('Hello this interface implementation of class');

// It is useful where we know that there has to be a containing something than we can implement the interface which forces the class to implement something we want
// It allows not knowing about everthying a object consist but only necessary details tha t are made compulsive
// U cannot add private or public in a interface but it can have read only
// U can implement inheritence in interface
// we can merge multiple  interfaces means multiple inheritence is allowed
// which is not the case for class
// Interface can be used to define the structue of the functions i.e the work as a function type
// type Addfn = ( a: number, b: number) => number;
// this can we written in interface as
interface Addfn {
  (a: number, b: number): number; // the return type must be initiated by : NOT =>
}
let add: Addfn;
add = (n1: number, n2: number) => {
  return n1 + n2;
};

// we can asign optional properties in  Interface
// If we assign a optional property in class as optional than there wil we error
// JS doesn't have interface and no output for interface is genrated.

