import mongoose, { Schema } from 'mongoose';

import User from '../models/users.js'

const Enrollments = new mongoose.Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  progress: { type: Number, required: true },
},
{ timestamps: true });

export default mongoose.model('Enrollments', Enrollments);
