/*
//String
var firstName = "John";
console.log(firstName);

var lastName = "Smith";
//Number
var age = 28;

//Boolean
var fullAge = true;
console.log(fullAge);

//Undefined
var job;
console.log(job);
job = "Teacher";
console.log(job);
*/

/*
* Variable mutation and type coercion
*/

//Type coercion
var firstName = "John";
var age = 28;

console.log(firstName + " " + age);

var job, isMarried;
job = "Teacher";
isMarried = false;

console.log(firstName + " is a " + age + " years old " + job + ". Is he married? " + isMarried);

//Variable mutation
age = "twenty eight";
job = "driver";

alert(firstName + " is a " + age + " years old " + job + ". Is he married? " + isMarried);

var lastName = prompt("What is hist last name?");
console.log(firstName + " " + lastName);