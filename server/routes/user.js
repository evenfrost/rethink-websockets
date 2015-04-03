'use strict';

module.exports.getList = function* (next) {
  const r = require('rethinkdbdash')(),
        ctx = this;

  yield r.table('users').run()
    .then((users) => {
      ctx.body = { users: users };
    })
    .catch((err) => {
      ctx.status = 500;
      ctx.body = { error: err };
    });
};
