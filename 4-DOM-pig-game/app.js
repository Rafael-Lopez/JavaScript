/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, gamePlaying, lastDice;

init();

//Using annonymus function
document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        
        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-2").style.display = "block";
        document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
        document.getElementById("dice-2").src = "dice-" + dice2 + ".png";
        
        /*if(dice === 6 && lastDice === 6) {
            score[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).textContent = "0";
            nextPlayer();
        }
        else */if(dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        
        lastDice = dice;
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    
    if (gamePlaying) {
        
        score[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).textContent = score[activePlayer];

        var input = document.querySelector(".final-score").value;
        var winningScore;
        
        //UNDEFINED, 0, null or empty strings are COERCED to False
        //ANything else is COERCED to True
        if(input){
            winningScore = input;
        } else {
            winningScore =100
        }
        
        if( score[activePlayer] >= winningScore) {
            document.getElementById("name-" + activePlayer).textContent = "Winner!";
            document.getElementById("dice-1").style.display = "none";
            document.getElementById("dice-2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        } 
    }
});
                                 
function nextPlayer(){
    roundScore = 0;
    numSixRolled = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; 
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    //Manipulating HTML classes. Remember
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    //You can also add or remove classes manually
    //document.querySelector(".player-1-panel").classList.remove("active");
    //document.querySelector(".player-1-panel").classList.add("active");

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init(){
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    numSixRolled = 0;


    //Like in CSS, to reference an element by its ID, you need to add the #
    //document.querySelector("#current-" + activePlayer).textContent = dice;
    //Another way to change the text would be to use the innerHTML method, which takes HTML code in the form of a String
    //document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

    //Like in CSS, to reference an element by its class, you need to use the .
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
    
    //getElementById is a bit faster tha querySelector, but it only works for ID's. Also, you don't need to use the CSS style to refer to the ID. Therefore, no # is needed.
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("name-0").textContent = "Player1";
    document.getElementById("name-1").textContent = "Player2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}