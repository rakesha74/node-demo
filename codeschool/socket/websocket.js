var express = require('express');
var app = express();

var server = require('http').createServer(app);

var io = require('socket.io')(server);

io.on('connection',function(client){
   console.log("Client Connected");

   client.emit('messages',{hello:'world'});

   client.on('temp_message',function(data){
      console.log(data);
   });
});

app.get('/',function(req,res){
   res.sendFile(__dirname+'/index.html');
});

server.listen(8080);


//socket.broadcast.emit