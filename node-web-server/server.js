const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

app.set("view engine","hbs");
hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper("getCurrentYear",()=>{
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text)=>{
    return text.toUpperCase();
})

app.use((req, res, next)=>{
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`;

   console.log(log);
   fs.appendFile("server.log",log +"\n",(err)=>{
      if(err){
          console.log(err);
      }
   });

   next();
});

app.use((req,res,next)=>{
    res.render("maintenance.hbs");
});

app.use(express.static(__dirname+"/public"));

app.get('/', (req, res)=>{

    // res.send({
    //     name: "Andrew",
    //     likes: [
    //         "Biking",
    //         "Cities"
    //     ]
    // });

    res.render("home.hbs",{
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to my website"
    })
});

app.get('/about', (req, res)=>{
   res.render("about.hbs",{
       pageTitle: "About Page"
   });
});

app.get('/bad', (req,res)=>{
   res.send({
       error:"Bad Request"
   })
});

app.listen(3000,()=>{
    console.log("Server is listening on port number 3000");
});

//app.use is used as middleware so next is required to use next app.use
//and app.use executed sequentially
//so if next is missing it will not go to the next app.use