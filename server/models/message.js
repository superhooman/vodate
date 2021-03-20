const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  audio: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);
