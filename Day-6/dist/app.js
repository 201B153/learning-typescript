"use strict";
console.log('mayank'); // Comments for this file are present in class&interfaces.tsc.pdf
class Department {
    //   constructor(n: string) { // This will look like
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // Private makes the field or method only accesible inside a class.
        //   private name: string;
        //   private readonly id: string;
        //   private employees: string[] = [];
        //   constructor(n: string) {
        //     this.name = n;
        //   }
        // The above all can also be written in shorthand way i.e.
        //   private name: string;
        //   private readonly id: string;
        //   private id: string;
        this.employees = [];
        // readonly makes the kay unchangeable
        // this.name = n;
        // this.id = id;
        // The above can be written as shown up
    }
    // Prototype are pure js topic.
    describe() {
        console.log(`Department (${this.id}): ${this.name}`);
    }
    addEmployees(employee) {
        this.employees.push(employee);
    }
    printEmployee() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
const accounting = new Department('d1', 'accounting');
const accountingCopy = { name: 'm', describe: accounting.describe };
accounting.addEmployees('mayank');
accounting.addEmployees('tomar');
accounting.describe();
accounting.printEmployee();
console.log(accounting);
//short hand initialization
class Product {
    constructor(name, pr, listed) {
        this.title = name;
        this.price = pr;
        this.isListed = listed;
    }
}
// The above code can be shortened to
// class Product1 {
//   private isListed: boolean;
//   contructor(public title: string, public price: number) {
//     this.isListed = true;
//   }
// }
