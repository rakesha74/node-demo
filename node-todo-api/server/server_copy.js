var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
//use mongoose validators
//mongoose schemas


//mongoose type cast boolean and number into the string if you pass number or boolean in string type
// var Todo = mongoose.model('db',{
//     text:{
//         type:String,
//         required: true,
//         minlength:1,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     },
//     completedAt:{
//         type:Number,
//         default:null
//     }
// });
//
// var newTodo=new Todo({
//    text:"Riding",
//    completed:true,
//    completedAt:1200
// });
//
// newTodo.save().then(function(docs){
//     console.log(JSON.stringify(docs,undefined,2));
// },function(err){
//     console.log("Unable to save data"+error);
// });

var users = mongoose.model('user',{
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    }
});

var newUser = new users({
    email:"rakesha74@gmail.com"
});

newUser.save().then(function(docs){
    console.log(JSON.stringify(docs,undefined,2));
},function(err){
    console.log("Unable to save data"+error);
});