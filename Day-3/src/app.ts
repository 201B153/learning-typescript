const userName = 'mayank';
let age: number;
age = 21;
// We can add watch mode in tsc file which will rerun the code after each change
// that is tsc app.ts -w
console.log(userName);
const userType = 'admin';
console.log(userType);

// For initiating a project in tsc OR to run all ts files in a folder nd corresponding subfolder
// RUN tsc --init  this will create tsconfig.json file which inidcates initialization of ts.
// and to compile all files aat once RUN tsc OR tsc -w to compile all ts files in folder and sub-folders.

// tscaconfig file contains how to run ts files in folder

// let's check for lib[] in config.json
function clickHandler(message: string) {
  console.log('Clicked' + message);
}
const button = document.querySelector('button')!; // ! means that button will exist somewhere
// ! can we removed using nullchecker in modules
button.addEventListener(
  'click',
  clickHandler.bind(null, 'you are welcome') // we can use bind bcz bind functionality is allowed in config file
  // () => {
  // console.log('Clicked');
  // }
);
// OR we can write it as
// if (button) {
//     button.addEventListener('click', () => {
//         console.log('clicked');
//     })
// }

// .map are from sourcemap of config file for helping in debugging.
// now dist folder contains all js files and all folders will we copied as same.
// Where as rootdir provides src for all ts files.
// removecomments for js file from ts
// "noEmitOnError": false || true  if we want the error to we bypassed or not

// Other are
let logged;
function sendAnalysticData(data: string) {
  // data here is const
  console.log(data);
  logged = true; // logged here is variable
}
sendAnalysticData('data');

// for cosnt setting them to any is NOT okay while
// for varialble it is Okay
