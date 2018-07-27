var EventEmitter = require('events').EventEmitter;

var logger = new EventEmitter();

logger.on('error',function(message){
    console.log('ERR:'+message);
});

logger.emit('error','Spilled Milk');

logger.emit('error','Eggs Cracked');

//
// http.createServer(function(request,response){
//
// });
//
// var server = http.createServer();
//
// server.on('request',function(request,response){
//
// });
//
// server.on('close',function(){
//
// });