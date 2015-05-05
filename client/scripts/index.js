'use strict';

import _ from 'lodash';
import { ws } from 'scripts/ws';
import 'web-animations';
// import window from 'github/fetch';

ws.initialize();

document.querySelector('[data-element="user-add-button"]').addEventListener('click', (event) => {
  let button = event.target;

  button.disabled = true;
  ws.send(JSON.stringify({
    type: 'user',
    skip: button.dataset.skip
  }));
});

ws.socket.addEventListener('message.user', (event) => {
  let userList = document.querySelector('[data-element="user-list"]'),
      button = document.querySelector('[data-element="user-add-button"]');

    if (event.detail) {
      let range = document.createRange(),
          userElement = document.createElement('div'),
          userElementStyle;

      userElement.innerHTML = event.detail;
      userElement = userElement.firstChild;

      userElementStyle = window.getComputedStyle(userElement);
      userList.appendChild(userElement);
      
      userElement.animate([
        {
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0
        },
        {
          height: userElement.offsetHeight,
          opacity: 1,
          paddingTop: parseInt(userElementStyle.paddingTop),
          paddingBottom: parseInt(userElementStyle.paddingBottom),
          marginTop: parseInt(userElementStyle.marginTop),
          marginBottom: parseInt(userElementStyle.marginBottom)
        }
      ], {
        duration: 500,
        easing: 'ease'
      });

      button.dataset.skip++;
    }

    button.disabled = false;
});

window.addEventListener('beforeunload', (event) => {
  ws.socket.onclose = () => {};
  ws.socket.close();
});
