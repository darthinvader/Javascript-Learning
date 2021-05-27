'use strict';

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔No Number!';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉Correct Number';
  } else if (guess > secretNumber) {
    score--;
    document.querySelector('.message').textContent = 'Too highx';
  } else if (guess < secretNumber) {
    score--;
    document.querySelector('.message').textContent = 'Too low';
  }

  document.querySelector('.score').textContent = score;
});
