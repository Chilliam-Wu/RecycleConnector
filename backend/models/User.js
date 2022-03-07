const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  token: {
    type: String,
  },
  avatar: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('User', userSchema);
