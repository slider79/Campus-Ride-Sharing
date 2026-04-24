const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  captainId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  rId: { type: String, unique: true, required: true },
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

module.exports = mongoose.model('Ride', rideSchema);