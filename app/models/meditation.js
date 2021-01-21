const mongoose = require('mongoose')

const meditationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  style: {
    type: String,
    required: true
  }, 
  anxietyBefore: {
    type: Number,
    required: true
  },
  anxietyAfter: {
    type: Number,
    required: true
  },
  comments: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Meditation', meditationSchema)
