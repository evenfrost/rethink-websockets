'use strict';

import _ from 'lodash';
import window from 'github/fetch';

const ws = {

  initialize: () => {
    ws.open();
  },

  open: () => {
    ws.socket = new WebSocket('ws://localhost:8081');

    ws.socket.onmessage = ws.onSocketMessage;
  },

  send: (message) => {
    ws.socket.send(message);
  },

  onSocketMessage: (event) => {
    console.log('a message from server');
    console.log(event);
  },

  getUsers: () => {

    return fetch('/users')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        let users = json.users,
            main = document.querySelector('main');

        for (let user of users) {
          let div = document.createElement('div');
          div.textContent = user.name + ', ' + user.email;
          main.appendChild(div);
        }

      })
      .catch((err) => {
        return console.error(err);
      });
    
  }

};

ws.initialize();

document.querySelector('button').addEventListener('click', () => {
  ws.send('a message from client');
});
