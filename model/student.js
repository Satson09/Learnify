const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  progress: {
    type: Map,
    of: Number, // Percentage completion per course
    default: {},
  },
}, { versionKey: false });

module.exports = mongoose.model('Student', studentSchema);
