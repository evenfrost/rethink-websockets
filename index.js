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

import * as userService from './server/services/user';
import socket from './server/lib/socket';
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

router.get('/articles', function* (next) {
  yield this.render('articles', {
    articles: []
  });
});

// serve jspm packages
router.get(/^\/packages\//, serve(path.join(__dirname, 'client')));

// use router
app
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen(4000);

socket(server);
