'use strict';

const Person = function (firstName, birthYear) {
  // Instance properties

  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const jonas = new Person('Jonas', 1991);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

const jay = 'Jay';

console.log(jonas instanceof Person);

// Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();

console.log(jonas.__proto__ == Person.prototype);
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person));

console.log(Person.prototype === jonas.__proto__);
console.log(matilda.__proto__ === jonas.__proto__);

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.log(Person.prototype.constructor);

const arr = [1, 2, 3]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());
const h1 = document.querySelector('h1');
console.log(h1.__proto__);
console.dir(x => x + 1);

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const car = new Car(0, 0);
car.accelerate();
car.accelerate();
car.accelerate();
car.accelerate();
car.brake();
car.accelerate();

const car2 = new Car('Helo', 5000);
car2.brake();
car2.brake();
car2.brake();
car2.brake();
car2.brake();
console.log(car);
console.log(car2);

// Class expression
// const PersonCl = class {};
// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }
  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      console.log('This is not a full name');
    }
  }

  get fullName() {
    return this._fullName;
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);

jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

jessica.greet();

// 1. Classes are NOT hoisted
// 2. Class are first-class citizens
// 3. Classes re executed in strict mode

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(movement) {
    this.movements.push(movement);
  },
};

console.log(account.latest);
account.latest = 5000;
console.log(account.latest);

console.log(jessica.age);

const walter = new PersonCl('Walter', 1965);
