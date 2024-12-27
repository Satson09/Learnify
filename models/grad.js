import mongoose, { Schema } from 'mongoose';

const Grade = new mongoose.Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: Schema.Types.ObjectId, ref: 'Quize', required: true },
  score: { type: Number, required: true },
},
{ timestamps: true },
{ versionKey: false });

export default mongoose.model('Grade', Grade);
