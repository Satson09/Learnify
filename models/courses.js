import mongoose, { Schema } from 'mongoose';

const Course = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  instructorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},
{ timestamps: true });

export default mongoose.model('Course', Course);
