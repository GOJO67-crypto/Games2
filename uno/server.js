const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let lobbies = {}; // { lobbyId: { players: [], isPrivate: true/false } }

io.on('connection', socket => {
  socket.on('createLobby', ({ username, isPrivate }) => {
    const lobbyId = isPrivate ? generatePrivateCode() : generatePublicId();
    lobbies[lobbyId] = { players: [username], isPrivate };
    socket.join(lobbyId);
    socket.emit('lobbyCreated', { lobbyId });
  });

  socket.on('joinLobby', ({ lobbyId, username }) => {
    if (lobbies[lobbyId]) {
      lobbies[lobbyId].players.push(username);
      socket.join(lobbyId);
      io.to(lobbyId).emit('playerJoined', { username });
    } else {
      socket.emit('error', 'Lobby not found');
    }
  });

  // Add game logic here...

  socket.on('disconnect', () => {
    // Handle player leaving
  });
});

function generatePublicId() {
  return 'public-' + Math.random().toString(36).substr(2, 5);
}

function generatePrivateCode() {
  return 'private-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}

server.listen(3000, () => console.log('Server running on port 3000'));
