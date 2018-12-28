const mongoose = require('mongoose');

exports.connect = mongoose.connect(
    'mongodb://127.0.0.1:27017/utiot',
    { useNewUrlParser: true },
    err => {
      if (err) {
        console.log(err);
      } else {
        console.log('mongo connected');
      }
    }
  );