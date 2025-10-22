const socket = io();

function createRoom(isPrivate) {
  const username = document.getElementById("username").value;
  socket.emit('createRoom', { username, isPrivate });
}

function joinRoom() {
  const username = document.getElementById("username").value;
  const roomId = document.getElementById("roomCode").value;
  socket.emit('joinRoom', { roomId, username });
}

socket.on('roomCreated', ({ roomId }) => {
  document.getElementById("status").innerText = "Room created: " + roomId;
  window.location.href = `uno.html?room=${roomId}`;
});

socket.on('playerJoined', ({ username }) => {
  console.log(username + " joined the room");
});

socket.on('error', msg => {
  alert(msg);
});
