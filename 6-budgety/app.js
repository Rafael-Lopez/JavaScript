//BUDGET CONTROLLER
var budgetController = (function() {
    
})();



//UI CONTROLLER
var UIController = (function() {
    
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addButton: ".add__btn"
    };
    
    return {
        getInput: function() {
            
            return {
                type: document.querySelector(DOMstrings.inputType).value, //Will be either Inc or Exp (it's a Select component. Look at the HTML)
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        }, 
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
    
})();



//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
    
    var DOMstrings = UICtrl.getDOMstrings();
    
    var ctrlAddItem = function() {
        
        var input = UICtrl.getInput();
        console.log(input);
        
    };
    
    document.querySelector(DOMstrings.addButton).addEventListener("click", ctrlAddItem);
    
    //Happens on the global web page
    document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });
    
})(budgetController, UIController);