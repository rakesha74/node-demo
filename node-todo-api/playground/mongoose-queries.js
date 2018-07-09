var mongoose = require("../db/mongoose");
var todo = require('../models/todos');
const ObjectID = require('mongodb').ObjectID;

// var id = "6b37649e58679b09c4cd9b9011";
//
// if(!ObjectID.isValid(id)){
//     console.log("Id is invalid");
// }
//
// todo.find({
//     _id:id   //the best part of mongoose is that you don't require ObjectId to convert id
// }).then(function(todos){
//     console.log('Todos',todos);
// });
//
// todo.findOne({
//     completed:false
// }).then(function(todo){
//     console.log('Todo',todo);
// });
//
// todo.findById(id).then(function(todo){
//     if(!todo){
//         return console.log("ID not found");
//     }
//     console.log('Todo By id',todo);
// }).catch(function(error){
//     console.log(error);
// });

//Error can send private information
