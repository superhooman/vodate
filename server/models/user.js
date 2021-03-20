const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: String,
});

module.exports = mongoose.model('User', userSchema);
