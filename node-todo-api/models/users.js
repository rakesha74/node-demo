const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message: " It is not a valid email"
        }
    },
    password:{
        type: String,
        required:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject,['_id','email']);

};
UserSchema.methods.generateAuthToken=function(){   //arrow function we cannot use here as we cannot use this in arrow function.
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toString(),access:access},'abc123').toString();  //Secret key 'abc123' we can put in configuration file.

    user.tokens.push({access:access,token:token});
    //Example of advance promise.Need to study further.
    return user.save().then(function(){
        return token;
    });
};   //instance method has access to the individual document the collection has.

//find out the difference between the methods and statics
//using statics we can access the model
//without statics we have access of documents.

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token,'abc123');
    }catch(e){
        // return new Promise(function(resolve,reject){
        //     reject();
        // });

        return Promise.reject('test'); //This statement is equivalent to above statement.
    }

    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    })
}

UserSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(user.password,salt,function(err,hash){
                user.password= hash;
                next();
            })
        })
    }else{
        next();
    }
});

UserSchema.statics.findByCredentials = function(email,password){
    var User = this;

    return User.findOne({email:email}).then(function (user){
       if(!user){
           return Promise.reject();
       }

       return new Promise(function(resolve,reject){

           bcrypt.compare(password,user.password,function(err,res){
               if(err){
                   reject(null);
               }
               resolve(user);
           });
       });
    });
};

UserSchema.methods.removeToken = function(token){
    var user =this;

    return user.update({
       $pull:{
           tokens:{
               token:token
           }
       }
    });
}

var users = mongoose.model('user',UserSchema);

module.exports=users;

//mongoose custom validation--search in google