const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/TodoApp',function(err,client) {
    if (err) {
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db('TodoApp');

    db.collection('Users').findOneAndUpdate(
        {_id:new ObjectID("5b375a376f6b63a25ff839fa")},
        {$inc: //Update operators of mongodb. without update operator data can't be updated in mongodb.
                {age:1},
            $set:
                {name:"Ankit"}
        },{
            returnOriginal:false
        }
        ).then(function(result){
       console.log(result);
    });

    client.close();
});