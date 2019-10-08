// ******  ES6  ******

// In ES6, use let and const instead of var
let age6 = 23;
const yearOfBirth6 = 1996;

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

/*
    ***** Strings *****
*/

let firstName = 'John';
let lastname = 'Smith';
const yearOfBirth = 1998;

function calcAge(year) {
    return 2016 - year;
}

// In ES5
console.log('This is ' + firstName + ' ' + lastname + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// In ES6
// Template literals: string literals that allow embedded expressions using backticks
console.log(`This is ${firstName} ${lastname}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old. `);


const n = `${firstName} ${lastname}`;
console.log(n.startsWith('J'));
console.log(n.endsWith('h'));
console.log(n.includes(' '));
console.log(firstName.repeat(5));