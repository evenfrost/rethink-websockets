'use strict';

import fs from 'fs';
import path from 'path';
import koa from 'koa';
import serve from 'koa-static';
import views from 'koa-views';
import logger from 'koa-logger';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import error from 'koa-error';
import body from 'koa-body';
import methodOverride from 'koa-methodoverride';
import send from 'koa-send';
import jade from 'jade';
import './server/test.js';

const router = require('koa-router')();
const app = koa();

app
  .use(body())
  .use(methodOverride())
  .use(logger())
  .use(conditional())
  .use(etag())
  .use(error())
  .use(serve(path.join(__dirname, 'public')));

// Jade templates
app.use(views(path.join(__dirname, 'server/views'), {
  default: 'jade'
}));

// index route
router.get('/', function* () {
  let scripts = [];
  let styles = [];

  if (app.env === 'production') {
    scripts.push('bundle.js');
    styles.push('bundle.css');
  } else {
    scripts.push(
      '/packages/system.js',
      '/config.js',
      '/scripts/loader.js'
    );
    styles.push(
      '/styles/index.css'
    );
  }

  yield this.render('index', {
    scripts: scripts,
    styles: styles
  });

});

// serve jspm config file
router.get('/config.js', function* (next) {
  yield send(this, path.join(__dirname, 'jspm.config.js'));
});

router.get('/test', function* (next) {
  this.body = 'Hello, world';
});

// serve jspm packages
router.get(/^\/packages\//, serve(path.join(__dirname, 'client')));

// use router
app
  .use(router.routes())
  .use(router.allowedMethods());
const server = app.listen(4000);

// const WebSocketServer = require('./server/lib/ws').Server,
const WebSocketServer = require('ws').Server,
      // wss = new WebSocketServer({ port: 8081 }),
      wss = new WebSocketServer({ server: server });
// console.log(WebSocketServer.prototype.on);
let userService = require('./server/services/user');

userService.list()
  .then((users) => {
    // console.log(users);
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

      userService.get(message.skip)
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


