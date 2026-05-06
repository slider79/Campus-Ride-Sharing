const mongoose = require('mongoose');

// booked rides ki collection alag se booked rides dekhani hain
const bookingSchema = new mongoose.Schema({
 userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  rideId: {type: mongoose.Schema.Types.ObjectId, ref: 'ride'}
});

module.exports = mongoose.model('booking', bookingSchema);