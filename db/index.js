const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Learnify', {})
  .then(() => {
    console.log('DB is connected');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });



