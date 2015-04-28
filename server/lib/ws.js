'use strict';

const WebSocketServer = require('ws').Server;

WebSocketServer.prototype.onAsync = (type) => {
  let proto = this;

  return new Promise((resolve, reject) => {
    try {
      proto.on(type, (ws) => {
        console.log(ws);
        resolve(ws);
      });
    } catch (err) {
      console.log('err', err);
      reject(err);
    }
  });
};

module.exports = {
  Server: WebSocketServer
};
