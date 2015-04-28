'use strict';

import _ from 'lodash';
// import window from 'github/fetch';

const ws = {

  initialize: () => {
    console.log('inited');
    ws.open();
  },

  open: () => {
    ws.socket = new WebSocket('ws://localhost:4000');
    console.log(ws.socket);

    ws.socket.onmessage = ws.onmessage;
    ws.socket.onerror = ws.onerror;
    ws.socket.onclose = ws.onclose;
  },

  send: (message) => {
    console.log(ws.socket.send);
    console.log(message);
    ws.socket.send(message);
  },

  onmessage: (event) => {
    console.log('a message from server');
    console.log(event);
  },

  onerror: (err) => {
    console.error('Error:', err);
  },

  onclose: () => {
    console.log('closed');
    setTimeout(ws.initialize, 1500);
  }

};

ws.initialize();

document.querySelector('button').addEventListener('click', (event) => {
  var button = event.target;

  ws.send(JSON.stringify({
    type: 'user',
    skip: button.dataset.skip++
  }));
});

window.addEventListener('beforeunload', (event) => {
  console.log('unloading');
  ws.socket.onclose = () => {};
  ws.socket.close();
});
