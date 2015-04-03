const WebSocketServer = require('ws').Server,
      wss = new WebSocketServer({ port: 8081 });

module.exports = wss;
