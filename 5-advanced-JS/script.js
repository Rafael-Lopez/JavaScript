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