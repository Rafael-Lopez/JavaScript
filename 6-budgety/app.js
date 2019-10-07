//BUDGET CONTROLLER
var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var allExpenses = [];
    var allIncomes = [];
    var totalExpenses = 0;
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    
    return {
        addItem: function(type, des, val) {
            
            var newItem, ID;
            
            //Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            if (type === "exp") {
                newItem = new Expense(ID, des, val);
            } else if (type === "inc") {
                newItem = new Income(ID, des, val);
            }      
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            //Return the new element
            return newItem;
        }
    };
    
})();



//UI CONTROLLER
var UIController = (function() {
    
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addButton: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list"
    };
    
    return {
        getInput: function() {
            
            return {
                type: document.querySelector(DOMstrings.inputType).value, //Will be either Inc or Exp (it's a Select component. Look at the HTML)
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        }, 
        getDOMstrings: function() {
            return DOMstrings;
        }, 
        addListItem: function(item, type) {
            
            var html, newHtml, element;
            
            //Create HTMl string with placeholder text
            //HTML grabbed from the html file provided with this lab
            if (type === "inc") {
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div>' +
                '<div class="right clearfix"><div class="item__value">%value%</div>' +
                '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                '</div></div></div>';
                element = DOMstrings.incomeContainer;
            } else if (type === "exp") {
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div>' +
                '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div>' +
                '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                '</div></div></div>';
                element = DOMstrings.expensesContainer;
            }
                    
            //Replace palceholder text with some actual data
            newHtml = html.replace("%id%", item.id);
            newHtml = newHtml.replace("%value%", item.value);
            newHtml = newHtml.replace("%description%", item.description);
            
            //Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
        },
        clearFields: function() {
            var fields, fieldsArray;
            
            //This returns a List
            fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);
            
            fieldsArray = Array.prototype.slice.call(fields);
            
            fieldsArray.forEach( function(current, index, array) {
                current.value = "";
            });
            
            fieldsArray[0].focus();
        }
    };
    
})();



//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
    
    var setupEventListeners = function() {
        
        var DOMstrings = UICtrl.getDOMstrings();
        
        document.querySelector(DOMstrings.addButton).addEventListener("click", ctrlAddItem);
    
        //Happens on the global web page
        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };
    
    var updateBudget = function() {
        
        // 1. Calculate budget
        
        // 2. Return the budget
        
        // 3. Display the budget on the UI
    };
    
    var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. Get the field input data
        input = UICtrl.getInput();
        
        if ( input.description !== "" && !isNaN(input.value) && input.value > 0 ) {
            // 2. Add the item to the budget controller 
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
        }
        
    };
    
    return {
        init: function() {
            console.log("App started");
            setupEventListeners();
        }
    };
    
})(budgetController, UIController);


controller.init();