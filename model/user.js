
const mongoose = require('mongoose');

// Mongoose Schema for User data model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  verified: { type: Boolean, default: false, required: true },
  role: { 
    type: String, 
    enum: ['instructor', 'student', 'admin'], // Define allowed roles
    required: true 
  },
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);
