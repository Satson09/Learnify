import mongoose, { Schema } from 'mongoose';
import contents from './contents';

const Course = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: "N/A" },
  difficulty: { type: String, default: "easy" },
  instructorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lessons: [
    {
      lessonTitle: String,
      content: [contents],
      resources: [String],
      quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    }
  ],
},
{ timestamps: true },
{ versionKey: false });

export default mongoose.model('Course', Course);
