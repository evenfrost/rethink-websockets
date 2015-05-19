'use strict';

const r = require('rethinkdbdash')(),
      bluebird = require('bluebird'),
      coroutine = function (f) {
        let o = f();

        return function (x) {
          o.next(x);
        };
      };

let getUsers = function* () {
  yield r.table('users');
};

let users = getUsers();
console.log(users.next());
// getIt.next().value.then(users => console.log(users));

let clock = coroutine(function* (_) {
  let users = yield r.table('users').then(users => users);
  console.log(users);
  yield users.map(user => user.name);
});

// let clock = function* () {
//   while (true) {
//     yield 'tick';
//     yield 'tack';
//   }
// };

// let it = clock();

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

clock();
clock();
clock();
// console.log(clock(''));
// console.log(clock(''));
// console.log(clock(''));
// console.log(clock(''));

// console.log(r.table('users'));

// bluebird.coroutine(function* () {
//   try {
//     let result = yield r.table('users');
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// })();
