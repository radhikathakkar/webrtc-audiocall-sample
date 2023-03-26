// Importing express module
const express = require("express");
const app = express();
const Peer = require("peerjs");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const socket = io;
const peer = new Peer();

app.set("view engine", "ejs");

// Calling the public folder
app.use(express.static("public"));

// Handling get request
app.get("/", (req, res) => {
  res.send("Welcome to GeeksforGeeks Video Call App");
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});

peer.on("open", (id) => {
  socket.emit("newUser", id);
});

io.on("connection", (socket) => {
  socket.on("newUser", (id) => {
    socket.join("/");
    socket.to("/").broadcast.emit("userJoined", id);
  });
});
