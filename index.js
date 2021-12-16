const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const http = require("http").Server(app);
//const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', (req, res, next) => {
  return res.sendFile(path.join(__dirname, './index.html'));
});

const server = app.listen(port, () => {
    console.log('App running on port: ' + port);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User joined');
  socket.emit("test")
  // on peut repérer une déconnexion
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  const board =socket.on("TROLL", function(msg){
   return msg;
  })
  socket.emit("send", board);





});

