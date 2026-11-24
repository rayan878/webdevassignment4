const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const httpserver = http.createServer(app);
const io = new Server(httpserver);

let count = 0;
io.on("connection", (socket) => {
  count++;
  console.log("Active user: ", count);

  // Send msg from server to client
  socket.emit("click", "Hello from socket.IO");

  // Send msg from server to client
  socket.broadcast.emit("join", "New User Joined");

  socket.on("fr", (cb) => {
    console.log(cb);
  });

  socket.on("disconnect", () => {
    count--;
    console.log("Active user: ", count);
  });

  io.emit("announcement", "Today is last class");
});

httpserver.listen(8080, () => {
  console.log("Server started");
});
