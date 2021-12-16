import * as path from "path";
import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import {Player} from './public/Player.js';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
//const io = require("socket.io")(http);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
const io = new Server(server);
//const io = require('socket.io')(server);
io.on('connection', (socket) => {

  console.log('User joined', socket.id);

  socket.emit('greet', 'Hi user!');

  socket.emit('setup',() =>{
    let name = window.prompt("Votre nom");
    let player = new Player(1,name);
    console.log(player);
  });

  socket.on('confirm', () => {
    console.log('Received User confirmation', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });

});

