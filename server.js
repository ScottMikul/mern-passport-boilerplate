const express = require("express");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


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

app.post("/api/login",(req,res)=>{

})

app.post("/api/signup",(req,res)=>{

})

app.get("/cookie",(req,res)=>{
    //send a cooooookie!
    res.cookie("COOOOOKIE", "COOOOOOOOOOOOOOOKIEEEEEEEEEEEEEEEEEE", {httpOnly:true})
})

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
