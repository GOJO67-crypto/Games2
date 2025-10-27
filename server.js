const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const rooms = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("createRoom", (roomId) => {
    rooms[roomId] = [socket.id];
    socket.join(roomId);
    io.to(socket.id).emit("roomCreated", roomId);
  });

  socket.on("joinRoom", (roomId) => {
    if (rooms[roomId] && rooms[roomId].length < 4) {
      rooms[roomId].push(socket.id);
      socket.join(roomId);
      io.to(roomId).emit("playerJoined", socket.id);
    } else {
      io.to(socket.id).emit("roomError", "Room full or doesn't



