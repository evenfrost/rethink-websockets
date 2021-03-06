'use strict';

import co from 'co';
import { wss } from '../index';
import rethinkdbdash from 'rethinkdbdash';

const r = rethinkdbdash();

  co(function* () {
    let users = yield r.table('users');

    // let article = yield r.table('articles').insert({
    //   name: 'Another test article',
    //   content: 'Lorem ipsum'
    // });
    
    // yield r.table('articles').filter({ name: 'Test article' }).update({ comments: ['test comment', 'another test comment'] });

    r.table('articles').changes().run({ cursor: true })
      .then(cursor => cursor.each((err, row) => ws.send(JSON.stringify({ type: 'article', content: row }))));

    // let count = yield r.table('articles').map(x => 1).reduce((a, b) => a + b);
    let count = yield r.table('articles').map(x => 1).reduce((a, b) => { return a.add(b); });
    console.log('count', count);

    // let filter = yield r.table('articles').filter(r.row('name').eq('Test article'));
    // let count = yield r.table('articles').filter({ name: 'Test article' }).nth(0).getField('comments').count();

    // console.log('articles', articles);
    // console.log('filter', filter);
    // console.log('count', count);
    
    // articles.toArray().then(articles => console.log(articles));
  });
