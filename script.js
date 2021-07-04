'use strict';

// Selecting elements
const player1FinalScoreElement = document.querySelector('#score--0');
const player2FinalScoreElement = document.querySelector('#score--1');
const player1NameElement = document.getElementById('name--0');
const player2NameElement = document.getElementById('name--1');
const diceViewElement = document.querySelector('.dice');
const diceRollBtnElement = document.querySelector('.btn--roll');
const currentScore1Element = document.getElementById('current--0');
const currentScore2Element = document.getElementById('current--1');
const holdBtnElement = document.querySelector('.btn--hold');
const newGameBtnElement = document.querySelector('.btn--new');

let currentScore, activePlayer, finalScores, isPlaying;
let player1, player2;

const initializeGame = function(){
    // initializing variables
    currentScore = 0;
    activePlayer = 1;
    finalScores = [0,0];
    isPlaying = true;

    player1FinalScoreElement.textContent = 0;
    player2FinalScoreElement.textContent = 0;
    player1 = prompt('Enter Player 1 name - ');
    player2 = prompt('Enter Player 2 name - ');
    player1NameElement.textContent = player1;
    player2NameElement.textContent = player2;
    diceViewElement.classList.add('hidden');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
}

initializeGame();


// switch player
const switchPlayer = function(){
    currentScore = 0;
    currentScore1Element.textContent = 0;
    currentScore2Element.textContent = 0;
    activePlayer = activePlayer === 1 ? 2 : 1;
    document.querySelector(`.player--0`).classList.toggle('player--active');
    document.querySelector(`.player--1`).classList.toggle('player--active');
}

// Dice Roll
diceRollBtnElement.addEventListener('click',function(){
    if(isPlaying){
        const diceValue = Math.trunc(Math.random()*6) + 1;
        console.log(diceValue);
        diceViewElement.classList.remove('hidden');
        diceViewElement.src = `dice-${diceValue}.png`;

        if(!(diceValue === 1)){
            // add to current score and display the current score
            currentScore = currentScore + diceValue;
            document.getElementById(`current--${activePlayer - 1}`).textContent = currentScore;
        }
        else{
            // if dice = 1 switch player
            switchPlayer();
        }
    }
});

holdBtnElement.addEventListener('click',function(){
    if(isPlaying){
        finalScores[activePlayer-1] = finalScores[activePlayer-1] + currentScore ;
        document.getElementById(`score--${activePlayer-1}`).textContent = finalScores[activePlayer-1];
        if(finalScores[activePlayer-1] >= 100){
            document.querySelector(`.player--${activePlayer-1}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer-1}`).classList.remove('player--active');
            diceViewElement.classList.add('hidden');
            isPlaying = false;
            alert(document.getElementById(`name--${activePlayer-1}`).textContent + `✨✨✨ Won the Game !!!`);
        }
        else{
            switchPlayer();
        }
    }
});

newGameBtnElement.addEventListener('click',initializeGame);