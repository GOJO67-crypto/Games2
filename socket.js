const socket = io(); // Connect to server
let username = "";
let roomId = "";

function createRoom(isPrivate) {
  username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Please enter a username");
    return;
  }

  socket.emit("createRoom", { username, isPrivate });
}

socket.on("roomCreated", ({ roomId: newRoomId }) => {
  roomId = newRoomId;
  document.getElementById("status").innerText = "Room created: " + roomId;
  window.location.href = `uno.html?room=${roomId}&username=${username}`;
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

