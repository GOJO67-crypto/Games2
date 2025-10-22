const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let rooms = {};

io.on('connection', socket => {
  socket.on('createRoom', ({ username, isPrivate }) => {
    const roomId = isPrivate
      ? 'private-' + Math.random().toString(36).substr(2, 5).toUpperCase()
      : 'public-' + Math.random().toString(36).substr(2, 5);
    rooms[roomId] = { players: [username], isPrivate };
    socket.join(roomId);
    socket.emit('roomCreated', { roomId });
  });

  socket.on('joinRoom', ({ roomId, username }) => {
    if (rooms[roomId]) {
      rooms[roomId].players.push(username);
      socket.join(roomId);
      io.to(roomId).emit('playerJoined', { username });
    } else {
      socket.emit('error', 'Room not found');
    }
  });

  socket.on('playCard', ({ roomId, card, username }) => {
    io.to(roomId).emit('cardPlayed', { card, username });
  });

  socket.on('disconnect', () => {
    // Optional: handle player leaving
  });
});

server.listen(3000, () => console.log('UNO server running on port 3000'));
