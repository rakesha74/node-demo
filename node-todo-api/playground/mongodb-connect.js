const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
//const {MongoClient,ObjectID} = require('mongodb');  //one more example of destructuring
//Example of destructuring
//var user = {name:"Rakesh", age:28};
//var {name}=user;
//console.log(name);
//////////

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',function(err,client){
   if(err)
   {
       return console.log("Unable to connect to MongoDB server");
   }
   console.log("Connected to MongoDB server");
   const db = client.db('TodoApp')

    db.collection('Todos').insertOne({
        text: "Somnething to do",
        completed: false
    },function(err,result){
        if(err){
            return console.log("Unable to insert todo", err);
        }

        console.log(JSON.stringify(result.ops, undefined,2));

    });

   db.collection('Users').insertOne({
       _id:123,
       name: "Rakesh",
       age: 28,
       location: "Bangalore"
   }, function(err,result){
       if(err){
           return console.log("Unable to insert Users data",err);
       }

       console.log(JSON.stringify(result.ops, undefined,2));
   });

   client.close();
});