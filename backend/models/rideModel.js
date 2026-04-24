const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  captainId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  rId: {type: String, required: true}, // Frontend is relying on this to book seats!
  dNm: String,
  pick: String,
  dest: String,
  dTime: String,
  veh: String,
  cnt: String,
  nts: String,
  avlSts: Number,
  passngrs: {type:Number, default:0},
  actv: {type:Boolean, default:true},
  price: Number 
});

module.exports = mongoose.model('ride', rideSchema);