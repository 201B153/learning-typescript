"use strict";
const userName = 'mayank';
let age;
age = 21;
console.log(userName);
const userType = 'admin';
console.log(userType);
function clickHandler(message) {
    console.log('Clicked' + message);
}
const button = document.querySelector('button');
button.addEventListener('click', clickHandler.bind(null, 'you are welcome'));
let logged;
function sendAnalysticData(data) {
    console.log(data);
    logged = true;
}
sendAnalysticData('data');
