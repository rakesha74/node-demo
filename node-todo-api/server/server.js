var mongoose = require("../db/mongoose");
var todo = require('../models/todos');
var users = require('../models/users');
var authenticate = require('../middleware/authenticate');
var express = require('express');
var bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const _ = require('lodash');

var app = express();

app.use(bodyParser.json());

app.post('/todos',authenticate,function(req,res){
   var todos = new todo({
      text: req.body.text,
       _creator: req.user._id
   });

   todos.save().then(function(doc){
      res.send(doc);
   },function(error){
       res.status(400).send(error);
   });
});

app.get('/todos',authenticate,function(req,res){
   todo.find({
       _creator:req.user._id
   }).then(function(todos){
        res.send(todos);  //res.send({todos}) In latest version of node we can send data like this as it gives us the flexibility to add more data in response.
   },function(error){
        res.status(400).send(error);
   });
});

app.get('/todos/:id',authenticate,function(req,res){
   var id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }

    todo.findOne({
        _id:id,
        _creator:req.user._id
    }).then(function(todo){
    if(!todo){
        res.status(404).send();
    }
    res.send(todo); //In ES6 we can use like that res.send({})
}).catch(function(error){
    res.status(400).send();
});

});

app.delete('/todos/:id',authenticate,function(req,res){
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }

    todo.findOneAndRemove({
        _id:id,
        _creator: req.user._id
    }).then(function(todo){
        if(!todo){
            res.status(404).send();
        }
        res.status(200).send(todo); //In ES6 we can use like that res.send({})
    }).catch(function(error){
        res.status(400).send();
    });
});

app.patch('/todos/:id',authenticate,function(req,res){
   var id = req.params.id;

   var body = _.pick(req.body,['text','completed']);  //.pick will pick only the mentioned field from the request body

    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    todo.findOneAndUpdate({
        _id:id,
        _creator:req.user._id
    },{$set:body},{new:true}).then(function(todo){
        if(!todo){
            res.status(404).send();
        }
        res.status(200).send({todo:todo});
    }).catch(function(error){
        res.send(error);
    })

});

app.post('/users',function(req,res){
    var body = _.pick(req.body,['email','password']);

    var user_ = new users(body);

    user_.save().then(function(){
        return user_.generateAuthToken();
    }).then(function(token){
        res.header('x-auth',token).send(user_); //Custom header generally starts from x- as it doesn't belong to http header.
    }).catch(function(e){
        res.status(403).send(e);
    });
});

app.get('/users/me',authenticate,function(req,res){
    res.send(req.user);
});

app.post('/users/login',function(req,res){
   var body = _.pick(req.body,['email','password']);

   users.findByCredentials(body.email,body.password).then(function(user){
      return  user.generateAuthToken().then(function(token){
            res.header('x-auth',token).send(user);
       });
   }).catch(function(e){
       res.status(400).send();
   });
});

app.delete('/users/me/token',authenticate,function(req,res){
   req.user.removeToken(req.token).then(function(){
      res.status(200).send();
   },function(){
       res.status(400).send();
   });
});
app.listen(3000,function(){
   console.log("Started on port 3000");
});
//mongoose type cast boolean and number into the string if you pass number or boolean in string type
//body parser let us send json to server. It generally takes the body and turns into javascript objects.
//app.use is used for writing middleware
//httpstatuses.com

