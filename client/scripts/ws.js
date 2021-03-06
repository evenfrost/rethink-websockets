export const ws = {

  initialize: () => {
    ws.open();
  },

  open: () => {
    ws.socket = new WebSocket('ws://localhost:4000');

    ws.socket.onmessage = ws.onmessage;
    ws.socket.onerror = ws.onerror;
    ws.socket.onclose = ws.onclose;
  },

  send: (message) => {
    ws.socket.send(message);
  },

  onmessage: (event) => {
    let data = event.data ? JSON.parse(event.data) : {};
    console.log('data', data);
    
    if (data.type) {
      let socketEvent = new CustomEvent('message.' + data.type, { detail: data.content });
      ws.socket.dispatchEvent(socketEvent);
    }
  },

  onerror: (err) => {
    console.error('Error:', err);
  },

  onclose: () => {
    console.log('closed');
    setTimeout(ws.initialize, 1500);
  }

};
