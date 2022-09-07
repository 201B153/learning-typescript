function add(n1: number, n2: number): number {
  // : number will we the type of return
  return n1 + n2; // Here return type will we number
  //   return n1.toString() + n2.toString(); // Here return type will we string
}

function printResult(num: number): void {
  // Here return type will we void.
  console.log('Result: ' + num); // no need to write void ts automatically understands it
  // For functions which donot return anything void will we used
  // Fotr using undefined in ts function we need return somthing
  // void can also be used with return type.
}

printResult(add(23, 12));
console.log(printResult(add(23, 12))); //we will get undefined which is property fotr not existing

// let someValue: undefined; // can aslo we used
let combineValues: Function; // F of Function is always Capital.
// Here we are using function as a type to call in clg
// combineValues = 5; // Here we can pass number to a function and it will give runtime error so, use
// Use : Function type for associating a value to function type
combineValues = add;
console.log(combineValues(8, 8));

let combineValue2: (a: number, b: number) => number; // This is proper Function type
combineValue2 = add;
console.log(combineValue2(0, 78));
// now it wiill give error for mismatching type like
// combineValue2 = printResult; // Here printResult is any function

// Using Callbacks in function THEN
function addAndHandler(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result); // inplace of returniong we pass value to callback then
  // we can specify type to it as given and ask for no output.
}

// to call Callback
addAndHandler(1021, 123, (result) => {
  console.log(result); // Noreturn type in cb as return type is void.
}); // Handler->PassValue->CallsCallback->MeetCondition->PassValue->Execute

// this code will compile without any issue.
function sendRequest(data: string, cb: (response: any) => void) {
  // ... sending a request with "data"
  return cb({ data: 'Hi there!' });
}

sendRequest('Send this!', (response) => {
  console.log(response);
  return true;
});

