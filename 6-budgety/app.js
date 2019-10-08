//BUDGET CONTROLLER
var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round( (this.value / totalIncome) * 100 );
        } else {
            this.percentage = -1;
        }
    };
    
    Expense.prototype.getPercentage = function() {
        return this.percentage;    
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
        },
        budget: 0,
        percentage: -1 // -1 usually indicates that the item is non existent
    };
    
    var caclulateTotal = function(type) {
        var sum = 0;
        
        data.allItems[type].forEach( function(current) {
            sum += current.value;
        });
        
        data.totals[type] = sum;
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
        },
        
        deleteItem: function(type, id) {
            
            var ids, index;
            
            //map() returns an new array
            ids = data.allItems[type].map( function(current) {
                return current.id;    
            });
            
            index = ids.indexOf(id);
            
            if (index !== -1) {
                //To remove elements from an array -- (where to start, how many elements)
                data.allItems[type].splice(index, 1);
            }
        },
        
        calculateBudget: function() {
            
            //Calculate total income and expenses
            caclulateTotal("exp");
            caclulateTotal("inc");
            
            //Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            //Calculate percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round( (data.totals.exp / data.totals.inc) * 100 );                      
            } else {
                data.percentage = -1;   
            }      
        },
        
        calculatePercentages: function() {
            data.allItems.exp.forEach( function(current) {
                current.calcPercentage( data.totals.inc );
            });
        },
        
        getPercentages: function() {
            var allPercentages = data.allItems.exp.map( function(current) {
                return current.getPercentage();
            });
            
            return allPercentages;
        },
        
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
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
        expensesContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expensesLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        container: ".container",
        expensesPercentageLabel: ".item__percentage"
    };
    
    var formatNumber = function(num, type) {
            
            var numSplit, int, dec;
            num = Math.abs(num);
            
            // Exactly 2 decimals
            num = num.toFixed(2);
            
            // Comma separator
            numSplit = num.split(".");
            
            int = numSplit[0];
            if (int.length > 3) {
                int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);   
            }            
            
            dec = numSplit[1];
            
            // + or - before number
            return (type === "exp" ? sign =  "-" : sign = "+") + " " + int + "." + dec;
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
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div>' +
                '<div class="right clearfix"><div class="item__value">%value%</div>' +
                '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                '</div></div></div>';
                element = DOMstrings.incomeContainer;
            } else if (type === "exp") {
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div>' +
                '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div>' +
                '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                '</div></div></div>';
                element = DOMstrings.expensesContainer;
            }
                    
            //Replace palceholder text with some actual data
            newHtml = html.replace("%id%", item.id);
            newHtml = newHtml.replace( "%value%", formatNumber(item.value, type) );
            newHtml = newHtml.replace("%description%", item.description);
            
            //Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
        },
        
        deleteListItem: function(selectorID) {
            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
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
        },
        
        displayBudget: function(obj) {  
            
            var type = obj.budget > 0 ? "inc" : "exp";
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, "exp");
            
            
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = "---";
            }
        },
        
        displayPercentages: function(percentages) {
            
            //Returns a Node List
            var fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);
            
            var nodeListForEach = function(list, callback) {
                for(var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }  
            };
            
            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + "%";
                } else {
                    current.textContent = "---";
                }
            });
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
        
        document.querySelector(DOMstrings.container).addEventListener("click", ctrlDeleteItem);
    };
    
    var updateBudget = function() {
        
        // 1. Calculate budget
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    
    var updatePercentages = function() {
        
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        
        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        
        // 3. Update UI
        UICtrl.displayPercentages(percentages);
    }
    
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
            
            // 6. Calculate and update percentages
            updatePercentages();
        }
        
    };
    
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, id;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        //There are not other ID's in the HTML document, so this is safe.
        //Coerced to TRUE if item exists
        if (itemID) {
            
            //ID could be inc-1, exp-2, etc
            splitID = itemID.split("-");
            type = splitID[0];
            id = parseInt(splitID[1]);
            
            // 1. Delete item from data structure
            budgetCtrl.deleteItem(type, id);
            
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            // 3. Update and show the new budget
            updateBudget();
            
            // 4. Calculate and update percentages
            updatePercentages();
        }
    };
    
    return {
        init: function() {
            console.log("App started");
            UICtrl.displayBudget( {
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            } );
            setupEventListeners();
        }
    };
    
})(budgetController, UIController);


controller.init();