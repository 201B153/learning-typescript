console.log('mayank'); // Comments for this file are present in class&interfaces.tsc.pdf
abstract class Department {
  //static property will something like
  // BUT they are not accesible in not static method and properties of the class
  // while still can be accesed inside non-static by calling whole Department.fiscalyear
  static fiscalyear = 2022;

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
  // private employees: string[] = [];
  protected employees: string[] = []; // protected is accessible to other classes

  //   constructor(n: string) { // This will look like
  // constructor cannot be static
  constructor(protected readonly id: string, public name: string) {
    // readonly makes the kay unchangeable
    // this.name = n;
    // this.id = id;
    // The above can be written as shown up
  }
  // Prototype are pure js topic.

  
    // describe(this: Department) {
    //   console.log(`Department (${this.id}): ${this.name}`);
    // }
  
    // the abstract describe will lokk like 
  
    abstract describe(this: Department): void;
  // forcess all classes to overirde it
  // we also need to add abstract to main class as well
  // console.log('Accounting dep. -ID: ' + this.id);


  // For making a method that is accesible without the class Department is
  static createEmployee(name: string) {
    // makes it accesible withput class
    return { name: name };
  }

  addEmployees(employee: string) {
    this.employees.push(employee);
  }

  printEmployee() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// const accounting = new Department('d1', 'accounting');
// const accountingCopy = { name: 'm', describe: accounting.describe };
// accounting.addEmployees('mayank');
// accounting.addEmployees('tomar');
// accounting.describe();
// accounting.printEmployee();
// console.log(accounting);

// we can now add employee directly by callying it like
const employee1 = Department.createEmployee('mayank singh');
console.log(employee1);
console.log(employee1, Department.fiscalyear);

//short hand initialization
class Product {
  title: string;
  price: number;
  private isListed: boolean;

  constructor(name: string, pr: number, listed: boolean) {
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

// Inheritence
class ItDepartment extends Department {
  //inheriting from Department
  //It will inherit everything from Department class including contructors
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT'); // when initializing the inherited classs contructor one must call SUPER as a function to call the other classs contructor
    // it will call constructor of class from subclass
    // super must be caaled first ythen only we can add other things related to the subclass
    this.admins = admins; //this must be used after super
  }
  describe() {
    console.log('It dept' + this.id);
  }
}

const accounting1 = new ItDepartment('d1', ['accounting']);
console.log(accounting1);

class AccountingDepartment extends Department {
  private lastReport: string;

  // used when constructor is private to make new instanmce
// private static instance: AccountingDepartment;

  // Setters are used almost the same way as of the getter
  // It sets value to the any thing passed in it
  set mostRecentReports(value: string) {
    if (!value) {
      throw new Error('pass a value');
    }
    this.addReport(value);
  }

  get mostRecentReports() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('no reports found');
  }
  // We can use Getter to make it accesible to other methods
  // getter is basically a property to execute a function
  // Getter method must return something
 constructor(id: string, private reports: string[]) {  // private constructor makes the class uncallabl efrom new
    super(id, 'ACT');
    this.lastReport = reports[0];
  }
  // for singeltons use private constructor
// private constructor(id: string, private reports: string[]) {  // private constructor makes the class uncallabl efrom new
//     super(id, 'ACT');
//     this.lastReport = reports[0];
//   }


// used when to make class accesible a form of intancs
// static getInsatnce() {
//   if (AccountingDepartment.instance) {
//     return this.instance;
//   }
//   this.instance = new AccountingDepartment('d2', []);
// }

   describe(this: AccountingDepartment) {
      console.log('Accounting Dept' + this.id);
    }

  addEmployee(name: string) {
    if (name === 'mayank') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}
const accounting2 = new AccountingDepartment('d2', []);
//

// since we now cannot call new object we can only provide methods in the form of sattic methods and propertires
// now we will callit like 
// for private constructor.....
// const accounting2 = AccountingDepartment.getInsatnce();
// const accounting3 = AccountingDepartment.getInsatnce();
// console.log(accounting2, accounting3);

accounting2.addReport('some textfiel');
accounting2.mostRecentReports = 'year end report'; //Here also use setter as PROPERTY in place of method
console.log(accounting2.mostRecentReports); // Execute getter as a PROPERTY in place of as a method.
accounting2.printReports();

accounting2.describe();

// Overriding like adding own addEmplyee method in AccountDepartment

// private properties can not be accesed from sub calsses only main class can access it
// therefore protected is used in place of private as protected is extensible from other classes of main class
//
// now on adding 'mayank it shouldnot work while work for 'others'
accounting2.addEmployee('mayank');
accounting2.addEmployee('tomara');
accounting2.printEmployee(); // this will result in tomar in place of mayank as
// printEmployee() is Overrided in AccountDepartment()

// Static methods  and properties are used a namespace; they are used to comibne multiple classes and are not required to call with new
// for ex. Math is static method t use PI, pow() etc.


// abstract is ussed to force all the classes to do saomething like describe 

// singletons are usefull if u have to amke the constructor private
// and make the class static itself