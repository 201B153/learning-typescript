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
function Logger(lohString: string) {
  return function (constructor: Function) {
    console.log('Logging..');
    console.log(lohString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  // return function (constructor: Function) {
  return function (_: Function) {
    // Here constructor is not utilised so be can use _ inplace of constructor to tell ts that constructor type is not required
    console.log('Render Heading');
    const hookEl = document.getElementById(hookId);
    if (hookEl) {
      hookEl.innerHTML = template;
    }
  };
}
// decorators allow many functionalities like calling class objects like
// Angular use Decotrators to describe components
// Angular uses classes and decorators to render components
function WithTemplate1(template: string, hookId: string) {
  console.log('TEMPLATE-CLASS-DECORATOR');
  // to egt through type error covert function into generic function
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // the above genric code tells that
    // T can have any new type with as many as arguments and return a object
    // we can return in class Decorators
    return class extends originalConstructor {
      constructor(..._: any) {
        // _ will tell ts that we know taht we are not using args
        super();
        // to call the constructor function inside the constructor
        // Now we can move all the external constructor conetnt to the inside one
        console.log('Render Name');
        const hookEl = document.getElementById(hookId);
        // const p = new originalConstructor();
        if (hookEl) {
          hookEl.innerHTML = template;
          // now we dont need to create object p we can directly execute name by this
          // hookEl.querySelector('h1')!.textContent = p.name;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
    // here we will we returning constructor to original constructor
  };
}
// we can use multiple decorators attached to a single funvtion or class
// the executing order of decorators is BOTTOM-UP

// @ ts recognises as special symbol
// Now for factory we must execute decorator as function
// @Logger // for normal class decorator
@Logger('Logging-Person')
// Now we can addd additional value and pass values to decorators just like functin
// decorator to render heading tag
// @WithTemplate('<h1>My person Object</h1>', 'app')
// to render name on screen use below one
@WithTemplate1('<h1>My person Object</h1>', 'app')
// Make sure to close the html tag
class Person {
  name = 'mayank';

  constructor() {
    console.log('Creted a person');
  }
}
// If we donot initaite a class then the decorators still execute
const person = new Person();
console.log(person);

// Other places where decorators can be used

// properry decorator
function Log(target: any, propertyName: string | number) {
  // This is just a decorator
  console.log('Property Decorator');
  console.log(target, propertyName);
}
// Accessor Decorators
function Log2(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  console.log('Accessor Decortator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
  // we can return PropertyDescriptor for Accessor decorators
  return {}; // we can also access properties of descriptor from here and can even mod them!!
}

// Method Decorators
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method Decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
  // Something Interresting of method decorator
  return {};
}

// Parameter Decorator
function Log4(target: any, name: string | Symbol, position: number) {
  // name here is not of property but name of the method
  console.log('Parameter Decorator');
  console.log(target);
  console.log(name);
  console.log(position);
}

// descriptor: PropertyDescriptor is used to describe which type of proprty are present there

// we need a class to use decorators
class Product {
  @Log
  // this will execute with when class is executed
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('negative price');
    }
  }
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this.price * (1 + tax);
  }
}

// Decorator execute without even creating object
// They execute when the class is defined
const p1 = new Product('kg', 12);
const p2 = new Product('kg1', 112);

// class , accessors and method decorators can return something
// return are not supprted for parameter decorator
// we can also return other classes from decorators

// Here we are making decorator that performs binding of eventlistners like below
// This is only applicable for Method decorator
function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this); // this will refere to object to original method
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = 'This Button Works';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
// But this is JS method for ts be can use
button.addEventListener('click', p.showMessage.bind(p));
// Decorator for replacing bind in ts
button.addEventListener('click', p.showMessage);
// we cannot use addeventlistner alone for showing message but, we can outrun the issue by
// making it use bind(p)

// We can also use class-validator from typesatck in place of given
// To make validation work we first initiate
interface ValidationConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}

const registeredValidators: ValidationConfig = {};

// Decorator for avlidation of course
function Requiredd(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required'],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive'],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    console.log(prop);
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Requiredd
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  // Now for course validation we can use if check
  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('invalid input!!');
    return;
  }
  console.log(createdCourse);
});
// This is a way of adding validation to the classes
// nest and angulr use decorators heavily in meta programming. 