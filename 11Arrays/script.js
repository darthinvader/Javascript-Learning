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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, index) {
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

const calcDisplayBalance = function (acc) {
  const movements = acc.movements;
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
  acc.balance = balance;
};

const calcDisplaySummary = function (account) {
  const movements = account.movements;
  const interestRate = account.interestRate;
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
    .map(deposit => (deposit * interestRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (account) {
  // Display Balance
  calcDisplayBalance(account);
  // Display Movements
  displayMovements(account.movements);
  // Display Summary
  calcDisplaySummary(account);
};

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

createUsernames(accounts);

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submiting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = '1';

    // Clear Input Fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // Display Balance
    updateUI(currentAccount);
    console.log('Login');
  }
  console.log(currentAccount);
});

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
    amount <= currentAccount.balance &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= 0.1 * loanAmount)
  ) {
    currentAccount.movements.push(loanAmount);
    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    console.log('YES!');
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete Account
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal);

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // Equality
// console.log(movements.includes(-130));
// // Some Condition
// const anyDeposits = movements.some(mov => mov > 1500);
// console.log(anyDeposits);
// // Every
// const allAreDeposits = movements.every(mov => mov >= -650);
// console.log(allAreDeposits);

// // Seperate Callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(Infinity));

// const accountMovements = accounts.map(acc => acc.movements).flat();
// console.log(accountMovements);

// const overallBalance = accountMovements.reduce((acc, mov) => acc + mov);
// console.log(overallBalance);

// const overalBalance = accounts.flatMap(acc => acc.movements);
// console.log(overalBalance);

// Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// // Numbers
// console.log(movements);
// // Return < 0 A,B(keep order)
// // Return > 0 B,A(swith order)

// // movements.sort((a, b) => b - a);
// console.log(movements);

// let x = new Array(7);
// // x = x.map(() => 5);
// console.log(x);

// x.fill(10, 3, 5);

// console.log(x);

// let arr = new Array(10);
// arr.fill(4, 4, 7);
// console.log(arr);

// // Array.from
// const arr2 = Array.from({ length: 7 }, () => 1);
// console.log(arr2);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );

//   const movementsUI2 = [...document.querySelectorAll('.movements__value')];
//   console.log(movementsUI2);
// });

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => (dog.recommendedFood = dog.weight ** 0.75 * 28));

console.log(dogs);

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > 1.1 * dog.recommendedFood)
  .map(dog => dog.owners)
  .flat();

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < 0.9 * dog.recommendedFood)
  .map(dog => dog.owners)
  .flat();
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

console.log(
  dogs.some(
    dog =>
      dog.curFood < 1.1 * dog.recommendedFood &&
      dog.curFood > 0.9 * dog.recommendedFood
  )
);

console.log(
  dogs.filter(
    dog =>
      dog.curFood < 1.1 * dog.recommendedFood &&
      dog.curFood > 0.9 * dog.recommendedFood
  )
);

const newdogs = dogs.slice();

console.log(newdogs);

newdogs.sort((dog1, dog2) => dog1.recommendedFood - dog2.recommendedFood);

console.log(newdogs);
