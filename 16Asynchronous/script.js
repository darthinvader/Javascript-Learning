'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
        `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
// // const getCountryAndNeighbour = function (country) {
// //   // AJAX call country 1
// //   const request = new XMLHttpRequest();
// //   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// //   request.send();

// //   request.addEventListener('load', function () {
// //     const [data] = JSON.parse(this.responseText);
// //     console.log(data);
// //     // render Country 1
// //     renderCountry(data);

// //     // Get neighbour country
// //     const [neighbour] = data.borders;
// //     if (!neighbour) return;

// //     const request2 = new XMLHttpRequest();
// //     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
// //     request2.send();

// //     request2.addEventListener('load', function () {
// //       const data2 = JSON.parse(this.responseText);
// //       console.log(data2);

// //       renderCountry(data2, 'neighbour');
// //     });
// //   });
// // };

// // getCountryAndNeighbour('portugal');
// // getCountryAndNeighbour('usa');

// // const request = new XMLHttpRequest();
// // request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// // request.send();

// // const request = console.log(request);

// // const getCountryData = function (country) {
// //   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
// //     .then(function (response) {
// //       console.log(response);
// //       return response.json();
// //     })
// //     .then(function (data) {
// //       console.log(data);
// //       renderCountry(data[0]);
// //     });
// // };

// // const getCountryData = function (country) {
// //   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
// //     .then(response => {
// //       console.log(response);
// //       if (!response.ok) throw new Error(`Country not found${response.status}`);
// //       response.json();
// //     })
// //     .then(data => {
// //       renderCountry(data[0]);
// //       const neighbour = data[0].borders[0];

// //       if (!neighbour) return;
// //       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
// //     })
// //     .then(response => response.json())
// //     .then(data => renderCountry(data, 'neighbour'))
// //     .catch(err => {
// //       console.error(`${err} 💥💥💥💥`);
// //       renderError(`Something went wrong 💥💥💥💥 ${err.message}. Try again! `);
// //     })
// //     .finally(() => {
// //       countriesContainer.style.opacity = 1;
// //     });
// // };

// // btn.addEventListener('click', function () {
// //   getCountryData('portugal');
// // });

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   getJSON(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error(`No neighbour found`);
//       return getJSON(
//         `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥💥`);
//       renderError(`Something went wrong 💥💥💥💥 ${err.message}. Try again! `);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });

// console.log('Test Start');

// setTimeout(() => console.log('0 sec timer'), 0);

// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 10000000000; i++) {}
//   console.log(res);
// });

// console.log('Test end');

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰💰💰');
//     } else {
//       reject('You lost your money 📛');
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// // Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const wait = seconds =>
//   new Promise(resolve => setTimeout(resolve(), seconds * 1000));

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 second'));

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(pos => console.log(pos));

// const imgContaainer = document.querySelector('.images');

// const createImage = function (imgsrc) {
//   return new Promise(function (resolve, reject) {
//     const imgEl = document.createElement('img');
//     imgEl.src = imgsrc;
//     imgEl.addEventListener('load', function () {
//       imgContaainer.append(imgEl);
//       resolve(imgEl);
//     });
//     imgEl.addEventListener('error', function () {
//       reject(new Error('Image not found!'));
//     });
//   });
// };
// let currentImage;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     console.log(`Image 1 loaded`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => (currentImage.style.display = 'none'))
//   .catch(err => {
//     console.log(err);
//   });

// const whereAmI = async function (country) {
//   try {
//     const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
//     if (!res) throw new Error('Problem getting location data!');
//     const data = await res.json();
//     console.log(data);
//     renderCountry(data[0]);

//     return `You are in ${country}`;
//   } catch (err) {
//     console.error(err);
//     renderError(`Something went wrong ${err.message}`);
//     // Reject promise from async function
//     throw err;
//   }
// };
// console.log('1:Will get location');
// const city = whereAmI('portugal');
// whereAmI('sad')
//   .then(city => console.log(city))
//   .catch(err => console.error(err))
//   .finally(() => console.log('3:Finished getting location'));
// console.log(city);

// (async function () {
//   try {
//     const country = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2:${err.message}`);
//   }
//   console.log('3 Finished getting location');
// })();
// try {
//   let y = 1;
//   const x = 2;
//   x = y;
// } catch (err) {
//   alert(err);
// }

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const data = await Promise.all([
//       getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
//       getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
//       getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
//     ]);

//     console.log(data.map(d => d[0].capital));
//   } catch (err) {}
// };
// get3Countries('portugal', 'canada', 'tanzania');

// Promise.race
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
//     getJSON(`https://restcountries.eu/rest/v2/name/portugal`),
//     getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
//   timeout(1),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// //Promise.all Settled
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));
