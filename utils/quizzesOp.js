// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
import quizzes from '../models/quizzes.js';

// dotenv.config();

// const URL = process.env.DB_URL;
// async function connectDB() {
//   try {
//     await mongoose.connect(URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected successfully!');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1); // Exit process with failure
//   }
// }

async function createQuizes(options = {}) {
  try {
    const result = await quizzes.create(options);
    return result;
  } catch (err) {
    console.log('Erorr is becasue of :', err);
    return null;
  }
}

async function updQuizes(ObjectId, updateFile) {
  try {
    const result = await quizzes.findByIdAndUpdate(ObjectId, updateFile, { new: true });
    return result;
  } catch (err) {
    console.log('Error is becuase of :', err);
    return null;
  }
}

async function delQuize(ObjectId) {
  try {
    const result = await quizzes.findByIdAndDelete(ObjectId);
    return result;
  } catch (error) {
    console.log('Error because of : ', error);
    return null;
  }
}

async function retriveQuizes(options = {}) {
  try {
    const result = await quizzes.find(options);
    return result;
  } catch (error) {
    console.log('error is : ', error);
    return null;
  }
}

// (async () => {
//   try {
//     await connectDB();
//     const res = await retriveQuizes({ studentId: '6772aea32ef9db90a73a0911' });
//     console.log('Result is :', res);
//     mongoose.connection.close();
//   } catch (err) {
//     console.log('Error cause of :', err);
//   }
// })();

export default {
  createQuizes,
  retriveQuizes,
  updQuizes,
  delQuize,
};
