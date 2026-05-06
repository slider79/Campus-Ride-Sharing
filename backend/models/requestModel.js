const mongoose = require('mongoose');

// Passenger jo pin drop karte hain uski details
const reqSch = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  location: String, // legacy display field
  pick: String,
  dest: String,
  toFast: {type: Boolean, default: true},
  isActive: {type: Boolean, default: true}
}, { timestamps: true });

module.exports = mongoose.model('request', reqSch);