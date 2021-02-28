const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isImage: {
    type: Boolean
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Message', messageSchema)
