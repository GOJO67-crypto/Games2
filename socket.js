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

function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (message) {
    socket.emit("chatMessage", { roomId, message, username });
    input.value = "";
  }
}

socket.on("chatMessage", ({ username, message }) => {
  const chatBox = document.getElementById("chatMessages");
  const msgDiv = document.createElement("div");
  msgDiv.innerHTML = `<strong>${username}:</strong> ${message}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});

