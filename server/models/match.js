const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  mutual: {
      type: Boolean,
      default: false
  }
});

module.exports = mongoose.model('Match', matchSchema);
