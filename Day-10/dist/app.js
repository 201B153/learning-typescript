"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
function Logger(lohString) {
    return function (constructor) {
        console.log('Logging..');
        console.log(lohString);
        console.log(constructor);
    };
}
// @ ts recognises as special symbol
// Now for factory we must execute decorator as function
// @Logger // for normal class decorator
let Person = 
// Now we can addd additional value and pass values to decorators just like functin
class Person {
    constructor() {
        this.name = 'mayank';
        console.log('Creted a person');
    }
};
Person = __decorate([
    Logger('Logging-Person')
    // Now we can addd additional value and pass values to decorators just like functin
], Person);
const person = new Person();
console.log(person);
