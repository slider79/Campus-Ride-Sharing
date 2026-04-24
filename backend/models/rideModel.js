const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  captainId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    fromLocation: String,
  toLocation: String,
  availableSeats: Number,
   passengers: {type:Number, default:0},
  isActive: {type:Boolean, default:true},
    price: Number // fare wagera dalna hai to dal do
});

module.exports = mongoose.model('Ride', rideSchema);