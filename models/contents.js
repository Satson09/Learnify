import mongoose, { Schema } from 'mongoose';

const Contents = new mongoose.Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  path: { type: String, required: true },
  type: { type: Number, required: true },
},
{ timestamps: true },
{ versionKey: false });

export default mongoose.model('Contents', Contents);
