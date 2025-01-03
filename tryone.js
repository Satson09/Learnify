import dotenv from 'dotenv';
import mongoose from 'mongoose';
import quize from './utils/quizzesOp.js';

dotenv.config();
const URL = process.env.DB_URL;
async function connectDB() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
}



// (async () => {
//   await connectDB();
//   const result = await quize.retriveQuizes({ _id: '6772aea72ef9db90a73a091b' });
//   const objectOne = result[0].questions;
//   const objectTwo = [
//     {
//       "questionId": "121",
//       "answer": "Country"
//     },
//     {
//       "questionId": "112",
//       "answer": "programming language"
//     },
//     {
//       "questionId": "211",
//       "answer": "14"
//     }
//   ]
// //   console.log(aa,'\n---------------');
//   console.log('iam in ffff');
//   let ans = 0;
//   objectOne.forEach((key) => {
//   const obTwoQuestion = objectTwo.find(item => item.questionId === key.questionId)
//   if (key.questionId === obTwoQuestion.questionId) {
//     if (key.correctAnswer === obTwoQuestion.answer) {
//       ans += 1;
//     }
//   }
//   });
  
//   console.log("number of correct answers is: ", ans);
//   mongoose.connection.close(objectOne, objectTwo);
// })();


(async () => {
//   await connectDB();
//   const rr = [
//     {
//       _id: "new ObjectId('6772aea72ef9db90a73a091f')",
//       studentId: "new ObjectId('6772aea32ef9db90a73a0911')",
//       courseId: "new ObjectId('6772aea52ef9db90a73a0914')",
//       quizeId: "new ObjectId('6772aea72ef9db90a73a091b')",
//       score: 100,
//       __v: 0
//     },
//     {
//       _id: "new ObjectId('67744fd870d6d99d91c1db06')",
//       studentId: "new ObjectId('6772aea32ef9db90a73a0911')",
//       courseId:"new ObjectId('6772aea52ef9db90a73a0914')",
//       quizeId: "new ObjectId('67744436718ceac04ba0df66')",
//       score: 66.66666666666667,
//       __v: 0
//     },
//     {
//       _id: "new ObjectId('6774505f2110efa9bfe54644')",
//       studentId: "new ObjectId('6772aea32ef9db90a73a0911')",
//       courseId: "new ObjectId('6772aea52ef9db90a73a0914')",
//       quizeId: "new ObjectId('6774446f8deee44c48d5880b')",
//       score: 33.333333333333336,
//       __v: 0
//     },
//     {
//       _id: "new ObjectId('6774525014e175773200be31')",
//       studentId: "new ObjectId('6772aea32ef9db90a73a0911')",
//       courseId: "new ObjectId('6772aea52ef9db90a73a0914')",
//       quizeId: "new ObjectId('6774446f8deee44c48d5880b')",
//       score: 0,
//       __v: 0
//     },
//     {
//       _id: 'ObjectId(6774526ea42bc52fa4887ec4)',
//       studentId: 'new ObjectId(6772aea32ef9db90a73a0911)',
//       courseId: 'new ObjectId(6772aea52ef9db90a73a0914)',
//       quizeId: 'new ObjectId(6774446f8deee44c48d5880b)',
//       score: 0,
//       __v: 0
//     }
//   ]
//   let suum = 0
//   rr.forEach((key) => {
//     suum += key.score; 
//     console.log("key is:", key.score);
//   })
//   console.log("sum is ", suum);
const suum = 200.000003;
const totalQuizes = 300
const finalScore = ( suum / totalQuizes ) * 100
console.log(round(finalScore));
})();
