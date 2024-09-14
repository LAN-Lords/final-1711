const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  mobileNumber: { type: String, unique: true },
  email: String,
  password: String,
  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }]
});

module.exports = mongoose.model('User', userSchema);
