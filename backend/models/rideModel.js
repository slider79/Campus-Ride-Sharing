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
  completedAt: Date,
  price: Number,
  
  // Fare calculation fields
  distanceKm: { type: Number, default: 0 }, // Distance from pin to FAST NUCES in km
  baseFare: { type: Number, default: 50 }, // Base fare per passenger (PKR)
  ratePerKm: { type: Number, default: 25 }, // Rate per km (PKR)
  farePerSeat: { type: Number, default: 50 }, // Total fare per available seat
  totalFareAllSeats: { type: Number, default: 0 }, // Total fare for all available seats
  
  // Coordinates for distance calculation
  pickupLat: Number,
  pickupLng: Number,
  pickupAddress: String,
  goingToFast: { type: Boolean, default: true } // true = going TO FAST, false = leaving FROM FAST
});

module.exports = mongoose.model('ride', rideSchema);