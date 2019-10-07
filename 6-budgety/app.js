//BUDGET CONTROLLER
var budgetController = (function() {
    
})();

//UI CONTROLLER
var UIController = (function() {
    
})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
    
    var ctrlAddItem = function() {
        console.log("Test");
    };
    
    document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);
    
    //Happens on the global web page
    document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });
    
})(budgetController, UIController);