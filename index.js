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
      wss = require('./server/lib/sockets'),
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

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('message: ' + message);
  });
});

app.listen(4000);
