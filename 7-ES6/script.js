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

/*let firstName = 'John';
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
console.log(firstName.repeat(5));*/

/*
    ***** Arrow Functions *****
*/

const years = [1990, 1965, 1992, 1937];

// ES5
var ages5 = years.map( function(current) {
    return 2019 - current;
});
console.log(ages5);

// ES6
let ages6 = years.map( current => 2019 - current);
console.log(ages6);

// Need parenthesis if more than one argument
ages6 = years.map( (current, index) => `Age element ${index + 1}: ${2019-current}.`);
console.log(ages6);

// Need curly braces if more than one line of code in the body, and return keyword
ages6 = years.map( (current, index) => {
    const now = new Date().getFullYear();
    const age = now - current;
    return `Age element ${index + 1}: ${age}.`;
});
console.log(ages6);

/*
    ***** Arrow Functions 2 *****
*/

// ES5
// Only in method calls, the 'this' keyword points to that object. But in a regular function call, the 'this' keyword points to the global object.
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
};
box5.clickMe();
// To solve the problem. You can add "var self = this;" before querySelector, and replace the 'this' keyword with self instead.

// ES6
// The arrow functions share the lexical 'this' kewyword of their sorrundings
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
};
box6.clickMe();



function Person(name) {
    this.name = name;
}

// ES5
Person.prototype.myFriends5 = function() {
    var arr = friends.map( function(el) {
        return this.name + ' is friends with ' + el;
    }.bind(this) );
    
    console.log(arr);
};

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function() {
    let arr = friends.map( el => `${this.name} is friends with ${el}` );
    console.log(arr);
};

let friends6 = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends6(friends6);


/*
    ***** Destructuring *****
*/

// ES5
var john = ['John', 26];
var name = john[0];
var age = john[1];

// ES6
const [name6, age66] = ['John', 26];
console.log(name6, age66);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

//const names have to match the property names
const {firstName, lastName} = obj;
console.log(firstName, lastName);

//or you can do this instead
const {firstName: a, lastName: b} = obj;
console.log(firstName, lastName);



function calcAgeRetirement(year) {
    const age2 = new Date().getFullYear() - year;
    return [age2, 62 - age2];
}

const[age2, retirement] = calcAgeRetirement(1990);
console.log(age2, retirement);