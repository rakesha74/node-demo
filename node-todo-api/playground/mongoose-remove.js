var mongoose = require("../db/mongoose");
var todo = require('../models/todos');
const ObjectID = require('mongodb').ObjectID;
var users = require('../models/users');

todo.remove({}).then(function(result){
    console.log(result);
});

//todo.findOneAndRemove  //the difference between above and this method is that above one don't return the document it deletes but this method deletes the document and return
                            //and return also so you can have data

todo.findOneAndRemove({_id:'5b38afea77950ec4cdb0413d'}).then(function(todo){
    console.log(todo);
});

todo.findByIdAndRemove('5b38afea77950ec4cdb0413d').then(function(todo){
   console.log(todo);
});