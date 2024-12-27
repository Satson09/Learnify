import mongoose, { Schema } from 'mongoose';

const Quize = new mongoose.Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  questions: { type: Map, of: String, required: true },
},
{ timestamps: true });

export default mongoose.model('Quize', Quize);
