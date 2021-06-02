'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, index) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
};
calcDisplayBalance(account1.movements);
// console.log(containerMovements.innerHTML);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes}€`;

  const out = Math.abs(
    movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov)
  );
  labelSumOut.textContent = `${out}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter(int => int > 1)
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${interest}€`;
};

calcDisplaySummary(account1.movements);

const user = 'Steven Thomas Williams';
const createUsernames = function (accounts) {
  return accounts.forEach(user => {
    user.username = user.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

// console.log();

console.log(createUsernames(accounts));

console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -1));
// console.log(arr.slice());
// console.log([...arr]);
// console.log(arr);

// Splice

// console.log(arr.splice(2));
// arr.splice(-1);

// arr.splice(1, 2);
// console.log(arr);

// Reverse
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// //
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// // JOIN

// console.log(letters.join(' - '));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const move of movements) {
//   if (move > 0) {
//     console.log(`Deposited ${move}`);
//   } else {
//     console.log(`Withdrawed ${Math.abs(move)}`);
//   }
// }

// movements.forEach(movement =>
//   console.log(
//     movement > 0 ? `Deposited ${movement}` : `Withdrawed ${Math.abs(movement)}`
//   )
// );

// movements.forEach((movement, index) =>
//   console.log(
//     movement > 0
//       ? `Deposited ${movement} at movement ${index}`
//       : `Withdrawed ${Math.abs(movement)} at movement ${index}`
//   )
// );

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// const currenciesUnique = new Set(['USD', 'EUR', 'GBP']);
// currenciesUnique.forEach(function (value, _, set) {
//   console.log(`${value}`);
// });

// const checkDogs = (dogsJulia, dogsKate) => {
//   dogsJulia = dogsJulia.slice(1);
//   dogsJulia = dogsJulia.slice(0, -2);
//   console.log(dogsJulia);

//   dogsJulia.forEach(age => console.log(age >= 3 ? 'Adult' : 'Puppy'));
//   dogsKate.forEach(age => console.log(age >= 3 ? 'Adult' : 'Puppy'));
// };

// const dogsJulia = [1, 2, 3, 4, 5, 6];
// checkDogs(dogsJulia, [1, 2, 3, 4]);

//  map method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;
// const movToUsd = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// const movToUsd = movements.map(mov => mov * eurToUsd);

// console.log(movToUsd);

// const k = movements.map(
//   (mov, i, arr) =>
//     `Transfer ${i + 1}:You ${mov > 0 ? 'Deposited' : 'Withdrawn'} ${mov}`
// );

// console.log(k);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(mov => mov > 0);
// const withdrawals = movements.filter(mov => mov <= 0);

// console.log(deposits);
// console.log(withdrawals);

// REDUCE
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const balance = movements.reduce((acc, cur) => acc + cur, 0);

// console.log(balance);
// // Maximum value

// const maximum = movements.reduce(
//   (acc, val) => (acc < val ? val : acc),
//   movements[0]
// );
// console.log(maximum);

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages
//     .map(age => (age <= 2 ? age * 2 : 16 + 4 * age))
//     .filter(age => age > 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

//   console.log(humanAges);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;

// const totalDepositsUSB = movements
//   .filter(mov => mov < 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov);

// console.log(totalDepositsUSB);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
