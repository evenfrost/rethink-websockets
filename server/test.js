'use strict';

import co from 'co';
const r = require('rethinkdbdash')();

const coroutine = function (f) {
  let o = f();

  return function (x) {
    o.next(x);
  };
};

co(function* () {
  let users = yield r.table('users');

  // let article = yield r.table('articles').insert({
  //   name: 'Another test article',
  //   content: 'Lorem ipsum'
  // });
  
  // yield r.table('articles').filter({ name: 'Test article' }).update({ comments: ['test comment', 'another test comment'] });

  let articles = yield r.table('articles');

  let filter = yield r.table('articles').filter(r.row('name').eq('Test article'));
  let count = yield r.table('articles').filter({ name: 'Test article' }).nth(0).getField('comments').count();

  console.log('articles', articles);
  console.log('filter', filter);
  console.log('count', count);
  
  // articles.toArray().then(articles => console.log(articles));
});
