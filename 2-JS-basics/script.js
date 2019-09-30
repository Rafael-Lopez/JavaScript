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

/*
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
*/

/*
    ****************************
        CODING CHALLENGE 1 
    ****************************
*/

var markMass = 75;
var johnMass = 70;
var markHeight = 1.75;
var johnHeight = 1.70;
var markBmi = markMass / (markHeight * markHeight);
var johnBmi = johnMass / (johnHeight * johnHeight);

var isMarkBmiHigher = markBmi > johnBmi;

console.log("Is Mark's BMI higher than John's? " +  isMarkBmiHigher);

/*
    *******************************
        Truthy and Falsy values
    *******************************
    
    Falsy: undefined, null, 0, '', not a number. All these values will be taken as false
    Truthy: all NOT falsy values
*/
var height;

if(height){
    console.log("Shouldn't go in here!"); 
} else {
    console.log("Proving Falsy value"); 
}

/*
    *******************************
          Equality Operators
    *******************************
*/
height = 23;

if(height == "23"){
    //JS converts the String '23' to a number, and then compares
    console.log("The operator == does type coercion"); 
}

if(height === "23"){
    //Comparing a number with a String, which results in a False value
    //BEST PRACTICE: always use the === operator to avoid confusion
    console.log("The operator === does not do type coercion"); 
}
