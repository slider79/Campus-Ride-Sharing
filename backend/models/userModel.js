const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: String,
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true}, //no use to hash em coz koi bhi hamein hack to nhi kr raha its still an assignment :P
  role: {type:String, default:'passenger'},
  roll: String,     
  degree: String,   
  isCapt: {type:Boolean, default:false},
  captPending: {type:Boolean, default:false},
  vehDeets: String,
  plate: String,
  color: String,
  idPic: String,
  licPic: String
});

module.exports = mongoose.model('user', userSchema);