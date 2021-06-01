'use strict';

// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   // ES5
//   // numPassengers = numPassengers || 1;
//   // price = price || 199;
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 3);
// createBooking('LH123', 2, 900);
// createBooking('LH123', undefined, 700);

// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmdtman',
//   passport: 234334343,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 234334343) {
//     alert('Check In');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 1000000000);
// };

// newPassport(jonas);
// console.log(jonas);

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// // Higher-order function
// const transformer = function (str, fn) {
//   console.log(`Original string ${str}`);

//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer('Javascript is the best', upperFirstWord);

// transformer('Javascript is the best', oneWord);

// // JS uses callbacks all the time
// const high5 = function () {
//   console.log('👋');
// };

// document.body.addEventListener('click', high5);

// ['Jonas', 'Martha', 'Adam'].forEach(high5);

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };
// const greet = greeting => name => console.log(`${greeting} ${name}`);

// const greeter = greet('Hello');
// greeter('John');
// greeter('Jonas');
// greeter('Steven');
// greeter('Mike');

// greet('Hello')('Smettman');

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seeat on ${this.airline} flight ${this.iataCode} with ${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode} with ${flightNum}` });
//   },
// };

// lufthansa.book(239, 'John P');
// lufthansa.book(239, 'Johnas K');

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;
// // book(23, 'Sarah Williams');
// book.call(eurowings, 23, 'Sarah Williams');

// book.call(lufthansa, 238, 'Mary Cooper');

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 234, 'Will Smith');

// // Apply Method
// book.apply(swiss, [23, 'George Wash']);

// // Bind method
// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);
// bookEW(23, 'George Fiss');

// const bookEW23 = book.bind(eurowings, 23);
// bookEW23('Sam Wiliams');

// // with Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// // Partial apllication

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);

// console.log(addVAT(200));

// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };

// const addVAT2 = addTaxRate(0.23);

// console.log(addVAT2(200));

// const poll = {
//   question: 'What is your favorite programming language?',
//   options: ['0:Javascript', '1:Python', '2:Rust', '3:C++'],
//   answer: new Array(4).fill(0),
//   registerNewAnswer() {
//     let answer = Number(
//       prompt(
//         'What is your favorite programming language?\n0: Javascript\n1:Python\n2:Rust\n3:C++\nWrite Option number'
//       )
//     );
//     if (answer === 'number' && answer >= 0 && answer <= 3) {
//       this.answer[answer]++;
//       console.log(this.answer);
//     } else {
//       console.log('Wrong Number');
//     }
//   },

//   displayResults(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answer);
//     } else if (type == 'string') {
//       console.log(`The answer were: ${this.answer.join(',')}`);
//     }
//   },
// };
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// poll.displayResults();
// poll.displayResults('string');

// (function () {
//   console.log('This will never run again');
//   const isPrivate = 23;
// })();

// (() => console.log('This will also never run again'))();

// const secureBooking = function () {
//   let passengerCount = 0;

//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// const booker = secureBooking();
// booker();
// booker();
// booker();
// booker();
// booker();
// booker();
// booker();
// booker();
// booker();
// booker();
// booker();

// console.dir(booker);

// const secSecBook = function () {
//   let passengerCount = 0;

//   return function () {
//     let passengerCount2 = 0;

//     return function () {
//       passengerCount++;
//       passengerCount2++;
//       console.log(passengerCount);
//       console.log(passengerCount2);
//     };
//   };
// };

// const secBook = secSecBook();

// const book = secBook();

// book();
// book();
// book();
// // book();

// let f;

// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// };

// g();
// f();

// const h = function () {
//   const b = 777;
//   f = function () {
//     console.log(b * 2);
//   };
// };

// h();
// f();

// // Example 2
// const boardPasengers = function (n, wait) {
//   // const perGroup = n / 3;

//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passengers`);
//     console.log(`There are 3 groups each with ${perGroup} passengers`);
//   }, wait * 1000);

//   console.log(`Will start boarding in ${wait} seconds`);
// };

// const perGroup = 100;
// boardPasengers(180, 3);

// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';
//   header.addEventListener('click', () => {
//     header.style.color = 'blue';
//   });
// })();
