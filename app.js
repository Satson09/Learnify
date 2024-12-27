import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';

dotenv.config();
mongoose.set('strictQuery', false);
const mongoDB = process.env.DB_URL;
const app = express();

app.use(express.json());
app.use('/api/user/', userRouter);

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log('Connecting to MongodB server\n');
  } catch (err) {
    console.log('Error in connecting to MongoDB because of:', err);
    console.error(err);
  }
})();

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
