'use strict';

const router = require('koa-router')(),
      send = require('koa-send'),
      serve = require('koa-static'),
      path = require('path'),
      userController = require('./controllers/user'),
      app = require('koa')();

// index route
router.get('/', function* () {
  let scripts = [],
      styles = [];

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
  yield send(this, path.resolve(__dirname, '../jspm.config.js'));
});

router.get('/users', userController.getList);

// router.get('/test', function* (next) {
//   this.body = 'Hello, world';
// });

// serve jspm packages
router.get(/^\/packages\//, serve(path.resolve(__dirname, '../client')));

module.exports = router;

