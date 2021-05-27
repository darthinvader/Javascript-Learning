'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
document.querySelector('.number').textContent = '?';

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  console.log(guess, typeof guess);

  if (score == 0) {
    return;
  }

  // When there is no input
  if (!guess) {
    document.querySelector('.message').textContent = '⛔No Number!';
    // When player wins
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉Correct Number';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess > secretNumber) {
    document.querySelector('.message').textContent = 'Too high';
    if (score == 1) {
      document.querySelector('.message').textContent = 'You lost the game!';
    }
    score--;
  } else if (guess < secretNumber) {
    document.querySelector('.message').textContent = 'Too low';

    if (score == 1) {
      document.querySelector('.message').textContent = 'You lost the game!';
    }
    score--;
  }

  document.querySelector('.score').textContent = score;
});

document.querySelector('.again').addEventListener('click', again);

function again() {
  score = 20;
  document.querySelector('.message').textContent = 'Start guessing ...';
  document.querySelector('.number').textContent = '?';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = score;
}
