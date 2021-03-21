const mongoose = require('mongoose');

const leftSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  }
});

module.exports = mongoose.model('Left', leftSchema);
