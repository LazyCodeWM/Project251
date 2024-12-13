import { Server } from 'socket.io';

let onlineUsers = 0;

export default function setupSocketServer(server) {
  const io = new Server(server);

  io.on('connection', (socket) => {
    onlineUsers++;
    io.emit('onlineUsers', onlineUsers);

    socket.on('disconnect', () => {
      onlineUsers--;
      io.emit('onlineUsers', onlineUsers);
    });
  });
}
