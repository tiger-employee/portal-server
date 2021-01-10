const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  // do these have to be arrays? ^v  How do I set them up as arrays?  
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Chat', chatSchema)