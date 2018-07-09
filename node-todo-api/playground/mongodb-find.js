const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/TodoApp',function(err,client){
    if(err)
    {
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db('TodoApp')

    // db.collection('Todos').find(
    // {
    //     _id:new ObjectID("5b35a4dca56bf66636264fad")
    // }).toArray().then(function(docs){
    //     console.log("To-dos");
    //     console.log(JSON.stringify(docs,undefined,2));
    // },function(err){
    //     console.log("Unable to fetch to-dos",err);
    // });

    // db.collection('Todos').find().count().then(function(count){
    //     console.log("To-dos Count:"+count);
    //
    // },function(err){
    //     console.log("Unable to fetch to-dos",err);
    // });

    db.collection('Users').find(
    {
        name:"Rakesh"
    }).toArray().then(function(docs){
        console.log("To-dos");
        console.log(JSON.stringify(docs,undefined,2));
    },function(err){
        console.log("Unable to fetch to-dos",err);
    });


    client.close();
});

//if we give nothing to find then whole document in colletion will print
//if we give {completed:true} then only the the document satisfying this field will print
//toArray will return the promise