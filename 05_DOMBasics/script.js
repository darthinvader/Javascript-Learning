'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('message').textContent = message;
};

document.querySelector('.number').textContent = '?';

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  console.log(guess, typeof guess);

  if (score == 0) {
    return;
  }

  // When there is no input
  if (!guess) {
    displayMessage('⛔No Number!');
    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉Correct Number');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else {
    if (score == 1) {
      displayMessage('You lost the game!');
    }
    score--;
  }

  if (guess > secretNumber) {
    displayMessage('Too high');
  } else if (guess < secretNumber) {
    displayMessage('Too low');
  }

  document.querySelector('.score').textContent = score;
});

document.querySelector('.again').addEventListener('click', again);

function again() {
  score = 20;
  displayMessage('Start guessing ...');
  document.querySelector('.number').textContent = '?';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = score;
}
