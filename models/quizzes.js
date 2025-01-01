import mongoose, { Schema } from 'mongoose';

const Quize = new mongoose.Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  questions: [
    {
      _id: false,
      questionId: { type: String, required: true },  // Unique identifier for each question
      questionText: { type: String, required: true },  // Question text
      correctAnswer: { type: String, required: true },  // Correct answer
    },
  ],
},
{ timestamps: true },
{ versionKey: false });

export default mongoose.model('Quize', Quize);
