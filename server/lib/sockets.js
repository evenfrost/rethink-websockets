'use strict';

const WebSocket = require('ws'),
      WebSocketServer = WebSocket.Server,
      wss = new WebSocketServer({ port: 8081 }),
      server = {};

module.exports.on = (type) => {
  return new Promise((resolve, reject) => {
    try {
      wss.on(type, (ws) => {
        /*let socket = {};

        socket.on = (socketEventType) => {
          return new Promise((socketResolve, socketReject) => {
            try {
              ws.on(socketEventType, (data) => {
                socketResolve(data);
              });
            } catch (err) {
              socketReject(err);
            }
          });
        }; */

        resolve(ws);
      });
    } catch (err) {
      console.log('err', err);
      reject(err);
    }
  });
};

// ws.on

// wss.on = Promise.resolve;

// module.exports = new Promise(resolve, reject) => {
//   try {

//     wss.on('connection', (ws) => {
//       resolve(ws);
//       ws.on('message', (message) => {
//         console.log('message: ' + message);
//       });
//     });

//   } catch (err) {
//     reject(err);
//   }
// }

// module.exports = wss;
