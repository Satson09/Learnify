// const a = { "1": "Paris", "2": "4", "3": "William Shakespeare" }


// const b = { "1": "Paris", "2": "4", "3": "William Shakespeare" } 
// let k = 0;
// Object.keys(a).forEach( key => {
//   console.log('now we are in:', key);
//   if (b[key] === a[key]) {
//     console.log(a[key], '\t', b[key]);
//     k += 1;
//   }
// });
// console.log(k);

// // aa = {
// //   "userId": "12345",
// //   "courseId": "67890",
// //   "quizId": "quiz01",
// //   "answers": [
// //     { "1": "C", '2': 'paris', '3': 'prgraming' }
// //   ]
// // }
// // console.log(aa.answers[0]);

// // // console.log('k is: ', k);

import mongoose from "mongoose";
import dotenv from 'dotenv'
import quizzes from "./models/quizzes.js";

dotenv.config()

const URL = process.env.DB_URL;
async function connectDB() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
    console.log(Object.keys(quizzes.questions).length)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
} connectDB();

