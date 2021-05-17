require('dotenv').config()
const mongoose = require('mongoose')
const transactionSchema = require('./transaction')

const positionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['long', 'short'],
  },
  coin_id: {
    type: String,
  },
  transactions: [transactionSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

positionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Position', positionSchema)
