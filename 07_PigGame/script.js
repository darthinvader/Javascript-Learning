'use strict';

// Selecting the elements

// Players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Scores
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0Ek = document.getElementById('current--0');
const current1Ek = document.getElementById('current--1');

// Dice
const diceEl = document.querySelector('.dice');

// Buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0Ek.textContent = 0;
  current1Ek.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  scores[0] = scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (!playing) {
    return;
  }
  //1 Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2 Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  // Check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;

    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (!playing) {
    return;
  }
  // 1. Add current score to active's player score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. Check if player's score is  >=100
  if (scores[activePlayer] >= 20) {
    playing = false;
    diceEl.classList.add('hidden');

    // Finish the game
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }

  // Switch to the next player
});

btnNew.addEventListener('click', init);
