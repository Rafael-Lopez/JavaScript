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

/*
    ****************************
        CODING CHALLENGE 2 
    ****************************
*/

var johnAverage = (89 + 120 + 103) / 3;
var mikeAverage = (116 + 94 + 123) / 3;
var maryAverage = (97 + 134 + 105) / 3;

if (johnAverage === mikeAverage && johnAverage == maryAverage){
    console.log("All teams have the same average score: " + johnAverage);
} else if (johnAverage > mikeAverage && johnAverage > maryAverage){
    console.log("John's team has the highest average score: " + johnAverage);
} else if (mikeAverage > johnAverage && mikeAverage > maryAverage) {
    console.log("Mike's team has the highest average score: " + mikeAverage);
} else {
    console.log("Mary's team has the highest average score: " + maryAverage);
}

/*
    ****************************
             FUNCTIONS 
    ****************************
*/

//Funtion Declaration
//Notice how there's no return type even thouhg this function is returning a value
function calculateAge(birthYear){
    return 2018 - birthYear;
}

var ageJohn = calculateAge(1990);
console.log(ageJohn);

//Functions don't have to return something all the time
function calculateAndPrintAge(birthYear){
    var ageSam = calculateAge(1990);
    console.log(ageSam);
}

calculateAndPrintAge(1990);

/*
    ***************************************************
             FUNCTION STATEMENTS AND EXPRESSIONS 
    ***************************************************
*/

//Function Expressions: they take parameters and produce a result 
var calculateAgeExp = function(birthYear){
    return 2018 - birthYear;
}
console.log( calculateAgeExp(2000) );

//Statements: they don't produce an immediate result (returns something). Example: if(true)

/*
    ************************
             ARRAYS 
    ************************
*/

//Most used way to create arrays
var names = ["John", "Mark", "Jane"];
var years = new Array(1990, 1969, 1948);

console.log(names[0]);

//Different data types
var john = ["John", "Smith", 1990, "Teacher", false];
john.push("Blue");
console.log(john);


/*
    ****************************
        CODING CHALLENGE 3 
    ****************************
*/

function calculateTip(billAmount){
    var tip;
    
    if(billAmount < 50){
        tip = billAmount * 0.2;
    } else if (billAmount >= 50 && billAmount <= 200){
        tip = billAmount * 0.15;
    } else {
        tip = billAmount * 0.1;
    }
    
    return tip;
}

var amountA = 124;
var amountB = 48;
var amountC = 268;

var tips = [calculateTip(amountA), calculateTip(amountB), calculateTip(amountC)];
var paidAmounts = [tips[0] + amountA, tips[1] + amountB, tips[2] + amountC];

console.log(tips);
console.log(paidAmounts);

/*
    ******************************
        Objects and properties 
    ******************************
*/

//Object literal
var john = { 
    firstName: "John",
    lastName: "Smith",
    birthYear: 1990,
    family: ["Jane", "Mark", "Bob"],
    job: "Teacher",
    isMarried: false
};
console.log(john);
//Using dot notation to retrieve elements from the object
console.log(john.firstName);
//Using brackets to retrieve elements from the object
console.log(john["firstName"]);

john.job = "Designer";
john["isMarried"] = true;
console.log(john);

// new Object syntax
var jane = new Object();
jane.firstName = "Jane";
jane.birthYear = 1968;
jane["lastName"] = "Smith";
console.log(jane);

/*
    ******************************
        Objects and methods 
    ******************************
*/

//Object literal
var john = { 
    firstName: "John",
    lastName: "Smith",
    birthYear: 1990,
    family: ["Jane", "Mark", "Bob"],
    job: "Teacher",
    isMarried: false,
    calcAge: function(){
        this.age = 2018 - this.birthYear;
    }
};

john.calcAge();
console.log(john);

/*
    ****************************
        CODING CHALLENGE 4 
    ****************************
*/

var john = { 
    name: "John Smith",
    mass: 70,
    height: 1.70,
    calcBmi: function(){
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

var mark = { 
    name: "Mark Right",
    mass: 75,
    height: 1.75,
    calcBmi: function(){
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

if (john.calcBmi() > mark.calcBmi()){
    console.log(john.name + " has the highest BMI: " + john.bmi);
} else if (mark.bmi > john.bmi){
    console.log(mark.name + " has the highest BMI: " + john.bmi);
} else {
    console.log("They have the same BMI");
}

/*
    ****************************
        CODING CHALLENGE 5 
    ****************************
*/

var john = {
    name: "John Smith",
    bills: [124, 48, 268, 180, 42],               
    calcTips: function(){
        this.tips = [];
        this.finalAmounts = [];
        
        for(var index = 0; index < this.bills.length; index++){
            var bill = this.bills[index];
            var tip;

            if(bill < 50){
                tip = bill * 0.2;
            } else if (bill >= 50 && bill <= 200){
                tip = bill * 0.15;
            } else {
                tip = bill * 0.1;
            }
            
            this.tips[index] = tip; 
            this.finalAmounts[index] = bill + tip;
        }

    }
};

var mark = {
    name: "Mark Lotto",
    bills: [77, 375, 110, 45],              
    calcTips: function(){
        this.tips = [];
        this.finalAmounts = [];
            
        for(var index = 0; index < this.bills.length; index++){
            var bill = this.bills[index];
            var tip;

            if(bill < 100){
                tip = bill * 0.2;
            } else if (bill >= 100 && bill <= 300){
                tip = bill * 0.1;
            } else {
                tip = bill * 0.25;
            }
            
            this.tips[index] = tip; 
            this.finalAmounts[index] = bill + tip;
        }

    }
};

function calculateTipAvergae(tips){
    var total = 0;
    
    for(var i = 0; i < tips.length; i++){
        total += tips[i];
    }
    
    return total / tips.length;
}

john.calcTips();
mark.calcTips();
john.average = calculateTipAvergae(john.tips);
mark.average = calculateTipAvergae(mark.tips);
console.log(john, mark);

if(john.average > mark.average){
    console.log("John's family paid the highest tips on average");
} else {
    console.log("Mark's family paid the highest tips on average");
}


