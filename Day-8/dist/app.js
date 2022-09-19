"use strict";
console.log('mayank');
const e1 = {
    name: 'mayank',
    privviledges: ['create-server'],
    startDate: new Date(),
};
// Type Gaurds help in union type
function add(a, b) {
    if (typeof a == 'string' || typeof b === 'string') {
        // Works as type gaurds to check union type working
        return a.toString() + b.toString();
    }
    return a + b;
}
function printEmployeeInformation(emp) {
    console.log('name: ' + emp.name);
    if ('privviledges' in emp) {
        console.log('Priviledges ' + emp.privviledges);
    }
    if ('startDate' in emp) {
        console.log('StartDate' + emp.startDate);
    }
}
printEmployeeInformation({ name: 'mayank', startDate: new Date() });
class Car {
    drive() {
        console.log('driving..');
    }
}
class Truck {
    drive() {
        console.log('driving truck ....');
    }
    loadCargo(amount) {
        console.log('laoding acrgo...');
    }
}
const v1 = new Car();
const v2 = new Truck();
// One way to use type gaurd
function useVehicle(vehicle) {
    vehicle.drive();
    if ('loadCargo' in vehicle) {
        vehicle.loadCargo(1000);
    }
}
// Second way to use  type gaurd
function useVehicle2(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        // we cannot use instanceof for interface
        vehicle.loadCargo(112);
    }
}
useVehicle(v1);
useVehicle(v2);
useVehicle2(v1);
useVehicle2(v2);
function moveAnimal(animal) {
    if ('flyingSpeed' in animal) {
        // We can do this BUT it is tedious and have to written careful to be aware of typeOf
        // we cannot use instanceof as it is interface so;;;.....
        console.log('Moving with speed' + animal);
    }
}
// Now the moveAnimal will we written as
function moveAnimal1(animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving at speed ' + speed);
}
moveAnimal1({ type: 'bird', flyingSpeed: 10 });
// Type Casting
// helps u determine a type which is ts unable to detect on its own
// For example a paragraph tag can be moded for
const paragraph = document.querySelector('p');
// where as ts cannot identify the html id as of
const paragraph1 = document.getElementById('message-id');
// where as when used for elemnts like input
const userInput = document.getElementById('input-id');
// It will still deal with elemnt as html elemant
// userInput.value = 'hi, element';
// now we have to tell ts that the following html input element here type casting is used as
// Fristly we can do that by
const userInput1 = document.getElementById('input-id');
userInput1.value = 'hi, element';
// Secondly we can add the as keyword after like
const userInput2 = document.getElementById('input-id');
// here we are forcing ts to make it work over a tag and element
// Where ! means it will never return null.
userInput2.value = 'hi, element';
// The whole above code can be written as
// if we are not using !.
const userInput3 = document.getElementById('input-id');
if (userInput3) {
    userInput3.value = 'hi, There Element';
}
