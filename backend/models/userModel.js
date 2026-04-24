const mongoose = require('mongoose');

// user ka model, seedhi seedhi cheezain
 const userSchema = new mongoose.Schema({
  userName: String,
    email: {type:String, required:true, unique:true},
  password: {type:String, required:true}, // password ko hash kon kare assignment hi to hai kon hack kar raha hai hamari app
   role: {type:String, default:'passenger'},
  isCapt: { type: Boolean, default: false },
  captPending: { type: Boolean, default: false },
  roll: String,
  degree: String,
  vehDeets: String,
  plate: String,
  color: String,
  idPic: String,
  licPic: String
 });

module.exports = mongoose.model('User', userSchema);