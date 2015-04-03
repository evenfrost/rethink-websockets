'use strict';

const r = require('rethinkdbdash')(),
      wss = require('./server/lib/sockets');

r.table('users')
  .changes()
  .run()
  .then((cursor) => {
    cursor.each(console.log);
  });

r.table('users')
  .insert({
    name: 'Another user',
    email: 'another@mail.com'
  })
  .run();

r.table('users')
  .filter({ email: 'another@mail.com' })
  .delete()
  .run();

