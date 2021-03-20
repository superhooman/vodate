const mongoose = require('mongoose');

const sex = {
    MALE: 'male',
    FEMALE: 'female'
}

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
  sex: {
      type: String,
      enums: Object.values(sex),
      required: true
  },
  mood: {
      type: String,
      enums: Object.values(moods),
      required: true
  }
});

module.exports = mongoose.model('Profile', profileSchema);
