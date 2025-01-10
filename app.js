#!/usr/bin/node

require('./db');
require('dotenv').config();
const express = require('express');
const path = require('path'); // Import path for handling file paths
const userRouter = require('./routes/api/user');
const studentRouter = require('./routes/api/student');
const instructorRouter = require('./routes/api/instructor');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'frontend')));

// Set up API routes (these take precedence)
app.use(process.env.USER_API_PREFIX || '/api/user', userRouter);
app.use(process.env.STUDENT_API_PREFIX || '/api/student', studentRouter);
app.use(process.env.INSTRUCTOR_API_PREFIX || '/api/instructor', instructorRouter);

// Fallback: Serve frontend's index.html only for non-API routes
app.get('*', (req, res) => {
  if (!req.originalUrl.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
  } else {
    res.status(404).json({ success: false, message: 'API route not found' });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
