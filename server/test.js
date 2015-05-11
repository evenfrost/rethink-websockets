import rdash from 'rethinkdbdash';
const r = rdash();

let getData = function* () {
  try {
    let result = yield r.table('users');
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

let it = getData();

r.table('users').run()
  .then(users => console.log(users));
