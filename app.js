#!/usr/bin/node
/**
// Set up an Express server and the user router
require('./db');
require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/api/user');
const studentRouter = require('./routes/api/student');

const app = express();

app.use(express.json());
app.use('/api/user/', userRouter);
app.use('/api/student/', studentRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
*/


/**
// Set up an Express server and the user router
require('./db');
require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/api/user');
const studentRouter = require('./routes/api/student');
const instructorRouter = require('./routes/api/instructor');  // Import instructor routes

const app = express();

// Set up routes
app.use(express.json());
app.use('/api/user/', userRouter);  // User-related routes
app.use('/api/student/', studentRouter);  // Student-related routes
app.use('/api/instructor/', instructorRouter);  // Instructor-related routes

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
*/

require('./db');
require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/api/user');
const studentRouter = require('./routes/api/student');
const instructorRouter = require('./routes/api/instructor');

const app = express();

// Set up routes
app.use(express.json());
app.use(process.env.USER_API_PREFIX || '/api/user', userRouter);
app.use(process.env.STUDENT_API_PREFIX || '/api/student', studentRouter);
app.use(process.env.INSTRUCTOR_API_PREFIX || '/api/instructor', instructorRouter);

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
