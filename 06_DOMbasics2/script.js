'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

overlay.addEventListener('click', closeModal);

btnCloseModal.addEventListener('click', closeModal);

const btnsOpenModal = document.querySelectorAll('.show-modal');

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
