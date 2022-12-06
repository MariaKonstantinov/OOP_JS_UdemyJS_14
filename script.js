'use strict';
// UDEMY COMPLETE JS COURSE - SECTION 14

// Lesson 1: CONSTRUCTOR FUNCTION & NEW OPERATOR ---------------------------------->

//constructor functions always start with capital letter
// function expression and function declarations both work here, arrow functions don't work here (because they don't have "this" keyword)
// this function will produce an object (in this case - for a Person; so we specify name and birth parameters in our constructor function - so we could pass the actual name and birthyear)

const Person = function (firstName, birthYear) {
  // "this" keyword inside of the function will be exactly the Person object
  console.log(this);
  // below we are setting properties (called instance properties) to that object - this.firstName and this.birthYear) and give them the exact same name as the parameters which we are passing in function breckets ();
  // "this." keword below is that empty object
  this.firstName = firstName;
  this.birthYear = birthYear;

  // IMPORTANT: never create a method inside of a constructor function - bad practice.
};

// calling the function and storing the result in a variable "jonas"
const jonas = new Person('Jonas', 1991);
console.log(jonas);

// what happens when we actually call this function with the "new" operator:
// 1. New object {} is created
// 2. function is called and in this function call "this" keyword will be set to this newly created object ("this" = new object {} which was created in step 1)
// 3. the newly created object is linked to a prototype (sets the __proto__ property on the object to the prototype property of the constructor function)
// 4. the object which was created at the beginnig is then automatically returned from the constructor function with the 2 properties we assigned to it (firstName and birthYear)

//we can use this constructor function to create as many different objects as we want
const matilda = new Person('matilda', 2017);
console.log(matilda);

// in classical OOP an object created from a class is called an instance. JS doesn't really have classes in the sense of traditional OOP. However we did create an object from a constructor funtion and constructor functions have been used since the beginning of JS to kind of simulate classes. So we create instances. We can check it as below (it returns boolean value: true or false):

console.log(jonas instanceof Person);

// Lesson 2: PROTOTYPES ------------------------------------------------>

// Each and every function in JS automatically has a property called - prototype. This includes constructor functions. Every object that is created by a certain constructor function will get access to all methods and properties that we define on the constructors prototype property.

// we can use the method below on the "jonas" object eventhough it is not really on the object itself - we don't have this method inside our "jonas " object but we have an access to it because of prototypal inheritance.

// Having a method (as below - calcAge) outside of the constructor function is much more efficient: as if we had it inside - we would have added a copy of it to every single object that is created. Below we have just one copy of this function, but all of the objects that are created using that object constructor function, can basically reuse thus calAge function on themselves. "this" keyword in each of them is always set to the object that is calling the method.

// Any object always has access to the methods and properties from its prototype. In our case - Person is the prototype for jonas object.

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge(); // logs 46

// Each object has a special property __proto__
// In our case - the prototype of jonas object is essentially the prototype property of the constructor function. We can confirm that as below:

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); // this gives us a boolean value of "true"

// Above "Person.prototype" is NOT the prototype of Person. This is what is going to be used as the prototype of all objects that are created with the Person constructor function.

// So it can be called as a prototype of all linked objects.

console.log(Person.prototype.isPrototypeOf(jonas)); // this also gives us a boolean value of "true"

// But i we try once again to confirm that "Person.prototype" is NOT the prototype of Person, we can do as below:
console.log(Person.prototype.isPrototypeOf(Person)); // this gives us a boolean value of "false"

console.log(Person.prototype);

// We can also set properties on the prototype, not just methods:
Person.prototype.species = 'Homo Sapiens';

// If we check our jonas object - we will see that it has this newly created property now
console.log(jonas);
console.log(jonas.species); // we get Homo Sapiens in the console

// However this new property "species" is not created directly inside of jonas object, and we can check it:
console.log(jonas.hasOwnProperty('species')); // this gives us a boolean value of "false"

// It just has access to it because of its prototype - the prototype property of Person.

// Lesson 3: PROTOTYPAL INHERITANCE ------------------------------------------------>

// If a property or a method can't be found in object itself, JS will look into its prototype. So we don't have calcAge function in jonas object, but it is available for us to use because JS finds it in the object prototype.

// Lesson 4: PROTOTYPAL INHERITANCE ON BUILD-IN OBJECTS --------------------------------------->

// Below we are accessing the prototype property of object: Object.prototype (is the top of prototype chain): here some methods from it that we used before: "hasOwnProperty", "isPrototypeOf" etc)
console.log(jonas.__proto__.__proto__);

console.dir(Person.prototype.constructor); // points back to Person

// ARRAY PROTOTYPES

const arr = [3, 6, 6, 5, 6, 9, 9];
console.log(arr.__proto__); // we will see all the methods of Arays (for example: "splice" method).

// Each array doesn't of course contain all these methods, but it has access to them from the prototype. Array can inherit these methods from its prototype. The prototype property of the constructor is going to be the prototype of all these objects created by that constructor.

console.log(arr.__proto__ === Array.prototype); // this gives us a boolean value of "true"

// The prototype itself is an object

// We can also create a method and add it to the prototype property of the array constructor, and then all the arrays will inherit it. BUT doing so is a bad practice.
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique()); // thsis will log only unique values of our array (which are: 3, 6, 5, 9) - no duplicates.

// FUNCTION PROTOTYPES
// Functions are a special type of objects in JS. So they also have prototypes.
console.dir(x => x + 1);

// Coding challenge 1  --------------------------------------->

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// specifying methods externally (not in the constructor function)

Car.prototype.accelerate = function () {
  console.log((this.speed += 10));
};

Car.prototype.brake = function () {
  console.log((this.speed -= 5));
};

// creating new instances of Car

const Bmw = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);

console.log(Bmw);
console.log(Mercedes);

// calling methods on our objects
Bmw.accelerate();
Mercedes.accelerate();

Bmw.brake();
Mercedes.brake();

// Lesson 5: ES6 CLASSES --------------------------------------->

// Classes are just a special type of functions

// we can have a class expression:
// const PersonCl = class {

// }

// and we can also have a class declaration as below:

class PersonCl {}
