// ******  ES6  ******

// In ES6, use let and const instead of var
let age = 23;
const = yearOfBirth = 1996;

// let and const have block scope (code between { and })
// var has function scope

// In ES5, you can use a variable without declaring it and it will have a value of Undefined
// In ES6, you need to declare the variable first. Otherwise you get an error.

/*
    ***** Blocks and IIFEs *****
*/

// IIFE in ES5
( function() {
    var a = 1;
    var b = 2; 
})();

// In ES6, for data privacy, you can do this instead
{
    const a = 1;
    let b = 2;
}

