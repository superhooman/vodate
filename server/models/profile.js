const mongoose = require('mongoose');

const moods = {
    HAPPY: 'happy',
    NEUTRAL: 'neutral',
    SAD: 'sad'
}

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  audio: {
      type: String,
      required: true
  },
  mood: {
      type: String,
      enums: Object.values(moods),
      required: true
  }
});

module.exports = mongoose.model('Profile', profileSchema);
