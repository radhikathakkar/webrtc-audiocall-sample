
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  socket.on('stream', function(data) {
    socket.broadcast.emit('stream', data);
  });
});

server.listen(3000, function() {
  console.log('listening on *:3000');
});