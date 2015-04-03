module.exports.getList = () => {
  console.log('getList');
  const r = require('rethinkdbdash')(),
        wss = require('../lib/sockets'),
        ctx = this;

  return wss.on('connection', (ws) => {
    r.table('users').run()
      .then((users) => {
        console.log(users);
        ws.send(users);
      })
      .catch((err) => {
        console.log(err);
        ctx.status = 500;
        ctx.body = { error: err };
      });
  });

};
