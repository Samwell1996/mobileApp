import socket from 'socket.io-client';

class SocketApi {
  socket = null;

  init(token) {
    this.socket = socket('https://localhost:3000', {
      query: {
        token,
      },
      transport: ['websocket'],
    });
    this.socket.on('connect', () => {
      console.log('Connect');
      console.log({ socket });
    });
  }
}
