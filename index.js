'use strict';

const fs = require('fs'),
      path = require('path'),
      koa = require('koa'),
      serve = require('koa-static'),
      views = require('koa-views'),
      logger = require('koa-logger'),
      conditional = require('koa-conditional-get'),
      etag = require('koa-etag'),
      error = require('koa-error'),
      body = require('koa-body'),
      json = require('koa-json'),
      methodOverride = require('koa-methodoverride'),
      router = require('./server/router'),
      // wss = require('./server/lib/ws),
      jade = require('jade'),
      app = koa();

app
  .use(body())
  .use(json())
  .use(methodOverride())
  .use(logger())
  .use(conditional())
  .use(etag())
  .use(error())
  .use(serve(path.resolve(__dirname, 'public')));

// Jade templates
app.use(views(path.resolve(__dirname, 'server/views'), {
  default: 'jade'
}));

// use router
app
  .use(router.routes())
  .use(router.allowedMethods());

// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     console.log('message: ' + message);
//   });
// });

const server = app.listen(4000);

// const WebSocketServer = require('./server/lib/ws').Server,
const WebSocketServer = require('ws').Server,
      // wss = new WebSocketServer({ port: 8081 }),
      wss = new WebSocketServer({ server: server });
// console.log(WebSocketServer.prototype.on);
let userService = require('./server/services/user');

userService.list()
  .then((users) => {
    console.log(users);
  });

wss.on('connection', (ws) => {
  console.log('connected');
  
  ws.on('message', (message) => {
    try {
      message = JSON.parse(message);
    } catch (err) {
      message = {};
    }

    if (message.type === 'user') {
      let skip = message.skip || 0;

      userService.get(skip)
        .then((user) => {
          ws.send(JSON.stringify({ type: 'user', content: user && jade.renderFile('server/views/user.jade', user) }));
        })
        .catch((err) => {
          throw err;
        });

    }

  });
  // ws.send('a message from server');

  ws.on('close', () => {
    console.log('disconnected');
  });

});

// wss.on = (type) => {
//   return new Promise((resolve, reject) => {
//     try {
//       wss.on(type, (ws) => {
//         resolve(ws);
//       });
//     } catch (err) {
//       console.log('err', err);
//       reject(err);
//     }
//   });
// };


// console.log(wss.onAsync);
// wss.onAsync('connection')
//   .then((ws) => {
//     console.log('connected');

//     ws.on('message', (message) => {
//       message = typeof message === 'object' ? JSON.parse(message) : {};

//       if (message.type === 'user') {
//         let skip = message.skip || 0;

//         userService.get(skip)
//           .then((user) => {
//             console.log(user);
//             ws.send(user);
//           })
//           .catch((err) => {
//             throw err;
//           });

//       }
//     });

//     ws.on('close', () => {
//       console.log('disconnected');
//     });

//   })
//   .catch((err) => {
//     console.log('err', err);
//   });

