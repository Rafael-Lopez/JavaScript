//Function constructor

var john = {
    name: "John",
    yearOfBirth: 1990,
    job: "Teacher"
};

var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

//You can also define this method inside the function constructr, but it's better to do it separetly (like this) to make the code clearer
Person.prototype.calculateAge = 
function() {
    console.log(2016 - this.yearOfBirth);
};

//You can add properties using the prototype attribute as well
Person.prototype.lastName = "Smith";

//Instantiation
//The "new" operator first creates an empty object. Then, when calling the function constructor, the "this" keyword refers to this new object. Otherwise, it would refer to the global object.
var john = new Person("John", 1990, "Teacher");
var mark = new Person("Mark", 1960, "Designer");
var jen = new Person("Jen", 1948, "Retired");


john.calculateAge();
mark.calculateAge();
jen.calculateAge();

console.log(john.lastName);
console.log(mark.lastName);
console.log(jen.lastName);

//Object.create

var personProto = {
  calculateAge: function() {
    console.log(2016 - this.yearOfBirth);
  }
};

var john = Object.create(personProto);
john.name = "John";
john.yearOfBrith = 1990;
john.job = "Teacher";

var jane = Object.create(personProto,
{
    name: { value: "Jane" },
    yearOfBirth: { value: 1969 },
    job: { value: "Designer" }
});

//The difference between Object.create and Function constructor is that Object.create builds an object that inherits directly from the one that we passed into the first argument
//While with the function constructor, the newly created object inherits from the constructor's prototype property.

// **** Passing functions as arguments ****

var years = [1969, 2016, 1989, 1958];

function arrayCalc(years, fn) {
    var array = [];
    for (var i = 0; i < years.length; i++) {
        array.push( fn(years[i]) );
    }
    
    return array;
}

function calculateAge(element) {
    return 2016 - element;
}

function isFullAge(element) {
    return element >= 18;
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(years, isFullAge);

console.log(ages);
console.log(fullAges);

// **** Functions returning functions ****

function interviewQuestion(job) {
    if (job === "Designer") {
        return function(name) {
            console.log(name + ", can you explain what UX design is?");
        }
    } else if (job === "Teacher") {
        return function(name) {
            console.log("What subject do you teach, " + name + "?");
        }
    }
}

var teacherQuestion = interviewQuestion("Teacher");
teacherQuestion("John");
var designerQuestion = interviewQuestion("Designer");
designerQuestion("John");

interviewQuestion("Teacher")("John");
interviewQuestion("Designer")("John");

// **** Immediately Invoked Function Expressions (IIFE). AKA Annonymus functions ****

function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}

(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

// **** Closures ****
// An inner function has always access to the variables and parameters of its outer function, even after the outer function has returned 
function retirement(retirementAge) {
    var a = " years left until retirement";
    
    return function(yearOfBirth) {
        var age = 2016 - yearOfBirth;
        console.log( (retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
retirementUS(1990);
retirementGermany(1990);

//Another example

function interviewQuestion(job) {
    return function(name) {
        if (job === "Designer") {
            console.log(name + ", can you explain what UX design is?");
        }
        else if (job === "Teacher") {
            console.log("What subject do you teach, " + name + "?");
        }
    }
}

interviewQuestion("Teacher")("John");