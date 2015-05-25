'use strict';

let promise = (succeed) => {

  return new Promise((resolve, reject) => {
    if (succeed) {
      setTimeout(() => {
        resolve('resolved');
      }, 500);
    } else {
      setTimeout(() => {
        reject('rejected');
      }, 500);
    }
  });

};

// promise(false)
//   .then(result => console.log('result', result))
//   .catch(err => console.log('err', err));

// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('done');
//   }, 500);
// });


// let promise2 = Promise.resolve(promise(false));

// promise2
//   .then(result => console.log('result', result))
//   .catch(err => console.log('err', err));


// promise2.then((result) => {
//   console.log(result);
// });

Promise
  .all([promise(true), promise(true), promise(true)])
  .then(values => console.log('resolved:', values))
  .catch(err => console.log('rejected:', err));
