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

// **** Bind, Call and Apply ****

var john = {
    name: "John",
    age: 26,
    job: "Teacher",
    presentation: function(style, time) {
        if(style === "formal") {
            console.log("Hello, I am " + this.name + " and I am " + this.age + " years old.");
        } else {
            console.log("Hi, I am " + this.name + " and I am " + this.age );
        }
    }
};

var emily = {
    name: "Emily",
    age: 35,
    job: "Designer"
};

john.presentation("formal", "morning");

john.presentation.call(emily, "friendly", "night"); //Call allows to call a method defined in another object, and set the 'this' variable to the first argument

//john.presentation.apply(emily, ["friendly", "night"]); //Apply doeds the same as Call, except that it takes an array for the parameters. It's commented out because the presnetation() method doesn't take an array

var johnFriendly = john.presentation.bind(john, "friendly"); //Bind returns a function, so you need to store it in a variable. Bind allows to pre-set some arguments
johnFriendly("morning");
var emilyFormal = john.presentation.bind(emily, "formal");
emilyFormal("morning");

// *********************************
//          CODING CHALLENGE
// *********************************

(function() {
    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.validateAnswer = function(answer) {
            return answer === this.correctAnswer;
        };
    };

    Question.prototype.display = function() {
        console.log(this.question);  
        for(i = 0; i < this.answers.length; i++) {
            console.log( i + ".- " + this.answers[i]);  
        }
    }

    Question.prototype.checkAnswer = function(answer, callback) {
        var sc;
        
        if( answer === this.correctAnswer ) {
            console.log("Correct!");
            sc = callback(true);
        } else {
            console.log("Wrong!");
            sc = callback(false);
        }
        
        this.displayScore(sc);
    }
    
    Question.prototype.displayScore = function(score) {
        console.log("Your current score is: " + score);
    }


    var questionA = new Question("Is JavaScript the coolest programming langauge in the world?", ["Yes", "No"], 0);
    var questionB = new Question("Is Ottawa the capital of Canada?", ["No", "Yes"], 1);
    var questionC = new Question("Which one is the best season?", ["Spring", "Summer", "Fall", "Winter"], 3);

    var questions = [questionA, questionB, questionC];
    
    function score() {
        var sc = 0;
        return function(correct) {
            if(correct) {
                sc++;
            }
            
            return sc;
        }
    }
    
    var keepScore = score();

    function nextQuestion() {
        var index = Math.floor( (Math.random() * questions.length) );
        var question = questions[index];

        question.display(); 

        var answer = prompt("Choose an answer","");

        if( answer !== "exit") {
            question.checkAnswer( parseInt(answer), keepScore ); 
            nextQuestion();
        }
    }
    
    nextQuestion();
})();
