//hashing is used to store password as hashing of a string always give same result. So, we can compare two strings using hash.
//salting the hash means adding some random data to original data to save the hash

//JSON web token


const SHA256 = require('crypto-js').SHA256;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var password = '123abc!';

bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash(password,salt,function(err,hash){
        console.log(hash);
    });
});

var hashedPassword = '$2b$10$LzwqRUySXtoFJP4yHzybleJwDoOnfwG8rqdfevnEZVvccndPrnM4O';

bcrypt.compare('123abc',hashedPassword,function(err,res){
    console.log(res);
});

// var data = {
//     id:10
// };
//
// var token = jwt.sign(data,'123abc');
// console.log(token);
//
// var decoded = jwt.verify(token,'123abc');
// console.log(decoded);

// var message = "I am Rakesh Agarwal";
// var hash = SHA256(message).toString();
//
// console.log("Message::"+message);
// console.log("Hash::"+hash);
//
// var data = {
//   id:4
// };
//
// var token = {
//     data:data,
//     hash:SHA256(JSON.stringify(data)+'somesecret').toString() //Salting of hash using somestring string.
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();
// if(resultHash === token.hash){
//     console.log('Data was not changed');
// }else{
//     console.log('Data was changed. do not trust!');
// }