const mongoose = require('mongoose');

// Connect to MongoDB database 'myDb' using Mongoose
mongoose.connect('mongodb://localhost:27017/Learnify', {}).then(() => {
  console.log('DB is connected');
}).catch((err) => {
  console.log(err);
});
