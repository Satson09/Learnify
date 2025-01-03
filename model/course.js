/**
const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number }, // Duration in hours or minutes
  createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

module.exports = mongoose.model('Course', courseSchema);
*/

const mongoose = require('mongoose');

// Schema for courses
const courseSchema = new mongoose.Schema({
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Links to User
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number }, // Optional duration field
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { versionKey: false });

// Middleware to update the `updatedAt` field
courseSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Course', courseSchema);
