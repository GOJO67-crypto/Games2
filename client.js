const socket = io();

function createRoom() {
  const roomId = document.getElementById("roomId").value;
  socket.emit("createRoom", roomId);
}

function joinRoom() {
  const roomId = document.getElementById("roomId").value;
  socket.emit("joinRoom", roomId);
}

socket.on("roomCreated", (roomId) => {
  document.getElementById("status").innerText = `Room ${roomId} created. Waiting for players...`;
});

socket.on("playerJoined", (playerId) => {
  document.getElementById("status").innerText += `\nPlayer joined: ${playerId}`;
});

socket.on("roomError", (msg) => {
  document.getElementById("status").innerText = msg;
});
