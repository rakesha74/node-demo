http.createServer(function(request,response){
   response.writeHead(200);

   request.on('readable',function(){
      var chunk = null;
      while(null !== (chunk = request.read())){
          console.log(chunk.toString());
      }
   });

   request.on('end',function(){
      response.end();
   });
}).listen(8000);

//Above statement is equivalent to below statement

http.createServer(function(request,response){
   response.writeead(200);
   request.pipe(response);
}).listen(8000);

//Stability score of package in node.js