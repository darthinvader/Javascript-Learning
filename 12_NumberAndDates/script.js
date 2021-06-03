'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-06-01T17:01:17.194Z',
    '2021-06-02T23:36:17.929Z',
    '2021-06-03T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const currencyFormat = function (value, locale, currency) {
  const formattedMov = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
  return formattedMov;
};

const dateFormat = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
};

const displayMovements = function (account, sort = false) {
  const movements = account.movements;
  const movementDates = account.movementDates;
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]);

    const formattedMov = currencyFormat(mov, account.locale, account.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${dateFormat(date, account.locale)}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const balance = currencyFormat(acc.balance, acc.locale, acc.currency);

  labelBalance.textContent = `${balance}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const incomesFormatted = currencyFormat(incomes, acc.locale, acc.currency);

  labelSumIn.textContent = `${incomesFormatted}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const outFormatted = currencyFormat(out, acc.locale, acc.currency);

  labelSumOut.textContent = `${outFormatted}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  const interestFormatted = currencyFormat(interest, acc.locale, acc.currency);

  labelSumInterest.textContent = `${interestFormatted}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, countDown;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // If countdown exists then clear countdown
    countDown && clearInterval(countDown);
    countDown = startLogoutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

const startLogoutTimer = function () {
  const tick = function () {
    time--;

    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI

    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(countDown);
      labelWelcome.textContent = 'Login to get started';
      containerApp.style.opacity = 0;
    }
  };

  // Set time to 5 minutes
  let time = 30;

  // Call the timer every second
  const countDown = setInterval(tick, 1000);
  return countDown;
  // When 0 seconds, stop timer and log out user
};

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Add movement date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
    countDown && clearInterval(countDown);
    countDown = startLogoutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);
      // Add movement date
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';

  countDown && clearInterval(countDown);
  countDown = startLogoutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 1;

// day/month/year
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// console.log(23 === 23.0);

// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3);

// // Converted
// console.log(+'23');
// console.log(Number('23'));

// // Parsing
// console.log(Number.parseInt('30px', 10));
// console.log(Number.parseInt('e30px', 10));

// console.log(Number.parseFloat('2.5rem'));
// console.log(Number.parseInt('2.5rem'));
// console.log(Number.parseInt('       2.5rem   '));
// console.log(parseInt('2.5rem'));
// console.log(parseFloat('2.5rem'));

// console.log(Number.isNaN(20));
// console.log(Number.isNaN(NaN));
// console.log(Number.isNaN('20'));

// console.log(20 / 0);
// console.log(Number.isNaN(20 / 0));

// // Good way to check if value is a number
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite(Infinity));
// console.log(Number.isFinite(+'20X'));
// console.log(Number.isFinite(23 / 0));

// // Check
// console.log(Number.isInteger(23));
// console.log(Number.isInteger(23.0));
// console.log(Number.isInteger(23 / 0));

// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));
// console.log(8 ** (1 / 3));

// console.log(Math.max(5, 15, 6, 732, 23));
// console.log(Math.max(5, 15, 6, '732', 23));
// console.log(Math.max(5, 15, 6, '732px', 23));

// console.log(Math.min(5, 11, 2, 4));

// console.log(Math.PI);
// console.log(Math.PI * Number.parseFloat('10px') ** 2);

// console.log(Math.trunc(Math.random() * 6 + 1));

// const randomInt = (min, max) => Math.trunc(Math.random() * max - min + 1);

// console.log(Math.round(2.3));
// console.log(Math.round(2.8));

// console.log(Math.ceil(2.3));
// console.log(Math.ceil(2.8));
// console.log(Math.ceil('2.8'));

// console.log(Math.floor(2.3));
// console.log(Math.floor(2.8));
// console.log(Math.floor('2.8'));

// console.log(Math.floor(-23.3));
// console.log(Math.trunc(-23.3));

// // Rounding decimals
// console.log((2.7).toFixed(0));
// console.log((2.766).toFixed(1));
// console.log((2.766).toFixed(7));
// console.log(+(2.766).toFixed(7));

// console.log(5 % 2);
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53);
// console.log(2 ** 53 + 1);

// console.log(4565434565456754345654456545654565455445445n);
// console.log(BigInt(4565434565456754345654456545654565455445445));

// // Operations

// console.log(10000n + 10000n);
// console.log(2198372189382173123n + 9213762783746237849348n);

// const huge = 2323232324234242n;
// const num = 23;
// // console.log(huge * num);
// console.log(huge * BigInt(num));

// console.log(20n > 15);
// console.log(20n === 20);
// console.log(20n == 20);

// console.log(huge + 'Is Really big!!!!');

// // console.log(Math.sqrt(16n));

// // Divisions

// console.log(10n / 3n);
// console.log(10 / 3);

// Create a date
// const now = new Date();

// console.log(now);
// console.log(new Date('Aug 02 2020 18:09:34'));
// console.log(new Date('December 24, 2015'));
// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(2037, 10, 19, 15, 23, 5));
// console.log(new Date(2037, 10, 31));

// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getHours());
// console.log(future.toISOString());
// console.log(future.getTime());
// console.log(Date.now());

// future.setFullYear(2040);
// console.log(future);

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future);

// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// console.log(calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 17)));

// const options = {
//   style: 'unit',
//   unit: 'celsius',
// };
// const options2 = {
//   style: 'currency',
//   currency: 'EUR',
// };
// const num = 388845.23;
// console.log(new Intl.NumberFormat('en-US', options).format(num));
// console.log(new Intl.NumberFormat('de-DE', options).format(num));

// const ingredients = ['olives'];

// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your Pizza 🍕 with ${ing1} and ${ing2}`),
//   3000,
//   ...ingredients
// );

// console.log('Waiting...');
// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// //
// setInterval(() => {
//   console.log(new Date());
// }, 1000);
