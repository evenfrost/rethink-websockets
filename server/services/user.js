'use strict';

module.exports.list = () => {
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

module.exports.get = (skip) => {
  const r = require('rethinkdbdash')();

  skip = skip || 0;

  return new Promise((resolve, reject) => {
    r.table('users').skip(skip).limit(1).run()
      .then((users) => {
        resolve(users[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
