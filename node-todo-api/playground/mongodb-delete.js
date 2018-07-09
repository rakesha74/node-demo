const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/TodoApp',function(err,client){
    if(err)
    {
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db('TodoApp');

    db.collection('Users').deleteMany({name:"Rakesh"}).then(function(result){
        console.log(result); //In result resulr fiels matters. It tells about how many records got deleted and status of deletion.
    });

    db.collection('Users').deleteOne({name:"Jagdish"}).then(function(result){
       console.log(result);
    });

    db.collection('Users').findOneAndDelete({name:"Ravi"}).then(function(result){
       console.log(result);
    });
    client.close();

});




