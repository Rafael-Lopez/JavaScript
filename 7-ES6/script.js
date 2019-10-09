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




/*
    ***** Arrays *****
*/

const boxes = document.querySelectorAll('.box');

// ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach( function(current) {
    current.style.backgroundColor = 'dodgerblue';
});

// ES6
const boxesArr6 = Array.from(boxes);
Array.from(boxes).forEach( current => current.style.backgroundColor = 'dodgerblue' );



// ES5
/*for(var i =0; i < boxesArr5.length; i++) {
    if( boxesArr5[i].className === 'box blue') {
        continue;
    }
    
    boxesArr5[i].textContent = 'I changed to blue!';
}*/

// ES6
for(const current of boxesArr6) {
    if( current.className.includes('box blue')) {
        continue;
    }
    
    current.textContent = 'I changed to blue!';
}



// ES5
var ages = [12, 17, 8, 21, 14, 11];
var full = ages.map( function(current) {
    return current >= 18;
});

console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

// ES6
console.log(ages.findIndex( current => current >= 18 ));
console.log(ages.find( current => current >= 18 ));




/*
    ***** Spread operators *****
    Takes an array and transforms it into single values
*/

function addFourAges(a, b, c ,d) {
    return a + b + c +d;
}

console.log(addFourAges(18, 30, 12, 21));

// ES5
var ages = [18, 30, 12, 21];
console.log(addFourAges.apply( null, ages));

// ES6
console.log(addFourAges(...ages));



const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, ...familyMiller];
console.log(bigFamily);



const h = document.querySelector('h1');
const boxesA = document.querySelectorAll('.box');
const all = [h, ...boxesA];
Array.from(all).forEach( current => current.style.color = 'purple');




/*
    ***** Rest parameters *****
    Receives a couple of single values, and transforms them into an array when we call a function with multiple parameters
*/

// ES5
function isFullAge5() {
    // arguments: a special variable we have access to in all functions
    // an array-like structure. But not really an array
    console.log(arguments);
    
    var argsArr = Array.prototype.slice.call(arguments);
    
    argsArr.forEach( function(current) {
        console.log( (2016 - current) >= 18);
    });
}

isFullAge5(1990, 1999, 1965);


// ES6 
function isFullAge6(limit, ...years) {
    console.log(years);
    
    years.forEach( current => console.log( (2016 - current) >= limit) );
}

isFullAge6(18, 1990, 1999, 1965);





/*
    ***** Default parameters *****
*/

// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
    this.firstName = firstName;
    
    lastName === undefined ? lastName ='Smith' : lastName = lastName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    
    nationality === undefined ? nationality ='American' : nationality = nationality;
    this.nationality = nationality;
}

//JavaScript allows you to pass only the parameters you want. The rest is set to Undefined
var john = new SmithPerson('John', 1990);

console.log(john);

// ES6
function SmithPerson6(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

//JavaScript allows you to pass only the parameters you want. The rest is set to Undefined
const johnA = new SmithPerson6('John', 1990);

console.log(johnA);





/*
    ***** Maps *****
*/

const question = new Map();
question.set('question', 'What is the official names of the latest major JS version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer!');
question.set(false, 'Wrong answer!');

console.log(question.get('question'));
console.log(question.size);

/*if(question.has(4)) {
    question.delete(4)
}

question.clear();*/

question.forEach( (value, key) => console.log(`This is the key: ${key}, and this is the value: ${value}`));

for(let [key, value] of question.entries()) {
    if(typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }   
}

const ans = parseInt(prompt('Write the correct answer'));

console.log( question.get(ans === question.get('correct')) ); 