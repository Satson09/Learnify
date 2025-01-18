
const mongoose = require('mongoose');

// Schema for courses
const courseSchema = new mongoose.Schema({
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Links to User
  title: { type: String, required: true }, // Renamed `courseName` to `title` for consistency
  description: { type: String },
  duration: { type: Number }, // Optional duration field
  files: [ // New field to store file metadata
    {
      name: { type: String }, // Original file name
      url: { type: String }, // File URL or path
      type: { type: String }, // MIME type (e.g., application/pdf, video/mp4)
    },
  ],
  website: { type: String }, // New field for external course links
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { versionKey: false });

// Middleware to update the `updatedAt` field
courseSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Course', courseSchema);
