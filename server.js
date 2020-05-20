const express = require("express");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const passport = require("./passport/passport");
const user = require("./models/user");
const session = require("express-session");


const app = express();


const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/passportBoilerplate");

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.post("/api/login", passport.authenticate('local'),(req,res)=>{
    if(!req.user){
        res.json({msg:"incorrect email/password"});
    }


})

app.post("/api/signup",(req,res)=>{
    //password validation
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if(cpassword!==password){
        res.json({msg:"The passwords do not match!"});
    }


    if(req.body.username){
        user.create({email:req.body.email,password:req.body.password,username:req.body.username},function (err, userResult) {
            if (err) res.json({msg:"there was a problem with the email"});
            // saved!
            req.login(userResult, function(err){
                if(err){console.log(err)}

                res.json({msg:"Welcome "+ req.body.username})
            })
          })
    }
    else{
        user.create({email:req.body.email,password:req.body.password},function (err, userResult) {
            if (err) res.json({msg:"there was a problem with the email"});
            // saved!
            req.login(userResult, function(err){
                if(err){console.log(err)}

                res.json({msg:"Welcome "+ req.body.email})
            })
          })
    }
})
app.get("/checklogin",(req,res)=>{
    if(req.user){
        res.send("logged in");
    }
    else{
        res.send("not logged in");
    }
})

app.get("/cookie",(req,res)=>{
    //send a cooooookie!
    const token = jwt.sign({foo:'bar'},"SUPER SECRET PRIVATE KEY LUL" )
    res.cookie("COOOOOKIE", token, {httpOnly:true})
    res.send("sent a cookie nerd");
})

app.get("/api/seecookie" , (req,res)=>{
  res.send("checking response for cookies!?");
})

app.get("/api/cookievalue",(req,res)=>{
  console.log('Cookies: ', req.cookies)
  if(req.cookies.COOOOOKIE){
    var decoded = jwt.verify(req.cookies.COOOOOKIE, "SUPER SECRET PRIVATE KEY LUL")
    console.log(decoded);
    console.log(decoded.COOOOOKIE);
  }
  res.send("didn't get a cookie value");
})
app.get("/api/clearcookie", (req,res)=>{
  res.clearCookie("COOOOOKIE");
  res.send("COOOOOKIE was cleared.");
})
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
