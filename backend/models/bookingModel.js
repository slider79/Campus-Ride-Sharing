const mongoose = require('mongoose');

// booked rides ki collection alag se booked rides dekhani hain
const bookingSchema = new mongoose.Schema({
 userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  rideId: {type: mongoose.Schema.Types.ObjectId, ref: 'Ride'}
});

module.exports = mongoose.model('Booking', bookingSchema);