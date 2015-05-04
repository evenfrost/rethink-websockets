'use strict';

import _ from 'lodash';
import { ws } from 'scripts/ws';
// import window from 'github/fetch';

ws.initialize();

document.querySelector('[data-element="user-add-button"]').addEventListener('click', (event) => {
  var button = event.target;

  ws.send(JSON.stringify({
    type: 'user',
    skip: button.dataset.skip++
  }));
});

ws.socket.addEventListener('message.user', (event) => {
  let userList = document.querySelector('[data-element="user-list"]');
  console.log(event.detail);
  userList.insertAdjacentHTML('beforeend', event.detail);
});

window.addEventListener('beforeunload', (event) => {
  console.log('unloading');
  ws.socket.onclose = () => {};
  ws.socket.close();
});
