const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: false
  },
  celebrate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Celebrate',
    required: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)