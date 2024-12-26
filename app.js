#!/usr/bin/node
// Set up an Express server and the user router
require('./db');
require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json());
app.use('/api/user/', userRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
