'use strict';

export const list = () => {
  const r = require('rethinkdbdash')();

  return new Promise((resolve, reject) => {
    r.table('users').run()
      .then((users) => {
        resolve(users);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const get = (skip) => {
  const r = require('rethinkdbdash')();

  skip = +skip || 0;
  console.log('skip', skip);

  return new Promise((resolve, reject) => {
    r.table('users').skip(skip).limit(1).run()
      .then((users) => {
        console.log(users);
        resolve(users[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
