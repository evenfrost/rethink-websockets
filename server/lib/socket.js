import ws from 'ws';

export default (server) => {
  const wss = new ws.Server({ server: server });

  wss.on('connection', (ws) => {
    console.log('connected');
    
    ws.on('message', (message) => {
      try {
        message = JSON.parse(message);
      } catch (err) {
        message = {};
      }
    });

    require('../test')(ws);

    ws.on('close', () => { console.log('disconnected'); });

  });
};
