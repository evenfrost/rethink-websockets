'use strict';

import _ from 'lodash';
import window from 'github/fetch';

const Index = {

  initialize: () => {
    Index.openSocket();
  },

  openSocket: () => {
    Index.socket = new WebSocket('ws://localhost:8081');

    Index.socket.onmessage = Index.onSocketMessage;
  },

  onSocketMessage: (event) => {
    console.log('onSocketMessage');
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

Index.initialize();
