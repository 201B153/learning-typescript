console.log('mayank');
// Generics does't exist in JS
const names = ['mayank', 'tomar'];
// Array is generic type
// which is connected to another type
// like generic type of Array will look like
const names1: Array<string> = []; // Generic connects one type like array to another type like string using generic
// the above example can be interpreted as
// const names3: string[] = []
names1[0].split(' ');
// this means array type will store string
// U cannot create a promise using ts
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is done');
  }, 2000);
});
// Promise is generic in ts
// we can fix the return type for promise like all other genric items
promise.then((data) => {
  // If not for generic we will not get any data related informatioon from retuen type
  data.split(' ');
});
// Array knows which type of data it will store while
// Promise knows which type of data it will return

// Let's build our own generic type
// function that merges two objects and returns a new object
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
  // we can assign multiple generic type to single function or class
  // Generally use single didgit keyword for generics
  // assign is inbuild function in js that can combine two objects into one
}

const mergedObj = merge({ name: 'mayank' }, { age: 21 });
// we can assign any type of obj in mergeObj and generic will auto adjust to the type required
console.log(merge({ name: 'mayank' }, { age: 21 }));
// const mergedObj = merge({ name: 'mayank' }, { age: 21 }) as {name: string, age: number};
// we can always solve this with type casting but it will hacktic
// so use generic like
mergedObj.age;
console.log(mergedObj.age);

// Constraints
// for restraining genric types we use contsraints
// it is like inheritence of types for example
function merge1<T extends object, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
// This will make sure that we only pass object as objA and objB
const mergedObj1 = merge({ name: 'mayank' }, { age: 21 });
console.log(mergedObj1.age);

// lentgh is not sure thing for ts so
interface Length {
  length: number;
}
function countAndprint<T extends Length>(element: T): [T, string] {
  // To be more specific we can set return type to be array or anything else
  // first element will be off of genric type while other will be off array or ouput type
  let descriptionText = 'No value';
  if (element.length === 1) {
    descriptionText = 'Got 1 elemnt  ';
  }
  if (element.length > 1) {
    descriptionText = 'Got  ' + element.length + ' elements';
  }
  return [element, descriptionText];
}
console.log(countAndprint('hi, there generic'));

// the keyoff contraint
function extractAndconvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  //the key of contraint which sates the key of other genric type
  // Also that the key is the property of first type
  return 'Value' + obj[key];
}

console.log(extractAndconvert({ name: 'Max' }, 'name'));

// Generic classes
class DataStorage<T> {
  private data: T[] = [];

  additem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItem() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.additem('mayank');
textStorage.additem('tomar');
textStorage.removeItem('tomar');
console.log(textStorage.getItem());

const numberStorage = new DataStorage<number | boolean>();
// just like this we ca give genric class any type we want and canchange later
// Use class for primitive type in genric class
// bcz of that issue objects are rarely used in generic class as type
const objStorage = new DataStorage<object>();
objStorage.additem({ name: 'mayank' });
objStorage.additem({ name: 'tomar' });
objStorage.removeItem({ name: 'tomar' });
console.log(objStorage.getItem());
// we cannot remove refercence like objs

// Generic type give us flexibility combine with type safety
// Array and promise are built in genric type

// BUILT-IN types
// PARTIAL type
interface Course {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourse(title: string, description: string, date: Date): Course {
  // return { title: title, description: description, completeUtil: date};
  let course: Partial<Course> = {};
  // Partial type make s all the values in type an optional value 
  course.title = title;
  course.description = description;
  course.completeUntil = date;
  return course as Course;
}

// READONLY type
// marks the property method or anything not editable 
const names4: Readonly<string[]> = ['mayank', 'hello'];
// Cannot acess them
// names4.push('toamr')
// names4.pop('toamr')

// Union type have limitation on type changing while generics allow auto change of type
// union allows changing type in mid while genric doesn't
// generics locks a type for whole class or function while union type is flexible

