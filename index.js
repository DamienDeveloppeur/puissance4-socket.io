const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const http = require("http").Server(app);
//const io = require("socket.io")(http);
let countP = 0;
const tableauJoueur=[];


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

const {Player} = require('./public/Player');

var players = {};



io.on('connection', (socket) => {



  console.log('User joined');

    socket.on("play", (x,joueur) => {
      console.log("joueur var ? :"+joueur);
      console.log("countP : " + countP);
      console.log("players server sides : " + players)

      io.emit("play",x, joueur, players[socket.id]);

      socket.emit('messageServer', tableauJoueur);

    })


  socket.on('player', (name, token) => {
    console.log(token)
    if (countP == 2) return;
    else {
        countP++;
        let bool;
        (countP == 1) ? bool = true : bool = false
        players[socket.id] = {id: socket.id, name: name, color:bool};
        //players[socket.id] = {id: socket.id, name: name, color: token};
        tableauJoueur.push(players[socket.id])

    }
  })







  // on peut repérer une déconnexion
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
-
  socket.on("messageSend", function(msg){
    console.log("msg send : "+ msg);
    console.log("i : "+ players[socket.id])
    io.emit("messageSend", msg, players[socket.id]);
    //alert("test")
  })




});











