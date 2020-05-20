const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const UserSchema = new Schema({
    username:{
        type:String
    },
      email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
      },

    password: {
        type: String,
        validate: [({ length }) => length >= 6, "Password should be longer."]
    }

});

//before a user is entered into the database encrypt the password.
UserSchema.pre('save',function (next){
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
  next()
})

UserSchema.methods.comparePassword = function(inputPass) {
  return bcrypt.compareSync(inputPass,this.password);
};


const User = mongoose.model("User", UserSchema);

module.exports = User;
