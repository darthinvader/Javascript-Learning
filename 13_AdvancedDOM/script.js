'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // const scrollY = s1coords.top + window.pageYOffset;
  // const scrollX = s1coords.x + window.pageXOffset;

  //
  // window.scrollTo(scrollX, scrollY);
  // window.scrollTo({ left: scrollX, top: scrollY, behavior: 'smooth' });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the even
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked?.classList.add('operations__tab--active');

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

// const h1 = document.querySelector('h1');

// const alertH1 = e => {
//   alert('HEYY');
//   h1.removeEventListener('mouseenter', alertH1);
// };
// h1.addEventListener('mouseenter', alertH1);

// h1.onmouseenter = alert;

// h1.removeEventListener(alert);

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');

// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// const classBtns = document.getElementsByClassName('btn');
// console.log(classBtns);

// // Creating and inserting elements
// // .insertAdjacentHTML
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookes for improved functionality and analytics.';
// message.innerHTML =
//   'We use cookes for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';
// // header.prepend(message);
// // header.append(message.cloneNode(true));
// // header.before(message);
// header.append(message);
// // header.after(message);

// // Delete Elements
// document.querySelector('.btn--close-cookie').addEventListener('click', e => {
//   message.remove();
//   // message.parentElement.removeChild(message);
// });

// Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '100%';

// console.log(message.style.height);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseInt(getComputedStyle(message).height) + 40 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';

// // Non standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));

// logo.setAttribute('company', 'Bankist');
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data Attributes
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c');
// // Don't use will override all existing classes
// logo.className = 'jonas';

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) - min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)}) `;
// console.log(randomColor());

// const navLink = document.querySelector('.nav__link');
// const navLinks = document.querySelector('.nav__links');
// const nav = document.querySelector('nav');
// const header = document.querySelector('header');

// navLink.addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   e.stopPropagation();
// });

// navLinks.addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
// });

// nav.addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
// });
// header.addEventListener(
//   'click',
//   function (e) {
//     e.preventDefault();
//     this.style.backgroundColor = randomColor();
//   },
//   true
// );

// const h1 = document.querySelector('h1');

// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.style.color = '#fff';
// h1.lastElementChild.style.color = 'orangered';

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.05)';
//   }
// });
