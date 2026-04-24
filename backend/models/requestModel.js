const mongoose = require('mongoose');

// Passenger jo pin drop karte hain uski details
const reqSch = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  location: String, // kahan se pick karna hai
  isActive: {type: Boolean, default: true}
});

module.exports = mongoose.model('request', reqSch);