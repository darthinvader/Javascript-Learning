'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [`day-${2 + 4}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours,

  order(startedIndex, mainIndex) {
    return [this.starterMenu[startedIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ name }) {
    console.log(name);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log('Pasta with', ing1, ing2, ing3);
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// console.log(restaurant.openingHours.mon.open);

// Optional Chainging

// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(open);
// }

// console.log(restaurant.openingHours?.mon?.open);

// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');

// const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// console.log(users[0]?.name ?? 'User Array empty');

// restaurant.orderDelivery(restaurant);

// const { name, categories, openingHours } = restaurant;
// console.log(name, categories, openingHours);

// const { name: restaurantName } = restaurant;

// console.log(restaurantName);

// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// let a = 111;
// let b = 999;

// const obj = { a: 2, b: 7, c: 3 };

// ({ a, b } = obj);

// console.log(a, b);

// const {
//   fri: { open, close },
// } = openingHours;

// console.log(open, close);

// const arr = [2, 3, 4];
// const [x, y, z] = arr;

// console.log(x, y, z);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// [secondary, main] = [main, secondary];
// console.log(main, secondary);

// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// const nested = [2, 4, [5, 6]];

// const [n, , k] = nested;
// const [i, , [l, m]] = nested;

// console.log(n, l, m);

// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

// const arr = [7, 8, 9];
// const goodNewArr = [1, 2, ...arr];
// console.log(goodNewArr);

// console.log(...goodNewArr);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// const mainMenuCopy = [...restaurant.mainMenu];

// const str = 'Jonas';
// const letters = [...str, ' ', 'S'];
// console.log(letters);

// const ingredients = [
//   prompt("Let's make pasta Ingredient 1"),
//   prompt("Let's make pasta Ingredient 2"),
//   prompt("Let's make pasta Ingredient 3"),
// ];

// restaurant.orderPasta(...ingredients);

// const newRestaurant = { foundedIn: 1995, ...restaurant, founder: 'Guissiper' };

// console.log(newRestaurant);

// const newRestaurant = { ...restaurant };

// const arr = [1, 2, ...[3, 4]];

// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, pasta, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];

// console.log(pizza, pasta, otherFood);

// const { sat, ...weekdays } = { ...restaurant.openingHours };

// console.log(weekdays);

// Functions

// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }

//   console.log(sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);

// const x = [23, 5, 7];
// add(...x);

// restaurant.orderPizza('mushroom', 'onions', 'olives');

// restaurant.orderPizza('mushrooms');

// Use any data type
// console.log(3 || 'Jonas');

// console.log('' || 'Jonas');

// console.log(true || 0);

// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'hello' || 23 || null);

// const guests = restaurant.numGuest || 10;
// console.log(guests);

// console.log(0 && 'Jonas');
// console.log(1 && 2);
// console.log(7 && 'Jonas');

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// console.log(restaurant.orderPizza && restaurant.orderPizza('spinach'));

// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// const [players1, players2] = [...game.players];
// console.log(players2);
// const [gk, ...fieldPlayers] = players1;
// console.log(fieldPlayers);

// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// const { team1, draw, team2 } = { ...game.odds };
// console.log(team1);

// function printGoals(...goals) {
//   let sum = 0;
//   for (let i = 0; i < goals.length; i++) {
//     sum += goals[i];
//   }
//   console.log(sum);
// }

// printGoals(1, 2, 3, 4, 5);
// NEVER MIND TUTORIAL IS NOT SO GOOD!!!!
// function printGoals(...players) {
//   let sum = 0;
//   for (let i = 0; i < players.length; i++) {
//     sum += players[i] in game.scored && 1;
//   }
//   console.log(sum);
// }

// printGoals('Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels');

// const isTeam2BetterThanTeam1 = team1 < team2;

// isTeam2BetterThanTeam1 && console.log('Team2');

// !isTeam2BetterThanTeam1 && console.log('Team1');

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) {
//   console.log(item);
// }

// for (const item of menu.entries()) {
//   console.log(item);
// }

// for (const [i, el] of menu.entries()) {
//   console.log(i, el);
// }

// console.log(menu.entries());

const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on  ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}

const values = Object.values(openingHours);
console.log(values);

const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
